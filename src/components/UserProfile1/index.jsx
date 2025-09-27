import { img_document_1_svgrepo_com, img_eye_svgrepo_com } from "assets/images";
import { Img, Heading } from "./..";
import React from "react";

export default function UserProfile1({ userDescription = "Socialerus_k-youtube...", ...props }) {
    return (
        <div {...props} className={`${props.className} flex justify-center items-center flex-1`}>
            <div className="flex flex-1 items-center gap-[0.50rem]">
                <Img
                    src={img_document_1_svgrepo_com}
                    alt="Document Image"
                    className="h-[1.25rem] w-[1.25rem] object-cover"
                />
                <Heading as="p"
                    className="text-[0.88rem] font-medium capitalize tracking-[0.00rem]"
                    variants={`lightLabel`}
                >
                    {userDescription}
                </Heading>
            </div>
            <Img src={img_eye_svgrepo_com} alt="Eye Image" className="h-[1.25rem] w-[1.25rem]" />
        </div>
    );
}
