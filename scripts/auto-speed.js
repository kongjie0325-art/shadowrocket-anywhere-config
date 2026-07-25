// auto-speed.js
// 自动测速脚本

$httpClient.get("http://www.gstatic.com/generate_204", (error, response, data) => {
    if (!error) {
        const latency = response ? response.latency : "未知";
        console.log(`[Auto-Speed] Latency: ${latency}`);
    }
    $done();
});
