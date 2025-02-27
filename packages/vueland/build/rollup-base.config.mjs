import {defineConfig} from 'rollup'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import esbuild from 'rollup-plugin-esbuild'
import typescript from "rollup-plugin-typescript2"
import ttypescript from 'ttsc'
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
    plugins: [
        typescript({
            typescript: ttypescript,
            useTsconfigDeclarationDir: true,
            emitDeclarationOnly: true,
            target: 'es2018',
        }),
        resolve({
            main: true,
            jsnext: true,
            skip: ['nuxt', 'vue']
        }),
        peerDepsExternal({includeDependencies: true}),
        commonjs(),
        esbuild({target: 'es2018'}),
    ],
})