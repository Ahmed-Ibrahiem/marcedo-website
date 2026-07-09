import {
  doc,
  getDoc,
  collection,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../../services/firestoreConfig";
import { getCategoriesByIds } from "../../../../services/CategoriesServices";
import { getProductsByIdsGroup } from "../../../../services/ProductsServices";

/**
 * Fetches a product's data from all its Firestore collections and
 * merges it into one object shaped like the form's defaultValues,
 * so it can be passed directly to reset().
 */
export const getProductForEdit = async (productId) => {
  const refs = {
    core: doc(db, "products", productId),
    media: doc(db, "product-media", productId),
    details: doc(db, "product-details", productId),
    pricing: doc(db, "product-pricing", productId),
    stock: doc(db, "product-stock", productId),
    shipping: doc(db, "product-shipping", productId),
    variants: doc(db, "product-variants", productId),
  };

  const [
    coreSnap,
    mediaSnap,
    detailsSnap,
    pricingSnap,
    stockSnap,
    shippingSnap,
    variantsSnap,
  ] = await Promise.all(Object.values(refs).map((ref) => getDoc(ref)));

  if (!coreSnap.exists()) {
    throw new Error(`Product ${productId} was not found`);
  }

  const core = coreSnap.data();
  const media = mediaSnap.exists() ? mediaSnap.data() : {};
  const details = detailsSnap.exists() ? detailsSnap.data() : {};
  const pricing = pricingSnap.exists() ? pricingSnap.data() : {};
  const stock = stockSnap.exists() ? stockSnap.data() : {};
  const shipping = shippingSnap.exists() ? shippingSnap.data() : {};
  const variantsData = variantsSnap.exists() ? variantsSnap.data() : {};

  const variants = variantsData.variants ?? [];
  const hasVariants = variants.length > 0;

  // The form needs full category and related-product objects (not just
  // ids) to render selectors correctly, so fetch them here.
  const categories = await getCategoriesByIds(core.category_ids);
  const relatedProducts = await getProductsByIdsGroup(core.related_ids);

  // Shipping days are stored as a ready string ("3 - 5 Business Days"),
  // but the form needs them back as {from, to} numbers.
  const parseDeliveryDays = (value) => {
    if (!value) return { from: 0, to: 0 };
    const match = value.match(/(\d+)\s*-\s*(\d+)/);
    if (!match) return { from: 0, to: 0 };
    return { from: Number(match[1]), to: Number(match[2]) };
  };

  // Color hex values live inside "options" (built at save time), not in
  // a dedicated colorPalette field, so rebuild it from there.
  const rebuildColorPalette = (options) => {
    if (!options) return {};
    const colorOption = options.find((op) => op.key === "color");
    if (!colorOption) return {};
    return colorOption.values.reduce((palette, value) => {
      if (value?.name) palette[value.name] = value.hex ?? null;
      return palette;
    }, {});
  };

  // When hasVariants is true, the pricing/stock fields below only hold
  // the CHEAPEST variant's values (used for listing/sorting). They are
  // not meant to be edited directly in that case - Step4 shows a
  // read-only summary instead.
  return {
    // Step 1: Basic Information
    name: core.name ?? "",
    short_description: details.short_description ?? "",
    category_ids: categories,
    brand_id: core.brand_id ?? "",
    tags: core.tags ?? [],
    description: details.description ?? [],

    // Step 2: Media
    thumbnail: media.thumbnail ?? "",
    gallery: media.gallery ?? [],
    videos: media.videos ?? [],

    // Step 3: Properties / Variants
    variants,
    colorPalette: rebuildColorPalette(variantsData.options),

    // Step 4: Price & Inventory (only meaningful when there are no variants)
    original_price: hasVariants ? "" : (pricing.original_price ?? ""),
    discount_percentage: hasVariants ? 0 : (pricing.discount_percentage ?? 0),
    discount_expires_at: hasVariants
      ? null
      : (pricing.discount_expires_at ?? null),
    current_price: hasVariants ? "" : (pricing.current_price ?? ""),
    cost_price: pricing.cost_price ?? 0,
    currency: pricing.currency ?? "EGP",
    charge_tax: core.charge_tax ?? true,

    quantity: hasVariants ? 0 : (stock.quantity ?? 0),
    sku: hasVariants ? "" : (stock.sku ?? ""),
    track_inventory: core.track_inventory ?? true,
    low_stock_threshold: hasVariants ? 0 : (stock.low_stock_threshold ?? 0),

    shipping_type: shipping.shipping_type ?? "Standard Shipping",
    estimated_delivery_days: parseDeliveryDays(
      shipping.estimated_delivery_days,
    ),
    from: shipping.from ?? "",
    is_free: shipping.is_free ?? false,

    // Step 5: Publish & Review
    is_active: core.is_active ?? true,
    is_featured: core.is_featured ?? true,
    is_best_seller: core.is_best_seller ?? true,
    related_ids: relatedProducts ?? [],
  };
};

/**
 * Updates an existing product. Same logic as publishProduct (cheapest
 * variant, stock status, options), but writes to an existing product id
 * instead of creating a new one, and never touches created_at.
 */
export const updateProduct = async (formData, productId) => {
  const batch = writeBatch(db);

  const proRef = doc(db, "products", productId);

  const thereVariants = formData.variants.length > 0;
  let lowestPriceVariant;

  if (thereVariants) {
    lowestPriceVariant = formData.variants.reduce((min, vari) =>
      vari.price < min.price ? vari : min,
    );
  }

  // Update the main product document
  batch.set(
    proRef,
    {
      slug: formData.name.split(" ").join("-"),
      brand_id: formData.brand_id,
      thumbnail: formData.thumbnail,
      stock_status: !thereVariants
        ? formData.quantity <= formData.low_stock_threshold
          ? "out_of_stock"
          : "in_stock"
        : formData.variants.find((vari) => vari.stock > vari.threshold)
          ? "in_stock"
          : "out_of_stock",
      tags: [...formData.tags],
      original_price: thereVariants
        ? lowestPriceVariant.original_price
        : formData.original_price,
      current_price: thereVariants
        ? lowestPriceVariant.price
        : formData.current_price,
      discount_percentage: thereVariants
        ? lowestPriceVariant.discount_percentage
        : formData.discount_percentage,
      currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
      discount_expires_at: thereVariants
        ? (lowestPriceVariant.discount_expires_at ?? null)
        : (formData.discount_expires_at ?? null),
      // sold_count and created_at are not touched here - they belong to
      // the product's history, not to an edit action.
      updated_at: serverTimestamp(),
      sku: thereVariants ? lowestPriceVariant.sku : formData.sku,
      category_ids: [...formData.category_ids.map((cat) => cat.id)],
      id: productId,
      name: formData.name,
      is_active: formData.is_active,
      is_best_seller: formData.is_best_seller,
      is_featured: formData.is_featured,
      related_ids: [...formData.related_ids.map((p) => (p.id ? p.id : p))],
      charge_tax: formData.charge_tax,
      track_inventory: formData.track_inventory,
    },
    { merge: true },
  );

  // Update product details (description)
  batch.set(
    doc(db, "product-details", productId),
    {
      description: [...formData.description],
      short_description: formData.short_description,
      product_id: productId,
    },
    { merge: true },
  );

  // Update product media
  batch.set(
    doc(db, "product-media", productId),
    {
      gallery: [...formData.gallery],
      videos: [...formData.videos],
      product_id: productId,
      thumbnail: formData.thumbnail,
    },
    { merge: true },
  );

  // Update product pricing
  batch.set(
    doc(db, "product-pricing", productId),
    {
      product_id: productId,
      offer_note: `${formData.discount_percentage}% OFF`,
      original_price: thereVariants
        ? lowestPriceVariant.original_price
        : formData.original_price,
      current_price: thereVariants
        ? lowestPriceVariant.price
        : formData.current_price,
      discount_percentage: thereVariants
        ? lowestPriceVariant.discount_percentage
        : formData.discount_percentage,
      currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
      discount_expires_at: thereVariants
        ? lowestPriceVariant.discount_expires_at
        : formData.discount_expires_at,
      cost_price: formData.cost_price,
      charge_tax: formData.charge_tax,
    },
    { merge: true },
  );

  // Build the list of unique attribute values (options) across all variants
  let options = null;
  if (thereVariants) {
    const allAttributePairs = formData.variants.flatMap((variant) =>
      Object.entries(variant.attributes).map(([key, values]) => ({
        key,
        values,
      })),
    );

    const map = new Map();

    allAttributePairs.forEach(({ key, values }) => {
      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key).add(values);
    });

    const finalOptions = Array.from(map.entries()).map(([key, valuesSet]) => ({
      key,
      values: Array.from(valuesSet),
    }));

    // Color values also carry their hex code alongside the name
    options = finalOptions.map((op) => {
      if (op.key === "color")
        return {
          ...op,
          values: op.values.map((value) => ({
            name: value,
            hex: formData.colorPalette[value] ?? null,
          })),
        };
      return op;
    });
  }

  // Update variants. Always write this doc, even with an empty array,
  // so it doesn't keep stale variants from before the edit.
  batch.set(
    doc(db, "product-variants", productId),
    {
      product_id: productId,
      variants: formData.variants,
      options: options,
    },
    { merge: true },
  );

  // Update stock
  batch.set(
    doc(db, "product-stock", productId),
    {
      product_id: productId,
      low_stock_threshold: thereVariants
        ? lowestPriceVariant.threshold
        : formData.low_stock_threshold,
      status: !thereVariants
        ? formData.quantity <= formData.low_stock_threshold
          ? "out_of_stock"
          : "in_stock"
        : formData.variants.find((vari) => vari.stock > vari.threshold)
          ? "in_stock"
          : "out_of_stock",
      quantity: thereVariants ? lowestPriceVariant.stock : formData.quantity,
      sku: thereVariants ? lowestPriceVariant.sku : formData.sku,
      track_inventory: formData.track_inventory,
    },
    { merge: true },
  );

  // Update shipping
  batch.set(
    doc(db, "product-shipping", productId),
    {
      product_id: productId,
      estimated_delivery_days: `${formData.estimated_delivery_days.from} - ${formData.estimated_delivery_days.to} Business Days`,
      from: formData.from,
      shipping_type: formData.shipping_type,
      is_free: formData.is_free,
    },
    { merge: true },
  );

  await batch.commit();
  return productId;
};

/**
 * Creates a new product and writes it across all the related Firestore
 * collections in a single atomic batch.
 */
export const publishProduct = async (formData) => {
  const batch = writeBatch(db);

  const proRef = doc(collection(db, "products"));
  const proId = proRef.id;

  const thereVariants = formData.variants.length > 0;
  let lowestPriceVariant;

  if (thereVariants) {
    lowestPriceVariant = formData.variants.reduce((min, vari) =>
      vari.price < min.price ? vari : min,
    );
  }

  // Set the main product document
  batch.set(proRef, {
    slug: formData.name.split(" ").join("-"),
    brand_id: formData.brand_id,
    thumbnail: formData.thumbnail,
    stock_status: !thereVariants
      ? formData.quantity <= formData.low_stock_threshold
        ? "out_of_stock"
        : "in_stock"
      : formData.variants.find((vari) => vari.stock > vari.threshold)
        ? "in_stock"
        : "out_of_stock",
    tags: [...formData.tags],
    original_price: thereVariants
      ? lowestPriceVariant.original_price
      : formData.original_price,
    current_price: thereVariants
      ? lowestPriceVariant.price
      : formData.current_price,
    discount_percentage: thereVariants
      ? lowestPriceVariant.discount_percentage
      : formData.discount_percentage,
    currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
    discount_expires_at: thereVariants
      ? (lowestPriceVariant.discount_expires_at ?? null)
      : (formData.discount_expires_at ?? null),
    sold_count: 0,
    updated_at: serverTimestamp(),
    sku: thereVariants ? lowestPriceVariant.sku : formData.sku,
    category_ids: [...formData.category_ids.map((cat) => cat.id)],
    id: proId,
    rating_average: 0,
    created_at: serverTimestamp(),
    name: formData.name,
    is_active: formData.is_active,
    is_best_seller: formData.is_best_seller,
    is_featured: formData.is_featured,
    related_ids: [...formData.related_ids.map((pro) => pro.id)],
  });

  // Set product details (description)
  batch.set(doc(db, "product-details", proId), {
    description: [...formData.description],
    short_description: formData.short_description,
    product_id: proId,
  });

  // Set product media
  batch.set(doc(db, "product-media", proId), {
    gallery: [
      "/assets/products image/wristwatchs/product1/gallary_1.png",
      "/assets/products image/wristwatchs/product1/gallary_3.png",
    ],
    videos: [],
    product_id: proId,
    thumbnail: formData.thumbnail,
  });

  // Set product pricing
  batch.set(doc(db, "product-pricing", proId), {
    product_id: proId,
    offer_note: `${formData.discount_percentage}% OFF`,
    original_price: thereVariants
      ? lowestPriceVariant.original_price
      : formData.original_price,
    current_price: thereVariants
      ? lowestPriceVariant.price
      : formData.current_price,
    discount_percentage: thereVariants
      ? lowestPriceVariant.discount_percentage
      : formData.discount_percentage,
    currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
    discount_expires_at: thereVariants
      ? lowestPriceVariant.discount_expires_at
      : formData.discount_expires_at,
  });

  // Build the list of unique attribute values (options) across all variants
  let options = null;
  if (thereVariants) {
    const allAttributePairs = formData.variants.flatMap((variant) =>
      Object.entries(variant.attributes).map(([key, values]) => ({
        key,
        values,
      })),
    );

    const map = new Map();

    allAttributePairs.forEach(({ key, values }) => {
      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key).add(values);
    });

    const finalOptions = Array.from(map.entries()).map(([key, valuesSet]) => ({
      key,
      values: Array.from(valuesSet),
    }));

    // Color values also carry their hex code alongside the name
    options = finalOptions.map((op) => {
      if (op.key === "color")
        return {
          ...op,
          values: op.values.map((value) => ({
            name: value,
            hex: formData.colorPalette[value] ?? null,
          })),
        };
      return op;
    });
  }

  // Set variants. Always write this doc, even with an empty array, so a
  // product created without variants can still be edited into having them.
  batch.set(doc(db, "product-variants", proId), {
    product_id: proId,
    variants: formData.variants,
    options: options,
  });

  // Set stock
  batch.set(doc(db, "product-stock", proId), {
    product_id: proId,
    low_stock_threshold: thereVariants
      ? lowestPriceVariant.threshold
      : formData.low_stock_threshold,
    status: !thereVariants
      ? formData.quantity <= formData.low_stock_threshold
        ? "out_of_stock"
        : "in_stock"
      : formData.variants.find((vari) => vari.stock > vari.threshold)
        ? "in_stock"
        : "out_of_stock",
    quantity: thereVariants ? lowestPriceVariant.stock : formData.quantity,
  });

  // Set shipping
  batch.set(doc(db, "product-shipping", proId), {
    product_id: proId,
    estimated_delivery_days: `${formData.estimated_delivery_days.from} - ${formData.estimated_delivery_days.to} Business Days`,
    from: formData.from,
    shipping_type: formData.shipping_type,
    is_free: formData.is_free,
  });

  await batch.commit();
  return proId;
};
