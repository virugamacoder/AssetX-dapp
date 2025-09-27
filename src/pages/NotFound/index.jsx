import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text } from 'components';
import ROUTE_PATH from 'routes/ROUTE_PATH';

function NotFoundPage() {
    return (
        <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-[2rem] px-[1.5rem] text-center">
            {/* 404 Number */}
            <div className="relative">
                <Heading
                    size="heading8xl"
                    as="h1"
                    className="text-[8rem] font-bold text-brand_color-0 opacity-20 md:text-[6rem] sm:text-[4rem]"
                >
                    404
                </Heading>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Heading
                        size="heading6xl"
                        as="h2"
                        className="text-[3rem] font-bold text-white-a700 md:text-[2.5rem] sm:text-[2rem]"
                    >
                        404
                    </Heading>
                </div>
            </div>

            {/* Main Message */}
            <div className="flex flex-col gap-[1rem] max-w-[600px]">
                <Heading
                    size="heading4xl"
                    as="h3"
                    className="text-[2rem] font-bold text-white-a700 md:text-[1.75rem] sm:text-[1.5rem]"
                >
                    Page Not Found
                </Heading>
                <Text
                    size="textlg"
                    as="p"
                    className="text-[1.125rem] font-normal text-gray-400 leading-relaxed md:text-[1rem]"
                >
                    Oops! The page you're looking for doesn't exist. you entered the wrong URL.
                </Text>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-[1rem] items-center sm:w-full">
                <Link to={ROUTE_PATH.ROOT}>
                    <Button
                        color="brand_color_0_green_800"
                        size="lg"
                        shape="square"
                        className="min-w-[200px] px-[2rem] py-[0.75rem] font-bold uppercase tracking-[0.02rem] hover:shadow-lg transition-all duration-300"
                    >
                        Go to Homepage
                    </Button>
                </Link>
                
                <div className="flex gap-[1rem] flex-wrap justify-center">
                    <Link to={ROUTE_PATH.SECTURITY_TOKENS}>
                        <Button
                            variant="outline"
                            color="white_a700"
                            size="md"
                            shape="square"
                            className="min-w-[140px] px-[1.5rem] py-[0.5rem] font-medium text-[0.875rem] border-white-a700_1e hover:bg-white-a700_14 transition-all duration-300"
                        >
                            Security Tokens
                        </Button>
                    </Link>
                    <Link to={ROUTE_PATH.LIQUIDITY}>
                        <Button
                            variant="outline"
                            color="white_a700"
                            size="md"
                            shape="square"
                            className="min-w-[140px] px-[1.5rem] py-[0.5rem] font-medium text-[0.875rem] border-white-a700_1e hover:bg-white-a700_14 transition-all duration-300"
                        >
                            Liquidity
                        </Button>
                    </Link>
                    <Link to={ROUTE_PATH.SWAP}>
                        <Button
                            variant="outline"
                            color="white_a700"
                            size="md"
                            shape="square"
                            className="min-w-[140px] px-[1.5rem] py-[0.5rem] font-medium text-[0.875rem] border-white-a700_1e hover:bg-white-a700_14 transition-all duration-300"
                        >
                            Swap
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-[2rem] flex gap-[0.5rem] items-center">
                <div className="w-[3px] h-[3px] bg-brand_color-0 rounded-full"></div>
                <div className="w-[5px] h-[5px] bg-brand_color-0 rounded-full opacity-70"></div>
                <div className="w-[3px] h-[3px] bg-brand_color-0 rounded-full opacity-50"></div>
            </div>


        </div>
    );
}

export default NotFoundPage;