/**
 * vConsole-resouces Plugin
 *
 * @author WechatFE
 */

import './style.less';
import tplTabbox from './tabbox.html';

const $ = vConsole.$;
const tool = vConsole.tool;

class VConsoleLogUploadTab extends vConsole.VConsolePlugin {
  constructor(...args) {
    super(...args);

    this.$tabbox = $.render(tplTabbox, {});
  }

  onRenderTab(callback) {
    callback(this.$tabbox);

    var that = this;

	/**
    let $postURL = $.one('.vc-post-url');
    $postURL.innerHTML = $.render('<span>{{postURL}}</span>', {
      postURL: that.postURL
    }, true);
    */
  }

  config(cfg = {}) {
    if (!cfg.postURL) {
      console.warn('Please set server url');
    }
    this.logPostURL = cfg.postURL;
  }

  onInit () {
  }
  onAddTool(callback) {
    let that = this;
    let toolList = [{
      name: 'UploadLog',
      global: false,
      onClick: function(e) {
        that.uploadLog();
      }
    }, {
      name: 'UploadLocalStorage',
      global: false,
      onClick: function(e) {
        that.uploadLocalStorage();
      }
    }];
    callback(toolList);
  }
  uploadLog() {
    var logList = this.getLogList();
    this.upload(logList);
  } uploadCookie() { var cookieList = this.getCookieList();

    this.upload(cookieList);
  }

  uploadLocalStorage() {
    var localStorageList = this.getLocalStorageList();
    this.upload(localStorageList);
  }
  getLogList() {
    var $logbox = $.one('.vc-logbox');
    var $allLogNode = $.all('.vc-item-content', $logbox);
    var logList = [];
    for (var $logNode of $allLogNode) {
      logList.push($logNode.innerHTML);
    }

    return logList;
  }

  upload(data) {
    let that = this;
    var postData = {
      deviceInfo: { // TODO Add Device Info for DEBUG
      },
      logList: data ? data : {}
    };

    var httpClient = Zepto
    if (Zepto) {
      httpClient = Zepto;
    } else if (jQuery){
      httpClient = jQuery;
    } else {
      // TODO use mine
    }


	httpClient.ajax({
	  type: 'POST',
	  url: this.logPostURL,
	  data: JSON.stringify(postData),
	  contentType: 'application/json',
	  success: function(resp) {
		let $log = $.one('.vc-log-id');
		$log.innerHTML = $.render('<div>Your log is uploaded</div><div>Log URL: <span ><a>{{logURL}}</a></span></div>', { logURL: that.logPostURL.replace('postLog', '') + 'uploaded/' + resp }, true);
	  },
	  error: function(resp) {
        let $log = $.one('.vc-log-id');
        $log.innerHTML = $.render('<div>日志上传失败</div>', {});
      }
    });
  }

  onReady() {
  }

  getCookieList() {
  	if (!document.cookie) {
  		return [];
  	}

  	let list = [];
  	let items = document.cookie.split(';');
  	for (let i=0; i<items.length; i++) {
  		let item = items[i].split('=');
  		let name = item[0].replace(/^ /, ''),
  			value = item[1];
  		list.push({
  			name: decodeURIComponent(name),
  			value: decodeURIComponent(value)
  		});
  	}
  	return list;
  }

  getLocalStorageList() {
  	if (!window.localStorage) {
  		return [];
  	}

  	let list = []
  	for (var i = 0; i < localStorage.length; i++) {
  		let name = localStorage.key(i),
  			value = localStorage.getItem(name);
  		list.push(JSON.stringify({
  			name: name,
  			value: value
  		}));
  	}
  	return list;
  }
}
let tab = new VConsoleLogUploadTab('uploader', 'LogUploader');
vConsole.addPlugin(tab);
