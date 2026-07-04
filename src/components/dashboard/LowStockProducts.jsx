import Card from "../ui/Card";

const products = [
  {
    name: "Cheese Popcorn",
    stock: 12,
  },
  {
    name: "Peri Peri Popcorn",
    stock: 8,
  },
  {
    name: "Salted Caramel",
    stock: 5,
  },
];

const LowStockProducts = () => {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-[#032F23] dark:text-white">
        Low Stock
      </h3>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between"
          >
            <p className="dark:text-white">
              {product.name}
            </p>

            <span className="rounded-lg bg-red-100 px-2 py-1 text-xs text-red-600">
              {product.stock} left
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LowStockProducts;