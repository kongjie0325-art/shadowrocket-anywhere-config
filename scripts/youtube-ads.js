// youtube-ads.js
// YouTube 去广告脚本 - http-response 模式
// 删除 playerAds/adPlacements 等字段，减少视频前贴片/中插广告

const url = $request.url;

// 仅对 YouTube API 生效
if (!url || !url.includes("youtubei.googleapis.com")) {
    $done({});
    return;
}

// 必须有响应体
if (!$response.body) {
    $done({});
    return;
}

try {
    let data = JSON.parse($response.body);
    let modified = false;

    // === 明确删除的广告字段列表 ===
    const adFields = [
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
        'playerMe MauiAds',
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
        'yoodleAd',
        'AdBreak',
        'AdPlacement',
        'AdSlot',
        'MidrollSlot',
        'PostrollSlot',
        'PrerollSlot',
    ];

    // 删除顶层广告字段
    adFields.forEach(field => {
        if (data[field] !== undefined) {
            delete data[field];
            modified = true;
        }
    });

    // 如果有 playerResponse 嵌套，也清理其中的广告
    if (data.playerResponse && typeof data.playerResponse === 'object') {
        adFields.forEach(field => {
            if (data.playerResponse[field] !== undefined) {
                delete data.playerResponse[field];
                modified = true;
            }
        });
    }

    // 如果有 adPlacements 数组（旧版）
    if (data.adPlacements && Array.isArray(data.adPlacements)) {
        data.adPlacements = [];
        modified = true;
    }

    // 不修改 streamingData / formats / adaptiveFormats / videoDetails
    // 不修改 playbackTracking / playerConfig / playerResponse 中的播放相关字段

    if (modified) {
        $done({body: JSON.stringify(data)});
    } else {
        $done({});
    }
} catch (e) {
    // 解析失败保持原样
    $done({});
}
