import { img_info_circle_svgrepo_com, img_vector_12x6 } from "assets/images";
import { Heading, Img } from "./..";
import React from "react";

export default function UserRegistration({
    registrationText = "Register To Invest",
    eventDate = "23rd Jul, 9:00 - 30th Jul, 8:30",
    ...props
}) {
    return (
        <div {...props} className={`${props.className} flex sm:flex-col justify-between items-center gap-[1.38rem] flex-1`}>
            <div className="flex w-[40%] items-center gap-[0.50rem]">
                <Img src={img_vector_12x6} alt="Registration Icon" className="h-[0.75rem] object-cover" />
                <div className="flex flex-1 items-center gap-[0.38rem] self-center">
                    <Heading
                        as="p"
                        className="self-center bg-gradient bg-clip-text text-[0.88rem] font-medium capitalize tracking-[0.00rem] text-transparent"
                        style={{
                            background: `linear-gradient(var(--gradient4))`,
                            backgroundClip: `text`,
                            color: `transparent`,
                        }}
                    >
                        {registrationText}
                    </Heading>
                    <Img src={img_info_circle_svgrepo_com} alt="Info Icon" className="h-[0.75rem] w-[0.75rem]" />
                </div>
            </div>
            <Heading
                size="headingmd"
                as="p"
                className="text-[0.88rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
            >
                {eventDate}
            </Heading>
        </div>
    );
}
