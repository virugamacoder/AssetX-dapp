import { handleResponse } from "services/apiConfig";
import { addLiquidity, createPair, getPair, swapTokens } from ".";

const createPairHandler = async (data) => {
    // userDetailsContext.setLoading(true)
    return createPair(data)
        .then((res) => {
            const createPairRes = handleResponse(res)
            console.log(createPairRes, "createPairRes")
            return createPairRes
        }).catch((error) => {
            return console.log(error);
        });
}

const getPairHandler = async (data) => {
    // userDetailsContext.setLoading(true)
    return getPair(data)
        .then((res) => {
            const getPairRes = handleResponse(res)
            console.log(getPairRes, "getPairRes")
            return getPairRes
        })/* .catch((error) => {
            return console.log(error);
        }); */
}

const addLiquidityHandler = async (data) => {
    // userDetailsContext.setLoading(true)
    return addLiquidity(data)
        .then((res) => {
            const addLiquidityRes = handleResponse(res)
            console.log(addLiquidityRes, "addLiquidityRes")
            return addLiquidityRes
        }
        ).catch((error) => {
            return console.log(error);
        });
}

const swapTokensHandlerFunction = async (data) => {
    // userDetailsContext.setLoading(true)
    return swapTokens(data)
        .then((res) => {
            const addLiquidityRes = handleResponse(res)
            console.log(addLiquidityRes, "addLiquidityRes")
            return addLiquidityRes
        }
        ).catch((error) => {
            console.log(error);
            return error;
        });
}

export {
    createPairHandler,
    addLiquidityHandler,
    getPairHandler,
    swapTokensHandlerFunction
}