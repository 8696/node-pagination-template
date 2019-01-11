const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    currentPage: 2,
    dataTotal: 6,
    perPage: 1,
    linkUrl: 'http://127.0.0.1/p/{page}?page={page}&a={page}',
    linkAppendQuery: {
        username: 'long'
    },
    btnText: {
        prev: '<',
        next: '>',
        ellipsis: '<i></i>',
        link: '第{page}页'
    }
});
fs.writeFileSync('./test.html', a);

