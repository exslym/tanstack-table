import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './src',
	publicDir: '../public',
	base: './',

	build: {
		emptyOutDir: true,
		outDir: '../dist',
	},
	css: {
		devSourcemap: true,
	},

	plugins: [react()],
});
