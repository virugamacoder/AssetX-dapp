import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { Button, Heading, Input, Text } from 'components'
import SecurityTokensSection from 'pages/Components/SecurityTokensSection'


function RootLayout({ children }) {
    return (
        <div className="flex w-full flex-col items-center px-[24px] gap-[5.56rem] bg-black-900 md:gap-[5.56rem] sm:gap-[5.56rem]">
            <div className="container-xs md:px-[1.25rem]">
                <div className="flex flex-col items-start">
                    <Header />
                    <Outlet context={children} />
                </div>
            </div>
            <div className="flex flex-col gap-[11.38rem] self-stretch md:gap-[8.50rem] sm:gap-[5.69rem]">
                {/* security tokens section */}
                {/* <SecurityTokensSection /> */}
                <div className="h-[35.25rem] bg-[url(/images/img_group_947.png)] bg-cover bg-no-repeat md:h-auto">
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
                                        Get the latest AssetX news, all spam-free.
                                    </Text>
                                    <div className="flex justify-center gap-[1.00rem] self-stretch sm:flex-col">
                                        <Input
                                            color="gray_900_7a"
                                            shape="square"
                                            type="email"
                                            name="Email Input"
                                            placeholder={`Enter email address`}
                                            className="flex-grow border px-[1.50rem] capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                            inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0`}
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
    )
}

export default RootLayout
