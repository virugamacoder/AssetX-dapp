import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { Button, Heading, Input, Text } from 'components'

function RootLayout({ children }) {
    return (
        <div className="flex w-full flex-col min-h-screen bg-black-900">
            {/* Header */}
            <Header />
            
            {/* Main Content Area - Full Width */}
            <main className="flex-1 w-full">
                <Outlet context={children} />
            </main>
            
            {/* Newsletter Section - Full Width */}
            <section className="w-full bg-[url(/images/img_group_947.png)] bg-cover bg-no-repeat py-[4rem]">
                <div className="w-full max-w-6xl mx-auto px-4">
                    <div className="flex flex-col items-center gap-[2rem] text-center">
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
                        <div className="flex justify-center gap-[1.00rem] w-full max-w-lg sm:flex-col">
                            <Input
                                color="gray_900_7a"
                                shape="square"
                                type="email"
                                name="Email Input"
                                placeholder="Enter email address"
                                className="flex-grow border px-[1.50rem] capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                inputClassNames="bg-transparent border-none text-[14px] focus:ring-0"
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
                </div>
            </section>
            
            {/* Footer - Full Width */}
            <Footer />
        </div>
    )
}

export default RootLayout
