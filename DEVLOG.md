# Marcedo - Development Log

This file tracks technical challenges, decisions, and lessons learned while building Marcedo. Unlike the README (which summarizes the finished result), this log captures the thinking *as it happens* — including problems that aren't fully solved yet.

---

## 2026-06-19 — Filtering logic was hardcoded per field

**The problem:**
Early filtering logic checked each filter field by name (`matchesColor`, `matchesConnectivity`, `matchesStorage`...). This meant every time a new filterable attribute was added to a category, the filtering function itself had to be edited.

**Why it mattered:**
Not scalable. Different categories (Electronics, Clothing, Watches) have completely different sets of filters, so a hardcoded approach would require constant maintenance as the catalog grew.

**The solution:**
Rewrote the filter function to loop dynamically over whatever filters are active using `Object.entries()`, instead of checking each field by name:

```javascript
const matchesVariants = Object.entries(activeFilter.variants).every(([key, values]) => {
  const productsValues = productVariant.variants[key];
  if (!productsValues) return false;
  return values.some((value) => productsValues.includes(value));
});
```

Now adding a new filterable attribute to a category requires zero changes to the filtering function.

**What I learned:**
Hardcoding field names felt easier at first, but it's a trap — the moment the data shape varies (which it always does in e-commerce), dynamic iteration pays for itself immediately.

---

## 2026-06-19 — Filters don't account for product diversity within a category (UNRESOLVED)

**The problem:**
A category like "Electronics" contains very different product types (watches, laptops, headphones), each with their own filter attributes (Screen_size, Storage, Noise_control, Connectivity...). All of these filters are shown together in the sidebar, regardless of what the user is actually browsing for.

**Why it matters:**
A user can select filters from unrelated product types (e.g. "Noise Cancellation" + "256GB Storage") and land on zero results — not because nothing is in stock, but because no single product type has both attributes. This makes the site feel broken rather than just "no matches."

**Status:** Not yet solved. Two directions being considered:
1. Split broad categories into sub-types (Phones, Watches, Laptops, Audio) so filters shown are scoped to relevant products only.
2. Make filters "smart"/progressive — disable or hide filter options that would lead to zero results, based on the current selection (similar to Amazon/Noon).

**What I learned:**
A filtering system can be 100% technically correct (no bugs, fully dynamic, good performance) and still create a bad experience if it doesn't account for *which* filters make sense together. Correctness and UX are separate problems.

---

## 2026-06-19 — Normalized vs Denormalized: choosing the trade-off consciously

**The problem:**
While fetching category pages, I needed product variant data (color, storage, connectivity, etc.) for both displaying products and building the filter sidebar. With a normalized structure (`products` and `product_variants` as separate collections), this required a second Firestore query just to fetch variants — on top of the queries for the category and the products themselves.

This surfaced clearly when I noticed the variant-fetching function (`getVariantsOptions`) had to query `product_variants` using `where("product_id", "in", chunk)`, chunked into batches of 30 (Firestore's limit for `in` queries) to avoid making one request per product (an N+1 pattern).

**What I considered:**
Once I understood the N+1 risk, I looked into denormalization — storing a summary of each product's filterable attributes directly on the product document at write time, so category pages could fetch everything in a single query instead of two.

**The decision — and why:**
I deliberately stayed with the normalized structure instead of moving to denormalization. The reasoning: denormalization trades write-time complexity for read-time speed — every variant add/edit in the Admin Dashboard would need to keep the product document's summary in sync, which adds a real maintenance burden. Given that Marcedo's current product/variant volume is still small, the extra Firestore read from staying normalized is cheap, while the sync complexity of denormalizing would be a cost paid on every write going forward. I solved the N+1 risk specifically (via chunked `in` queries + `Promise.all`) rather than restructuring the data model to avoid a problem that, at this scale, wasn't actually expensive.

**What I learned:**
Normalized vs. denormalized isn't a "correct answer" — it's a read-heavy vs. write-heavy trade-off, and the right call depends on actual data volume, not on which pattern sounds more advanced. The N+1 problem specifically needed solving either way (even denormalized data could hit it elsewhere); fixing it directly was simpler than restructuring the whole data model preemptively for a scale I'm not at yet.

---

<!-- Add new entries above this line, newest first -->
