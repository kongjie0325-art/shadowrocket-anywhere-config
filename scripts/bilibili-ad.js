// bilibili-ad.js
// Bilibili 去广告脚本 - 从 anywhere kokoryh/Sparkle 提取
// 覆盖：开屏/信息流/搜索/直播间/评论区/视频页/我的页面/频道/收藏
// ES5 兼容 Shadowrocket QuanX

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    // 非响应直接返回
    if (method !== 'response' && method !== undefined) {
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
    
    var changed = false;
    
    // ========== 动态页顶部 UP 列表 ==========
    // 还原上游 displayUpList，可控制动态页顶部 UP 列表展示方式。
    if (url.indexOf('/x/resource/show/tab/v2') >= 0) {
        // 删除 splash
        if (data.data && data.data.splash) {
            delete data.data.splash;
            changed = true;
        }
        // 删除 top_more
        if (data.data && data.data.top_more) {
            delete data.data.top_more;
            changed = true;
        }
    }
    
    // ========== 净化评论：过滤评论区广告卡片和常见引流内容 ==========
    else if (url.indexOf('/x/v2/reply/main') >= 0) {
        // 过滤广告类型评论
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                return !item.type || (item.type !== 'ad' && item.type !== 'advert' && item.type !== 'banner');
            });
            changed = data.data.length !== (data.data_original && data.data_original.length);
        }
    }
    
    // ========== 开屏广告 (splash/list/show/event/list2) ==========
    // x/v2/splash/{list|show|event/list2}
    else if (url.indexOf('/x/v2/splash/') >= 0) {
        data.data = null;
        changed = true;
    }
    
    // ========== 搜索广场广告卡片 ==========
    // x/v2/search/square -> 搜索广场
    else if (url.indexOf('/x/v2/search/square') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.data) return false;
                // 排除广告类型
                if (item.data.ad_info || item.data.is_ad === true) return false;
                return true;
            });
            changed = true;
        }
    }
    
    // ========== 推荐/首页信息流广告 ==========
    // x/v2/feed/index
    else if (url.indexOf('/x/v2/feed/index') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.card_data) {
                    return true;
                }
                // 排除广告卡片（包括淘宝购物卡片）
                var adTypes = ['ad', 'banner', 'cm', 'banner_v2', 'shopping', 'tunnel_video'];
                return adTypes.indexOf(item.card_data.type) < 0;
            });
            changed = true;
        }
    }
    
    // ========== 评论区广告清理 ==========
    else if (url.indexOf('/comments/') >= 0 && url.indexOf('mix_comments') >= 0) {
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                if (!item || !item.type) return true;
                return item.type !== 'banner_ad' && item.type !== 'cm_video';
            });
            changed = true;
        }
    }
    
    // ========== 弹幕视频页广告 (x/v2/view) ==========
    // x/v2/view -> 视频播放页
    else if (url.indexOf('/x/v2/view') >= 0) {
        // 删除推荐正片广告（真人短片推广）
        if (data.data && data.data.rec_season) {
            delete data.data.rec_season;
            changed = true;
        }
        // 删除活动推广卡片
        if (data.data && data.data.activity_card) {
            delete data.data.activity_card;
            changed = true;
        }
        // 删除推荐视频中的广告
        if (data.data && data.data.rec_three_point) {
            delete data.data.rec_three_point;
            changed = true;
        }
        // 清除推广标签
        if (data.data && data.data.topic_card) {
            data.data.topic_card = data.data.topic_card.filter(function(item) {
                return !item || !item.is_ad || !item.ad_info;
            });
            changed = true;
        }
        // 移除顶部广告条
        if (data.data && data.data.promotion) {
            delete data.data.promotion;
            changed = true;
        }
    }
    
    // ========== 我的页面广告 (x/v2/account/mine) ==========
    // x/v2/account/mine
    else if (url.indexOf('/x/v2/account/mine') >= 0 || url.indexOf('/x/v2/account/myinfo') >= 0) {
        // 移除 SaaS 推广（登录引导等）
        if (data.data && data.data.module_entity) {
            delete data.data.module_entity;
            changed = true;
        }
        // 移除头像挂件/动态挂件
        if (data.data && data.data.pendant_info) {
            delete data.data.pendant_info;
            changed = true;
        }
        // 移除装扮中心入口
        if (data.data && data.data.room_theme) {
            delete data.data.room_theme;
            changed = true;
        }
        // 移除底部广告
        if (data.data && data.data.bottom_entrance && data.data.bottom_entrance.entrance_list) {
            var blockedTypes = [33, 36, 162, 186];
            data.data.bottom_entrance.entrance_list = data.data.bottom_entrance.entrance_list.filter(function(item) {
                return !item || blockedTypes.indexOf(item.biz_id) < 0;
            });
            changed = true;
        }
    }
    
    // ========== 频道页推广 (pgc/page/channel) ==========
    // pgc/page/channel
    else if (url.indexOf('/pgc/page/channel') >= 0) {
        // 移除标为推广的卡片
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(function(item) {
                return !item || (item.is_ad !== true && !(item.style && item.style === 'AD'));
            });
            changed = true;
        }
    }
    
    if (changed) {
        $response.body = JSON.stringify(data);
    }
    
    $done({response: $response});
})();
