// dns-check.js
// 测试 DNS 解析延迟

const domains = [
    "www.google.com",
    "www.baidu.com",
    "www.github.com",
    "api.telegram.org"
];

const results = [];
let completed = 0;

domains.forEach(domain => {
    const start = Date.now();
    $httpClient.get(`https://1.1.1.1/dns-query?name=${domain}&type=A`, {
        headers: {
            "Accept": "application/dns-json"
        }
    }, (error, response, data) => {
        const elapsed = Date.now() - start;
        const status = error ? "失败" : `${elapsed}ms`;
        results.push(`${domain}: ${status}`);
        completed++;
        
        if (completed === domains.length) {
            $notification.post(
                "DNS 解析测试",
                results.join("\n"),
                `完成 ${domains.length} 个域名测试`
            );
            $done();
        }
    });
});

// 超时处理
setTimeout(() => {
    $notification.post("DNS 测试", results.join("\n") || "超时", "");
    $done();
}, 10000);
