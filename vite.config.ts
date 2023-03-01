
/* IMPORT */

import { defineConfig } from 'vite'

/* MAIN */

const config = defineConfig({
	build: {
		target: 'esnext',
		// minify: false,
		lib: {
			name: 'vhtml',
			formats: ['umd', 'es'],
			entry: "./src/vhtml.ts"
		},
	},
	esbuild: {
		// jsx: 'automatic',
	},
})

/* EXPORT */

export default config
