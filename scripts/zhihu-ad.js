// zhihu-ad.js
// 知乎去广告脚本

const url = $request.url;
let modified = false;

// 移除广告追踪参数
if (url) {
    const adParams = ['ad', 'ads', 'adid', 'advertising', 'buvid', 'spm_id', 'from_spmid'];
    let newUrl = url;
    
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

// 移除知乎开屏广告
if (url && url.includes("splash")) {
    $done({response: {status: 204}});
    return;
}

// 移除推广内容
if ($response.body && typeof $response.body === 'string') {
    try {
        let data = JSON.parse($response.body);
        
        // 移除推广
        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.filter(item => {
                return !item.type || item.type !== 'ad';
            });
        }
        
        $response.body = JSON.stringify(data);
    } catch (e) {
        // 忽略解析错误
    }
}

$done({response: $response});
