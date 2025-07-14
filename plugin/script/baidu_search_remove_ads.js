
// CSS and JS resources for ad removal
const JS_URL = "https://firstmetcs.net/Adguard/baidu.rm.ads.js";

// Regular expressions for URL matching
const TITLE_INJECTION = `</title>
<script type="text/javascript" async="async" src="${JS_URL}"></script>
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