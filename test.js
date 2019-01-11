const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    currentPage: 7,
    dataTotal: 13,
    perPage: 1,
    // linkUrl: 'http://127.0.0.1/p/{page}?page={page}',
    linkUrl: '/get/{page}?page={page}&',
    linkQuery: {
        username: 'long',
        p: '{page}'
    },
    btnText: {
        prev: '<<',
        next: '>>',
        ellipsis: '<i></i>',
        link: '{page}--'
    },

});
fs.writeFileSync('./test.html', a);

