// latency-check.js
// 节点延迟测试（通过 generate_204 测试）

$httpClient.get("http://www.gstatic.com/generate_204", (error, response, data) => {
    if (error) {
        $notification.post("延迟测试", "连接失败", error);
    } else {
        const latency = response ? response.latency : "未知";
        const status = response ? response.status : "N/A";
        $notification.post("节点延迟", `延迟: ${latency || "N/A"}`, `状态: ${status}`);
    }
    $done();
});
