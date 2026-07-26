// zhihu-ad.js
// 知乎去广告脚本 - 开屏广告 + API 清理
// 修正：使用真实知乎广告 API 路径
// ES5 兼容 Shadowrocket QuanX

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    // 仅处理响应
    if (method && method !== 'response') {
        $done({url: url});
        return;
    }
    
    // ========== 知乎开屏广告 ==========
    // 真实 API: /api/v4/splash/v3/{id}/content
    if (url && /\/api\/v4\/splash\//.test(url)) {
        $done({response: {status: 204}});
        return;
    }
    
    var body = $response.body;
    if (!body || typeof body !== 'string') {
        $done({response: $response});
        return;
    }
    
    var data;
    try {
        data = JSON.parse(body);
    } catch (e) {
        $done({response: $response});
        return;
    }
    
    var changed = false;
    
    // ========== 首页 Feed 流广告清理 ==========
    // /v4/feed/top/activity (顶部活动banner)
    if (url.indexOf('/v4/feed/top/activity') >= 0 || 
        url.indexOf('/v4/feed/topstory') >= 0) {
        // 移除顶部推广卡片（包含广告标签）
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.data) return false;
                // 过滤广告/推广标记
                if (item.data.ad_label || item.data.ad_info || item.data.is_ad) return false;
                // 过滤商业推广类型
                if (item.data.type === 'Commercial_promotion' || item.data.type === 'Mass_message') return false;
                return true;
            });
            changed = true;
        }
    }
    
    // ========== 搜索结果页广告 ==========
    else if (url.indexOf('/v4/search') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.data) return false;
                // 移除广告条目
                if (item.data.ad_info || item.data.is_ad || item.data.card_id === '1409') return false;
                return true;
            });
            changed = true;
        }
    }
    
    // ========== 会员购/商业内容 ==========
    else if (url.indexOf('/v4/topstory') >= 0 || url.indexOf('/v4/feed') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.data) return true;
                // 移除会员购卡片、广告卡片
                if (item.data.type === 'shopping_list' || item.data.type === 'shopping_entrance') return false;
                if (item.data.ad_label) return false;
                return true;
            });
            changed = true;
        }
    }
    
    if (changed) {
        $response.body = JSON.stringify(data);
    }
    
    $done({response: $response});
})();
