import { config as defaultConfig } from '@epic-web/config/eslint'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		ignores: ['.netlify/'],
	},
	...defaultConfig,
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
]
