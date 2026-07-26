// amap-ad.js
// 高德地图去广告增强版 - 从 anywhere RuCu6/kelv1n1n 提取
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // === 1. 请求阶段：阻止广告接口 ===
    
    // 开屏广告
    if (url.indexOf('/ws/valueadded/alimama/splash_screen') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 阿里妈妈 adc
    if (url.indexOf('amdc.m.taobao.com/amdc/mobileDispatch') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 主页广告
    if (url.indexOf('/ws/aos/main/page/product/list') !== -1) {
        $done({ status: 200, body: '{"list":[]}' });
        return;
    }
    
    // 导航主页广告 assets
    if (url.indexOf('/ws/faas/amap-navigation/main-page-assets') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    if (url.indexOf('/ws/faas/amap-navigation/main-page-location') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 打车广告
    if (url.indexOf('king_toolbox_car_bubble') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    if (url.indexOf('feedback/get_card_questions') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    if (url.indexOf('feedback/viptips') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 搜索广告
    if (url.indexOf('/ws/shield/search_business/process/orderList') !== -1) {
        $done({ status: 200, body: '{"result":[]}' });
        return;
    }
    
    if (url.indexOf('/ws/shield/search/new_hotword') !== -1) {
        $done({ status: 200, body: JSON.stringify({result:[],time:Date.now(),msg:"success"}) });
        return;
    }
    
    if (url.indexOf('/ws/shield/search_poi/tips_adv') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // Banner 列表
    if (url.indexOf('/ws/banner/lists/') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // AI 推荐
    if (url.indexOf('/v1/ai_rec/') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 消息通知
    if (url.indexOf('/ws/message/notice/list') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 场景推荐
    if (url.indexOf('/ws/shield/scene/recommend') !== -1) {
        $done({ status: 200, body: '{"data":[]}' });
        return;
    }
    
    // 天气插件
    if (url.indexOf('/ws/valueadded/weather/v2') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 消息盒子
    if (url.indexOf('/ws/msgbox/pull_mp') !== -1) {
        $done({ status: 200, body: '[]' });
        return;
    }
    
    // 错峰出行
    if (url.indexOf('transportation/diversion/resource/driving') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 打车订单
    if (url.indexOf('/ws/boss/car/order/content_info') !== -1) {
        $done({ status: 304, headers: {} });
        return;
    }
    
    // 公共交通
    if (url.indexOf('/ws/bus/plan/integrate') !== -1) {
        $done({ status: 200, body: '{"data":[]}' });
        return;
    }
    
    // === 2. 响应阶段：清理 JSON 中的广告数据 ===
    if (method === 'POST' || method === 'GET') {
        if (!$response.body || typeof $response.body !== 'string') {
            $done({});
            return;
        }
        
        var text = $response.body;
        var parsed = null;
        
        try { parsed = JSON.parse(text); } catch(e) { $done({}); return; }
        
        var modified = false;
        
        // 清理搜索营销数据
        if (url.indexOf('marketingOperationStructured') !== -1 && parsed.data) {
            if (parsed.data.commonMaterial && parsed.data.commonMaterial.data) {
                parsed.data.commonMaterial.data.bus_platoon_bottom_event = {};
                modified = true;  
            }
            if (parsed.data.tipsOperationLocation) {
                parsed.data.tipsOperationLocation = [];
                modified = true;
            }
            if (parsed.data.resourcePlacement) {
                parsed.data.resourcePlacement = [];
                modified = true;
            }
        }
        
        // 清理打车气泡广告
        if (url.indexOf('content_info') !== -1 && parsed.data && parsed.data.benefits) {
            parsed.data.benefits = {};
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
