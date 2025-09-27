import { img_arrowright336, img_header_logo, img_metamask_fox_1, img_polygonlogofreelogovectorsnet_1 } from "assets/images";
import { Heading, Img, SelectBox, Text } from "components";
import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import ROUTE_PATH from "routes/ROUTE_PATH";
import "./header.css";
import ConnectWalletButton from "components/DApp/ConnectWalletButton";

const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

export default function Header({ ...props }) {
    return (
        <header
            {...props}
            className={`${props.className} flex sm:flex-col self-stretch justify-between items-center gap-[1.25rem] py-[1.63rem] sm:py-[1.25rem] border-white-a700_1e border-b border-solid`}
        >
            <Link to={ROUTE_PATH.ROOT} >
                <Img src={img_header_logo} alt="Header Logo" className="h-[2.00rem] w-[8.75rem] object-contain" />
            </Link>
            <ul className="flex flex-wrap gap-[2.00rem]">
                <li>
                    <NavLink
                        to={ROUTE_PATH.SECTURITY_TOKENS}
                        className={({ isActive }) =>
                            isActive ? `isActive bg-gradient bg-clip-text` : `bg-gradient bg-clip-text`
                        }
                    >
                        <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-brand_color-1 hover:text-brand_color-0"
                        >
                            Wrapped ERC20 Tokens
                        </Text>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTE_PATH.POPULAR_MARKETS}
                        className={({ isActive }) =>
                            isActive ? `isActive bg-gradient bg-clip-text` : `bg-gradient bg-clip-text`
                        }
                    >
                        <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-brand_color-1 hover:text-brand_color-0"
                        >
                            Popular Markets
                        </Text>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTE_PATH.LIQUIDITY}
                        className={({ isActive }) =>
                            isActive ? `isActive bg-gradient bg-clip-text` : `bg-gradient bg-clip-text`
                        }
                    >
                        <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-brand_color-1 hover:text-brand_color-0"
                        >
                            Liquidity
                        </Text>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTE_PATH.SWAP}
                        className={({ isActive }) =>
                            isActive ? `isActive bg-gradient bg-clip-text` : `bg-gradient bg-clip-text`
                        }
                    >
                        <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-brand_color-1 hover:text-brand_color-0"
                        >
                            Swap/Trade
                        </Text>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTE_PATH.INVESTMENTS}
                        className={({ isActive }) =>
                            isActive ? `isActive bg-gradient bg-clip-text` : `bg-gradient bg-clip-text`
                        }
                    >
                        <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-brand_color-1 hover:text-brand_color-0">
                            Launchpad
                        </Text>
                    </NavLink>
                </li>
            </ul>
            <div className="flex w-[28%] justify-end gap-[1.00rem] md:w-full">
                {/* <SelectBox
                    shape="square"
                    indicator={
                        <Img src={img_arrowright336} alt="Arrow Right-[#336]" className="h-[0.75rem] w-[0.50rem]" />
                    }
                    getOptionLabel={(e) => (
                        <>
                            <div className="flex items-center">
                                <Img
                                    src={img_polygonlogofreelogovectorsnet_1}
                                    alt="Polygon-logo-freelogovectors.net 1"
                                    className="h-[0.75rem] w-[1.25rem]"
                                />
                                <span>{e.label}</span>
                            </div>
                        </>
                    )}
                    name="Network Dropdown"
                    placeholder={`polygon`}
                    options={dropDownOptions}
                    className="w-[34%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem]"
                /> */}
                <ConnectWalletButton />
                {/* <div className="flex flex-1 items-center justify-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
                    <a href="#">
                        <Img src={img_metamask_fox_1} alt="Metamask Icon" className="h-[1.25rem] w-[1.25rem]" />
                    </a>
                    <Heading
                        size="headings"
                        as="p"
                        className="ml-[0.50rem] text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
                    >
                        0x6893...2uh8
                    </Heading>
                    <div className="ml-[1.00rem] flex items-center gap-[0.38rem]">
                        <Heading
                            size="headings"
                            as="p"
                            className="text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700 text-nowrap"
                        >
                            o MATIC
                        </Heading>
                        <Img src={img_arrowright336} alt="Balance Icon" className="h-[0.25rem]" />
                    </div>
                </div> */}
            </div>
        </header>
    );
}
