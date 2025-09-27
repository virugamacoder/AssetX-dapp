import { api } from "services/apiConfig";

export const createPair = (data) => {
    return api().post(`/contract/uniswap/create-pair`, data);
};

export const getPair = (data) => {
    // console.log("data", data);
    return api().get(`/contract/uniswap/get-pair?tokenA=${data?.tokenA}&tokenB=${data?.tokenB}`);
};

export const addLiquidity = (data) => {
    return api().post(`/contract/uniswap/add-liquidity`, data);
};

export const getAmountsOut = (data) => {
    return api().get(`/contract/uniswap/get-amounts-out/${data?.tokenA}/${data?.tokenB}/${data?.amountIn}`);
};

export const swapTokens = (data) => {
    return api().post(`/contract/uniswap/swap-tokens`, data);
};