import { img_image, img_image_60x60, img_polygonlogofreelogovectorsnet_1, img_secure_svgrepo_com } from "assets/images";
import { Button, Heading, Img } from "./..";
import React from "react";
import { getImageFromPinata } from "services/pinata";
import { LAUNCHPAD_STAGES } from "data/constant";
import { getTokenDetailsRQ, STOS_KEYS } from "services/STO";
import { useCustomQuery } from "hooks";

export default function UserProfile(props) {

    const {
        stoImage,
        publicSalesButton = "Public Sales",
        securityTokenImage = img_image_60x60,
        securityTokenText = "Security token",
        othersTwoText,
        launchpadTitle = "SCR-1",
        overview = "Lorem Ipsum is simply dummy text of the printing...",
        durationText = "",
        // investButton = "Invest",
        onInvestButtonClick,
        isClosed = false,
        isLoading = false,
        stoObject
    } = props

    const { data: getTokenDetailsData, isLoading: getTokenDetailsLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.GET_STO_DETAIL, stoObject?.stoToken],
        queryFn: getTokenDetailsRQ,
        // enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    return (
        <div
            // {...props}
            className={`${props.className} w-full flex flex-col items-center w-[50%] md:w-full border-gray-900_02 border border-solid bg-gray-900_01`}
        >

            {!isLoading ?
                <div className="mb-[1.75rem] self-stretch">
                    <div className="flex flex-col">
                        <div className="relative h-[14.38rem] content-center">
                            <Img
                                src={getImageFromPinata(stoImage)}
                                alt="Accredited Logo"
                                className="mx-auto h-[14.38rem] w-full flex-1 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = img_image;
                                }}
                            />
                            {publicSalesButton &&
                                <Button
                                    color="gray_900_99"
                                    size="xs"
                                    variant="fill"
                                    shape="square"
                                    className="absolute left-[1.19rem] top-[1.19rem] m-auto min-w-[5.75rem] px-[0.75rem] font-medium"
                                >
                                    {publicSalesButton}
                                </Button>
                            }
                        </div>
                        {getTokenDetailsData ?
                            <Img
                                src={getImageFromPinata(getTokenDetailsData?.data?.stoImage)}
                                alt="Accredited Logo"
                                className="relative z-[1] ml-[1.75rem] mt-[-1.88rem] h-[3.75rem] w-[3.75rem] object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = securityTokenImage;
                                }}
                            />
                            :
                            <>
                                <div
                                    className='relative z-[1] ml-[1.75rem] mt-[-1.88rem] h-[3.75rem] w-[3.75rem] bg-white-a700 flex justify-center items-center font-black font-syne'
                                >
                                    {stoObject?.details?.title.substring(0, 3)}

                                </div>
                            </>
                        }
                    </div>
                    <div className="mt-[1rem] mx-[1.75rem] flex flex-col items-center">
                        <div className="flex items-start justify-center self-stretch">
                            <div className="flex flex-1 items-center self-end">
                                <Img
                                    src={img_secure_svgrepo_com}
                                    alt="Security Icon"
                                    className="h-[1.25rem] w-[1.25rem] object-cover"
                                />
                                <div className="flex items-start justify-center gap-[0.4rem] pl-[0.50rem]">
                                    <div className="mt-[0.38rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                    <Heading
                                        as="p"
                                        className="self-center font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                        style={{ color: `var(--brand_color_1)` }}
                                    >
                                        {securityTokenText}
                                    </Heading>
                                    <div className="mt-[0.38rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                </div>
                                <Heading
                                    as="p"
                                    className="ml-[0.4rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                    style={{ color: `var(--brand_color_1)` }}
                                >
                                    {othersTwoText}
                                </Heading>
                            </div>
                            {/* <Img
                            src={img_polygonlogofreelogovectorsnet_1}
                            alt="Polygon Logo"
                            className="mb-[0.75rem] h-[2.00rem] w-[2.00rem] object-cover"
                        /> */}
                        </div>
                        <Heading
                            size="heading3xl"
                            as="h5"
                            className="mt-[0.75rem] self-start text-[1.38rem] font-bold text-white-a700"
                        >
                            {launchpadTitle}
                        </Heading>
                        <Heading as="p"
                            className="mt-[0.38rem] font-inter text-[0.88rem] font-normal text-brand_color-1 line-clamp-1"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            {overview}
                        </Heading>
                        <>
                            <div className="flex w-full justify-between">
                                {
                                    (LAUNCHPAD_STAGES.PUBLIC_SALE === stoObject?.stage || LAUNCHPAD_STAGES.COMING_SOON === stoObject?.stage) ?
                                        <Heading
                                            size="headingmd"
                                            as="p"
                                            className="mt-[1.88rem] mx-auto text-[0.88rem] font-semibold"
                                            style={{
                                                background: `conic-gradient(var(--gradient5))`,
                                                backgroundClip: `text`,
                                                color: `transparent`,
                                            }}
                                        >
                                            {durationText}
                                        </Heading>
                                        :
                                        <>
                                            <Heading
                                                size="headingmd"
                                                as="p"
                                                className="mt-[1.88rem] text-[0.88rem] font-semibold"
                                                style={{ color: `var(--brand_color_1)` }}
                                            >
                                                {`Closed`}
                                            </Heading>
                                            <Heading
                                                size="headingmd"
                                                as="p"
                                                className="mt-[1.88rem] text-[0.88rem] font-semibold"
                                                style={LAUNCHPAD_STAGES.WITHDRAW === stoObject?.stage ?
                                                    { color: `var(--red_a700)` }
                                                    :
                                                    {
                                                        background: `linear-gradient(var(--gradient4))`,
                                                        backgroundClip: `text`,
                                                        color: `transparent`,
                                                    }}
                                            >
                                                {durationText}
                                            </Heading>
                                        </>
                                }
                            </div>
                            {(LAUNCHPAD_STAGES.CLOSED === stoObject?.stage ||
                                LAUNCHPAD_STAGES.WITHDRAW === stoObject?.stage ||
                                LAUNCHPAD_STAGES.CLAIM === stoObject?.stage ||
                                LAUNCHPAD_STAGES.COMING_SOON === stoObject?.stage
                            ) &&
                                <Button
                                    shape="square"
                                    variant={`outline`}
                                    color={`white_A700`}
                                    className="mt-[0.63rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    onClick={() => onInvestButtonClick()}
                                >
                                    Learn More
                                </Button>
                            }
                            {(LAUNCHPAD_STAGES.PUBLIC_SALE === stoObject?.stage) &&
                                <Button
                                    shape="square"
                                    color="brand_color_0_green_800"
                                    className="mt-[0.63rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    onClick={() => onInvestButtonClick()}
                                >
                                    Invest
                                </Button>
                            }
                        </>
                        {/* {!isClosed ?
                            <>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="mt-[1.88rem] text-[0.88rem] font-semibold"
                                    style={{
                                        background: `conic-gradient(var(--gradient5))`,
                                        backgroundClip: `text`,
                                        color: `transparent`,
                                    }}
                                >
                                    {durationText}
                                </Heading>
                                <Button
                                    shape="square"
                                    color="brand_color_0_green_800"
                                    className="mt-[0.63rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    onClick={() => onInvestButtonClick()}
                                >
                                    {investButton}
                                </Button>
                            </>
                            :
                            <>
                                <div className="flex w-full justify-between">
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="mt-[1.88rem] text-[0.88rem] font-semibold"
                                        style={{ color: `var(--brand_color_1)` }}
                                    >
                                        {`Closed`}
                                    </Heading>
                                    <Heading
                                        size="headingmd"
                                        as="p"
                                        className="mt-[1.88rem] text-[0.88rem] font-semibold"
                                        style={{
                                            background: `linear-gradient(var(--gradient4))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        }}
                                    >
                                        {durationText}
                                    </Heading>
                                </div>
                                <Button
                                    shape="square"
                                    variant={`outline`}
                                    color={`white_A700`}
                                    className="mt-[0.63rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    onClick={() => onInvestButtonClick()}
                                >
                                    {investButton}
                                </Button>
                            </>
                        } */}
                    </div>
                </div>
                :
                <div className="mb-[1.75rem] self-stretch">
                    <div className="flex flex-col">
                        <div className="relative h-[14.38rem] content-center rounded skeleton"></div>
                    </div>
                    <div className="mt-[1rem] mx-[1.75rem] flex flex-col items-center">
                        <div className="flex items-start justify-center self-stretch rounded skeleton">
                            <div className="flex flex-1 items-center self-end invisible">
                                <Img
                                    src={img_secure_svgrepo_com}
                                    alt="Security Icon"
                                    className="h-[1.25rem] w-[1.25rem] object-cover"
                                />
                                <div className="flex items-start justify-center gap-[0.4rem] pl-[0.50rem]">
                                    <div className="mt-[0.38rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                    <Heading
                                        as="p"
                                        className="self-center font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                        style={{ color: `var(--brand_color_1)` }}
                                    >
                                        {securityTokenText}
                                    </Heading>
                                    <div className="mt-[0.38rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-brand_color-1" />
                                </div>
                                <Heading
                                    as="p"
                                    className="ml-[0.4rem] font-inter text-[0.88rem] font-normal tracking-[0.00rem] text-brand_color-1"
                                    style={{ color: `var(--brand_color_1)` }}
                                >
                                    {othersTwoText}
                                </Heading>
                            </div>
                        </div>
                        <Heading
                            size="heading3xl"
                            as="h5"
                            className="w-full h-[1.625rem] mt-[0.75rem] self-start text-[1.38rem] font-bold text-white-a700 skeleton rounded"
                        >
                            {/* {launchpadTitle} */}
                        </Heading>
                        <Heading as="p"
                            className="w-full mt-[0.38rem] h-[1.063rem] skeleton rounded"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            {/* {overview} */}
                        </Heading>
                        <>
                            <div className="flex w-full gap-[1rem] justify-between">
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="mt-[1.88rem] h-[1.063rem] w-full skeleton rounded text-[0.88rem] font-semibold"
                                    style={{ color: `var(--brand_color_1)` }}
                                >
                                </Heading>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="mt-[1.88rem] h-[1.063rem] w-full skeleton rounded text-[0.88rem] font-semibold"
                                >
                                </Heading>
                            </div>
                            <Button
                                type="button"
                                shape="square"
                                variant={`outline`}
                                color={`white_A700`}
                                className="mt-[0.63rem] h-[3rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] w-full skeleton !rounded border-none"
                            >
                            </Button>
                        </>
                    </div>
                </div>
            }

        </div >
    );
}
