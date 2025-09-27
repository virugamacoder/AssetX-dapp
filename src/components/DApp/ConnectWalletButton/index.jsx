import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "components";
import { useEffect } from "react";
import { useAccount, useAccountEffect } from "wagmi";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "routes/ROUTE_PATH";

function ConnectWalletButton() {

    const account = useAccount()
    const navigate = useNavigate()


    // console.log("account", account.address)

    useEffect(() => {
        if (account.address) {
            console.log(!localStorage.getItem("connected"))
            if (!localStorage.getItem("connected")) {
                localStorage.setItem("connected", "true");
                console.log("redirect")
                navigate(ROUTE_PATH.KYC)
            }
        }
        return () => {
            if (account.address) {
                localStorage.setItem("connected", "true");
            } else {
                localStorage.removeItem("connected")
            }
        }
    }, [account.address])

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {

                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");

                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <>
                                        <Button
                                            onClick={openConnectModal}
                                            variant={`fill`}
                                            style={{ 
                                                fontSize: 14, 
                                                height: 42, 
                                                backgroundColor: `var(--brand_color_0)`,
                                                color: `white`,
                                                border: `2px solid var(--brand_color_0)`,
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)'
                                            }}
                                            color={`white_A700`}
                                            className="self-stretch px-[1rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.5rem] hover:opacity-90 transition-all duration-200"
                                        >
                                            CONNECT WALLET
                                        </Button>
                                    </>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <>
                                        <Button
                                            onClick={openChainModal}
                                            variant={`fill`}
                                            style={{ 
                                                fontSize: 14, 
                                                height: 42, 
                                                backgroundColor: `#ef4444`,
                                                color: `white`,
                                                border: `2px solid #ef4444`,
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                                            }}
                                            color={`white_A700`}
                                            className="self-stretch px-[1rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.5rem] hover:opacity-90 transition-all duration-200"
                                        >
                                            SWITCH NETWORK
                                        </Button>
                                    </>
                                );
                            }

                            return (
                                <div style={{ display: "flex", gap: 8 }}>
                                    <Button
                                        onClick={openChainModal}
                                        variant={`fill`}
                                        style={{ 
                                            fontSize: 12, 
                                            height: 40, 
                                            backgroundColor: `var(--brand_color_0)`,
                                            color: `white`,
                                            border: `1px solid var(--brand_color_0)`,
                                            borderRadius: '6px',
                                            display: "flex", 
                                            alignItems: "center",
                                            gap: "6px",
                                            fontWeight: '600',
                                            minWidth: '100px'
                                        }}
                                        color={`white_A700`}
                                        className="px-[0.75rem] font-semibold uppercase tracking-[0.00rem] hover:opacity-90 transition-all duration-200"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        style={{ width: 18, height: 18 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </Button>

                                    <Button
                                        onClick={openAccountModal}
                                        variant={`fill`}
                                        style={{ 
                                            fontSize: 12, 
                                            height: 40, 
                                            backgroundColor: `rgba(255, 255, 255, 0.1)`,
                                            color: `white`,
                                            border: `1px solid rgba(255, 255, 255, 0.3)`,
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        color={`white_A700`}
                                        className="px-[1rem] font-semibold uppercase tracking-[0.00rem] hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                                    >
                                        {account.displayName}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default ConnectWalletButton
