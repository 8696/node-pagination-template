module.exports = function (options) {
    let data = {},
        template = '',
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
            if (Math.ceil(options.dataTotal / options.perPage) < options.currentPage) {
                throw new Error(`options.currentPage 不能大于总页数，总页数为${Math.ceil(options.dataTotal / options.perPage)}`);
            }
        },
        completeData = function () {

            data.last_page = Math.ceil(options.dataTotal / options.perPage);
            data.dataTotal = options.dataTotal;
            data.currentPage = options.currentPage;

            console.error(`总页数${data.last_page}  当前页${data.currentPage}`);
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
                    console.log('总页数在11页以下');
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

            compute().forEach(function (item) {
                template += (function () {

                    switch (item.type) {
                        case 'link':
                            return '<li><a href="{link}">{page}</a></li>'
                                .replace(/{link}/, options.linkUrl.replace(/{page}/, item.page))
                                .replace(/{page}/, item.page);
                        case 'ellipsis':
                            return '<li class="disabled"><span>...</span></li>';
                        case 'active':
                            return '<li class="active"><span>{page}</span></li>'
                                .replace(/{page}/, item.page);
                    }

                }());
            });


            // 第一页 禁用 or 跳转
            template = (function () {
                if (data.currentPage === 1) {
                    return '<li class="disabled"><span>&laquo;</span></li>';
                }
                return '<li><a href="{link}">&laquo;</a></li>'
                    .replace(/{link}/, options.linkUrl.replace(/{page}/, data.currentPage - 1));

            }()) + template;


            // 尾页 禁用 or 跳转
            template += (function () {
                if (data.currentPage === data.last_page) {
                    return '<li class="disabled"><span>&raquo;</span></li>';
                }
                return '<li><a href="{link}">&raquo;</a></li>'
                    .replace(/{link}/, options.linkUrl.replace(/{page}/, data.currentPage + 1));
            }());

            template = '<ul class="pagination">' + template + '</ul>' + '<link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';
        },
        init = function () {
            check();
            completeData();
            completeTemplate();

        };

    init();

    return template;
};










