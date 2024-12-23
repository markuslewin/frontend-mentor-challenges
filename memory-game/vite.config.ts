/// <reference types="vitest" />
import path from 'node:path'
import react from '@vitejs/plugin-react'
import wyw from '@wyw-in-js/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		assetsInlineLimit(filePath, content) {
			if (path.basename(filePath) === 'sprite.svg') {
				return false
			}
			return content.byteLength < 4096
		},
	},
	plugins: [
		react(),
		imagetools(),
		wyw({
			include: ['**/*.{ts,tsx}'],
			babelOptions: {
				presets: ['@babel/preset-typescript', '@babel/preset-react'],
			},
		}),
	],
	test: {
		include: ['./app/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup/setup-test-env.ts'],
	},
})
