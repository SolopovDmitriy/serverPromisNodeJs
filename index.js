'use strict';
const colors = require('colors');
const CONFIG = require('./config');

const http = require('http');
const fs = require('fs');
const path = require('path');

const Page = require('./Page');
const FileReader = require('./FileReader');

let x = 10;
console.log(typeof x); // number
x = "ok";
let str = "hello";
console.log(typeof str); //string





// var buf1 = Buffer.from("n");
// var buf2 = Buffer.from("ok");
// var list = [buf1, buf2];
// console.log(buf1);
// console.log(buf2);
//
// var newbuff = Buffer.concat(list);
// console.log(newbuff);

























//
// let f3 = function (val) {
//     return val + 10;
// }
//
// let f2 = function(val, func1){
//     console.log("val= " + val);
//     val = val * 10;
//     val = func2(val);
//     console.log(val);
//     return func1(val);
// }





// let f1 = function (val) {
//     return val + 1;
// }
//
// let f2 = function(val, func){
//     console.log("val= " + val);
//     val = val * 10;
//     return func(val);
// }
//
// console.log(f2(13, f1));
//
//
//
// console.log(f2(13, function (val) {
//         return val + 1;
// }));






// console.log(typeof f1); // function
// //f1 = "sdgdgh";
//
// if (typeof f1 === 'function') {
//     console.log("f1 is function. OK");
//     console.log(f1(10));
// }else{
//     console.log("error");
// }



const SERVER = http.createServer(function (request, response) { // request -
    let url_path = request.url;
    console.log("запрос по адресу: " + url_path);

    if (url_path.indexOf('/static/') != -1) {
        fs.readFile("." + url_path, function (err, staticFile) {
            if (err != null) throw err;
            response.writeHead(200, {
                'Content-Type': FileReader.getMimeType(url_path)
            });
            response.end(staticFile, 'utf-8');
        })
    } else {
        switch (url_path) {
            case '/': {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                Page.getDataPage2(CONFIG.PATH.PAGE + 'index.html', function (content) {
                    response.end(content, 'utf-8');
                });
                break;
            }
            case '/info': {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                Page.getDataPage(CONFIG.PATH.PAGE + 'info.html', function (content) {//Page.getDataPage -открывает для чтения три файла info.html, footer.html, header.html,  соединяет и помещает  их в переменную контент
                    response.end(content, 'utf-8');
                });
                break;
            }

            case '/price': {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                Page.getDataPage(CONFIG.PATH.PAGE + 'price.html', function (content) {
                    response.end(content, 'utf-8');
                });
                break;
            }

            default :{
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                Page.getDataPage(CONFIG.PATH.PAGE + '404.html', function (content) {
                    response.end(content, 'utf-8');
                });
                break;
            }
        }

    }
});

SERVER.listen(CONFIG.SERVER.PORT);

SERVER.on('listening', function () {
    console.log('server started: ' + 'http://' + CONFIG.SERVER.HOST + ":" + CONFIG.SERVER.PORT);
});

SERVER.on('request', function (request) {
    //console.dir(request);
    console.log("REQUEST: " + colors.green(request.url));
});


