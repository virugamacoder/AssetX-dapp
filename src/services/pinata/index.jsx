import { PINATA_GATEAWAY_BASE_URL, PINATA_GATEAWAY_TOKEN } from "data/constant";
import { api } from "services/apiConfig";

export const getImageFromPinata = (pinataHash) => {
    return `${PINATA_GATEAWAY_BASE_URL}ipfs/${pinataHash}?pinataGatewayToken=${PINATA_GATEAWAY_TOKEN}`;
};

export const uploadFileToPinata = (data) => {
    return api(false, true).post(`/pinata/upload-file-to-pinata`, data);
};

export const uploadJsonToPinata = (data) => {
    console.log(data)
    return api(false, false).post(`/pinata/upload-json-to-pinata`, data);
};

export const createKYC = async (data) => {
    return api().post(`/user`, data);
};

export const getKYC = (walletAddress) => {
    return api().get(`/user/${walletAddress}`);
};