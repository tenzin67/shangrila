import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#00A86B', // Jade Green (California Cafe)
                secondary: '#ecfdf5', // Very light green for backgrounds
                accent: '#F5F5DC', // Beige/Cream
                dark: '#1F2937', // Dark Charcoal for text
                'japanese-red': '#B22222', // Subtle red for highlights
            },
        },
    },

    plugins: [forms],
};
