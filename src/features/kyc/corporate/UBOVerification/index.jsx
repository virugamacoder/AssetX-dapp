import { Button, CheckBox, Img, RadioBox, Text } from 'components'
import TextInput from 'components/Forms/textInput'
import React, { useState } from 'react'
import { sourceofFundsCheckboxList } from './UBOVerificationFormConfig'
import Dropdown from 'components/Forms/dropDown'
import FileUpload from 'components/Forms/fileUpload'
import { uploadFileToPinataHandler } from 'features/securityTokens/createSTO/apiFunctions'
import { FieldArray } from 'formik'
import { circle_empty, circle_filled, img_delete } from 'assets/images'

function UBOVerificationCorporateKYC(props) {
    const { formik } = props

    const [corporateDocFileLoader, setCorporateDocFileLoader] = useState(false);
    const [corporateDocFileDisplayName, setCorporateDocFileDisplayName] = useState("");

    const [additionalDocFileLoader, setAdditionalDocFileLoader] = useState(false);
    const [additionalDocFileDisplayName, setAdditionalDocFileDisplayName] = useState("");

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className='flex flex-col gap-[0.75rem]'>
                <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Source of Funds</label>
                <div className={`border border-gray-900_02 p-[1.25rem]`}>
                    <div className={`grid grid-cols-3 gap-[1.25rem]`}>
                        {sourceofFundsCheckboxList.map((item, index) => (
                            <CheckBox
                                key={`sourceofFundsCheckboxList-${index}`}
                                name="Purchase Agreement Checkbox"
                                label={item?.name}
                                id={item?.id}
                                className="gap-[0.75rem] text-left text-[0.875rem] font-medium leading-[1.31rem] text-brand_color-1"
                                checkBoxClassNames="border border-gray-900_02 bg-transparent"
                            />
                        ))}
                    </div>
                    <div className="w-full mt-[1.25rem]">
                        <TextInput
                            name="sourceofFundsDescription"
                            placeholder="Lorem Ipsum is simply dummy"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sourceofFundsDescription}
                        />
                    </div>
                </div>
            </div>

            <div className={`flex flex-col gap-[0.75rem]`}>
                <div className={`flex items-center justify-between`}>
                    <label className={`text-[0.875rem] font-medium text-brand_color-1`}>FATCA</label>
                    <label className={`text-[0.625rem] font-medium text-brand_color-1`}>Declaration of US Citizenship or US residence for FATCA</label>
                </div>
                <div className={`border border-gray-900_02 p-[1.25rem]`}>
                    <div className={`flex flex-col gap-[.75rem]`}>
                        <div className="flex gap-[0.625rem] w-full cursor-pointer"
                            onClick={() => formik.setFieldValue('isItUSEntity', true)}
                        >
                            {formik.values.isItUSEntity ?
                                <Img src={circle_filled} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                                :
                                <Img src={circle_empty} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                            }
                            <Text
                                size="text_14px_regular"
                                as="p"
                                className={`self-end font-inter text-[0.88rem] !font-medium ${formik.values.isItUSEntity ? `text-white-a700` : ``} `}
                            >
                                I confirm that the entity is in the US for tax purposes and its US federal
                                taxpayer ID number (US TIN) is as follows:
                            </Text>
                        </div>
                        {formik.values.isItUSEntity &&
                            <div className="w-full">
                                <TextInput
                                    name="tinNumber"
                                    placeholder="8503752848723"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tinNumber}
                                />
                            </div>
                        }
                        <div
                            className="flex gap-[0.625rem] mt-[0.5rem] w-full cursor-pointer"
                            onClick={() => formik.setFieldValue('isItUSEntity', false)}
                        >
                            {!formik.values.isItUSEntity ?
                                <Img src={circle_filled} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                                :
                                <Img src={circle_empty} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                            }
                            <Text
                                size="text_14px_regular"
                                as="p"
                                className={`self-end font-inter text-[0.88rem] !font-medium ${!formik.values.isItUSEntity ? `text-white-a700` : ``}`}
                            >
                                I confirm that the entity is not resident in the US for tax purposes
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            {!formik.values.isItUSEntity &&
                <div className={`flex flex-col gap-[0.75rem]`}>
                    <div className={`flex items-center justify-between`}>
                        <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Tax Declaration</label>
                    </div>
                    <div className={`border flex flex-col border-gray-900_02 gap-[0.75rem] p-[1.25rem]`}>
                        <div className="flex w-full gap-[1.5rem]">
                            <div className="w-1/2">
                                <Dropdown
                                    name="taxDeclarationCountryOfIncorporation"
                                    label="Country of Incorporation"
                                    id="taxDeclarationCountryOfIncorporation"
                                    placeholder="Select Corporate Type"
                                    options={[]}
                                    optionsAPI={`/contract/sto/get-country`}
                                    isDynamicOptions={true}
                                    onChange={(e) => formik.setFieldValue('taxDeclarationCountryOfIncorporation', e.value)}
                                    value={formik.values.taxDeclarationCountryOfIncorporation}
                                    className="border border-gray-900_02 !text-[1rem]"
                                />
                            </div>
                            <div className="w-1/2">
                                <TextInput
                                    label="Tax Indentification Number"
                                    name="taxDeclarationTIN"
                                    placeholder="Tax Indentification Number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.taxDeclarationTIN}
                                />
                            </div>
                        </div>
                        <div className="flex w-full pt-[0.375rem]">
                            <CheckBox
                                // key={`sourceofFundsCheckboxList-${index}`}
                                name="isTINAvailable"
                                label={`TIN Is Not Available`}
                                // id={item?.id}
                                className="gap-[0.75rem] text-left text-[0.875rem] font-medium leading-[1.31rem] text-brand_color-1"
                                onChange={(e) => formik.setFieldValue('isTINAvailable', e)}
                                checkBoxClassNames="border border-gray-900_02 bg-transparent"
                            />
                        </div>
                        {formik.values.isTINAvailable &&
                            <div className="flex w-full">
                                <TextInput
                                    name="isTINAvailableDescription"
                                    placeholder="reason"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.isTINAvailableDescription}
                                />
                            </div>}
                    </div>
                </div>
            }

            {/* Add Beneficiary */}
            <div className={`flex flex-col gap-[0.75rem]`}>
                <div className={`flex items-center justify-between`}>
                    <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Beneficial Owners Information</label>
                    <label className={`text-[0.625rem] font-medium text-brand_color-1`}>Info with more than 10% Beneficial Interest</label>
                </div>

                <FieldArray name="beneficiary">
                    {({ insert, remove, push }) => {

                        return (
                            <>
                                {formik?.values.beneficiary.map((beneficiaryItem, index) => {

                                    return (
                                        <div
                                            key={`beneficiaryItem-${index}`}
                                            className={`relative border flex flex-col gap-[1rem] border-gray-900_02 p-[1.25rem]`}
                                        >
                                            {index !== 0 &&
                                                <Button
                                                    style={{ padding: "0", height: "auto" }}
                                                    onClick={() => remove(index)}
                                                    type="button"
                                                    className={`absolute top-[0.75rem] right-[0.75rem]`}
                                                >
                                                    <Img src={img_delete} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                                                </Button>
                                            }
                                            <div className="flex w-full gap-[1.5rem]">
                                                <div className="w-1/2">
                                                    <TextInput
                                                        label="Full Name"
                                                        name={`beneficiary.${index}.fullName`}
                                                        placeholder="Gene Bullington"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.beneficiary[index].fullName}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <TextInput
                                                        label="Nationality"
                                                        name={`beneficiary.${index}.nationality`}
                                                        placeholder="U.S. citizen"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.beneficiary[index].nationality}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full gap-[1.5rem]">
                                                <div className="w-1/2">
                                                    <TextInput
                                                        type="date"
                                                        label="Birthdate"
                                                        name={`beneficiary.${index}.birthdate`}
                                                        placeholder="Gene Bullington"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.beneficiary[index].birthdate}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <TextInput
                                                        label="Address"
                                                        name={`beneficiary.${index}.address`}
                                                        placeholder="3949 McKinley Avenue"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.beneficiary[index].address}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full">
                                                <TextInput
                                                    label="% Beneficial Ownership"
                                                    prefix={`%`}
                                                    name={`beneficiary.${index}.beneficialOwnership`}
                                                    placeholder="20"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.beneficiary[index].beneficialOwnership}
                                                />
                                            </div>
                                            <div className="flex w-full gap-[1.5rem]">
                                                <FileUpload
                                                    label={`Proof of Identity`}
                                                    name={`beneficiary.${index}.beneficiaryProofOfImage`}
                                                    fileType={`image/png, image/jpeg`}
                                                    displayName={formik.values.beneficiary[index].proofOfIdentityName}
                                                    loader={formik.values.beneficiary[index].proofOfIdentityLoader}
                                                    value={formik.values.beneficiary[index].beneficiaryProofOfImage}
                                                    type={`file`}
                                                    onChange={(e) => {
                                                        if (e.target?.delete) {
                                                            formik.setFieldValue(`beneficiary[${index}].beneficiaryProofOfImage`, "")
                                                            formik.setFieldValue(`beneficiary[${index}].proofOfIdentityName`, "")
                                                            // proofOfIdentityName[index] = "";
                                                        } else {
                                                            const file = e.target.files[0];
                                                            // console.log("file", file)
                                                            if (file) {
                                                                formik.setFieldValue(`beneficiary[${index}].proofOfIdentityLoader`, true);

                                                                // console.log("loader", loader)
                                                                const formData = new FormData();
                                                                formData.append("media", file);
                                                                uploadFileToPinataHandler(formData).then(result => {
                                                                    formik.setFieldValue(`beneficiary[${index}].beneficiaryProofOfImage`, result[0]);
                                                                    formik.setFieldValue(`beneficiary[${index}].proofOfIdentityName`, file?.name);
                                                                    // proofOfIdentityName[index] = file?.name;

                                                                    formik.setFieldValue(`beneficiary[${index}].proofOfIdentityLoader`, false);
                                                                }).catch((error) => {
                                                                    formik.setFieldValue(`beneficiary[${index}].proofOfIdentityLoader`, false);
                                                                    toast.error(error?.message ?? "Something went wrong!")
                                                                })
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                                <Button
                                    style={{ background: `conic-gradient(var(--gradient5_12))`, }}
                                    shape="square"
                                    color="brand_color_0_green_800"
                                    className={`w-full items-center self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] text-[0.813rem] !h-[2.5rem]`}
                                    // disabled={formik.isSubmitting}
                                    type="button"
                                    onClick={() => push({
                                        fullName: '',
                                        nationality: '',
                                        birthdate: '',
                                        address: '',
                                        beneficialOwnership: '',
                                        beneficiaryProofOfImage: '',
                                    })}
                                >
                                    <div
                                        style={{
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        }}
                                        className='flex items-center gap-[0.5rem]'
                                    >
                                        <span className="mb-[4px] text-[1.2rem]">+</span>
                                        <span className="">Add Beneficiary</span>
                                    </div>
                                </Button>
                            </>
                        )

                    }}
                </FieldArray>
            </div>
            {/* ***** Add Beneficiary */}


            {/* Add CorporateMember */}
            <div className={`flex flex-col gap-[0.75rem]`}>
                <div className={`flex items-center justify-between`}>
                    <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Directors / Officers / Managers Information</label>
                </div>

                <FieldArray name="corporateMember">
                    {({ insert, remove, push }) => {

                        return (
                            <>
                                {formik?.values.corporateMember.map((corporateMemberItem, index) => {

                                    return (
                                        <div
                                            key={`corporateMemberItem-${index}`}
                                            className={`relative border flex flex-col gap-[1rem] border-gray-900_02 p-[1.25rem]`}
                                        >
                                            {index !== 0 &&
                                                <Button
                                                    style={{ padding: "0", height: "auto" }}
                                                    onClick={() => remove(index)}
                                                    type="button"
                                                    className={`absolute top-[0.75rem] right-[0.75rem]`}
                                                >
                                                    <Img src={img_delete} alt="Close Icon" className="h-[1.25rem] w-[1.25rem]" />
                                                </Button>
                                            }
                                            <div className="flex w-full">
                                                <TextInput
                                                    label="Full Name"
                                                    name={`corporateMember.${index}.fullName`}
                                                    placeholder="Gene Bullington"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.corporateMember[index].fullName}
                                                />
                                            </div>
                                            <div className="flex w-full gap-[1.5rem]">
                                                <div className="w-1/2">
                                                    <TextInput
                                                        label="Nationality"
                                                        name={`corporateMember.${index}.nationality`}
                                                        placeholder="U.S. citizen"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.corporateMember[index].nationality}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <TextInput
                                                        label="Designation"
                                                        name={`corporateMember.${index}.designation`}
                                                        placeholder="Sr. Manager"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.corporateMember[index].designation}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full gap-[1.5rem]">
                                                <FileUpload
                                                    label={`Proof of Identity`}
                                                    name={`corporateMember.${index}.corporateMemberProofOfImage`}
                                                    fileType={`image/png, image/jpeg`}
                                                    displayName={formik.values.corporateMember[index].proofOfIdentityName}
                                                    loader={formik.values.corporateMember[index].proofOfIdentityLoader}
                                                    value={formik.values.corporateMember[index].corporateMemberProofOfImage}
                                                    type={`file`}
                                                    onChange={(e) => {
                                                        if (e.target?.delete) {
                                                            formik.setFieldValue(`corporateMember[${index}].corporateMemberProofOfImage`, "")
                                                            formik.setFieldValue(`corporateMember[${index}].proofOfIdentityName`, "")
                                                            // proofOfIdentityName[index] = "";
                                                        } else {
                                                            const file = e.target.files[0];
                                                            // console.log("file", file)
                                                            if (file) {
                                                                formik.setFieldValue(`corporateMember[${index}].proofOfIdentityLoader`, true);

                                                                // console.log("loader", loader)
                                                                const formData = new FormData();
                                                                formData.append("media", file);
                                                                uploadFileToPinataHandler(formData).then(result => {
                                                                    formik.setFieldValue(`corporateMember[${index}].corporateMemberProofOfImage`, result[0]);
                                                                    formik.setFieldValue(`corporateMember[${index}].proofOfIdentityName`, file?.name);
                                                                    // proofOfIdentityName[index] = file?.name;

                                                                    formik.setFieldValue(`corporateMember[${index}].proofOfIdentityLoader`, false);
                                                                }).catch((error) => {
                                                                    formik.setFieldValue(`corporateMember[${index}].proofOfIdentityLoader`, false);
                                                                    toast.error(error?.message ?? "Something went wrong!")
                                                                })
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                                <Button
                                    style={{ background: `conic-gradient(var(--gradient5_12))`, }}
                                    shape="square"
                                    color="brand_color_0_green_800"
                                    className={`w-full items-center self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] text-[0.813rem] !h-[2.5rem]`}
                                    // disabled={formik.isSubmitting}
                                    type="button"
                                    onClick={() => push({
                                        fullName: '',
                                        nationality: '',
                                        designation: '',
                                        corporateMemberProofOfImage: '',
                                        proofOfIdentityName: '',
                                        proofOfIdentityLoader: false,
                                    })}
                                >
                                    <div
                                        style={{
                                            background: `conic-gradient(var(--gradient5))`,
                                            backgroundClip: `text`,
                                            color: `transparent`,
                                        }}
                                        className='flex items-center gap-[0.5rem]'
                                    >
                                        <span className="mb-[4px] text-[1.2rem]">+</span>
                                        <span className="">Add Corporate Member</span>
                                    </div>
                                </Button>
                            </>
                        )

                    }}
                </FieldArray>
            </div>
            {/* ***** Add CorporateMember */}

            <div className={`flex flex-col gap-[0.75rem]`}>
                <div className={`flex items-center justify-between`}>
                    <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Corporate Documents</label>
                </div>
                <div className={`border flex flex-col border-gray-900_02 gap-[0.75rem] p-[1.25rem]`}>
                    <Text as="p" className="!text-[.75rem] !font-medium capitalize leading-[1.00rem] text-brand_color-1">
                        Certificate of Incorporation, Registration or Formation, Certificate of Good Standing, Memorandum and Articles of Association, Register of Shareholders, Directors, Managers and/or Officers, Board Resolution or Mandate authorizing the establishment of business relationship with AMM (Bahamas) Ltd, Partnership or Trust Agreement or Deed, or their respective equivalents.
                    </Text>

                    <div className="flex w-full">
                        <FileUpload
                            suffixLabelClasses={`text-[0.625rem] text-brand_color-1 font-medium`}
                            name="corporateDocProofOfImage"
                            fileType={`image/png, image/jpeg`}
                            displayName={corporateDocFileDisplayName}
                            loader={corporateDocFileLoader}
                            value={formik.values.corporateDocProofOfImage}
                            type={`file`}
                            onChange={(e) => {
                                if (e.target?.delete) {
                                    formik.setFieldValue('corporateDocProofOfImage', "")
                                    setCorporateDocFileDisplayName("");
                                } else {
                                    const file = e.target.files[0];
                                    console.log("file", file)
                                    if (file) {
                                        setCorporateDocFileLoader(true);
                                        // console.log("loader", loader)
                                        const formData = new FormData();
                                        formData.append("media", file);
                                        uploadFileToPinataHandler(formData).then(result => {
                                            formik.setFieldValue('corporateDocProofOfImage', result[0]);
                                            setCorporateDocFileDisplayName(file?.name);
                                            setCorporateDocFileLoader(false);
                                        }).catch((error) => {
                                            setCorporateDocFileLoader(false);
                                            toast.error(error?.message ?? "Something went wrong!")
                                        })
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={`flex flex-col gap-[0.75rem]`}>
                <div className={`flex items-center justify-between`}>
                    <label className={`text-[0.875rem] font-medium text-brand_color-1`}>Additional Documents</label>
                </div>
                <div className={`border flex flex-col border-gray-900_02 gap-[0.75rem] p-[1.25rem]`}>
                    <Text as="p" className="!text-[.75rem] !font-medium capitalize leading-[1.00rem] text-brand_color-1">
                        For Dexreal Launchpad Issuers and IDexreal DEX Applicants, please also enclose the most recent financial documents (balance sheet, P&L statement or Annual Returns), Certificate of Incumbency and Company Organization Chart showing Ownership Structure (signed copy). All documents must be dated within the last 3 months.
                    </Text>

                    <div className="flex w-full">
                        <FileUpload
                            suffixLabelClasses={`text-[0.625rem] text-brand_color-1 font-medium`}
                            name="additionalDocProofOfImage"
                            fileType={`image/png, image/jpeg`}
                            displayName={additionalDocFileDisplayName}
                            loader={additionalDocFileLoader}
                            value={formik.values.additionalDocProofOfImage}
                            type={`file`}
                            onChange={(e) => {
                                if (e.target?.delete) {
                                    formik.setFieldValue('additionalDocProofOfImage', "")
                                    setAdditionalDocFileDisplayName("");
                                } else {
                                    const file = e.target.files[0];
                                    console.log("file", file)
                                    if (file) {
                                        setAdditionalDocFileLoader(true);
                                        // console.log("loader", loader)
                                        const formData = new FormData();
                                        formData.append("media", file);
                                        uploadFileToPinataHandler(formData).then(result => {
                                            formik.setFieldValue('additionalDocProofOfImage', result[0]);
                                            setAdditionalDocFileDisplayName(file?.name);
                                            setAdditionalDocFileLoader(false);
                                        }).catch((error) => {
                                            setAdditionalDocFileLoader(false);
                                            toast.error(error?.message ?? "Something went wrong!")
                                        })
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UBOVerificationCorporateKYC
