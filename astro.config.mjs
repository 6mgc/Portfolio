// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: set to the live address (e.g. 'https://megancheng.com') once the domain is connected.
  // Canonical and og:url tags are only emitted when this is set.
  // site: 'https://example.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
