const Injection = `var css = {
    baidu_search: "div[style*=fixed],.ec_ad_results {display:none !important;} ", // baidu
    baidu_index: "a[data-tclog] > img, #login-wraps, div[style*='overflow'], .rn-container, .s-loading-frame.bottom {display:none !important;}",
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


let regex = /https?:\\/\\/(www|m)\\.baidu\\.com\\/(from=|s\\?)/gi
if (window.location.href.search(regex) !== -1) {
    css_adsRemove(css.baidu_search);
    console.log('移除搜索结果广告🪧...')
} else {
    // adsDomain_switch("zhidao")
    css_adsRemove(css.baidu_index);
    console.log('移首页广告🪧...')
}`

// Regular expressions for URL matching
const TITLE_INJECTION = `</title>
<script type="text/javascript">${Injection}</script>
`;

// Regular expressions for content manipulation
const TITLE_REGEX = /<\/title>/i;
const WINDOW_OPEN_REGEX = /window\.open/g;


// Main function to process response
function processResponse() {
    const requestUrl = $request.url;
    let responseBody = $response.body;

    // Validate response body
    if (!responseBody) {
        // console.log("Response body is null or undefined");
        $done({ url: requestUrl });
        return;
    }

    responseBody = responseBody
        .replace(TITLE_REGEX, TITLE_INJECTION)
        .replace(WINDOW_OPEN_REGEX, "");

    // Modify response headers
    const responseHeaders = {
        ...$response.headers,
        "Cross-Origin-Embedder-Policy": "unsafe-none",
        "Cross-Origin-Opener-Policy": "unsafe-none",
        "Cross-Origin-Resource-Policy": "cross-origin"
    };

    // Remove restrictive headers
    delete responseHeaders["Content-Security-Policy"];
    delete responseHeaders["X-Frame-Options"];
    delete responseHeaders["Referrer-Policy"];

    // Return modified response
    $done({
        headers: responseHeaders,
        body: responseBody,
        url: requestUrl
    });
}

// Execute main function with error handling
try {
    processResponse();
} catch (error) {
    // console.log(`Error processing response: ${error.message}`);
    $done({ url: $request.url, body: $response.body, headers: $response.headers });
}