import { api } from "services/apiConfig";

const RWA_TOKENS_KEYS = {
    // GET_RWA_COIN_BALANCE: "GET_RWA_COIN_BALANCE",
}

export const getRWATokenDetail = (data) => {
    return api().get(`/contract/rwa-token/details?rwaTokenAddress=${data.rwaTokenAddress}`);
};

export const RWATokenApprove = (data) => {
    return api().post(`/contract/rwa-token/approve`, data);
};

export const getRWATokenBalance = (data) => {
    return api().get(`/contract/rwa-token/balance?address=${data?.walletAddress}&rwaTokenAddress=${data?.tokenAddress}`);
};

export {
    RWA_TOKENS_KEYS
}