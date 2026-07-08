import { useState } from "react";
import {
    Eye,
    Loader2,
} from "lucide-react";

import ShipmentStatusBadge from "./ShipmentStatusBadge";
import ShipmentDrawer from "./ShipmentDrawer";
import OrderStatusBadge from "../orders/StatusBadge";

const ShipmentTable = ({

    loading,

    shipments,

    pagination,

    page,

    onPageChange,

}) => {

    const [selectedShipment, setSelectedShipment] =
        useState(null);

    if (loading) {

        return (

            <div
                className="
                    flex
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-[#18211D]
                    py-24
                "
            >

                <Loader2
                    className="animate-spin text-orange-500"
                    size={32}
                />

            </div>

        );

    }

    return (

        <>

            <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    dark:border-slate-800
                    bg-white
                    dark:bg-[#18211D]
                    shadow-sm
                "
            >

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead
                            className="
                                border-b
                                border-slate-200
                                dark:border-slate-800
                                bg-slate-50
                                dark:bg-[#111916]
                            "
                        >

                            <tr>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Receipt
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Customer
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Courier
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    AWB
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Shipment Status
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Order Status
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Created
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                            {shipments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={8}
                                        className="px-6 py-20 text-center text-slate-500 dark:text-slate-400"
                                    >

                                        No shipments found.

                                    </td>

                                </tr>

                            ) : (

                                shipments.map((shipment) => (

                                    <tr
                                        key={shipment.id}
                                        className="
                                            transition-all
                                            duration-200
                                            hover:bg-orange-50/40
                                            dark:hover:bg-[#111916]
                                        "
                                    >

                                        {/* Receipt */}

                                        <td className="px-6 py-5">

                                            <div className="font-semibold text-slate-900 dark:text-white">

                                                {shipment.order?.receipt}

                                            </div>

                                        </td>

                                        {/* Customer */}

                                        <td className="px-6 py-5">

                                            <div>

                                                <div className="font-semibold text-slate-900 dark:text-white">

                                                    {shipment.order?.shippingName}

                                                </div>

                                                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                                                    {shipment.order?.shippingPhone}

                                                </div>

                                            </div>

                                        </td>

                                        {/* Courier */}

                                        <td className="px-6 py-5">

                                            <span className="text-sm text-slate-700 dark:text-slate-300">

                                                {shipment.courierName || "--"}

                                            </span>

                                        </td>

                                        {/* AWB */}

                                        <td className="px-6 py-5">

                                            <span
                                                className="
                                                    rounded-xl
                                                    bg-slate-100
                                                    dark:bg-[#111916]
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    font-medium
                                                    text-slate-700
                                                    dark:text-white
                                                "
                                            >

                                                {shipment.awbCode || "--"}

                                            </span>

                                        </td>

                                        {/* Shipment Status */}

                                        <td className="px-6 py-5">

                                            <ShipmentStatusBadge
                                                status={shipment.status}
                                            />

                                        </td>

                                        {/* Order Status */}

                                        <td className="px-6 py-5">

                                            <OrderStatusBadge
                                                status={shipment.order?.status}
                                            />

                                        </td>

                                        {/* Created */}

                                        <td className="px-6 py-5">

                                            <span className="text-sm text-slate-500 dark:text-slate-400">

                                                {shipment.order?.createdAt
                                                    ? new Date(
                                                          shipment.order.createdAt
                                                      ).toLocaleDateString(
                                                          "en-IN",
                                                          {
                                                              day: "2-digit",
                                                              month: "short",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "--"}

                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td className="px-6 py-5 text-center">

                                            <button
                                                onClick={() =>
                                                    setSelectedShipment(shipment)
                                                }
                                                className="
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    border-slate-200
                                                    dark:border-slate-700
                                                    bg-white
                                                    dark:bg-[#18211D]
                                                    p-2
                                                    text-slate-700
                                                    dark:text-white
                                                    transition-all
                                                    duration-300
                                                    hover:bg-orange-100
                                                    dark:hover:bg-[#111916]
                                                    dark:hover:border-orange-300
                                                "
                                                title="View Shipment"
                                            >

                                                <Eye size={18} />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>
                                {/* ===================================================== */}
                {/* Pagination */}
                {/* ===================================================== */}

                {pagination.totalPages > 1 && (

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            border-t
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-[#18211D]
                            px-6
                            py-4
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <p className="text-sm text-slate-500 dark:text-slate-400">

                            Page{" "}

                            <span className="font-semibold text-slate-900 dark:text-white">

                                {page}

                            </span>

                            {" "}of{" "}

                            <span className="font-semibold text-slate-900 dark:text-white">

                                {pagination.totalPages}

                            </span>

                        </p>

                        <div className="flex gap-2">

                            <button

                                disabled={page === 1}

                                onClick={() =>
                                    onPageChange(page - 1)
                                }

                                className="
                                    rounded-xl
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-[#18211D]
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    dark:text-white
                                    transition-all
                                    duration-300
                                    hover:bg-orange-50
                                    dark:hover:bg-[#111916]
                                    dark:hover:border-orange-300
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "

                            >

                                Previous

                            </button>

                            <button

                                disabled={
                                    page === pagination.totalPages
                                }

                                onClick={() =>
                                    onPageChange(page + 1)
                                }

                                className="
                                    rounded-xl
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                    bg-white
                                    dark:bg-[#18211D]
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    dark:text-white
                                    transition-all
                                    duration-300
                                    hover:bg-orange-50
                                    dark:hover:bg-[#111916]
                                    dark:hover:border-orange-300
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "

                            >

                                Next

                            </button>

                        </div>

                    </div>

                )}

            </div>

            <ShipmentDrawer

                open={Boolean(selectedShipment)}

                shipment={selectedShipment}

                onClose={() =>
                    setSelectedShipment(null)
                }

                onAction={() => {}}

            />

        </>

    );

};

export default ShipmentTable;

// import { useState } from "react";
// import {
//     Eye,
//     Loader2,
// } from "lucide-react";

// import ShipmentStatusBadge from "./ShipmentStatusBadge";
// import ShipmentDrawer from "./ShipmentDrawer";
// import OrderStatusBadge from "../orders/StatusBadge";

// const ShipmentTable = ({

//     loading,

//     shipments,

//     pagination,

//     page,

//     onPageChange,

// }) => {

//     const [selectedShipment, setSelectedShipment] =
//         useState(null);

//     if (loading) {

//         return (

//             <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-24 dark:border-slate-700 dark:bg-slate-900">

//                 <Loader2
//                     className="animate-spin text-orange-500"
//                     size={32}
//                 />

//             </div>

//         );

//     }

//     return (

//         <>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">

//                 {/* ===================================================== */}
//                 {/* Table */}
//                 {/* ===================================================== */}

//                 <div className="overflow-x-auto">

//                     <table className="min-w-full">

//                         <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">

//                             <tr>

//                                 {[
//                                     "Receipt",
//                                     "Customer",
//                                     "Courier",
//                                     "AWB",
//                                     "Shipment Status",
//                                     "Order Status",
//                                     "Created",
//                                     "Actions",
//                                 ].map((heading) => (

//                                     <th
//                                         key={heading}
//                                         className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
//                                             heading === "Actions"
//                                                 ? "text-center"
//                                                 : "text-left"
//                                         }`}
//                                     >

//                                         {heading}

//                                     </th>

//                                 ))}

//                             </tr>

//                         </thead>

//                         <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

//                             {shipments.length === 0 ? (

//                                 <tr>

//                                     <td
//                                         colSpan={8}
//                                         className="px-6 py-20 text-center text-slate-500 dark:text-slate-400"
//                                     >

//                                         No shipments found.

//                                     </td>

//                                 </tr>

//                             ) : (

//                                 shipments.map((shipment) => (

//                                     <tr
//                                         key={shipment.id}
//                                         className="transition hover:bg-orange-50/40 dark:hover:bg-slate-800"
//                                     >

//                                         {/* Receipt */}

//                                         <td className="px-6 py-5">

//                                             <div className="font-semibold text-slate-900 dark:text-slate-100">

//                                                 {shipment.order?.receipt}

//                                             </div>

//                                         </td>

//                                         {/* Customer */}

//                                         <td className="px-6 py-5">

//                                             <div className="font-medium text-slate-900 dark:text-slate-100">

//                                                 {shipment.order?.shippingName}

//                                             </div>

//                                             <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">

//                                                 {shipment.order?.shippingPhone}

//                                             </div>

//                                         </td>

//                                         {/* Courier */}

//                                         <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">

//                                             {shipment.courierName || "--"}

//                                         </td>

//                                         {/* AWB */}

//                                         <td className="px-6 py-5">

//                                             <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">

//                                                 {shipment.awbCode || "--"}

//                                             </span>

//                                         </td>

//                                         {/* Shipment Status */}

//                                         <td className="px-6 py-5">

//                                             <ShipmentStatusBadge
//                                                 status={shipment.status}
//                                             />

//                                         </td>

//                                         {/* Order Status */}

//                                         <td className="px-6 py-5">

//                                             <OrderStatusBadge
//                                                 status={shipment.order?.status}
//                                             />

//                                         </td>

//                                         {/* Created */}

//                                         <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">

//                                             {shipment.order?.createdAt
//                                                 ? new Date(
//                                                       shipment.order.createdAt
//                                                   ).toLocaleDateString(
//                                                       "en-IN",
//                                                       {
//                                                           day: "2-digit",
//                                                           month: "short",
//                                                           year: "numeric",
//                                                       }
//                                                   )
//                                                 : "--"}

//                                         </td>

//                                         {/* Actions */}

//                                         <td className="px-6 py-5 text-center">

//                                             <button
//                                                 onClick={() =>
//                                                     setSelectedShipment(
//                                                         shipment
//                                                     )
//                                                 }
//                                                 title="View Shipment"
//                                                 className="rounded-lg border border-slate-200 p-2 transition hover:bg-orange-100 dark:border-slate-700 dark:hover:bg-slate-800"
//                                             >

//                                                 <Eye
//                                                     size={18}
//                                                     className="text-slate-700 dark:text-slate-300"
//                                                 />

//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))

//                             )}

//                         </tbody>

//                     </table>

//                 </div>

//                 {/* ===================================================== */}
//                 {/* Pagination */}
//                 {/* ===================================================== */}

//                 {pagination.totalPages > 1 && (

//                     <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-700">

//                         <p className="text-sm text-slate-500 dark:text-slate-400">

//                             Page {page} of {pagination.totalPages}

//                         </p>

//                         <div className="flex gap-2">

//                             <button
//                                 disabled={page === 1}
//                                 onClick={() =>
//                                     onPageChange(page - 1)
//                                 }
//                                 className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
//                             >

//                                 Previous

//                             </button>

//                             <button
//                                 disabled={
//                                     page === pagination.totalPages
//                                 }
//                                 onClick={() =>
//                                     onPageChange(page + 1)
//                                 }
//                                 className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
//                             >

//                                 Next

//                             </button>

//                         </div>

//                     </div>

//                 )}

//             </div>

//             <ShipmentDrawer
//                 open={Boolean(selectedShipment)}
//                 shipment={selectedShipment}
//                 onClose={() =>
//                     setSelectedShipment(null)
//                 }
//                 onAction={() => {}}
//             />

//         </>

//     );

// };

// export default ShipmentTable;