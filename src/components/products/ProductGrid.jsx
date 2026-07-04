import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:bg-[#1A2420] dark:border-[#A7C89A]">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          No Products Found
        </h3>

        <p className="mt-2 text-slate-500 dark:text-white">
          No products match your current search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;