import { building_round, circle_filled, correct_circle, empty_circle, img_arrow_down_brand_color_1, user_round } from 'assets/images';
import { Button, Heading, Img } from 'components';
import { Debug } from 'components/Forms/formikDebug';
import { CorporateInfoCorporateKYC, KycSubmitted, LegalRepresentativeCorporateKYC, UBOVerificationCorporateKYC } from 'features/kyc';
import { Form, Formik, FormikConsumer, useFormikContext } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
                return 'Corporate Information';
            case 1:
                return 'Legal Representative ';
            case 2:
                return 'UBO Verification';
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

                    <div className="min-w-[600px] w-full pl-[2.5rem] pr-[3.5rem] flex pb-[60px] items-center relative">
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
                                Corporate Info
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
                                Legal Representative
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
                                UBO Verification
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[600px] flex w-full flex-col items-end self-end md:gap-[3.81rem] md:self-auto sm:gap-[2.56rem]">
                        {!isLastStep ?
                            <>
                                <Heading
                                    size="heading3xl"
                                    as="h5"
                                    className="mb-[1.25rem] self-start !text-[1.25rem] font-semibold text-white-a700"
                                >
                                    {stepTitle()}
                                </Heading>

                                <div
                                    // style={{ background: "#999" }}
                                    className="w-full border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">

                                    {step}
                                    <div
                                        className={`flex gap-[1rem] w-full mt-[40px]`}
                                    >
                                        <Button
                                            shape="square"
                                            color="brand_color_0_green_800"
                                            className={`${stepNumber > 0 ? 'w-1/2' : 'w-full'} self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !h-[2.5rem]`}
                                            disabled={formik.isSubmitting}
                                            type="submit"
                                        >
                                            {isLastStep ? 'Submit' : 'Continue '}
                                        </Button>

                                        {stepNumber > 0 && (
                                            <>
                                                <Button
                                                    shape="square"
                                                    variant={`outline`}
                                                    color={`white_A700`}
                                                    className="w-1/2 self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !h-[2.5rem]"
                                                    type="button"
                                                    onClick={() => previous(formik.values)}
                                                >
                                                    Back
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                            :
                            <div className='w-full'>{step}</div>
                        }
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

function CorporateKYCPage() {

    const navigate = useNavigate()

    const FormHeader = () => (
        <div className="flex flex-1 items-center sm:self-stretch">
            <Button
                style={{ padding: "0", height: "auto" }}
                onClick={() => navigate(-1)}
            >
                <Img
                    src={img_arrow_down_brand_color_1}
                    alt="Arrow Down Three Image"
                    className="h-[1.50rem] w-[1.50rem]"
                />
            </Button>
            <div>

                <Img
                    src={building_round}
                    alt="Image Thirtyone"
                    className="ml-[1.75rem] w-[3.75rem] rounded-[36px] object-cover"
                />
            </div>
            <Heading
                size="heading5xl"
                as="h3"
                className="ml-[1.38rem] text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
            >
                Corporate KYC
            </Heading>
        </div>
    )

    return (
        <div className="w-[50%] mt-[3.75rem] flex flex-1 flex-col gap-[1.88rem] self-center md:self-stretch">
            <FormHeader />

            <Wizard
                initialValues={{
                    countryOfIncorporation: '',
                    corporateName: '',
                    registrationNumber: '',
                    typeofLegalEntity: '',
                    corporateAddress: '',
                    zipCode: '',
                    city: '',

                    // step 2
                    fullName: '',
                    designation: "",
                    emailAddress: "",
                    phoneNumber: "",
                    officialIDDocumentImage: "",
                    proofOfIdentityImage: "",

                    // step 3
                    sourceofFundsDescription: "",
                    isItUSEntity: true,
                    tinNumber: "",
                    taxDeclarationCountryOfIncorporation: "",
                    taxDeclarationTIN: "",
                    isTINAvailable: false,
                    isTINAvailableDescription: "",

                    beneficiary: [
                        {
                            fullName: '',
                            nationality: '',
                            birthdate: '',
                            address: '',
                            beneficialOwnership: '',
                            beneficiaryProofOfImage: '',
                            proofOfIdentityName: '',
                            proofOfIdentityLoader: false,
                        },
                    ],
                    corporateMember: [
                        {
                            fullName: '',
                            nationality: '',
                            designation: '',
                            corporateMemberProofOfImage: '',
                            proofOfIdentityName: '',
                            proofOfIdentityLoader: false,
                        },
                    ],
                    corporateDocProofOfImage: "",
                    additionalDocProofOfImage: ""
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >

                <WizardStep
                    onSubmit={() => console.log('Step1 onSubmit')}
                // validationSchema={step.validationSchema}
                >
                    <FormikConsumer>
                        {formik => {
                            return (
                                <CorporateInfoCorporateKYC
                                    formik={formik}
                                />
                            )
                        }}
                    </FormikConsumer>
                </WizardStep>

                <WizardStep
                    onSubmit={() => console.log('Step2 onSubmit')}
                // validationSchema={step.validationSchema}
                >
                    <FormikConsumer>
                        {formik => {
                            return (
                                <LegalRepresentativeCorporateKYC
                                    formik={formik}
                                />
                            )
                        }}
                    </FormikConsumer>
                </WizardStep>

                <WizardStep
                    onSubmit={() => console.log('Step3 onSubmit')}
                // validationSchema={step.validationSchema}
                >
                    <FormikConsumer>
                        {formik => {
                            return (
                                <UBOVerificationCorporateKYC
                                    formik={formik}
                                />
                            )
                        }}
                    </FormikConsumer>
                </WizardStep>

                <WizardStep
                    onSubmit={() => console.log('Step4 onSubmit')}
                >
                    <KycSubmitted
                        successMessage={`Corporate KYC Submitted Successfully`}
                    />
                </WizardStep>

            </Wizard>
        </div>
    )
}

export default CorporateKYCPage
