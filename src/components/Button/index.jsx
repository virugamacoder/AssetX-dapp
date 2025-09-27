import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    gray_900: "bg-gray-900 text-white-a700",
    gray_900_99: "bg-gray-900_99 text-white-a700",
    gray_900_01: "bg-gray-900_01 text-brand_color-1",
  },
  outline: {
    white_A700: "border-white-a700 border border-solid text-white-a700",
  },
  gradient: {
    brand_color_0_green_800: "bg-gradient text-white-a700",
  },
};
const sizes = {
  sm: "h-[2.00rem] px-[0.50rem]",
  "2xl": "h-[8.13rem] px-[2.13rem] text-[0.88rem]",
  xl: "h-[5.00rem] px-[2.00rem] text-[0.88rem]",
  md: "h-[2.50rem] px-[0.88rem] text-[0.75rem]",
  xs: "h-[1.88rem] px-[0.75rem] text-[0.75rem]",
  lg: "h-[3.00rem] px-[2.13rem] text-[1.00rem]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "gradient",
  size = "lg",
  color = "gray_900_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["sm", "2xl", "xl", "md", "xs", "lg"]),
  variant: PropTypes.oneOf(["fill", "outline", "gradient"]),
  color: PropTypes.oneOf(["gray_900", "gray_900_99", "gray_900_01", "white_A700", "brand_color_0_green_800"]),
};

export { Button };
