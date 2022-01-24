module.exports = {
   darkMode: "class",
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         typography: {
            DEFAULT: {
               css: {
                  p: {
                     marginTop: 1.5,
                     marginBottom: 1.5,
                  },
               },
            },
         },
      },
   },
   plugins: [require("@tailwindcss/typography")],
};
