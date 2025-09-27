import { Helmet } from "react-helmet";
import { Button, Input, Text, Heading, Img, CheckBox, SelectBox } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { CloseSVG } from "../../components/Input/close.jsx";
import UserProfile from "../../components/UserProfile";
import UserProfile1 from "../../components/UserProfile1";
import UserRegistration from "../../components/UserRegistration";
import SecurityTokensSection from "./SecurityTokensSection";
import React, { Suspense } from "react";
import {
    AccordionItemPanel,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemState,
    Accordion,
    AccordionItem,
} from "react-accessible-accordion";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

const registrationTimelineList = [
    { registrationText: "Register To Invest", eventDate: "23rd Jul, 9:00 - 30th Jul, 8:30" },
    { registrationText: "Pre-Sale", eventDate: "30th Jul, 8:30 - 6th Aug, 8:30" },
    { registrationText: "Public Sale", eventDate: "6th Aug, 8:30 - 23rd Jan, 8:30" },
];
const accordionData = [
    {
        faqHeaderText: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
        faqHeaderText: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
        faqHeaderText: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
        faqHeaderText: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
];
const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

export default function ComponentsPage() {
    const [searchBarValue1, setSearchBarValue1] = React.useState("");

    return (
        <>
            <Helmet>
                <title>Token Launchpad - Explore Wrapped ERC20 Tokens & Investments</title>
                <meta
                    name="description"
                    content="Discover the Token Launchpad for Wrapped ERC20 tokens, liquidity swaps, and investment opportunities. Invest in public sales, learn about token issuance, and manage your investments on Polygon."
                />
            </Helmet>
            <div className="flex w-full flex-col items-center gap-[11.13rem] bg-black-900 md:gap-[8.31rem] sm:gap-[5.56rem]">
                <div className="container-xs md:px-[1.25rem]">
                    <div className="flex flex-col items-start">
                        <Header />
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
                                                    src="images/img_search.svg"
                                                    alt="Search"
                                                    className="my-[0.13rem] h-[0.75rem] w-[1.25rem]"
                                                />
                                            }
                                            suffix={
                                                searchBarValue1?.length > 0 ? (
                                                    <CloseSVG onClick={() => setSearchBarValue1("")} height={12} fillColor="#828282ff" />
                                                ) : null
                                            }
                                            className="w-[42%] gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                                        />
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                            }
                                            name="Industry Dropdown"
                                            placeholder={`Industry`}
                                            options={dropDownOptions}
                                            className="ml-[3.00rem] w-[12%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                        />
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                                            }
                                            name="Stage Dropdown"
                                            placeholder={`Stage`}
                                            options={dropDownOptions}
                                            className="ml-[1.00rem] w-[10%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                                        />
                                        <SelectBox
                                            shape="square"
                                            indicator={
                                                <Img src="images/img_arrowdown.svg" alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
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
                                            leftIcon={<Img src="images/img_filter.svg" alt="Filter" className="h-[1.00rem] w-[1.00rem]" />}
                                            className="ml-[1.00rem] min-w-[5.38rem] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.81rem] font-bold capitalize tracking-[0.00rem] md:ml-0"
                                        >
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                                <div className="self-stretch">
                                    <div className="mr-[26.50rem] flex gap-[2.13rem] md:mr-0 md:flex-col">
                                        <UserProfile />
                                        <UserProfile
                                            userImage="images/img_image_230x408.png"
                                            publicSalesButton="Public Sales"
                                            securityTokenImage="images/img_image_1.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[8.50rem] flex flex-col gap-[1.25rem] self-stretch">
                            <div className="flex items-center md:flex-col">
                                <div className="flex w-[34%] items-center justify-center md:w-full">
                                    <Img
                                        src="images/img_arrow_down_brand_color_1.svg"
                                        alt="Arrow Down Image"
                                        className="h-[1.50rem] w-[1.50rem]"
                                    />
                                    <div className="flex flex-1 items-center gap-[1.25rem] px-[1.88rem] sm:px-[1.25rem]">
                                        <Img
                                            src="images/img_image_2.png"
                                            alt="Trsr-drc-1 Image"
                                            className="h-[3.75rem] w-[3.75rem] object-cover"
                                        />
                                        <Heading
                                            size="heading5xl"
                                            as="h3"
                                            className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                        >
                                            TRSR-DRC-1
                                        </Heading>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-[1.00rem] pl-[7.00rem] pr-[3.50rem] md:self-stretch md:px-[1.25rem]">
                                    <Img src="images/img_globe.svg" alt="Globe Icon" className="h-[2.00rem] w-[2.00rem]" />
                                    <Img src="images/img_music.svg" alt="Music Icon" className="h-[2.00rem] w-[2.00rem]" />
                                    <Img src="images/img_group_30.svg" alt="Group Icon" className="h-[2.00rem] w-[2.00rem]" />
                                    <Button
                                        size="sm"
                                        variant="fill"
                                        shape="square"
                                        className="w-[2.00rem] border border-solid border-gray-900_02 px-[0.50rem]"
                                    >
                                        <Img src="images/img_warning.svg" />
                                    </Button>
                                    <Img src="images/img_info.svg" alt="Info Icon" className="h-[2.00rem] w-[2.00rem]" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[1.25rem]">
                                <Text as="p" className="font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1">
                                    <>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        <br />
                                        industry&#39;s standard dummy text ever since the 1500s,
                                    </>
                                </Text>
                                <div className="flex items-center">
                                    <Img
                                        src="images/img_secure_svgrepo_com.png"
                                        alt="Security Image"
                                        className="h-[1.25rem] w-[1.25rem] object-cover"
                                    />
                                    <div className="ml-[0.50rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                    <Heading
                                        as="h4"
                                        className="ml-[0.50rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Security token
                                    </Heading>
                                    <div className="ml-[0.50rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                    <Heading
                                        as="h5"
                                        className="ml-[1.00rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                    >
                                        Others
                                    </Heading>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[2.38rem] self-stretch">
                            <div className="flex items-start gap-[2.50rem] md:flex-col">
                                <div className="flex flex-1 flex-col gap-[1.25rem] md:self-stretch">
                                    <Img src="images/img_image_438x780.png" alt="Overview Image" className="h-[27.38rem] object-cover" />
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
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                                the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a
                                                galley of type and scrambled it to make a type specimen book.
                                            </Text>
                                            <Text
                                                as="p"
                                                className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                            >
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                                the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a
                                                galley of type and scrambled it to make a type specimen book.
                                            </Text>
                                            <Text
                                                as="p"
                                                className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                            >
                                                It is a long established fact that a reader will be distracted by the readable content of a page
                                                when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                                                distribution of letters, as opposed to using &#39;Content here, content here&#39;, making it
                                                look like readable English.
                                            </Text>
                                            <Text
                                                as="p"
                                                className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                            >
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                                                classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                                                Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
                                                words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                                                classical literature, discovered the.
                                            </Text>
                                        </div>
                                        <div className="flex flex-col gap-[1.25rem]">
                                            <div className="flex flex-col items-start gap-[1.00rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                                <Heading
                                                    size="heading5xl"
                                                    as="h3"
                                                    className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                                >
                                                    Team Members
                                                </Heading>
                                                <div className="self-stretch border border-solid border-gray-900_02 bg-gray-900 p-[1.13rem]">
                                                    <div className="flex flex-col items-start gap-[1.25rem]">
                                                        <div className="flex items-center gap-[1.00rem] self-stretch">
                                                            <Img
                                                                src="images/img_image_48x48.png"
                                                                alt="Albert Pinkney Image"
                                                                className="h-[3.00rem] w-[3.00rem] rounded-[24px] object-cover"
                                                            />
                                                            <div className="flex flex-1 flex-col items-start self-end">
                                                                <Heading
                                                                    size="headinglg"
                                                                    as="h6"
                                                                    className="text-[1.00rem] font-semibold text-white-a700"
                                                                >
                                                                    Albert Pinkney
                                                                </Heading>
                                                                <Heading
                                                                    size="textxs"
                                                                    as="p"
                                                                    className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                                >
                                                                    CEO and Founder of Socialerus
                                                                </Heading>
                                                            </div>
                                                        </div>
                                                        <Heading
                                                            as="p"
                                                            className="w-full font-inter text-[0.88rem] font-normal leading-[1.25rem] text-brand_color-1"
                                                        >
                                                            It is a long established fact that a reader will be distracted by the readable content of
                                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                            more-or-less.
                                                        </Heading>
                                                        <Heading
                                                            as="p"
                                                            className="bg-gradient bg-clip-text font-inter text-[0.88rem] font-normal text-transparent"
                                                        >
                                                            https://www.linkedin.com/in/socialerus
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-[2.13rem] border border-solid border-gray-900_02 bg-gray-900_01 px-[1.88rem] py-[0.88rem] sm:px-[1.25rem]">
                                                <Heading
                                                    size="heading5xl"
                                                    as="h3"
                                                    className="mt-[0.88rem] text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                                >
                                                    Frequentry Asked Questions
                                                </Heading>
                                                <Accordion preExpanded={[0]} className="flex flex-col gap-[2.13rem] self-stretch">
                                                    {accordionData.map((d, i) => (
                                                        <AccordionItem uuid={i} key={`FAQ Expandable List${i}`}>
                                                            <div className="flex flex-1 flex-col gap-[0.88rem]">
                                                                <AccordionItemHeading className="w-full">
                                                                    <AccordionItemButton>
                                                                        <AccordionItemState>
                                                                            {(props) => (
                                                                                <>
                                                                                    <div className="flex flex-wrap items-start justify-between gap-[1.25rem] sm:flex-col">
                                                                                        <Heading
                                                                                            size="headingmd"
                                                                                            as="p"
                                                                                            className="self-center text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                                                        >
                                                                                            {d.faqHeaderText}
                                                                                        </Heading>
                                                                                        {props?.expanded ? (
                                                                                            <Img
                                                                                                src="images/img_arrow_up.svg"
                                                                                                alt="Faq Header Icon"
                                                                                                className="mt-[0.25rem] h-[0.38rem] sm:w-full"
                                                                                            />
                                                                                        ) : (
                                                                                            <Img
                                                                                                src="images/img_checkmark.svg"
                                                                                                alt="Faq Collapse Icon"
                                                                                                className="mt-[0.25rem] h-[0.38rem] sm:w-full"
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </AccordionItemState>
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <div>
                                                                        <Heading
                                                                            as="p"
                                                                            className="font-inter text-[0.88rem] font-normal leading-[1.25rem] text-brand_color-1"
                                                                        >
                                                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                                                                            a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                                                            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                                                                            looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                                                                            passage, and going through the cites of the word in classical literature,
                                                                            discovered the.
                                                                        </Heading>
                                                                    </div>
                                                                </AccordionItemPanel>
                                                            </div>
                                                            <div className="h-[0.06rem] w-full rotate-[0deg] bg-white-a700_1e" />
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[36%] flex-col gap-[1.25rem] self-center md:w-full">
                                    <div className="flex flex-col gap-[1.88rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                        <div className="flex items-center justify-center sm:flex-col">
                                            <Heading
                                                size="heading7xl"
                                                as="h1"
                                                className="bg-gradient bg-clip-text text-[2.50rem] font-bold text-transparent md:text-[2.38rem] sm:text-[2.25rem]"
                                            >
                                                USDT 620
                                            </Heading>
                                            <div className="flex w-[46%] flex-wrap items-center justify-end gap-[0.75rem] sm:w-full">
                                                <Heading
                                                    className="raisedpercentage_border flex h-[2.00rem] w-[2.00rem] items-center justify-center rounded-[16px] bg-gray-900_01 text-center text-[0.63rem] font-bold capitalize text-white-a700"
                                                    size="headingxs"
                                                    as="p"
                                                >
                                                    0%
                                                </Heading>
                                                <Heading
                                                    as="p"
                                                    className="font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                                >
                                                    Raised
                                                </Heading>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-[0.38rem]">
                                            <div className="mx-[6.25rem] flex items-center gap-[0.38rem] self-stretch md:mx-0">
                                                <Heading
                                                    size="textxs"
                                                    as="p"
                                                    className="font-inter text-[0.75rem] font-normal text-brand_color-1"
                                                >
                                                    Soft Cap
                                                </Heading>
                                                <Img
                                                    src="images/img_info_circle_svgrepo_com.svg"
                                                    alt="Soft Cap Icon"
                                                    className="h-[0.75rem] w-[0.75rem] self-end"
                                                />
                                            </div>
                                            <Img
                                                src="images/img_vector.png"
                                                alt="Soft Cap Vector"
                                                className="ml-[7.88rem] h-[0.50rem] object-cover md:ml-0"
                                            />
                                            <div className="flex self-stretch bg-gray-900_04">
                                                <div className="h-[1.00rem] w-[0.13rem] bg-gradient" />
                                            </div>
                                            <Img
                                                src="images/img_vector_8x14.png"
                                                alt="Pre-sale Goal Vector"
                                                className="ml-[7.88rem] h-[0.50rem] object-cover md:ml-0"
                                            />
                                            <div className="mx-[5.38rem] flex items-center gap-[0.38rem] self-stretch md:mx-0">
                                                <Heading
                                                    size="textxs"
                                                    as="p"
                                                    className="font-inter text-[0.75rem] font-normal text-brand_color-1"
                                                >
                                                    Pre-Sale Goal
                                                </Heading>
                                                <Img
                                                    src="images/img_info_circle_svgrepo_com.svg"
                                                    alt="Pre-sale Goal Icon"
                                                    className="h-[0.75rem] w-[0.75rem] self-end"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col gap-[1.75rem]">
                                                <div className="h-[0.06rem] bg-white-a700_1e" />
                                                <div className="flex justify-center">
                                                    <div className="flex flex-1 flex-col items-start gap-[0.50rem]">
                                                        <div className="flex items-center gap-[0.44rem] self-stretch">
                                                            <Heading as="p" className="font-inter text-[0.88rem] font-normal text-brand_color-1">
                                                                Participants
                                                            </Heading>
                                                            <Img
                                                                src="images/img_info_circle_svgrepo_com.svg"
                                                                alt="Participants Icon"
                                                                className="h-[0.75rem] w-[0.75rem] self-end"
                                                            />
                                                        </div>
                                                        <Heading
                                                            size="heading4xl"
                                                            as="h4"
                                                            className="bg-gradient bg-clip-text text-[1.50rem] font-bold text-transparent md:text-[1.38rem]"
                                                        >
                                                            7
                                                        </Heading>
                                                    </div>
                                                    <div className="flex flex-col items-start gap-[0.50rem]">
                                                        <Heading as="p" className="font-inter text-[0.88rem] font-normal text-brand_color-1">
                                                            The deal closes in
                                                        </Heading>
                                                        <Heading
                                                            size="heading4xl"
                                                            as="h4"
                                                            className="bg-gradient bg-clip-text text-[1.50rem] font-bold text-transparent md:text-[1.38rem]"
                                                        >
                                                            90 days
                                                        </Heading>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            shape="square"
                                            color="brand_color_0_green_800"
                                            className="self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                        >
                                            Invest
                                        </Button>
                                        <div className="flex flex-col gap-[1.00rem]">
                                            <div className="flex gap-[1.00rem] sm:flex-col">
                                                <div className="flex w-full flex-wrap justify-center gap-[0.25rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                                    <Heading
                                                        size="textxs"
                                                        as="p"
                                                        className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
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
                                                        src="images/img_copy_svgrepo_com.png"
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
                                                                src="images/img_metamaskfox_1_gray_900_02.svg"
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
                                                    >
                                                        Issuer
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        Socialerus
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Country
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        MH
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Investment Type
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        Equity
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Token Price
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 1/1 SCR-1
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-center gap-[0.75rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Max. Investment Size
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 500,000/500,000 SCR-1
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Min. Investment Size
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 1/1 SCR-1
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
                                                    >
                                                        Soft Cap
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 200,000
                                                    </Heading>
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Hard Cap
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 500,000
                                                    </Heading>
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
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
                                                </div>
                                                <div className="flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Allocation for Public-Sale
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        USDT 300,000
                                                    </Heading>
                                                </div>
                                            </div>
                                            <div className="mt-[1.38rem] self-stretch">
                                                <div className="flex flex-col gap-[0.88rem]">
                                                    <div className="flex flex-col gap-[1.75rem]">
                                                        <div className="h-[0.06rem] bg-white-a700_1e" />
                                                        <div className="flex items-center gap-[0.50rem]">
                                                            <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                                                Pre-Sale
                                                            </Heading>
                                                            <Img
                                                                src="images/img_info_circle_svgrepo_com.svg"
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
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[0.88rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.63rem] sm:p-[1.25rem]">
                                            <div className="flex items-center gap-[0.50rem]">
                                                <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                                    Investment Stage
                                                </Heading>
                                                <Img
                                                    src="images/img_info_circle_svgrepo_com.svg"
                                                    alt="Investment Stage Icon"
                                                    className="h-[1.00rem] w-[1.00rem] self-end"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-[0.88rem]">
                                                <div className="flex flex-col gap-[0.88rem]">
                                                    <Suspense fallback={<div>Loading feed...</div>}>
                                                        {registrationTimelineList.map((d, index) => (
                                                            <UserRegistration {...d} key={"registerList" + index} />
                                                        ))}
                                                    </Suspense>
                                                </div>
                                                <div className="flex justify-between gap-[1.25rem]">
                                                    <div className="flex items-center gap-[0.38rem]">
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Closed
                                                        </Heading>
                                                        <Img
                                                            src="images/img_info_circle_svgrepo_com.svg"
                                                            alt="Closed Stage Icon"
                                                            className="h-[0.75rem] w-[0.75rem] self-end"
                                                        />
                                                    </div>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        23rd Jan, 8:30 - 23rd Jan, 8:30
                                                    </Heading>
                                                </div>
                                                <div className="flex justify-center">
                                                    <div className="flex flex-1 items-center gap-[0.38rem]">
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Token Claim
                                                        </Heading>
                                                        <Img
                                                            src="images/img_info_circle_svgrepo_com.svg"
                                                            alt="Token Claim Icon"
                                                            className="h-[0.75rem] w-[0.75rem] self-end"
                                                        />
                                                    </div>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        23rd Jan, 8:30
                                                    </Heading>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-[0.88rem] border border-solid border-gray-900_02 bg-gray-900_01 px-[1.88rem] py-[1.50rem] sm:p-[1.25rem]">
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
                                                    src="images/img_mail_svgrepo_com.png"
                                                    alt="Email Icon"
                                                    className="h-[1.25rem] w-[1.25rem] object-cover"
                                                />
                                                <Heading
                                                    as="p"
                                                    className="text-[0.88rem] font-normal capitalize tracking-[0.00rem] text-brand_color-1"
                                                >
                                                    Socialerus_k-youtube...
                                                </Heading>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tabs
                            className="mt-[7.00rem] w-[46%] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]"
                            selectedTabClassName="!text-brand_color-0"
                            selectedTabPanelClassName="mt-[2.13rem] !relative tab-panel--selected"
                        >
                            <div className="flex items-center justify-between gap-[1.25rem]">
                                <Heading size="heading4xl" as="h4" className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]">
                                    Dashboard
                                </Heading>
                                <Img src="images/img_close_md_svgrepo_com.svg" alt="Close Icon" className="h-[1.50rem] w-[1.50rem]" />
                            </div>
                            <TabList className="mt-[2.50rem] flex flex-wrap items-end justify-center gap-[2.25rem]">
                                <Tab className="mt-[1.38rem] text-[0.88rem] font-medium text-brand_color-1">Register To Invest</Tab>
                                <Tab className="text-[0.88rem] font-medium text-brand_color-1">Pre-Sale</Tab>
                                <Tab className="text-[0.88rem] font-medium text-brand_color-1">Public-Sale</Tab>
                                <Tab className="text-[0.88rem] font-medium text-brand_color-1">Closed</Tab>
                                <Tab className="text-[0.88rem] font-medium text-brand_color-1">Token Claim</Tab>
                            </TabList>
                            {[...Array(5)].map((_, index) => (
                                <TabPanel key={`tab-panel${index}`} className="absolute mt-[2.13rem] items-center">
                                    <div className="w-full">
                                        <div>
                                            <div>
                                                <div>
                                                    <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900 px-[0.75rem] py-[0.63rem]">
                                                        <Img src="images/img_search.svg" alt="Search Icon" className="h-[1.25rem] w-[1.25rem]" />
                                                        <Heading
                                                            size="textxs"
                                                            as="p"
                                                            className="text-[0.75rem] font-medium tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Search..
                                                        </Heading>
                                                    </div>
                                                    <div className="mt-[1.00rem] flex gap-[0.88rem] sm:flex-col">
                                                        <div className="flex w-full flex-wrap justify-center gap-[0.25rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.38rem] sm:w-full">
                                                            <Heading
                                                                size="textxs"
                                                                as="p"
                                                                className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
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
                                                                    src="images/img_metamask_fox_1.svg"
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
                                                                    src="images/img_copysvgrepocom_1.png"
                                                                    alt="Copy-svgrepo-com 1"
                                                                    className="h-[1.00rem] w-[1.00rem] object-cover"
                                                                />
                                                            }
                                                            className="w-full gap-[0.50rem] border border-solid border-gray-900_02 px-[0.69rem] font-bold capitalize tracking-[0.00rem] !text-white-a700"
                                                        >
                                                            0x5D57C...66c7c
                                                        </Button>
                                                    </div>
                                                    <div className="mt-[1.88rem] flex items-center gap-[0.56rem]">
                                                        <Heading size="headingxl" as="h6" className="text-[1.13rem] font-bold text-white-a700">
                                                            Public Sale Conditions
                                                        </Heading>
                                                        <Img
                                                            src="images/img_info_circle_svgrepo_com.svg"
                                                            alt="Public Sale Conditions Icon"
                                                            className="h-[1.00rem] w-[1.00rem]"
                                                        />
                                                    </div>
                                                    <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Min. Investment Size
                                                        </Heading>
                                                        <Heading
                                                            size="headingmd"
                                                            as="p"
                                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                        >
                                                            1.00 USDT
                                                        </Heading>
                                                    </div>
                                                    <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Max. Investment Size
                                                        </Heading>
                                                        <Heading
                                                            size="headingmd"
                                                            as="p"
                                                            className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                        >
                                                            500,000.00 USDT
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
                                                        src="images/img_info_circle_svgrepo_com.svg"
                                                        alt="My Investment Allowance Icon"
                                                        className="h-[1.00rem] w-[1.00rem]"
                                                    />
                                                </div>
                                                <div className="mt-[0.88rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Available to invest
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        499,380.00 USDT
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                    >
                                                        Already invested
                                                    </Heading>
                                                    <Heading
                                                        size="headingmd"
                                                        as="p"
                                                        className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                                                    >
                                                        0.00 USDT
                                                    </Heading>
                                                </div>
                                                <div className="mt-[0.75rem] flex justify-center">
                                                    <div className="flex flex-1 items-center gap-[0.50rem]">
                                                        <Heading
                                                            as="p"
                                                            className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                                                        >
                                                            Last investment transaction status
                                                        </Heading>
                                                        <Img
                                                            src="images/img_info_circle_svgrepo_com.svg"
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
                                                </div>
                                                <div className="relative mt-[1.50rem] h-[10.63rem] content-center md:h-auto">
                                                    <div className="mx-auto flex flex-1 flex-col gap-[0.63rem]">
                                                        <div className="flex items-center justify-between gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900 px-[1.25rem] py-[0.88rem]">
                                                            <Heading
                                                                size="heading6xl"
                                                                as="h2"
                                                                className="self-end text-[2.00rem] font-bold text-gray-50 md:text-[1.88rem] sm:text-[1.75rem]"
                                                            >
                                                                10
                                                            </Heading>
                                                            <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
                                                                <Img
                                                                    src="images/img_vector_20x20.png"
                                                                    alt="Investment Vector Icon"
                                                                    className="h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                                                                />
                                                                <Heading as="p" className="self-end text-[0.88rem] font-medium text-brand_color-1">
                                                                    USDT
                                                                </Heading>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-[1.25rem] border border-solid border-gray-900_02 bg-gray-900 px-[1.25rem] py-[0.88rem]">
                                                            <Heading
                                                                size="heading6xl"
                                                                as="h2"
                                                                className="self-end text-[2.00rem] font-bold text-gray-50 md:text-[1.88rem] sm:text-[1.75rem]"
                                                            >
                                                                2
                                                            </Heading>
                                                            <div className="flex items-center gap-[0.50rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
                                                                <Img
                                                                    src="images/img_vector_20x20.png"
                                                                    alt="Investment Vector Icon Two"
                                                                    className="h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                                                                />
                                                                <Heading as="p" className="self-end text-[0.88rem] font-medium text-brand_color-1">
                                                                    SCR-1
                                                                </Heading>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Img
                                                        src="images/img_light_bulb.svg"
                                                        alt="Lightbulb Icon"
                                                        className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[3.00rem] w-[3.00rem]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-[1.13rem] flex flex-wrap items-center">
                                                <Text as="p" className="text-[1.00rem] font-medium text-brand_color-1">
                                                    Balance:
                                                </Text>
                                                <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                                    0 USDT
                                                </Heading>
                                                <Img
                                                    src="images/img_vector_20x20.png"
                                                    alt="Balance Vector"
                                                    className="ml-[0.50rem] h-[1.25rem] w-[1.25rem] rounded-[10px] object-cover"
                                                />
                                            </div>
                                            <div className="mt-[1.63rem] flex flex-col items-start gap-[1.25rem]">
                                                <CheckBox
                                                    name="Purchase Agreement Checkbox"
                                                    label="I have read, fully understand and agree to be bound by the
Purchase Agreement in respect of this token sale."
                                                    id="PurchaseAgreementCheckbox"
                                                    className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                                                />
                                                <CheckBox
                                                    name="Investment Memorandum Checkbox"
                                                    label="I have read, fully understand and agree to be bound by the
Investment Memorandum in respect of this token sale."
                                                    id="InvestmentMemorandumCheckbox"
                                                    className="gap-[0.75rem] text-left text-[1.00rem] font-medium leading-[1.31rem] text-brand_color-1"
                                                />
                                            </div>
                                            <Button
                                                shape="square"
                                                color="brand_color_0_green_800"
                                                className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                            >
                                                Invest
                                            </Button>
                                        </div>
                                    </div>
                                </TabPanel>
                            ))}
                            <div className="text_cyan_A100_border mt-[1.25rem] flex items-center justify-center gap-[1.00rem] border border-solid bg-gradient2 p-[1.13rem] sm:flex-col">
                                <Img
                                    src="images/img_calendar_svgrepo_com.png"
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
                        </Tabs>
                    </div>
                </div>
                <div className="flex flex-col gap-[11.38rem] self-stretch md:gap-[8.50rem] sm:gap-[5.69rem]">
                    {/* security tokens section */}
                    <SecurityTokensSection />
                    <div className="h-[35.25rem] bg-[url(/public/images/img_group_947.png)] bg-cover bg-no-repeat md:h-auto">
                        <div className="mb-[2.50rem] flex flex-col items-center gap-[1.38rem]">
                            <div className="h-[6.13rem] self-stretch bg-gradient3" />
                            <div className="container-xs md:px-[1.25rem]">
                                <div className="flex flex-col items-center gap-[11.50rem] md:gap-[8.63rem] sm:gap-[5.75rem]">
                                    <div className="flex w-[42%] flex-col items-center gap-[2.13rem] md:w-full">
                                        <Heading
                                            size="heading7xl"
                                            as="h2"
                                            className="text-[2.50rem] font-bold capitalize text-white-a700 md:text-[2.38rem] sm:text-[2.25rem]"
                                        >
                                            Subscribe for Updates
                                        </Heading>
                                        <Text size="textxl" as="p" className="font-inter text-[1.25rem] font-light text-white-a700_99">
                                            Get the latest Dexreal news, all spam-free.
                                        </Text>
                                        <div className="flex justify-center gap-[1.00rem] self-stretch sm:flex-col">
                                            <Input
                                                color="gray_900_7a"
                                                shape="square"
                                                type="email"
                                                name="Email Input"
                                                placeholder={`Enter email address`}
                                                className="flex-grow border px-[1.50rem] capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                            />
                                            <Button
                                                shape="square"
                                                color="brand_color_0_green_800"
                                                className="min-w-[8.75rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
