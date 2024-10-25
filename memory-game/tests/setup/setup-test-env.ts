import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

beforeEach(() => {
	// todo: Import for every file using `jsdom` instead?
	if (typeof window !== 'undefined') {
		// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
		vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
			return {
				// `@media (${media.tablet})` and `media.desktop` matches
				matches: true,
				media: query,
				onchange: null,
				addListener: vi.fn(), // deprecated
				removeListener: vi.fn(), // deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}
		})
	}
})

afterEach(() => {
	cleanup()
})
