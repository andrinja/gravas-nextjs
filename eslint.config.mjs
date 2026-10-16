import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// Next 16 removed `next lint`; ESLint runs directly (`yarn lint`) against
// this flat config, which replaces the old .eslintrc.json.
export default defineConfig([
	...nextCoreWebVitals,
	globalIgnores(['.next/**', 'node_modules/**', 'components/icons/*.js']),
]);
