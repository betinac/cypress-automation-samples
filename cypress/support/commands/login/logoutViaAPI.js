const logoutViaAPI = (sessionToken) => {
  const APP_URL = Cypress.config().baseUrl
  const login = {
    userName: Cypress.env('userName'),
    tenantId: window.localStorage.getItem('tenantId'),
  }

  cy.request(`${APP_URL}/en/products`)
    .its('body')
    .then((body) => {
      cy.request({
        method: 'DELETE',
        url: `${APP_URL}/api/tenants/${login.tenantId.toString()}/login/session`,
        failOnStatusCode: false, // don't fail so we can make assertions
        headers: {
          accept: 'application/json',
          Authorization: sessionToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(204)
      })
    })
}

Cypress.Commands.add('logoutViaAPI', logoutViaAPI)
