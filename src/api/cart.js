import axios from "axios";
import store from "../app/store";
import { config } from "../config";
import { setItems } from "../features/Cart/actions";

export const saveCart = async (token, cart) => {
    let response = await axios.put(
        `${config.api_host}/api/carts`,
        { items: cart },
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};

export const getCart = async () => {
    let { token } = window.localStorage.getItem("auth")
        ? JSON.parse(window.localStorage.getItem("auth"))
        : {};

    if (!token) return;

    let { data } = await axios.get(`${config.api_host}/api/carts`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!data.error) {
        store.dispatch(setItems(data));
    }
};
