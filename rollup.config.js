import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';

let pkg = JSON.parse(fs.readFileSync('./package.json'));
let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

export default {
	entry: pkg['jsnext:main'],
	dest: pkg.main,
	sourceMap: path.resolve(pkg.main),
	moduleName: pkg.amdName,
	format: 'umd',
	external,
	plugins: [
		babel({
			babelrc: false,
			comments: false,
			exclude: 'node_modules/**',
			presets: [
				'es2015-minimal-rollup'
			].concat(pkg.babel.presets.slice(1)),
			plugins: require('babel-preset-es2015-minimal-rollup').plugins.concat([
				['transform-react-jsx', { pragma:'h' }]
			])
		})
	]
};
