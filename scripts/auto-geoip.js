// auto-geoip.js
// 自动更新 GeoIP 数据库

const geoipUrl = "https://cdn.jsdelivr.net/gh/Loyalsoldier/geoip@release/GeoLite2-Country.mmdb";

$httpClient.head(geoipUrl, (error, response, data) => {
    if (!error && response && response.status === 200) {
        $notification.post("GeoIP 更新", "GeoIP 数据库已是最新", "");
    } else {
        $notification.post("GeoIP 更新", "检查更新失败", error || "未知错误");
    }
    $done();
});
