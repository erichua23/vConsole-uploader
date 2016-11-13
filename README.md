vConsole-uploader
==============================

一款支持上传日志和LocalStorage的 vConsole插件, 主要是解决测试过程中遇到问题, 开发不方便获取日志的问题. 

## 第一步: 启动Server

``` 
node server/app.js
```

## 第二步: 配置日子上传的 Server

``` js
<script src="./lib/vconsole.min.js"></script>
<script src="../dist/vconsole-loguploader.min.js"></script>
<script>
vConsole.pluginList['uploader'].config({postURL: 'http://localhost:3000/postLog'});
</script>
``` 
其中的 url 地址可以改为自己的, demo 的 server已经支持了跨域访问. 

## 第三步: 打开Demo体验功能

打开 http://localhost:3000/exmaple/demo.html 体验功能.

![image](https://cloud.githubusercontent.com/assets/1309744/20247822/9188065a-aa11-11e6-9591-86bedb100807.png)

![image](https://cloud.githubusercontent.com/assets/1309744/20247817/6cdee670-aa11-11e6-8324-ee7d671be06f.png)






