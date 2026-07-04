import {
  Pencil,
  Trash2,
  Package,
  IndianRupee,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
}) => {

  const image =
    product.images?.[0]?.imageUrl ||
    "https://placehold.co/600x600?text=No+Image";

  return (
    <div
  className="
    flex
    flex-col
    h-full
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    dark:border-slate-800
    bg-white
    dark:bg-[#18211D]
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
>

     {/* IMAGE */}

<div className="relative">

  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    className="h-56"
  >
    {(product.images?.length
      ? product.images
      : [
          {
            imageUrl:
              "https://placehold.co/600x600?text=No+Image",
          },
        ]
    ).map((image, index) => (
      <SwiperSlide key={image.id ?? index}>
        <img
          src={image.imageUrl}
          alt={product.name}
          className="
        h-56
        w-full
        object-contain
        bg-white
        p-3
    "
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Image Count */}
  <span
    className="
      absolute
      left-4
      top-4
      z-10
      rounded-full
      bg-black/70
      px-3
      py-1
      text-xs
      font-semibold
      text-white
    "
  >
    🖼 {product.images?.length || 0}
  </span>

  {/* Status */}
  <span
    className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold ${
      product.isActive
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {product.isActive ? "ACTIVE" : "INACTIVE"}
  </span>

</div>

      {/* BODY */}

      <div className="flex flex-1 flex-col p-5">

        {/* NAME */}

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {product.name}
        </h3>

        {/* CATEGORY */}

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {product.category?.name || "-"} • {product.weight || "-"}
        </p>

        {/* DESCRIPTION */}

        <p
    className="
        mt-3
        min-h-[52px]
        line-clamp-2
        text-sm
        leading-6
        text-slate-600
    "
>
          {product.description}
        </p>

        {/* PRICE */}

        <div className="mt-5 flex items-center gap-3">

          <div className="flex items-center gap-1 text-2xl font-bold text-[#FA7315]">

            <IndianRupee size={18} />

            {Number(product.price).toFixed(2)}

          </div>

          {product.discountPrice && (

            <span className="text-sm text-slate-400 line-through">

              ₹{Number(product.discountPrice).toFixed(2)}

            </span>

          )}

        </div>

        {/* SKU */}

        <div
          className="
          mt-4
          flex
          items-center
          justify-between
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800/60
          px-4
          py-3
          "
        >

          <span className="text-sm text-slate-500">
            SKU
          </span>

          <span className="font-medium text-slate-900 dark:text-white">
            {product.sku}
          </span>

        </div>

        {/* STOCK */}

        <div
          className="
          mt-3
          flex
          items-center
          justify-between
          rounded-2xl
          bg-slate-50
          dark:bg-slate-800/60
          px-4
          py-3
          "
        >

          <div className="flex items-center gap-2">

            <Package
              size={17}
              className="text-orange-500"
            />

            <span className="text-sm text-slate-600 dark:text-slate-300">
              Stock
            </span>

          </div>

          <span
            className={`font-semibold ${
              product.stock > 20
                ? "text-emerald-600"
                : product.stock > 0
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {product.stock}
          </span>

        </div>

        {/* ACTIONS */}

        <div className="mt-auto pt-6 flex gap-3">

          <button
            onClick={() => onEdit(product)}
            className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            text-sm
            font-semibold
            text-slate-700
            transition
            hover:border-orange-300
            hover:bg-orange-50
            hover:text-orange-600
            "
          >

            <Pencil size={16} />

            Edit

          </button>

          <button
            onClick={() => onDelete(product)}
            className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            py-3
            text-sm
            font-semibold
            text-red-500
            transition
            hover:bg-red-100
            "
          >

            <Trash2 size={16} />

            Delete

          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;

// import {
//   Pencil,
//   Trash2,
//   Package,
//   IndianRupee,
// } from "lucide-react";

// import ProductTag from "./ProductTag";

// const ProductCard = ({
//   product,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div 
//     className="
// overflow-hidden
// rounded-3xl
// border
// border-slate-200
// dark:border-slate-800
// bg-white
// dark:bg-[#18211D]
// shadow-sm
// transition-all
// duration-300
// hover:-translate-y-1
// hover:shadow-xl
// "
//     >

//       {/* Product Image */}

//       <div className="relative">

//         <img
//   src={product.images?.[0]}
//   alt={product.name}
//   className="h-56 w-full object-cover"
// />

//         {/* Status */}

//         <span
//           className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
//             product.status === "Active"
//               ? "bg-emerald-100 text-emerald-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {product.status}
//         </span>

//       </div>

//       {/* Body */}

//       <div className="p-5">

//         {/* Tags */}

//         {product.tags.length > 0 && (
//           <div className="mb-4 flex flex-wrap gap-2">
//             {product.tags.map((tag) => (
//               <ProductTag
//                 key={tag}
//                 tag={tag}
//               />
//             ))}
//           </div>
//         )}

//         {/* Name */}

//         <h3 className="text-lg font-bold text-slate-900 dark:text-white">
//           {product.name}
//         </h3>

//         {/* Category */}

//         <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//           {product.category} • {product.weight}
//         </p>

//         {/* Description */}

//         <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
//           {product.shortDescription}
//         </p>

//         {/* Price */}

//         <div className="mt-5 flex items-center gap-3">

//           <div className="flex items-center gap-1 text-2xl font-bold text-slate-900 dark:text-white">

//             <IndianRupee size={18} />

//             {product.sellingPrice}

//           </div>

//           <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
//             ₹{product.mrp}
//           </span>

//         </div>

//         {/* SKU */}

//         <div 
//         className="
// mt-4
// flex
// items-center
// justify-between
// rounded-2xl
// bg-slate-50
// dark:bg-slate-800/60
// px-4
// py-3
// "
//         >

//           <span className="text-sm text-slate-500 dark:text-slate-400">
//             SKU
//           </span>

//           <span className="font-medium text-slate-900 dark:text-white">
//             {product.sku}
//           </span>

//         </div>

//         {/* Stock */}

//         <div 
//         className="
// mt-3
// flex
// items-center
// justify-between
// rounded-2xl
// bg-slate-50
// dark:bg-slate-800/60
// px-4
// py-3
// "
//         >

//           <div className="flex items-center gap-2">

//             <Package
//               size={17}
//               className="text-orange-500"
//             />

//             <span className="text-sm text-slate-600 dark:text-slate-300">
//               Stock
//             </span>

//           </div>

//           <span
//             className={`font-semibold ${
//               product.stock > 20
//                 ? "text-emerald-600"
//                 : product.stock > 0
//                 ? "text-amber-600"
//                 : "text-red-600"
//             }`}
//           >
//             {product.stock}
//           </span>

//         </div>

//         {/* Footer */}

//         <div className="mt-6 flex gap-3">

//           <button
//             onClick={() => onEdit(product)}
//             className="
// flex
// flex-1
// items-center
// justify-center
// gap-2
// rounded-xl
// border
// border-slate-200
// dark:border-slate-700
// bg-white
// dark:bg-[#18211D]
// py-3
// text-sm
// font-semibold
// text-slate-700
// dark:text-white
// transition
// hover:border-orange-300
// hover:bg-orange-50
// dark:hover:bg-[#111916]
// hover:text-orange-600
// "
//           >
//             <Pencil size={16} />
//             Edit
//           </button>

//           <button
//             onClick={() => onDelete(product)}
//             className="
// flex
// flex-1
// items-center
// justify-center
// gap-2
// rounded-xl
// border
// border-red-200
// dark:border-red-900/40
// bg-red-50
// dark:bg-red-900/10
// py-3
// text-sm
// font-semibold
// text-red-400
// transition
// hover:bg-red-100
// dark:hover:bg-red-900/20
// "
//           >
//             <Trash2 size={16} />
//             Delete
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductCard;