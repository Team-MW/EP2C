export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {}, // Autoprefixer is optional usually with v4 but keeping it doesn't hurt if we aren't sure how strict v4 is yet, though docs say it's included. Let's try matching the error recommendation first.
    },
}
