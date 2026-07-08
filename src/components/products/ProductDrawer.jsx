import { useEffect, useState } from "react";
import { X, Loader2} from "lucide-react";

import ImageUploader from "./ImageUploader";

const initialState = {
  name: "",
  description: "",
  categoryId: "",

  weight: "",

  sku: "",

  price: "",

  discountPrice: "",

  stock: "",

  

  isFeatured: false,

  isActive: true,

  images: [],

  // ==========================
  // DISPLAY SETTINGS
  // ==========================

  badge: "",

  cardTheme: "GREEN",

  highlights: [],

  displayOrder: 0,
};

const BADGES = [
  "BEST SELLER",
  "CUSTOMER FAVOURITE",
  "REFRESHING",
  "NEW ARRIVAL",
  "COMBO",
  "LIMITED EDITION",
];

const CARD_THEMES = [
  {
    value: "GREEN",
    color: "#3E8C57",
  },
  {
    value: "ORANGE",
    color: "#F57C00",
  },
  {
    value: "RED",
    color: "#D94E43",
  },
  {
    value: "CREAM",
    color: "#D7A326",
  },
  {
    value: "PURPLE",
    color: "#7C3AED",
  },
];

const HIGHLIGHTS = [
  "High Protein",
  "Roasted",
  "Never Fried",
  "Gluten Free",
  "Vegan",
  "Rich Fibre",
  "No Preservatives",
  "100% Natural",
  "Low Fat",
];


const ProductDrawer = ({
  open,
  onClose,
  onSave,
  product = null,
  categories = [],
  saving = false,
}) => {
  const [form, setForm] =
    useState(initialState);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,

        categoryId:
          product.categoryId ?? "",

        images: [],
      });
    } else {
      setForm(initialState);
    }
  }, [product, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const toggleHighlight = (highlight) => {

  setForm((prev) => ({

    ...prev,

    highlights: prev.highlights.includes(highlight)

      ? prev.highlights.filter(
          (item) => item !== highlight
        )

      : [...prev.highlights, highlight],

  }));

};

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">

              {product
                ? "Edit Product"
                : "Add Product"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Manage your product catalogue.

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          {/* ========================================= */}

          {/* BASIC INFORMATION */}

          {/* ========================================= */}

          <section>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">

              Basic Information

            </h3>

            <div className="space-y-5">

              {/* Product Name */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Product Name

                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Classic Cheese Popcorn"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Category */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Category

                </label>

                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                >

                  <option value="">

                    Select Category

                  </option>

                  {categories.map((category) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >

                      {category.name}

                    </option>

                  ))}

                </select>

              </div>

              {/* Weight */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Weight

                </label>

                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* SKU */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  SKU

                </label>

                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="PF-001"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Description

                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write product description..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

            </div>

          </section>

          {/* ========================================= */}

          {/* PRICE */}

          {/* ========================================= */}

          <section className="mt-10">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">

              Pricing & Inventory

            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Discount Price */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Discount Price

                </label>

                <input
                  type="number"
                  name="discountPrice"
                  value={form.discountPrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Stock */}

             {!product ? (

  <div>

    <label className="mb-2 block text-sm font-medium">
      Initial Stock
    </label>

    <input
      type="number"
      name="stock"
      value={form.stock}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
    />

  </div>

) : (

  <div
    className="
      rounded-xl
      border
      border-orange-200
      bg-orange-50
      p-4
    "
  >

    <p className="text-sm text-slate-500">
      Current Stock
    </p>

    <p className="mt-1 text-2xl font-bold text-orange-600">
      {product.stock}
    </p>

    <p className="mt-2 text-sm text-slate-500">
      Stock can only be updated from the Inventory page.
    </p>

  </div>

)}
             

            </div>

          </section>


                  <section className="mt-10">

  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
    Product Settings
  </h3>

  <div className="rounded-2xl border border-slate-200 p-5">

    <div className="flex items-center justify-between">

      <div>

        <h4 className="font-semibold text-slate-900">
          Product Status
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          Inactive products won't be visible to customers.
        </p>

      </div>

      <button
        type="button"
        onClick={() =>
          setForm((prev) => ({
            ...prev,
            isActive: !prev.isActive,
          }))
        }
        className={`relative h-7 w-12 rounded-full transition ${
          form.isActive
            ? "bg-orange-500"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            form.isActive
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>

  </div>

</section>
                    {/* ========================================= */}

          {/* PRODUCT SETTINGS */}

          {/* ========================================= */}

          {/* <section className="mt-10">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Product Settings
            </h3>

            <div className="space-y-5">

              <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <p className="font-medium">
                    Featured Product
                  </p>

                  <p className="text-sm text-slate-500">
                    Show this product on the home page.
                  </p>

                </div>

                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="h-5 w-5"
                />

              </label>

              <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <p className="font-medium">
                    Active Product
                  </p>

                  <p className="text-sm text-slate-500">
                    Customers can purchase this product.
                  </p>

                </div>

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-5 w-5"
                />

              </label>

            </div>

          </section> */}

          {/* ========================================= */}

{/* DISPLAY SETTINGS */}

{/* ========================================= */}

<section className="mt-10">

  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">

    Display Settings

  </h3>

  <div className="space-y-6">

    {/* Badge */}

    <div>

      <label className="mb-2 block text-sm font-medium">

        Badge

      </label>

      <select
        name="badge"
        value={form.badge}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
      >

        <option value="">

          None

        </option>

        {BADGES.map((badge) => (

          <option
            key={badge}
            value={badge}
          >

            {badge}

          </option>

        ))}

      </select>

    </div>

    {/* Card Theme */}

    <div>

      <label className="mb-3 block text-sm font-medium">

        Card Theme

      </label>

      <div className="grid grid-cols-5 gap-3">

        {CARD_THEMES.map((theme) => (

          <button
            key={theme.value}
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                cardTheme: theme.value,
              }))
            }
            className={`rounded-xl border-2 p-3 transition ${
              form.cardTheme === theme.value
                ? "border-orange-500 shadow-md"
                : "border-slate-200"
            }`}
          >

            <div
              className="mx-auto h-8 w-8 rounded-full"
              style={{
                background: theme.color,
              }}
            />

            <p className="mt-2 text-xs font-medium">

              {theme.value}

            </p>

          </button>

        ))}

      </div>

    </div>

    {/* Highlights */}

    <div>

      <label className="mb-3 block text-sm font-medium">

        Product Highlights

      </label>

      <div className="flex flex-wrap gap-3">

        {HIGHLIGHTS.map((highlight) => (

          <button
            key={highlight}
            type="button"
            onClick={() =>
              toggleHighlight(highlight)
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              form.highlights.includes(highlight)

                ? "bg-orange-500 text-white"

                : "border border-slate-300 bg-white hover:border-orange-500"
            }`}
          >

            {highlight}

          </button>

        ))}

      </div>

    </div>

    {/* Display Order */}

    <div>

      <label className="mb-2 block text-sm font-medium">

        Display Order

      </label>

      <input
        type="number"
        min="0"
        name="displayOrder"
        value={form.displayOrder}
        onChange={handleChange}
        className="w-40 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
      />

    </div>

  </div>

</section>

          {/* ========================================= */}

          {/* PRODUCT IMAGES */}

          {/* ========================================= */}

          <section className="mt-10">

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Product Images
            </h3>

            <ImageUploader
  images={form.images}
  onChange={(files) =>
    setForm((prev) => ({
      ...prev,
      images: files,
    }))
  }
/>
          </section>

        </div>

        {/* ========================================= */}

        {/* FOOTER */}

        {/* ========================================= */}

        <div className="flex items-center justify-end gap-4 border-t border-slate-200 bg-white px-6 py-5">

        <button
  disabled={saving}
  onClick={onClose}
  className="
    rounded-xl
    border
    border-slate-300
    px-6
    py-3
    font-medium
    hover:bg-slate-100
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  Cancel
</button>

          <button
  disabled={saving}
  onClick={() => {

    if (!form.name.trim()) {
      return alert("Product name is required.");
    }

    if (!form.categoryId) {
      return alert("Please select a category.");
    }

    if (!form.price) {
      return alert("Price is required.");
    }

    if (!form.stock) {
      return alert("Stock is required.");
    }

    onSave(form);

  }}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-orange-500
    px-6
    py-3
    font-semibold
    text-white
    transition
    hover:bg-orange-600
    disabled:cursor-not-allowed
    disabled:opacity-70
  "
>

  {saving ? (
    <>
      <Loader2
        size={18}
        className="animate-spin"
      />

      {product
        ? "Updating Product..."
        : "Creating Product..."}
    </>
  ) : (
    product
      ? "Update Product"
      : "Create Product"
  )}

</button>

        </div>

      </div>

    </>
  );

};

export default ProductDrawer;


// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// import ImageUploader from "./ImageUploader";

// const initialState = {
//   name: "",
//   description: "",
//   categoryId: "",

//   weight: "",

//   sku: "",

//   price: "",

//   discountPrice: "",

//   stock: "",

//   status: "ACTIVE",

//   isFeatured: false,

//   isActive: true,

//   images: [],
// };

// const ProductDrawer = ({
//   open,
//   onClose,
//   onSave,
//   product = null,
//   categories = [],
// }) => {
//   const [form, setForm] =
//     useState(initialState);

//   useEffect(() => {
//     if (product) {
//       setForm({
//         ...product,

//         categoryId:
//           product.categoryId ?? "",

//         images: [],
//       });
//     } else {
//       setForm(initialState);
//     }
//   }, [product, open]);

//   if (!open) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } =
//       e.target;

//     setForm((prev) => ({
//       ...prev,

//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };

//   return (
//     <>
//       {/* Backdrop */}

//       <div
//         onClick={onClose}
//         className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
//       />

//       {/* Drawer */}

//       <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl">

//         {/* Header */}

//         <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

//           <div>

//             <h2 className="text-2xl font-bold text-slate-900">

//               {product
//                 ? "Edit Product"
//                 : "Add Product"}

//             </h2>

//             <p className="mt-1 text-sm text-slate-500">

//               Manage your product catalogue.

//             </p>

//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Body */}

//         <div className="flex-1 overflow-y-auto p-6">

//           {/* ========================================= */}

//           {/* BASIC INFORMATION */}

//           {/* ========================================= */}

//           <section>

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">

//               Basic Information

//             </h3>

//             <div className="space-y-5">

//               {/* Product Name */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Product Name

//                 </label>

//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Classic Cheese Popcorn"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* Category */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Category

//                 </label>

//                 <select
//                   name="categoryId"
//                   value={form.categoryId}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 >

//                   <option value="">

//                     Select Category

//                   </option>

//                   {categories.map((category) => (

//                     <option
//                       key={category.id}
//                       value={category.id}
//                     >

//                       {category.name}

//                     </option>

//                   ))}

//                 </select>

//               </div>

//               {/* Weight */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Weight

//                 </label>

//                 <input
//                   name="weight"
//                   value={form.weight}
//                   onChange={handleChange}
//                   placeholder="80g"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* SKU */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   SKU

//                 </label>

//                 <input
//                   name="sku"
//                   value={form.sku}
//                   onChange={handleChange}
//                   placeholder="PF-001"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* Description */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Description

//                 </label>

//                 <textarea
//                   rows={5}
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   placeholder="Write product description..."
//                   className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//             </div>

//           </section>

//           {/* ========================================= */}

//           {/* PRICE */}

//           {/* ========================================= */}

//           <section className="mt-10">

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">

//               Pricing & Inventory

//             </h3>

//             <div className="grid gap-5 md:grid-cols-2">

//               {/* Price */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Price

//                 </label>

//                 <input
//                   type="number"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* Discount Price */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Discount Price

//                 </label>

//                 <input
//                   type="number"
//                   name="discountPrice"
//                   value={form.discountPrice}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* Stock */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Stock

//                 </label>

//                 <input
//                   type="number"
//                   name="stock"
//                   value={form.stock}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 />

//               </div>

//               {/* Status */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium">

//                   Status

//                 </label>

//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
//                 >

//                   <option value="ACTIVE">

//                     ACTIVE

//                   </option>

//                   <option value="INACTIVE">

//                     INACTIVE

//                   </option>

//                 </select>

//               </div>

//             </div>

//           </section>

//                     {/* ========================================= */}

//           {/* PRODUCT SETTINGS */}

//           {/* ========================================= */}

//           <section className="mt-10">

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Product Settings
//             </h3>

//             <div className="space-y-5">

//               <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

//                 <div>

//                   <p className="font-medium">
//                     Featured Product
//                   </p>

//                   <p className="text-sm text-slate-500">
//                     Show this product on the home page.
//                   </p>

//                 </div>

//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={form.isFeatured}
//                   onChange={handleChange}
//                   className="h-5 w-5"
//                 />

//               </label>

//               <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

//                 <div>

//                   <p className="font-medium">
//                     Active Product
//                   </p>

//                   <p className="text-sm text-slate-500">
//                     Customers can purchase this product.
//                   </p>

//                 </div>

//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={form.isActive}
//                   onChange={handleChange}
//                   className="h-5 w-5"
//                 />

//               </label>

//             </div>

//           </section>

//           {/* ========================================= */}

//           {/* PRODUCT IMAGES */}

//           {/* ========================================= */}

//           <section className="mt-10">

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Product Images
//             </h3>

//             <ImageUploader
//   images={form.images}
//   onChange={(files) =>
//     setForm((prev) => ({
//       ...prev,
//       images: files,
//     }))
//   }
// />
//           </section>

//         </div>

//         {/* ========================================= */}

//         {/* FOOTER */}

//         {/* ========================================= */}

//         <div className="flex items-center justify-end gap-4 border-t border-slate-200 bg-white px-6 py-5">

//           <button
//             onClick={onClose}
//             className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => {

//               if (!form.name.trim()) {
//                 return alert("Product name is required.");
//               }

//               if (!form.categoryId) {
//                 return alert("Please select a category.");
//               }

//               if (!form.price) {
//                 return alert("Price is required.");
//               }

//               if (!form.stock) {
//                 return alert("Stock is required.");
//               }

//               onSave(form);

//             }}
//             className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//           >

//             {product
//               ? "Update Product"
//               : "Create Product"}

//           </button>

//         </div>

//       </div>

//     </>
//   );

// };

// export default ProductDrawer;

// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import ImageUploader from "./ImageUploader";

// const initialState = {
//   name: "",
//   category: "",
//   weight: "",
//   sku: "",
//   shortDescription: "",

//   mrp: "",
//   sellingPrice: "",
//   stock: "",

//   status: "Active",

//   tags: [],

//   images: [],
// };

// const ProductDrawer = ({
//   open,
//   onClose,
//   onSave,
//   product = null,
// }) => {
//   const [form, setForm] = useState(initialState);

//   useEffect(() => {
//     if (product) {
//       setForm(product);
//     } else {
//       setForm(initialState);
//     }
//   }, [product, open]);

//   if (!open) return null;

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <>
//       {/* Backdrop */}

//       <div
//         onClick={onClose}
//         className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
//       />

//       {/* Drawer */}

//       <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl">

//         {/* Header */}

//         <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

//           <div>
//             <h2 className="text-2xl font-bold text-slate-900">
//               {product ? "Edit Product" : "Add Product"}
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage your popcorn catalogue.
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 transition hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Body */}

//         <div className="flex-1 overflow-y-auto p-6">

//           {/* Basic Information */}

//           <section>

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Basic Information
//             </h3>

//             <div className="space-y-5">

//               {/* Product Name */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Product Name
//                 </label>

//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Classic Cheese Popcorn"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//               {/* Category + Weight */}

//               <div className="grid gap-5 md:grid-cols-2">

//                 <div>

//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Category
//                   </label>

//                   <select
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                   >
//                     <option value="">
//                       Select Category
//                     </option>

//                     <option>Cheese Popcorn</option>
//                     <option>Sweet Popcorn</option>
//                     <option>Masala</option>
//                     <option>Classic</option>
//                     <option>Spicy Popcorn</option>
//                     <option>Combo</option>

//                   </select>

//                 </div>

//                 <div>

//                   <label className="mb-2 block text-sm font-medium text-slate-700">
//                     Weight
//                   </label>

//                   <input
//                     name="weight"
//                     value={form.weight}
//                     onChange={handleChange}
//                     placeholder="80g"
//                     className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                   />

//                 </div>

//               </div>

//               {/* SKU */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   SKU
//                 </label>

//                 <input
//                   name="sku"
//                   value={form.sku}
//                   onChange={handleChange}
//                   placeholder="PFP-001"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//               {/* Description */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Short Description
//                 </label>

//                 <textarea
//                   rows={4}
//                   name="shortDescription"
//                   value={form.shortDescription}
//                   onChange={handleChange}
//                   placeholder="Write a short product description..."
//                   className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//             </div>

//           </section>
//                     {/* Pricing */}

//           <section className="mt-10">

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Pricing & Inventory
//             </h3>

//             <div className="grid gap-5 md:grid-cols-2">

//               {/* MRP */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   MRP (₹)
//                 </label>

//                 <input
//                   type="number"
//                   name="mrp"
//                   value={form.mrp}
//                   onChange={handleChange}
//                   placeholder="249"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//               {/* Selling Price */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Selling Price (₹)
//                 </label>

//                 <input
//                   type="number"
//                   name="sellingPrice"
//                   value={form.sellingPrice}
//                   onChange={handleChange}
//                   placeholder="199"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//               {/* Stock */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Stock Quantity
//                 </label>

//                 <input
//                   type="number"
//                   name="stock"
//                   value={form.stock}
//                   onChange={handleChange}
//                   placeholder="150"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 />

//               </div>

//               {/* Status */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Product Status
//                 </label>

//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
//                 >
//                   <option>Active</option>
//                   <option>Out of Stock</option>
//                   <option>Inactive</option>
//                 </select>

//               </div>

//             </div>

//           </section>

//           {/* Tags */}

//           <section className="mt-10">

//             <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Product Tags
//             </h3>

//             <div className="flex flex-wrap gap-3">

//               {[
//                 "BEST SELLER",
//                 "NEW LAUNCH",
//                 "COMBO PACK",
//                 "POPULAR",
//                 "SPICY",
//                 "COMING SOON",
//               ].map((tag) => {

//                 const active = form.tags.includes(tag);

//                 return (
//                   <button
//                     key={tag}
//                     type="button"
//                     onClick={() => {

//                       if (active) {

//                         setForm((prev) => ({
//                           ...prev,
//                           tags: prev.tags.filter(
//                             (item) => item !== tag
//                           ),
//                         }));

//                       } else {

//                         setForm((prev) => ({
//                           ...prev,
//                           tags: [...prev.tags, tag],
//                         }));

//                       }

//                     }}
//                     className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
//                       active
//                         ? "border-orange-500 bg-orange-500 text-white"
//                         : "border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600"
//                     }`}
//                   >
//                     {tag}
//                   </button>
//                 );

//               })}

//             </div>

//           </section>

//           {/* Product Image */}

//           {/* Product Image */}

// <section className="mt-10">

//   <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//     Product Image
//   </h3>

//   <ImageUploader
//     images={form.images}
//     onChange={(newImages) =>
//   setForm((prev) => ({
//     ...prev,
//     images: [...prev.images, ...newImages],
//   }))

//     }
//     onRemove={(index) =>
//   setForm((prev) => ({
//     ...prev,
//     images: prev.images.filter((_, i) => i !== index),
//   }))
// }
//   />

// </section>
//                   </div>

//         {/* Footer */}

//         <div className="border-t border-slate-200 bg-slate-50 p-5">

//           <div className="flex gap-3">

//             <button
//               onClick={onClose}
//               className="flex-1 rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={() => {
//                 if (
//                   !form.name ||
//                   !form.category ||
//                   !form.weight ||
//                   !form.sku ||
//                   !form.mrp ||
//                   !form.sellingPrice
//                 ) {
//                   alert("Please fill all required fields.");
//                   return;
//                 }

//                 onSave({
//                   ...form,

//                   id:
//                     product?.id ||
//                     `PF${Date.now()}`,

//                   slug:
//                     form.name
//                       .toLowerCase()
//                       .replace(/\s+/g, "-"),
//                 });

//                 setForm(initialState);

//                 onClose();
//               }}
//               className="flex-1 rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
//             >
//               {product
//                 ? "Update Product"
//                 : "Add Product"}
//             </button>

//           </div>

//         </div>

//       </div>

//     </>
//   );
// };

// export default ProductDrawer;