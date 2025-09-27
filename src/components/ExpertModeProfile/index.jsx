import { img_info_circle_svgrepo_com, img_user } from "assets/images";
import { Img, Text } from "./..";
import React from "react";
import ReactSwitch from "react-switch";

export default function ExpertModeProfile({ expertModeText = "Expert Mode", isChecked = false, onClick, ...props }) {

    return (
        <div {...props} className={`${props.className} flex justify-center items-center flex-1`}>
            <div className="flex flex-1 items-center gap-[0.38rem]">
                <Text as="p" className="text-[1.00rem] font-normal capitalize tracking-[0.00rem] text-brand_color-1">
                    {expertModeText}
                </Text>
                <Img src={img_info_circle_svgrepo_com} alt="Info Icon" className="h-[0.75rem] w-[0.75rem]" />
            </div>
            <ReactSwitch
                checkedIcon={false}
                uncheckedIcon={false}
                height={22}
                width={40}
                className="react_switch"
                onChange={(e) => onClick(e)} checked={isChecked}
            />
        </div>
    );
}
