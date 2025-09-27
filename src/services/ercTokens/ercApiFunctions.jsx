import { handleResponse } from "services/apiConfig";
import { ERC20TokenApprove, getERC20TokenBalance, getERC20TokenDecimals } from ".";

const ERC20TokenApproveHandler = async (data) => {
    return ERC20TokenApprove(data)
        .then((res) => {
            const ERC20TokenApproveRes = handleResponse(res)
            console.log(ERC20TokenApproveRes, "ERC20TokenApproveRes")
            return ERC20TokenApproveRes
        }
        ).catch((error) => {
            console.log(error)
            return error;
        });
}

const getERC20TokenDecimalsAPIFunction = async (data) => {
    return getERC20TokenDecimals(data).then((res) => {
        const getERC20TokenDecimalsRes = handleResponse(res)
        console.log(getERC20TokenDecimalsRes, "getERC20TokenDecimalsRes")
        return getERC20TokenDecimalsRes
    }).catch((error) => {
        console.log(error)
        return error;
    });
}


const getERC20TokenBalanceAPIFunction = async (data) => {
    return getERC20TokenBalance(data).then((res) => {
        const getERC20TokenBalanceRes = handleResponse(res)
        console.log(getERC20TokenBalanceRes, "getERC20TokenBalanceRes")
        return getERC20TokenBalanceRes
    }).catch((error) => {
        console.log(error)
        return error;
    });
}

export {
    ERC20TokenApproveHandler,
    getERC20TokenDecimalsAPIFunction,
    getERC20TokenBalanceAPIFunction
}