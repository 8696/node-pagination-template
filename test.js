const fs = require('fs');
const paginationTemplate = require('./main');

let text = paginationTemplate({
    dataTotal: 20,                          // 数据总条数
    perPage: 1,                             // 每页显示条数
    currentPage: 10,                         // 当前页码
    linkUrl: '/user/list/{page}?page={page}',     // url {page} 将会被替换成实际页码
    linkQuery: {                            // 可选 | 在地址后面拼接 query string
        username: 'long',
        page2: '{page}'
    },
    btnText: {                              // 可选 | 更改分页按钮文本
        prev: '上一页',
        next: '下一页',
        ellipsis: '...',
        link: '第{page}页'
    },
});
fs.writeFileSync('./test.html', text);

