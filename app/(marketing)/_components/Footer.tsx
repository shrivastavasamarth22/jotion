import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
            <Logo />

            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <h2 className="text-base font-medium text-[#111] dark:text-[#fff]">
                    Made with ❤️ by{" "}
                    <span className="underline">
                        <a href="https://github.com/shrivastavasamarth22" target="_blank">Samarth Shrivastava</a>
                    </span>
                </h2>
            </div>
        </div>
    );
};

export default Footer;
