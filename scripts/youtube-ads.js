// youtube-ads.js
// YouTube 去广告脚本 - http-response ONLY
// 清理播放器响应中的广告字段，保留 streamingData/formats/videoDetails
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    
    if (!url || url.indexOf('youtubei.googleapis.com') === -1) {
        $done({});
        return;
    }
    
    // 仅处理响应阶段
    if (!$response || !$response.body || typeof $response.body !== 'string') {
        $done({});
        return;
    }
    
    try {
        var data = JSON.parse($response.body);
        var modified = false;
        
        // 顶层广告字段
        var adFields = [
            'playerAds', 'adPlacements', 'adBreakHeartbeatParams', 'playerAdParams',
            'videoAdKeyActions', 'adProgressString', 'adPlaybackUrl', 'adFormatUrl',
            'sdnsAdMatchKey', 'adBreaks', 'adCuepoints', 'adIntroRenderer',
            'adSlotRenderer', 'adLegacyConversionGvr', 'adClickTracking',
            'adDisplayProperties', 'adInfo', 'adMedia', 'adPlacementInfo',
            'adPlayerOverlayRenderer', 'adSequenceNumber', 'adSlots', 'adTag',
            'adTitle', 'adVideoId', 'adWrapper', 'adBreakTimeOffset', 'adChoices',
            'adClientParams', 'adDislikeCount', 'adDuration', 'adEndTime', 'adId',
            'adIndexInSlot', 'adLength', 'adMetadata', 'adNextRequestIndex',
            'adParameters', 'adPlacementsRenewed', 'adPodInfo', 'adPrefetchSeconds',
            'adRenderers', 'adRequestConfig', 'adSlot', 'adSlotMetadata',
            'adSlotWrapper', 'adSlotsRenewed', 'adSource', 'adStartTime',
            'adTagParameters', 'adType', 'adUnit', 'adWrapperList', 'adsTrackingParams',
            'associatedVideoAd', 'breakSlot', 'breakSlotWithPlayerAds', 'creatorsAd',
            'desktopPauseAndClickAd', 'dynamicVideoAdRenderer', 'externalLinkAd',
            'featureCardsAd', 'fillSlotCommands', 'fulfilledBreakingAd', 'hostOffsetAd',
            'instreamVideoAd', 'mastheadAd', 'midrollSlot', 'movingThumbnailAd',
            'overflowAutoplayAd', 'pauseAndClickAd', 'playerAdsAndBreakSlots',
            'playerLegacyDesktopWatchAds', 'playerLegacyWatchAds', 'podcastAd',
            'postrollSlot', 'premiumChoiceAd', 'programmaticVideoAd', 'repeatAfterSlot',
            'repeatSlot', 'rollSlot', 'searchPromotedSparklesWebRenderer',
            'showEngagementPanelEndpoint', 'slot', 'slotCallback', 'slotEntry',
            'slotFulfillment', 'slotInsertion', 'slotOpportunity', 'slotRenderers',
            'slotReplacement', 'slotRestriction', 'slotScheduling', 'slotSuppression',
            'slotWrapper', 'sponsoredButton', 'sponsoredHeading', 'streamingAd',
            'surveyAd', 'tadData', 'textAd', 'timedPiechartWatermarkRenderer',
            'trueViewInDisplayAd', 'trueViewInStreamAd', 'unifiedSurveyAd',
            'videoAd', 'videoAnnotationAd', 'videoEngagementPanelAd', 'videoWallAd',
            'voiceBasedAd', 'watermarkAd', 'yoodleAd'
        ];
        
        for (var i = 0; i < adFields.length; i++) {
            if (data.hasOwnProperty(adFields[i])) {
                delete data[adFields[i]];
                modified = true;
            }
        }
        
        // playerResponse 嵌套清理
        if (data.playerResponse && typeof data.playerResponse === 'object') {
            var prAdFields = [
                'playerAds', 'adPlacements', 'adBreakHeartbeatParams', 'playerAdParams',
                'videoAdKeyActions', 'adBreaks', 'adCuepoints', 'adSlotRenderer',
                'adIntroRenderer', 'adPlaceholders'
            ];
            for (var j = 0; j < prAdFields.length; j++) {
                if (data.playerResponse.hasOwnProperty(prAdFields[j])) {
                    delete data.playerResponse[prAdFields[j]];
                    modified = true;
                }
            }
        }
        
        // 清理顶层 adPlacements 数组
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
        $done({});
    }
})();
