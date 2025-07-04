/***********************************

> 网站名称：自用V2EX网页去广告
> 脚本功能：网站净化|去广告
> 脚本作者：firstmetcs
> 更新时间：2025-07-04
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载、售卖
          ⚠️⚠️⚠️

[Script]
http-response ^https?:\/\/.*v2ex\.com\/($|t\/\d+) script-path = https://raw.githubusercontent.com/firstmetcs/Loon/main/plugin/script/v2ex_remove_ads.js, requires-body = true, tag = v2ex

[MitM] 
hostname = *.v2ex.com, v2ex.com

***********************************/


var body = $response.body.replace(
  /<head>/,
  `<head>
    <style>
      div:has(> .adsbygoogle){
        display: none !important;
      }
      div[class^="wwads-"]{
        display: none !important;
      }
    </style>`
);
$done({ body });