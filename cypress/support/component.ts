import { mount } from 'cypress/angular';
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// add component testing only related command here, such as mount
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mount: typeof mount;
      testid: JQuery<HTMLElement>;
    }
  }
}

Cypress.Commands.add('mount', mount);
Cypress.Commands.addQuery('testid', (testid: string) => {
  const getFn = cy.now(
    'get',
    `[data-testid=${testid}]`
  ) as () => JQuery<HTMLElement>;
  return () => getFn();
});