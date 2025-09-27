import * as Yup from 'yup';

const createSTOJson = [
    {
        title: "RWA Info",
        step: 1,
        validationSchema: Yup.object({
            /* rwaAddress: Yup.string().required('required'),
            nameOfAsset: Yup.string().required('required'),
            symbolOfAsset: Yup.string().required('required'),
            decimalOfRWAAsset: Yup.string().required('required'), */
        }),
        fields: [
            {
                row: [
                    {
                        type: "text",
                        id: "rwaAddress",
                        name: "rwaAddress",
                        label: "RWA Address",
                        placeholder: "0x6893jd874jk9243j012uh8"
                    },
                    {
                        type: "text",
                        id: "nameOfAsset",
                        name: "nameOfAsset",
                        label: "Name of the Asset",
                        placeholder: "Lorem Ipsum",
                        disabled: true
                    },
                    {
                        type: "text",
                        id: "symbolOfAsset",
                        name: "symbolOfAsset",
                        label: "Symbol of the Asset",
                        placeholder: "Lorem Ipsum",
                        disabled: true
                    },
                    {
                        type: "text",
                        id: "decimalOfRWAAsset",
                        name: "decimalOfRWAAsset",
                        label: "Decimal of RWA Token",
                        placeholder: "Lorem Ipsum",
                        disabled: true
                    },
                ]
            }
        ]
    },
    {
        title: "RWA Details",
        step: 2,
        fields: [
            {
                row: [
                    {
                        type: "file",
                        id: "stoImage",
                        name: "stoImage",
                        // label: "RWA Address",
                        placeholder: "0x6893jd874jk9243j012uh8",
                        fileType: "image/png, image/jpeg",
                        displayName: "",
                        loader: false
                    },
                ]
            },
            /* {
                hidden: true,
                row: [
                    {
                        type: "text",
                        id: "stoImageDisplay",
                        name: "stoImageDisplay",
                        // label: "RWA Address",
                        placeholder: "0x6893jd874jk9243j012uh8",
                        // inputClassNames: "hidden",
                    },
                ]
            }, */
            {
                row: [
                    {
                        type: "dropdown",
                        shape: "square",
                        className: "gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] w-full",
                        id: "country",
                        name: "country",
                        label: "Country",
                        dynamicOptions: true,
                        optionsAPI: "/contract/sto/get-country",
                        options: []
                    },
                    {
                        type: "dropdown",
                        shape: "square",
                        className: "gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] w-full",
                        id: "issuer",
                        name: "issuer",
                        label: "Issuer",
                        dynamicOptions: false,
                        optionsAPI: "",
                        options: [
                            { label: "Options 1", value: "options_1" },
                            { label: "Options 2", value: "options_2" },
                            { label: "Options 3", value: "options_3" },
                        ]
                    }
                ],
            },
            {
                hidden: true,
                row: [
                    {
                        type: "date",
                        className: "gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] w-full",
                        id: "issuanceDateTimestamp",
                        name: "issuanceDateTimestamp",
                        // label: "Issuance Date",
                    },
                ],
            },
            {
                row: [
                    {
                        type: "dateTime",
                        className: "gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] w-full",
                        id: "issuanceDate",
                        name: "issuanceDate",
                        label: "Issuance Date",
                    },
                    {
                        type: "dropdown",
                        shape: "square",
                        className: "gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] w-full",
                        id: "industry",
                        name: "industry",
                        label: "Industry",
                        dynamicOptions: true,
                        optionsAPI: "/contract/sto/get-industry",
                        options: []
                    },
                ],
            },
            {
                row: [
                    {
                        type: "text",
                        id: "companyWebsite",
                        name: "companyWebsite",
                        label: "Company Website",
                        placeholder: "https://fracsio.com/"
                    },
                ],
            }, {
                row: [
                    {
                        type: "textarea",
                        id: "description",
                        name: "description",
                        label: "Description",
                        placeholder: "Lorem Ipsum"
                    },
                ]
            }
        ]
    },
    {
        title: "WERC20 Details",
        step: 3,
        fields: [
            {
                row: [
                    {
                        type: "text",
                        id: "STOTokenName",
                        name: "STOTokenName",
                        label: "WERC20 Token Name",
                        placeholder: "WERC20 Token Name",
                        // disabled: true
                    },
                    {
                        type: "text",
                        id: "STOTokenSymbol",
                        name: "STOTokenSymbol",
                        label: "WERC20 Token Symbol",
                        placeholder: "WERC20 Token Symbol",
                        // disabled: true
                    },
                    {
                        type: "text",
                        id: "tokenAmount",
                        name: "tokenAmount",
                        label: "Token Amount",
                        placeholder: "100M"
                    }
                ]
            },
        ]
    }/* ,
    {
        title: "Finish",
        step: 4,
    } */
]

export {
    createSTOJson
}