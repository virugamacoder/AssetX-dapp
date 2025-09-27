import { Input } from 'components';
import { ErrorMessage, Field } from 'formik'
import React from 'react'

function TextInput(props) {
    // console.log('TextInput props', props)
    const {
        name,
        id,
        placeholder,
        type,
        label,
        onChange,
        onBlur,
        onPaste,
        value,
        disabled,
        fileType,
        suffix,
        prefix,
        pattern,
        min,
        max
    } = props;

    const defineType = (key) => {
        if (key === "dateTime") {
            return "datetime-local"
        } else {
            return key
        }

    }

    return (
        <div className='flex w-full flex-col gap-[8px]'>
            {label &&
                <label
                    className={`text-[14px] text-brand_color-1`}
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <Input
                size="xs"
                shape="square"
                name={name}
                placeholder={placeholder}
                value={type === "file" ? "" : value}
                onChange={onChange}
                onPaste={onPaste}
                onBlur={onBlur}
                className="w-full gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                inputClassNames={`p-0 bg-transparent border-none text-[16px] focus:ring-0 text-white-a700 disabled:cursor-not-allowed`}
                type={defineType(type)}
                disabled={disabled}
                accept={fileType}
                suffix={suffix}
                prefix={prefix}
                pattern={pattern}
                min={min}
                max={max}
            />
            <ErrorMessage className="error text-red-a700" component="div" name={name} />
        </div>
    )
}

export default TextInput
