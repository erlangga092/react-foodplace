import axios from "axios";
import { config } from "../config";

export const getInvoiceByOrderId = async (order_id) => {
    const { token } = window.localStorage.getItem("auth")
        ? JSON.parse(window.localStorage.getItem("auth"))
        : {};

    const response = await axios.get(
        `${config.api_host}/api/invoices/${order_id}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
