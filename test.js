const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    currentPage: 101,
    dataTotal: 200001,
    perPage: 2000,
    linkUrl: 'http://127.0.0.1/p/{page}',
    btnOption: {
        prev: '上一页',
        next: '下一页',
        ellipsis: '---',
        link: '第{page}页'
    }
});
fs.writeFileSync('./test.html', a);

