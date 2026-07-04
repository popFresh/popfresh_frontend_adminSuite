import {
  X,
  Phone,
  Mail,
  CalendarDays,
  ShoppingBag,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useEffect, useState } from "react";

import CustomerStatusBadge from "./CustomerStatusBadge";

const CustomerDrawer = ({
  customer,
  open,
  onClose,
}) => {

  const [showOrders, setShowOrders] = useState(false);

  //////////////////////////////////////////////////////////
  // RESET ORDER HISTORY
  //////////////////////////////////////////////////////////

  useEffect(() => {

    if (open) {

      setShowOrders(false);

    }

  }, [customer, open]);

  //////////////////////////////////////////////////////////
  // GUARD
  //////////////////////////////////////////////////////////

  if (!open || !customer) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div
        className="
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-xl
          flex-col
          bg-white
          shadow-2xl
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-orange-100
                text-lg
                font-semibold
                text-orange-600
              "
            >
              {customer.avatar}
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">

                {customer.name}

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Customer Profile

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div
          className="
            flex-1
            space-y-8
            overflow-y-auto
            p-6
          "
        >
                    {/* Contact Information */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Contact Information
            </h3>

            <div className="rounded-xl border border-slate-200 p-5">

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-slate-700">
                    {customer.phone}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-slate-700">

                    {customer.email || "-"}

                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* Shipping Address */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Shipping Address
            </h3>

            <div className="rounded-xl border border-slate-200 p-5">

              {customer.address ? (

                <div className="space-y-2">

                  <p className="font-semibold text-slate-900">

                    {customer.address.fullName}

                  </p>

                  <p className="text-sm text-slate-600">

                    {customer.address.phone}

                  </p>

                  <p className="leading-7 text-slate-700">

                    {customer.address.line1}

                    {customer.address.line2 && (
                      <>
                        <br />
                        {customer.address.line2}
                      </>
                    )}

                    {customer.address.landmark && (
                      <>
                        <br />
                        Landmark : {customer.address.landmark}
                      </>
                    )}

                    {customer.address.postOffice && (
  <>
    <br />
    <span className="font-medium">
      Post Office:
    </span>{" "}
    {customer.address.postOffice}
  </>
)}

{customer.address.district && (
  <>
    <br />
    <span className="font-medium">
      District:
    </span>{" "}
    {customer.address.district}
  </>
)}

                    <br />

                    {customer.address.city},{" "}
                    {customer.address.state}

                    <br />

                    {customer.address.pincode}

                  </p>

                </div>

              ) : (

                <p className="text-slate-500">
                  No address available.
                </p>

              )}

            </div>

          </section>

          {/* Customer Statistics */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Customer Statistics
            </h3>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Orders */}

              <button

                type="button"

                onClick={() => setShowOrders((prev) => !prev)}

                className="
                  rounded-xl
                  border
                  border-slate-200
                  p-5
                  text-left
                  transition
                  hover:border-orange-300
                  hover:bg-orange-50
                "
              >

                <ShoppingBag
                  className="mb-3 text-orange-500"
                  size={22}
                />

                <p className="text-sm text-slate-500">
                  Total Orders
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">

                  {customer.totalOrders}

                </h3>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-xs font-medium text-orange-500">

                    View History

                  </span>

                  {showOrders ? (

                    <ChevronUp
                      size={16}
                      className="text-orange-500"
                    />

                  ) : (

                    <ChevronDown
                      size={16}
                      className="text-orange-500"
                    />

                  )}

                </div>

              </button>

              {/* Lifetime Spend */}

              <div className="rounded-xl border border-slate-200 p-5">

                <IndianRupee
                  className="mb-3 text-orange-500"
                  size={22}
                />

                <p className="text-sm text-slate-500">
                  Lifetime Spend
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">

                  ₹{Number(customer.totalSpent).toLocaleString()}

                </h3>

              </div>

              {/* Average Order */}

              <div className="rounded-xl border border-slate-200 p-5">

                <IndianRupee
                  className="mb-3 text-orange-500"
                  size={22}
                />

                <p className="text-sm text-slate-500">
                  Average Order
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">

                  ₹{Number(
                    customer.averageOrderValue
                  ).toLocaleString()}

                </h3>

              </div>

            </div>

          </section>

          {/* Membership */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Membership
            </h3>

            <div className="rounded-xl border border-slate-200 p-5 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Customer Status

                </span>

                <CustomerStatusBadge
                  status={customer.status}
                />

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Joined On

                </span>

                <span className="font-medium text-slate-900">

                  {new Date(
                    customer.joinedOn
                  ).toLocaleDateString("en-IN")}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Last Order

                </span>

                <div className="flex items-center gap-2">

                  <CalendarDays
                    size={16}
                    className="text-orange-500"
                  />

                  <span className="font-medium text-slate-900">

                    {customer.lastOrder
                      ? new Date(
                          customer.lastOrder.createdAt
                        ).toLocaleDateString("en-IN")
                      : "-"}

                  </span>

                </div>

              </div>

            </div>

          </section>
                    {/* Order History */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${showOrders ? "max-h-[1200px]" : "max-h-0"}
            `}
          >

            <section className="mt-6">

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Order History
              </h3>

              <div className="space-y-3">

                {!customer.orders?.length ? (

                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">

                    <p className="text-sm text-slate-500">
                      No orders found.
                    </p>

                  </div>

                ) : (

                  customer.orders.map((order) => (

                    <div
                      key={order.id}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-slate-200
                        p-4
                        transition
                        hover:border-orange-300
                        hover:bg-orange-50
                      "
                    >

                      <div>

                        <p className="font-semibold text-slate-900">

                          {order.receipt || order.id}

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="font-semibold text-slate-900">

                          ₹{Number(order.total).toLocaleString()}

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                          {order.status}

                        </p>

                        <p
                          className={`
                            mt-1
                            text-xs
                            font-medium
                            ${
                              order.paymentStatus === "SUCCESS"
                                ? "text-emerald-600"
                                : order.paymentStatus === "FAILED"
                                ? "text-red-600"
                                : "text-amber-600"
                            }
                          `}
                        >

                          {order.paymentStatus}

                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </section>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-slate-50 p-6">

          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Close
          </button>

        </div>

      </div>

    </>

  );

};

export default CustomerDrawer;