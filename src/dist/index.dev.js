"use strict";

var axios = require('axios');

var request = require('request');

var fs = require('fs');

var path = require('path');

var index = 0;

module.exports = function (_ref) {
  var url = _ref.url,
      handleResCallback = _ref.handleResCallback,
      filePath = _ref.filePath,
      _ref$jpgMaybeNotJpg = _ref.jpgMaybeNotJpg,
      jpgMaybeNotJpg = _ref$jpgMaybeNotJpg === void 0 ? false : _ref$jpgMaybeNotJpg;
  var suffixArr = ['.jpg', '.png'];
  axios.get(url).then(function _callee(res) {
    var arr, _loop, _i, _arr;

    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arr = [];

            if (!handleResCallback) {
              _context2.next = 5;
              break;
            }

            handleResCallback(arr, res);
            _context2.next = 6;
            break;

          case 5:
            throw new ReferenceError('没有处理返回值');

          case 6:
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath);
            }

            _loop = function _loop() {
              var item, suffix, name, bool;
              return regeneratorRuntime.async(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      item = _arr[_i];
                      index++;
                      suffix = suffixArr.find(function (suf) {
                        return item.includes(suf.toLocaleLowerCase());
                      }) || '.jpg';
                      name = index + suffix;

                      if (!jpgMaybeNotJpg) {
                        _context.next = 11;
                        break;
                      }

                      bool = true;
                      _context.next = 8;
                      return regeneratorRuntime.awrap(new Promise(function (rel, rej) {
                        request(item, function (err, res) {
                          if (res.statusCode === 404) {
                            bool = false;
                          }

                          rel();
                        });
                      }));

                    case 8:
                      if (bool) {
                        request(item).pipe(fs.createWriteStream(path.join(filePath, name), {
                          'enconding': 'binary'
                        }));
                      } else {
                        name = name.replace('.jpg', '.png');
                        request(item.replace('.jpg', '.png')).pipe(fs.createWriteStream(path.join(filePath, name), {
                          'enconding': 'binary'
                        }));
                      }

                      _context.next = 13;
                      break;

                    case 11:
                      _context.next = 13;
                      return regeneratorRuntime.awrap(new Promise(function (rel, rej) {
                        setTimeout(function () {
                          request(item).pipe(fs.createWriteStream(path.join(filePath, name), {
                            'enconding': 'binary'
                          }));
                          rel();
                        }, 500);
                      }));

                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            _i = 0, _arr = arr;

          case 9:
            if (!(_i < _arr.length)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 12;
            return regeneratorRuntime.awrap(_loop());

          case 12:
            _i++;
            _context2.next = 9;
            break;

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};