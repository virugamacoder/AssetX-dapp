import { img_image, img_image_60x60, img_polygonlogofreelogovectorsnet_1, img_secure_svgrepo_com } from "assets/images";
import { Button, Heading, Img } from "components";


export default function PopularMarketCard({
    cardImage = "",
    publicSalesButton = "",
    securityTokenImage = "",
    securityTokenText = "",
    priceText = "",
    onCardClick = () => { },
    totalPoolText,
    totalPoolValue,
    potentialText,
    potentialValue,
    ...props
}) {
    return (
        <div
            {...props}
            className={`${props.className} flex flex-col items-center w-full border-gray-900_02 border border-solid bg-gray-900_01`}
        >
            <div className="self-stretch">
                <div className="flex flex-col">
                    <div className="relative h-[14.38rem] content-center">
                        <Img src={cardImage} alt="Public Image" className="mx-auto h-[14.38rem] w-full flex-1 object-cover" />
                        <Button
                            color="gray_900_99"
                            size="xs"
                            variant="fill"
                            shape="square"
                            className="absolute left-[1.19rem] top-[1.19rem] m-auto min-w-[5.75rem] px-[0.75rem] font-semibold"
                        >
                            {publicSalesButton}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center p-[1.875rem] cursor-pointer"
                    onClick={() => onCardClick()}
                >
                    <div className="flex items-start self-stretch">
                        <Heading
                            as="p"
                            className="font-inter text-[0.875rem] font-normal tracking-[0.00rem] !text-brand_color-1"
                        >
                            {securityTokenText}
                        </Heading>
                    </div>
                    <Heading
                        size="heading3xl"
                        as="h5"
                        className="mt-[0.5rem] self-start text-[1.38rem] font-bold text-white-a700"
                    >
                        {priceText}
                    </Heading>
                    <div className={`flex w-full mt-[1.5rem]`}>
                        <div className="flex w-1/2 flex-col text-center">
                            <Heading
                                as="p"
                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-brand_color-1"
                            >
                                {totalPoolText}
                            </Heading>
                            <Heading
                                size="heading3xl"
                                as="h5"
                                className="mt-[0.5rem] text-[1.38rem] font-bold text-white-a700"
                            >
                                {totalPoolValue}
                            </Heading>
                        </div>
                        <div className="flex w-1/2 flex-col">
                            <Heading
                                as="p"
                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-brand_color-1"
                            >
                                {potentialText}
                            </Heading>
                            <Heading
                                size="heading3xl"
                                as="h5"
                                className="mt-[0.5rem] text-[#19D521] text-[1.38rem] font-bold text-white-a700"
                            >
                                {potentialValue}
                            </Heading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
