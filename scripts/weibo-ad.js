// weibo-ad.js
// 微博去广告脚本

const url = $request.url;
let modified = false;

// 移除广告追踪参数
if (url) {
    const adParams = ['ad', 'ads', 'adid', 'advertising', 'buvid', 'spm_id', 'from_spmid', 'session_id'];
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

// 移除微博开屏广告
if (url && url.includes("splash")) {
    $done({response: {status: 204}});
    return;
}

$done({response: $response});
