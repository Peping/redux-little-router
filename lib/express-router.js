'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createLocation = require('./util/create-location');

var _createLocation2 = _interopRequireDefault(_createLocation);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationForRequest = function locationForRequest(request) {
  var pathname = request.path,
      basename = request.baseUrl,
      query = request.query;

  var descriptor = basename ? { pathname: pathname, basename: basename, query: query } : { pathname: pathname, query: query };
  return (0, _createLocation2.default)(descriptor);
};

exports.default = function (_ref) {
  var routes = _ref.routes,
      request = _ref.request,
      _ref$passRouterStateT = _ref.passRouterStateToReducer,
      passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  var history = (0, _createMemoryHistory2.default)();

  var location = locationForRequest(request);

  return {
    routerEnhancer: (0, _storeEnhancer2.default)({
      routes: routes,
      history: history,
      location: location,
      passRouterStateToReducer: passRouterStateToReducer
    }),
    routerMiddleware: (0, _middleware2.default)({ history: history })
  };
};