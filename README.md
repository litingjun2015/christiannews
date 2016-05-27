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

## 基督教新闻 wxbd05c4fc6e17966e
cordova plugin remove "cordova-plugin-wechat"
ionic plugin add cordova-plugin-wechat --variable wechatappid=wxbd05c4fc6e17966e

## test
ionic plugin add cordova-plugin-wechat --variable wechatappid=wx21ded7dba68708a8

## office debug 签名
4b068abcf712398459a0398fc648cab5

## home debug 签名
5cb4983623473aab3ade11247505bca5

## 发布签名
ae499917f773b0da4eb85e34bed5a57e

1. ```ionic plugin add cordova-plugin-wechat --variable wechatappid=wx8b5f023e83ed4a65```
2. ```ionic platform add ios```/```ionic platform add android```
3. ```ionic run ios```/```ionic run android```

## https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
$ cordova plugin add cordova-plugin-x-socialsharing
$ cordova prepare

## 微信登录
http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html

基督教新闻

AppID：wxbd05c4fc6e17966e
AppSecret：5c2fbf081e1d7fb33b0a7975f83d02a3

## https://github.com/nordnet/cordova-hot-code-push/wiki/Quick-start-guide-for-Ionic-project

1. ionic plugin add cordova-hot-code-push-plugin --save
2. ionic plugin add cordova-hot-code-push-local-dev-addon --save
3. 修改文件：
3.1 .chcpenv
{
  "content_url": "http://www.duangwifi.cn/christiannews/www",
  "config_url": "http://www.duangwifi.cn/christiannews/www/chcp.json"
}

3.2 config.xml
  <chcp>
    <config-file url="http://www.duangwifi.cn/christiannews/www/chcp.json"/>
  </chcp>
  
3.3 add cordova-hcp.json
{
  "autogenerated": true,
  "content_url": "http://www.duangwifi.cn/christiannews/www",
  "update": "now"
}

4. cordova-hcp build

5. 
git checkout -b 0.9.10
git push origin 0.9.10