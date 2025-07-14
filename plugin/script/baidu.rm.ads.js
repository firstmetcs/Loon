var css = {
    baidu_search: "div[style*=fixed],.ec_ad_results {display:none !important;} ", // baidu
    baidu_index: "a[data-tclog] > img, #foot, .recordcode, .index-copyright, div[style*='overflow'], .rn-container, .s-loading-frame.bottom {display:none !important;}",
}
        

// 动态创建引用内部资源 内嵌式样式 内嵌式脚本
function css_adsRemove(newstyle, delaytime, id) {
    setTimeout(() => {
        var creatcss = document.createElement("style");
        creatcss.id = id;
        creatcss.innerHTML = newstyle;
        document.getElementsByTagName('head')[0].appendChild(creatcss)
        console.log("CSS样式新增完毕！");
    }, delaytime);
}


let regex = /https?:\/\/(www|m)\.baidu\.com\/(from=|s\?)/gi
if (window.location.href.search(regex) !== -1) {
    css_adsRemove(css.baidu_search);
    console.log('移除搜索结果广告🪧...')
} else {
    // adsDomain_switch("zhidao")
    css_adsRemove(css.baidu_index);
    console.log('移首页广告🪧...')
}