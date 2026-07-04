import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";

import InventoryHero from "../components/inventory/InventoryHero";
import InventoryTable from "../components/inventory/InventoryTable";
import UpdateInventoryDrawer from "../components/inventory/UpdateInventoryDrawer";

import StatCard from "../components/dashboard/StatCard";
import {
  getInventory,
  updateInventory,
} from "../api/inventory.api";



import {
  Boxes,
  Package,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const Inventory = () => {
  const [inventory, setInventory] =
useState([]);

const [loading, setLoading] =
useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);



//   const fetchInventory = async () => {
//   try {
//     setLoading(true);

//     const data =
//       await getInventory();

//     setInventory(data);

//   } catch (err) {

//     console.error(err);

//     toast.error(
//       "Failed to load inventory."
//     );

//   } finally {

//     setLoading(false);

//   }
// };


const fetchInventory = async () => {
  try {
    setLoading(true);

    const products = await getInventory();

const inventory = products.map((product) => {
  const reorderLevel = 10;

  let status = "Healthy";

  if (product.stock === 0) {
    status = "Out of Stock";
  } else if (product.stock <= reorderLevel) {
    status = "Low Stock";
  }

  return {
    ...product,
    productName: product.name,
    reorderLevel,
    status,
    lastUpdated: new Date(product.updatedAt).toLocaleString(),
    category: product.category?.name ?? "-",
  };
});

setInventory(inventory);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }
};
useEffect(() => {
  fetchInventory();
}, []);
  

  const filteredInventory = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return inventory.filter((item) => {
      return (
        item.productName.toLowerCase().includes(search) ||
        item.sku.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
      );
    });
  }, [inventory, searchTerm]);

  // KPI Cards

  const stats = useMemo(() => {
    return {
      totalProducts: inventory.length,

      totalUnits: inventory.reduce(
        (total, item) => total + item.stock,
        0
      ),

      lowStock: inventory.filter(
        (item) => item.status === "Low Stock"
      ).length,

      outOfStock: inventory.filter(
        (item) => item.status === "Out of Stock"
      ).length,
    };
  }, [inventory]);

  // Refresh

  const handleRefresh = () => {
    setSearchTerm("");
    fetchInventory();
  };

  // Open Drawer

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  // Close Drawer

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  // Save Inventory

//   const handleSaveInventory = (updatedItem) => {
//     setInventory((prev) =>
//       prev.map((item) =>
//         item.id === updatedItem.id
//           ? updatedItem
//           : item
//       )
//     );

//     handleCloseDrawer();
//   };

const handleSaveInventory = async (
  updatedItem
) => {

  try {

    await updateInventory(
      updatedItem.id,
      updatedItem.stock
    );

    toast.success(
      "Inventory updated successfully."
    );

    await fetchInventory();

    handleCloseDrawer();

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ??
      "Failed to update inventory."
    );

  }

};

  return (
    <>
      <InventoryHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={handleRefresh}
      />

      {/* KPI Cards */}

      <div className="grid gap-5 lg:grid-cols-4">

        <StatCard
          title="TOTAL PRODUCTS"
          value={stats.totalProducts}
          subtitle="inventory items"
          icon={Package}
        />

        <StatCard
          title="TOTAL STOCK"
          value={stats.totalUnits}
          subtitle="available units"
          icon={Boxes}
        />

        <StatCard
          title="LOW STOCK"
          value={stats.lowStock}
          subtitle="requires attention"
          icon={AlertTriangle}
        />

        <StatCard
          title="OUT OF STOCK"
          value={stats.outOfStock}
          subtitle="currently unavailable"
          icon={XCircle}
        />

      </div>

      {/* Inventory Table */}

      <div className="mt-6">

       {loading ? (

  <div className="py-20 text-center dark:text-white">
    Loading inventory...
  </div>

) : (

  <InventoryTable
    inventory={filteredInventory}
    onUpdate={handleUpdate}
  />

)}

      </div>

      {/* Update Drawer */}

      <UpdateInventoryDrawer
        open={drawerOpen}
        item={selectedItem}
        onClose={handleCloseDrawer}
        onSave={handleSaveInventory}
      />
    </>
  );
};

export default Inventory;