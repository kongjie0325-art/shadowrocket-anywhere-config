// tracker-strip.js
// 移除 URL 中的追踪参数

let url = $request.url;

const trackingParams = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "gclid", "fbclid", "ttclid", "dclid", "msclkid",
    "ref", "referrer", "source", "from"
];

const urlObj = new URL(url);
let modified = false;

trackingParams.forEach(param => {
    if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.delete(param);
        modified = true;
    }
});

if (modified) {
    url = urlObj.toString();
}

$done({ url: url });
