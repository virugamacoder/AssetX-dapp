import { img_polygonlogofreelogovectorsnet_1 } from "assets/images";
import { Text, Input, Heading, Img, Button } from "../../components";
import AccreditedProfile from "../../components/AccreditedProfile";
import ExpertModeProfile from "../../components/ExpertModeProfile";
import { CloseSVG } from "../../components/Input/close.jsx";
import { ReactTable } from "../../components/ReactTable";
import UserProfile2 from "../../components/UserProfile2";
// import UserProfile3 from "../../components/UserProfile3";
// import UserProfile4 from "../../components/UserProfile4";
import UserProfile5 from "../../components/UserProfile5";
import UserProfile6 from "../../components/UserProfile6";
import { createColumnHelper } from "@tanstack/react-table";
import React, { Suspense } from "react";

const companyProfileList = [
    {
        userHeading: "CKGP",
        userSubheading: "CoacK",
        issuerText: "Issuer",
        issuerName: "CoachK",
        countryText: "Country",
        countryName: "Thailand",
        industryText: "Industry",
        industryName: "Other",
        tradeButtonText: "trade now",
    },
    {
        userHeading: "CKGP",
        userSubheading: "CoacK",
        issuerText: "Issuer",
        issuerName: "CoachK",
        countryText: "Country",
        countryName: "Thailand",
        industryText: "Industry",
        industryName: "Other",
        tradeButtonText: "trade now",
    },
    {
        userHeading: "CKGP",
        userSubheading: "CoacK",
        issuerText: "Issuer",
        issuerName: "CoachK",
        countryText: "Country",
        countryName: "Thailand",
        industryText: "Industry",
        industryName: "Other",
        tradeButtonText: "trade now",
    },
];
const accreditedList = [
    { accreditedText: "Accredited", ssolOneText: "SSOL1 -", seaSolarText: "SEA Solar Series 1", zeroText: "0" },
    { accreditedText: "Accredited", ssolOneText: "SSOL1 -", seaSolarText: "SEA Solar Series 1", zeroText: "0" },
    { accreditedText: "Accredited", ssolOneText: "SSOL1 -", seaSolarText: "SEA Solar Series 1", zeroText: "0" },
];
const whitelistUsersList = [
    { userImage: "images/img_image_1_40x36.png", headingText: "Arb Whitelist Era", tokensCounter: "0 Tokens" },
    { userImage: "images/img_image_5_40x40.png", headingText: "Compound", tokensCounter: "0 Tokens" },
    { userImage: "images/img_image_34x34.png", headingText: "Gemini Token List", tokensCounter: "0 Tokens" },
    { userImage: "images/img_vector_40x40.png", headingText: "Roll Social Money", tokensCounter: "0 Tokens" },
];
const gamingPortfolioList = [
    {
        userImage: "images/img_vector_40x40.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
    {
        userImage: "images/img_image_10.png",
        userName: "wMWERC20",
        userDescription: "InvestaX",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
    {
        userImage: "images/img_vector_40x40.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
    {
        userImage: "images/img_vector_40x40.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
    {
        userImage: "images/img_vector_40x40.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
    {
        userImage: "images/img_image_14.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "Wrapped Ixs Token",
        userNeeds: "0",
    },
    {
        userImage: "images/img_vector_40x40.png",
        userName: "wCKGP",
        userDescription: "OTP - Coach K Gaming Portfolio",
        userInfo: "INFO",
        userNeeds: "Needs accreditation",
    },
];
const tableData = [
    {
        nameHeader: "wBASE-01",
        issuerHeader: "Tokensoft P2P",
        countryHeader: "United States of America",
        industryHeader: "Technology",
        networkHeader: "base",
        imageEighteen: "images/img_image_40x40.png",
        imageNineteen: "images/img_ellipse_24.png",
    },
    {
        imageEighteen: "images/img_image_7.png",
        nameHeader: "CKGP",
        issuerHeader: "CoachK",
        countryHeader: "Thailand",
        industryHeader: "Other",
        imageNineteen: img_polygonlogofreelogovectorsnet_1,
        networkHeader: "polygon",
    },
    {
        imageEighteen: "images/img_image_8.png",
        nameHeader: "SSOL1",
        issuerHeader: "FRACSIO",
        countryHeader: "Singapore",
        industryHeader: "Energy & Mining",
        imageNineteen: img_polygonlogofreelogovectorsnet_1,
        networkHeader: "polygon",
    },
    {
        imageEighteen: "images/img_image_9.png",
        nameHeader: "TAU",
        issuerHeader: "NeuralNet Technologies LLC",
        countryHeader: "Singapore",
        industryHeader: "Technology",
        imageNineteen: img_polygonlogofreelogovectorsnet_1,
        networkHeader: "polygon",
    },
    {
        imageEighteen: "images/img_image_10.png",
        nameHeader: "IXAPE",
        issuerHeader: "InvestaX",
        countryHeader: "Singapore",
        industryHeader: "Finance",
        imageNineteen: img_polygonlogofreelogovectorsnet_1,
        networkHeader: "polygon",
    },
    {
        imageEighteen: "images/img_image_11.png",
        nameHeader: "MWERC20",
        issuerHeader: "Millennium Sapphire",
        countryHeader: "United States of America",
        industryHeader: "Other",
        imageNineteen: img_polygonlogofreelogovectorsnet_1,
        networkHeader: "polygon",
    },
];

export default function SecurityTokensSection() {
    const [searchBarValue4, setSearchBarValue4] = React.useState("");
    const [searchBarValue10, setSearchBarValue10] = React.useState("");
    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("nameHeader", {
                cell: (info) => (
                    <div className="flex items-center gap-[0.75rem] px-[1.00rem]">
                        <Img
                            src={info.row.original.imageEighteen}
                            alt="Image Eighteen"
                            className="h-[2.50rem] w-[2.50rem] rounded-[20px] object-cover"
                        />
                        <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                            {info.getValue()}
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <Heading
                        size="textxs"
                        as="p"
                        className="pl-[1.00rem] text-left font-inter text-[0.75rem] font-normal text-brand_color-1"
                    >
                        Name
                    </Heading>
                ),
                meta: { width: "16.13rem" },
            }),
            tableColumnHelper.accessor("issuerHeader", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Issuer
                    </Heading>
                ),
                meta: { width: "13.63rem" },
            }),
            tableColumnHelper.accessor("countryHeader", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Country
                    </Heading>
                ),
                meta: { width: "17.25rem" },
            }),
            tableColumnHelper.accessor("industryHeader", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Industry
                    </Heading>
                ),
                meta: { width: "11.25rem" },
            }),
            tableColumnHelper.accessor("networkHeader", {
                cell: (info) => (
                    <div className="flex flex-1 items-center justify-between gap-[1.25rem]">
                        <div className="flex items-center gap-[0.63rem]">
                            <Img
                                src={info.row.original.imageNineteen}
                                alt="Image Nineteen"
                                className="h-[1.50rem] w-[1.50rem] rounded-[12px] object-cover"
                            />
                            <Heading
                                as="p"
                                className="self-start text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700"
                            >
                                {info.getValue()}
                            </Heading>
                        </div>
                        <Heading
                            size="headings"
                            as="p"
                            className="mr-[3.00rem] bg-gradient bg-clip-text text-[0.75rem] font-bold uppercase tracking-[0.00rem] text-transparent"
                        >
                            Trade now
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <Heading size="textxs" as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Network
                    </Heading>
                ),
                meta: { width: "19.13rem" },
            }),
        ];
    }, []);

    return (
        <>
            {/* security tokens section */}
            <div className="flex flex-col items-center">
                <div className="container-xs md:px-[1.25rem]">
                    <div className="flex flex-col items-start">
                        <Heading
                            size="heading7xl"
                            as="h2"
                            className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                        >
                            Wrapped ERC20 Tokens
                        </Heading>
                        <div className="mt-[3.75rem] flex flex-col items-start gap-[1.25rem] self-stretch">
                            <Heading size="heading2xl" as="h3" className="text-[1.25rem] font-semibold text-white-a700">
                                My Wrapped ERC20 Tokens
                            </Heading>
                            <div className="self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[1.63rem] sm:p-[1.25rem]">
                                <div className="flex gap-[1.50rem] md:flex-col">
                                    <Suspense fallback={<div>Loading feed...</div>}>
                                        {accreditedList.map((d, index) => (
                                            <AccreditedProfile {...d} key={"accreditedList1" + index} />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[4.38rem] flex flex-col items-start gap-[1.25rem] self-stretch">
                            <Heading size="heading2xl" as="h4" className="text-[1.25rem] font-semibold text-white-a700">
                                Featured
                            </Heading>
                            <div className="flex gap-[1.50rem] self-stretch md:flex-col">
                                <Suspense fallback={<div>Loading feed...</div>}>
                                    {companyProfileList.map((d, index) => (
                                        <UserProfile2 {...d} key={"featuredList" + index} />
                                    ))}
                                </Suspense>
                            </div>
                        </div>
                        <div className="mt-[4.38rem] flex flex-col items-start gap-[1.25rem] self-stretch">
                            <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-semibold text-white-a700">
                                Other Wrapped ERC20 Tokens
                            </Heading>
                            <div className="flex flex-col gap-[3.13rem] self-stretch border border-solid border-gray-900_02 bg-gray-900_01 px-[0.75rem] py-[1.88rem] sm:py-[1.25rem]">
                                <div className="mx-[1.13rem] flex gap-[1.00rem] md:mx-0 md:flex-col">
                                    <Input
                                        color="gray_900"
                                        size="xs"
                                        shape="square"
                                        name="Search View"
                                        placeholder={`Search...`}
                                        value={searchBarValue10}
                                        onChange={(e) => setSearchBarValue10(e.target.value)}
                                        prefix={
                                            <Img src="images/img_search.svg" alt="Search" className="my-[0.13rem] h-[0.75rem] w-[1.25rem]" />
                                        }
                                        suffix={
                                            searchBarValue10?.length > 0 ? (
                                                <CloseSVG onClick={() => setSearchBarValue10("")} height={12} fillColor="#828282ff" />
                                            ) : null
                                        }
                                        className="flex-grow gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem]"
                                    />
                                    <div className="flex w-[38%] justify-center gap-[1.00rem] md:w-full sm:flex-col">
                                        <Button
                                            color="gray_900"
                                            size="md"
                                            variant="fill"
                                            shape="square"
                                            rightIcon={
                                                <Img
                                                    src="images/img_arrowdown.svg"
                                                    alt="Arrow Down"
                                                    className="my-[0.25rem] h-[0.50rem] w-[0.50rem]"
                                                />
                                            }
                                            className="min-w-[5.88rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.94rem] font-bold capitalize tracking-[0.00rem]"
                                        >
                                            Issuers
                                        </Button>
                                        <Button
                                            color="gray_900"
                                            size="md"
                                            variant="fill"
                                            shape="square"
                                            rightIcon={
                                                <Img
                                                    src="images/img_arrowdown.svg"
                                                    alt="Arrow Down"
                                                    className="mb-[0.25rem] mt-[0.13rem] h-[0.50rem] w-[0.50rem]"
                                                />
                                            }
                                            className="min-w-[6.38rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.94rem] font-bold capitalize tracking-[0.00rem]"
                                        >
                                            Country
                                        </Button>
                                        <Button
                                            color="gray_900"
                                            size="md"
                                            variant="fill"
                                            shape="square"
                                            rightIcon={
                                                <Img
                                                    src="images/img_arrowdown.svg"
                                                    alt="Arrow Down"
                                                    className="mb-[0.25rem] mt-[0.13rem] h-[0.50rem] w-[0.50rem]"
                                                />
                                            }
                                            className="min-w-[6.50rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.94rem] font-bold capitalize tracking-[0.00rem]"
                                        >
                                            Industry
                                        </Button>
                                        <div className="flex flex-1 justify-center bg-gradient p-[0.63rem] sm:self-stretch">
                                            <Heading
                                                size="headings"
                                                as="h6"
                                                className="text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                            >
                                                Reset filters
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-[1.13rem] md:ml-0">
                                    <ReactTable
                                        size="xs"
                                        bodyProps={{ className: "" }}
                                        className="md:block md:overflow-x-auto md:whitespace-nowrap"
                                        columns={tableColumns}
                                        data={tableData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[7.00rem] self-stretch">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center justify-between gap-[1.25rem] self-stretch sm:flex-col">
                                    <div className="flex flex-1 items-center sm:self-stretch">
                                        <Img
                                            src="images/img_arrow_down_brand_color_1.svg"
                                            alt="Arrow Down Three Image"
                                            className="h-[1.50rem] w-[1.50rem]"
                                        />
                                        <Img
                                            src="images/img_image_72x72.png"
                                            alt="Image Thirtyone"
                                            className="ml-[1.75rem] h-[4.50rem] w-[4.50rem] rounded-[36px] object-cover"
                                        />
                                        <Heading
                                            size="heading5xl"
                                            as="h3"
                                            className="ml-[1.38rem] text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                        >
                                            wBASE-01
                                        </Heading>
                                    </div>
                                    <div className="flex gap-[1.00rem]">
                                        <Button
                                            size="xs"
                                            variant="fill"
                                            shape="square"
                                            rightIcon={
                                                <Img
                                                    src="images/img_copysvgrepocom_1.png"
                                                    alt="Copy-svgrepo-com 1"
                                                    className="h-[1.00rem] w-[1.00rem] object-cover"
                                                />
                                            }
                                            className="green_A200_33_cyan_A100_33_border min-w-[10.75rem] gap-[0.50rem] border border-solid px-[0.94rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                                        >
                                            0x5D57C...66c7c
                                        </Button>
                                        <Img
                                            src="images/img_ellipse_24_32x32.png"
                                            alt="Image Thirtytwo"
                                            className="h-[2.00rem] w-[2.00rem] rounded-[16px] object-cover"
                                        />
                                    </div>
                                </div>
                                <Text
                                    as="p"
                                    className="mt-[1.25rem] font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                >
                                    <>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry&#39;s standard dummy text ever since the 1500s,
                                        <br />
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </>
                                </Text>
                                <div className="mt-[2.50rem] flex flex-col gap-[1.50rem] self-stretch">
                                    <div className="flex gap-[1.50rem] md:flex-col">
                                        <Input
                                            shape="square"
                                            name="Country Edit"
                                            placeholder={`Country`}
                                            suffix={
                                                <Text className="my-[0.50rem] w-[12.50rem] text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700">
                                                    United States of America
                                                </Text>
                                            }
                                            className="w-full gap-[1.00rem] border px-[0.88rem] capitalize tracking-[0.00rem]"
                                        />
                                        <Input
                                            shape="square"
                                            name="Issuer Edit"
                                            placeholder={`Issuer`}
                                            suffix={
                                                <Text className="my-[0.50rem] w-[7.13rem] bg-gradient bg-clip-text text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-transparent">
                                                    Tokensoft P2P
                                                </Text>
                                            }
                                            className="w-full gap-[1.00rem] border px-[0.88rem] capitalize tracking-[0.00rem]"
                                        />
                                        <Input
                                            shape="square"
                                            name="Date Edit"
                                            placeholder={`Issuance Date`}
                                            suffix={
                                                <Text className="my-[0.50rem] w-[8.38rem] text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700">
                                                    Mar 7, 2024 10:37
                                                </Text>
                                            }
                                            className="w-full gap-[1.00rem] border px-[0.88rem] capitalize tracking-[0.00rem]"
                                        />
                                    </div>
                                    <div className="flex gap-[1.56rem] md:flex-col">
                                        <Input
                                            shape="square"
                                            name="Industry Edit"
                                            placeholder={`Industry`}
                                            suffix={
                                                <Text className="my-[0.50rem] w-[5.75rem] text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700">
                                                    Technology
                                                </Text>
                                            }
                                            className="w-[32%] gap-[1.00rem] border px-[0.88rem] capitalize tracking-[0.00rem] md:w-full"
                                        />
                                        <Input
                                            shape="square"
                                            name="Website Edit"
                                            placeholder={`Website`}
                                            suffix={
                                                <Text className="my-[0.50rem] w-[12.75rem] bg-gradient bg-clip-text text-[0.88rem] font-bold tracking-[0.00rem] text-transparent">
                                                    https://www.tokensoft.io/
                                                </Text>
                                            }
                                            className="w-[32%] gap-[1.00rem] border px-[0.88rem] capitalize tracking-[0.00rem] md:w-full"
                                        />
                                    </div>
                                </div>
                                <div className="mt-[4.38rem] flex flex-col items-center justify-center self-stretch border border-solid border-gray-900_02 bg-gray-900_01 px-[3.50rem] py-[5.00rem] md:p-[1.25rem]">
                                    <div className="flex items-center gap-[0.75rem] sm:flex-col">
                                        <Heading
                                            size="heading5xl"
                                            as="h3"
                                            className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                        >
                                            Create wBASE-01 Vault
                                        </Heading>
                                        <Img
                                            src="images/img_info_circle_svgrepo_com.svg"
                                            alt="Info Image"
                                            className="h-[1.25rem] w-[1.25rem] sm:w-full"
                                        />
                                    </div>
                                    <Text as="p" className="mt-[0.75rem] font-inter text-[1.00rem] font-normal text-brand_color-1">
                                        To trade/swap wBASE-01 please pass accreditation.
                                    </Text>
                                    <Button
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="mt-[2.50rem] min-w-[21.88rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    >
                                        Pass accreditation
                                    </Button>
                                </div>
                                <div className="mt-[6.00rem] self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                    <div className="flex flex-col items-start">
                                        <div className="self-stretch">
                                            <div className="flex flex-col gap-[1.88rem]">
                                                <div className="flex items-center justify-between gap-[1.25rem] md:flex-col">
                                                    <div className="flex flex-1 flex-col items-start self-end md:self-stretch sm:self-auto">
                                                        <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-semibold text-white-a700">
                                                            My SSL1 Vault
                                                        </Heading>
                                                        <div className="mt-[0.50rem] flex items-start self-stretch sm:flex-col">
                                                            <Heading
                                                                size="heading7xl"
                                                                as="h1"
                                                                className="self-center bg-gradient bg-clip-text text-[2.50rem] font-bold text-transparent md:text-[2.38rem] sm:text-[2.25rem]"
                                                            >
                                                                0 wSSL1
                                                            </Heading>
                                                            <div className="flex flex-1 justify-end gap-[1.00rem] pl-[3.50rem] pr-[6.25rem] md:px-[1.25rem] sm:self-stretch">
                                                                <Button
                                                                    size="xs"
                                                                    variant="fill"
                                                                    shape="square"
                                                                    rightIcon={
                                                                        <Img
                                                                            src="images/img_copysvgrepocom_1.png"
                                                                            alt="Copy-svgrepo-com 1"
                                                                            className="h-[1.00rem] w-[1.00rem] object-cover"
                                                                        />
                                                                    }
                                                                    className="green_A200_33_cyan_A100_33_border min-w-[12.00rem] gap-[0.50rem] border border-solid px-[1.56rem] font-bold capitalize tracking-[0.00rem] !text-white-a700 sm:px-[1.25rem]"
                                                                >
                                                                    0x5D57C...66c7c
                                                                </Button>
                                                                <Button
                                                                    size="xs"
                                                                    variant="fill"
                                                                    shape="square"
                                                                    rightIcon={
                                                                        <Img
                                                                            src="images/img_metamask_fox_1.svg"
                                                                            alt="Metamask Fox 1"
                                                                            className="h-[1.00rem] w-[1.00rem]"
                                                                        />
                                                                    }
                                                                    className="green_A200_33_cyan_A100_33_border min-w-[12.00rem] gap-[0.50rem] border border-solid px-[1.31rem] font-bold capitalize tracking-[0.00rem] !text-white-a700 sm:px-[1.25rem]"
                                                                >
                                                                    Add to Metamask
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            On first digital custodian
                                                        </Heading>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-[1.00rem]">
                                                        <Button
                                                            shape="square"
                                                            color="brand_color_0_green_800"
                                                            className="min-w-[15.00rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                                        >
                                                            deposit
                                                        </Button>
                                                        <Button
                                                            color="white_A700"
                                                            variant="outline"
                                                            shape="square"
                                                            className="min-w-[15.00rem] !border px-[2.06rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                                        >
                                                            withdraw
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="h-[0.06rem] bg-white-a700_1e" />
                                            </div>
                                        </div>
                                        <Heading
                                            size="heading2xl"
                                            as="h5"
                                            className="mt-[1.75rem] text-[1.25rem] font-semibold text-white-a700"
                                        >
                                            History od deposits and withdraw
                                        </Heading>
                                        <div className="mx-[1.00rem] mt-[2.50rem] flex self-stretch md:mx-0 md:flex-col">
                                            <div className="flex items-center gap-[0.50rem]">
                                                <Heading
                                                    size="textxs"
                                                    as="p"
                                                    className="font-inter text-[0.75rem] font-normal text-brand_color-1"
                                                >
                                                    All
                                                </Heading>
                                                <Img
                                                    src="images/img_arrow_right_336_white_a700.svg"
                                                    alt="Arrow Right Image"
                                                    className="mb-[0.25rem] h-[0.25rem] self-end"
                                                />
                                            </div>
                                            <Heading
                                                size="textxs"
                                                as="p"
                                                className="font-inter text-[0.75rem] font-normal text-brand_color-1"
                                            >
                                                Amount
                                            </Heading>
                                            <Heading
                                                size="textxs"
                                                as="p"
                                                className="ml-[20.00rem] font-inter text-[0.75rem] font-normal text-brand_color-1 md:ml-0"
                                            >
                                                Status
                                            </Heading>
                                            <Heading
                                                size="textxs"
                                                as="p"
                                                className="ml-[20.00rem] font-inter text-[0.75rem] font-normal text-brand_color-1 md:ml-0"
                                            >
                                                Date
                                            </Heading>
                                        </div>
                                        <Button
                                            color="gray_900"
                                            size="2xl"
                                            variant="fill"
                                            shape="square"
                                            className="mt-[0.75rem] self-stretch px-[2.13rem] font-medium capitalize tracking-[0.00rem] !text-brand_color-1 sm:px-[1.25rem]"
                                        >
                                            No results found
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[9.25rem] flex items-start self-stretch md:flex-col">
                            <div className="flex flex-1 flex-col items-start gap-[1.88rem] self-center md:self-stretch">
                                <div className="flex items-center justify-between gap-[1.25rem] self-stretch">
                                    <Heading
                                        size="heading7xl"
                                        as="h1"
                                        className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                                    >
                                        Liquidity
                                    </Heading>
                                    <Img
                                        src="images/img_settings_svgrepo_com.svg"
                                        alt="Settings Image"
                                        className="mr-[5.00rem] h-[1.75rem] w-[1.75rem]"
                                    />
                                </div>
                                <div className="flex w-[88%] flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                                    <div className="self-stretch border border-solid border-gray-900_02 bg-gray-900 p-[1.25rem]">
                                        <div className="flex flex-col gap-[1.00rem]">
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
                                                <Img
                                                    src="images/img_close_md_svgrepo_com.svg"
                                                    alt="Close Image"
                                                    className="h-[1.50rem] w-[1.50rem]"
                                                />
                                            </div>
                                            <Heading
                                                as="p"
                                                className="font-inter text-[0.88rem] font-normal leading-[1.25rem] text-brand_color-1"
                                            >
                                                By accessing and utilizing Liquidity Pools, you acknowledge and accept the inherent risks
                                                involved, including market volatility, impermanent loss, regulatory changes and/or smart
                                                contract vulnerabilities. IX Swap makes no guarantees of profit and expressly disclaims
                                                responsibility for any losses you may suffer due to such risks. You acknowledge that your access
                                                and use of Liquidity Pools shall be at your own risk, and you should conduct independent
                                                research and are encouraged to seek professional advice before doing so.
                                            </Heading>
                                        </div>
                                    </div>
                                    <Button
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    >
                                        Add Liquidity
                                    </Button>
                                    <Heading
                                        size="heading2xl"
                                        as="h5"
                                        className="mt-[2.50rem] self-start text-[1.25rem] font-bold text-white-a700"
                                    >
                                        My Liquidity
                                    </Heading>
                                    <Button
                                        color="gray_900"
                                        size="xl"
                                        variant="fill"
                                        shape="square"
                                        className="mt-[1.25rem] self-stretch border border-solid border-gray-900_02 px-[1.94rem] font-medium !text-brand_color-1 sm:px-[1.25rem]"
                                    >
                                        No liquidity found
                                    </Button>
                                    <div className="mt-[1.25rem] flex flex-wrap gap-[0.50rem]">
                                        <Heading as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                                            Don&#39;t see a pool you joined?
                                        </Heading>
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="bg-gradient bg-clip-text text-[0.88rem] font-bold text-transparent"
                                        >
                                            Import it.
                                        </Heading>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[4.88rem] flex w-[46%] flex-col gap-[1.25rem] md:w-full">
                                <div className="flex items-center gap-[1.25rem]">
                                    <Img
                                        src="images/img_arrow_down_brand_color_1.svg"
                                        alt="Arrow Down Five"
                                        className="h-[1.50rem] w-[1.50rem]"
                                    />
                                    <Heading
                                        size="heading4xl"
                                        as="h4"
                                        className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]"
                                    >
                                        Transaction settings
                                    </Heading>
                                </div>
                                <div className="border border-solid border-gray-900_02 bg-gray-900_01 p-[1.75rem] sm:p-[1.25rem]">
                                    <div>
                                        <div className="flex items-center gap-[0.56rem]">
                                            <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                                Slippage tolerance
                                            </Heading>
                                            <Img
                                                src="images/img_info_circle_svgrepo_com.svg"
                                                alt="Info Image"
                                                className="h-[1.00rem] w-[1.00rem] self-end"
                                            />
                                        </div>
                                        <div className="mt-[1.25rem] flex justify-center gap-[0.75rem]">
                                            <Heading
                                                size="textlg"
                                                as="p"
                                                className="border border-solid border-gray-900_02 bg-gray-900_01 py-[0.75rem] pl-[1.00rem] pr-[2.13rem] text-[1.13rem] font-medium text-brand_color-1 sm:pr-[1.25rem]"
                                            >
                                                0.10%
                                            </Heading>
                                            <Button
                                                shape="square"
                                                color="brand_color_0_green_800"
                                                className="min-w-[13.00rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                            >
                                                auto
                                            </Button>
                                        </div>
                                        <div className="mt-[2.50rem]">
                                            <div className="flex flex-col gap-[1.25rem]">
                                                <div className="flex items-center gap-[0.56rem]">
                                                    <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                                        Transaction deadline
                                                    </Heading>
                                                    <Img
                                                        src="images/img_info_circle_svgrepo_com.svg"
                                                        alt="Info Image Thirtysix"
                                                        className="h-[1.00rem] w-[1.00rem] self-end"
                                                    />
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900_01 px-[1.00rem] py-[0.75rem]">
                                                    <Heading size="textlg" as="p" className="text-[1.13rem] font-medium text-brand_color-1">
                                                        30
                                                    </Heading>
                                                    <Heading size="textlg" as="p" className="text-[1.13rem] font-medium text-brand_color-1">
                                                        Minutes
                                                    </Heading>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-[2.50rem] flex flex-col items-start gap-[0.88rem]">
                                            <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                                Interface Settings
                                            </Heading>
                                            <div className="flex flex-col gap-[1.00rem] self-stretch">
                                                <ExpertModeProfile />
                                                <ExpertModeProfile expertModeText="Disable Multihops" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[5.00rem] flex items-start self-stretch md:flex-col">
                            <div className="flex flex-1 flex-col items-start gap-[1.25rem] md:self-stretch">
                                <div className="flex items-center gap-[1.25rem] self-stretch">
                                    <Img
                                        src="images/img_arrow_down_brand_color_1.svg"
                                        alt="Arrow Down Seven"
                                        className="h-[1.50rem] w-[1.50rem]"
                                    />
                                    <Heading
                                        size="heading4xl"
                                        as="h4"
                                        className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]"
                                    >
                                        Add Liquidity
                                    </Heading>
                                </div>
                                <div className="w-[88%] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                                    <div className="flex flex-col items-start">
                                        <div className="relative h-[14.38rem] content-center self-stretch md:h-auto">
                                            <div className="mx-auto flex flex-1 flex-col gap-[1.25rem]">
                                                {/*  <UserProfile3 />
                                                <UserProfile3
                                                    headingText="2"
                                                    maxButton="Max"
                                                    userImage="images/img_image_12.png"
                                                    userName="MATIC"
                                                    balanceLabel="Balance:"
                                                    balanceValue="0 MATIC"
                                                /> */}
                                            </div>
                                            <Img
                                                src="images/img_close.svg"
                                                alt="Close One Image"
                                                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                                            />
                                        </div>
                                        <Heading size="headingmd" as="p" className="mt-[1.88rem] text-[0.88rem] font-bold text-white-a700">
                                            Initial prices and pool share
                                        </Heading>
                                        <div className="mt-[0.50rem] flex gap-[1.00rem] self-stretch sm:flex-col">
                                            <div className="flex w-full flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.88rem] sm:w-full">
                                                <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                                    0.2
                                                </Heading>
                                                <Heading as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                                                    MATIC per wSSOL1
                                                </Heading>
                                            </div>
                                            <div className="flex w-full flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.88rem] sm:w-full">
                                                <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                                    0.2
                                                </Heading>
                                                <Heading as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                                                    MATIC per MATIC
                                                </Heading>
                                            </div>
                                        </div>
                                        <div className="mt-[1.00rem] flex flex-col items-center justify-center gap-[0.13rem] self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[0.75rem]">
                                            <Heading size="heading3xl" as="h5" className="text-[1.38rem] font-bold text-gray-50">
                                                100%
                                            </Heading>
                                            <Heading as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                                                Share of Pool
                                            </Heading>
                                        </div>
                                        <Button
                                            shape="square"
                                            color="brand_color_0_green_800"
                                            className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[46%] self-center border border-solid border-gray-900_02 bg-gray-900_01 px-[0.63rem] py-[1.50rem] md:w-full sm:py-[1.25rem]">
                                <div className="ml-[1.25rem] mt-[0.38rem] flex flex-col items-center gap-[1.50rem] md:ml-0">
                                    <div className="mr-[1.25rem] flex items-center justify-between gap-[1.25rem] self-stretch md:mr-0">
                                        <Heading
                                            size="heading4xl"
                                            as="h4"
                                            className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                                        >
                                            Select a token to swap
                                        </Heading>
                                        <Img
                                            src="images/img_close_md_svgrepo_com.svg"
                                            alt="Close Image"
                                            className="h-[1.50rem] w-[1.50rem]"
                                        />
                                    </div>
                                    <Input
                                        color="gray_900"
                                        size="xs"
                                        shape="square"
                                        name="Search View"
                                        placeholder={`Search or paste address`}
                                        value={searchBarValue4}
                                        onChange={(e) => setSearchBarValue4(e.target.value)}
                                        prefix={
                                            <Img src="images/img_search.svg" alt="Search" className="my-[0.13rem] h-[0.75rem] w-[1.25rem]" />
                                        }
                                        suffix={
                                            searchBarValue4?.length > 0 ? (
                                                <CloseSVG onClick={() => setSearchBarValue4("")} height={12} fillColor="#828282ff" />
                                            ) : null
                                        }
                                        className="mr-[1.25rem] gap-[0.50rem] self-stretch border px-[0.75rem] tracking-[0.00rem] md:mr-0"
                                    />
                                    <div className="flex items-start justify-center gap-[1.00rem] self-stretch sm:flex-col">
                                        <div className="flex flex-1 flex-col gap-[0.63rem] self-center sm:self-stretch">
                                            {/*  <Suspense fallback={<div>Loading feed...</div>}>
                                                {gamingPortfolioList.map((d, index) => (
                                                    <UserProfile4 {...d} key={"listWckgpOne" + index} />
                                                ))}
                                            </Suspense> */}
                                        </div>
                                        <div className="mt-[11.38rem] h-[7.50rem] w-[0.19rem] rounded-[1px] bg-white-a700_1e sm:h-[0.19rem] sm:w-[7.50rem]" />
                                    </div>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="bg-gradient bg-clip-text text-[0.88rem] font-bold uppercase text-transparent"
                                    >
                                        Manage Token List
                                    </Heading>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start self-stretch md:flex-col">
                            <div className="flex w-full flex-col items-start gap-[1.88rem]">
                                <div className="flex items-center justify-between gap-[1.25rem] self-stretch">
                                    <Heading
                                        size="heading7xl"
                                        as="h1"
                                        className="text-[2.50rem] font-bold text-white-a700 md:text-[2.38rem] sm:text-[2.25rem]"
                                    >
                                        Swap
                                    </Heading>
                                    <Img
                                        src="images/img_settings_svgrepo_com.svg"
                                        alt="Settings Image"
                                        className="mr-[2.50rem] h-[1.75rem] w-[1.75rem]"
                                    />
                                </div>
                                <div className="flex w-[94%] flex-col gap-[1.75rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                                    <div className="flex flex-col gap-[1.00rem] border border-solid border-gray-900_02 bg-gray-900 p-[1.25rem]">
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
                                            <Img
                                                src="images/img_close_md_svgrepo_com.svg"
                                                alt="Close Image"
                                                className="h-[1.50rem] w-[1.50rem]"
                                            />
                                        </div>
                                        <Heading
                                            as="p"
                                            className="font-inter text-[0.88rem] font-normal leading-[1.25rem] text-brand_color-1"
                                        >
                                            By accessing and utilizing Swap/Trade, you acknowledge and accept the inherent risks involved,
                                            including market volatility, impermanent loss, regulatory changes and/or smart contract
                                            vulnerabilities. IX Swap makes no guarantees of profit and expressly disclaims responsibility for
                                            any losses you may suffer due to such risks. You acknowledge that your access and use of
                                            Swap/Trade shall be at your own risk, and you should conduct independent research and are
                                            encouraged to seek professional advice before doing so.
                                        </Heading>
                                    </div>
                                    <div className="relative h-[14.38rem] content-center md:h-auto">
                                        <div className="mx-auto flex flex-1 flex-col gap-[1.25rem]">
                                            <UserProfile5 />
                                            <UserProfile5
                                                twelve="4.57392"
                                                userImage="images/img_image_15.png"
                                                userText="USDC.e"
                                                userBalanceLabel="Balance:"
                                                userBalance="0 USDC.e"
                                            />
                                        </div>
                                        <Img
                                            src="images/img_light_bulb.svg"
                                            alt="Lightbulb Image"
                                            className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-[2.00rem]">
                                            <div className="flex justify-center sm:flex-col">
                                                <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                                    Current Rate
                                                </Heading>
                                                <div className="flex flex-1 items-center justify-end gap-[0.81rem] sm:self-stretch">
                                                    <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                                        1 USDC.e PER 2.624 MATIC
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
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
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
                                                        <span className="text-brand_color-1">&gt; USDC.e</span>
                                                    </Heading>
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
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
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
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
                                            <Button
                                                shape="square"
                                                color="brand_color_0_green_800"
                                                className="self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                            >
                                                Swap
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[6.75rem] flex w-full flex-col items-end gap-[5.13rem] self-end md:gap-[3.81rem] md:self-auto sm:gap-[2.56rem]">
                                <div className="w-[94%] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                                    <div className="flex items-center justify-center">
                                        <div className="flex flex-1 items-center gap-[1.25rem]">
                                            <Img
                                                src="images/img_arrow_down_brand_color_1.svg"
                                                alt="Arrow Down Nine"
                                                className="h-[1.50rem] w-[1.50rem]"
                                            />
                                            <Heading
                                                size="heading4xl"
                                                as="h4"
                                                className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                                            >
                                                Manage tokens
                                            </Heading>
                                        </div>
                                        <Img
                                            src="images/img_close_md_svgrepo_com.svg"
                                            alt="Close Image"
                                            className="h-[1.50rem] w-[1.50rem]"
                                        />
                                    </div>
                                    <div className="mt-[1.88rem] flex flex-col items-start">
                                        <div className="mx-[1.50rem] flex flex-wrap gap-[3.06rem] self-stretch md:mx-0">
                                            <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                                Lists
                                            </Heading>
                                            <Text as="p" className="text-[1.00rem] font-normal text-brand_color-1">
                                                Tokens
                                            </Text>
                                        </div>
                                        <div className="mt-[0.75rem] h-[0.06rem] w-[34%] bg-white-a700_1e" />
                                        <div className="h-[0.13rem] w-[16%] bg-gradient" />
                                    </div>
                                    <Input
                                        color="gray_900"
                                        size="xs"
                                        shape="square"
                                        type="text"
                                        name="ENS Name Edit"
                                        placeholder={`https:// or ipfs:// or ENS name`}
                                        className="mt-[1.00rem] border px-[0.88rem] tracking-[0.00rem]"
                                    />
                                    <div className="mt-[1.25rem] flex flex-col gap-[0.63rem]">
                                        <Suspense fallback={<div>Loading feed...</div>}>
                                            {whitelistUsersList.map((d, index) => (
                                                <UserProfile6 {...d} key={"listArb" + index} />
                                            ))}
                                        </Suspense>
                                    </div>
                                </div>
                                <div className="flex w-[94%] flex-col items-start border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                                    <div className="flex items-center self-stretch">
                                        <div className="flex flex-1 items-center gap-[1.25rem]">
                                            <Img
                                                src="images/img_arrow_down_brand_color_1.svg"
                                                alt="Arrow Down"
                                                className="h-[1.50rem] w-[1.50rem]"
                                            />
                                            <Heading
                                                size="heading4xl"
                                                as="h4"
                                                className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                                            >
                                                Manage tokens
                                            </Heading>
                                        </div>
                                        <Img
                                            src="images/img_close_md_svgrepo_com.svg"
                                            alt="Close Image"
                                            className="h-[1.50rem] w-[1.50rem]"
                                        />
                                    </div>
                                    <div className="mt-[1.88rem] flex flex-col items-start self-stretch">
                                        <div className="mx-[1.50rem] flex flex-wrap gap-[2.69rem] self-stretch md:mx-0">
                                            <Text as="p" className="text-[1.00rem] font-normal text-brand_color-1">
                                                Lists
                                            </Text>
                                            <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                                Tokens
                                            </Heading>
                                        </div>
                                        <div className="mt-[0.75rem] h-[0.06rem] w-[34%] bg-white-a700_1e" />
                                        <div className="ml-[4.63rem] h-[0.13rem] w-[24%] bg-gradient md:ml-0" />
                                    </div>
                                    <Input
                                        color="gray_900"
                                        size="xs"
                                        shape="square"
                                        name="0x0000 Edit"
                                        placeholder={`0x0000`}
                                        className="mt-[1.13rem] self-stretch border px-[0.88rem] tracking-[0.00rem]"
                                    />
                                    <Text
                                        as="p"
                                        className="mb-[18.75rem] mt-[0.75rem] text-[1.00rem] font-medium tracking-[0.00rem] text-brand_color-1"
                                    >
                                        0 Custom Tokens
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
