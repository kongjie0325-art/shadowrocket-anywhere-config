// app-enhance.js
// App 增强脚本 - 通用

const url = $request.url;
const headers = $request.headers;

// 移除 User-Agent 中的标识
if (headers["User-Agent"]) {
    headers["User-Agent"] = headers["User-Agent"]
        .replace(/\/Shadowrocket\/\d+\.\d+\.\d+/, "")
        .replace(/Shadowrocket/i, "");
}

// 移除 Referer（某些 App 追踪来源）
if (headers["Referer"]) {
    delete headers["Referer"];
}

// 移除 Cookie（如果不需要）
// if (headers["Cookie"]) {
//     delete headers["Cookie"];
// }

$done({ headers: headers });
