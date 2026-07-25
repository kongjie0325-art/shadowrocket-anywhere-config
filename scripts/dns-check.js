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
    $httpClient.get(`https://${domain}`, (error, response, data) => {
        const latency = Date.now() - start;
        results.push({
            domain: domain,
            latency: latency,
            error: error ? error.message : null,
            status: response ? response.status : null
        });
        completed++;

        if (completed === domains.length) {
            let msg = "";
            results.forEach(r => {
                const status = r.error ? "❌" : `✅ ${r.latency}ms`;
                msg += `${r.domain}: ${status}\n`;
            });

            // 找出最快和最慢
            const ok = results.filter(r => !r.error).sort((a, b) => a.latency - b.latency);
            if (ok.length > 0) {
                msg += `\n最快: ${ok[0].domain} (${ok[0].latency}ms)`;
                if (ok.length > 1) msg += `\n最慢: ${ok[ok.length-1].domain} (${ok[ok.length-1].latency}ms)`;
            }

            $notification.post("DNS 检测结果", msg, "");
        }
        $done();
    });
});
