import { Text } from "components";

export default function Footer({ ...props }) {
    return (
        <footer {...props} className={`${props.className} flex self-stretch items-center`}>
            <div className="flex w-full items-center justify-between gap-[1.25rem] md:flex-col">
                <div className="flex w-[20%] items-center justify-between gap-[1.25rem] md:w-full">
                    <Text
                        size="text_14px_regular"
                        as="p"
                        className="self-end font-inter text-[0.88rem] font-normal text-black-400"
                    >
                        © 2025 AssetX
                    </Text>
                </div>
                <div className="flex w-[56%] items-center justify-between gap-[1.25rem] md:w-full">
                    
                    <Text
                        size="text_14px_regular"
                        as="p"
                        className="self-end font-inter text-[0.88rem] font-normal text-black-400"
                    >
                        Download Litepaper
                    </Text>
                </div>
            </div>
        </footer>
    );
}
