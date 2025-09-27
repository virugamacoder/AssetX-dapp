import Dropdown from "components/Forms/dropDown";
import FileUpload from "components/Forms/fileUpload";
import TextInput from "components/Forms/textInput"
import { uploadFileToPinataHandler } from "features/securityTokens/createSTO/apiFunctions";
import { useEffect, useState } from "react";

const issuersOptions = [
    { label: "Issuer", value: "issuer" },
];

function ListSTOTokenInfo(props) {
    const { formik } = props

    const [fileLoader, setFileLoader] = useState(false);
    const [fileDisplayName, setFileDisplayName] = useState("");

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full">
                <TextInput
                    label="Title"
                    name="launchpadTitle"
                    placeholder="SCR-1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.launchpadTitle}
                />
            </div>
            <div className="flex w-full">
                <FileUpload
                    name="launchpadImage"
                    fileType={`image/png, image/jpeg`}
                    displayName={fileDisplayName}
                    loader={fileLoader}
                    value={formik.values.launchpadImage}
                    type={`file`}
                    label={`Launchpad Image`}
                    onChange={(e) => {
                        if (e.target?.delete) {
                            formik.setFieldValue('launchpadImage', "")
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
                                    formik.setFieldValue('launchpadImage', result[0]);
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
                <div className="w-1/2">
                    <Dropdown
                        label="Issuers"
                        name="issuer"
                        placeholder="Select Issuers"
                        value={formik.values.issuer}
                        onChange={(e) => formik.setFieldValue('issuer', e.value)}
                        options={issuersOptions}
                        className="border border-gray-900_02 !text-[1rem]"
                    />
                </div>
                <div className="w-1/2">
                    <Dropdown
                        name="country"
                        label="Country"
                        id="country"
                        placeholder="Select Country"
                        options={[]}
                        optionsAPI={`/contract/launchpad/get-country`}
                        isDynamicOptions={true}
                        onChange={(e) => formik.setFieldValue('country', e.value)}
                        value={formik.values.country}
                        className="border border-gray-900_02 !text-[1rem]"
                    />
                </div>
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <Dropdown
                        label="Investment Type"
                        name="investmentType"
                        placeholder="Select Investment Type"
                        value={formik.values.investmentType}
                        onChange={(e) => formik.setFieldValue('investmentType', e.value)}
                        options={[]}
                        optionsAPI={`/contract/launchpad/get-investment-type`}
                        isDynamicOptions={true}
                        className="border border-gray-900_02 !text-[1rem]"
                    />
                </div>
                <div className="w-1/2">
                    <Dropdown
                        name="industry"
                        label="Industry"
                        id="industry"
                        placeholder="Select Industry"
                        options={[]}
                        optionsAPI={`/contract/launchpad/get-industry`}
                        isDynamicOptions={true}
                        onChange={(e) => formik.setFieldValue('industry', e.value)}
                        value={formik.values.industry}
                        className="border border-gray-900_02 !text-[1rem]"
                    />
                </div>
            </div>
            <div className="flex w-full">
                <TextInput
                    label="Overview"
                    name="overview"
                    placeholder="Overview"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.overview}
                />
            </div>
            <div className="flex w-full">
                <TextInput
                    label="Company Website"
                    name="companyWebsite"
                    placeholder="Company Website"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.companyWebsite}
                />
            </div>
        </div>
    )
}

export default ListSTOTokenInfo
