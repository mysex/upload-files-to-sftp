module.exports = {
    serve: { // sftp 信息
        host: '127.0.0.1',// 主机地址
        port: '22', // 端口号
        username: 'root',// 用户名
        password: 'admin'// 密码
    },
    localDir: "../dist", // 上传的本地目录
    serveDir: "/www" // 上传到的远程sftp目录
}