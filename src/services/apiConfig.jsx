import axios from "axios";
import { BASE_URL } from "data/constant";


export const api = (isWalletConnect = false, isFile = false) => {
    const auth_token = isWalletConnect ? localStorage.getItem("access_token") : null;

    let headers = {
        "content-type": isFile ? "" : "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": 0,
        Accept: "application/json",
    }

    if (typeof auth_token === "string") {
        return axios.create({
            baseURL: `${BASE_URL}`,
            headers: { ...headers, Authorization: "Bearer " + auth_token },
        });
    } else {
        return axios.create({
            baseURL: `${BASE_URL}`,
            headers: headers,
        });
    }
}

export const handleResponse = (res) => {
    const { data } = res;

    return data;
}