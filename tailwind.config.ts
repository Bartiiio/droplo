import type { Config } from "tailwindcss";

export default {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            "custom-purple": "#7F56D9",
            "background-grey": "#EAECF0",
         },
      },
   },
   plugins: [],
} satisfies Config;
