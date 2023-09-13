/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'orange': '#F4BA50',
                'darkOrange': '#EA9D0E',
                'blackOrange': '#664508',
                'background': '#FFF9ED',
                'contrastOrange': '#508AF4',
                'orangeGray': '#44413C',
                'orangeWhite': '#FFFDFA',
                'orangeBlack': '#120F0D'
            },
        },
    },
    plugins: [],
}

