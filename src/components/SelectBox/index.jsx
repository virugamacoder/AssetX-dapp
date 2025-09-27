import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const shapes = {
    square: "rounded-[0px]",
};
const variants = {
    fill: {
        gray_900_01: "bg-gray-900_01 text-white-a700",
    },
};
const sizes = {
    xs: "h-[2.50rem] px-[0.75rem] text-[0.75rem]",
};

const SelectBox = React.forwardRef(
    (
        {
            children,
            className = "",
            options = [],
            isSearchable = false,
            isMulti = false,
            indicator,
            shape,
            variant = "fill",
            size = "xs",
            color = "gray_900_01",
            value,
            ...restProps
        },
        ref,
    ) => {
        return (
            <>
                <Select
                    ref={ref}
                    options={options}
                    className={`${className} flex ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                    components={{
                        IndicatorSeparator: () => null,
                        ...(indicator && { DropdownIndicator: () => indicator }),
                    }}
                    styles={{
                        indicatorsContainer: (provided) => ({
                            ...provided,
                            padding: undefined,
                            flexShrink: undefined,
                            width: "max-content",
                            "& > div": { padding: 0 },

                        }),
                        container: (provided) => ({
                            ...provided,
                            zIndex: 0,
                            alignItems: "center",
                        }),
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            border: "0 !important",
                            boxShadow: "none !important",
                            minHeight: "auto",
                            width: "100%",
                            flexWrap: undefined,
                            "&:hover": {
                                border: "0 !important",
                            },
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: "inherit",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            display: "flex",
                            minWidth: "max-content",
                            width: "100%",
                            fontSize: "12px",
                            // fontFamily: `font-syne`,
                            fontWeight: "700",
                            backgroundColor: state.isSelected ? "#111114" : "#111114",
                            color: state.isSelected ? "#34AD6B" : "#ffffff",
                            "&:hover": {
                                backgroundColor: "#111114",
                                color: "#34AD6B",
                            },
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            display: "flex",
                            marginLeft: undefined,
                            marginRight: undefined,
                            paddingRight: "0.5rem",
                            color: "#fff",
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            padding: 0,
                            display: "flex",
                            flexWrap: undefined,
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            margin: 0,
                            paddingRight: "0.5rem",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 999999 }),
                        menu: (base) => ({ ...base, minWidth: "100%", width: "max-content", backgroundColor: "#111114" }),
                    }}
                    menuPortalTarget={document.body}
                    closeMenuOnScroll={(event) => {
                        return event.target.id === "scrollContainer";
                    }}
                    value={options.filter((option) => {
                        return option.value === value;
                    })}
                    {...restProps}
                />
                {children}
            </>
        );
    },
);

SelectBox.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    isSearchable: PropTypes.bool,
    isMulti: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    indicator: PropTypes.node,
    shape: PropTypes.oneOf(["square"]),
    size: PropTypes.oneOf(["xs"]),
    variant: PropTypes.oneOf(["fill"]),
    color: PropTypes.oneOf(["gray_900_01"]),
};

export { SelectBox };
