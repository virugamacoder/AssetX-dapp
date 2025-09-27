import FileUpload from 'components/Forms/fileUpload'
import TextInput from 'components/Forms/textInput'
import { uploadFileToPinataHandler } from 'features/securityTokens/createSTO/apiFunctions';
import React, { useState } from 'react'

function LegalRepresentativeCorporateKYC(props) {
    const { formik } = props

    const [fileLoader, setFileLoader] = useState(false);
    const [fileDisplayName, setFileDisplayName] = useState("");

    const [proofOfIdentityLoader, setProofOfIdentityLoader] = useState(false);
    const [proofOfIdentityName, setProofOfIdentityNameName] = useState("");

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Full Name"
                        name="fullName"
                        placeholder="Michael Bray"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Designation"
                        name="designation"
                        placeholder="Manager"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.designation}
                    />
                </div>
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Email Address"
                        name="emailAddress"
                        placeholder="michaelbray@mail.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.emailAddress}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="231 314 2689"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                </div>
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <FileUpload
                    name="officialIDDocumentImage"
                    fileType={`image/png, image/jpeg`}
                    displayName={fileDisplayName}
                    loader={fileLoader}
                    value={formik.values.officialIDDocumentImage}
                    type={`file`}
                    label={`Official ID Document`}
                    onChange={(e) => {
                        if (e.target?.delete) {
                            formik.setFieldValue('officialIDDocumentImage', "")
                            setFileDisplayName("");
                        } else {
                            const file = e.target.files[0];
                            console.log("file", file)
                            if (file) {
                                setFileLoader(true);
                                // console.log("loader", loader)
                                const formData = new FormData();
                                formData.append("media", file);
                                uploadFileToPinataHandler(formData).then(result => {
                                    formik.setFieldValue('officialIDDocumentImage', result[0]);
                                    setFileDisplayName(file?.name);
                                    setFileLoader(false);
                                }).catch((error) => {
                                    setFileLoader(false);
                                    toast.error(error?.message ?? "Something went wrong!")
                                })
                            }
                        }
                    }}
                />
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <FileUpload
                    label={`Official ID Document`}
                    suffixLabel={`(Passport, National ID, or Driving License)`}
                    suffixLabelClasses={`text-[0.625rem] text-brand_color-1 font-medium`}
                    name="proofOfIdentityImage"
                    fileType={`image/png, image/jpeg`}
                    displayName={proofOfIdentityName}
                    loader={proofOfIdentityLoader}
                    value={formik.values.proofOfIdentityImage}
                    type={`file`}
                    onChange={(e) => {
                        if (e.target?.delete) {
                            formik.setFieldValue('proofOfIdentityImage', "")
                            setProofOfIdentityNameName("");
                        } else {
                            const file = e.target.files[0];
                            console.log("file", file)
                            if (file) {
                                setProofOfIdentityLoader(true);
                                // console.log("loader", loader)
                                const formData = new FormData();
                                formData.append("media", file);
                                uploadFileToPinataHandler(formData).then(result => {
                                    formik.setFieldValue('proofOfIdentityImage', result[0]);
                                    setProofOfIdentityNameName(file?.name);
                                    setProofOfIdentityLoader(false);
                                }).catch((error) => {
                                    setProofOfIdentityLoader(false);
                                    toast.error(error?.message ?? "Something went wrong!")
                                })
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default LegalRepresentativeCorporateKYC
