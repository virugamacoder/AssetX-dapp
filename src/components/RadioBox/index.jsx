import React from "react";
import PropTypes from "prop-types";

const shapes = {
    square: "rounded-[0px]",
    rounded: "rounded-[8px]",
};

const variants = {
    fill: {
        gray_900_01: "bg-gray-900_01 text-white-a700",
    },
    outline: {
        gray_500: "border border-gray-500 text-gray-900",
    },
};

const sizes = {
    xs: "h-[1.5rem] w-[1.5rem] text-[0.75rem] px-[0.75rem]",
    sm: "h-[2rem] w-[2rem] text-[1rem] px-[1rem]",
};

const RadioBox = ({
    options = [],
    className = "",
    name,
    value,
    onChange,
    shape = "rounded",
    variant = "outline",
    size = "sm",
    color = "gray_500",
    ...restProps
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`flex items-center cursor-pointer ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]} p-[0.5rem]`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="mr-[0.5rem]"
                        {...restProps}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
};

RadioBox.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    shape: PropTypes.oneOf(["square", "rounded"]),
    variant: PropTypes.oneOf(["fill", "outline"]),
    size: PropTypes.oneOf(["xs", "sm"]),
    color: PropTypes.oneOf(["gray_900_01", "gray_500"]),
};

export { RadioBox };
