// telegram-web.js
// Telegram Web 广告/频道推荐过滤
// http-response, pattern=web.telegram.org

(function() {
    'use strict';
    
    if (!$response || !$response.body) {
        $done({});
        return;
    }
    
    var body = $response.body;
    
    // Skip non-JSON responses
    if (body[0] !== '{' && body[0] !== '<') {
        $done({});
        return;
    }
    
    // For HTML: remove ad-related scripts
    if (body[0] === '<') {
        body = body.replace(/<script[^>]*ads[^>]*>[\s\S]*?<\/script>/gi, '');
        body = body.replace(/<script[^>]*analytics[^>]*>[\s\S]*?<\/script>/gi, '');
        $done({ body: body });
        return;
    }
    
    // For JSON: clean messages
    try {
        var data = JSON.parse(body);
        var modified = false;
        
        if (data.messages && Array.isArray(data.messages)) {
            data.messages = data.messages.filter(function(m) {
                return !(m._ === 'messageActionContactSignUp' || m._ === 'messageActionChatAddUser');
            });
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
