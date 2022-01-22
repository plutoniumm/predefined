import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
// import json from '@rollup/plugin-json';

const config = {
    input: 'src/index.js',
    plugins: [
        resolve(),
        terser(),
        // json()
    ],
    output: {
        name: 'predefined',
        file: "index.js",
        format: 'iife',
    }
};

export default config;