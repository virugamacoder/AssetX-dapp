import { img_arrow_down_brand_color_1, img_arrow_right_336_white_a700, img_copysvgrepocom_1, img_ellipse_24_32x32, img_image_3, img_image_72x72, img_info_circle_svgrepo_com, img_metamask_fox_1, img_polygonlogofreelogovectorsnet_1 } from "assets/images"
import { Button, Heading, Img, Input, ReactTable, Text } from "components"
import { useCustomQuery } from "hooks"
import moment from "moment"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getImageFromPinata } from "services/pinata"
import { getTokenDetailsRQ, STOS_KEYS } from "services/STO"
import { handleCopyToClipboard } from "utils"
import { createColumnHelper } from "@tanstack/react-table"
import Chart from "react-google-charts"
import { chartData, chartOptions } from "./chartConfig"

const tableData = [
    {
        id: 1,
        transactionHash: "0xe5595a5610129f1a5cb60b695b7fb9eed5ac7727a600cd57b2ffa9ab1c03b5ed",
        from: "0x2031832e54a2200bF678286f560F49A950DB2Ad5",
        to: "0x66588d1608F742ea4383A36104f511526BC9E7FC",
        amount: "0.1 ETH",
        txnFee: "0.00010617",
    },
    {
        id: 2,
        transactionHash: "0x2b6a00495ae43bf89d2b7f9810be02d193647bdd91a28b973581cb3c64d1dee4",
        from: "0xFA215cf76e10FF295E954EDcf7eA9DAf1ebbe3fC",
        to: "0x5f5a404A5edabcDD80DB05E8e54A78c9EBF000C2",
        amount: "0.06 ETH",
        txnFee: "0.00115605",
    },
    {
        id: 3,
        transactionHash: "0x0ffb3619d8fd51dc23c2a9dec1b3b475293bc5dc6d5a452bd34a2e793951dd13",
        from: "0x6b9013FdAD9bbeF2c77288e71355F56cfcFDb987",
        to: "0x816Dcab6B9491c7c84b9C483c415B15eD7ddEb76",
        amount: "0.047858929 ETH",
        txnFee: "0.000132",
    },
    {
        id: 4,
        transactionHash: "0x2b6a00495ae43bf89d2b7f9810be02d193647bdd91a28b973581cb3c64d1dee4",
        from: "0xFA215cf76e10FF295E954EDcf7eA9DAf1ebbe3fC",
        to: "0x5f5a404A5edabcDD80DB05E8e54A78c9EBF000C2",
        amount: "0.06 ETH",
        txnFee: "0.00115605",
    },
    {
        id: 5,
        transactionHash: "0x0ffb3619d8fd51dc23c2a9dec1b3b475293bc5dc6d5a452bd34a2e793951dd13",
        from: "0x6b9013FdAD9bbeF2c77288e71355F56cfcFDb987",
        to: "0x816Dcab6B9491c7c84b9C483c415B15eD7ddEb76",
        amount: "0.047858929 ETH",
        txnFee: "0.000132",
    },
];

function SecurityTokenDetails() {
    let { id: tokenAddress } = useParams();

    const [tokenMeta, setTokenMeta] = useState([
        {
            label: "Country",
            value: "",
        }, {
            label: "Issuer",
            value: ""
        }, {
            label: "Issuance Date",
            value: ""
        }, {
            label: "Industry",
            value: ""
        }, {
            label: "Website",
            value: ""
        }
    ])

    const navigate = useNavigate()

    const { data: getTokenDetailsData, isLoading: getTokenDetailsLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.GET_STO_DETAIL, tokenAddress],
        queryFn: getTokenDetailsRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("transactionHash", {
                cell: (info) => (
                    <div className="flex items-center gap-[0.75rem] px-[1.00rem]">
                        <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                            {/* {info.getValue()} */}
                            <Button
                                size="xs"
                                // variant="fill"
                                // shape="square"
                                rightIcon={
                                    <Img
                                        src={img_copysvgrepocom_1}
                                        alt="Copy-svgrepo-com 1"
                                        className="h-[1.00rem] w-[1.00rem] object-cover"
                                    />
                                }
                                className="min-w-[10.75rem] gap-[0.50rem] justify-start"
                                style={{ padding: "0", height: "auto", justifyContent: "flex-start" }}
                                onClick={() => handleCopyToClipboard(info.getValue())}
                            >
                                {info.getValue()?.slice(0, 6)}...{info.getValue()?.slice(-4)}
                            </Button>
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <Heading
                        size="textxs"
                        as="p"
                        style={{ color: `var(--brand_color_1)` }}
                        className="pl-[1.00rem] text-left font-inter text-[0.75rem] font-normal"
                    >
                        Transaction Hash
                    </Heading>
                ),
                meta: { width: "16.13rem" },
            }),
            tableColumnHelper.accessor("from", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        <Button
                            size="xs"
                            // variant="fill"
                            // shape="square"
                            rightIcon={
                                <Img
                                    src={img_copysvgrepocom_1}
                                    alt="Copy-svgrepo-com 1"
                                    className="h-[1.00rem] w-[1.00rem] object-cover"
                                />
                            }
                            className="min-w-[10.75rem] gap-[0.50rem] justify-start"
                            style={{ padding: "0", height: "auto", justifyContent: "flex-start" }}
                            onClick={() => handleCopyToClipboard(info.getValue())}
                        >
                            {info.getValue()?.slice(0, 6)}...{info.getValue()?.slice(-4)}
                        </Button>
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal">
                        From
                    </Heading>
                ),
                meta: { width: "13.63rem" },
            }),
            tableColumnHelper.accessor("to", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        <Button
                            size="xs"
                            // variant="fill"
                            // shape="square"
                            rightIcon={
                                <Img
                                    src={img_copysvgrepocom_1}
                                    alt="Copy-svgrepo-com 1"
                                    className="h-[1.00rem] w-[1.00rem] object-cover"
                                />
                            }
                            className="min-w-[10.75rem] gap-[0.50rem] justify-start"
                            style={{ padding: "0", height: "auto", justifyContent: "flex-start" }}
                            onClick={() => handleCopyToClipboard(info.getValue())}
                        >
                            {info.getValue()?.slice(0, 6)}...{info.getValue()?.slice(-4)}
                        </Button>
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        To
                    </Heading>
                ),
                meta: { width: "17.25rem" },
            }),
            tableColumnHelper.accessor("amount", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Amount
                    </Heading>
                ),
                meta: { width: "11.25rem" },
            }),
            tableColumnHelper.accessor("txnFee", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Txn Fee
                    </Heading>
                ),
                meta: { width: "11.25rem" },
            }),
        ];
    }, []);

    // console.log("getTokenDetailsData", getTokenDetailsData)

    return (
        <div className="mt-[3.75rem] self-stretch">
            <div className="flex flex-col items-start">
                <div className="flex items-center justify-between gap-[1.25rem] self-stretch sm:flex-col">
                    <div className="flex flex-1 items-center sm:self-stretch">
                        <Button
                            style={{ padding: "0", height: "auto" }}
                            onClick={() => navigate(-1)}
                        >
                            <Img
                                src={img_arrow_down_brand_color_1}
                                alt="Arrow Down Three Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        </Button>
                        <Img
                            src={getImageFromPinata(getTokenDetailsData?.data?.stoImage)}
                            alt="Image Thirtyone"
                            className="ml-[1.75rem] h-[4.50rem] w-[4.50rem] rounded-[36px] object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = img_image_3;
                            }}
                        />
                        <Heading
                            size="heading5xl"
                            as="h3"
                            className="ml-[1.38rem] text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                        >
                            {getTokenDetailsData?.data?.stoTokenName}
                        </Heading>
                    </div>
                    <div className="flex gap-[1.00rem]">
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
                            className="green_A200_33_cyan_A100_33_border min-w-[10.75rem] gap-[0.50rem] border border-solid px-[0.94rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                            onClick={() => handleCopyToClipboard(getTokenDetailsData?.data?.rwaToken)}
                        >
                            {getTokenDetailsData?.data?.rwaToken?.slice(0, 6)}...{getTokenDetailsData?.data?.rwaToken?.slice(-4)}
                        </Button>
                        <Img
                            src={getImageFromPinata(getTokenDetailsData?.data?.stoImage)}
                            alt="Image Thirtytwo"
                            className="h-[2.00rem] w-[2.00rem] rounded-[16px] object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = img_image_3;
                            }}
                        />
                    </div>
                </div>
                <Text
                    as="p"
                    className="mt-[1.25rem] font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                >
                    {getTokenDetailsData?.data?.description}
                </Text>
                <div className="mt-[2.50rem] flex flex-col gap-[1.50rem] self-stretch">
                    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[1.50rem]">
                        {tokenMeta?.map((meta, index) => {
                            return (
                                <div
                                    key={`STOdetail-${index}`}
                                    className="flex items-center justify-between border border-gray-900_02 border border-solid  rounded-[0px] h-[50px] px-[16px]">
                                    <Heading
                                        size="heading5xl"
                                        as="h3"
                                        style={{
                                            color: `var(--brand_color_1)`,
                                            fontSize: `14px`
                                        }}
                                        className="text-[.88rem] font-medium text-white-a700"
                                    >
                                        {meta.label}
                                    </Heading>
                                    <Text
                                        style={
                                            meta.label === "Website" || meta.label === "Issuer" ?
                                                {
                                                    background: `linear-gradient(var(--gradient4))`,
                                                    backgroundClip: `text`,
                                                    color: `transparent`
                                                }
                                                :
                                                { color: `var(--white_a700)` }
                                        }
                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                    >
                                        {meta.label == "Website" &&
                                            getTokenDetailsData?.data?.companyWebsite
                                        }
                                        {meta.label == "Issuer" &&
                                            getTokenDetailsData?.data?.issuer
                                        }
                                        {meta.label == "Country" &&
                                            getTokenDetailsData?.data?.country
                                        }
                                        {meta.label == "Issuance Date" &&
                                            moment.unix(getTokenDetailsData?.data?.issuanceDate).format('MMMM Do YYYY, h:mm')
                                        }
                                        {meta.label == "Industry" &&
                                            getTokenDetailsData?.data?.industry
                                        }
                                    </Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-[4.38rem] flex flex-col items-center justify-center self-stretch border border-solid border-gray-900_02 bg-gray-900_01 px-[2rem] py-[2rem] md:p-[1.25rem]">
                    <Chart
                        chartType="CandlestickChart"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={chartOptions}
                    />
                    {/* <div className="flex items-center gap-[0.75rem] sm:flex-col">
                        <Heading
                            size="heading5xl"
                            as="h3"
                            className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                        >
                            Create wBASE-01 Vault
                        </Heading>
                        <Img
                            src={img_info_circle_svgrepo_com}
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
                    </Button> */}
                </div>
                <div className="mt-[4.38rem]">
                    <ReactTable
                        size="xs"
                        bodyProps={{ className: "" }}
                        className="md:block md:overflow-x-auto md:whitespace-nowrap w-full"
                        columns={tableColumns}
                        data={tableData}
                    />
                </div>
                {/*  <div className="mt-[6.00rem] self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
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
                                                            src={img_copysvgrepocom_1}
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
                                                            src={img_metamask_fox_1}
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
                                    src={img_arrow_right_336_white_a700}
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
                </div> */}
            </div>
        </div>
    )
}

export default SecurityTokenDetails
