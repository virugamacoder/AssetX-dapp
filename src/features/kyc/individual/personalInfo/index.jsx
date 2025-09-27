import { correct_icon } from "assets/images"
import { Button, Heading, Img, Text } from "components"
import TextInput from "components/Forms/textInput"
import OTPInput from "react-otp-input"

function PersonalInfoIndividualKYC(props) {
    const { formik } = props

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                </div>
            </div>
            <div className="flex w-full">
                <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    suffix={
                        !formik.values.isEmailVarified ?
                            <Button
                                shape="square"
                                style={{
                                    background: `linear-gradient(var(--gradient4))`,
                                    backgroundClip: `text`,
                                    color: `transparent`,
                                }}
                                // color="brand_color_0_green_800"
                                className={`!text-[0.75rem] px-0 font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]`}
                                type="button"
                                onClick={() => formik.setFieldValue('isEmailVarified', true)}
                            >
                                Verify Email
                            </Button>
                            :
                            <Heading
                                size="textxs"
                                as="p"
                                className="text-[0.75rem] flex items-center !font-bold gap-[0.5rem] tracking-[0.00rem] px-[1.25rem] py-[0.625rem] cursor-pointer uppercase"
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
                    }
                />
            </div>
            {formik.values.isEmailVarified &&

                <div className="flex flex-col gap-[1.25rem] border border-gray-900_02 w-full p-[1.5rem]">
                    <div className="flex flex-col gap-[0.75rem]">
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-semibold tracking-[0.00rem]"
                        >
                            Enter the code
                        </Heading>
                        <Text as="p" className="text-[.75rem] font-normal tracking-[0.00rem] text-brand_color-1">
                            A 6-digit verification code has been sent to your email. Enter the code below
                            to verify your email.
                        </Text>
                    </div>
                    <OTPInput
                        value={formik.values.emailOTP}
                        onChange={(e) => {
                            formik.setFieldValue('emailOTP', e)
                        }}
                        numInputs={6}
                        renderSeparator={<span style={{ marginRight: "10px" }}></span>}
                        renderInput={(props) => (
                            <input {...props} />
                        )}
                        inputStyle={styles.otpInput}
                        placeholder="000000"
                    />
                    <div className="flex items-center">
                        <Button
                            shape="square"
                            color="brand_color_0_green_800"
                            className="px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !text-[0.75rem] !h-[2.5rem]"
                            type="button"
                            onClick={() => console.log("Verify Email")}
                        >
                            Verify
                        </Button>
                        <Button
                            shape="square"
                            style={{
                                background: `linear-gradient(var(--gradient4))`,
                                backgroundClip: `text`,
                                color: `transparent`,
                            }}
                            className={`!text-[0.75rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]`}
                            type="button"
                            onClick={() => console.log("Resend OTP")}
                        >
                            RESEND
                        </Button>
                    </div>
                </div>}


        </div>
    )
}

export const styles = {
    otpInput: {
        width: "100%",
        height: "48px",
        // borderRadius: "var(--radiusSM)",
        borderWidth: "1px",
        color: "var(--white_a700)",
        borderColor: "var(--gray_900_02)",
        boxSizing: "border-box",
        background: "var(--gray_900_01)",
        fontFamily: "Syne",
        fontSize: "20px",
        fontWeight: "700",
        lineHeight: "20px",
        outline: "none",
    }
}
export default PersonalInfoIndividualKYC
