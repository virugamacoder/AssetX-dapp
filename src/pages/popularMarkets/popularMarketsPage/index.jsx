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

                <Heading
                    size="heading7xl"
                    as="h1"
                    className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                >
                    Coming Soon..
                </Heading>

                

            </div>
        </div>
    )
}

export default PopularMarketsPage
