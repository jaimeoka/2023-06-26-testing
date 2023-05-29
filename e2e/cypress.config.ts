import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import * as fs from 'fs/promises';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    env: {
      loginUsername: 'john.list@host.com',
      loginPassword: 'John List',
    },
    setupNodeEvents(on) {
      on('task', {
        saveCustomers: async (customers: string[]) => {
          await fs.writeFile('customers.txt', customers.join('\n'));
          return true;
        },
      });
    },
  },
});
