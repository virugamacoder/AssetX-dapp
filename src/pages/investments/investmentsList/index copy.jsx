import { img_arrowdown, img_filter, img_image_1, img_image_230x408, img_search } from 'assets/images';
import { Button, Heading, Img, Input, SelectBox, Text } from 'components'
import { CloseSVG } from 'components/Input/close';
import UserProfile from 'components/UserProfile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ROUTE_PATH from 'routes/ROUTE_PATH';

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

const industryOptions = [
    { label: "Technology", value: "Technology" },
    { label: "Finance", value: "Finance" },
    { label: "Blockchain", value: "Blockchain" },
    { label: "Real Estate", value: "Real Estate" },
    { label: "Gaming", value: "Gaming" },
    { label: "Energy", value: "Energy" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Others", value: "Others" },
];

function InvestmentsPage() {
    const [searchBarValue1, setSearchBarValue1] = useState("");

    const navigate = useNavigate();

    return (
        <div className="mt-[3.75rem] self-stretch">
            <div className="flex flex-col items-start gap-[1.63rem]">
                <Heading
                    size="heading7xl"
                    as="h1"
                    className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                >
                    Investments
                </Heading>
                <div className="flex items-center self-stretch md:flex-col">
                    <div className="flex w-[24%] self-end md:w-full md:self-auto">
                        <div className="flex w-full flex-col items-start">
                            <div className="mx-[1.50rem] flex flex-wrap gap-[3.06rem] self-stretch md:mx-0">
                                <Heading size="headinglg" as="h2" className="text-[1.00rem] font-bold text-gray-50">
                                    Issuance
                                </Heading>
                                <Text as="p" className="text-[1.00rem] font-normal text-brand_color-1">
                                    LBP
                                </Text>
                            </div>
                            <div className="mt-[0.75rem] h-[0.06rem] w-[64%] bg-white-a700_1e" />
                            <div className="h-[0.13rem] w-[40%] bg-gradient" />
                        </div>
                    </div>

                    <Tabs>
                        {/*  <TabList className="mt-[2.50rem] flex flex-wrap items-end justify-center gap-[2.25rem]">
                            <Tab className="mt-[1.38rem] text-[0.88rem] font-medium text-brand_color-1">Issuance</Tab>
                            <Tab className="text-[0.88rem] font-medium text-brand_color-1">LBP</Tab>
                        </TabList> */}

                        {/* <TabPanel key={`tab-panel-1`} className="absolute mt-[2.13rem] items-center">
                            <div className="w-full">
                                <h4 className='text-white-a700'>teste</h4>
                            </div>
                        </TabPanel> */}
                        {/*  <TabPanel key={`tab-panel-2`} className="absolute mt-[2.13rem] items-center">
                            <div className="w-full">
                                <h4 className='text-white-a700'>teste</h4>
                            </div>
                        </TabPanel> */}
                    </Tabs>

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
                            placeholder={`Industry`}
                            options={industryOptions}
                            className="ml-[3.00rem] w-[12%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                        />
                        <SelectBox
                            shape="square"
                            indicator={
                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                            }
                            name="Stage Dropdown"
                            placeholder={`Stage`}
                            options={dropDownOptions}
                            className="ml-[1.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                        />
                        <SelectBox
                            shape="square"
                            indicator={
                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                            }
                            name="Type Dropdown"
                            placeholder={`Type`}
                            options={dropDownOptions}
                            className="ml-[3.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] !text-brand_color-1 md:ml-0 md:w-full"
                        />
                        <Button
                            size="md"
                            variant="fill"
                            shape="square"
                            leftIcon={<Img src={img_filter} alt="Filter" className="h-[1.00rem] w-[1.00rem]" />}
                            className="ml-[1.00rem] min-w-[5.38rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.81rem] font-bold capitalize tracking-[0.00rem] md:ml-0"
                        >
                            Filter
                        </Button>
                    </div>
                </div>
                <div className="self-stretch">
                    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[2.13rem]">
                        <UserProfile
                            className="w-full"
                            onInvestButtonClick={() => navigate(`${ROUTE_PATH.INVESTMENTS}/1`)}
                        />
                        <UserProfile
                            className="w-full"
                            userImage={img_image_230x408}
                            publicSalesButton="Public Sales"
                            securityTokenImage={img_image_1}
                            onInvestButtonClick={() => navigate(`${ROUTE_PATH.INVESTMENTS}/1`)}
                        />
                        <UserProfile
                            className="w-full"
                            onInvestButtonClick={() => console.log(`${ROUTE_PATH.INVESTMENTS}/1`)}
                            isClosed={true}
                            investButton={`Learn More`}
                            durationText={`Successful`}
                        />
                        <UserProfile
                            className="w-full"
                            userImage={img_image_230x408}
                            publicSalesButton="Public Sales"
                            securityTokenImage={img_image_1}
                            onInvestButtonClick={() => navigate(`${ROUTE_PATH.INVESTMENTS}/1`)}
                        />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default InvestmentsPage
