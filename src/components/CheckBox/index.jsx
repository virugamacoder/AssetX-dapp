import React from "react";
import PropTypes from "prop-types";

const variants = {
    primary:
        "border-gray-900_02 border border-solid checked:border-green-500 checked:border-[3px] checked:border-solid checked:bg-green-500 checked:focus:bg-green-500 checked:focus:border-green-500 checked:hover:bg-green-500 checked:hover:border-green-500 focus:outline-none focus:ring-0	focus:ring-offset-0	",
};
const sizes = {
    xs: "h-[1.00rem] w-[1.00rem]",
};

const CheckBox = React.forwardRef(
    (
        {
            className = "",
            name = "",
            label = "",
            id = "checkbox_id",
            onChange,
            variant = "primary",
            size = "xs",
            checkBoxClassNames,
            ...restProps
        },
        ref,
    ) => {
        const handleChange = (e) => {
            if (onChange) onChange(e?.target?.checked);
        };

        return (
            <>
                <div className={className + " flex items-center gap-[0.31rem] cursor-pointer"}>
                    <input
                        className={` ${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""} ${checkBoxClassNames}`}
                        ref={ref}
                        type="checkbox"
                        name={name}
                        onChange={handleChange}
                        id={id}
                        {...restProps}
                    />
                    {!!label && (
                        <label htmlFor={id}>
                            {label}
                        </label>
                    )}
                </div>
            </>
        );
    },
);

CheckBox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.oneOf(["xs"]),
    variant: PropTypes.oneOf(["primary"]),
};

export { CheckBox };
