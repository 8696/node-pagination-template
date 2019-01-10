const fs = require('fs');
const paginationTemplate = require('./main');

let a = paginationTemplate({
    current_page:8,
    total: 15,
    per_page: 1,
    link_url: 'http://127.0.0.1?page={page}'
});
fs.writeFileSync('./test.html', a);

