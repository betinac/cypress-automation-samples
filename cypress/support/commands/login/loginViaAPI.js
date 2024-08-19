const loginViaAPI = (email, password, tenantID) => {
  const APP_URL = Cypress.config().baseUrl

  cy.request(`${APP_URL}/en/login`)
    .its('body')
    .then((body) => {
      cy.request({
        method: 'POST',
        url: `${APP_URL}/api/tenants/login/session`,
        failOnStatusCode: false, // don't fail so we can make assertions
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          login: email,
          password: password,
          tenantName: tenantID,
          force: false,
        },
      }).then((response) => {
        expect(response.status).to.eq(201)
        cy.log('**--- User was logged in via the API ---**')
        window.localStorage.setItem('jwt', response.body.sessionToken)
        window.localStorage.setItem('tenantId', response.body.tenantId)
        window.localStorage.setItem('tilesMinimized', false)
        window.localStorage.setItem('userId', response.body.userId)
        window.localStorage.setItem('filterList', '0,1,2,3,4')

        return cy.wrap(response.body.sessionToken)
      })
    })
}

Cypress.Commands.add('loginViaAPI', loginViaAPI)
