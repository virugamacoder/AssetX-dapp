import { Text, Img } from "./..";
import { img_footer_logo, img_facebook, img_trash, img_warning_black_400, img_info_black_400 } from "assets/images";
import React from "react";

export default function Footer({ ...props }) {
  return (
    <footer {...props} className={`${props.className} flex self-stretch items-center`}>
      <div className="flex w-full items-center justify-between gap-[1.25rem] md:flex-col">
        <div className="flex w-[20%] items-center justify-between gap-[1.25rem] md:w-full">
          <Img src={img_footer_logo} alt="Footer Logo" className="h-[1.50rem] w-[6.50rem] object-contain" />
          <Text
            size="text_14px_regular"
            as="p"
            className="self-end font-inter text-[0.88rem] font-normal text-black-400"
          >
            © AssetX
          </Text>
        </div>
        <div className="flex w-[56%] items-center justify-between gap-[1.25rem] md:w-full">
          <div className="flex w-[24%] justify-between gap-[1.25rem]">
            <Img src={img_facebook} alt="Facebook Icon" className="h-[1.75rem] w-[1.75rem]" />
            <Img src={img_trash} alt="Trash Icon" className="h-[1.75rem] w-[1.75rem]" />
            <Img src={img_warning_black_400} alt="Warning Icon" className="h-[1.75rem] w-[1.75rem]" />
            <Img src={img_info_black_400} alt="Info Icon" className="h-[1.75rem] w-[1.75rem]" />
          </div>
          <Text
            size="text_14px_regular"
            as="p"
            className="self-end font-inter text-[0.88rem] font-normal text-black-400"
          >
            Download Litepaper
          </Text>
        </div>
      </div>
    </footer>
  );
}
