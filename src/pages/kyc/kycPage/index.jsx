import { building_img, img_copysvgrepocom_1, user_img } from 'assets/images';
import { Button, Heading, Img, Text } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTE_PATH from 'routes/ROUTE_PATH';
import { getKYC } from 'services/pinata';
import { handleCopyToClipboard } from 'utils';
import InlineInquiry from 'utils/kyc';
import { useAccount } from 'wagmi';

function KYCPage() {

    const navigate = useNavigate()
    const [isKYCCompleted, setIsKYCCompleted] = useState(false)
    const { address: currentWalletAddress } = useAccount();

    async function getKYCData() {
        try {
            const kycData = await getKYC(currentWalletAddress);
            console.log("KYC Data:", kycData);
            if (kycData?.data?.data?.isKYCVerified) {
                setIsKYCCompleted(true);
            }
            else {
                setIsKYCCompleted(false);
            }
        } catch (error) {
            console.error("Error fetching KYC data:", error);
            setIsKYCCompleted(false);
        }
    }

    useEffect(() => {
        if (currentWalletAddress) {
            getKYCData();
        }
    }, [currentWalletAddress])

    return (
        <div className='mt-[60px] w-full'>
            <div className="flex flex-col w-full items-center gap-[1.38rem] border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] sm:p-[1.25rem]">
                <Heading
                    size="heading5xl"
                    as="h6"
                    className="text-[2.5rem] font-bold text-white-a700 md:text-[1.63rem] sm:text-[1.50rem]"
                >
                    Dexreal KYC
                </Heading>
                {/*  */}
                <div className="border border-solid border-gray-900_02 bg-gray-900 py-[0.75rem] pl-[1.25rem] pr-[0.75rem] flex gap-[2.5rem] items-center">
                    <div>
                        <Heading
                            size="headinglg"
                            as="h6"
                            className="text-[0.875rem] font-semibold text-white-a700"
                        >
                            {currentWalletAddress?.slice(0, 4)}...{currentWalletAddress?.slice(-4)}
                        </Heading>
                    </div>
                    <div>
                        <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1 bg-[#0B0B0B] px-[1.25rem] py-[0.625rem] cursor-pointer"
                            style={{ color: `var(--brand_color_1)` }}
                        >
                            Not submitted
                        </Heading>
                        {/* <Heading
                            size="textxs"
                            as="p"
                            className="text-[1rem] flex gap-[0.5rem] font-semibold tracking-[0.00rem] text-[#fff] bg-[#0B0B0B] px-[1.25rem] py-[0.625rem] cursor-pointer"
                        >
                            Approved

                            <Img
                                src={correct_icon}
                                alt="Albert Pinkney Image"
                                className="h-[1.25rem] w-[1.25rem] rounded-[24px] object-cover"
                            />
                        </Heading> */}
                    </div>
                </div>

                <div className="flex mt-[40px] items-center flex-col gap-[1.25rem]">
                    <Text
                        as="p"
                        className="text-[0.875rem] font-medium leading-[1.38rem] text-brand_color-1"
                    >
                        Refer a Friend
                    </Text>
                    <Button
                        size="xs"
                        variant="fill"
                        shape="square"
                        rightIcon={
                            <Img
                                src={img_copysvgrepocom_1}
                                alt="Copy-svgrepo-com 1"
                                className="h-[1.00rem] w-[1.00rem] object-cover"
                            />
                        }
                        className="text-[1rem] flex justify-between border-gray-900_02 min-w-[20rem] gap-[0.50rem] border border-solid px-[1rem] py-[1rem] font-bold capitalize tracking-[0.00rem] !text-white-a700 h-auto"
                        onClick={() => {
                            handleCopyToClipboard("RTHU3S")
                            toast.success("Copied to clipboard")
                        }}
                    >
                        RTHU3S
                    </Button>
                </div>

                {isKYCCompleted ? (
                    <Text
                        as="p"
                        className="text-[0.875rem] font-medium leading-[1.38rem] text-brand_color-1"
                    >
                        KYC is already completed for this wallet address.
                    </Text>
                ) : (
                    <div className="flex mt-[60px] items-center gap-[1.5rem]">
                        <div className='flex flex-col items-center min-w-[20rem] border border-gray-900_02 py-[1.875rem]'>
                            <div className=''>
                                <Img
                                    src={user_img}
                                    alt="Albert Pinkney Image"
                                    className="h-[3.75rem] w-[3.75rem] object-cover"
                                />
                            </div>
                            <Heading
                                size="textxs"
                                as="p"
                                className="mt-[1rem] text-[1.125rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1 bg-[#0B0B0B] !text-white-a700"
                                style={{ color: `var(--brand_color_1)` }}
                            >
                                Pass KYC as Individual
                            </Heading>
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className="mt-[1.875rem]  px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !text-[0.75rem] !h-[2.5rem]"
                                // onClick={() => navigate(ROUTE_PATH.KYC_INDIVIDUAL)}
                                onClick={() => {
                                    // await createKYC();
                                    InlineInquiry(currentWalletAddress, getKYCData);
                                }}
                            >
                                Start NOW
                            </Button>
                        </div>
                        <div className='flex flex-col items-center min-w-[20rem] border border-gray-900_02 py-[1.875rem]'>
                            <div className=''>
                                <Img
                                    src={building_img}
                                    alt="Albert Pinkney Image"
                                    className="h-[3.75rem] w-[3.75rem] object-cover"
                                />
                            </div>
                            <Heading
                                size="textxs"
                                as="p"
                                className="mt-[1rem] text-[1.125rem] font-medium capitalize tracking-[0.00rem] text-brand_color-1 bg-[#0B0B0B] !text-white-a700"
                                style={{ color: `var(--brand_color_1)` }}
                            >
                                Pass KYC as Institutional
                            </Heading>
                            <Button
                                shape="square"
                                color="brand_color_0_green_800"
                                className="mt-[1.875rem]  px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem] !text-[0.75rem] !h-[2.5rem]"
                                onClick={() => navigate(ROUTE_PATH.KYC_CORPORATE)}
                            >
                                Start NOW
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default KYCPage
