// bilibili-ad.js
// Bilibili 去广告脚本 - 从 anywhere kokoryh/Sparkle 提取
// 兼容 Shadowrocket ES5
(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // 获取请求体
    var body = $request.body || '';
    var headers = $request.headers || {};
    
    // === 1. 请求阶段：阻止广告追踪上报 ===
    if (url.indexOf('x/report') !== -1) {
        $done({ status: 200, body: '{"code":0,"message":"success"}' });
        return;
    }
    
    // 阻止心跳上报
    if (url.indexOf('heartbeat') !== -1 && url.indexOf('bilibili.com') !== -1) {
        $done({ status: 200, body: '{"code":0,"message":"success"}' });
        return;
    }
    
    // 阻止广告点击上报
    if (url.indexOf('x/report/click') !== -1) {
        $done({ status: 200, body: '{"code":0,"message":"success"}' });
        return;
    }
    
    // 阻止 pgc 活动物料接口
    if (url.indexOf('pgc/activity/deliver/material/receive') !== -1) {
        $done({ status: 200, body: JSON.stringify({code:0,data:{closeType:"close_win",container:[],showTime:""},message:"success"}) });
        return;
    }
    
    // 阻止直播购物信息
    if (url.indexOf('e-commerce-interface') !== -1 && url.indexOf('get_shopping_info') !== -1) {
        $done({ status: 200, body: '{}' });
        return;
    }
    
    // 阻止游戏直播大卡片物料
    if (url.indexOf('game/live/large_card_material') !== -1) {
        $done({ status: 200, body: JSON.stringify({code:0,message:"success"}) });
        return;
    }
    
    // 阻止 VIP 广告素材
    if (url.indexOf('x/vip/ads/materials') !== -1) {
        $done({ status: 404, body: JSON.stringify({code:-404,message:"-404",ttl:1,data:null}) });
        return;
    }
    
    // 阻止搜索广场
    if (url.indexOf('x/v2/search/square') !== -1) {
        $done({ status: 404, body: JSON.stringify({code:-404,message:"-404",ttl:1,data:null}) });
        return;
    }
    
    // 阻止顶部活动 banner
    if (url.indexOf('x/resource/top/activity') !== -1) {
        $done({ status: 404, body: JSON.stringify({code:-404,message:"-404",ttl:1,data:null}) });
        return;
    }
    
    // 阻止 Tab 补丁
    if (url.indexOf('x/resource/patch/tab') !== -1) {
        $done({ status: 404, body: JSON.stringify({code:-404,message:"-404",ttl:1,data:null}) });
        return;
    }
    
    // === 2. 响应阶段：清理广告数据 ===
    if (method === 'POST' || method === 'GET') {
        // 响应体处理由 http-response 脚本负责（通过 module 加载）
        $done({});
        return;
    }
    
    $done({});
})();
