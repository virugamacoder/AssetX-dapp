import { img_facebook, img_footer_logo, img_info_black_400, img_trash, img_warning_black_400 } from "assets/images";
import { Img, Text } from "components";

export default function Footer({ ...props }) {
    return (
        <footer {...props} className={`${props.className} flex self-stretch items-center`}>
            <div className="flex w-full items-center justify-between gap-[1.25rem] md:flex-col">
                <div className="flex w-[20%] items-center justify-between gap-[1.25rem] md:w-full">
                    <Img src={img_footer_logo} alt="Footer Logo" className="h-[1.50rem] w-[6.50rem] object-contain" />
                </div>
            </div>
        </footer>
    );
}
