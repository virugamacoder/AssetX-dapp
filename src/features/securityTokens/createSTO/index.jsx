import { circle_filled, correct_circle, empty_circle, img_close_md_svgrepo_com } from "assets/images"
import { Button, Heading, Img, LoaderComponent, ModelComponent } from "components"
import { ErrorMessage, Field, Form, Formik, FormikConsumer, useFormikContext } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import { createSTOJson } from "./formConfig";
import FormFields from "components/Forms/formFields";
import { getFieldNames } from "utils";
import { Debug } from "components/Forms/formikDebug";
import { createSTOHandler, getRWATokenDetailHandler, RWATokenApproveHandler, uploadFileToPinataHandler } from "./apiFunctions";
import { isAddress, parseUnits } from "viem";
import moment from "moment";
import { toast } from "react-toastify";
import { useChainId, usePublicClient, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { STO_FACTORY_ADDRESS } from "data/constant";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "providers/WalletConnectProvider";

const Wizard = ({ children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = values => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };

    const previous = values => {
        setSnapshot(values);
        setStepNumber(Math.max(stepNumber - 1, 0));
    };

    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            next(values);
        }
    };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {formik => (
                <Form>

                    <div className="min-w-[600px] w-full pl-[1.5rem] pr-[1rem] pt-[2.5rem] flex pb-[60px] items-center relative">
                        {/* Step 1: Personal Info */}
                        <div className="circle-container flex relative items-center">
                            <Img
                                src={stepNumber > 0 ? correct_circle : circle_filled}
                                alt="Accredited Logo"
                                className="h-[20px] w-[20px] rounded-[5px] object-cover"
                            />
                            <div
                                style={
                                    stepNumber > 0 ?
                                        {
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        } : {}
                                }
                                className="absolute top-[100%] left-1/2 transform -translate-x-1/2 text-white-a700 mt-2 text-nowrap">
                                RWA Info
                            </div>
                        </div>

                        {/* Divider Line */}
                        <hr className="flex-1 mx-[0.75rem] border-[#212129]" />

                        {/* Step 2: Secondary Contact */}
                        <div className="circle-container flex relative items-center">
                            <Img
                                src={stepNumber > 1 ? correct_circle : stepNumber == 1 ? circle_filled : empty_circle}
                                alt="Accredited Logo"
                                className="h-[20px] w-[20px] rounded-[5px] object-cover"
                            />
                            <div
                                style={
                                    stepNumber > 1 ?
                                        {
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        } : {}
                                }
                                className="absolute top-[100%] left-1/2 transform -translate-x-1/2 text-white-a700 mt-2 text-nowrap">
                                RWA Details
                            </div>
                        </div>

                        {/* Divider Line */}
                        <hr className="flex-1 mx-[0.75rem] border-[#212129]" />

                        {/* Step 3: Verify Documents */}
                        <div className="circle-container flex relative items-center">
                            <Img
                                src={stepNumber > 2 ? correct_circle : stepNumber == 2 ? circle_filled : empty_circle}
                                alt="Accredited Logo"
                                className="h-[20px] w-[20px] rounded-[5px] object-cover"
                            />
                            <div
                                style={
                                    stepNumber > 2 ?
                                        {
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        } : {}
                                }
                                className="absolute top-[100%] left-1/2 transform -translate-x-1/2 text-white-a700 mt-2 text-nowrap">
                                Approve Deposit RWA
                            </div>
                        </div>
                        {/* Divider Line */}
                        <hr className="flex-1 mx-[0.75rem] border-[#212129]" />
                        {/* Step 3: Verify Documents */}
                        <div className="circle-container flex relative items-center">
                            <Img
                                src={stepNumber > 3 ? correct_circle : stepNumber == 3 ? circle_filled : empty_circle}
                                alt="Accredited Logo"
                                className="h-[20px] w-[20px] rounded-[5px] object-cover"
                            />
                            <div
                                style={
                                    stepNumber > 3 ?
                                        {
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        } : {}
                                }
                                className="absolute top-[100%] left-1/2 transform -translate-x-1/2 text-white-a700 mt-2 text-nowrap">
                                Finish
                            </div>
                        </div>
                    </div>

                    {/* <p>
                        Step {stepNumber + 1} of {totalSteps}
                    </p> */}
                    {step}
                    <div
                        className={`flex gap-[1rem] w-full mt-[40px]`}
                    >
                        {stepNumber > 0 && (
                            <>
                                <Button
                                    shape="square"
                                    variant={`outline`}
                                    color={`white_A700`}
                                    className="w-1/2 self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                    type="button"
                                    onClick={() => previous(formik.values)}
                                >
                                    Back
                                </Button>
                            </>
                        )}
                        <Button
                            shape="square"
                            color="brand_color_0_green_800"
                            className={`${stepNumber > 0 ? 'w-1/2' : 'w-full'} self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]`}
                            disabled={formik.isSubmitting}
                            type="submit"
                        >
                            {isLastStep ? 'Approve' : 'Next'}
                        </Button>
                    </div>
                    {/* <Debug /> */}
                </Form>
            )}
        </Formik>
    );
};

const WizardStep = ({ children }) => {
    const formik = useFormikContext();  // Access Formik context here

    return (
        <div>
            {/* You can access formik object here */}

            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { formik });
                }
                return child;
            })}
        </div>
    );
};

function CreateSTOModel(props) {
    const { onClose } = props
    const { sendTransactionAsync } = useSendTransaction();
    const publicClient = usePublicClient({ config: config });
    const currentChainId = useChainId()
    // console.log("currentChainId", currentChainId)
    const [fileLoader, setFileLoader] = useState(false);
    const [formLoader, setFormLoader] = useState(false);

    const [fileDisplayName, setFileDisplayName] = useState("");

    const ModelHeader = () => (
        <div className="flex items-center justify-center">
            <div className="flex flex-1 items-center gap-[1.25rem]">
                <Heading
                    size="heading4xl"
                    as="h4"
                    className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                >
                    Create WERC20
                </Heading>
            </div>
            <Button
                style={{ padding: "0", height: "auto" }}
                onClick={() => onClose()}
            >
                <Img
                    src={img_close_md_svgrepo_com}
                    alt="Close Image"
                    className="h-[1.50rem] w-[1.50rem]"
                />
            </Button>
        </div>
    )

    return (
        <>
            {/* <LoaderComponent /> */}
            <ModelComponent
                closeModal={() => onClose()}
                isLoader={formLoader}
            >
                <div className="min-w-[600px] mt-[6.75rem] flex w-full flex-col items-end gap-[5.13rem] self-end md:gap-[3.81rem] md:self-auto sm:gap-[2.56rem]">
                    <div
                        // style={{ background: "#999" }}
                        className="w-full border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">

                        <ModelHeader />

                        <div className="formBody">
                            <Wizard
                                initialValues={getFieldNames(createSTOJson)}
                                onSubmit={async values => {
                                    setFormLoader(true);
                                    let apiData = {
                                        "rwaTokenAddress": values?.rwaAddress,
                                        "spender": STO_FACTORY_ADDRESS,
                                        "amount": parseUnits(values?.tokenAmount, values?.decimalOfRWAAsset).toString()
                                    }

                                    let createSTOApiData = {
                                        "rwaToken": values?.rwaAddress,
                                        "stoTokenName": values?.STOTokenName,
                                        "stoTokenSymbol": values?.STOTokenSymbol,
                                        "initialSupply": parseUnits(values?.tokenAmount, values?.decimalOfRWAAsset).toString(),
                                        "country": values?.country,
                                        "issuer": values?.issuer,
                                        "issuanceDate": values?.issuanceDateTimestamp,
                                        "industry": values?.industry,
                                        "companyWebsite": values?.companyWebsite,
                                        "description": values?.description,
                                        "stoImage": values?.stoImage
                                    }

                                    RWATokenApproveHandler(apiData).then((approveAPIRes) => {
                                        if (approveAPIRes?.success) {
                                            // console.log(approveAPIRes?.data)
                                            sendTransactionAsync(approveAPIRes?.data).then((contractApproveRes) => {
                                                // console.log("contractApproveRes", contractApproveRes)

                                                publicClient.waitForTransactionReceipt({ hash: contractApproveRes }).then((transactionReceipt) => {

                                                    if (transactionReceipt?.status === "success") {

                                                        createSTOHandler(createSTOApiData).then((createSTOAPIRes) => {
                                                            // console.log("createSTOAPIRes", createSTOAPIRes)
                                                            sendTransactionAsync(createSTOAPIRes?.data).then((contractCreateSTORes) => {
                                                                toast.success(createSTOAPIRes?.message)
                                                                // console.log("contractCreateSTORes", contractCreateSTORes)
                                                                setFormLoader(false);
                                                                onClose()
                                                            }).catch((error) => {
                                                                setFormLoader(false)
                                                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                                                console.log("contractCreateSTORes error", error)
                                                            })
                                                        })

                                                    }

                                                    // console.log("transactionReceipt", transactionReceipt)
                                                }).catch((error) => {
                                                    setFormLoader(false)
                                                    toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                                    console.log("transactionReceipt error", error)
                                                })

                                            }).catch((error) => {
                                                setFormLoader(false)
                                                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                                console.log("contractApproveRes error", error)
                                            })
                                        }
                                    }).catch((error) => {
                                        setFormLoader(false)
                                    })
                                }}
                            >

                                {createSTOJson?.map((step, index) => (

                                    <WizardStep
                                        key={index}
                                        onSubmit={() => console.log('Step1 onSubmit')}
                                        validationSchema={step.validationSchema}
                                    >

                                        <div className="flex items-center pb-[24px]">
                                            <Heading size="heading4xl" as="h4" className="text-[20px] font-bold text-white-a700 md:text-[1.38rem]">
                                                {step?.title}
                                            </Heading>
                                        </div>

                                        <div className="flex flex-col w-full gap-[20px]">
                                            {step.fields?.map((field, index) => {

                                                return (
                                                    <div
                                                        className={`flex w-full gap-[16px] 
                                                        ${field.row.length === 2 ? 'flex-row' : 'flex-col'}
                                                        ${field?.hidden ? 'hidden' : ''}
                                                        `}
                                                        key={`${step?.title}${index}`}
                                                    >

                                                        <FormikConsumer>
                                                            {formik => field.row?.map((row, indexj) => {

                                                                let {
                                                                    type,
                                                                    className,
                                                                    id,
                                                                    name,
                                                                    label,
                                                                    placeholder,
                                                                    options,
                                                                    disabled,
                                                                    fileType,
                                                                    optionsAPI,
                                                                    dynamicOptions,
                                                                    loader,
                                                                    displayName,
                                                                } = row

                                                                const handleChange = (e) => {
                                                                    // console.log("e", e)

                                                                    if (type !== "dropdown") {
                                                                        const { value } = e.target;
                                                                        // console.log(name, "name")
                                                                        if (name === "rwaAddress" && isAddress(value)) {
                                                                            console.log(isAddress(value))
                                                                            formik.setFieldValue(name, value);
                                                                            let apiData = { rwaTokenAddress: value }

                                                                            getRWATokenDetailHandler(apiData).then(result => {
                                                                                console.log("result", result)
                                                                                formik.setFieldValue("nameOfAsset", result?.nameOfAsset);
                                                                                formik.setFieldValue("symbolOfAsset", result?.symbolOfAsset);
                                                                                formik.setFieldValue("decimalOfRWAAsset", result?.decimalOfRWAAsset);

                                                                            })
                                                                        } else if (name === "rwaAddress" && !isAddress(value)) {
                                                                            formik.setFieldValue(name, value);
                                                                            formik.setFieldValue("nameOfAsset", "");
                                                                            formik.setFieldValue("symbolOfAsset", "");
                                                                            formik.setFieldValue("decimalOfRWAAsset", "");

                                                                        } else if (name === "stoImage") {
                                                                            if (e.target?.delete) {
                                                                                formik.setFieldValue(name, "")
                                                                                setFileDisplayName("");
                                                                            } else {
                                                                                const file = e.target.files[0];
                                                                                console.log("file", file)
                                                                                if (file) {
                                                                                    setFileLoader(true);
                                                                                    // console.log("loader", loader)
                                                                                    console.log("row", row)
                                                                                    const formData = new FormData();
                                                                                    formData.append("media", file);
                                                                                    uploadFileToPinataHandler(formData).then(result => {
                                                                                        formik.setFieldValue(name, result[0]);
                                                                                        setFileDisplayName(file?.name);
                                                                                        setFileLoader(false);
                                                                                    }).catch((error) => {
                                                                                        setFileLoader(false);
                                                                                        toast.error(error?.message ?? "Something went wrong!")
                                                                                    })
                                                                                }
                                                                            }
                                                                        } else if (name === "tokenAmount") {
                                                                            let decimalOfRWAAsset = formik.values["decimalOfRWAAsset"];

                                                                            formik.setFieldValue("tokenAmount", value);

                                                                        } else if (type === "dateTime") {
                                                                            formik.setFieldValue(name, value);
                                                                            let timeStamp = value === "" ? "" : moment(value).unix()
                                                                            formik.setFieldValue("issuanceDateTimestamp", timeStamp);
                                                                        } else {
                                                                            formik.setFieldValue(name, value);
                                                                        }
                                                                    } else if (type === "dropdown") {
                                                                        formik.setFieldValue(name, e.value);
                                                                        console.log("dropdown", e.value)
                                                                    }
                                                                }

                                                                return (
                                                                    <div className="flex w-full" key={`${index}-${indexj}`}>
                                                                        <FormFields
                                                                            type={type}
                                                                            className={className}
                                                                            id={id}
                                                                            name={name}
                                                                            label={label}
                                                                            placeholder={placeholder}
                                                                            options={options}
                                                                            onChange={handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values[name]}
                                                                            disabled={disabled}
                                                                            fileType={fileType}
                                                                            optionsAPI={optionsAPI}
                                                                            isDynamicOptions={dynamicOptions}
                                                                            loader={fileLoader}
                                                                            displayName={fileDisplayName}
                                                                        />
                                                                    </div>
                                                                )
                                                            })}
                                                        </FormikConsumer>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </WizardStep>
                                ))}
                            </Wizard>
                        </div>
                    </div>

                </div>
            </ModelComponent>
        </>
    )
}

export default CreateSTOModel
