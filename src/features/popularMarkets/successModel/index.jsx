import { correct_icon_edges, img_close_md_svgrepo_com } from "assets/images";
import { Button, Heading, Img, ModelComponent } from "components";

function SuccessModel(props) {

    const {
        onClose,
    } = props

    return (
        <ModelComponent
            closeModal={() => onClose()}
        >
            <div className="min-w-[600px] self-center border border-solid border-gray-900_02 bg-gray-900_01 px-[1.50rem] py-[1.50rem] md:w-full sm:py-[1.25rem]">
                <div className="flex flex-col items-center gap-[1.5rem]">
                    <Button
                        style={{
                            padding: "0",
                            height: "auto"
                        }}
                        onClick={() => onClose()}
                        className={`absolute top-[1.25rem] right-[1.25rem]`}
                    >
                        <Img
                            src={img_close_md_svgrepo_com}
                            alt="Close Image"
                            className="w-[1.50rem]"
                        />
                    </Button>

                    <div className="flex flex-col items-center justify-center gap-[1.5rem] self-stretch sm:flex-col">
                        <div className={`mx-auto mt-[2.25rem]`}>
                            <Img
                                src={correct_icon_edges}
                                alt="Albert Pinkney Image"
                                className="w-[16.25rem] rounded-[24px] mx-auto object-cover"
                            />
                        </div>
                        <Heading
                            size="textxs"
                            as="p"
                            className="mb-[0.25rem] text-[1.5rem] !font-bold capitalize tracking-[0.00rem] !text-white-a700"
                        >
                            Bet successfully placed!
                        </Heading>
                        <Heading
                            size="textxs"
                            as="p"
                            className="mb-[0.25rem] text-center !text-[1rem] font-medium capitalize tracking-[0.00rem]"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            You’ve successfully placed a bet! Good luck! <br />
                            You can see your placed bets in My Account Section.
                        </Heading>
                        <div
                            className={`flex gap-[1rem] w-full mt-[1rem]`}
                        >
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className={`self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] w-1/2`}
                                type="submit"
                            >
                                Check my bet
                            </Button>
                            <Button
                                shape="square"
                                variant={`outline`}
                                color={`white_A700`}
                                className="w-1/2 self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                type="button"
                            >
                                Back
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </ModelComponent>
    )
}

export default SuccessModel
