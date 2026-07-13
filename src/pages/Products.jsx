import { useEffect, useMemo, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSocket } from "../context/SocketContext";
import ProductsHero from "../components/products/ProductsHero";
import ProductGrid from "../components/products/ProductGrid";
import ProductDrawer from "../components/products/ProductDrawer";
import { getCategories } from "../api/category.api";

import StatCard from "../components/dashboard/StatCard";

import {
  Package,
  Boxes,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
  getProductById
} from "../api/product.api";

const Products = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);


    const [categories, setCategories] = useState([]);

    const [saving, setSaving] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { socket } = useSocket();

  // ===========================================
  // FETCH PRODUCTS
  // ===========================================

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await getProducts({
  isAdmin: true,
});
        console.log(response);

      setProducts(response.products || []);

    } catch (error) {

      console.error(error);
      toast.error(
    error.response?.data?.message ??
    "Failed to load products."
  );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
  const openProductFromSearch = async () => {
    const productId = location.state?.entityId;

    if (!productId) return;

    try {
      const product = await getProductById(productId);

      setSelectedProduct(product);

      setDrawerOpen(true);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    } catch (error) {
      console.error("Failed to open product:", error);
    }
  };

  openProductFromSearch();
}, [location.state, navigate]);

  const fetchCategories = async () => {
  try {
    const categories = await getCategories();

    console.log("Categories:", categories);

    setCategories(categories);

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
  const refreshProducts = async () => {
    console.log("🔥 product event received");

    await fetchProducts();
  };

  socket.on("product:created", refreshProducts);
  socket.on("product:updated", refreshProducts);
  socket.on("product:deleted", refreshProducts);

  return () => {
    socket.off("product:created", refreshProducts);
    socket.off("product:updated", refreshProducts);
    socket.off("product:deleted", refreshProducts);
  };
}, [socket]);

  // ===========================================
  // SEARCH
  // ===========================================

  const filteredProducts = useMemo(() => {

    const search =
      searchTerm.toLowerCase();

    return products.filter((product) => {

      return (

        product.name
          ?.toLowerCase()
          .includes(search)

        ||

        product.sku
          ?.toLowerCase()
          .includes(search)

        ||

        product.category?.name
          ?.toLowerCase()
          .includes(search)

      );

    });

  }, [products, searchTerm]);

  // ===========================================
  // KPI
  // ===========================================

  const stats = useMemo(() => {

    return {

      totalProducts:
        products.length,

      
        activeProducts: products.filter(
  (product) => product.isActive
).length,

      lowStock:

        products.filter(
          (product) =>
            product.stock > 0 &&
            product.stock <= 20
        ).length,

      inventoryValue:

        products.reduce(

          (total, product) =>

            total +

            product.stock *

            Number(product.price),

          0

        ),

    };

  }, [products]);

  // ===========================================
  // REFRESH
  // ===========================================

  const handleRefresh = () => {

    setSearchTerm("");

    fetchProducts();

  };

  // ===========================================
  // ADD
  // ===========================================

  const handleAddProduct = () => {

    setSelectedProduct(null);

    setDrawerOpen(true);

  };

  // ===========================================
  // EDIT
  // ===========================================

  const handleEditProduct = (
    product
  ) => {

    setSelectedProduct(product);

    setDrawerOpen(true);

  };

  // ===========================================
  // DELETE
  // ===========================================

  const handleDeleteProduct = async (
    product
  ) => {

    const confirmDelete =
      window.confirm(
        `Delete "${product.name}" ?`
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(product.id);

      toast.success(
  "Product deleted successfully."
);


    await  fetchProducts();

    } catch (error) {


         toast.error(
    error.response?.data?.message ??
    "Failed to delete product."
  );
      console.error(error);

    }

  };

  // ===========================================
  // SAVE
  // ===========================================

  const handleSaveProduct = async (
    formData
  ) => {

    try {
      setSaving(true);
      if (selectedProduct) {

        await updateProduct(

          selectedProduct.id,

          formData

        );
        toast.success(
  "Product updated successfully."
);

      } else {

  const { images = [], ...productData } = formData;

  const product = await createProduct(productData);
  toast.success("Product created successfully.");

  if (images.length > 0) {
    await uploadImages(
      product.id,
      images
    );
  }



      }

      await fetchProducts();

      setDrawerOpen(false);

      setSelectedProduct(null);

    } catch (error) {

      console.error(error);
      toast.error(
    error.response?.data?.message ??
    "Failed to save product."
      );
    }finally {

    setSaving(false);

  }

  };

  return (
    <>

      <ProductsHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={handleRefresh}
        onAddProduct={handleAddProduct}
      />

      <div className="grid gap-5 lg:grid-cols-4">

        <StatCard
          title="TOTAL PRODUCTS"
          value={stats.totalProducts}
          subtitle="catalog products"
          icon={Package}
        />

        <StatCard
          title="ACTIVE PRODUCTS"
          value={stats.activeProducts}
          subtitle="currently available"
          icon={Boxes}
        />

        <StatCard
          title="LOW STOCK"
          value={stats.lowStock}
          subtitle="needs restocking"
          icon={AlertTriangle}
        />

        <StatCard
          title="INVENTORY VALUE"
          value={`₹${stats.inventoryValue.toLocaleString()}`}
          subtitle="estimated stock value"
          icon={IndianRupee}
        />

      </div>

      <div className="mt-6">

        {loading ? (

          <div className="rounded-2xl bg-white p-10 text-center">

            Loading products...

          </div>

        ) : (

          <ProductGrid
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

        )}

      </div>

      <ProductDrawer
        open={drawerOpen}
        saving={saving}
        product={selectedProduct}
        categories={categories}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />

    </>
  );
};

export default Products;


// import { useMemo, useState } from "react";

// import ProductsHero from "../components/products/ProductsHero";
// import ProductGrid from "../components/products/ProductGrid";
// import ProductDrawer from "../components/products/ProductDrawer";

// import StatCard from "../components/dashboard/StatCard";

// import productsData from "../data/productsData";

// import {
//   Package,
//   Boxes,
//   AlertTriangle,
//   IndianRupee,
// } from "lucide-react";

// const Products = () => {
//   const [products, setProducts] = useState(productsData);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const filteredProducts = useMemo(() => {
//     const search = searchTerm.toLowerCase();

//     return products.filter((product) => {
//       return (
//         product.name.toLowerCase().includes(search) ||
//         product.category.toLowerCase().includes(search) ||
//         product.sku.toLowerCase().includes(search)
//       );
//     });
//   }, [products, searchTerm]);

//   const stats = useMemo(() => {
//     return {
//       totalProducts: products.length,

//       activeProducts: products.filter(
//         (product) => product.status === "Active"
//       ).length,

//       lowStock: products.filter(
//         (product) =>
//           product.stock > 0 &&
//           product.stock <= 20
//       ).length,

//       inventoryValue: products.reduce(
//         (total, product) =>
//           total + product.stock * product.sellingPrice,
//         0
//       ),
//     };
//   }, [products]);

//   const handleRefresh = () => {
//     setSearchTerm("");
//     setProducts(productsData);
//   };

//   const handleAddProduct = () => {
//     setSelectedProduct(null);
//     setDrawerOpen(true);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setDrawerOpen(true);
//   };

//   const handleDeleteProduct = (product) => {
//     const confirmDelete = window.confirm(
//       `Delete "${product.name}" ?`
//     );

//     if (!confirmDelete) return;

//     setProducts((prev) =>
//       prev.filter((item) => item.id !== product.id)
//     );
//   };

//   const handleSaveProduct = (productData) => {
//     if (selectedProduct) {
//       setProducts((prev) =>
//         prev.map((product) =>
//           product.id === productData.id
//             ? productData
//             : product
//         )
//       );
//     } else {
//       setProducts((prev) => [
//         productData,
//         ...prev,
//       ]);
//     }

//     setDrawerOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <>
//       <ProductsHero
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         onRefresh={handleRefresh}
//         onAddProduct={handleAddProduct}
//       />

//       {/* KPI Cards */}

//       <div className="grid gap-5 lg:grid-cols-4">

//         <StatCard
//           title="TOTAL PRODUCTS"
//           value={stats.totalProducts}
//           subtitle="catalog products"
//           icon={Package}
//         />

//         <StatCard
//           title="ACTIVE PRODUCTS"
//           value={stats.activeProducts}
//           subtitle="currently available"
//           icon={Boxes}
//         />

//         <StatCard
//           title="LOW STOCK"
//           value={stats.lowStock}
//           subtitle="needs restocking"
//           icon={AlertTriangle}
//         />

//         <StatCard
//           title="INVENTORY VALUE"
//           value={`₹${stats.inventoryValue.toLocaleString()}`}
//           subtitle="estimated stock value"
//           icon={IndianRupee}
//         />

//       </div>

//       {/* Product Grid */}

//       <div className="mt-6">

//         <ProductGrid
//           products={filteredProducts}
//           onEdit={handleEditProduct}
//           onDelete={handleDeleteProduct}
//         />

//       </div>

//       {/* Drawer */}

//       <ProductDrawer
//         open={drawerOpen}
//         product={selectedProduct}
//         onClose={handleCloseDrawer}
//         onSave={handleSaveProduct}
//       />
//     </>
//   );
// };

// export default Products;