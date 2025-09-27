import { handleResponse } from "services/apiConfig";
import { uploadFileToPinata } from "services/pinata";
import { getRWATokenDetail, RWATokenApprove } from "services/RWAToken";
import { createSTO, dynamicDropdown } from "services/STO";

const getRWATokenDetailHandler = async (data) => {
    // userDetailsContext.setLoading(true)
    return getRWATokenDetail(data)
        .then((res) => {
            const getRWATokenDetailRes = handleResponse(res)
            // console.log({ nameOfAsset: getRWATokenDetailRes.data.name, symbolOfAsset: getRWATokenDetailRes.data.symbol, decimalOfRWAAsset: getRWATokenDetailRes.data.decimals }, "getRWATokenDetailRes")
            return { nameOfAsset: getRWATokenDetailRes.data.name, symbolOfAsset: getRWATokenDetailRes.data.symbol, decimalOfRWAAsset: getRWATokenDetailRes.data.decimals }
        }
        ).catch((error) => {
            // userDetailsContext.setLoading(false)
            return console.log(error);
        });
}

const uploadFileToPinataHandler = async (data) => {
    // userDetailsContext.setLoading(true)
    return uploadFileToPinata(data)
        .then((res) => {
            const uploadFileToPinataRes = handleResponse(res)
            // console.log(uploadFileToPinataRes, "uploadFileToPinataRes")
            if (uploadFileToPinataRes?.success) {
                return uploadFileToPinataRes?.data
            }
        }
        ).catch((error) => {
            // userDetailsContext.setLoading(false)
            return console.log(error);
        });
}

const dynamicDropdownHandler = async (url, data) => {
    // userDetailsContext.setLoading(true)
    return dynamicDropdown(url, data)
        .then((res) => {
            const dynamicDropdownRes = handleResponse(res)
            // console.log(dynamicDropdownRes, "dynamicDropdownRes")
            if (dynamicDropdownRes?.success) {
                return dynamicDropdownRes?.data
            }
        }
        ).catch((error) => {
            // userDetailsContext.setLoading(false)
            return console.log(error);
        });
}

const RWATokenApproveHandler = async (url, data) => {
    // userDetailsContext.setLoading(true)
    return RWATokenApprove(url, data)
        .then((res) => {
            const RWATokenApproveRes = handleResponse(res)
            // console.log(RWATokenApproveRes, "RWATokenApproveRes")
            if (RWATokenApproveRes?.success) {
                return RWATokenApproveRes
            }
        })/* .catch((error) => {
            // userDetailsContext.setLoading(false)
            return console.log(error);
        }); */
}

const createSTOHandler = async (url, data) => {
    // userDetailsContext.setLoading(true)
    return createSTO(url, data)
        .then((res) => {
            const createSTORes = handleResponse(res)
            if (createSTORes?.success) {
                return createSTORes
            }
        }
        ).catch((error) => {
            // userDetailsContext.setLoading(false)
            return console.log(error);
        });
}

/* uploadImageToPinata(formData)
    .then((res) => {
        formik.setFieldValue("nftFile", res?.data?.data[0]);
        if (file) {
            setNftImage({
                src: URL.createObjectURL(file),
                alt: file.name,
            });
        }
    })
    .catch((err) => {
        console.log(err);
        toast.error(err.message);
    }); */

export {
    getRWATokenDetailHandler,
    uploadFileToPinataHandler,
    dynamicDropdownHandler,
    RWATokenApproveHandler,
    createSTOHandler
}