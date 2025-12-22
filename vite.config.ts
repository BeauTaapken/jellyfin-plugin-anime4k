import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: 'src/main.ts',
        formats: ['es', 'iife'],
        name: 'Anime4KPlugin',
      },
    },
    esbuild: {
      pure: mode === 'production' ? ['console.log'] : [],
    },
  };
});
