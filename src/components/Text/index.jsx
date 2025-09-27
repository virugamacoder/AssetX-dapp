import React from "react";

const sizes = {
  text_14px_regular: "font-inter text-[0.88rem] font-normal not-italic",
  textmd: "text-[1.00rem] font-normal not-italic",
  textxl: "text-[1.25rem] font-light",
};

const Text = ({ children, className = "", as, size = "textmd", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-brand_color-1 font-syne ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
