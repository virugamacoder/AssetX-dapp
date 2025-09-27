import { useConnectModal } from '@rainbow-me/rainbowkit';
import { img_arrowdown, img_filter, img_search } from 'assets/images';
import { Button, Heading, Img, Input, SelectBox, Text } from 'components'
import { CloseSVG } from 'components/Input/close';
import UserProfile from 'components/UserProfile';
import { LAUNCHPAD_STAGES, STALE_TIME_FOR_API } from 'data/constant';
import { ListSTOModel } from 'features/securityTokens';
import { useCustomQuery } from 'hooks';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { setSelectedObjectForListSTO } from 'redux/securityTokens/listSTO';
import ROUTE_PATH from 'routes/ROUTE_PATH';
import { getAllSTOsRQ, getLaunchpadCountryRQ, getLaunchpadIndustryRQ, getLaunchpadStageRQ, LAUNCHPAD_KEYS } from 'services/launchpad';
import { getAllSTOsApiFunction } from 'services/launchpad/launchpadApiFunctions';
import { convertOptions } from 'utils';
import { useAccount } from 'wagmi';

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

function InvestmentsPage() {
    const [investmentLists, setInvestmentLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterInvestmentLists, setFilterInvestmentLists] = useState([]);
    const [searchBarValue1, setSearchBarValue1] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedStage, setSelectedStage] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [tabIndex, setTabIndex] = useState(0);

    // List STO Model
    const [listSTOModel, setListSTOModel] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

    const { data: getLaunchpadStageData, isLoading: getLaunchpadStageLoading } = useCustomQuery({
        queryKey: [LAUNCHPAD_KEYS.LAUNCHPAD_STAGE],
        queryFn: getLaunchpadStageRQ,
    });

    const { data: getLaunchpadIndustryData, isLoading: getLaunchpadIndustryLoading } = useCustomQuery({
        queryKey: [LAUNCHPAD_KEYS.LAUNCHPAD_INDUSTRY],
        queryFn: getLaunchpadIndustryRQ,
    });

    const { data: getLaunchpadCountryData, isLoading: getLaunchpadCountryLoading } = useCustomQuery({
        queryKey: [LAUNCHPAD_KEYS.LAUNCHPAD_COUNTRY],
        queryFn: getLaunchpadCountryRQ,
    });

    const fetchLaunchpadList = async () => {
        setIsLoading(true)
        try {
            let apiData = {
                country: selectedCountry,
                industry: selectedIndustry,
                stage: selectedStage
            };

            const launchpadList = await getAllSTOsApiFunction(apiData); // Assuming this returns a Promise
            setInvestmentLists(launchpadList?.data)
            setFilterInvestmentLists(launchpadList?.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error("Error fetching launchpad list:", error);
        }
    };

    useEffect(() => {
        fetchLaunchpadList();
    }, [selectedCountry, selectedIndustry, selectedStage])

    useEffect(() => {
        if (searchBarValue1) {
            const filteredData = investmentLists?.filter(sto =>
                sto?.details?.title?.toLowerCase().includes(searchBarValue1.toLowerCase()) // Filter based on title
            );
            setFilterInvestmentLists(filteredData)
        } else {
            setFilterInvestmentLists(investmentLists)
        }
    }, [searchBarValue1])

    return (
        <div className="mt-[3.75rem] self-stretch">
            <div className="flex flex-col items-start gap-[1.63rem]">
                <div className='flex items-center w-full justify-between'>
                    <Heading
                        size="heading7xl"
                        as="h1"
                        className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                    >
                        Investments
                    </Heading>
                    {currentWalletAddress ?
                        <Button
                            size='md'
                            shape="square"
                            color="brand_color_0_green_800"
                            className="px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                            onClick={() => setListSTOModel(true)}
                        >
                            List Token
                        </Button>
                        :
                        <Button
                            size='md'
                            shape="square"
                            color="brand_color_0_green_800"
                            className="px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                            onClick={() => openConnectModal()}
                        >
                            CONNECT WALLET
                        </Button>
                    }
                </div>
                <div className="w-full">

                    <Tabs className={`flex flex-col items-center self-stretch md:flex-col w-full`}
                        // selectedTabClassName="!text-brand_color-0"
                        selectedTabPanelClassName="mt-[2.13rem] !relative tab-panel--selected"
                        tabIndex={tabIndex}
                    >
                        <div className='flex w-full'>
                            <TabList className="flex w-[24%] self-end md:w-full md:self-auto">
                                <div className="flex w-full flex-col items-start">
                                    <div className="mx-[1.50rem] flex flex-wrap gap-[3.06rem] self-stretch md:mx-0">
                                        <Tab className={`text-[1.00rem] font-bold ${tabIndex === 0 ? 'text-gray-50' : 'text-brand_color-1'}`}
                                            onClick={() => setTabIndex(0)}
                                        >
                                            Issuance
                                        </Tab>
                                        <Tab className={`text-[1.00rem] font-normal ${tabIndex === 1 ? 'text-gray-50' : 'text-brand_color-1'}`}
                                            onClick={() => setTabIndex(1)}
                                        >
                                            LBP
                                        </Tab>
                                    </div>
                                    <div className='relative w-[64%]'>
                                        <div className="mt-[0.75rem] h-[0.06rem] bg-white-a700_1e" />
                                        {tabIndex === 0 ?
                                            <div className="h-[0.13rem] absolute w-[64%] bg-gradient" />
                                            :
                                            <div className="h-[0.13rem] absolute w-[36%] right-0 bg-gradient" />
                                        }
                                    </div>
                                </div>
                            </TabList>
                            <div className="flex flex-1 justify-end md:flex-col md:self-stretch">
                                <Input
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
                                    className="w-[42%] gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                                    inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0 text-white-a700`}
                                />
                                <SelectBox
                                    shape="square"
                                    indicator={
                                        <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                    }
                                    name="Industry Dropdown"
                                    value={selectedIndustry}
                                    onChange={(e) => setSelectedIndustry(e.value)}
                                    placeholder={`Industry`}
                                    options={convertOptions(getLaunchpadIndustryData?.data)}
                                    className="ml-[3.00rem] w-[12%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                />
                                <SelectBox
                                    shape="square"
                                    indicator={
                                        <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                    }
                                    name="Stage Dropdown"
                                    placeholder={`Stage`}
                                    value={selectedStage}
                                    onChange={(e) => setSelectedStage(e.value)}
                                    options={getLaunchpadStageData?.data}
                                    className="ml-[1.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                />
                                <SelectBox
                                    shape="square"
                                    indicator={
                                        <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                    }
                                    name="Country Dropdown"
                                    placeholder={`Country`}
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.value)}
                                    options={convertOptions(getLaunchpadCountryData?.data)}
                                    className="ml-[1.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                />
                                {/* <SelectBox
                                    shape="square"
                                    indicator={
                                        <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                    }
                                    name="Type Dropdown"
                                    placeholder={`Type`}
                                    options={dropDownOptions}
                                    className="ml-[3.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] !text-brand_color-1 md:ml-0 md:w-full"
                                /> */}
                                <Button
                                    size="md"
                                    variant="fill"
                                    shape="square"
                                    leftIcon={<Img src={img_filter} alt="Filter" className="h-[1.00rem] w-[1.00rem]" />}
                                    className="ml-[1.00rem] min-w-[5.38rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.81rem] font-bold capitalize tracking-[0.00rem] md:ml-0 cursor-not-allowed"
                                >
                                    Filter
                                </Button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <TabPanel key={`tab-panel-1`} className="items-center">
                                <div className="w-full">
                                    <div className="self-stretch">
                                        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.13rem]">

                                            {/* {!getAllSTOsLoading && filterInvestmentLists?.map((item, index) => { */}
                                            {!isLoading && filterInvestmentLists?.map((item, index) => {

                                                let stage = getLaunchpadStageData?.data?.filter(stageitem => item?.stage == stageitem?.value)[0]

                                                let dateTime = moment.unix(item?.startTime).format('YYYY-MM-DD HH:mm:ss')

                                                let durationText = LAUNCHPAD_STAGES.CLAIM === item?.stage ? "Successful" :
                                                    LAUNCHPAD_STAGES.WITHDRAW === item?.stage ? "Failed" :
                                                        LAUNCHPAD_STAGES.COMING_SOON === item?.stage ||
                                                            LAUNCHPAD_STAGES.PUBLIC_SALE === item?.stage ?
                                                            `${moment(dateTime).fromNow()} until the sale closes`
                                                            :
                                                            <>
                                                            </>

                                                return (
                                                    <UserProfile
                                                        key={`UserProfile-${index}`}
                                                        durationText={durationText}
                                                        publicSalesButton={stage?.label}
                                                        launchpadTitle={item?.details?.title}
                                                        stoImage={item?.details?.image}
                                                        othersTwoText={item?.details?.industry}
                                                        overview={item?.details?.overview}
                                                        className="w-full"
                                                        onInvestButtonClick={() => navigate(`${ROUTE_PATH.INVESTMENTS}/${item?.stoToken}`)}
                                                        stoObject={item}
                                                    />
                                                )
                                            })}

                                            {isLoading &&
                                                <>
                                                    <UserProfile
                                                        isLoading={true}
                                                    />
                                                    <UserProfile
                                                        isLoading={true}
                                                    />
                                                    <UserProfile
                                                        isLoading={true}
                                                    />
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel key={`tab-panel-2`} className="items-center">
                                <div className="w-full">
                                    <h4 className='text-white-a700'>teste esteste</h4>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>


                </div>
            </div>

            {listSTOModel &&
                <ListSTOModel
                    onClose={() => setListSTOModel(false)}
                    onSuccess={() => {
                        fetchLaunchpadList()
                    }}
                />
            }
        </div>
    )
}

export default InvestmentsPage
