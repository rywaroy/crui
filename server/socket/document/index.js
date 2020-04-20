const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const getTargetFile = require('./getTargetFile');
const astParse = require('./astParse');
const createMd = require('./createMd');
const creatProgress = require('./createProgress');

module.exports = function document(socket) {
    socket.on('create-document', ({ entry, output }) => {
        const entryBase = path.join(process.cwd(), entry);
        const stat = fs.statSync(entryBase);
        let files = [];
        if (stat.isDirectory()) {
            files = getTargetFile(entryBase);
            files = files.map(item => path.join(entryBase, item));
        }
        if (stat.isFile()) {
            files = [entryBase];
        }
        socket.emit('createing', true);
        const total = files.length;
        const failTip = [];
        let num = 0;
        files.forEach(item => {
            socket.emit('term-document', creatProgress(num, total, `正在解析${item}`));
            const fileObj = astParse(item);
            const { isFunction, isClass, props, main } = fileObj;
            if (isFunction && !props) {
                // 如果是函数，如果没有props，代表不是函数组件，不生成md
                failTip.push(chalk.yellowBright(`${item} 该文件不是组件`));
            } else if (isClass && !main && !props) {
                // 如果是类，如果没有props且也没有注释，不生成md
                failTip.push(chalk.yellowBright(`${item} 暂无解析数据`));
            } else if (!main && !props) {
                // 不是函数也不是类，可能是工具库文件
                failTip.push(chalk.yellowBright(`${item} 该文件不是组件`));
            } else {
                createMd(fileObj, output);
            }
            num++;
        });
        socket.emit('term-document', creatProgress(num, total, '解析完成!'));
        if (failTip.length > 0) {
            socket.emit('term-document', chalk.yellowBright('提示: \n'));
            failTip.forEach(item => {
                socket.emit('term-document', item);
            });
        }
        socket.emit('createing', false);
    });
};
