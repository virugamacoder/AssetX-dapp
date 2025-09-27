import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, Heading, Img } from 'components'
import { useCustomQuery } from 'hooks'
import { img_settings_svgrepo_com } from 'assets/images'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ROUTE_PATH from 'routes/ROUTE_PATH'
import { getMyStoRQ, STOS_KEYS } from 'services/STO'
import { useAccount } from 'wagmi'

function LiquidityPage() {
    const [disclaims, setDisclaims] = useState(true)

    const { address: currentWalletAddress } = useAccount();
    const { openConnectModal } = useConnectModal();

    const navigate = useNavigate()

    const { data: myStoListData, isLoading: myStoListLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.MY_STOS, currentWalletAddress],
        queryFn: getMyStoRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    return (
        // <div className="mt-[3.75rem] flex items-start self-stretch md:flex-col">
        <div className="w-[41%] mt-[3.75rem] flex flex-1 flex-col items-center gap-[1.88rem] self-center md:self-stretch">
            <div className="flex items-center justify-between gap-[1.25rem] self-stretch">
                <Heading
                    size="heading7xl"
                    as="h1"
                    className="text-[2.50rem] font-bold text-gray-50 md:text-[2.38rem] sm:text-[2.25rem]"
                >
                    Liquidity
                </Heading>
                {/* <Link to={ROUTE_PATH.LIQUIDITY_SETTINGS}>
                    <Img
                        src={img_settings_svgrepo_com}
                        alt="Settings Image"
                        className="h-[1.75rem] w-[1.75rem]"
                    />
                </Link> */}
            </div>
            <div className="w-full flex flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] md:w-full sm:p-[1.25rem]">
                {currentWalletAddress ?
                    <Button
                        shape="square"
                        color="brand_color_0_green_800"
                        className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                        onClick={() => navigate(ROUTE_PATH.ADD_LIQUIDITY)}
                    >
                        Add Liquidity
                    </Button>
                    :
                    <Button
                        shape="square"
                        color="brand_color_0_green_800"
                        className="mt-[2.50rem] self-stretch px-[2.13rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                        onClick={() => openConnectModal()}
                    >
                        CONNECT WALLET
                    </Button>
                }
                <Heading
                    size="heading2xl"
                    as="h5"
                    className="mt-[2.50rem] self-start text-[1.25rem] font-bold text-white-a700"
                >
                    My Liquidity
                </Heading>
                <div className='mt-[1.25rem] self-stretch border border-solid border-gray-900_02 px-[1.94rem] font-medium !text-brand_color-1 sm:px-[1.25rem] bg-gray-900 h-[5rem] flex items-center justify-center'>
                    No liquidity found
                </div>
                {/* <div className="mt-[1.25rem] flex flex-wrap gap-[0.50rem]">
                    <Heading
                        style={{
                            color: `var(--brand_color_1)`,
                        }}
                        as="p"
                        className="text-[0.88rem] font-medium text-brand_color-1"
                    >
                        Don&#39;t see a pool you joined?
                    </Heading>
                    <Button
                        style={{
                            padding: '0',
                            height: "auto",
                            fontSize: "0.88rem",
                        }}
                        className="bg-gradient bg-clip-text text-[0.88rem] font-bold text-transparent"
                        onClick={() => console.log('Import it')}
                    >
                        Import it.
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default LiquidityPage
