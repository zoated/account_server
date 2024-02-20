import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
const path = require('path')
const cors = require('koa2-cors');

import { PORT } from './config';
import AppRoutes from './routes';
import 'reflect-metadata'
import {initDb} from  './db/db'
const koaBody = require('koa-body');
const staticFiles = require('koa-static')


const app = new Koa();
const router = new Router();

// 设置静态文件目录
app.use(staticFiles(path.resolve(__dirname, "static")))

const initApp = () => {
    AppRoutes.forEach(route => router[route.method](route.path, route.action));
    app.use(cors({
        origin: (ctx) => {
            if (ctx.url === '/test') {
                return "*"; // 允许来自所有域名请求
            }
            return "*"; 
        },
    }));
    app.use(koaBody({ multipart: true }));

    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT);
    console.log(`http://localhost:${PORT}`);
}
//路
initDb(initApp)