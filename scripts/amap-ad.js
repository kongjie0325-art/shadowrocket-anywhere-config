// amap-ad.js
// 高德地图去广告增强版 - 从 anywhere RuCu6/kelv1n1n 提取
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
    
    // ========== 高德导航主页广告 ==========
    // faas/amap-navigation/card-service-plan-home | main-page
    if (url.indexOf('/faas/amap-navigation/') >= 0 && 
        (url.indexOf('/card-service-plan-home') >= 0 || url.indexOf('/main-page') >= 0)) {
        // 移除首页上车点弹窗广告
        if (data.data && data.data.common_data && data.data.common_data.ads) {
            if (Array.isArray(data.data.common_data.ads)) {
                data.data.common_data.ads = [];
            }
        }
        // 移除首页运营Banner
        if (data.data && data.data.banners) {
            data.data.banners = data.data.banners.filter(function(b) {
                return !b || !b.banner_show_type || b.banner_show_type !== 'AD';
            });
        }
        // 移除底部运营位
        if (data.module_data && data.module_data.appMapBottom && data.module_data.appMapBottom.length) {
            data.module_data.appMapBottom = data.module_data.appMapBottom.filter(function(item) {
                return !item || !item.biz_id || item.biz_id !== 5001;
            });
        }
    }
    
    // ========== 高德导航路线广告 ==========
    else if (url.indexOf('/perception/drive/') >= 0 && 
             (url.indexOf('/routeInfo') >= 0 || url.indexOf('/routePlan') >= 0)) {
        if (data.data) {
            // 移除路线卡片广告
            if (data.data.route_preference_list && Array.isArray(data.data.route_preference_list)) {
                data.data.route_preference_list = data.data.route_preference_list.filter(function(item) {
                    return !item || !item.ad_trace;
                });
            }
        }
    }
    
    // ========== 高德搜索POI广告 ==========
    else if (url.indexOf('/shield/search_poi/') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            // 过滤广告POI（type=14 或 is_ad=true）
            data.data = data.data.filter(function(poi) {
                if (!poi || !poi.type) return true;
                if (poi.type === 14) return false; // 商业推广POI
                if (poi.ad_info && poi.ad_info.is_ad === 1) return false;
                return true;
            });
        }
        // 移除历史记录广告
        if (data.history_tags) {
            data.history_tags = data.history_tags.filter(function(tag) {
                return tag && !/ads|ad/i.test(tag);
            });
        }
        // 清理搜索建议广告
        if (data.suggestion && data.suggestion.sug && Array.isArray(data.suggestion.sug)) {
            data.suggestion.sug = data.suggestion.sug.filter(function(s) {
                return !s || !s.ad_trace || !s.is_ad;
            });
        }
    }
    
    // ========== 高德搜索热词 ==========
    else if (url.indexOf('search_new_hotword') >= 0 || url.indexOf('hotword') >= 0) {
        if (data.data) {
            data.data = {};
        }
    }
    
    $done({response: $response});
})();
