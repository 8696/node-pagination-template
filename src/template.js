module.exports = function (options) {
    let data = {},
        template = '',
        check = function () {
            if (Object.prototype.toString.call(options) !== '[object Object]') {
                throw new Error('options 应为一个对象');
            }
            if (!options.hasOwnProperty('current_page')) {
                throw new Error('options.current_page 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('total')) {
                throw new Error('options.total 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('per_page')) {
                throw new Error('options.per_page 不存在，并且类型应为Number');
            }
            if (!options.hasOwnProperty('link_url')) {
                throw new Error('options.link_url 不存在，并且类型应为String');
            }
        },
        completeData = function () {

            data.last_page = Math.ceil(options.total / options.per_page);
            data.total = options.total;
            data.current_page = options.current_page;
            console.error(`总页数${data.last_page}  当前页${data.current_page}`);
        },
        compute = function () {

            let arr = [],
                length = data.last_page + 1;
            for (let i = 1; i < length; i++) {
                let page = i,
                    type = 'link';
                if ([1, 2].includes(page)) {
                    arr.push({
                        type: type,
                        page: page
                    });
                } else if ([length - 1, length - 2].includes(page)) {
                    arr.push({
                        type: type,
                        page: page
                    });
                } else if (data.last_page < 12) {
                    // 总页数在11页以下
                    console.log('总页数在11页以下');
                    arr.push({
                        type: type,
                        page: page
                    });
                } else if (data.last_page >= 12) {
                    let s = 7;
                    if (data.last_page - data.current_page <= 2) {
                        s += 2;
                    }
                    // 总页数在11页以上
                    if (data.current_page <= s && page <= s) {
                        arr.push({
                            type: type,
                            page: page
                        });
                    } else if (data.current_page >= length - s && page >= length - s) {
                        arr.push({
                            type: type,
                            page: page
                        });
                    } else {
                        let currentPage = data.current_page;
                        if (page > currentPage - 3 && page < currentPage + 3) {
                            arr.push({
                                type: type,
                                page: page
                            });
                        } else {
                            if (page === 3) {
                                arr.push({
                                    type: 'w1',
                                    page: '...'
                                });
                            } else if (length - 3 === page) {
                                arr.push({
                                    type: 'w2',
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
            console.time('time');
            let a = compute();
            console.log(a.length);
            console.log(a);
            console.timeEnd('time');

            // compute().forEach(function (item) {
            //
            // });
            /*    for (let i = 1; i < length; i++) {
                    template += (function () {
                        let page = i;

                        return '<li><a href="{link}">{page}</a></li>'
                            .replace(/{link}/, options.link_url.replace(/{page}/, page))
                            .replace(/{page}/, page);

                    }());
                }*/

            // 判断第一页 禁用
            template = `<li class="${(function () {
                if (data.current_page === 1) {
                    return 'disabled';
                }
                return '';
            }())}"><span>&laquo;</span></li>` + template;

            // 判断尾页 禁用
            template += `<li class="${(function () {
                if (data.current_page === data.last_page) {
                    return 'disabled';
                }
                return '';
            }())}"><span>&rsaquo;</span></li>`;

            template = '<ul class="pagination">' + template + '</ul>' + '<link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">\n';
        },
        init = function () {
            check();
            completeData();
            completeTemplate();

        };

    init();

    return template;
};










