// auto-geoip.js
// 自动更新 GeoIP 数据库

const geoipUrl = "https://cdn.jsdelivr.net/gh/Loyalsoldier/geoip@release/GeoLite2-Country.mmdb";

$httpClient.head(geoipUrl, (error, response, data) => {
    if (!error && response) {
        const lastModified = response.headers["Last-Modified"];
        if (lastModified) {
            console.log(`[GeoIP] Last-Modified: ${lastModified}`);
        }
    }
    $done();
});
