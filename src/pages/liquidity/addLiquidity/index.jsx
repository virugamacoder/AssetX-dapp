import { useConnectModal } from "@rainbow-me/rainbowkit"
import { img_arrow_down_brand_color_1, img_close, img_image_12 } from "assets/images"
import { Button, Heading, Img, Input, LoaderComponent } from "components"
import UserProfile3 from "components/UserProfile3"
import { ADD_LIQUIDITY_DEADLINE, EMPTY_ADDRESS, UNISWAP_ROUTER_ADDRESS } from "data/constant"
import { MySTOModel } from "features/addLiquidity"
import { RWATokenApproveHandler } from "features/securityTokens/createSTO/apiFunctions"
import { ManageTokenList } from "features/swap"
import SelectToken from "features/swap/selectToken"
import { useCustomQuery } from "hooks"
import { config } from "providers/WalletConnectProvider"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ROUTE_PATH from "routes/ROUTE_PATH"
import { api } from "services/apiConfig"
import { ERC_TOKENS_KEYS, getStableCoinAddressRQ } from "services/ercTokens"
import { ERC20TokenApproveHandler } from "services/ercTokens/ercApiFunctions"
import { getRWATokenBalanceFunction } from "services/RWAToken/RWAApiFunctions"
import { getMyStoRQ, STOS_KEYS } from "services/STO"
import { addLiquidityHandler, createPairHandler, getPairHandler } from "services/uniswap/uniswapApiFunctions"
import { formatUnits, parseUnits } from "viem"
import { useAccount, usePublicClient, useSendTransaction } from "wagmi"

const resetTokenStates = {
    tokenName: "",
    tokenAddress: "",
    tokenDecimal: "",
    tokenBalance: 0,
    tokeSymbol: "",
    value: 0,
}

function AddLiquidity() {
    const [formLoading, setFormLoading] = useState(false)
    const [stableCoinsModel, setStableCoinsModel] = useState(false)
    // const [manageToken, setManageToken] = useState(false)
    const [stoTokenModel, setStoTokenModel] = useState(false)

    const publicClient = usePublicClient({ config: config })
    // const [stableCoins, setStableCoins] = useState([])

    const { sendTransactionAsync } = useSendTransaction()
    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

    // lptokenOne
    const [lpTokenOne, setLpTokenOne] = useState({
        tokenName: "",
        tokenAddress: "",
        tokenDecimal: "",
        tokenBalance: 0,
        tokeSymbol: "",
        value: 0,
        // tokenImage: img_image_12,
        // exchangeRate: 0.2,
    })
    // console.log("lpTokenOne", lpTokenOne)

    const [lpTokenTwo, setLpTokenTwo] = useState({
        tokenName: "",
        tokenAddress: "",
        RWATokenAddress: "",
        tokenDecimal: "",
        tokenBalance: 0,
        tokeSymbol: "",
        value: 0,
        // exchangeRate: 0.2,
    })
    // console.log("lpTokenTwo", lpTokenTwo)

    const { data: myStoListData, isLoading: myStoListLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.MY_STOS, currentWalletAddress],
        queryFn: getMyStoRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    const { data: getStableCoinsData, isLoading: getStableCoinsLoading } = useCustomQuery({
        queryKey: [ERC_TOKENS_KEYS.GET_STABLE_COIN_BALANCE, currentWalletAddress],
        queryFn: getStableCoinAddressRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });


    const approveFlowForAddLiquidity = () => {
        let rwaTokenApproveApiData = {
            rwaTokenAddress: lpTokenTwo?.tokenAddress,
            spender: UNISWAP_ROUTER_ADDRESS,
            amount: parseUnits(lpTokenTwo?.value, lpTokenTwo?.tokenDecimal).toString()
        }
        RWATokenApproveHandler(rwaTokenApproveApiData).then((rwaTokenApproveApiRes) => {
            // console.log("rwaTokenApproveApiRes", rwaTokenApproveApiRes)
            sendTransactionAsync(rwaTokenApproveApiRes?.data).then((rwaTokenContractApproveRes) => {
                console.log("rwaTokenContractApproveRes", rwaTokenContractApproveRes)

                publicClient.waitForTransactionReceipt({ hash: rwaTokenContractApproveRes }).then((transactionReceipt) => {
                    if (transactionReceipt?.status === "success") {

                        let erc20ApproveApiData = {
                            tokenAddress: lpTokenOne?.tokenAddress,
                            spender: UNISWAP_ROUTER_ADDRESS,
                            amount: parseUnits(lpTokenOne?.value, lpTokenOne?.tokenDecimal).toString()
                        }
                        ERC20TokenApproveHandler(erc20ApproveApiData).then((erc20TokenApproveApiRes) => {
                            console.log("erc20TokenApproveApiRes", erc20TokenApproveApiRes)
                            sendTransactionAsync(erc20TokenApproveApiRes?.data).then((erc20TokenContractApproveRes) => {
                                console.log("erc20TokenContractApproveRes", erc20TokenContractApproveRes)

                                publicClient.waitForTransactionReceipt({ hash: erc20TokenContractApproveRes }).then((transactionReceipt) => {
                                    if (transactionReceipt?.status === "success") {
                                        let addLiquidityApiData = {
                                            "tokenA": lpTokenTwo?.tokenAddress,
                                            "tokenB": lpTokenOne?.tokenAddress, // USDT
                                            "amountADesired": parseUnits(lpTokenTwo?.value, lpTokenTwo?.tokenDecimal).toString(),
                                            "amountBDesired": parseUnits(lpTokenOne?.value, lpTokenOne?.tokenDecimal).toString(),
                                            "amountAMin": "0",
                                            "amountBMin": "0",
                                            "deadline": ADD_LIQUIDITY_DEADLINE,
                                        }
                                        addLiquidityHandler(addLiquidityApiData).then((addLiquidityApiRes) => {
                                            console.log("erc20TokenApproveApiRes", erc20TokenApproveApiRes)
                                            sendTransactionAsync(addLiquidityApiRes?.data).then((addLiquidityContractRes) => {
                                                // console.log("addLiquidityContractRes", addLiquidityContractRes)
                                                setFormLoading(false)
                                                toast.success("Liquidity added successfully!")
                                                setLpTokenTwo({
                                                    ...resetTokenStates,
                                                    RWATokenAddress: "",
                                                })
                                                setLpTokenOne(resetTokenStates)

                                            }).catch((error) => {
                                                setFormLoading(false)
                                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                                console.log("addLiquidityContractRes error", error)
                                            })

                                        })
                                    }
                                })

                            }).catch((error) => {
                                setFormLoading(false)
                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                console.log("erc20TokenApproveApiRes error", error)
                            })
                        })
                    }
                })

            }).catch((error) => {
                setFormLoading(false)
                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                console.log("createPairContract error", error)
            })

        })
    }


    const submitAddLiquidityHandler = () => {

        if (lpTokenTwo?.tokenAddress !== "" && lpTokenOne?.tokenAddress !== "") {
            if (lpTokenTwo?.value > 0 && lpTokenOne?.value > 0) {

                setFormLoading(true)
                // let isPairExist = false;
                let getPairObj = {
                    tokenA: lpTokenTwo?.tokenAddress,
                    tokenB: lpTokenOne?.tokenAddress
                }
                console.log("getPairObj", getPairObj)

                getPairHandler(getPairObj).then((getPairAPIRes) => {
                    // console.log("getPairAPIRes", getPairAPIRes)
                    if (getPairAPIRes?.success && getPairAPIRes?.data !== EMPTY_ADDRESS) {

                        approveFlowForAddLiquidity()

                    } else {
                        let apiData = {
                            stoTokenAddress: lpTokenTwo?.tokenAddress,
                            tokenB: lpTokenOne?.tokenAddress,
                        }
                        createPairHandler(apiData).then((createPairAPIRes) => {
                            sendTransactionAsync(createPairAPIRes?.data).then((createPairContractRes) => {

                                publicClient.waitForTransactionReceipt({ hash: createPairContractRes }).then((transactionReceipt) => {
                                    if (transactionReceipt?.status === "success") {
                                        approveFlowForAddLiquidity()
                                    }
                                })

                            }).catch((error) => {
                                setFormLoading(false)
                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                console.log("createPairContract error", error)
                            })
                        }).catch((error) => {
                            setFormLoading(false)
                            console.log("createPairAPIRes error", error)
                        })
                    }
                }).catch((error) => {
                    setFormLoading(false)
                    // toast.error(error?.message ?? "Something went wrong!")
                    console.log("getPairAPIRes error", error)
                })

            } else {
                toast.error("Please enter the amount to add liquidity")
            }

        } else {
            toast.error("Please select tokens to add liquidity")
        }

    }

    return (
        <div className="mt-[3.75rem] flex items-center self-stretch md:flex-col">
            {formLoading && <LoaderComponent />}
            <div className="w-[41%] mx-auto flex flex-col items-center gap-[1.25rem] md:self-stretch">
                <div className="flex items-center gap-[1.25rem] w-full">
                    <Link to={ROUTE_PATH.LIQUIDITY} >
                        <Img
                            src={img_arrow_down_brand_color_1}
                            alt="Arrow Down Seven"
                            className="h-[1.50rem] w-[1.50rem]"
                        />
                    </Link>
                    <Heading
                        size="heading4xl"
                        as="h4"
                        className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]"
                    >
                        Add Liquidity
                    </Heading>
                </div>
                <div className="border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem] w-full">
                    <div className="flex flex-col items-start">
                        <div className="relative h-[14.38rem] content-center self-stretch md:h-auto">
                            <div className="mx-auto flex flex-1 flex-col gap-[1.25rem]">
                                <UserProfile3
                                    displayMaxButton={true}
                                    // tokenImage={lpTokenOne?.tokenImage}
                                    tokenValue={lpTokenOne?.value}
                                    onInputChange={(value) => {
                                        setLpTokenOne({ ...lpTokenOne, value })
                                        // setLpTokenTwo({ ...lpTokenTwo, value: value * lpTokenTwo?.exchangeRate })
                                    }}
                                    tokenName={lpTokenOne?.tokenName}
                                    tokenSymbol={lpTokenOne?.tokeSymbol}
                                    balanceValue={lpTokenOne?.tokenBalance}
                                    onMaxClick={() => {
                                        setLpTokenOne({ ...lpTokenOne, value: lpTokenOne?.tokenBalance })
                                        // setLpTokenTwo({ ...lpTokenTwo, value: lpTokenOne?.tokenBalance * lpTokenTwo?.exchangeRate })
                                    }}
                                    onSelectToken={() => setStableCoinsModel(true)}
                                />
                                <UserProfile3
                                    displayMaxButton={true}
                                    tokenImage={lpTokenTwo?.tokenImage}
                                    tokenValue={lpTokenTwo?.value}
                                    onInputChange={(value) => {
                                        setLpTokenTwo({ ...lpTokenTwo, value })
                                        // setLpTokenOne({ ...lpTokenOne, value: value * lpTokenOne?.exchangeRate })
                                    }}
                                    tokenName={lpTokenTwo?.tokenName}
                                    tokenSymbol={lpTokenTwo?.tokeSymbol}
                                    balanceValue={lpTokenTwo?.tokenBalance}
                                    onMaxClick={() => {
                                        setLpTokenTwo({ ...lpTokenTwo, value: lpTokenTwo?.tokenBalance })
                                        // setLpTokenOne({ ...lpTokenOne, value: lpTokenTwo?.tokenBalance * lpTokenOne?.exchangeRate })
                                    }}
                                    onSelectToken={() => setStoTokenModel(true)}
                                />
                            </div>
                            <Img
                                src={img_close}
                                alt="Close One Image"
                                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                            />
                        </div>
                        {/* <Heading size="headingmd" as="p" className="mt-[1.88rem] text-[0.88rem] font-bold text-white-a700">
                            Initial prices and pool share
                        </Heading>
                        <div className="mt-[0.50rem] flex gap-[1.00rem] self-stretch sm:flex-col">
                            <div className="flex w-full flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.88rem] sm:w-full">
                                <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                    {lpTokenOne?.exchangeRate}
                                </Heading>
                                <Heading
                                    as="p"
                                    style={{ color: `var(--brand_color_1)` }}
                                    className="text-[0.88rem] font-medium text-brand_color-1"
                                >
                                    {lpTokenOne?.tokeSymbol} per {lpTokenTwo?.tokeSymbol}
                                </Heading>
                            </div>
                            <div className="flex w-full flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.88rem] sm:w-full">
                                <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                    {lpTokenTwo?.exchangeRate}
                                </Heading>
                                <Heading
                                    as="p"
                                    style={{ color: `var(--brand_color_1)` }}
                                    className="text-[0.88rem] font-medium text-brand_color-1"
                                >
                                    {lpTokenTwo?.tokeSymbol} per {lpTokenOne?.tokeSymbol}
                                </Heading>
                            </div>
                        </div>
                        <div className="mt-[1.00rem] flex flex-col items-center justify-center gap-[0.13rem] self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[0.75rem]">
                            <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                100%
                            </Heading>
                            <Heading
                                as="p"
                                style={{ color: `var(--brand_color_1)` }}
                                className="text-[0.88rem] font-medium text-brand_color-1"
                            >
                                Share of Pool
                            </Heading>
                        </div> */}
                        {currentWalletAddress ?
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                onClick={() => submitAddLiquidityHandler()}
                            >
                                Add
                            </Button>
                            :
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                onClick={() => openConnectModal()}
                            >
                                CONNECT WALLET
                            </Button>
                        }
                    </div>
                </div>
            </div>

            {stoTokenModel &&
                <MySTOModel
                    onClose={() => setStoTokenModel(false)}
                    modelTitle="Select a token to Add Liquidity"
                    listType={STOS_KEYS.MY_STOS}
                    // onManageTokenList={() => setManageToken(true)}
                    loading={myStoListLoading}
                    listOfTokens={myStoListData?.data}
                    onSelectToken={async (props) => {
                        // console.log(props, props)
                        let apiData = {
                            walletAddress: currentWalletAddress,
                            tokenAddress: props?.wrappedAddress
                        }
                        let gotBalance = await getRWATokenBalanceFunction(apiData)
                        var stoTokenBalance = 0;
                        if (gotBalance?.success) {
                            stoTokenBalance = formatUnits(gotBalance?.data?.balance, props?.decimals).toString()
                        }

                        setLpTokenTwo({
                            ...lpTokenTwo,
                            tokenName: props.stoTokenName,
                            tokeSymbol: props.stoTokenSymbol,
                            tokenAddress: props.wrappedAddress,
                            RWATokenAddress: props.rwaToken,
                            tokenDecimal: props.decimals,
                            tokenBalance: stoTokenBalance
                        })

                        setStoTokenModel(false)
                    }}
                />
            }

            {stableCoinsModel &&
                <SelectToken
                    onClose={() => setStableCoinsModel(false)}
                    modelTitle="Select a token to Add Liquidity"
                    listType={ERC_TOKENS_KEYS.GET_STABLE_COINS}
                    // onManageTokenList={() => setManageToken(true)}
                    loading={getStableCoinsLoading}
                    listOfTokens={getStableCoinsData?.data}
                    onSelectToken={(props) => {
                        // console.log(props, props)
                        setLpTokenOne({
                            ...lpTokenOne,
                            tokenName: props.name,
                            tokeSymbol: props.symbol,
                            tokenAddress: props.address,
                            tokenDecimal: props.decimals,
                            tokenBalance: formatUnits(props.balance, props.decimals)
                        })
                        setStableCoinsModel(false)
                    }}
                />
            }

        </div>


    )
}

export default AddLiquidity
