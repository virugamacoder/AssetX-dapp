import { Img, Heading, SelectBox, Text } from "./..";
import React from "react";

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
      <Img src="images/img_header_logo.png" alt="Header Logo" className="h-[2.00rem] w-[8.75rem] object-contain" />
      <ul className="flex flex-wrap gap-[3.00rem]">
        <li>
          <a href="#" className="bg-gradient bg-clip-text">
            <Heading size="headinglg" as="h6" className="text-[1.00rem] font-bold text-transparent">
              Launchpad
            </Heading>
          </a>
        </li>
        <li>
          <a href="#" className="cursor-pointer">
            <Text
              as="p"
              className="text-[1.00rem] font-normal text-brand_color-1 hover:font-bold hover:text-brand_color-0"
            >
              Security Tokens
            </Text>
          </a>
        </li>
        <li>
          <a href="#" className="cursor-pointer">
            <Text
              as="p"
              className="text-[1.00rem] font-normal text-brand_color-1 hover:font-bold hover:text-brand_color-0"
            >
              Liquidity
            </Text>
          </a>
        </li>
        <li>
          <a href="#" className="cursor-pointer">
            <Text
              as="p"
              className="text-[1.00rem] font-normal text-brand_color-1 hover:font-bold hover:text-brand_color-0"
            >
              Swap/Trade
            </Text>
          </a>
        </li>
      </ul>
      <div className="flex w-[28%] justify-center gap-[1.00rem] md:w-full">
        <SelectBox
          shape="square"
          indicator={
            <Img src="images/img_arrowright336.svg" alt="Arrow Right-[#336]" className="h-[0.75rem] w-[0.50rem]" />
          }
          getOptionLabel={(e) => (
            <>
              <div className="flex items-center">
                <Img
                  src="images/img_polygonlogofreelogovectorsnet_1.png"
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
        />
        <div className="flex flex-1 items-center justify-center border border-solid border-gray-900_02 bg-gray-900_01 p-[0.63rem]">
          <a href="#">
            <Img src="images/img_metamask_fox_1.svg" alt="Metamask Icon" className="h-[1.25rem] w-[1.25rem]" />
          </a>
          <Heading
            size="headings"
            as="p"
            className="ml-[0.50rem] self-end text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
          >
            0x6893...2uh8
          </Heading>
          <div className="ml-[1.00rem] flex items-center gap-[0.38rem]">
            <Heading
              size="headings"
              as="p"
              className="text-[0.75rem] font-bold capitalize tracking-[0.00rem] text-white-a700"
            >
              o MATIC
            </Heading>
            <Img src="images/img_arrowright336.svg" alt="Balance Icon" className="h-[0.25rem]" />
          </div>
        </div>
      </div>
    </header>
  );
}
