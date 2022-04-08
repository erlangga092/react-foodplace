import axios from "axios";
import { config } from "../config";

export const getAddress = async (params) => {
  let { token } = window.localStorage.getItem("auth")
    ? JSON.parse(window.localStorage.getItem("auth"))
    : {};

  let response = await axios.get(`${config.api_host}/api/delivery-addresses`, {
    params: {
      limit: params.limit,
      skip: params.page * params.limit - params.limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createAddress = async (payload) => {
  let { token } = window.localStorage.getItem("auth")
    ? JSON.parse(window.localStorage.getItem("auth"))
    : {};

  let response = await axios.post(
    `${config.api_host}/api/delivery-addresses`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
