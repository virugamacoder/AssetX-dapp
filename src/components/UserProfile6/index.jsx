import ReactSwitch from "react-switch";
import { Img, Heading } from "./..";
import React from "react";

export default function UserProfile6({
    userImage = "images/img_image_1_40x36.png",
    headingText = "Arb Whitelist Era",
    tokensCounter = "0 Tokens",
    isChecked = false,
    onClick,
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex sm:flex-col justify-center items-center p-[0.75rem] bg-gray-900 flex-1`}
        >
            <div className="flex flex-1 items-center justify-center gap-[0.75rem]">
                <Img src={userImage} alt="Whitelist Image" className="h-[2.50rem] object-cover" />
                <div className="flex flex-1 flex-col items-start gap-[0.13rem]">
                    <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                        {headingText}
                    </Heading>
                    <Heading
                        size="textxs"
                        as="p"
                        style={{ color: `var(--brand_color_1)` }}
                        className="text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                    >
                        {tokensCounter}
                    </Heading>
                </div>
            </div>
            <ReactSwitch
                checkedIcon={false}
                uncheckedIcon={false}
                height={22}
                width={40}
                className="react_switch"
                onChange={(e) => onClick(e)} checked={isChecked}
            />
            {/* <Img src="images/img_user.svg" alt="User Image" className="h-[1.50rem]" /> */}
        </div>
    );
}
