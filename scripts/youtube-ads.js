// youtube-ads.js
// YouTube 最小化去广告脚本 - 仅删除广告相关字段，不修改其他内容

const url = $request.url;
const headers = $request.headers;

// 仅在 youtubei.googleapis.com 上生效
if (!url || !url.includes("youtubei.googleapis.com")) {
    $done({response: $response});
    return;
}

// 只处理成功的 JSON 响应
if ($response.status !== 200 || !$response.body || typeof $response.body !== 'string') {
    $done({response: $response});
    return;
}

try {
    let data = JSON.parse($response.body);
    let modified = false;

    // 仅删除明确的广告字段，不碰播放相关字段
    if (data.playerAds) {
        delete data.playerAds;
        modified = true;
    }
    if (data.adPlacements) {
        delete data.adPlacements;
        modified = true;
    }
    if (data.adBreakHeartbeatParams) {
        delete data.adBreakHeartbeatParams;
        modified = true;
    }

    // 不修改 streamingData / formats / adaptiveFormats / videoDetails
    // 不修改 Header / Content-Length / 任何其他内容

    if (modified) {
        $response.body = JSON.stringify(data);
    }

    $done({response: $response});
} catch (e) {
    // 解析失败时保持原样返回
    $done({response: $response});
}
