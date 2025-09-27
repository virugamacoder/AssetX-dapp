import { Heading } from 'components'
import { useCustomQuery } from 'hooks'
import { useState } from 'react'
import { getMyStoRQ, STOS_KEYS } from 'services/STO'
import { useAccount } from 'wagmi'
import { AddLiquidity } from 'pages'

function LiquidityPage() {
    const [disclaims, setDisclaims] = useState(true)

    const { address: currentWalletAddress } = useAccount();

    const { data: myStoListData, isLoading: myStoListLoading } = useCustomQuery({
        queryKey: [STOS_KEYS.MY_STOS, currentWalletAddress],
        queryFn: getMyStoRQ,
        enabled: !!currentWalletAddress,
        // staleTime: STALE_TIME_FOR_API.HOURS * 5,
    });

    return (
        <div className="mt-[3.75rem] flex flex-1 flex-col items-center gap-[1.88rem] self-stretch bg-gray-950 min-h-screen">
            <div className="w-[41%] flex items-center justify-between gap-[1.25rem] self-center md:self-stretch">
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

            {/* Add Liquidity Form */}
            <div className="w-[41%] self-center md:self-stretch">
                <AddLiquidity embedded={true} />
            </div>

            {/* My Liquidity Section */}
            <div className="w-[41%] flex flex-col items-center border border-solid border-gray-900_02 bg-gray-900_01 p-[1.88rem] self-center md:self-stretch sm:p-[1.25rem]">
                <Heading
                    size="heading2xl"
                    as="h5"
                    className="self-start text-[1.25rem] font-bold text-white-a700"
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
