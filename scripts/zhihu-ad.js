// zhihu-ad.js
// 知乎去广告脚本 - 开屏广告 + API 清理

const url = $request.url;

// 知乎开屏广告 - 直接返回 204 阻止广告展示
if (url) {
    // 匹配知乎开屏广告常见 URL 模式
    if (url.includes("splash") || 
        url.includes("start-screen") ||
        url.includes("open-screen") ||
        url.includes("launch-ad") ||
        url.match(/\/ads?\/splash|\/ad\/|\/promo\//)) {
        $done({response: {status: 204}});
        return;
    }
}

// 移除广告追踪参数
if (url) {
    const adParams = ['ad', 'ads', 'adid', 'advertising', 'buvid', 'spm_id', 'from_spmid'];
    let newUrl = url;
    let modified = false;
    
    adParams.forEach(param => {
        const regex = new RegExp(`[?&]${param}=[^&]*`, 'gi');
        if (regex.test(newUrl)) {
            newUrl = newUrl.replace(regex, '').replace(/[?&]$/, '');
            modified = true;
        }
    });
    
    if (modified) {
        $request.url = newUrl;
    }
}

// 移除 JSON 中的广告内容
if ($response.body && typeof $response.body === 'string') {
    try {
        let data = JSON.parse($response.body);
        
        // 移除推广内容
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(item => {
                return !item.type || 
                       item.type !== 'ad' && 
                       item.type !== 'promotion' &&
                       item.type !== 'advert';
            });
        }
        
        // 移除推广 banner
        if (data.result && data.result.banner) {
            delete data.result.banner;
        }
        
        // 移除推广卡片
        if (data.data && data.data.promote) {
            delete data.data.promote;
        }
        
        $response.body = JSON.stringify(data);
    } catch (e) {
        // 忽略解析错误
    }
}

$done({response: $response});
