import { img_arrowdown } from 'assets/images';
import { Img, Input, SelectBox } from 'components';
import { dynamicDropdownHandler } from 'features/securityTokens/createSTO/apiFunctions';
import { ErrorMessage, Field } from 'formik'
import React, { useEffect } from 'react'
import { convertOptions } from 'utils';

function Dropdown(props) {
    const [apiOptions, setApiOptions] = React.useState([])
    // console.log('Dropdown props', props)
    const { name, id, placeholder, type, label, onChange, value, className, options, optionsAPI, isDynamicOptions } = props;

    const dynamicOptions = () => {
        if (optionsAPI && isDynamicOptions) {
            dynamicDropdownHandler(optionsAPI, name).then((res) => {
                // console.log('res', res)
                setApiOptions(convertOptions(res))
            })
        } else {
            setApiOptions(options)
        }
    }

    useEffect(() => {
        dynamicOptions()
    }, [])

    return (
        <div className='flex w-full flex-col gap-[8px]'>
            <label
                className={`text-[14px] text-brand_color-1`}
                htmlFor={id}
            >
                {label}
            </label>
            <SelectBox
                className={className}
                // {...props}
                shape="square"
                indicator={
                    <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                }
                options={apiOptions}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <ErrorMessage className="error text-red-a700" component="div" name={name} />
        </div>
    )
}

export default Dropdown
