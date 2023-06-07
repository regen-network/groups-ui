import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig /* , splitVendorChunkPlugin */ } from 'vite'
import checker from 'vite-plugin-checker'
import { VitePluginFonts } from 'vite-plugin-fonts'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    checker({ typescript: true }),
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    VitePluginFonts({
      google: {
        families: [
          { name: 'Lato', styles: 'wght@100;400;700' },
          { name: 'Mulish', styles: 'wght@700;800;900' },
        ],
      },
    }),
    visualizer(),
  ],
})
