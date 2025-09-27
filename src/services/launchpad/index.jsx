import { api } from "services/apiConfig";

const LAUNCHPAD_KEYS = {
    GET_ALL_STOS: "GET_ALL_STOS",
    LAUNCHPAD_COUNTRY: "LAUNCHPAD_COUNTRY",
    LAUNCHPAD_INDUSTRY: "LAUNCHPAD_INDUSTRY",
    LAUNCHPAD_STAGE: "LAUNCHPAD_STAGE",
    LAUNCHPAD_STO_DETAILS: "LAUNCHPAD_STO_DETAILS",
    GET_INVESTMENT: "GET_INVESTMENT",
    GET_STO_INVESTMENT: "GET_STO_INVESTMENT",
}

export const listSTO = (data) => {
    return api().post(`/contract/launchpad/list-sto`, data);
};

export const investInSTO = (data) => {
    return api().post(`/contract/launchpad/invest`, data);
};

export const claimTokensForInvestor = (data) => {
    return api().post(`/contract/launchpad/claim-tokens`, data);
};

export const claimBaseTokensForOwner = (data) => {
    return api().post(`/contract/launchpad/claim-base-token`, data);
};

export const withdrawBaseTokensForInvestor = (data) => {
    return api().post(`/contract/launchpad/withdraw-base-token`, data);
};

export const withdrawSTOTokensForOwner = (data) => {
    return api().post(`/contract/launchpad/withdraw-sto-token`, data);
};

export const getInvestment = (data) => {
    console.log(data)
    return api().get(`/contract/launchpad/get-investment?address=${data}`);
};

export const getAllSTOs = (data) => {
    return api().get(`contract/launchpad/get-all-sto?country=${data?.country}&industry=${data?.industry}&stage=${data?.stage}`);
};

export const getAllSTOsRQ = (payload) => {
    let country = payload.queryKey[1] ? payload.queryKey[1] : "";
    let industry = payload.queryKey[2] ? payload.queryKey[2] : "";
    let stage = payload.queryKey[3] ? payload.queryKey[3] : "";
    let url = `contract/launchpad/get-all-sto?country=${country}&industry=${industry}&stage=${stage}`;
    return api().get(url);
};

export const getSTODetailsRQ = (payload) => {
    let stoAddress = payload.queryKey[1] ? payload.queryKey[1] : "";
    let url = `/contract/launchpad/get-sto-details?stoAddress=${stoAddress}`;
    return api().get(url);
};

export const getLaunchpadCountryRQ = () => {
    let url = `/contract/launchpad/get-country`;
    return api().get(url);
};

export const getLaunchpadIndustryRQ = () => {
    let url = `/contract/launchpad/get-industry`;
    return api().get(url);
};

export const getLaunchpadStageRQ = () => {
    let url = `/contract/launchpad/get-stage`;
    return api().get(url);
};

export const getSTOInvestmentRQ = (payload) => {
    let walletAddress = payload.queryKey[1] ? payload.queryKey[1] : "";
    let stoAddress = payload.queryKey[1] ? payload.queryKey[2] : "";
    console.log(walletAddress, "stoAddress", stoAddress)
    let url = `/contract/launchpad/get-sto-investment?address=${stoAddress}&stoAddress=${walletAddress}`;
    return api().get(url);
};

export {
    LAUNCHPAD_KEYS
}