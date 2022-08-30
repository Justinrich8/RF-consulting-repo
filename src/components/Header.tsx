import React from "react";
import "src/components/Header.css";
import { Image, Link } from "@yext/pages/components";
import { CTA, Image as ImageType } from "@yext/types";

type HeaderProps = {
    links: CTA[];
    logo?: ImageType;
}

const Header = (props: HeaderProps) => {
    const { logo, links } = props;
    return (
        <div className="Header py-4 container flex justify-between">
            {logo && <div className="Header-logoContainer flex justify-center">
                {/* TODO(dkianersi): include bpSizes prop */}
                <Image className="Header-logo" image={logo} />
            </div>}
            <div className="Header-content flex items-center">
                <ul className="flex">
                    {links.map((item: CTA) => (
                        <li key={item.label}>
                            <Link className="Header-link Link Link--primary" cta={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;