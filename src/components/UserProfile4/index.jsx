import { img_vector_40x40 } from "assets/images";
import { Heading, Img } from "./..";
import React from "react";
import { STOS_KEYS } from "services/STO";

/* {
    userImage = img_vector_40x40,
        userName = "wCKGP",
        userDescription = "OTP - Coach K Gaming Portfolio",
        userInfo = "INFO",
        type = "",
        name,
        symbol,
        onSelectToken,
    ...props
} */

export default function UserProfile4(props) {

    const {
        userImage = img_vector_40x40,
        name,
        userInfo = "INFO",
        onSelectToken,
        symbol,
        type = "",
        listType,
        selectedObject
    } = props

    return (
        <div
            // {...props}
            className={`${props.className} cursor-pointer flex sm:flex-col justify-center items-center gap-[0.75rem] p-[0.88rem] bg-gray-900 flex-1`}
            onClick={() => onSelectToken(selectedObject)}
        // onClick={() => console.log(props)}
        >
            <Img
                src={userImage}
                alt="Image"
                className="h-[2.50rem] w-[2.50rem] rounded-[20px] object-cover"
            // onError={() => this.img.src = img_vector_40x40}
            />
            <div className="flex-1 items-center sm:self-auto">
                <div className="flex flex-col items-start">
                    <div className="mr-[0.88rem] mb-[5px] flex items-center self-stretch">
                        <div className="flex flex-1 flex-wrap items-center gap-[0.56rem]">
                            <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                                {/* {userName} */}
                                {name}
                            </Heading>
                            {/* <Heading
                                size="textxs"
                                as="p"
                                style={{ color: `var(--brand_color_1)` }}
                                className="items-center text-[0.75rem] font-medium capitalize tracking-[0.00rem]"
                            >
                                {userDescription}
                            </Heading> */}
                        </div>
                        {listType === STOS_KEYS.MY_STOS &&
                            <Heading
                                size="headings"
                                as="p"
                                style={userInfo === "INFO" ?
                                    {
                                        background: `linear-gradient(var(--gradient4))`,
                                        backgroundClip: `text`,
                                        color: `transparent`,
                                    } :
                                    { fontSize: `20px` }}
                                className={`self-end  bg-clip-text text-[0.75rem] font-bold text-transparent`}
                            >
                                {userInfo}
                            </Heading>}
                    </div>
                    <Heading
                        size="textxs"
                        as="p"
                        style={type === "red" ? { color: `var(--red_a700)` } : { color: `var(--brand_color_1)` }}
                        className={`relative mt-[-0.25rem] text-[0.75rem] font-medium capitalize tracking-[0.00rem] text-red-a700`}
                    >
                        {symbol}
                    </Heading>
                </div>
            </div>
        </div>
    );
}
