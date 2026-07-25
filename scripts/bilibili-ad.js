// bilibili-ad.js
// Bilibili 去广告脚本

const url = $request.url;
const headers = $request.headers;
let modified = false;

// 移除广告追踪参数
if (url) {
    const adParams = ['ad', 'ads', 'adid', 'advertising', 'buvid', 'buvid3', 'buvid4', 'fp', 'from', 'spm_id', 'from_spmid', 'session_id'];
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

// 移除广告 JSON 字段
if (headers["Content-Type"] && headers["Content-Type"].includes("application/json")) {
    try {
        let body = $response.body;
        if (body && typeof body === 'string') {
            let data = JSON.parse(body);
            
            // 移除广告卡片
            if (data.data && Array.isArray(data.data)) {
                data.data = data.data.filter(item => {
                    return !item.ad || item.type !== 'ad';
                });
            }
            
            // 移除 banner
            if (data.result && data.result.banner) {
                delete data.result.banner;
            }
            
            // 移除推广内容
            if (data.data && data.data.promote) {
                delete data.data.promote;
            }
            
            $response.body = JSON.stringify(data);
        }
    } catch (e) {
        // 忽略解析错误
    }
}

$done({response: $response});
