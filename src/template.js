const queryString = require('query-string');
module.exports = function (options) {
    let data = {},
        template = '',
        isEmpty = false,
        encode = function (str) {
            let s = '';
            if (str.length === 0) return '';
            s = str.replace(/&/g, '&amp;');
            s = s.replace(/</g, '&lt;');
            s = s.replace(/>/g, '&gt;');
            s = s.replace(/ /g, '&nbsp;');
            return s;
        },

        check = function () {
            if (Object.prototype.toString.call(options) !== '[object Object]') {
                throw new Error('options 应为一个对象');
            }
            if (!options.hasOwnProperty('currentPage')) {
                throw new Error('options.currentPage 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('dataTotal')) {
                throw new Error('options.dataTotal 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('perPage')) {
                throw new Error('options.perPage 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('linkUrl')) {
                throw new Error('options.linkUrl 不存在，并且类型应为String');
            }
            if (options.btnText && Object.prototype.toString.call(options.btnText) !== '[object Object]') {
                throw new Error('options.btnText 应为一个对象');
            }
            if (options.linkQuery && Object.prototype.toString.call(options.linkQuery) !== '[object Object]') {
                throw new Error('options.linkQuery 应为一个对象');
            }
            if (Number.parseInt(options.currentPage) > Math.ceil(options.dataTotal / options.perPage)) {
                // 超出总页数
                isEmpty = true;
            }

        },
        completeData = function () {

            data.last_page = Math.ceil(options.dataTotal / options.perPage);
            data.dataTotal = Number.parseInt(options.dataTotal);
            data.currentPage = Number.parseInt(options.currentPage);


            console.log(`总页数${data.last_page}  当前页${data.currentPage}`);
        },
        compute = function () {

            let arr = [],
                length = data.last_page + 1;
            for (let i = 1; i < length; i++) {
                let page = i,
                    type = i === data.currentPage ? 'active' : 'link';
                if ([1, 2].includes(page)) {
                    arr.push({
                        type,
                        page
                    });
                } else if ([length - 1, length - 2].includes(page)) {
                    arr.push({
                        type,
                        page
                    });
                } else if (data.last_page < 12) {
                    // 总页数在11页以下
                    // console.log('总页数在11页以下');
                    arr.push({
                        type,
                        page
                    });
                } else if (data.last_page >= 12) {
                    let s = 7;

                    // 总页数在11页以上
                    if (data.currentPage <= s && page <= s) {
                        arr.push({
                            type,
                            page
                        });
                    } else if (data.currentPage >= length - s && page >= length - s) {
                        arr.push({
                            type,
                            page
                        });
                    } else {
                        let currentPage = data.currentPage;
                        if (page > currentPage - 3 && page < currentPage + 3) {
                            arr.push({
                                type,
                                page
                            });
                        } else {
                            if (page === 3) {
                                arr.push({
                                    type: 'ellipsis',
                                    page: '...'
                                });
                            } else if (length - 3 === page) {
                                arr.push({
                                    type: 'ellipsis',
                                    page: '...'
                                });
                            }

                        }
                    }
                }

            }
            return arr;
        },
        completeTemplate = function () {
            !options.btnText && (options.btnText = {});
            !options.linkQuery && (options.linkQuery = {});

            let btnText = Object.assign({
                prev: '<',
                next: '>',
                ellipsis: '...',
                link: '{page}'
            }, options.btnText);
            for (let key in btnText) {
                btnText[key] = encode(btnText[key]);
            }
            // 解析 query

            let {url, query} = queryString.parseUrl(options.linkUrl);
            query = decodeURI(queryString.stringify(Object.assign(query, options.linkQuery))).trim();
            if (query) {
                options.linkUrl = url + '?' + query;
            }

            compute().forEach(function (item) {
                template += (function () {

                    switch (item.type) {
                        case 'link':

                            return '<li><a href="{link}">{page}</a></li>'
                                .replace(/{link}/, options.linkUrl.replace(/{page}/g, item.page))
                                .replace(/{page}/g, btnText.link.replace(/{page}/, item.page));

                        case 'ellipsis':

                            return `<li class="disabled"><span>${btnText.ellipsis.replace(/{page}/, item.page)}</span></li>`;

                        case 'active':

                            item.page = btnText.link.replace(/{page}/, item.page);

                            return '<li class="active"><span>{page}</span></li>'
                                .replace(/{page}/, item.page);
                    }

                }());
            });


            // 上一页 禁用 or 跳转
            template = (function () {
                if (data.currentPage === 1) {
                    return `<li class="disabled"><span>${btnText.prev}</span></li>`;
                }
                return (`<li><a href="{link}">${btnText.prev}</a></li>`)
                    .replace(/{link}/, options.linkUrl.replace(/{page}/g, data.currentPage - 1));

            }()) + template;


            // 下一页 禁用 or 跳转
            template += (function () {
                if (data.currentPage === data.last_page) {
                    return `<li class="disabled"><span>${btnText.next}</span></li>`;
                }
                return (`<li><a href="{link}">${btnText.next}</a></li>`)
                    .replace(/{link}/, options.linkUrl.replace(/{page}/g, data.currentPage + 1));
            }());

            //template = `<ul class="pagination">${template}</ul>` + '<meta charset="UTF-8"><link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';
            template = `<ul class="pagination">${template}</ul>`;
        },
        init = function () {
            check();
            completeData();
            completeTemplate();

        };

    init();

    return isEmpty ?
        '<ul class="pagination"><!-- Page number greater than total number of pages --></ul>'
        : template;
};










