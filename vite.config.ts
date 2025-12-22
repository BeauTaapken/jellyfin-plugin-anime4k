import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: 'src/main.ts',
        formats: ['iife'],
        name: 'Anime4KPlugin',
        fileName: (_, entryName) => `${entryName}.js`,
      },
    },
    esbuild: {
      pure: mode === 'production' ? ['console.log'] : [],
    },
  };
});
