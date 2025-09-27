import React from "react";

const sizes = {
    textxs: "text-[0.75rem] font-medium not-italic",
    texts: "text-[0.88rem] font-medium",
    textlg: "text-[1.13rem] font-medium",
    headingxs: "text-[0.63rem] font-bold",
    headings: "text-[0.75rem] font-bold",
    headingmd: "text-[0.88rem] font-bold",
    headinglg: "text-[1.00rem] font-bold",
    headingxl: "text-[1.13rem] font-bold",
    heading2xl: "text-[1.25rem] font-bold",
    heading3xl: "text-[1.38rem] font-bold",
    heading4xl: "text-[1.50rem] font-bold md:text-[1.38rem]",
    heading5xl: "text-[1.75rem] font-bold md:text-[1.63rem] sm:text-[1.50rem]",
    heading6xl: "text-[2.00rem] font-bold md:text-[1.88rem] sm:text-[1.75rem]",
    heading7xl: "text-[2.50rem] font-bold md:text-[2.38rem] sm:text-[2.25rem]",
};

const Headvariants = {
    lightLabel: `text-brand_color-1`,
    whiteLabel: `text-white-a700`
}

const Heading = ({ children, className = "", size = "texts", as, variants = "whiteLabel", ...restProps }) => {
    const Component = as || "h6";

    return (
        <Component className={`${Headvariants[variants]} font-syne ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};

export { Heading };
