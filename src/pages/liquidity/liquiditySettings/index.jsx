import { img_arrow_down_brand_color_1, img_info_circle_svgrepo_com } from "assets/images"
import { Button, Heading, Img, Input } from "components"
import ExpertModeProfile from "components/ExpertModeProfile"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function LiquiditySettings() {
    const [slippage, setSlippage] = useState("")
    const [trxnDeadline, setTrxnDeadline] = useState("")
    const [expertMode, setExpertMode] = useState(false)
    const [disableMultihops, setDisableMultihops] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="w-[41%] mt-[3.75rem] flex flex-1 flex-col items-center gap-[1.88rem] self-center md:self-stretch">
            <div className="flex w-full flex-col gap-[1.25rem] md:w-full">
                <div className="flex items-center gap-[1.25rem]">
                    <Button
                        style={{ padding: "0" }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-[0.56rem]"
                    >
                        <Img
                            src={img_arrow_down_brand_color_1}
                            alt="Arrow Down Five"
                            className="h-[1.50rem] w-[1.50rem]"
                        />
                    </Button>
                    <Heading
                        size="heading4xl"
                        as="h4"
                        className="text-[1.50rem] font-bold text-gray-50 md:text-[1.38rem]"
                    >
                        Transaction settings
                    </Heading>
                </div>
                <div className="border border-solid border-gray-900_02 bg-gray-900_01 p-[1.75rem] sm:p-[1.25rem]">
                    <div>
                        <div className="flex items-center gap-[0.56rem]">
                            <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                Slippage tolerance
                            </Heading>
                            <Img
                                src={img_info_circle_svgrepo_com}
                                alt="Info Image"
                                className="h-[1.00rem] w-[1.00rem]"
                            />
                        </div>
                        <div className="mt-[1.25rem] flex justify-center gap-[0.75rem]">
                            <Input
                                color="gray_900_7a"
                                shape="square"
                                type="text"
                                name="slippage"
                                pattern="[0-9]*"
                                value={slippage}
                                onChange={(e) => setSlippage(e.target.value)}
                                suffix={`%`}
                                placeholder={`10%`}
                                className="flex-grow border capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                inputClassNames={`bg-transparent border-none text-white-a700 text text-[18px] focus:ring-0 p-0 pr-2`}
                            />
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className="min-w-[13.00rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                onClick={() => setSlippage("0.1")}
                            >
                                auto
                            </Button>
                        </div>
                        <div className="mt-[2.50rem]">
                            <div className="flex flex-col gap-[1.25rem]">
                                <div className="flex items-center gap-[0.56rem]">
                                    <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                        Transaction deadline
                                    </Heading>
                                    <Img
                                        src={img_info_circle_svgrepo_com}
                                        alt="Info Image Thirtysix"
                                        className="h-[1.00rem] w-[1.00rem]"
                                    />
                                </div>
                                <Input
                                    color="gray_900_7a"
                                    shape="square"
                                    type="text"
                                    name="slippage"
                                    pattern="[0-9]*"
                                    value={trxnDeadline}
                                    onChange={(e) => setTrxnDeadline(e.target.value)}
                                    suffix={`Minutes`}
                                    placeholder={`30`}
                                    className="flex-grow border capitalize tracking-[0.00rem] sm:px-[1.25rem]"
                                    inputClassNames={`bg-transparent border-none text-white-a700 text text-[18px] focus:ring-0 p-0 pr-2`}
                                />
                            </div>
                        </div>
                        {/* <div className="mt-[2.50rem] flex flex-col items-start gap-[0.88rem]">
                            <Heading size="heading2xl" as="h5" className="text-[1.25rem] font-bold text-white-a700">
                                Interface Settings
                            </Heading>
                            <div className="flex flex-col gap-[1.00rem] self-stretch">
                                <ExpertModeProfile
                                    // expertModeText="Expert Mode" 
                                    isChecked={expertMode}
                                    onClick={() => setExpertMode(!expertMode)}
                                />
                                <ExpertModeProfile
                                    expertModeText="Disable Multihops"
                                    isChecked={disableMultihops}
                                    onClick={() => setDisableMultihops(!disableMultihops)}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiquiditySettings
