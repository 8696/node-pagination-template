module.exports = function (options) {
    let json = {},
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
        completeJSON = function () {

            json.last_page = Math.ceil(options.total / options.per_page);
            json.total = options.total;
            json.current_page = options.current_page;

        },
        completeTemplate = function () {
            let length = json.last_page > 12 ? 12 : json.last_page + 1;

            for (let i = 1; i < length; i++) {
                template += (function () {
                    let page = i;


                    return '<li><a href="{link}">{page}</a></li>'

                }());
            }

            // 判断第一页 禁用
            template = `<li class="${(function () {
                if (json.current_page === 1) {
                    return 'disabled';
                }
                return '';
            }())}"><span>&laquo;</span></li>` + template;

            // 判断尾页 禁用
            template += `<li class="${(function () {
                if (json.current_page === json.last_page) {
                    return 'disabled';
                }
                return '';
            }())}"><span>&rsaquo;</span></li>`;

            template = '<ul class="pagination">' + template + '</ul>' + '<link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">\n';
        },
        init = function () {
            completeJSON();
            completeTemplate();

        };

    init();


    return {
        template,
        json
    };
};










