import React from 'react'
import TextInput from '../textInput';
import { SelectBox } from 'components';
import Dropdown from '../dropDown';
import FileUpload from '../fileUpload';

const FormFields = (props) => {
    const { type } = props

    switch (type) {
        case "text":
            return <TextInput {...props} />;
        case "dropdown":
            return <Dropdown {...props} />;
        case "textarea":
            return <TextInput {...props} />;
        case "file":
            return <FileUpload {...props} />;
        case "date":
            return <TextInput {...props} />;
        case "dateTime":
            return <TextInput {...props} />;
        default:
            return null;
    }
}

export default FormFields
