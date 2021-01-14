const FileReader = require('./FileReader');
const CONFIG = require('./config');

class Page {

    static getDataPage2(contentPath, callback) {  // contentPath -путь к странице CONFIG.PATH.PAGE + 'index.html'
        const dataIndex = FileReader.getDataFile2(CONFIG.PATH.TEMP + 'index.html');  //читает файл, путь к ./template/index.html
        const dataHeader = FileReader.getDataFile2(CONFIG.PATH.TEMP + 'header.html');  //читает файл, путь к ./template/header.html
        const dataContent = FileReader.getDataFile2(contentPath);  //читает файл, путь к ./template/pages/info.html
        const dataFooter = FileReader.getDataFile2(CONFIG.PATH.TEMP + 'footer.html');  //читает файл, путь к ./template/header.html
        Promise.all([dataIndex, dataHeader, dataContent, dataFooter]).then((values) => {//Метод Promise.all(iterable) возвращает обещание,
            // которое выполнится тогда,
            // когда будут выполнены все обещания,
            // переданные в виде перечисляемого аргумента, или отклонено любое из переданных обещаний.
            callback(new Buffer.concat(values));
        });
    }


    static getDataPage(contentPath, callback) {
        FileReader.getDataFile(CONFIG.PATH.TEMP + 'index.html', function (dataIndex) {
            FileReader.getDataFile(CONFIG.PATH.TEMP + 'header.html', function (dataHeader) {
                FileReader.getDataFile(contentPath, function (dataContent) {
                    FileReader.getDataFile(CONFIG.PATH.TEMP + 'footer.html', function (dataFooter) {
                        if (typeof callback === 'function') {
                            callback(new Buffer.concat([
                                dataIndex,
                                dataHeader,
                                dataContent,
                                dataFooter
                            ]));
                        } else {
                            throw new Error(callback + 'is not function');
                        }
                    })
                })
            })
        })
    }
}
module.exports = Page;