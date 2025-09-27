import { circle_filled, correct_circle, empty_circle, img_close_md_svgrepo_com } from "assets/images";
import { Button, Heading, Img, ModelComponent } from "components"
import { Form, Formik, FormikConsumer, useFormikContext } from "formik";
import React, { useState } from "react";
import ListSTOTokenInfo from "./tokenInfo";
import { Debug } from "components/Forms/formikDebug";
import { ERC20TokenApproveHandler } from "services/ercTokens/ercApiFunctions";
import { LAUNCHPAD_CONTRACT_ADDRESS } from "data/constant";
import { parseUnits } from "viem";
import { useAccount, usePublicClient, useSendTransaction } from "wagmi";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { listSTOApiFunction } from "services/launchpad/launchpadApiFunctions";
import { uploadJsonToPinata } from "services/pinata";
import { handleResponse } from "services/apiConfig";
import { config } from "providers/WalletConnectProvider";
import ListSTOTokenomics from "./tokenomics";
import ListSTOTimeline from "./timeline";

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

    const stepTitle = () => {
        switch (stepNumber) {
            case 0:
                return 'Token Launch Details';
            case 1:
                return 'Secondary Tokenomics';
            case 2:
                return 'Timeline';
            default:
                return '';
        }
    }

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {formik => (
                <Form>

                    <div className="w-full pl-[4rem] pr-[1.5rem] pt-[2.5rem] flex pb-[60px] items-center relative">
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
                                Token Launch Details
                            </div>
                        </div>

                        <hr className="flex-1 mx-[0.75rem] border-[#212129]" />

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
                                Tokenomics
                            </div>
                        </div>

                        <hr className="flex-1 mx-[0.75rem] border-[#212129]" />

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
                                Timeline
                            </div>
                        </div>
                        {/* <hr className="flex-1 mx-[0.75rem] border-[#212129]" />
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
                        </div> */}
                    </div>

                    {/* <p>
                        Step {stepNumber + 1} of {totalSteps}
                    </p> */}
                    <Heading
                        size="heading3xl"
                        as="h5"
                        className="mb-[1.25rem] self-start !text-[1.25rem] font-semibold text-white-a700"
                    >
                        {stepTitle()}
                    </Heading>

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

function ListSTOModel(props) {
    const { onClose, onSuccess } = props

    const [formLoader, setFormLoader] = useState(false);


    const publicClient = usePublicClient({ config: config });
    const { sendTransactionAsync } = useSendTransaction()
    const { address: currentWalletAddress } = useAccount();

    const ModelHeader = () => (
        <div className="flex items-center justify-center mb-[1.5rem]">
            <div className="flex flex-1 items-center gap-[1.25rem]">
                <Heading
                    size="heading4xl"
                    as="h4"
                    className="text-[1.50rem] font-bold text-white-a700 md:text-[1.38rem]"
                >
                    List Token
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

    const listSTOHandler = async (data) => {
        setFormLoader(true)

        let stoAmount = (data?.hardCap * data?.tokenPriceStoToken) / data?.tokenPriceBaseToken;
        console.log(stoAmount)
        let erc20ApproveApiData = {
            tokenAddress: data?.stoToken,
            spender: LAUNCHPAD_CONTRACT_ADDRESS,
            amount: parseUnits((stoAmount).toString(), data?.stoTokenDecimal).toString()
        }
        ERC20TokenApproveHandler(erc20ApproveApiData).then((erc20TokenApproveApiRes) => {
            console.log("erc20TokenApproveApiRes", erc20TokenApproveApiRes)
            sendTransactionAsync(erc20TokenApproveApiRes?.data).then((erc20TokenContractApproveRes) => {
                console.log("erc20TokenContractApproveRes", erc20TokenContractApproveRes)

                publicClient.waitForTransactionReceipt({ hash: erc20TokenContractApproveRes }).then((transactionReceipt) => {
                    if (transactionReceipt?.status === "success") {

                        let apiOverviewData = {
                            data: {
                                overview: data?.overview,
                                title: data?.launchpadTitle
                            }
                        }
                        uploadJsonToPinata(apiOverviewData).then((apiOverviewDataRes) => {
                            const uploadJsonToPinataAPIRes = handleResponse(apiOverviewDataRes)
                            console.log("uploadJsonToPinataAPIRes", uploadJsonToPinataAPIRes)

                            // list STO 
                            let listSTOApiData = {
                                stoAddress: data?.stoToken,
                                baseAddress: data?.baseToken,
                                image: data?.launchpadImage,
                                softCap: parseUnits((data?.softCap).toString(), data?.baseTokenDecimal).toString(),
                                hardCap: parseUnits((data?.hardCap).toString(), data?.baseTokenDecimal).toString(),
                                minInvestment: parseUnits((data?.minInvestment).toString(), data?.baseTokenDecimal).toString(),
                                maxInvestment: parseUnits((data?.maxInvestment).toString(), data?.baseTokenDecimal).toString(),
                                startTime: data?.startTimeTimestamp,
                                endTime: data?.endTimeTimestamp,
                                tokenClaimTime: data?.tokenClaimTimeTimestamp,
                                tokenPriceStoToken: data?.tokenPriceStoToken,
                                tokenPriceBaseToken: data?.tokenPriceBaseToken,
                                owner: currentWalletAddress,
                                overview: uploadJsonToPinataAPIRes?.data,
                                companyWebsite: data?.companyWebsite,
                                issuer: data?.issuer,
                                country: data?.country,
                                industry: data?.industry,
                                investmentType: data?.investmentType
                                // amount: parseUnits((stoAmount).toString(), data?.stoTokenDecimal).toString()
                            }
                            listSTOApiFunction(listSTOApiData).then((listSTOApiDataApiRes) => {

                                sendTransactionAsync(listSTOApiDataApiRes?.data).then((listSTOApiDataApiResContractRes) => {
                                    console.log("listSTOApiDataApiResContractRes", listSTOApiDataApiResContractRes)

                                    publicClient.waitForTransactionReceipt({ hash: listSTOApiDataApiResContractRes }).then((transactionReceipt) => {
                                        if (transactionReceipt?.status === "success") {
                                            toast.success(listSTOApiDataApiRes?.message)
                                            setFormLoader(false)
                                            onSuccess()
                                            onClose()
                                        }
                                    })
                                }).catch((error) => {
                                    setFormLoader(false)
                                    toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                                    console.log("listSTOApiDataApiResContractRes error", error)
                                })

                            })

                        }).catch((error) => {
                            setFormLoader(false)
                            // toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                            console.log("uploadJsonToPinata error", error)
                        })

                    }
                })
            }).catch((error) => {
                setFormLoader(false)
                toast.error((error?.shortMessage || error?.message) ?? "Something went wrong!")
                console.log("erc20TokenApproveApiRes error", error)
            })
        })

        console.log("listSTOHandler", erc20ApproveApiData)
        // console.log("listSTOHandler")
    }

    return (
        <>
            {/* <LoaderComponent /> */}
            <ModelComponent
                closeModal={() => onClose()}
                isLoader={formLoader}
            >
                <div className="min-w-[600px] max-w-[600px] flex w-full flex-col items-end gap-[5.13rem] self-end md:gap-[3.81rem] md:self-auto sm:gap-[2.56rem]">
                    <div
                        // style={{ background: "#999" }}
                        className="w-full border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">

                        <ModelHeader />

                        <div className="formBody">
                            <Wizard
                                initialValues={{
                                    stoToken: "",
                                    stoTokenDecimal: "",
                                    stoTokenBalance: "",
                                    baseToken: "",
                                    baseTokenDecimal: "",
                                    baseTokenBalance: "",
                                    launchpadImage: "",
                                    launchpadTitle: "",
                                    softCap: "",
                                    hardCap: "",
                                    minInvestment: "",
                                    maxInvestment: "",
                                    startTime: "",
                                    startTimeTimestamp: "",
                                    endTime: "",
                                    endTimeTimestamp: "",
                                    tokenClaimTime: "",
                                    tokenClaimTimeTimestamp: "",
                                    tokenPriceStoToken: "",
                                    tokenPriceBaseToken: "",
                                    issuer: "",
                                    country: "",
                                    investmentType: "",
                                    industry: "",
                                    overview: "",
                                    companyWebsite: "",
                                }}
                                onSubmit={values => {
                                    console.log("Wizard submit", values);
                                    listSTOHandler(values)
                                }}
                            >
                                <WizardStep
                                    onSubmit={() => console.log('Step1 onSubmit')}
                                    validationSchema={
                                        Yup.object({
                                            launchpadTitle: Yup.string().required('Title is required').test('not-empty', 'Title is required', value => value && value.trim() !== ''),
                                            launchpadImage: Yup.string().required('Launchpad image is required').test('not-empty', 'Launchpad image is required', value => value && value.trim() !== ''),
                                            issuer: Yup.string().required('Issuer is required').test('not-empty', 'Issuer is required', value => value && value.trim() !== ''),
                                            country: Yup.string().required('Country is required').test('not-empty', 'Country is required', value => value && value.trim() !== ''),
                                            investmentType: Yup.string().required('Investment type is required').test('not-empty', 'Investment type is required', value => value && value.trim() !== ''),
                                            industry: Yup.string().required('Launchpad image is required').test('not-empty', 'Launchpad image is required', value => value && value.trim() !== ''),
                                            overview: Yup.string().required('Launchpad image is required').test('not-empty', 'Launchpad image is required', value => value && value.trim() !== ''),
                                            companyWebsite: Yup.string().required('Launchpad image is required').test('not-empty', 'Launchpad image is required', value => value && value.trim() !== '')
                                        })
                                    }
                                >
                                    <FormikConsumer>
                                        {formik => {
                                            return (
                                                <ListSTOTokenInfo
                                                    formik={formik}
                                                />
                                            )
                                        }}
                                    </FormikConsumer>
                                </WizardStep>
                                <WizardStep
                                    onSubmit={() => console.log('Step2 onSubmit')}
                                    validationSchema={
                                        Yup.object({
                                            stoToken: Yup.string()
                                                .required('Wrapped token address is required')
                                                .test('not-empty', 'Wrapped token address is required', value => value && value.trim() !== ''),

                                            baseToken: Yup.string()
                                                .required('Base token address is required')
                                                .test('not-empty', 'Base token address is required', value => value && value.trim() !== ''),

                                            hardCap: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .required('Hard cap is required'),

                                            softCap: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .max(Yup.ref('hardCap'), 'Value should not be greater than your hard cap')
                                                .required('Soft cap is required'),

                                            maxInvestment: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .max(Yup.ref('hardCap'), 'Value should not be greater than your hard cap')
                                                .required('Maximum investment is required'),

                                            minInvestment: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .max(Yup.ref('maxInvestment'), 'Value should not be greater than your Maximum investment')
                                                .required('Minimum investment is required'),

                                            tokenPriceStoToken: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .required('Wrapped Token Price is required'),

                                            tokenPriceBaseToken: Yup.number()
                                                .min(1, 'Value must be greater than 0')
                                                .required('Base Token Price is required'),

                                        })
                                    }
                                >
                                    <FormikConsumer>
                                        {formik => {
                                            return (
                                                <ListSTOTokenomics
                                                    formik={formik}
                                                />
                                            )
                                        }}
                                    </FormikConsumer>
                                </WizardStep>

                                <WizardStep
                                    onSubmit={() => console.log('Step3 onSubmit')}
                                    validationSchema={
                                        Yup.object({
                                            startTime: Yup.date()
                                                .required('Date is required'),

                                            endTime: Yup.date()
                                                .required('Date is required')
                                                .test('is-endTime-after-startTime', 'End time must be greater than start time', function (value) {
                                                    const { startTime } = this.parent;
                                                    return value && startTime ? value > startTime : true;
                                                }),

                                            tokenClaimTime: Yup.date()
                                                .required('Date is required')
                                                .test('is-tokenClaimTime-after-endTime', 'Token claim time must be greater than end time', function (value) {
                                                    const { endTime } = this.parent;
                                                    return value && endTime ? value > endTime : true;
                                                }),

                                        })
                                    }
                                >
                                    <FormikConsumer>
                                        {formik => {
                                            return (
                                                <ListSTOTimeline
                                                    formik={formik}
                                                />
                                            )
                                        }}
                                    </FormikConsumer>
                                </WizardStep>
                            </Wizard>
                        </div>

                    </div>
                </div>
            </ModelComponent >
        </>
    )
}

export default ListSTOModel