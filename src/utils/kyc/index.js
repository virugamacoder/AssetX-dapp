import Persona from "persona";
import { createKYC } from "services/pinata";
// import { CompleteKYCApi } from "../apis/kyc";

function InlineInquiry(currentWalletAddress, getKYCData) {
    const client = new Persona.Client({
        templateId: import.meta.env.VITE_PERSONA_ID,
        environment: "sandbox",
        onReady: () => client.open(),
        onComplete: async ({ inquiryId, status, fields }) => {
            console.log(inquiryId, status, fields);
            await createKYC({ walletAddress: currentWalletAddress, kycData: { inquiryId: inquiryId, status: status, ...fields } }).then((res) => {
                console.log("KYC completed successfully", res);
                getKYCData();
            });
        },
        onCancel: ({ inquiryId, sessionToken, status }) =>
            console.log(inquiryId, sessionToken, status),
        onError: (error) => console.log(error),
    });
    return client;
}

export default InlineInquiry;
