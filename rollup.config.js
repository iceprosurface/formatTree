import typescript from 'rollup-plugin-typescript'

export default {
  input: './main.ts',
  output: {
    file: './lib/index.umd.js',
    format: 'umd',
    name: 'format-tree'
  },
  globals: {
    '_': 'lodash'
  },
  plugins: [
    typescript()
  ]
}
