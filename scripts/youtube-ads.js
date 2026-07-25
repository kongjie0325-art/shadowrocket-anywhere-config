// youtube-ads.js
// YouTube 去广告脚本

const url = $request.url;

// 移除 YouTube 播放前广告
if (url && url.includes("initplayback")) {
    $done({response: {status: 204}});
    return;
}

// 移除 YouTube 广告参数
if (url && url.includes("youtubei/v1/")) {
    try {
        let body = $response.body;
        if (body && typeof body === 'string') {
            let data = JSON.parse(body);
            
            // 移除广告相关字段
            if (data.playerAds) {
                delete data.playerAds;
            }
            if (data.adPlacements) {
                delete data.adPlacements;
            }
            if (data.adSlots) {
                delete data.adSlots;
            }
            
            $response.body = JSON.stringify(data);
        }
    } catch (e) {
        // 忽略解析错误
    }
}

$done({response: $response});
