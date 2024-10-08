import { config as defaultConfig } from '@epic-web/config/eslint'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ['.netlify/', 'public/mockServiceWorker.js'],
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
