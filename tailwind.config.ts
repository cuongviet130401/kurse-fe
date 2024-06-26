import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'


export default {
	important: true,
	darkMode: 'class',
	content: [
		'./**/*.{html,js,svelte,ts}',
		join(
			require.resolve('@skeletonlabs/skeleton'),
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		
		// daisyui,
		skeleton({
			themes: { preset: [
				{ name: "wintry", enhancements: true }
			] }
		}),
		forms,
		typography,
	],

	// daisyui: {
	// 	themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
	// 	darkTheme: "dark", // name of one of the included themes for dark mode
	// 	base: true, // applies background color and foreground color for root element by default
	// 	styled: true, // include daisyUI colors and design decisions for all components
	// 	utils: true, // adds responsive and modifier utility classes
	// 	prefix: "daisy", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
	// 	logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	// 	themeRoot: ":root", // The element that receives theme color CSS variables
	// },

};
