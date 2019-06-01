let fs = require('fs')
let path = require('path')
let Client = require('ssh2-sftp-client');

let travel = require('./tool');
let config= require('./config')

let sftp = new Client();

let localDir = path.join(__dirname, config.localDir);
let serveDir = config.serveDir;
sftp.connect(config.serve).then(() => {
    travel(localDir, function (pathname, next) {

        let dirName = path.dirname(pathname).replace(localDir, serveDir);
        let serveFilePath = path.join(dirName, path.basename(pathname));

        sftp.list(dirName).then((dir) => {
            sftp.put(pathname, serveFilePath).then(res => {
                console.log(pathname, "上传成功");
                next()
            })
        }).catch(err => {
            sftp.mkdir(dirName).then(res => {
                sftp.put(pathname, serveFilePath).then(res => {
                    console.log(pathname, "上传成功");
                    next()
                })
            })
        })
    }, function () {
        sftp.end();
        console.log(`上传结束`)
    });
});