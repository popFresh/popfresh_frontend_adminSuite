import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { createManualShipment } from "../../../api/logistics.api";

const ManualShipmentModal = ({
    open,
    onClose,
    order,
    refreshOrder,
}) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        partnerName: "",
        driverName: "",
        driverPhone: "",
        trackingNumber: "",
        notes: "",
    });

    useEffect(() => {

        if (!open) {

            setForm({
                partnerName: "",
                driverName: "",
                driverPhone: "",
                trackingNumber: "",
                notes: "",
            });

        }

    }, [open]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async () => {

        if (!form.partnerName.trim()) {

            toast.error("Partner Name is required.");

            return;

        }

        try {

            setLoading(true);

            await createManualShipment(
                order.id,
                form
            );

            toast.success(
                "Manual shipment created successfully."
            );

            await refreshOrder();

            onClose();

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                    "Failed to create manual shipment."
            );

        } finally {

            setLoading(false);

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6">

                    <h2 className="text-xl font-semibold">
                        Manual Shipment
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Create a shipment for
                        Porter, Rapido,
                        Swiggy Genie or any
                        local delivery partner.
                    </p>

                </div>

                <div className="space-y-4">

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Partner Name *
                        </label>

                        <input
                            name="partnerName"
                            value={form.partnerName}
                            onChange={handleChange}
                            placeholder="Porter"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Driver Name
                        </label>

                        <input
                            name="driverName"
                            value={form.driverName}
                            onChange={handleChange}
                            placeholder="Rahul"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Driver Phone
                        </label>

                        <input
                            name="driverPhone"
                            value={form.driverPhone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Tracking Number
                        </label>

                        <input
                            name="trackingNumber"
                            value={form.trackingNumber}
                            onChange={handleChange}
                            placeholder="PORTER-001"
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
                        />

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Notes
                        </label>

                        <textarea
                            rows={3}
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Handle with care..."
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-orange-500"
                        />

                    </div>

                </div>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border px-4 py-2 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Manual Shipment"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ManualShipmentModal;