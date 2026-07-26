// github-helper.js
// GitHub 相关辅助脚本：curl 优化、raw 加速、镜像适配
// 兼容 Shadowrocket ES5

(function() {
    'use strict';
    
    var url = $request.url;
    var method = $request.method;
    
    if (!url) { $done({}); return; }
    
    // 仅处理 GitHub 相关请求
    if (url.indexOf('github.com') === -1 && url.indexOf('githubusercontent.com') === -1) {
        $done({});
        return;
    }
    
    // 为 raw.githubusercontent.com 添加缓存头，避免重复下载
    if (url.indexOf('raw.githubusercontent.com') !== -1 && method === 'GET') {
        // 不修改响应体，仅添加缓存策略
        // Shadowrocket 的 http-request 脚本不能直接修改响应，
        // 这里仅作为占位脚本，用于日志或未来扩展
        $done({});
        return;
    }
    
    $done({});
})();
