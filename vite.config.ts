import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig /* , splitVendorChunkPlugin */ } from 'vite'
import checker from 'vite-plugin-checker'
// import { VitePluginFonts } from 'vite-plugin-fonts'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    checker({ typescript: true }),
    react(),
    svgr(),
    // VitePluginFonts({
    //   google: {
    //     families: [
    //       { name: 'Lato', styles: 'wght@100;400;700' },
    //       { name: 'Mulish', styles: 'wght@800;900' },
    //     ],
    //   },
    // }),
    visualizer(),
  ],
})
