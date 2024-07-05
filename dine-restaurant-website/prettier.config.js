import defaultConfig from '@epic-web/config/prettier'

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	...defaultConfig,
	tailwindFunctions: [...defaultConfig.tailwindFunctions, 'cva', 'cx'],
}

export default config
