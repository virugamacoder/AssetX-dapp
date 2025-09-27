import { api } from "services/apiConfig";

const ERC_TOKENS_KEYS = {
    GET_STABLE_COINS: "GET_STABLE_COINS",
    GET_STABLE_COIN_BALANCE: "GET_STABLE_COIN_BALANCE",
}

export const ERC20TokenApprove = (data) => {
    return api().post(`/contract/erc20-token/approve`, data);
};

export const getStableCoinAddressRQ = (payload) => {
    let tokenAddress = payload.queryKey[1];
    let url = `/contract/erc20-token/stable-coins/${tokenAddress}`;
    return api().get(url);
};

export const getERC20TokenDecimals = (data) => {
    return api().get(`/contract/erc20-token/decimals?tokenAddress=${data?.tokenAddress}`);
};

export const getERC20TokenBalance = (data) => {
    return api().get(`/contract/erc20-token/balance?address=${data?.walletAddress}&tokenAddress=${data?.tokenAddress}`);
};

export {
    ERC_TOKENS_KEYS
}