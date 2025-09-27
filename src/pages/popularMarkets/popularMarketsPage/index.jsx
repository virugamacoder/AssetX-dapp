import { img_arrowdown, img_search, market_1, market_2, market_3, market_4 } from "assets/images";
import { Heading, Img, Input, SelectBox } from "components"
import { CloseSVG } from "components/Input/close";
import { useState } from "react";
import PopularMarketCard from "../components/popularMarketCard";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "routes/ROUTE_PATH";

const dropDownOptions = [
    { label: "All Markets", value: "all_markets" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];

const popularMarketList = [
    {
        id: 1,
        cardImage: market_1,
        publicSalesButton: `Crypto`,
        securityTokenText: `Updated: 5 Mins ago`,
        priceText: `Lorem Ipsum is simply text the printing and typesetting`,
        totalPoolValue: `$500`,
        potentialValue: `2.3X`
    },
    {
        id: 2,
        cardImage: market_2,
        publicSalesButton: `Politics`,
        securityTokenText: `Updated: 5 Mins ago`,
        priceText: `Lorem Ipsum is simply text the printing and typesetting`,
        totalPoolValue: `$500`,
        potentialValue: `2.3X`
    },
    {
        id: 3,
        cardImage: market_3,
        publicSalesButton: `Politics`,
        securityTokenText: `Updated: 5 Mins ago`,
        priceText: `Lorem Ipsum is simply text the printing and typesetting`,
        totalPoolValue: `$500`,
        potentialValue: `2.3X`
    },
    {
        id: 4,
        cardImage: market_4,
        publicSalesButton: `Crypto`,
        securityTokenText: `Updated: 5 Mins ago`,
        priceText: `Lorem Ipsum is simply text the printing and typesetting`,
        totalPoolValue: `$500`,
        potentialValue: `2.3X`
    },
]

function PopularMarketsPage() {
    const [searchBarValue1, setSearchBarValue1] = useState("");
    const [selectedMarket, setSelectedMarket] = useState("");

    const navigate = useNavigate()

    return (
        <div className="mt-[3.75rem] self-stretch">
            <div className="flex flex-col items-start gap-[1.63rem]">
                <Heading
                    size="heading7xl"
                    as="h1"
                    className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                >
                    Popular Markets
                </Heading>
                <div className="w-full">
                    <div className='flex flex-1 w-full'>
                        <Input
                            size="xs"
                            shape="square"
                            name="Search Field"
                            placeholder={`Search...`}
                            value={searchBarValue1}
                            onChange={(e) => setSearchBarValue1(e.target.value)}
                            prefix={
                                <Img
                                    src={img_search}
                                    alt="Search"
                                    className="my-[0.13rem] h-[20px] w-[20px]"
                                />
                            }
                            suffix={
                                searchBarValue1?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue1("")} height={24} fillColor="#828282ff"
                                        className='cursor-pointer p-[3px]'
                                    />
                                ) : null
                            }
                            className="w-full gap-[0.50rem] border px-[0.75rem] capitalize tracking-[0.00rem] md:w-full"
                            inputClassNames={`bg-transparent border-none text-[14px] focus:ring-0 text-white-a700`}
                        />
                        <SelectBox
                            shape="square"
                            indicator={
                                <Img src={img_arrowdown} alt="Arrow Down" className="h-[0.75rem] w-[0.50rem]" />
                            }
                            value={selectedMarket || ""}
                            onChange={(e) => setSelectedMarket(e.value)}
                            name="Industry Dropdown"
                            placeholder={`All Markets`}
                            options={dropDownOptions}
                            className="ml-[3.00rem] w-[12%] gap-[0.50rem] border border-solid border-gray-900_02 px-[0.75rem] font-bold capitalize tracking-[0.00rem] md:ml-0 md:w-full"
                        />
                    </div>
                    {/* Content */}
                    <div className={`mt-[2rem]`}>
                        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[1.688rem]">
                            {popularMarketList?.map((market, index) => (
                                <PopularMarketCard
                                    onCardClick={() => navigate(`${ROUTE_PATH.POPULAR_MARKETS}/${market.id}`)}
                                    key={`popular-market-${index}`}
                                    cardImage={market.cardImage}
                                    publicSalesButton={market.publicSalesButton}
                                    securityTokenText={market.securityTokenText}
                                    priceText={market.priceText}
                                    totalPoolText={`Total Pool`}
                                    totalPoolValue={market.totalPoolValue}
                                    potentialText={`Potential ROI`}
                                    potentialValue={market.potentialValue}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PopularMarketsPage
