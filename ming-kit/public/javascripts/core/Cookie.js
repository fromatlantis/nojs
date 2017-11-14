'use strict';
/*
    低版本IE下的本地存储
    expires:365
        定义cookie的有效时间，值可以是一个数字（以天为单位）或一个Date对象，如果省略则创建一个会话cookie（关闭浏览器时被删除）
    path:'/'
        默认情况只有设置cookie的网页才能读取该cookie。如果你想在整个网站中访问这个cookie，需要这样设置有效路径path:'/'
*/
function Cookie(){
    this.version='1.0.0';
}

Cookie.prototype.setCookie = function(key,value,expires) {
    document.cookie = key + '=' + escape(value) + ';expires = ' + expires;
}

Cookie.prototype.getCookie = function(key) {
    var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if(arr != null) {
        return unescape(arr[2]);
    }else{
        return null;
    }
}

Cookie.prototype.delCookie = function(key) {
    document.cookie = key + "=;expires=" + (new Date(0)).toGMTString();
}

module.exports = Cookie;