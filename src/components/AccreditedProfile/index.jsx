import { img_image_3 } from "assets/images";
import { Button, Heading, Img, Text } from "./..";
import React from "react";
import { getImageFromPinata } from "services/pinata";

export default function AccreditedProfile({
    // accreditedText = "Accredited",
    ssolOneText = "SSOL1 -",
    seaSolarText = "SEA Solar Series 1",
    zeroText = "0",
    stoImage,
    selectedObject,
    onClickListToken,
    ...props
}) {
    return (
        <div {...props} className={`${props.className} flex flex-col items-start w-full md:w-full gap-[0.88rem]`}>
            <div className="flex flex-col gap-[1rem] self-stretch border border-solid border-gray-900_02 bg-gray-900 p-[1.00rem]">
                <div className="flex items-center self-stretch">
                    <div className="flex w-[30%] flex-col items-start">
                        <div className="flex w-[54%] flex-col items-end">
                            <Img
                                src={getImageFromPinata(stoImage)}
                                alt="Accredited Logo"
                                className="h-[3.75rem] w-full rounded-[30px] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = img_image_3;
                                }}
                            />
                            {/* <Img
                            src="images/img_polygonlogofreelogovectorsnet_1.png"
                            alt="Ssol1 Logo"
                            className="relative mt-[-1.25rem] h-[1.25rem] w-[1.25rem] object-cover"
                        /> */}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-end gap-[0.25rem]">
                        <div className="flex flex-wrap justify-end self-stretch">
                            <Heading
                                size="headingmd"
                                as="p"
                                className="text-[0.88rem] font-semibold capitalize tracking-[0.00rem] text-white-a700"
                            >
                                {ssolOneText}
                            </Heading>
                            <Heading
                                as="p"
                                style={{ color: `var(--brand_color_1)` }}
                                className="ml-1 text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1"
                            >
                                {seaSolarText}
                            </Heading>
                        </div>
                        <Heading size="heading6xl" as="h2" className="text-[2.00rem] font-bold text-white-a700">
                            {zeroText}
                        </Heading>
                    </div>
                </div>
                <Button
                    size='md'
                    shape="square"
                    color="brand_color_0_green_800"
                    className="self-stretch px-[16px] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] capitalize"
                    onClick={() => onClickListToken(selectedObject)}
                >
                    List WERC20 Token
                </Button>
            </div>
        </div>
    );
}
