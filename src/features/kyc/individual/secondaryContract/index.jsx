import { building_dark, building_gradient, correct_icon, img_copysvgrepocom_1, mail_dark, mail_gradient, telegram_dark, telegram_gradient } from "assets/images";
import { Button, Heading, Img, Text } from "components";
import TextInput from "components/Forms/textInput";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { toast } from "react-toastify";
import { handleCopyToClipboard } from "utils";
import { styles } from "../personalInfo";

function SecondaryContractIndividualKYC(props) {
    const { formik } = props;

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div style={{
            // background: `#F9F9F9`,
        }}>
            <Tabs
                selectedTabClassName="!text-brand_color-0"
                selectedTabPanelClassName="mt-[2.13rem] !relative tab-panel--selected"
                onSelect={index => setTabIndex(index)}
            >
                <TabList className="flex w-full justify-between gap-[0.938rem]">
                    <Tab
                        style={tabIndex === 0 ? {
                            border: "1px solid",
                            borderImageSource: `conic-gradient(var(--gradient5))`,
                            borderImageSlice: 1,
                        } : {}}
                        className={`flex items-center gap-[0.625rem] w-full text-[0.88rem] pl-[0.75rem] py-[0.875rem]
                            ${tabIndex === 0 ? `!text-white-a700 font-semibold` : `text-brand_color-1 font-normal`}`}
                    >
                        {tabIndex === 0 ?
                            <Img
                                src={telegram_gradient}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                            :
                            <Img
                                src={telegram_dark}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        }
                        Telegram
                    </Tab>
                    <Tab
                        style={
                            tabIndex === 1 ? {
                                border: "1px solid",
                                borderImageSource: `conic-gradient(var(--gradient5))`,
                                borderImageSlice: 1,
                            } : {}}
                        className={`flex items-center gap-[0.625rem] w-full text-[0.88rem] pl-[0.75rem] py-[0.875rem]
                                ${tabIndex === 1 ? `!text-white-a700 font-semibold` : `text-brand_color-1 font-normal`}`}
                    >
                        {tabIndex === 1 ?
                            <Img
                                src={mail_gradient}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                            :
                            <Img
                                src={mail_dark}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        }
                        Business Email
                    </Tab>
                    <Tab
                        style={
                            tabIndex === 2 ? {
                                border: "1px solid",
                                borderImageSource: `conic-gradient(var(--gradient5))`,
                                borderImageSlice: 1,
                            } : {}}
                        className={`flex items-center gap-[0.625rem] w-full text-[0.88rem] pl-[0.75rem] py-[0.875rem]
                                ${tabIndex === 2 ? `!text-white-a700 font-semibold` : `text-brand_color-1 font-normal`}`}
                    >
                        {tabIndex === 2 ?
                            <Img
                                src={building_gradient}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                            :
                            <Img
                                src={building_dark}
                                alt="telegram Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        }
                        Proof of Address
                    </Tab>
                </TabList>
                {/* Telegram Tab*/}
                <TabPanel className="mt-[1.25rem]">
                    <div className="w-full flex flex-col gap-[.5rem] border border-gray-900_02 p-[1.5rem] !pr-[1rem]">
                        <Heading
                            size="textxs"
                            as="p"
                            className="mb-[0.25rem] text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Instruction
                        </Heading>
                        <Text
                            as="p"
                            className="!text-[0.75rem] font-medium leading-[1.38rem] text-brand_color-1"
                        >
                            1. Open the Telegram App
                        </Text>
                        <Text
                            as="p"
                            className="!text-[0.75rem] font-medium leading-[1.38rem] text-brand_color-1"
                        >
                            2. Start a chat with <span>@dexreal_verification_bot</span>
                        </Text>
                        <Text
                            as="p"
                            className="!text-[0.75rem] font-medium leading-[1.38rem] text-brand_color-1"
                        >
                            3. Get Verification Code
                        </Text>
                        <div className="">
                            {formik.values.getCode ?
                                <Button
                                    size="xs"
                                    variant="fill"
                                    shape="square"
                                    rightIcon={
                                        <Img
                                            src={img_copysvgrepocom_1}
                                            alt="Copy-svgrepo-com 1"
                                            className="h-[1.00rem] w-[1.00rem] object-cover"
                                        />
                                    }
                                    type="button"
                                    className="text-[1rem] flex justify-between border-gray-900_02 w-full gap-[0.50rem] border border-solid px-[1rem] py-[1rem] font-bold capitalize tracking-[0.00rem] !text-white-a700 h-auto"
                                    onClick={() => {
                                        handleCopyToClipboard("849272")
                                        toast.success("Copied to clipboard")
                                    }}
                                >
                                    849272
                                </Button>
                                :
                                <Button
                                    shape="square"
                                    style={{
                                        background: `linear-gradient(var(--gradient4))`,
                                        backgroundClip: `text`,
                                        color: `transparent`,
                                    }}
                                    className={`!text-[0.75rem] w-full border border-gray-900_02 bg-gray-900_01 h-auto py-[1rem] px-[2.13rem] font-bold uppercase tracking-[0.00rem] `}
                                    type="button"
                                    onClick={() => formik.setFieldValue('getCode', true)}
                                >
                                    Get Code
                                </Button>
                            }
                        </div>
                        <Text
                            as="p"
                            className="!text-[0.75rem] font-medium leading-[1.38rem] text-brand_color-1"
                        >
                            4. Send the code to the Bot
                        </Text>
                    </div>
                </TabPanel>
                {/* // Telegram Tab*/}

                {/* Business Email Tab*/}
                <TabPanel className="mt-[1.25rem]">
                    <div className="flex w-full">
                        <TextInput
                            label="Email Address"
                            name="buinessEmail"
                            placeholder="Email Address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.buinessEmail}
                            suffix={
                                !formik.values.isBuinessEmailVarified ?
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
                                        onClick={() => formik.setFieldValue('isBuinessEmailVarified', true)}
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
                    {formik.values.isBuinessEmailVarified &&

                        <div className="flex flex-col gap-[1.25rem] w-full py-[1.5rem]">
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
                        </div>
                    }
                </TabPanel>
                {/* //Business Email Tab*/}

                {/* Address Proof Tab*/}
                <TabPanel className="mt-[1.25rem]">
                    {formik.values.isProofOfAddressVarified ?
                        <div className="w-full flex flex-col gap-[.5rem] border border-gray-900_02">
                            <div className="flex items-center justify-between gap-[0.75rem] px-[1.25rem] py-[0.625rem]">
                                <Heading
                                    size="textxs"
                                    as="p"
                                    className="text-[1rem] font-semibold capitalize tracking-[0.00rem] !text-white-a700"
                                    style={{ color: `var(--brand_color_1)` }}
                                >
                                    Address Document
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
                        <div className="w-full flex flex-col gap-[.5rem] border border-gray-900_02 p-[1.5rem] !pr-[1rem]">
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
                                onClick={() => formik.setFieldValue('isProofOfAddressVarified', true)}
                            >
                                Verify
                            </Button>
                        </div>
                    }
                </TabPanel>
                {/* //Address Proof Tab*/}
            </Tabs>
        </div>
    )
}

export default SecondaryContractIndividualKYC
