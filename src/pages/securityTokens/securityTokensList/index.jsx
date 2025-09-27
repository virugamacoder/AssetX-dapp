import { useConnectModal } from '@rainbow-me/rainbowkit';
import { createColumnHelper } from '@tanstack/react-table';
import { img_arrowdown, img_image_3, img_polygonlogofreelogovectorsnet_1 } from 'assets/images';
import { Button, Heading, Img, Input, ReactTable, SelectBox, Text } from 'components'
import AccreditedProfile from 'components/AccreditedProfile';
import { CloseSVG } from 'components/Input/close';
import UserProfile2 from 'components/UserProfile2';
import { CreateSTOModel, ListSTOModel } from 'features/securityTokens';
import { useCustomQuery } from 'hooks';
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedObjectForListSTO } from 'redux/securityTokens/listSTO';
import ROUTE_PATH from 'routes/ROUTE_PATH';
import { handleResponse } from 'services/apiConfig';
import { getImageFromPinata } from 'services/pinata';
import { getAllSTO, getCountryRQ, getFeaturedStoRQ, getIndustryRQ, getMyStoRQ, STOS_KEYS } from 'services/STO';
import { convertOptions } from 'utils';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

const issuersOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

function SecurityTokensPage() {
    const [searchBarValue10, setSearchBarValue10] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedIssuers, setSelectedIssuers] = useState("");
    const [createSTOModel, setCreateSTOModel] = useState(false);

    // List STO Model
    const [listSTOModel, setListSTOModel] = useState(false);

    const [tableData, setTableData] = useState([]);
    const [tableBData, setTableBData] = useState([]);

    // console.log("tableData", tableData)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

    const onResetFilters = () => {
        setSelectedIndustry("")
        setSelectedCountry("")
        setSelectedIssuers("")
    }

    const { data: myStoListData, isLoading: myStoListLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.MY_STOS, currentWalletAddress],
        queryFn: getMyStoRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    // console.log(myStoListData?.data)

    const { data: getFeaturedStoData, isLoading: getFeaturedStoLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.MY_STOS],
        queryFn: getFeaturedStoRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    const { data: getCountryData, isLoading: getCountryLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.GET_COUNTRY],
        queryFn: getCountryRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    const { data: getIndustryData, isLoading: getIndustryLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.GET_INDUSTRY],
        queryFn: getIndustryRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    // console.log(convertOptions(getCountryData?.data))
    const getAllSTOHander = () => {
        let apiData = {
            country: selectedCountry,
            industry: selectedIndustry
        }
        getAllSTO(apiData).then((res) => {
            // console.log('res', handleResponse(res))
            let result = handleResponse(res)
            setTableData(result?.data)
            setTableBData(result?.data)
        })
    }

    useEffect(() => {
        getAllSTOHander()
    }, [selectedIndustry, selectedCountry])

    useEffect(() => {
        if (searchBarValue10) {
            let filteredData = tableData.filter((d) => {
                return d.stoTokenName.toLowerCase().includes(searchBarValue10.toLowerCase())
            })
            setTableBData(filteredData)
        } else {
            setTableBData(tableData)
        }
    }, [searchBarValue10])

    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("stoTokenName", {
                cell: (info) => (
                    <div className="flex items-center gap-[0.75rem] px-[1.00rem]">
                        <Img
                            src={getImageFromPinata(info.row.original?.stoImage)}
                            alt="Image Eighteen"
                            className="h-[2.50rem] w-[2.50rem] rounded-[20px] object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = img_image_3;
                            }}
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
                        style={{ color: `var(--brand_color_1)` }}
                        className="pl-[1.00rem] text-left font-inter text-[0.75rem] font-normal"
                    >
                        Name
                    </Heading>
                ),
                meta: { width: "16.13rem" },
            }),
            tableColumnHelper.accessor("issuer", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal">
                        Issuer
                    </Heading>
                ),
                meta: { width: "13.63rem" },
            }),
            tableColumnHelper.accessor("country", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Country
                    </Heading>
                ),
                meta: { width: "17.25rem" },
            }),
            tableColumnHelper.accessor("industry", {
                cell: (info) => (
                    <Heading as="p" className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700">
                        {info.getValue()}
                    </Heading>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        Industry
                    </Heading>
                ),
                meta: { width: "11.25rem" },
            }),
            tableColumnHelper.accessor("networkHeader", {
                cell: (info) => (
                    <div className="flex flex-1 items-center justify-end gap-[1.25rem]">
                        {/* <div className="flex items-center gap-[0.63rem]">
                            <Img
                                src={info.row.original.imageNineteen}
                                alt="Image Nineteen"
                                className="h-[1.50rem] w-[1.50rem] rounded-[12px] object-cover"
                            />
                            <Heading
                                as="p"
                                className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-white-a700"
                            >
                                {info.getValue()}
                            </Heading>
                        </div> */}
                        <Button
                            style={{ padding: "0", height: "auto" }}
                            className={`mr-[3rem]`}
                            // info?.row?.id
                            onClick={() => navigate(`${ROUTE_PATH.SECTURITY_TOKENS}/${info.row.original?.rwaToken}`)}
                        >
                            <Heading
                                size="headings"
                                as="p"
                                style={{
                                    background: `linear-gradient(var(--gradient4))`,
                                    backgroundClip: `text`,
                                    color: `transparent`,
                                }}
                                className="bg-gradient bg-clip-text text-[0.75rem] font-bold uppercase tracking-[0.00rem] text-transparent"
                            >
                                Trade now
                            </Heading>
                        </Button>
                    </div>
                ),
                header: (info) => (
                    <Heading size="textxs" style={{ color: `var(--brand_color_1)` }} as="p" className="text-left font-inter text-[0.75rem] font-normal text-brand_color-1">
                        {/* Network */}
                    </Heading>
                ),
                meta: { width: "19.13rem" },
            }),
        ];
    }, []);

    return (
        <div className='mt-[3.75rem] self-stretch'>
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
                            <div className='w-full flex items-center justify-between'>
                                <Heading size="heading2xl" as="h3" className="text-[1.25rem] font-semibold text-white-a700">
                                    My Wrapped ERC20 Tokens
                                </Heading>
                                {currentWalletAddress ?
                                    <Button
                                        size='md'
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="self-stretch px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                                        onClick={() => setCreateSTOModel(true)}
                                    >
                                        Create WERC20
                                    </Button>
                                    :
                                    <Button
                                        size='md'
                                        shape="square"
                                        color="brand_color_0_green_800"
                                        className="self-stretch px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                                        onClick={() => openConnectModal()}
                                    >
                                        CONNECT WALLET
                                    </Button>
                                }
                            </div>
                            {myStoListData?.data?.length > 0 ?
                                <div className="self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[1.63rem] sm:p-[1.25rem]">
                                    <Text as="p" className="text-[1.00rem] fontsetSelectedIssuers-medium text-white-a700 mb-[0.88rem]">
                                        Accredited
                                    </Text>
                                    {/* <div className="flex gap-[1.50rem] md:flex-col"> */}
                                    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[1.50rem]">
                                        {!myStoListLoading ?
                                            <Suspense fallback={<div>Loading feed...</div>}>
                                                {/* {myStoListData?.data?.slice(0, 6)?.map((d, index) => ( */}
                                                {myStoListData?.data?.map((d, index) => (
                                                    <AccreditedProfile
                                                        ssolOneText={d?.stoTokenName}
                                                        seaSolarText={d?.stoTokenSymbol}
                                                        stoImage={d?.stoImage}
                                                        zeroText={formatUnits(d?.initialSupply, 18).toString()}
                                                        selectedObject={d}
                                                        onClickListToken={(e) => {
                                                            setListSTOModel(true)
                                                            dispatch(setSelectedObjectForListSTO(e))
                                                            console.log("selected token", e)
                                                        }}
                                                        key={"accreditedList1" + index}
                                                    />
                                                ))}
                                            </Suspense>
                                            :
                                            <div>Loading...</div>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="self-stretch border border-solid border-gray-900_02 bg-gray-900_01 p-[1.63rem] sm:p-[1.25rem]">
                                    <Text as="p" className="text-[1.30rem] text-center fontsetSelectedIssuers-medium text-white-a700">
                                        No results found
                                    </Text>
                                    {/* <div className="flex gap-[1.50rem] md:flex-col"> */}
                                </div>
                            }
                        </div>
                        {getFeaturedStoData?.data?.length > 0 ?
                            <div className="mt-[4.38rem] flex flex-col items-start gap-[1.25rem] self-stretch">
                                <Heading size="heading2xl" as="h4" className="text-[1.25rem] font-semibold text-white-a700">
                                    Featured
                                </Heading>
                                <div className="w-full grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[1.50rem]">
                                    <Suspense fallback={<div>Loading feed...</div>}>
                                        {getFeaturedStoData?.data?.map((d, index) => (
                                            <UserProfile2
                                                userHeading={d?.stoTokenName}
                                                userSubheading={d?.stoTokenSymbol}
                                                issuerName={d?.issuer}
                                                industryName={d?.industry}
                                                countryName={d?.country}
                                                stoImage={d?.stoImage}

                                                // {...d}
                                                key={"featuredList" + index}
                                                onTradeButtonClick={() => navigate(`${ROUTE_PATH.SECTURITY_TOKENS}/${d.rwaToken}`)}
                                            />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                            :
                            <div className="mt-[4.38rem] flex flex-col items-start gap-[1.25rem] self-stretch">
                                <Heading size="heading2xl" as="h4" className="text-[1.25rem] font-semibold text-white-a700">
                                    Featured
                                </Heading>
                                <div className="w-full flex justify-center">
                                    <Heading size="heading2xl" as="h4" className="text-[1.25rem] font-semibold text-white-a700">
                                        No results found
                                    </Heading>
                                </div>
                            </div>
                        }
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
                                        onChange={(e) =>
                                            setSearchBarValue10(e.target.value)
                                        }
                                        prefix={
                                            <Img src="images/img_search.svg" alt="Search" className="my-[0.13rem] h-[20px] w-[20px]" />
                                        }
                                        suffix={
                                            searchBarValue10?.length > 0 ? (
                                                <CloseSVG onClick={() => setSearchBarValue10("")} height={12} fillColor="#828282ff" className='cursor-pointer' />
                                            ) : null
                                        }
                                        className="flex-grow gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem]"
                                        inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0 text-white-a700`}
                                    />
                                    <div className="flex w-[40%] justify-center gap-[1.00rem] md:w-full sm:flex-col">
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                            }
                                            name="issuers_dropdown"
                                            placeholder={`Issuers`}
                                            value={selectedIssuers || ""}
                                            onChange={(e) => {
                                                setSelectedIssuers(e.value)
                                            }}
                                            options={issuersOptions}
                                            className="gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                        />
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                            }
                                            name="industry_dropdown"
                                            placeholder={`Country`}
                                            value={selectedCountry || ""}
                                            onChange={(e) => setSelectedCountry(e.value)}
                                            options={convertOptions(getCountryData?.data)}
                                            className="gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                        />
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                            }
                                            name="Industry Dropdown"
                                            value={selectedIndustry || ""}
                                            onChange={(e) => setSelectedIndustry(e.value)}
                                            placeholder={`Industry`}
                                            options={convertOptions(getIndustryData?.data)}
                                            className="gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                        />
                                        <Button
                                            size='md'
                                            shape="square"
                                            color="brand_color_0_green_800"
                                            className="self-stretch px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                                            onClick={() => onResetFilters()}
                                        >
                                            Reset filters
                                        </Button>
                                    </div>
                                </div>
                                <div className="ml-[1.13rem] md:ml-0">
                                    <ReactTable
                                        size="xs"
                                        bodyProps={{ className: "" }}
                                        className="md:block md:overflow-x-auto md:whitespace-nowrap w-full"
                                        columns={tableColumns}
                                        data={tableBData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {createSTOModel &&
                <CreateSTOModel
                    onClose={() => setCreateSTOModel(false)}
                />
            }
            {listSTOModel &&
                <ListSTOModel
                    onClose={() => setListSTOModel(false)}
                />
            }
        </div>
    )
}

export default SecurityTokensPage