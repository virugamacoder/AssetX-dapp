import { img_arrow_down_brand_color_1, img_close_md_svgrepo_com, img_image_1_40x36, img_image_34x34, img_image_5_40x40, img_vector_40x40 } from 'assets/images';
import { Button, Heading, Img, Input, ModelComponent, Text } from 'components'
import UserProfile6 from 'components/UserProfile6'
import React, { Suspense, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const whitelistUsersList = [
    { userImage: img_image_1_40x36, headingText: "Arb Whitelist Era", tokensCounter: "0 Tokens", isChecked: true },
    { userImage: img_image_5_40x40, headingText: "Compound", tokensCounter: "0 Tokens", isChecked: false },
    { userImage: img_image_34x34, headingText: "Gemini Token List", tokensCounter: "0 Tokens", isChecked: false },
    { userImage: img_vector_40x40, headingText: "Roll Social Money", tokensCounter: "0 Tokens", isChecked: false },
];

function ManageTokenList(props) {
    const [whitelistUsersListState, setWhitelistUsersListState] = useState(whitelistUsersList)

    const [searchText, setSearchText] = useState('')
    const [tabIndex, setTabIndex] = useState(0);

    const { onClose } = props

    return (
        <ModelComponent
            closeModal={() => onClose()}
        >
            <div className="min-w-[600px] flex w-full flex-col items-end gap-[5.13rem] self-end md:gap-[3.81rem] md:self-auto sm:gap-[2.56rem]">
                <div className="w-full border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-1 items-center gap-[1.25rem]">
                            <Button
                                style={{ padding: "0" }}
                                onClick={() => onClose()}
                            >
                                <Img
                                    src={img_arrow_down_brand_color_1}
                                    alt="Arrow Down Nine"
                                    className="h-[1.50rem] w-[1.50rem]"
                                />
                            </Button>
                            <Heading
                                size="heading4xl"
                                as="h4"
                                className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                            >
                                Manage tokens
                            </Heading>
                        </div>
                        <Button
                            style={{ padding: "0" }}
                            onClick={() => onClose()}
                        >
                            <Img
                                src={img_close_md_svgrepo_com}
                                alt="Close Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        </Button>
                    </div>
                    <Tabs className={`flex flex-col self-stretch md:flex-col w-full`}
                        // selectedTabClassName="!text-brand_color-0"
                        selectedTabPanelClassName="mt-[2.13rem] !relative tab-panel--selected"
                        tabIndex={tabIndex}
                    >
                        <TabList>
                            <div className="mt-[1.88rem] flex flex-col items-start">
                                <div className="mx-[1.50rem] flex flex-wrap gap-[3.06rem] self-stretch md:mx-0">
                                    <Tab
                                        className={`text-[1.00rem] font-bold ${tabIndex === 0 ? 'text-gray-50' : 'text-brand_color-1'}`}
                                        onClick={() => setTabIndex(0)}
                                    >
                                        Lists
                                    </Tab>
                                    <Tab
                                        className={`text-[1.00rem] font-normal ${tabIndex === 1 ? 'text-gray-50' : 'text-brand_color-1'}`}
                                        onClick={() => setTabIndex(1)}
                                    >
                                        Tokens
                                    </Tab>
                                </div>
                                <div className='relative w-[32%]'>
                                    <div className="mt-[0.75rem] h-[0.06rem] bg-white-a700_1e" />
                                    {tabIndex === 0 ?
                                        <div className="h-[0.13rem] absolute w-[50%] bg-gradient" />
                                        :
                                        <div className="h-[0.13rem] absolute w-[50%] right-0 bg-gradient" />
                                    }
                                </div>
                            </div>
                        </TabList>

                        <Input
                            color="gray_900"
                            size="xs"
                            shape="square"
                            type="text"
                            name="ENS Name Edit"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                            placeholder={`https:// or ipfs:// or ENS name`}
                            className="mt-[1.00rem] border px-[0.88rem] tracking-[0.00rem]"
                            inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0 text-white-a700`}
                        />

                        <TabPanel key={`tab-panel-1`} className="mt-[0] items-center">
                            <div className="mt-[1.25rem] flex flex-col gap-[0.63rem]">
                                <Suspense fallback={<div>Loading feed...</div>}>
                                    {whitelistUsersListState.map((d, index) => (
                                        <UserProfile6
                                            {...d}
                                            key={"listArb" + index}
                                            onClick={(e) => setWhitelistUsersListState(whitelistUsersListState.map((item, i) => i === index ? { ...item, isChecked: e } : item))}
                                        />
                                    ))}
                                </Suspense>
                            </div>
                        </TabPanel>
                        <TabPanel key={`tab-panel-2`} className="mt-[0] items-center">
                            <div className="mt-[1.25rem] flex flex-col gap-[0.63rem]">
                                <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[1rem] font-bold text-white-a700 md:text-[1.38rem]"
                                >
                                    Tokens
                                </Heading>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

            </div>
        </ModelComponent>
    )
}

export default ManageTokenList
