"use strict";

import path from 'path';
import { execSync } from 'node:child_process';

export default function vitePugLint() {
  return {
    name: 'vite-pug-lint',
    buildStart() {
      try {
        execSync('npm run lint:pug', {stdio: 'inherit'});
      } catch (e) {}
    },
    handleHotUpdate({ file }) {
      if (file.endsWith('.pug')) {
        try {
          execSync(
            `npm run lint:pug -- ${path.relative(process.cwd(), file)}`,
            {stdio: 'inherit'});
        } catch (e) {}
      }
    },
  };
}
