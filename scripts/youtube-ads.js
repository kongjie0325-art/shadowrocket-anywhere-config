// youtube-ads.js
// YouTube 去广告脚本 - http-response + http-request 混合模式
// 主入口：youtubei.googleapis.com 响应去广告
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // 仅对 YouTube API 生效
    if (!url || url.indexOf('youtubei.googleapis.com') === -1) {
        $done({});
        return;
    }
    
    // === 请求阶段：阻止带广告参数的 playback 请求 ===
    if (method === 'GET' || method === 'POST') {
        // 拦截 initplayback 中的广告初始化
        if (url.indexOf('initplayback') !== -1 && url.indexOf('oad=') !== -1) {
            $done({ status: 404 });
            return;
        }
    }
    
    // === 响应阶段：清理广告字段 ===
    if ($response && $response.body && typeof $response.body === 'string') {
        try {
            var data = JSON.parse($response.body);
            var modified = false;
            
            // 明确删除的广告相关字段
            var adFields = [
                'playerAds',
                'adPlacements',
                'adBreakHeartbeatParams',
                'playerAdParams',
                'videoAdKeyActions',
                'adProgressString',
                'adPlaybackUrl',
                'adFormatUrl',
                'sdnsAdMatchKey',
                'adBreaks',
                'adCuepoints',
                'adIntroRenderer',
                'adSlotRenderer',
                'adLegacyConversionGvr',
                'adClickTracking',
                'adDisplayProperties',
                'adInfo',
                'adMedia',
                'adPlacementInfo',
                'adPlayerOverlayRenderer',
                'adSequenceNumber',
                'adSlots',
                'adTag',
                'adTitle',
                'adVideoId',
                'adWrapper',
                'adBreakTimeOffset',
                'adChoices',
                'adClientParams',
                'adDislikeCount',
                'adDuration',
                'adEndTime',
                'adId',
                'adIndexInSlot',
                'adLength',
                'adMetadata',
                'adNextRequestIndex',
                'adParameters',
                'adPlacementsRenewed',
                'adPodInfo',
                'adPrefetchSeconds',
                'adRenderers',
                'adRequestConfig',
                'adSlot',
                'adSlotMetadata',
                'adSlotWrapper',
                'adSlotsRenewed',
                'adSource',
                'adStartTime',
                'adTagParameters',
                'adType',
                'adUnit',
                'adVideoId',
                'adWrapperList',
                'adsTrackingParams',
                'associatedVideoAd',
                'breakSlot',
                'breakSlotWithPlayerAds',
                'creatorsAd',
                'desktopPauseAndClickAd',
                'dynamicVideoAdRenderer',
                'externalLinkAd',
                'featureCardsAd',
                'fillSlotCommands',
                'fulfilledBreakingAd',
                'hostOffsetAd',
                'instreamVideoAd',
                'mastheadAd',
                'midrollSlot',
                'movingThumbnailAd',
                'overflowAutoplayAd',
                'pauseAndClickAd',
                'playerAdsAndBreakSlots',
                'playerLegacyDesktopWatchAds',
                'playerLegacyWatchAds',
                'podcastAd',
                'postrollSlot',
                'premiumChoiceAd',
                'programmaticVideoAd',
                'repeatAfterSlot',
                'repeatSlot',
                'rollSlot',
                'searchPromotedSparklesWebRenderer',
                'showEngagementPanelEndpoint',
                'slot',
                'slotCallback',
                'slotEntry',
                'slotFulfillment',
                'slotInsertion',
                'slotOpportunity',
                'slotRenderers',
                'slotReplacement',
                'slotRestriction',
                'slotScheduling',
                'slotSuppression',
                'slotWrapper',
                'sponsoredButton',
                'sponsoredHeading',
                'streamingAd',
                'surveyAd',
                'tadData',
                'textAd',
                'timedPiechartWatermarkRenderer',
                'trueViewInDisplayAd',
                'trueViewInStreamAd',
                'unifiedSurveyAd',
                'videoAd',
                'videoAnnotationAd',
                'videoEngagementPanelAd',
                'videoWallAd',
                'voiceBasedAd',
                'watermarkAd',
                'yoodleAd'
            ];
            
            // 删除顶层广告字段
            for (var i = 0; i < adFields.length; i++) {
                if (data.hasOwnProperty(adFields[i])) {
                    delete data[adFields[i]];
                    modified = true;
                }
            }
            
            // 如果有 playerResponse 嵌套，也清理其中的广告
            if (data.playerResponse && typeof data.playerResponse === 'object') {
                if (data.playerResponse.playerAds) { delete data.playerResponse.playerAds; modified = true; }
                if (data.playerResponse.adPlacements) { delete data.playerResponse.adPlacements; modified = true; }
                if (data.playerResponse.adBreakHeartbeatParams) { delete data.playerResponse.adBreakHeartbeatParams; modified = true; }
                if (data.playerResponse.playerAdParams) { delete data.playerResponse.playerAdParams; modified = true; }
                if (data.playerResponse.videoAdKeyActions) { delete data.playerResponse.videoAdKeyActions; modified = true; }
                if (data.playerResponse.adBreaks) { delete data.playerResponse.adBreaks; modified = true; }
                if (data.playerResponse.adCuepoints) { delete data.playerResponse.adCuepoints; modified = true; }
                if (data.playerResponse.adSlotRenderer) { delete data.playerResponse.adSlotRenderer; modified = true; }
                if (data.playerResponse.adIntroRenderer) { delete data.playerResponse.adIntroRenderer; modified = true; }
                if (Array.isArray(data.playerResponse.adPlaceholders)) { data.playerResponse.adPlaceholders = []; modified = true; }
            }
            
            // 清理 streams 如果有字段
            if (data.streamingData) {
                // 不修改 streamingData，保留播放数据
                // streamingData / formats / adaptiveFormats / videoDetails 不动
            }
            
            // 清理 adsense overlay
            if (data.adPlacements && Array.isArray(data.adPlacements)) {
                data.adPlacements = [];
                modified = true;
            }
            
            if (modified) {
                $done({ body: JSON.stringify(data) });
            } else {
                $done({});
            }
        } catch (e) {
            // 解析失败保持原样
            $done({});
        }
        return;
    }
    
    $done({});
})();
