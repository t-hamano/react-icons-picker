import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import { terser } from 'rollup-plugin-terser';

export default {
	input: './src/index.ts',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
		},
		{
			file: packageJson.module,
			format: 'esm',
		},
	],
	plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), terser()],
};
