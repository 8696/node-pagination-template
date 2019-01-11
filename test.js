const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    currentPage: 55,
    dataTotal: 100,
    perPage: 1,
    linkUrl: 'http://127.0.0.1/p/{page}?page={page}&a={page}',
    btnText: {
        prev: '<',
        next: '>',
        ellipsis: '<i></i>',
        link: '第{page}页'
    }
});
fs.writeFileSync('./test.html', a);

