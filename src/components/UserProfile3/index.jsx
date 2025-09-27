import { img_arrow_right_336_white_a700, img_image_20x20 } from "assets/images";
import { Button, Heading, Img, Input } from "./..";

export default function UserProfile3({
    // headingText = "10",
    tokenValue = "0",
    maxButton = "Max",
    displayMaxButton = false,
    tokenImage = img_image_20x20,
    // userName = "wSSOL1",
    balanceLabel = "Balance:",
    balanceValue = "0",
    tokenName = "",
    tokenSymbol = "",
    onMaxClick = () => { },
    onInputChange = () => { },
    onSelectToken = () => { },
    isInuptDisabled = false,
    ...props
}) {

    return (
        <div
            {...props}
            className={`${props.className} flex items-center p-[1.25rem] border-gray-900_02 border border-solid bg-gray-900 flex-1`}
        >
            <div className="flex items-center justify-center w-full">
                {typeof tokenValue === "number" || typeof tokenValue === "string" ? (
                    <Input
                        color="gray_900_7a"
                        shape="square"
                        type="number"
                        name="slippage"
                        pattern="[0-9]*"
                        value={tokenValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        className="flex-grow max-w-[40%] w-full border-none capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                        inputClassNames={`bg-transparent border-none text-white-a700 text-gray-50 font-bold text-[2.00rem] focus:ring-0 p-0 pr-2 disabled:cursor-not-allowed`}
                        autoComplete="off"
                        placeholder="0"
                        isDisabled={isInuptDisabled}
                    />
                ) : (
                    <div className="w-fit max-w-[50%]">{tokenValue}</div>
                )}
                <div className="flex flex-1 flex-col gap-[0.50rem]">
                    <div className="flex  justify-end gap-[1.00rem]">
                        {displayMaxButton && (
                            <Button
                                size="md"
                                variant="fill"
                                shape="square"
                                className="min-w-[3.88rem] text-[0.88rem] border border-solid border-gray-900_02 px-[0.94rem] font-medium"
                                onClick={() => onMaxClick()}
                            >
                                {maxButton}
                            </Button>
                        )}
                        <div
                            className={`flex h-[40px] justify-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem] cursor-pointer ${displayMaxButton ? "max-w-[75%]" : "max-w-[100%]"
                                }`}
                            onClick={() => onSelectToken()}
                        >
                            <div className="flex items-center justify-center w-full">
                                {/* <Img src={tokenImage} alt="Wssol Image" className="h-[1.25rem] w-[1.25rem] object-cover" /> */}
                                <Heading
                                    as="p"
                                    style={{ color: `var(--brand_color_1)` }}
                                    className="ml-[0.50rem] self-end text-[0.88rem] font-medium text-brand_color-1"
                                >
                                    {tokenName}
                                </Heading>
                                <Img
                                    src={img_arrow_right_336_white_a700}
                                    alt="Arrow Image"
                                    className="ml-[0.75rem] h-[0.25rem]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1">
                        <Heading
                            as="p"
                            style={{ color: `var(--brand_color_1)` }}
                            className="text-[0.88rem] font-medium text-brand_color-1"
                        >
                            {balanceLabel}
                        </Heading>
                        <Heading
                            size="headingmd"
                            as="p"
                            className="text-[0.88rem] font-bold text-white-a700"
                        >
                            {Number(Number(balanceValue).toFixed(3))} {tokenSymbol}
                        </Heading>
                    </div>
                </div>
            </div>
        </div>
    );
}
