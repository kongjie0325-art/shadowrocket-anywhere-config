// app-enhance.js
// App 增强脚本 - 通用

const url = $request.url;
const headers = $request.headers;

// 移除 User-Agent 中的标识
if (headers["User-Agent"]) {
    headers["User-Agent"] = headers["User-Agent"]
        .replace(/Shadowrocket/g, "")
        .replace(/Surge/g, "")
        .replace(/Quantumult/g, "")
        .replace(/Clash/g, "")
        .trim();

    if (headers["User-Agent"].length < 10) {
        headers["User-Agent"] = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
    }
}

// 隐藏 iOS 设备型号
if (headers["X-Device-Model"]) {
    delete headers["X-Device-Model"];
}
if (headers["X-Device-Name"]) {
    delete headers["X-Device-Name"];
}

$done({response: {headers: headers}});
