import { img_calendar_svgrepo_com, img_close_md_svgrepo_com, img_copysvgrepocom_1, img_info_circle_svgrepo_com, img_light_bulb, img_metamask_fox_1, img_search, img_vector_20x20 } from 'assets/images'
import { Button, CheckBox, Heading, Img, Input, ModelComponent, Text } from 'components'
import { CloseSVG } from 'components/Input/close';
import { LAUNCHPAD_CONTRACT_ADDRESS } from 'data/constant';
import { useCustomQuery } from 'hooks';
import { config } from 'providers/WalletConnectProvider';
import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { toast } from 'react-toastify';
import { ERC20TokenApproveHandler } from 'services/ercTokens/ercApiFunctions';
import { getSTODetailsRQ, getSTOInvestmentRQ, LAUNCHPAD_KEYS } from 'services/launchpad';
import { investInSTOApiFunction } from 'services/launchpad/launchpadApiFunctions';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useAccount, usePublicClient, useReadContracts, useSendTransaction } from 'wagmi';

function InvestmentsPopup(props) {
    const { onClose, stoAddress } = props

    const [formLoading, setFormLoading] = useState(false)
    const [searchBarValue1, setSearchBarValue1] = useState("");
    const [baseTokenValue, setBaseTokenValue] = useState("");
    const [stoTokenValue, setStoTokenValue] = useState("");

    // checkbox
    const [purchaseAgreementChcbox, setPurchaseAgreementChcbox] = useState(false);
    const [investmentMemorandumChcbox, setInvestmentMemorandumChcbox] = useState(false);


    const publicClient = usePublicClient({ config: config })
    // console.log("stoAddress", stoAddress)
    const { sendTransactionAsync } = useSendTransaction()
    const { address: currentWalletAddress } = useAccount();

    const { data: getSTODetailData, isLoading: getSTODetailLoading, refetch: getSTODetailDataRefetch } = useCustomQuery({
        queryKey: [LAUNCHPAD_KEYS.LAUNCHPAD_STO_DETAILS, stoAddress],
        queryFn: getSTODetailsRQ,
        // enabled: !!stoAddress,
    });

    const { data: getSTOInvestmentData, isLoading: getSTOInvestmentLoading, refetch: getSTOInvestmentDataRefetch } = useCustomQuery({
        queryKey: [LAUNCHPAD_KEYS.GET_STO_INVESTMENT, stoAddress, currentWalletAddress],
        queryFn: getSTOInvestmentRQ,
        enabled: !!currentWalletAddress,
    });

    const baseTokenContract = {
        address: getSTODetailData?.data?.baseToken,
        abi: erc20Abi,
    }
    const baseTokenData = useReadContracts({
        contracts: [
            {
                ...baseTokenContract,
                functionName: 'name',
            },
            {
                ...baseTokenContract,
                functionName: 'symbol',
            },
            {
                ...baseTokenContract,
                functionName: 'decimals',
            },
            {
                ...baseTokenContract,
                args: [currentWalletAddress],
                functionName: 'balanceOf',
            },
        ],
    })

    const stoTokenContract = {
        address: getSTODetailData?.data?.stoToken,
        abi: erc20Abi,
    }
    const stoTokenData = useReadContracts({
        contracts: [
            {
                ...stoTokenContract,
                functionName: 'name',
            },
            {
                ...stoTokenContract,
                functionName: 'symbol',
            },
            {
                ...stoTokenContract,
                functionName: 'decimals',
            },
        ],
    })

    // console.log("getSTODetailData", getSTODetailData)
    // console.log("baseTokenData", baseTokenData)

    const onInvestmentSubmit = async () => {
        console.log("submitted")
        setFormLoading(true)
        try {
            const erc20ApproveApiData = {
                tokenAddress: getSTODetailData?.data?.baseToken,
                spender: LAUNCHPAD_CONTRACT_ADDRESS,
                amount: parseUnits(baseTokenValue, baseTokenData?.data[2]?.result).toString()
            };
            // console.log("erc20ApproveApiData", erc20ApproveApiData)
            const erc20TokenApproveApiRes = await ERC20TokenApproveHandler(erc20ApproveApiData);
            console.log("erc20TokenApproveApiRes", erc20TokenApproveApiRes)

            const erc20TokenContractApproveRes = await sendTransactionAsync(erc20TokenApproveApiRes?.data);
            console.log("erc20TokenContractApproveRes", erc20TokenContractApproveRes);

            const erc20TokenContractApproveReceipt = await publicClient.waitForTransactionReceipt({ hash: erc20TokenContractApproveRes });
            if (erc20TokenContractApproveReceipt?.status !== "success") {
                throw new Error("ERC20 Approval transaction failed!");
            }

            // investment 
            const investInSTOApiData = {
                stoAddress: getSTODetailData?.data?.stoToken,
                amount: parseUnits(baseTokenValue, baseTokenData?.data[2]?.result).toString()
            }
            const investInSTOApiRes = await investInSTOApiFunction(investInSTOApiData);
            console.log("investInSTOApiRes", investInSTOApiRes)
            const investInSTOContractRes = await sendTransactionAsync(investInSTOApiRes?.data);
            console.log("investInSTOContractRes", investInSTOContractRes);

            const investInSTOContractReceipt = await publicClient.waitForTransactionReceipt({ hash: investInSTOContractRes });
            if (investInSTOContractReceipt?.status !== "success") {
                throw new Error("Invest in STO transaction failed!");
            }

            toast.success(investInSTOApiRes?.message);
            getSTODetailDataRefetch()
            setFormLoading(false)
            onClose()
        } catch (error) {
            setFormLoading(false)
            console.error("Error in listSTOHandler:", error);
            toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!");
        }
    }


    const checkBox1Text = () => {
        return (
            <>
                I have read, fully understand and agree to be bound by the<br />
                <span
                    style={{
                        background: `linear-gradient(var(--gradient4))`,
                        backgroundClip: `text`,
                        color: `transparent`,
                    }}
                > Purchase Agreement </span> in respect of this token sale.
            </>
        )
    }
    const checkBox2Text = () => {
        return (
            <>
                I have read, fully understand and agree to be bound by the <br />
                <span
                    style={{
                        background: `linear-gradient(var(--gradient4))`,
                        backgroundClip: `text`,
                        color: `transparent`,
                    }}
                > Investment Memorandum</span> in respect of this token sale.
            </>
        )
    }

    return (
        <ModelComponent
            closeModal={() => onClose()}
            isLoader={formLoading}
        >
            <div
                className="w-full mx-auto border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]"
            // selectedTabClassName="!text-brand_color-0"
            // selectedTabPanelClassName="mt-[2.13rem] !relative tab-panel--selected"
            >
                <div className="flex items-center justify-between gap-[1.25rem]">
                    <Heading size="heading4xl" as="h4" className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]">
                        Dashboard
                    </Heading>
                    <Button
                        style={{ padding: "0" }}
                        onClick={() => onClose()}
                    >
                        <Img src={img_close_md_svgrepo_com} alt="Close Icon" className="h-[1.50rem] w-[1.50rem]" />
                    </Button>
                </div>
                {/* <TabList className="mt-[2.50rem] flex flex-wrap items-end justify-center gap-[2.25rem]">
                    <Tab className="mt-[1.38rem] text-[0.88rem] font-medium text-brand_color-1">Register To Invest</Tab>
                    <Tab className="text-[0.88rem] font-medium text-brand_color-1">Pre-Sale</Tab>
                    <Tab className="text-[0.88rem] font-medium text-brand_color-1">Public-Sale</Tab>
                    <Tab className="text-[0.88rem] font-medium text-brand_color-1">Closed</Tab>
                    <Tab className="text-[0.88rem] font-medium text-brand_color-1">Token Claim</Tab>
                </TabList> */}
                {/* {[...Array(5)].map((_, index) => ( */}
                {/* <TabPanel key={`tab-panel${index}`} className="absolute mt-[2.13rem] items-center"> */}
                <div className="w-full">
                    <div>
                        <div>
                            <div>
                                {/* <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900 px-[0.75rem] py-[0.63rem]">
                                            <Img src={img_search} alt="Search Icon" className="h-[1.25rem] w-[1.25rem]" />
                                            <Heading
                                                size="textxs"
                                                as="p"
                                                className="text-[0.75rem] font-medium tracking-[0.00rem] text-brand_color-1"
                                            >
                                                Search..
                                            </Heading>
                                        </div> */}
                                {/*  <Input
                                    size="xs"
                                    shape="square"
                                    name="Search Field"
                                    placeholder={`Search...`}
                                    value={searchBarValue1}
                                    onChange={(e) => setSearchBarValue1(e.target.value)}
                                    prefix={
                                        <Img
                                            src={img_search}
                                            alt="Search"
                                            className="my-[0.13rem] h-[20px] w-[20px]"
                                        />
                                    }
                                    suffix={
                                        searchBarValue1?.length > 0 ? (
                                            <CloseSVG onClick={() => setSearchBarValue1("")} height={24} fillColor="#828282ff"
                                                className='cursor-pointer p-[3px]'
                                            />
                                        ) : null
                                    }
                                    className="w-full gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                                    inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0`}
                                /> */}
                                {/* <div className="mt-[1.00rem] flex gap-[0.88rem] sm:flex-col">
                                    <div className="flex w-full flex-wrap items-center justify-center gap-[0.25rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                        <Heading
                                            size="textxs"
                                            as="p"
                                            className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants='lightLabel'
                                        >
                                            Token Network:
                                        </Heading>
                                        <Heading
                                            size="headings"
                                            as="p"
                                            className="self-end text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            Polygon
                                        </Heading>
                                    </div>
                                    <Button
                                        size="xs"
                                        variant="fill"
                                        shape="square"
                                        rightIcon={
                                            <Img
                                                src={img_metamask_fox_1}
                                                alt="Metamask Fox 1"
                                                className="h-[1.00rem] w-[1.00rem]"
                                            />
                                        }
                                        className="w-full gap-[0.50rem] border border-solid border-gray-900_02 px-[0.69rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                                    >
                                        Add to Metamask
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="fill"
                                        shape="square"
                                        rightIcon={
                                            <Img
                                                src={img_copysvgrepocom_1}
                                                alt="Copy-svgrepo-com 1"
                                                className="h-[1.00rem] w-[1.00rem] object-cover"
                                            />
                                        }
                                        className="w-full gap-[0.50rem] border border-solid border-gray-900_02 px-[0.69rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                                    >
                                        0x5D57C...66c7c
                                    </Button>
                                </div> */}
                                <div className="mt-[1.88rem] flex items-center gap-[0.56rem]">
                                    <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                        Public Sale Conditions
                                    </Heading>
                                    <Img
                                        src={img_info_circle_svgrepo_com}
                                        alt="Public Sale Conditions Icon"
                                        className="h-[1.00rem] w-[1.00rem]"
                                    />
                                </div>
                                <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        Min. Investment Size
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {baseTokenData?.isSuccess &&
                                            <>{formatUnits(getSTODetailData?.data?.minInvestment, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result} </>
                                        }
                                    </Heading>
                                </div>
                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        Max. Investment Size
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {baseTokenData?.isSuccess &&
                                            <>{formatUnits(getSTODetailData?.data?.maxInvestment, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result} </>
                                        }
                                    </Heading>
                                </div>
                                <div className="mt-[1.38rem] h-[0.06rem] bg-white-a700_1e" />
                            </div>
                        </div>
                        <div className="mt-[1.38rem]">
                            <div className="flex items-center gap-[0.50rem]">
                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                    My Investment Allowance
                                </Heading>
                                <Img
                                    src={img_info_circle_svgrepo_com}
                                    alt="My Investment Allowance Icon"
                                    className="h-[1.00rem] w-[1.00rem]"
                                />
                            </div>
                            <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                <Heading
                                    as="p"
                                    className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    variants='lightLabel'
                                >
                                    Available to invest
                                </Heading>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                >
                                    {(baseTokenData?.isSuccess && currentWalletAddress) ?
                                        <> {formatUnits(baseTokenData?.data[3]?.result, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}</>
                                        :
                                        baseTokenData?.isSuccess &&
                                        <> {formatUnits(0.00, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}</>
                                    }
                                    {/* {baseTokenData?.isSuccess && baseTokenData?.data[1]?.result} */}
                                </Heading>
                            </div>
                            <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                <Heading
                                    as="p"
                                    className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                    variants='lightLabel'
                                >
                                    Already invested
                                </Heading>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                >
                                    {!getSTOInvestmentLoading && getSTOInvestmentData?.data?.investmentAmount} {baseTokenData?.isSuccess && baseTokenData?.data[1]?.result}
                                </Heading>
                            </div>
                            {/* <div className="mt-[0.75rem] flex justify-center">
                                <div className="flex flex-1 items-center gap-[0.50rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        Last investment transaction status
                                    </Heading>
                                    <Img
                                        src={img_info_circle_svgrepo_com}
                                        alt="Last Investment Status Icon"
                                        className="h-[0.88rem] w-[0.88rem] self-end"
                                    />
                                </div>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                >
                                    -
                                </Heading>
                            </div> */}
                            <div className="relative mt-[1.50rem] h-[10.63rem] content-center md:h-auto">
                                <div className="mx-auto flex flex-1 flex-col gap-[0.63rem]">
                                    <div className="flex items-center justify-between gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900 px-[1.25rem] py-[0.88rem]">
                                        <Input
                                            color="gray_900_7a"
                                            shape="square"
                                            type="text"
                                            name="slippage"
                                            pattern="[0-9]*"
                                            value={baseTokenValue}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                let calcSTOTokenPrice = ((value * getSTODetailData?.data?.tokenPriceStoToken) / getSTODetailData?.data?.tokenPriceBaseToken)
                                                console.log(calcSTOTokenPrice)
                                                setBaseTokenValue(e.target.value)
                                                setStoTokenValue(calcSTOTokenPrice)
                                            }}
                                            className="flex-grow max-w-[40%] w-full border-none capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                            inputClassNames={`bg-transparent border-none text-white-a700 text-gray-50 font-bold text-[2.00rem] focus:ring-0 p-0 pr-2 disabled:cursor-not-allowed`}
                                            autoComplete="off"
                                            placeholder="0"
                                        // isDisabled={isInuptDisabled}
                                        />
                                        <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
                                            <Img
                                                src={img_vector_20x20}
                                                alt="Investment Vector Icon"
                                                className="h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                                            />
                                            <Heading as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                                                {baseTokenData?.isSuccess && baseTokenData?.data[1]?.result}
                                            </Heading>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900 px-[1.25rem] py-[0.88rem]">
                                        <Input
                                            color="gray_900_7a"
                                            shape="square"
                                            type="number"
                                            name="slippage"
                                            pattern="[0-9]*"
                                            value={stoTokenValue}
                                            // onChange={(e) => (e.target.value)}
                                            className="flex-grow max-w-[40%] w-full border-none capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                            inputClassNames={`bg-transparent border-none text-white-a700 text-gray-50 font-bold text-[2.00rem] focus:ring-0 p-0 pr-2 disabled:cursor-not-allowed`}
                                            autoComplete="off"
                                            placeholder="0"
                                            min={1}
                                            isDisabled={true}
                                        />
                                        <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
                                            <Img
                                                src={img_vector_20x20}
                                                alt="Investment Vector Icon Two"
                                                className="h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                                            />
                                            <Heading as="p" className=" text-[0.88rem] font-medium text-brand_color-1">
                                                {stoTokenData?.isSuccess && stoTokenData?.data[1]?.result}
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                                <Img
                                    src={img_light_bulb}
                                    alt="Lightbulb Icon"
                                    className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                                />
                            </div>
                        </div>
                        <div className="mt-[1.13rem] flex flex-wrap items-center">
                            <Text as="p" className="text-[1.00rem] font-medium text-brand_color-1">
                                Balance:
                            </Text>
                            <Heading size="headinglg" as="h6" className="ml-[4px] text-[1.00rem] font-bold text-white-a700">
                                {baseTokenData?.isSuccess &&
                                    <>
                                        {formatUnits(baseTokenData?.data[3]?.result, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}
                                    </>
                                }
                            </Heading>
                            <Img
                                src={img_vector_20x20}
                                alt="Balance Vector"
                                className="ml-[0.50rem] h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                            />
                        </div>
                        <div className="mt-[1.63rem] flex flex-col items-start gap-[1.25rem]">
                            <CheckBox
                                onChange={(e) => setPurchaseAgreementChcbox(e)}
                                name="Purchase Agreement Checkbox"
                                checked={purchaseAgreementChcbox}
                                label={checkBox1Text()}
                                id="PurchaseAgreementCheckbox"
                                className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                            />
                            <CheckBox
                                onChange={(e) => setInvestmentMemorandumChcbox(e)}
                                checked={investmentMemorandumChcbox}
                                name="Investment Memorandum Checkbox"
                                label={checkBox2Text()}
                                id="InvestmentMemorandumCheckbox"
                                className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                            />
                        </div>
                        <Button
                            type={`submit`}
                            shape="square"
                            color="brand_color_0_green_800"
                            className={`mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] w-full`} /* !cursor-not-allowed */
                            onClick={() => onInvestmentSubmit()}
                            disabled={(!purchaseAgreementChcbox && !investmentMemorandumChcbox)}
                        >
                            Invest
                        </Button>
                    </div>
                </div>
                {/* </TabPanel> */}
                {/* ))} */}
                <div className="text_cyan_A100_border mt-[1.25rem] flex items-center justify-center gap-[1.00rem] border border-solid bg-gradient2 p-[1.13rem] sm:flex-col">
                    <Img
                        src={img_calendar_svgrepo_com}
                        alt="Calendar Icon"
                        className="h-[2.50rem] w-[2.50rem] object-cover sm:w-full"
                    />
                    <Text as="p" className="text-[1.00rem] font-medium leading-[1.31rem] text-white-a700">
                        <>
                            You can claim your token on the Token Claim Date. Once
                            <br />
                            claimed, your tokens will be sent to your wallet address.
                        </>
                    </Text>
                </div>
            </div>
        </ModelComponent>
    )
}

export default InvestmentsPopup
