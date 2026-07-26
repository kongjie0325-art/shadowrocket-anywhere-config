// weibo-ad.js
// 微博去广告净化 - 从 anywhere fmz200/wool_scripts 提取
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
    
    // 仅处理 statuses/user_timeline / profile/statuses/tab / cardlist / search
    var isTimeline = url.indexOf('/statuses/user_timeline') >= 0 || 
                     url.indexOf('/profile/statuses/tab') >= 0;
    var isCardlist = url.indexOf('/cardlist') >= 0;
    var isSearch = url.indexOf('/search/') >= 0;
    
    if (!isTimeline && !isCardlist && !isSearch) {
        $done({response: $response});
        return;
    }
    
    var changed = false;
    
    // 搜索页：过滤广告条目（保留粉丝头条以外的内容）
    if (isSearch && data.data && Array.isArray(data.data)) {
        data.data = data.data.filter(function(item) {
            if (!item || !item.data) return false;
            if (item.data.ad_type === 2) return false; // 广告
            if (item.data.card_id && /^ad/.test(item.data.card_id)) return false;
            if (item.data.is_top === '1') return false; // 置顶广告
            return true;
        });
        changed = true;
    }
    
    // 时间线/卡片列表：清理广告卡片 + 移除广告追踪参数
    if (data.data && Array.isArray(data.data)) {
        data.data = data.data.filter(function(item) {
            if (!item || !item.data) return false;
            
            // 排除广告卡片类型
            if (item.data.ad_type === 1 || item.data.ad_type === 2) return false;
            if (item.data.card_id === '7959') return false; // 品牌速递卡片ID
            
            // 过滤广告推文（ad_trace 存在则为广告）
            if (item.data.tweetid && item.data.ad_trace) return false;
            
            // 过滤普通广告卡片
            if (item.data.card_type === 118) return false;
            
            return true;
        });
        changed = data.data.length > 0;
    }
    
    // 移除 BLOCK 类型卡片（营销信息）
    if (data.data && Array.isArray(data.data)) {
        var newData = data.data.filter(function(item) {
            return !item || (item.card_type !== 11 && item.card_type !== 165);
        });
        changed = newData.length !== data.data.length;
        data.data = newData;
    }
    
    if (changed) {
        $response.body = JSON.stringify(data);
    }
    
    $done({response: $response});
})();
