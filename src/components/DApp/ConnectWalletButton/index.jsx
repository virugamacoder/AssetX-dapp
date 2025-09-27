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
                                            variant={`outline`}
                                            style={{ fontSize: 12, height: 38, borderColor: `var(--white_a700_99)`, color: `var(--white_a700_99)` }}
                                            color={`white_A700`}
                                            className="self-stretch px-[0.65rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
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
                                            onClick={openAccountModal}
                                            variant={`outline`}
                                            style={{ fontSize: 12, height: 38, borderColor: `var(--white_a700_99)`, color: `var(--white_a700_99)` }}
                                            color={`white_A700`}
                                            className="self-stretch px-[0.75rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
                                        >
                                            Wrong network
                                        </Button>
                                    </>
                                );
                            }

                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    {/* <button
                                        onClick={openChainModal}
                                        style={{ display: "flex", alignItems: "center" }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button> */}


                                    <Button
                                        onClick={openAccountModal}
                                        variant={`outline`}
                                        style={{ fontSize: 12, height: 38, borderColor: `var(--white_a700_99)`, color: `var(--white_a700_99)` }}
                                        color={`white_A700`}
                                        className="self-stretch px-[0.65rem] font-bold uppercase tracking-[0.00rem] sm:px-[1.25rem]"
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
