const fs = require('fs');
const path = require('path');
class FileReader {
    static getDataFile(pathFile, callback) {
        fs.readFile(pathFile, function (err, data) {
            if (err) throw err;
            if (typeof callback === 'function') {
                callback(data);
            } else {
                throw new Error(callback + 'is not function');
            }
        })
    }

    static getDataFile2 = function(pathFile) {
        return new Promise(function(resolve, reject) {
            fs.readFile(pathFile, function(err, data){ // The fs.readFile() method is used to read files on your computer.
                if (err)
                    reject(err);
                else
                    resolve(data); // resolve -- это функция, которая вызывает успешное исполнение промиса, data -- данные, прочитанные из файла
            });
        });
    };


    static getMimeType(pathFile) {
        let extName = path.extname(pathFile).toLowerCase();

        let mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.jfif': 'image/jpeg',
            '.gif': 'image/gif',
            '.png': 'image/png',
            '.ico': 'image/x-icon',
        };
        if (mimeTypes[extName] != null) {
            return mimeTypes[extName];
        } else {
            throw new Error('Incorrect mime type');
        }
    }
}

module.exports = FileReader;