"use strict";

module.exports = function makeDir(dirpath) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    dirpath.split("/").forEach(function (dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      } else {
        //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
        if (dirname) {
          pathtmp = dirname;
        } else {
          pathtmp = "/";
        }
      }

      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp)) {
          return false;
        }
      }
    });
  } else {
    deleteFolderFiles(dirpath);
  }

  return true;
};