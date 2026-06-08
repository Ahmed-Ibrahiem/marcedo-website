import {
  getAllBrands,
  getAllCategoreis,
} from "../services/ProductsDashboardServices";
import * as XLSX from "xlsx";

export const exportAllProductsToExcel = async (productsData) => {
  if (!productsData) return;

  const allBrands = await getAllBrands();
  const allCategories = await getAllCategoreis();

  if (!allBrands || !allCategories) return;

  const brandsMap = Object.fromEntries(
    allBrands.map((brands) => [brands.id, brands.name]),
  );

  const categoriesMap = Object.fromEntries(
    allCategories.map((categ) => [categ.id, categ.name]),
  );

  const excelData = productsData.map((product) => {
    return {
      SKU: product.sku,

      Name: product.name,

      Brand: brandsMap[product.brand_id],

      Categories: product.category_ids
        .map((id) => categoriesMap[id])
        .filter(Boolean)
        .join(", "),

      "Current Price": `${product.current_price} ${product.currency}`,

      "Old Price": `${product.original_price} ${product.currency}`,

      Discount: `${product.discount_percentage}%`,

      "Sold Count": product.sold_count,

      Stock: product.stock_status === "in_stock" ? "In Stock" : "Out Of Stock",

      Status: product.is_active ? "Published" : "Draft",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  XLSX.writeFile(workbook, "products.xlsx");
};
