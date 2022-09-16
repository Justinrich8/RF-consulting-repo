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
import type {
	Template,
	TemplateProps,
	TemplateRenderProps,
	GetPath,
	TemplateConfig,
	GetHeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import { DirectoryList, directoryListFields } from "src/components/Directory/DirectoryList"
import type { DirectoryProfile } from "src/types/entities";
import { Main } from 'src/layouts/main';

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
	stream: {
		$id: "directory-root",
		// Specifies the exact data that each generated document will contain. This data is passed in
		// directly as props to the default exported function.
		fields: [
			"id",
			"uid",
			"meta",
			"name",
			"slug",
			"c_meta",
			...directoryListFields
		],
		// Defines the scope of entities that qualify for this stream.
		filter: {
			savedFilterIds: ["dm_defaultDirectory"],
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
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (data) => {
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
const Root: Template<TemplateRenderProps> = (data) => {
	const document = data.document as DirectoryProfile<DirectoryProfile<never>>;
	const { name, dm_directoryChildren, dm_directoryChildrenCount } = document;

	return (
		<Main data={data}>
			<DirectoryList
				name={name}
				showNumLocs={true}
				count={dm_directoryChildrenCount}
				directoryChildren={dm_directoryChildren || []}
				relativePrefixToRoot={data.relativePrefixToRoot}
			/>
    </Main>
	);
};

export default Root;