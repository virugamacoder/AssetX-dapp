import { down_direction, flat_direction, img_arrow_down_brand_color_1, img_arrowdown, img_copy_svgrepo_com, img_image_48x48, img_info_circle_svgrepo_com, img_metamaskfox_1_gray_900_02, img_vector, img_vector_8x14, market_detail, up_direction } from 'assets/images';
import { Button, Heading, Img, Text } from 'components'
import InvestmentsPopup from 'features/investments/investmentsPopup';
import { ErrorModel, SuccessModel } from 'features/popularMarkets';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const recentActivityList = [
    {
        id: 1,
        time: "8 mins ago",
        option: "Up",
        amount: "6,010 USDC",
        status: "up" // Status for 'Up'
    },
    {
        id: 2,
        time: "35 mins ago",
        option: "Up",
        amount: "9,633 USDC",
        status: "up" // Status for 'Up'
    },
    {
        id: 3,
        time: "38 mins ago",
        option: "Up",
        amount: "7,169 USDC",
        status: "up" // Status for 'Up'
    },
    {
        id: 4,
        time: "46 mins ago",
        option: "Up",
        amount: "9,783 USDC",
        status: "up" // Status for 'Up'
    },
    {
        id: 5,
        time: "56 mins ago",
        option: "Down",
        amount: "2,922 USDC",
        status: "down" // Status for 'Down'
    },
    {
        id: 6,
        time: "57 mins ago",
        option: "Down",
        amount: "5,745 USDC",
        status: "down" // Status for 'Down'
    },
    {
        id: 7,
        time: "59 mins ago",
        option: "Flat",
        amount: "3,439 USDC",
        status: "flat" // Status for 'Flat'
    }
];


function MarketDetailPage() {
    const [dashboardPopup, setDashboardPopup] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="mt-[3.75rem] flex flex-col gap-[1.25rem] self-stretch">
                <div className="flex items-center md:flex-col">
                    <div className="flex w-full items-center justify-center md:w-full">
                        <Button
                            style={{ padding: 0 }}
                            onClick={() => navigate(-1)}
                        >
                            <Img
                                src={img_arrow_down_brand_color_1}
                                alt="Arrow Down Image"
                                className="h-[1.50rem] w-[1.50rem]"
                            />
                        </Button>
                        <div className="flex flex-1 items-center gap-[1.25rem] px-[1.88rem] sm:px-[1.25rem]">
                            <Heading
                                size="heading5xl"
                                as="h3"
                                className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                            >
                                Lorem Ipsum is simply text the printing and typesetting
                            </Heading>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[2.5rem] self-stretch">
                <div className="flex items-start gap-[2.50rem] md:flex-col">
                    <div className="flex flex-1 flex-col gap-[1.25rem] md:self-stretch">
                        <Img src={market_detail} alt="Overview Image" className="h-[27.38rem] object-cover" />
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col items-start gap-[1.38rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                <Heading
                                    size="heading5xl"
                                    as="h6"
                                    className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                >
                                    About Market
                                </Heading>
                                <Text
                                    as="p"
                                    className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                >
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </Text>
                                <Text
                                    as="p"
                                    className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                >
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </Text>
                                <Text
                                    as="p"
                                    className="w-full font-inter text-[1.00rem] font-normal leading-[1.38rem] text-brand_color-1"
                                >
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                                </Text>
                            </div>
                            <div className="flex flex-col gap-[1.25rem]">
                                <div className="flex flex-col items-start gap-[1.00rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                                    <Heading
                                        size="heading5xl"
                                        as="h3"
                                        className="text-[1.75rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                                    >
                                        Recent Activity
                                    </Heading>
                                    <div className="self-stretch bg-gray-900">
                                        <div className="w-full">
                                            <div className="flex justify-between text-[.75rem] text-brand_color-1 font-medium py-2 px-4">
                                                <div className="w-3/5">Time</div>
                                                <div className="w-1/3">Option</div>
                                                <div className="w-1/3 text-center">Amount</div>
                                            </div>

                                            <div className='flex flex-col gap-[.5rem]'>
                                                {recentActivityList?.map((activity, index) => (
                                                    <div
                                                        key={`activity-${index}`}
                                                        style={
                                                            activity.status == "up" ?
                                                                {
                                                                    background: `linear-gradient(90deg, rgba(41, 109, 56, 0.4) -0.33%, rgba(63, 167, 142, 0.4) 100%)`
                                                                }
                                                                :
                                                                activity.status == "down" ?
                                                                    {
                                                                        background: `linear-gradient(90deg, rgba(109, 41, 41, 0.4) -0.33%, rgba(167, 63, 63, 0.4) 100%)`
                                                                    }
                                                                    :
                                                                    {
                                                                        background: `linear-gradient(90deg, rgba(109, 78, 41, 0.4) -0.33%, rgba(167, 125, 63, 0.4) 100%)`
                                                                    }
                                                        }
                                                        className="flex justify-between bg-gray-900 text-gray-300 py-2 px-4"
                                                    >
                                                        <div className="w-3/5">{activity.time}</div>
                                                        <div className="w-1/3 flex items-center gap-[.2rem]">
                                                            <div>
                                                                {activity?.status === "up" ?
                                                                    <Img
                                                                        src={up_direction}
                                                                        alt="Participants Icon"
                                                                        className="w-[0.75rem] self-end"
                                                                    />
                                                                    :
                                                                    activity?.status === "down" ?
                                                                        <Img
                                                                            src={down_direction}
                                                                            alt="Participants Icon"
                                                                            className="w-[0.75rem] self-end"
                                                                        />
                                                                        :
                                                                        <Img
                                                                            src={flat_direction}
                                                                            alt="Participants Icon"
                                                                            className="w-[0.75rem] self-end"
                                                                        />
                                                                }
                                                            </div>
                                                            <span className='text-[0.875rem] font-medium'>
                                                                {activity?.status === "up" ?
                                                                    `Up`
                                                                    :
                                                                    activity?.status === "down" ?
                                                                        `Down`
                                                                        :
                                                                        `Flat`
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="w-1/3 text-center">{activity.amount}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex w-[36%] flex-col gap-[1.25rem] self-start md:w-full">
                        <div className="flex flex-col gap-[1.88rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">

                            <div className="flex justify-between items-center pb-[1.875rem] border-b border-gray-900_02">
                                <span className="text-[1.25rem] text-white-a700 font-medium">Total Pool</span>
                                <Heading
                                    size="headingmd"
                                    as="p"
                                    className="text-[2rem] font-bold"
                                    style={{
                                        background: `linear-gradient(var(--gradient4))`,
                                        backgroundClip: `text`,
                                        color: `transparent`,
                                    }}
                                >
                                    $5000
                                </Heading>
                            </div>

                            <div className='flex flex-col gap-[1.25rem] pb-[1.875rem] border-b border-gray-900_02'>
                                <div
                                    onClick={() => setDashboardPopup(true)}
                                    style={{
                                        background: `linear-gradient(90deg, rgba(41, 109, 56, 0.6) -0.33%, rgba(63, 167, 142, 0.6) 100%)`
                                    }}
                                    className={``}>
                                    <div className={`flex justify-between px-[1rem] py-[.75rem] border-b border-[#FFFFFF33]`}>
                                        <div className={`flex gap-[1rem] items-center`}>
                                            <Img
                                                src={up_direction}
                                                alt="Participants Icon"
                                                className="w-[1.2rem]"
                                            />
                                            <span className='text-[1.5rem] text-white-a700 font-bold'>
                                                UP
                                            </span>
                                        </div>
                                        <Img
                                            src={img_arrowdown}
                                            alt="Participants Icon"
                                            className="w-[1.2rem]"
                                        />
                                    </div>
                                    <div className='flex w-full py-[.75rem] px-[1rem]'>
                                        <div className="flex w-1/2 flex-col">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Total pool
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                $ 500
                                            </Heading>
                                        </div>
                                        <div className="flex w-1/2 flex-col border-l border-[#FFFFFF33] pl-[1.5rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Potential ROI
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                2.3x
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, rgba(109, 78, 41, 0.6) -0.33%, rgba(167, 125, 63, 0.6) 100%)`
                                    }}
                                    className={``}>
                                    <div className={`flex justify-between px-[1rem] py-[.75rem] border-b border-[#FFFFFF33]`}>
                                        <div className={`flex gap-[1rem] items-center`}>
                                            <Img
                                                src={flat_direction}
                                                alt="Participants Icon"
                                                className="w-[1.2rem]"
                                            />
                                            <span className='text-[1.5rem] text-white-a700 font-bold'>
                                                FLAT
                                            </span>
                                        </div>
                                        <Img
                                            src={img_arrowdown}
                                            alt="Participants Icon"
                                            className="w-[1.2rem]"
                                        />
                                    </div>
                                    <div className='flex w-full py-[.75rem] px-[1rem]'>
                                        <div className="flex w-1/2 flex-col">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Total pool
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                $ 500
                                            </Heading>
                                        </div>
                                        <div className="flex w-1/2 flex-col border-l border-[#FFFFFF33] pl-[1.5rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Potential ROI
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                2.3x
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, rgba(109, 41, 41, 0.6) -0.33%, rgba(167, 63, 63, 0.6) 100%)`
                                    }}
                                    className={``}>
                                    <div className={`flex justify-between px-[1rem] py-[.75rem] border-b border-[#FFFFFF33]`}>
                                        <div className={`flex gap-[1rem] items-center`}>
                                            <Img
                                                src={down_direction}
                                                alt="Participants Icon"
                                                className="w-[1.2rem]"
                                            />
                                            <span className='text-[1.5rem] text-white-a700 font-bold'>
                                                DOWN
                                            </span>
                                        </div>
                                        <Img
                                            src={img_arrowdown}
                                            alt="Participants Icon"
                                            className="w-[1.2rem]"
                                        />
                                    </div>
                                    <div className='flex w-full py-[.75rem] px-[1rem]'>
                                        <div className="flex w-1/2 flex-col">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Total pool
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                $ 500
                                            </Heading>
                                        </div>
                                        <div className="flex w-1/2 flex-col border-l border-[#FFFFFF33] pl-[1.5rem]">
                                            <Heading
                                                as="p"
                                                className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                            >
                                                Potential ROI
                                            </Heading>
                                            <Heading
                                                size="heading3xl"
                                                as="h5"
                                                className="!text-[1.125rem] font-bold text-white-a700"
                                            >
                                                2.3x
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[.75rem]'>
                                <div className="flex justify-between items-center pb-[.75rem]">
                                    <span className="text-[1rem] text-white-a700 font-medium">Your Predictions</span>
                                </div>
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, rgba(41, 109, 56, 0.6) -0.33%, rgba(63, 167, 142, 0.6) 100%)`
                                    }}
                                    className='flex w-full py-[.75rem] px-[1rem]'
                                >
                                    <div className="flex w-3/5 flex-col">
                                        <Heading
                                            as="p"
                                            className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                        >
                                            Price Avg. | Cur.
                                        </Heading>
                                        <Heading
                                            size="heading3xl"
                                            as="h5"
                                            className="!text-[1.125rem] font-bold text-white-a700"
                                        >
                                            $2342 | $4234
                                        </Heading>
                                    </div>
                                    <div className="flex w-1/3 flex-col border-l border-[#FFFFFF33] pl-[1.5rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                        >
                                            P/L
                                        </Heading>
                                        <Heading
                                            size="heading3xl"
                                            as="h5"
                                            className="!text-[1.125rem] font-bold text-white-a700"
                                        >
                                            -23%
                                        </Heading>
                                    </div>
                                    <div className="flex w-1/3 flex-col border-l border-[#FFFFFF33] pl-[1.5rem]">
                                        <Heading
                                            as="p"
                                            className="text-[0.875rem] font-medium tracking-[0.00rem] !text-[#FFFFFF66]"
                                        >
                                            Your bet
                                        </Heading>
                                        <Heading
                                            size="heading3xl"
                                            as="h5"
                                            className="!text-[1.125rem] font-bold text-white-a700"
                                        >
                                            $1932
                                        </Heading>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {dashboardPopup &&
                <ErrorModel
                    onClose={() => setDashboardPopup(false)}
                />
            }
            {/* {dashboardPopup &&
                <SuccessModel
                    onClose={() => setDashboardPopup(false)}
                />
            } */}
        </>
    )
}

export default MarketDetailPage
