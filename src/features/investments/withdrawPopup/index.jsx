import { img_close_md_svgrepo_com, img_info_circle_svgrepo_com } from 'assets/images'
import { Button, CheckBox, Heading, Img, Input, ModelComponent, Text } from 'components'
import { CloseSVG } from 'components/Input/close';
import { useCustomQuery } from 'hooks';
import { config } from 'providers/WalletConnectProvider';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getSTODetailsRQ, getSTOInvestmentRQ, LAUNCHPAD_KEYS } from 'services/launchpad';
import { withdrawBaseTokensForInvestorApiFunction, withdrawSTOTokensForOwnerApiFunction } from 'services/launchpad/launchpadApiFunctions';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount, usePublicClient, useReadContracts, useSendTransaction } from 'wagmi';

function WithdrawPopup(props) {
    const { onClose, stoAddress } = props

    const [formLoading, setFormLoading] = useState(false)

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
    console.log("getSTOInvestmentData", getSTOInvestmentData)

    const onWithdrawSubmit = async () => {
        setFormLoading(true)
        try {
            const withdrawApiData = {
                stoAddress: getSTODetailData?.data?.stoToken,
            };

            const withdrawBaseTokensForInvestorApiRes = await withdrawBaseTokensForInvestorApiFunction(withdrawApiData);
            console.log("withdrawBaseTokensForInvestorApiRes", withdrawBaseTokensForInvestorApiRes)
            const withdrawBaseTokensForInvestorContractRes = await sendTransactionAsync(withdrawBaseTokensForInvestorApiRes?.data)

            const withdrawBaseTokensForInvestorContractReceipt = await publicClient.waitForTransactionReceipt({ hash: withdrawBaseTokensForInvestorContractRes });
            if (withdrawBaseTokensForInvestorContractReceipt?.status !== "success") {
                throw new Error("Withdraw Tokens For Investor Contract transaction failed!");
            }

            toast.success(withdrawBaseTokensForInvestorApiRes?.message);

            if (currentWalletAddress === getSTODetailData?.data?.owner) {
                const withdrawSTOTokensForOwnerApiRes = await withdrawSTOTokensForOwnerApiFunction(withdrawApiData);
                console.log("withdrawSTOTokensForOwnerApiRes", withdrawSTOTokensForOwnerApiRes)

                const withdrawSTOTokensForOwnerContractRes = await sendTransactionAsync(withdrawSTOTokensForOwnerApiRes?.data)

                const withdrawSTOTokensForOwnerContractReceipt = await publicClient.waitForTransactionReceipt({ hash: withdrawSTOTokensForOwnerContractRes });
                if (withdrawSTOTokensForOwnerContractReceipt?.status !== "success") {
                    throw new Error("Withdraw Tokens For owner Contract transaction failed!");
                }
                toast.success(withdrawSTOTokensForOwnerApiRes?.message);
            }

            getSTODetailDataRefetch()
            getSTOInvestmentDataRefetch()
            setFormLoading(false)
            onClose()

        } catch (error) {
            setFormLoading(false)
            console.error("Error in withdraw token handler:", error);
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
                        Withdraw
                    </Heading>
                    <Button
                        style={{ padding: "0" }}
                        onClick={() => onClose()}
                    >
                        <Img src={img_close_md_svgrepo_com} alt="Close Icon" className="h-[1.50rem] w-[1.50rem]" />
                    </Button>
                </div>

                <div className="text_cyan_A100_border mt-[1.25rem] flex items-center gap-[1.00rem] border border-solid bg-gradient2 p-[1rem] sm:flex-col">
                    <Text as="p" className="text-[1.00rem] font-medium leading-[1rem] text-white-a700">
                        Soft cap goal not reached
                    </Text>
                </div>

                <div className="w-full">
                    <div>
                        <div>
                            <div>
                                <div className="mt-[1.88rem] flex items-center gap-[0.56rem]">
                                    <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                        Public Sale Investments
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
                                        Investment Soft cap
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {baseTokenData?.isSuccess &&
                                            <>
                                                {formatUnits(getSTODetailData?.data?.softCap, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}
                                            </>
                                        }
                                    </Heading>
                                </div>
                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        Investment Hard Cap
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {baseTokenData?.isSuccess &&
                                            <>
                                                {formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}
                                            </>
                                        }
                                    </Heading>
                                </div>
                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        total raised investments
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {baseTokenData?.isSuccess &&
                                            <>{formatUnits(getSTODetailData?.data?.raisedAmount, baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}</>
                                        }
                                    </Heading>
                                </div>
                                <div className="mt-[1.38rem] h-[0.06rem] bg-white-a700_1e" />
                            </div>
                        </div>

                        <div className="mt-[1.38rem]">
                            <div className="flex items-center gap-[0.50rem]">
                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                    Refund Information
                                </Heading>
                                <Img
                                    src={img_info_circle_svgrepo_com}
                                    alt="My Investment Allowance Icon"
                                    className="h-[1.00rem] w-[1.00rem]"
                                />
                            </div>
                            {currentWalletAddress !== getSTODetailData?.data?.owner ?
                                <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants='lightLabel'
                                    >
                                        Invested <strong>{baseTokenData?.isSuccess && baseTokenData?.data[1]?.result} </strong> Token Amount
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {(baseTokenData?.isSuccess) &&
                                            <> {formatUnits(parseInt(getSTOInvestmentData?.data?.investmentAmount), baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}
                                            </>
                                        }
                                    </Heading>
                                </div>
                                :
                                <>
                                    <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants='lightLabel'
                                        >
                                            <strong>{baseTokenData?.isSuccess && baseTokenData?.data[1]?.result} </strong> token invested
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {(stoTokenData?.isSuccess && baseTokenData?.isSuccess) &&
                                                <> {formatUnits(parseInt(getSTOInvestmentData?.data?.investmentAmount), baseTokenData?.data[2]?.result)}{" "}{baseTokenData?.data[1]?.result}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants='lightLabel'
                                        >
                                            Withdrawable <strong>{stoTokenData?.isSuccess && stoTokenData?.data[1]?.result} </strong> token amount
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {(stoTokenData?.isSuccess && baseTokenData?.isSuccess && !getSTODetailLoading) &&
                                                <> {(formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result) * getSTODetailData?.data?.tokenPriceStoToken) * getSTODetailData?.data?.tokenPriceBaseToken}{" "}{stoTokenData?.data[1]?.result}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                </>
                            }
                        </div>
                        {/* <div className="mt-[3rem] flex flex-col items-start gap-[1.25rem]">
                            <CheckBox
                                name="Purchase Agreement Checkbox"
                                label={checkBox1Text()}
                                id="PurchaseAgreementCheckbox"
                                className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                            />
                            <CheckBox
                                name="Investment Memorandum Checkbox"
                                label={checkBox2Text()}
                                id="InvestmentMemorandumCheckbox"
                                className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                            />
                        </div> */}
                        <Button
                            type={`submit`}
                            shape="square"
                            color="brand_color_0_green_800"
                            className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] w-full"
                            onClick={() => onWithdrawSubmit()}
                        >
                            Withdraw
                        </Button>
                    </div>
                </div>

            </div>
        </ModelComponent>
    )
}

export default WithdrawPopup
