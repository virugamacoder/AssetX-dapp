import { useConnectModal } from '@rainbow-me/rainbowkit';
import { img_arrow_down_brand_color_1, img_copy_svgrepo_com, img_globe, img_image_2, img_image_438x780, img_info_circle_svgrepo_com, img_metamaskfox_1_gray_900_02, img_secure_svgrepo_com, img_vector, img_vector_8x14 } from 'assets/images';
import { Button, Heading, Img, Text } from 'components'
import { LAUNCHPAD_STAGES } from 'data/constant';
import ClaimPopup from 'features/investments/claimPopup';
import InvestmentsPopup from 'features/investments/investmentsPopup';
import WithdrawPopup from 'features/investments/withdrawPopup';
import { useCustomQuery } from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getSTODetailsRQ, getSTOInvestmentRQ, LAUNCHPAD_KEYS } from 'services/launchpad';
import { getImageFromPinata } from 'services/pinata';
import { getTokenDetailsRQ, STOS_KEYS } from 'services/STO';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';

const buttonProps = {
    shape: "square",
    color: "brand_color_0_green_800",
    className: "self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
};

const RenderButton = (props) => {
    const { buttonType, onButtonClick } = props;

    switch (buttonType) {
        case LAUNCHPAD_STAGES.PUBLIC_SALE:
            return (
                <Button
                    {...buttonProps}
                    onClick={onButtonClick}
                >
                    Invest
                </Button>
            );
        case LAUNCHPAD_STAGES.CLAIM:
            return (
                <Button
                    {...buttonProps}
                    onClick={onButtonClick}
                // onClick={() => setClaimPopup(true)}
                >
                    Claim
                </Button>
            );
        case LAUNCHPAD_STAGES.CLOSED:
            return (
                <Button
                    {...buttonProps}
                    className={`${buttonProps.className} !cursor-not-allowed`}
                    disabled
                >
                    Closed
                </Button>
            );
        case LAUNCHPAD_STAGES.WITHDRAW:
            return (
                <Button
                    {...buttonProps}
                    onClick={onButtonClick}
                >
                    Withdraw
                </Button>
            );
        case "CONNECT_WALLET":
            return (
                <Button
                    {...buttonProps}
                    onClick={onButtonClick}
                >
                    CONNECT WALLET
                </Button>
            );
        case "CLAIMED":
            return (
                <div className="text_cyan_A100_border flex items-center gap-[1.00rem] border border-solid bg-gradient2 p-[1rem] sm:flex-col">
                    <Text as="p" className="text-[1.00rem] font-medium leading-[1rem] text-white-a700">
                        Already claimed tokens
                    </Text>
                </div>
            );
        case "WITHDRAWED":
            return (
                <div className="text_cyan_A100_border flex items-center gap-[1.00rem] border border-solid bg-gradient2 p-[1rem] sm:flex-col">
                    <Text as="p" className="text-[1.00rem] font-medium leading-[1rem] text-white-a700">
                        Already withdrawn tokens
                    </Text>
                </div>
            );
        default:
            return null;
    }
};

const ProjectStageTitle = (props) => {
    const { projectStage } = props;
    if (LAUNCHPAD_STAGES.COMING_SOON === projectStage || LAUNCHPAD_STAGES.PUBLIC_SALE === projectStage) {
        return `The deal closes`
    } else {
        return `The deal closed`
    }
}

const ProjectStageValue = (props) => {
    const { projectStage, stoDetail } = props;

    let dateTime = moment.unix(stoDetail?.data?.startTime).format('YYYY-MM-DD HH:mm:ss')

    if (LAUNCHPAD_STAGES.COMING_SOON === projectStage || LAUNCHPAD_STAGES.PUBLIC_SALE === projectStage) {
        return moment(dateTime).fromNow()
    } else if (LAUNCHPAD_STAGES.CLOSED === projectStage) {
        return `Closed`
    } else if (LAUNCHPAD_STAGES.WITHDRAW === projectStage) {
        return `Failed`
    } else if (LAUNCHPAD_STAGES.CLAIM === projectStage) {
        return `Successful`
    }
}

function InvestmentDetailPage() {
    let { id: stoAddress } = useParams();

    const [dashboardPopup, setDashboardPopup] = useState(false);
    const [withdrawPopup, setWithdrawPopup] = useState(false);
    const [claimPopup, setClaimPopup] = useState(false);

    const navigate = useNavigate();

    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

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

    const { data: getTokenDetailsData, isLoading: getTokenDetailsLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.GET_STO_DETAIL, stoAddress],
        queryFn: getTokenDetailsRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    console.log("getTokenDetailsData", getTokenDetailsData)

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

    console.log("getSTODetailData", getSTODetailData)
    console.log("getSTOInvestmentData", getSTOInvestmentData)
    /*  console.log("stoTokenData", stoTokenData)
     console.log("baseTokenData", baseTokenData) */


    const renderButtonBasedOnConditions = (onClick) => {
        if (getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.WITHDRAW) {
            if (currentWalletAddress === getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.investmentAmount > 0 && !getSTOInvestmentData?.data?.isBaseTokenWithdrawn && !getSTOInvestmentData?.data?.isSTOTokenWithdrawn) {
                console.log("owner")
                return <RenderButton buttonType={LAUNCHPAD_STAGES.WITHDRAW} onButtonClick={() => setWithdrawPopup(true)} />
            } else if (currentWalletAddress !== getSTODetailData?.data?.owner && !getSTOInvestmentData?.data?.isBaseTokenWithdrawn && getSTOInvestmentData?.data?.investmentAmount > 0) {
                console.log("investor")
                return <RenderButton buttonType={LAUNCHPAD_STAGES.WITHDRAW} onButtonClick={() => setWithdrawPopup(true)} />
            } else if ((currentWalletAddress !== getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.isBaseTokenWithdrawn && getSTOInvestmentData?.data?.investmentAmount > 0) || currentWalletAddress === getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.investmentAmount > 0 && getSTOInvestmentData?.data?.isBaseTokenWithdrawn && getSTOInvestmentData?.data?.isSTOTokenWithdrawn) {
                console.log("investor")
                return <RenderButton buttonType={"WITHDRAWED"} onButtonClick={() => setWithdrawPopup(true)} />
            } else {
                return <RenderButton buttonType={LAUNCHPAD_STAGES.CLOSED} />
            }
        }
        if (getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.CLAIM) {
            if (currentWalletAddress === getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.investmentAmount > 0 && !getSTOInvestmentData?.data?.isStoTokenClaimed && !getSTOInvestmentData?.data?.isRaisedFundClaimed) {
                console.log("owner")
                return <RenderButton buttonType={LAUNCHPAD_STAGES.CLAIM} onButtonClick={() => setClaimPopup(true)} />
            } else if (currentWalletAddress !== getSTODetailData?.data?.owner && !getSTOInvestmentData?.data?.isStoTokenClaimed && getSTOInvestmentData?.data?.investmentAmount > 0) {
                console.log("investor")
                return <RenderButton buttonType={LAUNCHPAD_STAGES.CLAIM} onButtonClick={() => setClaimPopup(true)} />
            } else if ((currentWalletAddress === getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.investmentAmount > 0 && getSTOInvestmentData?.data?.isStoTokenClaimed && getSTOInvestmentData?.data?.isRaisedFundClaimed) || (currentWalletAddress !== getSTODetailData?.data?.owner && getSTOInvestmentData?.data?.isStoTokenClaimed && getSTOInvestmentData?.data?.investmentAmount > 0)) {
                return <RenderButton buttonType={"CLAIMED"} />
            } else {
                return <RenderButton buttonType={LAUNCHPAD_STAGES.CLOSED} />
            }
        }
        if (getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.PUBLIC_SALE) {
            return <RenderButton buttonType={LAUNCHPAD_STAGES.PUBLIC_SALE} onButtonClick={() => setDashboardPopup(true)} />
        }
        if (getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.COMING_SOON) {
            return <RenderButton buttonType={LAUNCHPAD_STAGES.COMING_SOON} onButtonClick={() => setDashboardPopup(true)} />
        }
        if (getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.CLOSED) {
            return <RenderButton buttonType={LAUNCHPAD_STAGES.CLOSED} onButtonClick={() => setDashboardPopup(true)} />
        }
    }


    return (
        <>
            <div className="mt-[3.75rem] flex flex-col gap-[1.25rem] self-stretch">
                <div className="flex items-center md:flex-col">
                    <div className="flex w-[50%] items-center justify-center md:w-full">
                        <Button
                            style={{ padding: 0 }}
                            onClick={() => navigate(-1)}
                        >
                            <Img
                                src={img_arrow_down_brand_color_1}
                                alt="Arrow Down Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        </Button>
                        <div className="flex flex-1 items-center gap-[1.25rem] px-[1.88rem] sm:px-[1.25rem]">
                            {getTokenDetailsData ?
                                <Img
                                    src={getImageFromPinata(getTokenDetailsData?.data?.stoImage)}
                                    alt="Accredited Logo"
                                    className="h-[3.75rem] w-[3.75rem] object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = img_image_2;
                                    }}
                                />
                                :
                                <>
                                    <div
                                        className='h-[3.75rem] w-[3.75rem] bg-white-a700 flex justify-center items-center font-black font-syne'
                                    >
                                        {getSTODetailData?.data?.details?.title.substring(0, 3)}

                                    </div>
                                </>
                            }
                            <Heading
                                size="heading5xl"
                                as="h3"
                                className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                            >
                                {getSTODetailData?.data?.details?.title}
                            </Heading>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-[1.00rem] pl-[7.00rem] pr-[3.50rem] md:self-stretch md:px-[1.25rem]">
                        <Link to={getSTODetailData?.data?.details?.companyWebsite} target='_blank'>
                            <Img src={img_globe} alt="Globe Icon" className="h-[2.00rem] w-[2.00rem]" />
                        </Link>
                        {/* <Img src={img_music} alt="Music Icon" className="h-[2.00rem] w-[2.00rem]" />
                        <Img src={img_group_30} alt="Group Icon" className="h-[2.00rem] w-[2.00rem]" />
                        <Button
                            size="sm"
                            variant="fill"
                            shape="square"
                            className="w-[2.00rem] border border-solid border-gray-900_02 px-[0.50rem]"
                        >
                            <Img src={img_warning} />
                        </Button>
                        <Img src={img_info} alt="Info Icon" className="h-[2.00rem] w-[2.00rem]" /> */}
                    </div>
                </div>
                <div className="flex flex-col gap-[1.25rem]">
                    <Text as="p" className="font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1 line-clamp-2 w-2/3">
                        {getSTODetailData?.data?.details?.overview}
                    </Text>
                    <div className="flex items-center">
                        <Img
                            src={img_secure_svgrepo_com}
                            alt="Security Image"
                            className="h-[1.25rem] w-[1.25rem] object-cover"
                        />
                        <div className="ml-[0.50rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                        <Heading
                            as="h4"
                            className="ml-[0.50rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Security token
                        </Heading>
                        <div className="ml-[0.50rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                        <Heading
                            as="h5"
                            className="ml-[1.00rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            {getSTODetailData?.data?.details?.industry}
                        </Heading>
                    </div>
                </div>
            </div>
            <div className="mt-[2.38rem] self-stretch">
                <div className="flex items-start gap-[2.50rem] md:flex-col">
                    <div className="flex flex-1 flex-col gap-[1.25rem] md:self-stretch">
                        {!getSTODetailLoading ?
                            <Img
                                src={getImageFromPinata(getSTODetailData?.data?.details?.image)}
                                alt="Accredited Logo"
                                className="h-[27.38rem] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = img_image_438x780;
                                }}
                            />
                            :
                            <Img
                                src={img_image_438x780}
                                alt="Accredited Logo"
                                className="h-[27.38rem] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = img_image_438x780;
                                }}
                            />
                        }
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col items-start gap-[1.38rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                <Heading
                                    size="heading5xl"
                                    as="h6"
                                    className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                >
                                    Overview
                                </Heading>
                                <Text
                                    as="p"
                                    className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                >
                                    {getSTODetailData?.data?.details?.overview}
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[36%] flex-col gap-[1.25rem] md:w-full">
                        <div className="flex flex-col gap-[1.88rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                            <div className="flex items-center justify-between sm:flex-col">
                                <Heading
                                    size="heading7xl"
                                    as="h1"
                                    className="bg-gradient bg-clip-text text-[2.50rem] font-bold text-transparent md:text-[2.38rem] sm:text-[2.25rem]"
                                    style={{
                                        background: `linear-gradient(var(--gradient4))`,
                                        backgroundClip: `text`,
                                        color: `transparent`,
                                    }}
                                >
                                    {baseTokenData?.isSuccess &&
                                        <> {baseTokenData?.data[1]?.result}{" "}{formatUnits(getSTODetailData?.data?.raisedAmount, baseTokenData?.data[2]?.result)} </>
                                    }
                                </Heading>
                                <div className="flex w-[36%] flex-wrap items-center justify-end gap-[0.75rem] sm:w-full">
                                    <Heading
                                        className="raisedpercentage_border flex h-[2.5rem] w-[2.5rem] items-center justify-center bg-gray-900_01 text-center text-[0.63rem] font-bold capitalize text-white-a700"
                                        size="headingxs"
                                        as="p"
                                    >
                                        {baseTokenData?.isSuccess && ((formatUnits(getSTODetailData?.data?.raisedAmount, baseTokenData?.data[2]?.result) / formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)) * 100).toFixed(0)}%
                                    </Heading>
                                    <Heading
                                        as="p"
                                        className="font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                        style={{ color: `var(--brand_color_1)` }}
                                    >
                                        Raised
                                    </Heading>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-start gap-[0.38rem]">
                                <div className="arrowVector flex items-center gap-[0.38rem] flex-col"
                                    style={{
                                        left: `calc(${baseTokenData?.isSuccess && (formatUnits(getSTODetailData?.data?.softCap, baseTokenData?.data[2]?.result) / formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)) * 100}% - 7px)`
                                    }}
                                >
                                    <Img
                                        src={img_vector}
                                        alt="Soft Cap Vector"
                                        className=" h-[0.50rem] object-cover md:ml-0"
                                    />
                                </div>
                                <div className="flex self-stretch bg-gray-900_04">
                                    <div className="h-[1.00rem] bg-gradient"
                                        style={{
                                            width: `${baseTokenData?.isSuccess && (formatUnits(getSTODetailData?.data?.raisedAmount, baseTokenData?.data[2]?.result) / formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)) * 100}%`
                                        }}
                                    />
                                </div>
                                <div
                                    className='arrowBottomVector flex items-center gap-[0.38rem] flex-col'
                                    style={{
                                        left: `calc(${baseTokenData?.isSuccess && (formatUnits(getSTODetailData?.data?.softCap, baseTokenData?.data[2]?.result) / formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)) * 100}% - 7px)`
                                    }}
                                >
                                    <Img
                                        src={img_vector_8x14}
                                        alt="Pre-sale Goal Vector"
                                        className="h-[0.50rem] object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col gap-[1.75rem]">
                                    <div className="h-[0.06rem] bg-white-a700_1e" />
                                    <div className="flex justify-center">
                                        <div className="flex flex-1 flex-col items-start gap-[0.50rem]">
                                            <div className="flex items-center gap-[0.44rem] self-stretch">
                                                <Heading as="p" className="font-inter text-[0.88rem] font-normal text-brand_color-1"
                                                    style={{ color: `var(--brand_color_1)` }}
                                                >
                                                    Participants
                                                </Heading>
                                                <Img
                                                    src={img_info_circle_svgrepo_com}
                                                    alt="Participants Icon"
                                                    className="h-[0.75rem] w-[0.75rem] self-end"
                                                />
                                            </div>
                                            <Heading
                                                size="heading4xl"
                                                as="h4"
                                                className="bg-gradient bg-clip-text text-[1.50rem] font-bold text-transparent md:text-[1.38rem]"
                                                style={{
                                                    background: `linear-gradient(var(--gradient4))`,
                                                    backgroundClip: `text`,
                                                    color: `transparent`,
                                                }}
                                            >
                                                {getSTODetailData?.data?.investorCount}
                                            </Heading>
                                        </div>
                                        <div className="flex flex-col items-end gap-[0.50rem]">
                                            <Heading as="p" className="font-inter text-[0.88rem] font-normal !text-brand_color-1">
                                                <ProjectStageTitle projectStage={getSTODetailData?.data?.stage} />
                                            </Heading>
                                            <Heading
                                                size="heading4xl"
                                                as="h4"
                                                className="bg-gradient bg-clip-text text-[1.50rem] font-bold text-transparent md:text-[1.38rem]"
                                                style={
                                                    getSTODetailData?.data?.stage === LAUNCHPAD_STAGES.WITHDRAW ?
                                                        { color: `var(--red_a700)` }
                                                        :
                                                        {
                                                            background: `linear-gradient(var(--gradient4))`,
                                                            backgroundClip: `text`,
                                                            color: `transparent`,
                                                        }
                                                }
                                            >
                                                <ProjectStageValue
                                                    projectStage={getSTODetailData?.data?.stage}
                                                    stoDetail={getSTODetailData}
                                                />
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!currentWalletAddress ?
                                <RenderButton
                                    buttonType={`CONNECT_WALLET`}
                                    onButtonClick={() => openConnectModal()}
                                />
                                :
                                renderButtonBasedOnConditions()
                            }

                            <div className="flex flex-col gap-[1.00rem]">
                                <div className="flex gap-[1.00rem] sm:flex-col">
                                    <div className="flex w-full flex-wrap justify-center gap-[0.25rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                        <Heading
                                            size="textxs"
                                            as="p"
                                            className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
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
                                    <div className="flex w-full justify-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                        <Heading
                                            size="headings"
                                            as="p"
                                            className="self-end text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            Explorer
                                        </Heading>
                                    </div>
                                </div>
                                <div className="flex gap-[1.00rem] sm:flex-col">
                                    <div className="flex w-full justify-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                        <Heading
                                            size="headings"
                                            as="p"
                                            className="self-end text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            0x5D57C...66c7c
                                        </Heading>
                                        <Img
                                            src={img_copy_svgrepo_com}
                                            alt="Copy Icon"
                                            className="h-[1.00rem] w-[1.00rem] object-cover"
                                        />
                                    </div>
                                    <Button
                                        size="xs"
                                        variant="fill"
                                        shape="square"
                                        rightIcon={
                                            <div className="flex h-[1.00rem] w-[1.00rem] items-center justify-center">
                                                <Img
                                                    src={img_metamaskfox_1_gray_900_02}
                                                    alt="Metamask Fox 1"
                                                    className="h-[1.00rem] w-[1.00rem]"
                                                />
                                            </div>
                                        }
                                        className="w-full gap-[0.50rem] border border-solid border-gray-900_02 px-[1.31rem] font-bold capitalize tracking-[0.00rem] !text-white-a700 sm:px-[1.25rem]"
                                    >
                                        Add to Metamask
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col items-start border border-solid border-gray-900_02 bg-gray-900_01 px-[1.88rem] py-[1.50rem] sm:p-[1.25rem]">
                                <div className="self-stretch">
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Issuer
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {getSTODetailData?.data?.details?.issuer}
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Country
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {getSTODetailData?.data?.details?.country}
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Investment Type
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {getSTODetailData?.data?.details?.investmentType}
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Token Price
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess && baseTokenData?.data[1]?.result} {getSTODetailData?.data?.tokenPriceBaseToken} / {getSTODetailData?.data?.tokenPriceStoToken} {stoTokenData?.isSuccess && stoTokenData?.data[1]?.result}
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[0.75rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Max. Investment Size
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess &&
                                                <> {baseTokenData?.data[1]?.result}{" "}{formatUnits(getSTODetailData?.data?.maxInvestment, baseTokenData?.data[2]?.result)} </>
                                            }
                                            /
                                            {baseTokenData?.isSuccess &&
                                                <>
                                                    {formatUnits((getSTODetailData?.data?.maxInvestment * getSTODetailData?.data?.tokenPriceStoToken) / getSTODetailData?.data?.tokenPriceBaseToken, baseTokenData?.data[2]?.result)}{" "}{stoTokenData?.isSuccess && stoTokenData?.data[1]?.result}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Min. Investment Size
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess &&
                                                <> {baseTokenData?.data[1]?.result}{" "}{formatUnits(getSTODetailData?.data?.minInvestment, baseTokenData?.data[2]?.result)} </>
                                            }
                                            /
                                            {baseTokenData?.isSuccess &&
                                                <>
                                                    {formatUnits((getSTODetailData?.data?.minInvestment * getSTODetailData?.data?.tokenPriceStoToken) / getSTODetailData?.data?.tokenPriceBaseToken, baseTokenData?.data[2]?.result)}{" "}{stoTokenData?.isSuccess && stoTokenData?.data[1]?.result}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                    <div className="mt-[1.50rem] h-[0.06rem] bg-white-a700_1e" />
                                </div>
                                <Heading
                                    size="headingxl"
                                    as="h6"
                                    className="mt-[1.75rem] text-[1.13rem] font-bold text-white-a700"
                                >
                                    Token Sale Allocation
                                </Heading>
                                <div className="mt-[0.88rem] flex flex-col gap-[0.75rem] self-stretch">
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Soft Cap
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess &&
                                                <>
                                                    {baseTokenData?.data[1]?.result}
                                                    {" "}
                                                    {formatUnits(getSTODetailData?.data?.softCap, baseTokenData?.data[2]?.result)}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Hard Cap
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess &&
                                                <>
                                                    {baseTokenData?.data[1]?.result}
                                                    {" "}
                                                    {formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                    {/* <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Allocation for Pre-Sale
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            USDT 200,000
                                        </Heading>
                                    </div> */}
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Allocation for Public-Sale
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {baseTokenData?.isSuccess &&
                                                <>
                                                    {baseTokenData?.data[1]?.result}
                                                    {" "}
                                                    {formatUnits(getSTODetailData?.data?.hardCap, baseTokenData?.data[2]?.result)}
                                                </>
                                            }
                                        </Heading>
                                    </div>
                                </div>
                                {/* <div className="mt-[1.38rem] self-stretch">
                                    <div className="flex flex-col gap-[0.88rem]">
                                        <div className="flex flex-col gap-[1.75rem]">
                                            <div className="h-[0.06rem] bg-white-a700_1e" />
                                            <div className="flex items-center gap-[0.50rem]">
                                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                                    Pre-Sale
                                                </Heading>
                                                <Img
                                                    src={img_info_circle_svgrepo_com}
                                                    alt="Pre-sale Icon"
                                                    className="h-[1.00rem] w-[1.00rem] self-end"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[0.75rem]">
                                            <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                <Heading
                                                    as="p"
                                                    className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    variants={`lightLabel`}
                                                >
                                                    Max. Investment Size
                                                </Heading>
                                                <Heading
                                                    size="headingmd"
                                                    as="p"
                                                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                >
                                                    USDT 200,000.0
                                                </Heading>
                                            </div>
                                            <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                <Heading
                                                    as="p"
                                                    className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    variants={`lightLabel`}
                                                >
                                                    Min. Investment Size
                                                </Heading>
                                                <Heading
                                                    size="headingmd"
                                                    as="p"
                                                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                >
                                                    USDT 1.00
                                                </Heading>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex flex-col gap-[0.88rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.63rem] sm:p-[1.25rem]">
                                <div className="flex items-center gap-[0.50rem]">
                                    <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                        Investment Stage
                                    </Heading>
                                    <Img
                                        src={img_info_circle_svgrepo_com}
                                        alt="Investment Stage Icon"
                                        className="h-[1.00rem] w-[1.00rem] self-end"
                                    />
                                </div>
                                <div className="flex flex-col gap-[0.88rem]">
                                    <div className="flex justify-between gap-[1.25rem]">
                                        <div className="flex items-center gap-[0.38rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                variants={`lightLabel`}
                                            >
                                                Public Sale
                                            </Heading>
                                            <Img
                                                src={img_info_circle_svgrepo_com}
                                                alt="Closed Stage Icon"
                                                className="h-[0.75rem] w-[0.75rem]"
                                            />
                                        </div>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {moment.unix(getSTODetailData?.data?.startTime).format("Do MMM, HH:mm")}{" "}-{" "}
                                            {moment.unix(getSTODetailData?.data?.endTime).format("Do MMM, HH:mm")}
                                        </Heading>
                                    </div>
                                    <div className="flex justify-between gap-[1.25rem]">
                                        <div className="flex items-center gap-[0.38rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                variants={`lightLabel`}
                                            >
                                                Closed
                                            </Heading>
                                            <Img
                                                src={img_info_circle_svgrepo_com}
                                                alt="Closed Stage Icon"
                                                className="h-[0.75rem] w-[0.75rem]"
                                            />
                                        </div>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {moment.unix(getSTODetailData?.data?.endTime).format("Do MMM, HH:mm")}{" "}-{" "}
                                            {moment.unix(getSTODetailData?.data?.tokenClaimTime).format("Do MMM, HH:mm")}
                                        </Heading>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex flex-1 items-center gap-[0.38rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                variants={`lightLabel`}
                                            >
                                                Token Claim
                                            </Heading>
                                            <Img
                                                src={img_info_circle_svgrepo_com}
                                                alt="Token Claim Icon"
                                                className="h-[0.75rem] w-[0.75rem]"
                                            />
                                        </div>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            {moment.unix(getSTODetailData?.data?.tokenClaimTime).format("Do MMM, HH:mm")}
                                        </Heading>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col items-start gap-[0.88rem] border border-solid border-gray-900_02 bg-gray-900_01 px-[1.88rem] py-[1.50rem] sm:p-[1.25rem]">
                                <Heading
                                    size="headingxl"
                                    as="h6"
                                    className="mt-[0.25rem] text-[1.13rem] font-bold text-white-a700"
                                >
                                    Offering Terms
                                </Heading>
                                <div className="flex flex-col gap-[0.75rem] self-stretch">
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Investment Structure
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            Economic Interest
                                        </Heading>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Dividend Yield
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            N/A
                                        </Heading>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Investment Period
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            N/A
                                        </Heading>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Gross IRR (%)
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            N/A
                                        </Heading>
                                    </div>
                                    <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                            variants={`lightLabel`}
                                        >
                                            Distribution Frequency
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                        >
                                            N/A
                                        </Heading>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                    Additional Document
                                </Heading>
                                <div className="flex flex-col gap-[1.13rem] self-stretch">
                                    <UserProfile1 />
                                    <UserProfile1 userDescription="Socialerus SCR-1 2-p " />
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900_01 px-[1.88rem] py-[1.75rem] sm:p-[1.25rem]">
                                <a href="#">
                                    <Heading size="headingxl" as="h6" className="text-[1.13rem] font-semibold text-white-a700">
                                        Contact Us
                                    </Heading>
                                </a>
                                <div className="flex items-center gap-[0.50rem] self-stretch">
                                    <Img
                                        src={img_mail_svgrepo_com}
                                        alt="Email Icon"
                                        className="h-[1.25rem] w-[1.25rem] object-cover"
                                    />
                                    <Heading
                                        as="p"
                                        className="text-[0.88rem] font-normal capitalize tracking-[0.00rem] text-brand_color-1"
                                        variants={`lightLabel`}
                                    >
                                        Socialerus_k-youtube...
                                    </Heading>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* {dashboardPopup && */}
            <InvestmentsPopup
                stoAddress={stoAddress}
                onClose={() => setDashboardPopup(false)}
            />
            {/* } */}

            {withdrawPopup &&
                <WithdrawPopup
                    stoAddress={stoAddress}
                    onClose={() => setWithdrawPopup(false)}
                />
            }

            {claimPopup &&
                <ClaimPopup
                    stoAddress={stoAddress}
                    onClose={() => setClaimPopup(false)}
                />
            }
        </>
    )
}

export default InvestmentDetailPage
