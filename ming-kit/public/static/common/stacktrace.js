(function(win) {

  var StackTrace = function() {}
    , proto = StackTrace.prototype
    , stacktrace

  // make error traces visitable outside the closure
  win.ErrorTrace = [];

  // set a url to pesist your error traces
  proto.url = 'http://www.mininglamp.com/log/jsex';

  // run a supervisor
  proto.track = function() {
    var that = this;

    return function(msg, url, line) {
      console.log(msg, url, line);
      ErrorTrace.push(msg + '@' + url + '@' + line);
      that.post(msg, url, line);
    }
  };

  // post data to backend
  proto.post = function(msg, url, line) {
    var xhr, params;

    params = 'jsurl=' + url +//错误所在js文件地址
      '&message=' + msg +//错误信息
      '&line=' + line +//错误所在行数
      '&ua=' + navigator.userAgent +//当前浏览器信息
      '&pageurl=' + window.location.href;//错误所在页面地址
    
    if(typeof jslevel == 'number' || typeof jslevel == 'string'){
    	params = params + '&jslevel=' + jslevel;//错误等级，为1时立即发送邮件通知
    }
    console.log("灰常抱歉，监测到页面有错误，请刷新页面！");
    console.log(params);
    /*if(confirm("灰常抱歉，监测到页面有错误，请刷新页面！")){
    	window.location.reload();
    }*/
    
    /*xhr = typeof win.XMLHttpRequest === 'undefined' ?
      new ActiveXObject('Msxml2.XMLHTTP') :
      new XMLHttpRequest();

    xhr.open('POST', this.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);*/
  };

  stacktrace = new StackTrace();

  // record error traces
  win.onerror = stacktrace.track();

})(window);