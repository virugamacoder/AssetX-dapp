import { Heading, Img, Input } from "./..";
import React from "react";

export default function UserProfile5({
    // tokenOne = "12",
    tokenValue = "0",
    tokenName = "MATIC",
    tokenImage = "images/img_image_12.png",
    balanceLabel = "Balance:",
    onInputChange = () => { },
    balanceValue = "0",
    tokenSymbol = "MATIC",

    userPrice = "-$ 6.42332",
    // userBalance = "0",
    onClick,

    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex items-center p-[1.00rem] border-gray-900_02 border border-solid bg-gray-900 flex-1`}
        >
            <div className="flex w-full flex-col gap-[0.13rem]">
                <div className="flex items-center justify-between gap-[1.25rem]">
                    <Input
                        color="gray_900_7a"
                        shape="square"
                        type="text"
                        name="slippage"
                        pattern="[0-9]*"
                        value={tokenValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        className="flex-grow max-w-[40%] w-full border-none capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                        inputClassNames={`bg-transparent border-none text-white-a700 text-gray-50 font-bold text-[2.00rem] focus:ring-0 p-0 pr-2`}
                    />

                    <div className="flex max-w-[50%] justify-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem] cursor-pointer"
                        onClick={() => onClick()}
                    >
                        <div className="flex w-full items-center justify-center">
                            <Img src={tokenImage} alt="Matic Image" className="h-[1.25rem] w-[1.25rem] object-cover" />
                            <Heading
                                as="p"
                                style={{ color: `var(--brand_color_1)` }}
                                className="ml-[0.50rem] self-end text-[0.88rem] font-medium text-brand_color-1"
                            >
                                {tokenName}
                            </Heading>
                            <Img
                                src="images/img_arrow_right_336_white_a700.svg"
                                alt="Arrow Image"
                                className="ml-[1.13rem] h-[0.25rem]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Heading
                        style={{ color: `var(--brand_color_1)` }}
                        as="p"
                        className="text-[0.88rem] font-medium text-brand_color-1"
                    >
                        {userPrice}
                    </Heading>
                    <div className="flex gap-1 flex-1 flex-wrap justify-end">
                        <Heading style={{ color: `var(--brand_color_1)` }} as="p" className="text-[0.88rem] font-medium text-brand_color-1">
                            {balanceLabel}
                        </Heading>
                        <Heading size="headingmd" as="p" className="text-[0.88rem] font-bold text-white-a700">
                            {balanceValue} {tokenSymbol}
                        </Heading>
                    </div>
                </div>
            </div>
        </div>
    );
}
