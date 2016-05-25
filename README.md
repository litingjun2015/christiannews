# A demo application built on Ionic

See [cordova-plugin-wechat](https://github.com/xu-li/cordova-plugin-wechat)

![APP Screenshot](https://raw.githubusercontent.com/xu-li/cordova-plugin-wechat-example/master/assets/screenshot-3.png)

## How to run

## bizapp
## 更改包名后记得重新安装插件 com.christiannews.app
1. 去 https://open.weixin.qq.com/cgi-bin/applist?t=manage/list&lang=zh_CN&token=175b9a3ca0dcf43e39fe95477ba81370fa905db6
拿到“基督教新闻”的wechatappid
2. 更新 重新安装插件
ionic plugin add cordova-plugin-wechat --variable wechatappid=wx8ce2e64af40f99d5

1. ```ionic plugin add cordova-plugin-wechat --variable wechatappid=wx8b5f023e83ed4a65```
2. ```ionic platform add ios```/```ionic platform add android```
3. ```ionic run ios```/```ionic run android```
