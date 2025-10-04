import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PowerTimeline',
      formats: ['es', 'umd'],
      fileName: (format) => `powertimeline.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'd3-scale', 'd3-selection', 'd3-zoom', 'd3-axis', 'd3-shape', 'd3-time', 'd3-time-format'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'd3-scale': 'd3',
          'd3-selection': 'd3',
          'd3-zoom': 'd3',
          'd3-axis': 'd3',
          'd3-shape': 'd3',
          'd3-time': 'd3',
          'd3-time-format': 'd3',
        },
      },
      // Enable tree-shaking
      treeshake: true,
    },
    // Optimize bundle size
    minify: 'terser',
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
