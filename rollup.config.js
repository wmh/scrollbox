import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'scrollbox.js',
  output: [
    {
      file: 'dist/scrollbox.js',
      format: 'umd',
      name: 'ScrollBox'
    },
    {
      file: 'dist/scrollbox.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    terser({
      output: {
        comments: /^!/
      }
    })
  ]
};
