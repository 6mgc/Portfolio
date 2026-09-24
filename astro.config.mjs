// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: set to the final custom domain once hosting is decided.
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
