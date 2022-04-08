import axios from "axios";
import { config } from "../config";

export const getOrders = async (params) => {
    let { token } = window.localStorage.getItem("auth")
        ? JSON.parse(window.localStorage.getItem("auth"))
        : {};

    let { limit, page } = params;
    let skip = page * limit - limit;

    let response = await axios.get(`${config.api_host}/api/orders`, {
        params: {
            skip,
            limit,
        },
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return response;
};

export const createOrder = async (payload) => {
    let { token } = window.localStorage.getItem("auth")
        ? JSON.parse(window.localStorage.getItem("auth"))
        : {};

    let response = await axios.post(`${config.api_host}/api/orders`, payload, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return response;
};
