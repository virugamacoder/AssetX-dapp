import { handleResponse } from "services/apiConfig";
import { claimBaseTokensForOwner, claimTokensForInvestor, getAllSTOs, getInvestment, investInSTO, listSTO, withdrawBaseTokensForInvestor, withdrawSTOTokensForOwner } from ".";


const getAllSTOsApiFunction = async (data) => {
    return getAllSTOs(data)
        .then((res) => {
            const getAllSTOsRes = handleResponse(res)
            console.log(getAllSTOsRes, "getAllSTOsRes")
            return getAllSTOsRes
        }).catch((error) => {
            return console.log(error);
        });
}

const listSTOApiFunction = async (data) => {
    return listSTO(data)
        .then((res) => {
            const listSTORes = handleResponse(res)
            console.log(listSTORes, "listSTORes")
            return listSTORes
        }).catch((error) => {
            return console.log(error);
        });
}


const investInSTOApiFunction = async (data) => {
    // userDetailsContext.setLoading(true)
    return investInSTO(data)
        .then((res) => {
            const investInSTORes = handleResponse(res)
            console.log(investInSTORes, "investInSTORes")
            return investInSTORes
        }).catch((error) => {
            return console.log(error);
        });
}

const claimTokensForInvestorApiFunction = async (data) => {
    return claimTokensForInvestor(data)
        .then((res) => {
            const claimTokensForInvestorRes = handleResponse(res)
            console.log(claimTokensForInvestorRes, "claimTokensForInvestorRes")
            return claimTokensForInvestorRes
        }).catch((error) => {
            return console.log(error);
        });
}

const claimBaseTokensForOwnerApiFunction = async (data) => {
    return claimBaseTokensForOwner(data)
        .then((res) => {
            const claimBaseTokensForOwnerRes = handleResponse(res)
            console.log(claimBaseTokensForOwnerRes, "claimBaseTokensForOwnerRes")
            return claimBaseTokensForOwnerRes
        }).catch((error) => {
            return console.log(error);
        });
}


const getInvestmentApiFunction = async (data) => {
    return getInvestment(data)
        .then((res) => {
            const getInvestmentRes = handleResponse(res)
            console.log(getInvestmentRes, "getInvestmentRes")
            return getInvestmentRes
        }).catch((error) => {
            return console.log(error);
        });
}

const withdrawBaseTokensForInvestorApiFunction = async (data) => {
    return withdrawBaseTokensForInvestor(data)
        .then((res) => {
            const withdrawBaseTokensForInvestorRes = handleResponse(res)
            console.log(withdrawBaseTokensForInvestorRes, "withdrawBaseTokensForInvestorRes")
            return withdrawBaseTokensForInvestorRes
        }).catch((error) => {
            return console.log(error);
        });
}

const withdrawSTOTokensForOwnerApiFunction = async (data) => {
    return withdrawSTOTokensForOwner(data)
        .then((res) => {
            const withdrawSTOTokensForOwnerRes = handleResponse(res)
            console.log(withdrawSTOTokensForOwnerRes, "withdrawSTOTokensForOwnerRes")
            return withdrawSTOTokensForOwnerRes
        }).catch((error) => {
            return console.log(error);
        });
}

export {
    getAllSTOsApiFunction,
    listSTOApiFunction,
    investInSTOApiFunction,
    getInvestmentApiFunction,
    claimTokensForInvestorApiFunction,
    claimBaseTokensForOwnerApiFunction,
    withdrawBaseTokensForInvestorApiFunction,
    withdrawSTOTokensForOwnerApiFunction
}