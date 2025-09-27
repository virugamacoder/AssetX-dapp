import React from "react";
import PropTypes from "prop-types";

const shapes = {
    square: "rounded-[0px]",
};

const variants = {
    fill: {
        gray_900_7a: "bg-gray-900_7a text-brand_color-1",
        gray_900: "bg-gray-900 text-brand_color-1",
        gray_900_01: "bg-gray-900_01 text-brand_color-1",
    },
};

const sizes = {
    xs: "h-[2.50rem] px-[0.75rem] text-[0.75rem]",
    sm: "h-[3.00rem] px-[0.88rem] text-[0.88rem]",
};

const Input = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            type = "text",
            label = "",
            prefix,
            suffix,
            onChange,
            onBlur,
            shape,
            variant = "fill",
            size = "sm",
            color = "gray_900_01",
            inputClassNames = "",
            accept,
            pattern,
            isDisabled = false,
            onPaste,
            min,
            max,
            ...restProps
        },
        ref,
    ) => {

        return (
            <label
                className={`${className} flex items-center justify-center cursor-text text-brand_color-1 font-medium border-gray-900_02 border border-solid  ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
            >
                {!!label && label}
                {!!prefix && prefix}
                <input
                    ref={ref}
                    type={type}
                    className={inputClassNames}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    accept={accept}
                    pattern={pattern}
                    onWheel={(e) => e.target.blur()}
                    onPaste={onPaste}
                    disabled={isDisabled}
                    min={min}
                    max={max}
                    {...restProps}
                />
                {!!suffix && suffix}
            </label>
        );
    },
);
Input.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    shape: PropTypes.oneOf(["square"]),
    size: PropTypes.oneOf(["xs", "sm"]),
    variant: PropTypes.oneOf(["fill"]),
    color: PropTypes.oneOf(["gray_900_7a", "gray_900", "gray_900_01"]),
};

export { Input };
