// ip-check.js
// 获取并显示出口 IP 信息

const url = "https://api.ipify.org?format=json";

$httpClient.get(url, (error, response, data) => {
    if (error) {
        $notification.post("IP 检测失败", error, "");
        $done();
        return;
    }
    
    try {
        const json = JSON.parse(data);
        const ip = json.ip;
        
        // 获取 IP 详情
        $httpClient.get(`https://ipapi.co/${ip}/json/`, (err, res, detailData) => {
            if (!err) {
                const detail = JSON.parse(detailData);
                const city = detail.city || "未知";
                const region = detail.region || "未知";
                const country = detail.country_name || "未知";
                const org = detail.org || "未知";
                
                $notification.post(
                    "出口 IP 信息",
                    `IP: ${ip}\n地区: ${country} / ${region} / ${city}\nISP: ${org}`,
                    ip
                );
            } else {
                $notification.post("出口 IP", `IP: ${ip}`, ip);
            }
            $done();
        });
    } catch (e) {
        $notification.post("IP 检测失败", "解析响应失败", "");
        $done();
    }
});
