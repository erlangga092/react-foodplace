import axios from "axios";
import { config } from "../config";

export const getProducts = async (params) => {
    const resp = await axios.get(`${config.api_host}/api/products`, {
        params,
    });

    return resp;
};
