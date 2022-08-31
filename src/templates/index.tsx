/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import React from "react";
import Core from "src/components/Core/Core";
import Team from "src/components/Team/Team";
import Hero from "src/components/Hero/Hero";
import {
  TemplateProps,
  TemplateRenderProps,
  Template,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import { LocationProfile } from "src/types/entities";
import FeaturedProduct, { fields as featuredProductFields } from "src/components/FeaturedProduct";
import { teamFields } from "src/components/Team/Team";
import { defaultFields, Promo } from "src/components/Promo/Promo";
import Footer from "src/components/Footer"; 
import { About } from "src/components/About/About";
import Header from "src/components/Header";
import Banner from "src/components/Banner/Banner";
import { Main } from 'src/layouts/main';

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "logo",
      "meta",
      "name",
      "address",
      "mainPhone",
      "tollFreePhone",
      "emails",
      "geocodedCoordinate",
      "description",
      "hours",
      "additionalHoursText",
      "services",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildrenCount",
      "slug",
      "c_hero",
      "c_header",
      "c_complexPhoto",
      ...defaultFields,
      ...featuredProductFields,
      ...teamFields,
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
 export const getPath: GetPath<TemplateProps> = (data) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Index: Template<TemplateRenderProps> = (data) => {
  const document = data.document as LocationProfile;
  const {
    name,
    c_featuredProducts,
    description,
    address,
    hours,
    c_team,
    c_hero,
    c_promo,
    _site
  } = document;

  return (
    <Main data={data}>
      <Banner text='e.g. "This location is temporarily closed due to inclement weather."' />
      {/* TODO(aganesh) : use Reviews component when available */}
      <Hero name={name} background={c_hero?.background} address={address} cta1={c_hero?.cta1} cta2={c_hero?.cta2} hours={hours} numReviews={21} rating={4.5} />
      <Core profile={document} address={address}/>
      {c_promo && c_promo.title && <Promo 
        title={c_promo.title}
        description={c_promo.description}
        image={c_promo?.image}
        cta={c_promo?.cta}
        appStoreLink={c_promo.appStoreUrl}
        googlePlayLink={c_promo.googlePlayUrl}
      />}
      <FeaturedProduct title={c_featuredProducts?.title || 'Featured Products'} products={c_featuredProducts?.products || []}/>
      <About 
        title="About Business Geomodifier"
        description={description}
        image={c_hero?.background}
        cta={{
          link: "https://www.yext.com",
          label: "yext.com",
        }}
      />
      {c_team && (
        <Team team={c_team} initialSize={3}/>
      )}
    </Main>
  );
};

export default Index;
