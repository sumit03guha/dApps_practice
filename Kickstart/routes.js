const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show'); // {:address} acts as a wildcard and gets routed to show.

module.exports = routes;
