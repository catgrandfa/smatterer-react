//开发环境配置
import path from "path";
import {merge} from "webpack-merge";
import webpack, {Configuration as WebpackConfiguration} from "webpack";
import WebpackDevServer from "webpack-dev-server";
import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";
import baseConfig from "./webpack.base";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const openBrowser = require("./util/openBrowser");


interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
    mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
    //^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ],
});

const devServer = new WebpackDevServer({
    host,
    port,
    open: false, // 是否自动打开
    compress: true, // gzip压缩,开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    static: {
        directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
    },
    headers: {"Access-Control-Allow-Origin": "*"},
}, webpack(devConfig))

devServer.start().then(() => {
    openBrowser(`http://${host}:${port}`);
})

export default devConfig;