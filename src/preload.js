const helpers = require('./utils/helpers');
const { request } = require('./utils/request');

function init() {
  global.window.helpers = helpers;
  global.window.request = request;
}

init();
