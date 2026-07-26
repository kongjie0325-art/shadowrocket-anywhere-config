// tiktok-ad.js
// TikTok 去广告脚本 - http-response
// 从 anywhere 提取：移除广告卡片、直播推广、信息流广告
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    
    if (!url) { $done({}); return; }
    
    // 仅处理 TikTok/ByteDance 域名
    var host = (url.match(/https?:\/\/([^\/]+)/) || [])[1] || '';
    var tiktokHosts = ['tiktokv.com', 'byteoversea.com', 'tik-tokapi.com', 'tiktok.com', 'bytednsdoc.com', 'bytemastatic.com', 'byteintl.com', 'byteintl.net', 'isnssdk.com', 'sgpstatp.com', 'ttwstatic.com'];
    var isTikTok = tiktokHosts.some(function(h) { return host.indexOf(h) !== -1; });
    if (!isTikTok) { $done({}); return; }
    
    if (!$response || !$response.body || typeof $response.body !== 'string') {
        $done({});
        return;
    }
    
    try {
        var data = JSON.parse($response.body);
        var modified = false;
        
        // 广告相关字段清理
        var adFields = [
            'ad', 'ads', 'adBreak', 'adBreaks', 'adUnit',
            'adsTracking', 'adInfo', 'adMeta', 'adTag',
            'promotion', 'promotions', 'adCard', 'adEntry',
            'sparkAd', 'sponsoredAd', 'liveAd'
        ];
        
        adFields.forEach(function(field) {
            if (data.hasOwnProperty(field)) {
                delete data[field];
                modified = true;
            }
        });
        
        // 清理 aweme 中的广告
        if (data.aweme && typeof data.aweme === 'object') {
            if (data.aweme.ad) { delete data.aweme.ad; modified = true; }
            if (data.aweme.promotion) { delete data.aweme.promotion; modified = true; }
        }
        
        // 清理 item_list 中的广告条目
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                return !(item.ad || item.promotion || item.type === 34);
            });
            modified = true;
        }
        
        if (modified) {
            $done({ body: JSON.stringify(data) });
        } else {
            $done({});
        }
    } catch (e) {
        $done({});
    }
})();
