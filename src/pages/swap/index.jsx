import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useWertWidget } from '@wert-io/module-react-component'
import { Button, Heading, Img, Input, LoaderComponent } from "components"
import UserProfile3 from "components/UserProfile3"
import { EMPTY_ADDRESS, UNISWAP_ROUTER_ADDRESS } from "data/constant"
import { MySTOModel } from "features/addLiquidity"
import SelectToken from "features/swap/selectToken"
import { useCustomQuery } from "hooks"
import { config } from "providers/WalletConnectProvider"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ROUTE_PATH from "routes/ROUTE_PATH"
import { handleResponse } from "services/apiConfig"
import { ERC_TOKENS_KEYS, getERC20TokenDecimals, getStableCoinAddressRQ } from "services/ercTokens"
import { ERC20TokenApproveHandler } from "services/ercTokens/ercApiFunctions"
import { getRWATokenBalanceFunction } from "services/RWAToken/RWAApiFunctions"
import { getAllSTORQ, STOS_KEYS } from "services/STO"
import { getAmountsOut } from "services/uniswap"
import { getPairHandler, swapTokensHandlerFunction } from "services/uniswap/uniswapApiFunctions"
import { formatUnits, parseUnits } from "viem"
import { useAccount, usePublicClient, useSendTransaction, useWalletClient } from "wagmi"

const resetTokenStates = {
    tokenName: "",
    tokenAddress: "",
    tokenDecimal: "",
    tokenBalance: 0,
    tokeSymbol: "",
    value: 0,
}

function SwapPage() {
    const { data: walletClient } = useWalletClient();
    const [formLoader, setFormLoader] = useState(false)
    const [stableCoinsModel, setStableCoinsModel] = useState(false)
    const [stoTokenModel, setStoTokenModel] = useState(false)

    const publicClient = usePublicClient({ config: config })
    // const [stableCoins, setStableCoins] = useState([])

    const { sendTransactionAsync } = useSendTransaction()

    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

    console.log("currentWalletAddress", currentWalletAddress)

    const [disclaims, setDisclaims] = useState(true)
    const [swapToken, setSwapToken] = useState(true)

    /* const [conversionRateTokenA, setConversionRateTokenA] = useState("")
    const [conversionRateTokenB, setConversionRateTokenB] = useState("") */

    const [lpTokenOne, setLpTokenOne] = useState({
        tokenName: "",
        tokenAddress: "",
        tokenDecimal: "",
        tokenBalance: 0,
        tokeSymbol: "",
        value: 0,
        swapRate: 0,
    })

    const [lpTokenTwo, setLpTokenTwo] = useState({
        tokenName: "",
        tokenAddress: "",
        RWATokenAddress: "",
        tokenDecimal: "",
        tokenBalance: 0,
        tokeSymbol: "",
        value: 0,
        swapRate: 0,
    })

    // const { data: myStoListData, isLoading: myStoListLoading } = useCustomQuery({
    const { data: getAllSTOsData, isLoading: getAllSTOsLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.ALL_STOS, "", ""],
        queryFn: getAllSTORQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    // console.log("getAllSTOsData?.data", getAllSTOsData?.data)

    const { data: getStableCoinsData, isLoading: getStableCoinsLoading } = useCustomQuery({
        queryKey: [ERC_TOKENS_KEYS.GET_STABLE_COIN_BALANCE, currentWalletAddress],
        queryFn: getStableCoinAddressRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    const getAmountsHandler = async (lptokenA, lptokenB) => {
        if (lptokenA?.tokenAddress !== "" && lptokenB?.tokenAddress !== "") {

            let getPairObj = {
                tokenA: lptokenA?.tokenAddress,
                tokenB: lptokenB?.tokenAddress,
            }
            getPairHandler(getPairObj).then((getPairAPIRes) => {
                console.log("getPairAPIRes", getPairAPIRes)
                if (getPairAPIRes?.success && getPairAPIRes?.data !== EMPTY_ADDRESS) {

                    let data = {
                        ...getPairObj,
                        amountIn: parseUnits("1", lptokenA.tokenDecimal).toString()
                    }

                    getAmountsOut(data).then((res) => {
                        let resData = handleResponse(res)
                        console.log("getAmountsOut resData", resData)
                        setLpTokenOne({ ...lptokenA, swapRate: formatUnits(resData?.data?.amounts[0], lptokenA?.tokenDecimal) })
                        setLpTokenTwo({ ...lptokenB, swapRate: formatUnits(resData?.data?.amounts[1], lptokenB?.tokenDecimal) })

                    })

                } else {
                    toast.error("Pair not found")
                }
            })

        }
    }

    const onSwapHandler = async () => {
        if (lpTokenTwo?.tokenAddress !== "" && lpTokenOne?.tokenAddress !== "") {
            if (lpTokenTwo?.value > 0 && lpTokenOne?.value > 0) {

                setFormLoader(true)
                let getPairObj = {
                    tokenA: lpTokenOne?.tokenAddress,
                    tokenB: lpTokenTwo?.tokenAddress,
                }
                getPairHandler(getPairObj).then((getPairAPIRes) => {
                    console.log("getPairAPIRes", getPairAPIRes)
                    if (getPairAPIRes?.success && getPairAPIRes?.data !== EMPTY_ADDRESS) {

                        let erc20ApproveApiData = {
                            tokenAddress: lpTokenOne?.tokenAddress,
                            spender: UNISWAP_ROUTER_ADDRESS,
                            amount: parseUnits((lpTokenOne?.value).toString(), lpTokenOne?.tokenDecimal).toString()
                        }
                        ERC20TokenApproveHandler(erc20ApproveApiData).then((erc20TokenApproveApiRes) => {
                            console.log("erc20TokenApproveApiRes", erc20TokenApproveApiRes)
                            sendTransactionAsync(erc20TokenApproveApiRes?.data).then((erc20TokenContractApproveRes) => {

                                publicClient.waitForTransactionReceipt({ hash: erc20TokenContractApproveRes }).then((transactionReceipt) => {
                                    if (transactionReceipt?.status === "success") {
                                        let swapApiData = {
                                            "amountIn": parseUnits((lpTokenOne?.value).toString(), lpTokenOne?.tokenDecimal).toString(),
                                            "amountOutMin": parseUnits((lpTokenTwo?.swapRate).toString(), lpTokenTwo?.tokenDecimal).toString(), // From get amounts out API
                                            "tokenA": lpTokenOne?.tokenAddress,
                                            "tokenB": lpTokenTwo?.tokenAddress,
                                            "to": currentWalletAddress // Users addr who wants to swap
                                        }
                                        console.log("swapApiData", swapApiData)

                                        swapTokensHandlerFunction(swapApiData).then((swapApiDataApiRes) => {
                                            console.log("swapApiDataApiRes", swapApiDataApiRes)

                                            sendTransactionAsync(swapApiDataApiRes?.data).then((swapContractApproveRes) => {
                                                toast.success("Swap success")
                                                setFormLoader(false)
                                                setLpTokenTwo({
                                                    ...resetTokenStates,
                                                    RWATokenAddress: "",
                                                })
                                                console.log("Reset lpTokenTwo", resetTokenStates);
                                                setLpTokenOne(resetTokenStates)
                                                console.log("swapContractApproveRes", swapContractApproveRes)
                                            }).catch((error) => {
                                                setFormLoader(false)
                                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                                console.log("swapContractApproveRes error", error)
                                            })

                                        }).catch((error) => {
                                            setFormLoader(false)
                                            console.log("swapApiData error", error)
                                        })

                                        console.log("swapApiData", swapApiData)

                                    }
                                })

                            }).catch((error) => {
                                setFormLoader(false)
                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                console.log("erc20TokenContractApproveRes error", error)
                            })
                        }).catch((error) => {
                            setFormLoader(false)
                            console.log("erc20ApproveApiData error", error)
                        })
                    } else {
                        setFormLoader(false)
                        toast.error("Pair not found")
                    }
                }).catch((error) => {
                    setFormLoader(false)
                    console.log("getPairAPIRes error", error)
                })


            } else {
                toast.error("Please enter the amount to swap")
            }
        } else {
            toast.error("Please select tokens to swap")
        }
    }

    useEffect(() => {
        console.log("lpTokenOne", lpTokenOne);
        console.log("lpTokenTwo", lpTokenTwo);
    }, [lpTokenOne, lpTokenTwo])

    const formatSmallNumber = (number, decimals = 3) => {
        const num = parseFloat(number);

        // Handle zero and non-small numbers
        if (num === 0) return '0';
        if (Math.abs(num) >= 0.01) return num.toString();

        // Convert to string and handle scientific notation
        const str = num.toString();
        const parts = str.split('e');

        if (parts.length === 2) {
            // Already in scientific notation (e.g., 1.113084509e-9)
            const coefficient = parseFloat(parts[0]);
            const exponent = parseInt(parts[1]);

            if (exponent < 0) {
                const zerosCount = Math.abs(exponent) - 1;
                // Limit decimal places in coefficient
                const formattedCoefficient = coefficient.toFixed(decimals).replace(/\.?0+$/, '');
                return {
                    beforeSubscript: '0.0',
                    subscript: zerosCount.toString(),
                    afterSubscript: formattedCoefficient
                };
            }
        }

        // Handle decimal format (e.g., 0.00000001)
        if (str.includes('.')) {
            const decimalPart = str.split('.')[1];
            let zerosCount = 0;
            let firstNonZeroIndex = -1;

            for (let i = 0; i < decimalPart.length; i++) {
                if (decimalPart[i] === '0') {
                    zerosCount++;
                } else {
                    firstNonZeroIndex = i;
                    break;
                }
            }

            if (zerosCount > 1 && firstNonZeroIndex !== -1) {
                const remainingDigits = decimalPart.substring(firstNonZeroIndex);
                // Limit decimal places in remaining digits
                const limitedDigits = parseFloat('0.' + remainingDigits).toFixed(decimals).substring(2);
                const cleanedDigits = limitedDigits.replace(/0+$/, '') || '0';
                return {
                    beforeSubscript: '0.0',
                    subscript: (zerosCount - 1).toString(),
                    afterSubscript: cleanedDigits
                };
            }
        }

        return num.toString();
    };

    // Component to render formatted number
    const FormattedNumber = ({ value, decimals = 3 }) => {
        if (value > 0.0001) {
            return <Input
                color="gray_900_7a"
                shape="square"
                type="number"
                name="slippage"
                pattern="[0-9]*"
                value={Number(Number(value).toFixed(4))}
                className="flex-grow w-full border-none capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                inputClassNames={`bg-transparent border-none text-white-a700 text-gray-50 font-bold text-[2.00rem] focus:ring-0 p-0 pr-2 disabled:cursor-not-allowed`}
                autoComplete="off"
                placeholder="0"
                isDisabled={true}
            />
            // return Number(Number(value).toFixed(4))
        }
        const formatted = formatSmallNumber(value, decimals);

        if (typeof formatted === 'string') {
            return <span className="w-full capitalize tracking-[0.00rem] mx-[0.88rem] bg-transparent border-none text-white-a700 font-bold text-[2.00rem] focus:ring-0 p-0 disabled:cursor-not-allowed overflow-x-auto cursor-text">{formatted}</span>;
        }

        return (
            <span className="w-full capitalize tracking-[0.00rem] mx-[0.88rem] bg-transparent border-none text-white-a700 font-bold text-[2.00rem] focus:ring-0 p-0 disabled:cursor-not-allowed overflow-x-auto cursor-text">
                {formatted.beforeSubscript}
                <sub className="text-xs">{formatted.subscript}</sub>
                {formatted.afterSubscript}
            </span>
        );
    };

    const options = {
        "partner_id": import.meta.env.VITE_WERT_PARTNER_ID,
        "origin": "https://sandbox.wert.io",
        "extra": {
            "wallets": [
                {
                    "name": "TT",
                    "network": "amoy",
                    "address": "0x0118E8e2FCb391bCeb110F62b5B7B963477C1E0d"
                },
                {
                    "name": "ETH",
                    "network": "sepolia",
                    "address": "0x0118E8e2FCb391bCeb110F62b5B7B963477C1E0d"
                }
            ]
        }
    }

    const [reactiveOptions, setReactiveOptions] = useState({
        theme: 'dark',
        listeners: {
            'loaded': () => console.log('loaded'),
        },
    });
    const { open, isWidgetOpen } = useWertWidget()

    // const onBuyToken = async () => {
    //     if (lpTokenTwo?.tokenAddress !== "" && lpTokenOne?.tokenAddress !== "") {
    //         if (lpTokenTwo?.value > 0 && lpTokenOne?.value > 0) {

    //             setFormLoader(true)
    //             let getPairObj = {
    //                 tokenA: lpTokenOne?.tokenAddress,
    //                 tokenB: lpTokenTwo?.tokenAddress,
    //             }
    //             getPairHandler(getPairObj).then((getPairAPIRes) => {
    //                 console.log("getPairAPIRes", getPairAPIRes)
    //                 if (getPairAPIRes?.success && getPairAPIRes?.data !== EMPTY_ADDRESS) {
    //                     let swapApiData = {
    //                         "amountIn": parseUnits((lpTokenOne?.value).toString(), lpTokenOne?.tokenDecimal).toString(),
    //                         "amountOutMin": parseUnits((lpTokenTwo?.swapRate).toString(), lpTokenTwo?.tokenDecimal).toString(), // From get amounts out API
    //                         "tokenA": lpTokenOne?.tokenAddress,
    //                         "tokenB": lpTokenTwo?.tokenAddress,
    //                         "to": currentWalletAddress // Users addr who wants to swap
    //                     }
    //                     console.log("swapApiData", swapApiData)

    //                     swapTokensHandlerFunction(swapApiData).then(async (swapApiDataApiRes) => {
    //                         console.log("swapApiDataApiRes", swapApiDataApiRes, swapApiDataApiRes?.data)
    //                         const signature = await walletClient.signTransaction({
    //                             to: swapApiDataApiRes?.data?.to,
    //                             data: swapApiDataApiRes?.data?.data,
    //                             account: currentWalletAddress,
    //                         });
    //                         console.log("signature", signature)
    //                         const finalData = {
    //                             partner_id:
    //                                 "01JZJST75S7H3BH1922FNW9VD7",
    //                             origin:
    //                                 "https://sandbox.wert.io",
    //                             address:
    //                                 currentWalletAddress,
    //                             commodity:
    //                                 lpTokenOne?.tokenName,
    //                             commodity_amount:
    //                                 lpTokenOne?.value,
    //                             network:
    //                                 "sepolia",
    //                             sc_address:
    //                                 swapApiDataApiRes?.data?.to,
    //                             sc_input_data:
    //                                 swapApiDataApiRes?.data?.data,
    //                             signature:
    //                                 signature
    //                         }
    //                         console.log("finalData", finalData)
    //                         // return;
    //                         sendTransactionAsync(swapApiDataApiRes?.data).then((swapContractApproveRes) => {
    //                             toast.success("Swap success")
    //                             setFormLoader(false)
    //                             setLpTokenTwo({
    //                                 ...resetTokenStates,
    //                                 RWATokenAddress: "",
    //                             })
    //                             console.log("Reset lpTokenTwo", resetTokenStates);
    //                             setLpTokenOne(resetTokenStates)
    //                             console.log("swapContractApproveRes", swapContractApproveRes)
    //                         }).catch((error) => {
    //                             setFormLoader(false)
    //                             toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
    //                             console.log("swapContractApproveRes error", error)
    //                         })

    //                     }).catch((error) => {
    //                         setFormLoader(false)
    //                         console.log("swapApiData error", error)
    //                     })

    //                     console.log("swapApiData", swapApiData)
    //                 } else {
    //                     setFormLoader(false)
    //                     toast.error("Pair not found")
    //                 }
    //             }).catch((error) => {
    //                 setFormLoader(false)
    //                 console.log("getPairAPIRes error", error)
    //             })


    //         } else {
    //             toast.error("Please enter the amount to swap")
    //         }
    //     } else {
    //         toast.error("Please select tokens to swap")
    //     }
    // }
    const formattedSwap = useMemo(() => {
        const formattedVal = formatSmallNumber(lpTokenTwo?.swapRate, 3)
        return {
            beforeSubscript: formattedVal.beforeSubscript || 0,
            subscript: formattedVal.subscript || 0,
            afterSubscript: formattedVal.afterSubscript || 0
        }
    }, [lpTokenTwo?.swapRate])

    return (
        <div className="mt-[3.75rem] flex items-start self-stretch md:flex-col">
            {formLoader && <LoaderComponent />}
            <div className="flex w-[41%] mx-auto flex-col items-start gap-[1.88rem]">
                <div className="flex items-center justify-between gap-[1.25rem] self-stretch">
                    <Heading
                        size="heading7xl"
                        as="h1"
                        className="text-[2.50rem] font-bold text-white-a700 md:text-[2.38rem] sm:text-[2.25rem]"
                    >
                        Swap
                    </Heading>
                    <Link to={ROUTE_PATH.SWAP_SETTINGS}>
                        <Img
                            src="images/img_settings_svgrepo_com.svg"
                            alt="Settings Image"
                            className=" h-[1.75rem] w-[1.75rem]"
                        />
                    </Link>
                </div>
                <div className="flex w-full flex-col gap-[1.75rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                    {disclaims && <div className="flex flex-col gap-[1.00rem] border border-solid border-gray-900_02 bg-gray-900 p-[1.25rem]">
                        <div className="flex justify-center">
                            <div className="flex flex-1 items-center gap-[0.63rem]">
                                <Img
                                    src="images/img_info_circle_svgrepo_com_24x24.png"
                                    alt="Info Image"
                                    className="h-[1.50rem] w-[1.50rem] object-cover"
                                />
                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                    Disclaimer
                                </Heading>
                            </div>
                            <Button
                                style={{ padding: '0', height: 'auto' }}
                                onClick={() => setDisclaims(false)}
                            >
                                <Img
                                    src="images/img_close_md_svgrepo_com.svg"
                                    alt="Close Image"
                                    className="h-[1.50rem] w-[1.50rem]"
                                />
                            </Button>
                        </div>
                        <Heading
                            as="p"
                            style={{
                                color: `var(--brand_color_1)`,
                                fontFamily: `Inter`,
                            }}
                            className="font-inter text-[0.88rem] font-normal leading-[1.25rem] text-brand_color-1"
                        >
                            By accessing and utilizing Swap/Trade, you acknowledge and accept the inherent risks involved,
                            including market volatility, impermanent loss, regulatory changes and/or smart contract
                            vulnerabilities. IX Swap makes no guarantees of profit and expressly disclaims responsibility for
                            any losses you may suffer due to such risks. You acknowledge that your access and use of
                            Swap/Trade shall be at your own risk, and you should conduct independent research and are
                            encouraged to seek professional advice before doing so.
                        </Heading>
                    </div>}

                    <div className="relative h-[14.38rem] content-center md:h-auto">

                        <div className="mx-auto flex flex-1 flex-col gap-[1.25rem]">
                            <UserProfile3
                                // tokenImage={lpTokenOne?.tokenImage}
                                tokenValue={lpTokenOne?.value}
                                onInputChange={(value) => {
                                    console.log("value", value);
                                    setLpTokenOne({ ...lpTokenOne, value })
                                    setLpTokenTwo({ ...lpTokenTwo, value: value * lpTokenTwo?.swapRate })
                                    // setLpTokenTwo({ ...lpTokenTwo, value: value * lpTokenTwo?.exchangeRate })
                                }}
                                tokenName={lpTokenOne?.tokenName}
                                tokenSymbol={lpTokenOne?.tokeSymbol}
                                balanceValue={lpTokenOne?.tokenBalance}
                                /* onMaxClick={() => {
                                    setLpTokenOne({ ...lpTokenOne, value: lpTokenOne?.tokenBalance })
                                    // setLpTokenTwo({ ...lpTokenTwo, value: lpTokenOne?.tokenBalance * lpTokenTwo?.exchangeRate })
                                }} */
                                onSelectToken={() => setStableCoinsModel(true)}
                            />
                            <UserProfile3
                                // tokenImage={lpTokenTwo?.tokenImage}
                                tokenValue={<FormattedNumber value={lpTokenTwo?.value} />}
                                onInputChange={(value) => {
                                    setLpTokenTwo({ ...lpTokenTwo, value })
                                    // setLpTokenOne({ ...lpTokenOne, value: value * lpTokenOne?.exchangeRate })
                                }}
                                tokenName={lpTokenTwo?.tokenName}
                                tokenSymbol={lpTokenTwo?.tokeSymbol}
                                balanceValue={lpTokenTwo?.tokenBalance}
                                /* onMaxClick={() => {
                                    setLpTokenTwo({ ...lpTokenTwo, value: lpTokenTwo?.tokenBalance })
                                    // setLpTokenOne({ ...lpTokenOne, value: lpTokenTwo?.tokenBalance * lpTokenOne?.exchangeRate })
                                }} */
                                isInuptDisabled={true}
                                onSelectToken={() => setStoTokenModel(true)}
                            />
                        </div>

                        <Button
                        // onClick={() => setSwapToken(!swapToken)}
                        >
                            <Img
                                src="images/img_light_bulb.svg"
                                alt="Lightbulb Image"
                                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                            />
                        </Button>
                    </div>
                    <div>
                        <div className="flex flex-col gap-[2.00rem]">
                            <div className="flex justify-center sm:flex-col">
                                <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                    Current Rate{" "}
                                </Heading>
                                <div className="flex flex-1 items-center justify-end gap-[0.81rem] sm:self-stretch">
                                    <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                        {lpTokenOne?.swapRate?.toString()?.slice(0, 6)}{" "}{lpTokenOne?.tokeSymbol} PER {" "}
                                        {lpTokenTwo?.swapRate < 0.0001 && lpTokenTwo?.swapRate != "0" ? (
                                            <span>
                                                {formattedSwap?.beforeSubscript}
                                                <sub className="text-xs">{formattedSwap?.subscript}</sub>
                                                {formattedSwap?.afterSubscript}
                                            </span>
                                        ) : (
                                            <span>{Number(Number(lpTokenTwo?.swapRate).toFixed(4))}</span>
                                        )}
                                        {" "}{lpTokenTwo?.tokeSymbol}
                                        {/* {lpTokenOne?.swapRate?.toString()?.slice(0, 6)}{" "}{lpTokenOne?.tokeSymbol} PER {" "}{lpTokenTwo?.swapRate?.toString()?.slice(0, 6)}{" "}{lpTokenTwo?.tokeSymbol} */}
                                    </Heading>
                                    <Img
                                        src="images/img_frame.png"
                                        alt="Frame Image"
                                        className="h-[1.25rem] w-[1.25rem] object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.75rem] border border-solid border-gray-900_02 bg-gray-900 p-[0.88rem]">
                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        style={{ color: `var(--brand_color_1)` }}
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Liquidity Provider Fee
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        0.07189 MATIC
                                    </Heading>
                                </div>
                                {/* <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        style={{ color: `var(--brand_color_1)` }}
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Route
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        <span className="text-white-a700">WMATIC &nbsp;</span>
                                        <span className="text-brand_color-1">&gt;</span>
                                        <span className="text-white-a700">&nbsp; WIXS &nbsp;</span>
                                        <span className="text-white-a700">&gt; USDC.e</span>
                                    </Heading>
                                </div> */}
                                {/* <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        style={{ color: `var(--brand_color_1)` }}
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Price impact
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-red-a700"
                                    >
                                        -28.19%
                                    </Heading>
                                </div> */}
                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        style={{ color: `var(--brand_color_1)` }}
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Minimum received
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        4.55116 USDC.e
                                    </Heading>
                                </div>
                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        style={{ color: `var(--brand_color_1)` }}
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Slippage tolerance
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        0.50%
                                    </Heading>
                                </div>
                            </div>
                            {currentWalletAddress ?
                                <div className="flex justify-center gap-x-2">
                                    <Button
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] flex-1"
                                        onClick={() => onSwapHandler()}
                                    >
                                        Swap
                                    </Button>
                                    <Button
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] flex-1"
                                        onClick={() => open(options)}
                                    >
                                        Buy
                                    </Button>
                                </div>
                                :
                                <Button
                                    shape="square"
                                    color="brand_color_0_green_800"
                                    className="self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    onClick={() => openConnectModal()}
                                >
                                    Connect Wallet
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {stoTokenModel &&
                <MySTOModel
                    onClose={() => setStoTokenModel(false)}
                    modelTitle="Select a token to swap"
                    listType={STOS_KEYS.MY_STOS}
                    loading={getAllSTOsLoading}
                    listOfTokens={getAllSTOsData?.data}
                    onSelectToken={async (props) => {
                        // console.log("props", props)
                        let apiData = {
                            walletAddress: currentWalletAddress,
                            tokenAddress: props?.wrappedAddress
                        }
                        let gotBalance = await getRWATokenBalanceFunction(apiData)
                        let decimalForSelectedCoin = await getERC20TokenDecimals({ tokenAddress: props?.wrappedAddress });
                        var stoTokenBalance = 0;
                        if (gotBalance?.success) {
                            stoTokenBalance = formatUnits(gotBalance?.data?.balance, decimalForSelectedCoin?.data?.data?.decimals).toString()
                        }

                        let tempObj = {
                            ...lpTokenTwo,
                            tokenName: props?.stoTokenName,
                            tokeSymbol: props?.stoTokenSymbol,
                            tokenAddress: props?.wrappedAddress,
                            RWATokenAddress: props?.rwaToken,
                            tokenDecimal: decimalForSelectedCoin?.data?.data?.decimals,
                            tokenBalance: stoTokenBalance
                        }
                        setLpTokenTwo(tempObj)

                        // for getting the amount out
                        /* let dataForAmountOut = {
                            tokenA: lpTokenOne?.tokenAddress,
                            tokenB: props.wrappedAddress,
                            amountIn: parseUnits("1", lpTokenOne.tokenDecimal).toString()
                        } */
                        getAmountsHandler(lpTokenOne, tempObj)

                        setStoTokenModel(false)
                    }}
                />
            }

            {stableCoinsModel &&
                <SelectToken
                    onClose={() => setStableCoinsModel(false)}
                    modelTitle="Select a token to swap"
                    listType={ERC_TOKENS_KEYS.GET_STABLE_COINS}
                    loading={getStableCoinsLoading}
                    listOfTokens={getStableCoinsData?.data}
                    onSelectToken={(props) => {
                        console.log("props", props)
                        let tempObj = {
                            ...lpTokenOne,
                            tokenName: props.name,
                            tokeSymbol: props.symbol,
                            tokenAddress: props.address,
                            tokenDecimal: props.decimals,
                            tokenBalance: formatUnits(props.balance, props.decimals)
                        }
                        setLpTokenOne(tempObj)

                        // for getting the amount out
                        /* let dataForAmountOut = {
                            tokenA: props.address,
                            tokenB: lpTokenTwo?.tokenAddress,
                            amountIn: parseUnits("1", props.decimals).toString()
                        } */
                        getAmountsHandler(tempObj, lpTokenTwo)

                        setStableCoinsModel(false)
                    }}
                />
            }
        </div>
    )
}

export default SwapPage
