import TextInput from "components/Forms/textInput";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getERC20TokenBalanceAPIFunction, getERC20TokenDecimalsAPIFunction } from "services/ercTokens/ercApiFunctions";
import { formatUnits, isAddress } from "viem";
import { useAccount } from "wagmi";

function ListSTOTokenomics(props) {
    const { formik } = props

    const { address: currentWalletAddress } = useAccount();

    const { selectedObjectForListSTO } = useSelector((state) => state.listSTO);

    useEffect(() => {
        formik.setFieldValue('stoToken', selectedObjectForListSTO?.wrappedAddress)
        formik.setFieldValue('stoTokenDecimal', selectedObjectForListSTO?.decimals)
    }, [])

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full">
                <TextInput
                    label="Wrapped Token Address"
                    name="stoToken"
                    placeholder="0x00000"
                    onChange={async (e) => {
                        let val = e.target.value;
                        formik.setFieldValue("stoToken", val);
                        if (isAddress(val)) {
                            let apiData = {
                                tokenAddress: val
                            }
                            let getDecimalsRes = await getERC20TokenDecimalsAPIFunction(apiData);
                            if (getDecimalsRes?.data && getDecimalsRes.data.decimals) {
                                formik.setFieldValue("stoTokenDecimal", getDecimalsRes?.data?.decimals)
                            } else {
                                formik.setFieldValue("stoTokenDecimal", "")
                                formik.setFieldValue("stoTokenBalance", "")
                            }
                            let getBalanceRes = await getERC20TokenBalanceAPIFunction({ ...apiData, walletAddress: currentWalletAddress });
                            // console.log(getBalanceRes, "getBalanceRes")
                            if ((getBalanceRes?.data && getBalanceRes.data.balance) && getDecimalsRes?.data) {
                                formik.setFieldValue("stoTokenBalance", formatUnits(getBalanceRes?.data?.balance, getDecimalsRes?.data?.decimals))
                            }
                        } else {
                            formik.setFieldValue("stoTokenDecimal", "");
                            formik.setFieldValue("stoTokenBalance", "");
                        }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.stoToken}
                    disabled={selectedObjectForListSTO?.wrappedAddress ? true : false}
                />
            </div>
            <div className="flex w-full">
                <TextInput
                    label="Base Token Address"
                    name="baseToken"
                    placeholder="0x00000"
                    onChange={async (e) => {
                        let val = e.target.value;
                        formik.setFieldValue("baseToken", val);
                        if (isAddress(val)) {
                            let apiData = {
                                tokenAddress: val
                            }
                            let getDecimalsRes = await getERC20TokenDecimalsAPIFunction(apiData);
                            if (getDecimalsRes?.data && getDecimalsRes.data.decimals) {
                                formik.setFieldValue("baseTokenDecimal", getDecimalsRes?.data?.decimals)
                            } else {
                                formik.setFieldValue("baseTokenDecimal", "")
                                formik.setFieldValue("baseTokenBalance", "")
                            }
                            let getBalanceRes = await getERC20TokenBalanceAPIFunction({ ...apiData, walletAddress: currentWalletAddress });
                            // console.log(getBalanceRes, "getBalanceRes")
                            if ((getBalanceRes?.data && getBalanceRes.data.balance) && getDecimalsRes?.data) {
                                formik.setFieldValue("baseTokenBalance", formatUnits(getBalanceRes?.data?.balance, getDecimalsRes?.data?.decimals))
                            }
                        } else {
                            formik.setFieldValue("baseTokenDecimal", "");
                            formik.setFieldValue("baseTokenBalance", "");
                        }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.baseToken}
                />
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        pattern="^\d+$"
                        label="Hard Cap"
                        name="hardCap"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("hardCap", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.hardCap}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        pattern="^\d+$"
                        label="Soft Cap"
                        name="softCap"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("softCap", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.softCap}
                    />
                </div>
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Max Investment"
                        name="maxInvestment"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("maxInvestment", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxInvestment}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Min Investment"
                        name="minInvestment"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("minInvestment", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.minInvestment}
                    />
                </div>
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Token Price of Wrapped Token"
                        name="tokenPriceStoToken"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("tokenPriceStoToken", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.tokenPriceStoToken}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Token Price of Base Token"
                        name="tokenPriceBaseToken"
                        placeholder="0"
                        onChange={(e) => {
                            let val = e.target.value;
                            let regEx = new RegExp(/^\d*\.?\d*$/)
                            if (regEx.test(val)) {
                                val = val.replace(/\..*/, '')
                                formik.setFieldValue("tokenPriceBaseToken", val)
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.tokenPriceBaseToken}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListSTOTokenomics