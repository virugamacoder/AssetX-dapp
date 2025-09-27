import { img_image_3, img_polygonlogofreelogovectorsnet_1 } from "assets/images";
import { Button, Heading, Img } from "./..";
import React from "react";
import { getImageFromPinata } from "services/pinata";

export default function UserProfile2({
    userHeading = "CKGP",
    userSubheading = "CoacK",
    issuerText = "Issuer",
    issuerName = "CoachK",
    countryText = "Country",
    countryName = "Thailand",
    industryText = "Industry",
    industryName = "Other",
    tradeButtonText = "trade now",
    stoImage,
    onTradeButtonClick,
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-center w-full md:w-full p-[1.88rem] sm:p-[1.25rem] border-gray-900_02 border border-solid bg-gray-900_01`}
        >
            <div className="flex items-center justify-center self-stretch">
                <div className="flex flex-1 items-center gap-[1.00rem]">
                    <Img
                        src={getImageFromPinata(stoImage)}
                        alt="Primary Image"
                        className="h-[3.75rem] w-[3.75rem] rounded-[30px] object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = img_image_3;
                        }}
                    />
                    <div className="flex flex-1 flex-col items-start gap-[0.25rem]">
                        <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                            {userHeading}
                        </Heading>
                        <Heading as="p" style={{ color: `var(--brand_color_1)` }} className="font-inter text-[0.88rem] font-normal text-brand_color-1">
                            {userSubheading}
                        </Heading>
                    </div>
                </div>
                {/* <Img
                    src={img_polygonlogofreelogovectorsnet_1}
                    alt="Secondary Image"
                    className="h-[2.00rem] w-[2.00rem] object-cover"
                /> */}
            </div>
            <div className="mt-[1.50rem] h-[0.06rem] self-stretch bg-white-a700_14" />
            <div className="mt-[1.00rem] flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                <Heading as="p" style={{ color: `var(--brand_color_1)` }} className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1">
                    {issuerText}
                </Heading>
                <Heading
                    size="headingmd"
                    as="p"
                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                >
                    {issuerName}
                </Heading>
            </div>
            <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                <Heading as="p" style={{ color: `var(--brand_color_1)` }} className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1">
                    {countryText}
                </Heading>
                <Heading
                    size="headingmd"
                    as="p"
                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                >
                    {countryName}
                </Heading>
            </div>
            <div className="mt-[0.75rem] flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                <Heading as="p" style={{ color: `var(--brand_color_1)` }} className="text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1">
                    {industryText}
                </Heading>
                <Heading
                    size="headingmd"
                    as="p"
                    className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                >
                    {industryName}
                </Heading>
            </div>
            <Button
                shape="square"
                color="brand_color_0_green_800"
                className="mt-[2.13rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                onClick={() => onTradeButtonClick()}
            >
                {tradeButtonText}
            </Button>
        </div>
    );
}
