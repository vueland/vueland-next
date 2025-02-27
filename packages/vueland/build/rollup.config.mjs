import {defineConfig} from 'rollup'
import rollupBaseConfig from "./rollup-base.config.mjs";
import {fileURLToPath} from 'url';
import path from 'path';
import * as fs from "node:fs";
import vuePlugin from "rollup-plugin-vue";
import scss from "rollup-plugin-scss";
import {dts} from "rollup-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const components = fs.readdirSync(path.resolve(__dirname, "../src/components"))
const constants = fs.readdirSync(path.resolve(__dirname, "../src/constants"))

console.log(constants)

export default defineConfig([
    ...components.map((component) => ({
        input: `src/components/${component}/index.ts`,
        output: {
            file: `dist/components/${component}/${component}.js`,
            format: "es",
            assetFileNames: `${component}[extname]`
        },
        ...rollupBaseConfig,
        plugins: [
            vuePlugin({
                target: 'browser',
                preprocessStyles: true,
            }),
            scss({
                bundle: true,
                fileName: `${component}.css`,
            }),
            ...rollupBaseConfig.plugins
        ]
    })),
    ...constants.map((fileName) => {
        const [name] = fileName.split(".")

        return {
            input: `src/constants/${fileName}`,
            output: {
                file: `dist/constants/${name}.mjs`,
                format: "es",
            }
        }
    }),
    {
        input: './src/index.ts',
        output: [
            {
                file: 'dist/vueland.esm-browser.js',
                format: 'es',
            },
            {
                file: 'dist/vueland.common.cjs',
                format: 'cjs',
            },
            {
                file: 'dist/vueland.mjs',
                format: 'es',
            },
        ],
        ...rollupBaseConfig,
        plugins: [
            scss({
                bundle: true,
                fileName: 'vueland.css',
                outputStyle: 'compressed'
            }),
            ...rollupBaseConfig.plugins
        ]
    },
    {
        input: "src/index.ts",
        output: [{file: "dist/types.d.ts", format: "esm"}],
        plugins: [
            scss({
                bundle: true,
                fileName: 'vueland.css',
                outputStyle: 'compressed'
            }),
            dts()
        ],
    },
])