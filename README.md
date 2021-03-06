# node-pagination-template

#### 项目介绍

- nodejs应用中通用html分页模版生成器

#### 安装

- (c)npm install node-pagination-template -D


#### 使用

```javascript
    // *** 001
    
    const paginationTemplate = require('node-pagination-template');
    let text = paginationTemplate({
        dataTotal: 20,                 // 数据总条数
        perPage: 1,                    // 每页显示条数
        currentPage: 6,                // 当前页码
        linkUrl: 'http://127.0.0.1/user/list/{page}?page={page}', // url {page} 将会被替换成实际页码
    });
    
    // complete
    <ul class="pagination">
        <li><a href="http://127.0.0.1/user/list/5?page=5">&lt;</a></li>
        <li><a href="http://127.0.0.1/user/list/1?page=1">1</a></li>
        <li><a href="http://127.0.0.1/user/list/2?page=2">2</a></li>
        <li><a href="http://127.0.0.1/user/list/3?page=3">3</a></li>
        <li><a href="http://127.0.0.1/user/list/4?page=4">4</a></li>
        <li><a href="http://127.0.0.1/user/list/5?page=5">5</a></li>
        <li class="active"><span>6</span></li>
        <li><a href="http://127.0.0.1/user/list/7?page=7">7</a></li>
        <li><a href="http://127.0.0.1/user/list/8?page=8">8</a></li>
        <li class="disabled"><span>...</span></li>
        <li><a href="http://127.0.0.1/user/list/19?page=19">19</a></li>
        <li><a href="http://127.0.0.1/user/list/20?page=20">20</a></li>
        <li><a href="http://127.0.0.1/user/list/7?page=7">&gt;</a></li>
    </ul>
    // add bootstrap css
```
- 如下

![图片介绍](https://raw.githubusercontent.com/8696/node-pagination-template/master/1.jpg)


   
        
```javascript
    // *** 002
    
    let text2 = paginationTemplate({
        dataTotal: 20,               // 数据总条数
        perPage: 1,                  // 每页显示条数
        currentPage: 10,             // 当前页码
        linkUrl: '/user/list/{page}?page={page}',  // url {page} 将会被替换成实际页码
        linkQuery: {                 // 可选 | 在地址后面拼接 query string
            username: 'long',
            page2: '{page}'
        },
        btnText: {                   // 可选 | 更改分页按钮文本
            prev: '上一页',
            next: '下一页',
            ellipsis: '...',
            link: '第{page}页'
        },
    });
    
    // complete
    <ul class="pagination">
        <li><a href="/user/list/9?page=9&page2=9&username=long">上一页</a></li>
        <li><a href="/user/list/1?page=1&page2=1&username=long">第1页</a></li>
        <li><a href="/user/list/2?page=2&page2=2&username=long">第2页</a></li>
        <li class="disabled"><span>...</span></li>
        <li><a href="/user/list/8?page=8&page2=8&username=long">第8页</a></li>
        <li><a href="/user/list/9?page=9&page2=9&username=long">第9页</a></li>
        <li class="active"><span>第10页</span></li>
        <li><a href="/user/list/11?page=11&page2=11&username=long">第11页</a></li>
        <li><a href="/user/list/12?page=12&page2=12&username=long">第12页</a></li>
        <li class="disabled"><span>...</span></li>
        <li><a href="/user/list/19?page=19&page2=19&username=long">第19页</a></li>
        <li><a href="/user/list/20?page=20&page2=20&username=long">第20页</a></li>
        <li><a href="/user/list/11?page=11&page2=11&username=long">下一页</a></li>
    </ul>
    // add bootstrap css
```
- 如下

![图片介绍](https://raw.githubusercontent.com/8696/node-pagination-template/master/2.jpg)




