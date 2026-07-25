// tracker-strip.js
// 移除 URL 中的追踪参数

let url = $request.url;

const trackingParams = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "gclid", "fbclid", "ttclid", "dclid",
    "_ga", "_gid", "_gat",
    "msclkid", "zanpid", "zanoxid",
    "spm", "algo_expid", "algo_pvid",
    "tracking_id", "aff_id", "subaid",
    "from", "refer", "ref",
    "original_url", "redirect_url",
    "session_id", "visitor_id",
    "client_id", "anonymous_id"
];

let modified = false;

trackingParams.forEach(param => {
    const regex = new RegExp(`[?&]${param}=[^&]*`, 'gi');
    if (regex.test(url)) {
        url = url.replace(regex, '');
        modified = true;
    }
});

// 清理多余的问号和&符号
url = url.replace(/\?$/, '').replace(/&$/, '').replace(/\?&/, '?');

if (modified) {
    $done({url: url});
} else {
    $done();
}
