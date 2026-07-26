// weibo-ad.js
// 微博去广告净化 - 从 anywhere fmz200/wool_scripts 提取
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // === 1. 请求阶段：阻止广告接口 ===
    
    // 阻止广告上报
    if (url.indexOf('push/active') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止 addlog_batch 批量日志
    if (url.indexOf('client/addlog_batch') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止广告预加载
    if (url.indexOf('ad/preload') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止云通信日志
    if (url.indexOf('api-cloudim.api.weibo.com/v1/log/') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止卡片广告
    if (url.indexOf('cardlist?v_f=') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '{"cards":[],"ad":[]}' });
        return;
    }
    
    // 阻止微博头条热榜
    if (url.indexOf('portal.php?a=hot_search_users') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止搜索信息
    if (url.indexOf('portal.php?a=get_searching_info') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止树洞授权
    if (url.indexOf('portal.php?treehole&auth=') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止每日推送
    if (url.indexOf('push/daily') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止发现底部广告
    if (url.indexOf('discovery_home_bottom_getdotinfo') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止搜索变更
    if (url.indexOf('mobile_discovery_searchchange') !== -1 && url.indexOf('weibo') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阻止实时/预加载广告
    if (url.indexOf('advertise/preload') !== -1 && url.indexOf('uve.weibo.com') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止 SDK 配置
    if (url.indexOf('sdkconfig.php') !== -1 && url.indexOf('uve.weibo.com') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止文章奖励/广告卡片
    if (url.indexOf('reward|uvead') !== -1 && url.indexOf('card.weibo.com/article') !== -1) {
        $done({ status: 200, body: '{"ok":false}' });
        return;
    }
    
    // === 2. 响应阶段：JSON 净化 ===
    if (method === 'POST' || method === 'GET') {
        if (!$response.body || typeof $response.body !== 'string') {
            $done({});
            return;
        }
        
        var text = $response.body;
        var parsed = null;
        
        try { parsed = JSON.parse(text); } catch(e) { $done({}); return; }
        
        var modified = false;
        
        // 清理用户时间线中的广告卡片
        if (url.indexOf('statuses/user_timeline') !== -1 && parsed.data && parsed.data.data) {
            var items = parsed.data.data;
            for (var i = items.length - 1; i >= 0; i--) {
                if (items[i].mblog &&
                    (items[i].mblog.title || items[i].mblog.promotion) &&
                    (items[i].mblog.url_struct && items[i].mblog.url_struct.length > 0)) {
                    items.splice(i, 1);
                    modified = true;
                }
            }
        }
        
        // 清理 timeline 中的广告
        if (url.indexOf('timeline') !== -1 && parsed.data && parsed.data.data) {
            var tl = parsed.data.data;
            for (var j = tl.length - 1; j >= 0; j--) {
                if (tl[j].advertises || (tl[j].mblog && tl[j].mblog.promotion)) {
                    tl.splice(j, 1);
                    modified = true;
                }
            }
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
