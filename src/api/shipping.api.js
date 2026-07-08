import api from "./axios.js" ;

/**
 * Fetch Shipping Dashboard
 *
 * @param {Object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.search
 * @param {string} params.status
 */

export const getShippingDashboard = async ({
    page = 1,
    limit = 10,
    search = "",
    status = "",
} = {}) => {

    const { data } = await api.get(
        "/shipping",
        {
            params: {
                page,
                limit,
                search,
                status,
            },
        }
    );

    return data.data;
};