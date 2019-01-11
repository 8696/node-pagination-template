const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    current_page: 101,
    total: 200001,
    per_page: 2000,
    link_url: 'http://127.0.0.1/p/{page}'
});
fs.writeFileSync('./test.html', a);

