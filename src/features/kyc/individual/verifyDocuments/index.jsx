import { correct_icon } from 'assets/images'
import { Button, Heading, Img, Text } from 'components'

function VerifyDocumentsIndividualKYC(props) {
    const { formik } = props

    return (
        <div>
            {formik.values.isVerifyDocuments ?
                <div className="w-full flex flex-col gap-[.75rem]">
                    <div className="flex items-center justify-between gap-[0.75rem] px-[1.25rem] py-[0.625rem] border border-gray-900_02">
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Document 01
                        </Heading>

                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[0.75rem] flex items-center !font-bold gap-[0.5rem] tracking-[0.00rem] cursor-pointer uppercase"
                            style={{
                                background: `linear-gradient(var(--gradient4))`,
                                backgroundClip: `text`,
                                color: `transparent`,
                            }}
                        >
                            <Img
                                src={correct_icon}
                                alt="Albert Pinkney Image"
                                className="h-[1.25rem] w-[1.25rem] rounded-[24px] object-cover"
                            />
                            Verified
                        </Heading>
                    </div>
                    <div className="flex items-center justify-between gap-[0.75rem] px-[1.25rem] py-[0.625rem] border border-gray-900_02">
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Document 02
                        </Heading>

                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[0.75rem] flex items-center !font-bold gap-[0.5rem] tracking-[0.00rem] cursor-pointer uppercase"
                            style={{
                                background: `linear-gradient(var(--gradient4))`,
                                backgroundClip: `text`,
                                color: `transparent`,
                            }}
                        >
                            <Img
                                src={correct_icon}
                                alt="Albert Pinkney Image"
                                className="h-[1.25rem] w-[1.25rem] rounded-[24px] object-cover"
                            />
                            Verified
                        </Heading>
                    </div>
                    <div className="flex items-center justify-between gap-[0.75rem] px-[1.25rem] py-[0.625rem] border border-gray-900_02">
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Document 03
                        </Heading>

                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[0.75rem] flex items-center !font-bold gap-[0.5rem] tracking-[0.00rem] cursor-pointer uppercase"
                            style={{
                                background: `linear-gradient(var(--gradient4))`,
                                backgroundClip: `text`,
                                color: `transparent`,
                            }}
                        >
                            <Img
                                src={correct_icon}
                                alt="Albert Pinkney Image"
                                className="h-[1.25rem] w-[1.25rem] rounded-[24px] object-cover"
                            />
                            Verified
                        </Heading>
                    </div>
                    <div className="flex items-center justify-between gap-[0.75rem] px-[1.25rem] py-[0.625rem] border border-gray-900_02">
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Document 04
                        </Heading>

                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[0.75rem] flex items-center !font-bold gap-[0.5rem] tracking-[0.00rem] cursor-pointer uppercase"
                            style={{
                                background: `linear-gradient(var(--gradient4))`,
                                backgroundClip: `text`,
                                color: `transparent`,
                            }}
                        >
                            <Img
                                src={correct_icon}
                                alt="Albert Pinkney Image"
                                className="h-[1.25rem] w-[1.25rem] rounded-[24px] object-cover"
                            />
                            Verified
                        </Heading>
                    </div>
                </div>
                :
                <div className="w-full flex flex-col gap-[.5rem]">
                    <Heading
                        size="textxs"
                        as="p"
                        className="mb-[0.25rem] text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                        style={{ color: `var(--brand_color_1)` }}
                    >
                        Verify Documents
                    </Heading>
                    <Text
                        as="p"
                        className="!text-[0.75rem] font-medium leading-[1rem] text-brand_color-1"
                    >
                        Please note that your documents will be verified through the ComplyCube service.
                        This process may take some time, and you will be notified within 10-15 minutes.
                    </Text>
                    <Button
                        shape="square"
                        color="brand_color_0_green_800"
                        className="mt-[1.25rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !text-[0.75rem] !h-[2.5rem]"
                        type="button"
                        onClick={() => formik.setFieldValue('isVerifyDocuments', true)}
                    >
                        Verify
                    </Button>
                </div>
            }
        </div>
    )
}

export default VerifyDocumentsIndividualKYC
