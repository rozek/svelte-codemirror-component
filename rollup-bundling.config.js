// see https://github.com/rozek/build-configuration-study

import svelte         from 'rollup-plugin-svelte'
import commonjs       from '@rollup/plugin-commonjs'
import resolve        from '@rollup/plugin-node-resolve'
import autoPreprocess from 'svelte-preprocess'
import typescript     from '@rollup/plugin-typescript'
import postcss        from 'rollup-plugin-postcss'
import { terser }     from 'rollup-plugin-terser'

export default {
  input: './src/index.ts',
  output: {
    file:     './dist/svelte-codemirror-component.bundled.js',
    format:    'umd', // builds for both Node.js and Browser
    name:      'CodeMirrorComponent', // required for UMD modules
    noConflict:true,
    sourcemap: true,
    exports:   'default',
  },
  plugins: [
    svelte({ preprocess:[
      autoPreprocess({ aliases:[['ts','typescript']] }),
    ]}),
    resolve({ browser:true, dedupe:['svelte'] }), commonjs(), typescript(),
    postcss({ extract:false, inject:{insertAt:'top'} }),
    terser({ format:{ comments:false, safari10:true } })
  ],
};