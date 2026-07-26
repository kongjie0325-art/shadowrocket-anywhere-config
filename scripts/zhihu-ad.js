// zhihu-ad.js
// 知乎去广告脚本 - 开屏广告 + API 清理
// 修正：使用真实知乎广告 API 路径
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // === 1. 请求阶段：阻止广告 API ===
    
    // 开屏广告 - 真实路径
    if (url.indexOf('/api/v4/splash/') !== -1 && url.indexOf('zhihu.com') !== -1) {
        $done({ status: 204, body: '' });
        return;
    }
    
    // 阻止启动图广告
    if (url.indexOf('/api/v1/start_show') !== -1 && url.indexOf('zhihu.com') !== -1) {
        $done({ status: 204, body: '' });
        return;
    }
    
    // 阻止启动广告展示
    if (url.indexOf('/api/v1/start-image') !== -1 && url.indexOf('zhihu.com') !== -1) {
        $done({ status: 204, body: '' });
        return;
    }
    
    // 阻止用户会员广告
    if (url.indexOf('/api/v4/members') !== -1 && url.indexOf('zhihu.com') !== -1) {
        // 仅清理 adwords 字段，不阻止请求
        // 在响应阶段处理
    }
    
    // 阻止推送中的广告
    if (url.indexOf('/api/v3/feed/topstory') !== -1 && url.indexOf('zhihu.com') !== -1) {
        // 在响应阶段清理广告卡片
    }
    
    // === 2. 响应阶段：清理 JSON 中的广告 ===
    if (method === 'POST' || method === 'GET') {
        if (!$response.body || typeof $response.body !== 'string') {
            $done({});
            return;
        }
        
        var text = $response.body;
        var parsed = null;
        
        try { parsed = JSON.parse(text); } catch(e) { $done({}); return; }
        
        var modified = false;
        
        // 清理 feed 流中的广告卡片
        if (parsed.data && Array.isArray(parsed.data)) {
            var feedItems = parsed.data;
            for (var i = feedItems.length - 1; i >= 0; i--) {
                var item = feedItems[i];
                if (item.ad || item.ad_json || item.ad_list ||
                    (item.target && item.target.ad_info) ||
                    item.extra_data && item.extra_data.ad) {
                    feedItems.splice(i, 1);
                    modified = true;
                }
            }
        }
        
        // 清理 banner 广告
        if (parsed.ad && Array.isArray(parsed.ad)) {
            parsed.ad = [];
            modified = true;
        }
        
        // 清理 advertising 字段
        if (parsed.advertising) {
            parsed.advertising = [];
            modified = true;
        }
        
        // 清理 members 中的广告
        if (parsed.adwords) {
            parsed.adwords = {};
            modified = true;
        }
        
        if (modified) {
            $done({ body: JSON.stringify(parsed) });
        } else {
            $done({});
        }
        return;
    }
    
    $done({});
})();
