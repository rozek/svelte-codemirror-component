// see https://github.com/rozek/build-configuration-study

import svelte         from 'rollup-plugin-svelte'
import commonjs       from '@rollup/plugin-commonjs'
import resolve        from '@rollup/plugin-node-resolve'
import autoPreprocess from 'svelte-preprocess'
import typescript     from '@rollup/plugin-typescript'
import postcss        from 'rollup-plugin-postcss'
import saveToFile     from 'save-to-file'

export default {
  input: './src/index.ts',
  external: [
    'javascript-interface-library'
  ],
  output: [
    {
      file:     './dist/svelte-codemirror.js',
      format:    'umd', // builds for both Node.js and Browser
      name:      'CodeMirrorComponent', // required for UMD modules
      globals: {
        'javascript-interface-library':'JIL',
      },
      noConflict:true,
      sourcemap: true,
      exports:   'default',
    },{
      file:     './dist/svelte-codemirror.esm.js',
      format:   'esm',
      sourcemap:true,
    }
  ],
  plugins: [
    svelte({ preprocess:[
      autoPreprocess({ aliases:[['ts','typescript']] }),
      saveToFile('./dist/svelte-codemirror.svelte')
    ]}),
    resolve({ browser:true, dedupe:['svelte'] }), commonjs(), typescript(),
    postcss({ extract:false, inject:{insertAt:'top'} }),
  ],
};