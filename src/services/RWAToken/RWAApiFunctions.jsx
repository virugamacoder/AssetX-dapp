import { handleResponse } from "services/apiConfig";
import { getRWATokenBalance } from ".";

const getRWATokenBalanceFunction = async (data) => {
    // userDetailsContext.setLoading(true)
    return getRWATokenBalance(data)
        .then((res) => {
            const getRWATokenBalanceRes = handleResponse(res)
            // console.log(getRWATokenBalanceRes, "getRWATokenBalanceRes")
            return getRWATokenBalanceRes
        }
        ).catch((error) => {
            return console.log(error);
        });
}

export {
    getRWATokenBalanceFunction
}