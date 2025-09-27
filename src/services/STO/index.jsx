import { api } from "services/apiConfig";

const STOS_KEYS = {
    MY_STOS: "MY_STOS",
    GET_STO_DETAIL: "GET_STO_DETAIL",
    GET_FEATURED_STOS: "GET_FEATURED_STOS",
    GET_COUNTRY: "GET_COUNTRY",
    GET_INDUSTRY: "GET_INDUSTRY",
    ALL_STOS: "ALL_STOS",
}

export const getCountry = (data) => {
    return api().get(`/contract/sto/get-country`);
};

export const dynamicDropdown = (url, data) => {
    return api().get(`${url}`);
};

export const createSTO = (data) => {
    return api().post(`/contract/sto/create`, data);
};

export const getAllSTO = (data) => {
    console.log("data", data)
    return api().get(`/contract/sto/get-all-sto?country=${data?.country}&industry=${data?.industry}`);
};

export const getMyStoRQ = (payload) => {
    let walletAddress = payload.queryKey[1];
    let url = `/contract/sto/get-my-sto?address=${walletAddress}`;
    return api().get(url);
};

export const getTokenDetailsRQ = (payload) => {
    let tokenAddress = payload.queryKey[1];
    let url = `/contract/sto/get-details?rwaTokenAddress=${tokenAddress}`;
    return api().get(url);
};

export const getFeaturedStoRQ = () => {
    let url = `/contract/sto/get-featured-sto`;
    return api().get(url);
};

export const getCountryRQ = () => {
    let url = `/contract/sto/get-country`;
    return api().get(url);
};

export const getIndustryRQ = () => {
    let url = `/contract/sto/get-industry`;
    return api().get(url);
};

export const getAllSTORQ = (payload) => {
    // console.log("data", data)
    let country = payload.queryKey[1];
    let industry = payload.queryKey[2];
    return api().get(`/contract/sto/get-all-sto?country=${country}&industry=${industry}`);
};

export {
    STOS_KEYS
}