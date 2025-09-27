import { img_arrowdown } from 'assets/images'
import { SelectBox } from 'components'
import Dropdown from 'components/Forms/dropDown'
import TextInput from 'components/Forms/textInput'
import React from 'react'

function CorporateInfoCorporateKYC(props) {
    const { formik } = props

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full">
                <Dropdown
                    name="countryOfIncorporation"
                    label="Country of Incorporation"
                    id="countryOfIncorporation"
                    placeholder="Select Corporate Type"
                    options={[]}
                    optionsAPI={`/contract/sto/get-country`}
                    isDynamicOptions={true}
                    onChange={(e) => formik.setFieldValue('countryOfIncorporation', e.value)}
                    value={formik.values.countryOfIncorporation}
                    className="border border-gray-900_02 !text-[1rem]"
                />
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Corporate Name"
                        name="corporateName"
                        placeholder="Joshua Doore"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.corporateName}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="Registration Number"
                        name="registrationNumber"
                        placeholder="AYSJJDUI8752KIA"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.registrationNumber}
                    />
                </div>
            </div>
            <div className="flex w-full">
                <Dropdown
                    name="typeofLegalEntity"
                    label="Type of Legal Entity"
                    id="typeofLegalEntity"
                    placeholder="Select Corporate Type"
                    options={[
                        { label: "Options 1", value: "options_1" },
                        { label: "Options 2", value: "options_2" },
                        { label: "Options 3", value: "options_3" },
                    ]}
                    isDynamicOptions={false}
                    onChange={(e) => formik.setFieldValue('typeofLegalEntity', e.value)}
                    value={formik.values.typeofLegalEntity}
                    className="border border-gray-900_02 !text-[1rem]"
                />
            </div>
            <div className="flex w-full">
                <TextInput
                    label="Corporate Address"
                    name="corporateAddress"
                    placeholder="4463 Sherwood Circle, Kernersville"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.corporateAddress}
                />
            </div>
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        label="Zip Code"
                        name="zipCode"
                        placeholder="27284"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zipCode}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label="City"
                        name="city"
                        placeholder="North Carolina"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    />
                </div>
            </div>
        </div>
    )
}

export default CorporateInfoCorporateKYC
