// ip-check.js
// 获取并显示出口 IP 信息

const url = "https://api.ipify.org?format=json";

$httpClient.get(url, (error, response, data) => {
    if (error) {
        $notification.post("IP 检测失败", error, "");
    } else {
        try {
            const ip = JSON.parse(data).ip;
            $notification.post("出口 IP", ip, "");
        } catch (e) {
            $notification.post("IP 解析失败", data, "");
        }
    }
    $done();
});
