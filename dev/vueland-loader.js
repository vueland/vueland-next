const fs = require('fs')

class VuelandLoader {
  apply(compiler) {
    compiler.hooks.done.tap(
      'VuelandLoaderPlugin',
      (stats) => {
        const { path, filename } = stats.compilation.options.output;
        try {
          let filePath = path + "/" + 'library.js';
          fs.readFile(filePath, "utf8", (err, data) => {
            console.log(err, data)
            // const rgx = /console.log\(['|"](.*?)['|"]\)/;
            // const newdata = data.replace(rgx, "");
            // if (err) console.log(err);
            // fs.writeFile(filePath, newdata, function(err) {
            //   if (err) {
            //     return console.log(err)
            //   }
            //   console.log("Logs Removed");
            // });
          });
        } catch (error) {
          console.log(error)
        }
      }
    )
  }
}

module.exports = VuelandLoader
