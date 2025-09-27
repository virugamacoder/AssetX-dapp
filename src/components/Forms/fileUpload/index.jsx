import { img_close_md_svgrepo_com, img_delete } from 'assets/images';
import { Button, Img, Input } from 'components';
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { getImageFromPinata } from 'services/pinata';

function FileUpload(props) {
    // console.log('FileUpload props', props)
    const { name, id, placeholder, type, label, suffixLabel, suffixLabelClasses, onChange, onBlur, value, disabled, fileType, loader, displayName, onDelete } = props;

    const defineType = (key) => {
        if (key === "dateTime") {
            return "datetime-local"
        } else {
            return key
        }

    }

    return (
        <div className='flex w-full flex-col gap-[8px]'>
            <div className='flex justify-between items-center'>
                <label
                    className={`text-[14px] text-brand_color-1`}
                    htmlFor={id}
                >
                    {label}
                </label>
                {!!suffixLabel &&
                    <label
                        className={`text-[14px] text-brand_color-1 ${suffixLabelClasses}`}
                        htmlFor={id}
                    >
                        {suffixLabel}
                    </label>
                }
            </div>
            {value === "" ?
                <div className='relative'>
                    <Input
                        size="xs"
                        shape="square"
                        name={name}
                        placeholder={placeholder}
                        value={type === "file" ? "" : value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                        inputClassNames={`p-0 bg-transparent border-none text-[16px] focus:ring-0 text-white-a700 disabled:cursor-not-allowed`}
                        type={defineType(type)}
                        disabled={disabled}
                        accept={fileType}
                    />
                    {loader &&
                        <div className="absolute top-[7px] right-[12px] z-[1] right-0">
                            <span className="inputLoader"></span>
                        </div>
                    }
                </div>
                :
                <>
                    <div className='flex items-center justify-between p-[12px] w-full h-[80px] border border-gray-900_02 '>
                        <div className='flex items-center'>
                            <Img
                                src={getImageFromPinata(value)}
                                alt="Accredited Logo"
                                className="h-[50px] w-[50px] rounded-[5px] object-cover"
                            />
                            <label
                                className={`pl-[12px] text-[14px] font-semibold text-white-a700`}
                                htmlFor={id}
                            >
                                {displayName}
                            </label>
                        </div>
                        <Button
                            style={{ padding: "0", height: "0" }}
                            onClick={() => onChange({ target: { name: name, value: "", delete: true } })}
                            type="button"
                        >
                            <Img src={img_delete} alt="Close Icon" className="h-[1.50rem] w-[1.50rem]" />
                        </Button>
                    </div>

                </>
            }
            <ErrorMessage className="error text-red-a700" component="div" name={name} />
        </div>
    )
}

export default FileUpload
