import type { CTA, Image as ImageType } from "@yext/types";
import { Image, Link } from "@yext/sites-components";
import c from "classnames";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MaybeLink } from "src/components/common/MaybeLink";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";

const Header = () => {
  const templateData = useTemplateData();
  const siteProfile = templateData.document._site;

  return (
    <ErrorBoundaryWithAnalytics name="header">
      <HeaderLayout
        links={siteProfile.c_header?.links || []}
        logo={siteProfile.c_header?.logo}
      />
    </ErrorBoundaryWithAnalytics>
  );
};

type HeaderLayoutProps = {
  links: CTA[];
  logo?: ImageType;
  logoLink?: string;
};

const HeaderLayout = (props: HeaderLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logo, logoLink, links } = props;

  return (
    <header className="Header relative">
      <div className="container py-5 flex justify-start md:justify-between">
        {logo && <HeaderLogo logo={logo} logoLink={logoLink} />}

        <HeaderLinks links={links} />

        <button
          className="flex md:hidden absolute p-4 right-0 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
          <span className="sr-only">Toggle Header Menu</span>
        </button>
      </div>

      <HeaderMobileMenu isOpen={menuOpen} links={links} />
    </header>
  );
};

const HeaderLogo = (props: { logo: ImageType; logoLink?: string }) => {
  return (
    <MaybeLink className="Header-logoLink" href={props.logoLink}>
      <div className="flex w-[144px] mr-2">
        <Image image={props.logo} layout="fill" />
      </div>
    </MaybeLink>
  );
};

const HeaderLinks = (props: { links: CTA[] }) => {
  return (
    <div className="hidden md:flex items-center">
      <ul className="flex">
        {props.links.map((item: CTA) => (
          <li key={item.label}>
            <Link
              className="Link Link--primary Link--header mx-2 lg:mx-5"
              cta={item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const HeaderMobileMenu = (props: { isOpen?: boolean; links: CTA[] }) => {
  return (
    <div
      className={
        c({ visible: props.isOpen }) +
        "hidden absolute top-full left-0 right-0 h-screen bg-white"
      }
    >
      <div className="container">
        <ul className="flex flex-col">
          {props.links.map((item: CTA) => (
            <li key={item.label}>
              <Link className="Link Link--header py-3 block" cta={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Header };
