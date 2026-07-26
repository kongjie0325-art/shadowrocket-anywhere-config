# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、远程 Rule Set 优先、可独立启停**。

## 架构

```
full-config.ini          # 主配置：仅 General / Proxy / Proxy Group / Rule / MITM(默认关闭)
                             不再硬编码业务脚本和 MITM 细节，全部由独立模块处理。
modules/
  ├── mitm-enable.sgmodule     # MITM 开关（只负责开启 HTTPS 解密）
  ├── youtubeads.sgmodule      # YouTube 广告（URL Rewrite + Script + MITM hostname）
  ├── tiktok-unlock.sgmodule   # TikTok 区域解锁 + 广告/直播屏蔽
  ├── bilibiliads.sgmodule     # Bilibili 去广告
  ├── weiboads.sgmodule        # 微博去广告
  ├── amapads.sgmodule         # 高德地图去广告
  ├── xiaohongshu.sgmodule     # 小红书去广告去水印
  ├── zhihuads.sgmodule        # 知乎去广告
  ├── netease-music.sgmodule   # 网易云音乐去广告
  ├── smzdm.sgmodule           # 什么值得买去广告
  ├── spotify-unlock.sgmodule  # Spotify 解锁去广告
  ├── telegram-web.sgmodule    # Telegram Web 优化
rules/
  ├── upstream/                # 上游 .amrs/.arrs 备份（anywhere-rules）
```

## 使用方式

**主配置不开启 MITM。** 如需去广告：
1. 开启 `mitm-enable.sgmodule`
2. 再按需开启对应业务模块

模块内用 `%APPEND%` 追加 MITM hostname，互不覆盖。

## 模块索引

| 模块 | 导入链接 |
|------|----------|
| MITM 开关 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/mitm-enable.sgmodule` |
| YouTube 去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtubeads.sgmodule` |
| TikTok 解锁+去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/tiktok-unlock.sgmodule` |
| Bilibili 去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/bilibiliads.sgmodule` |
| 微博去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/weiboads.sgmodule` |
| 高德去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/amapads.sgmodule` |
| 小红书去广告去水印 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/xiaohongshu.sgmodule` |
| 知乎去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/zhihuads.sgmodule` |
| 网易云音乐去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/netease-music.sgmodule` |
| 什么值得买去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/smzdm.sgmodule` |
| Spotify 解锁去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/spotify-unlock.sgmodule` |
| Telegram Web 优化 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/telegram-web.sgmodule` |

## 设计原则

1. **主配置不动** — 只负责通用分流，业务模块独立维护
2. **MITM 最小化** — 仅对需要修改响应的域名做 MITM，不 MITM Google/YouTube/Spotify 播放域名
3. **去 DOMAIN-KEYWORD** — 不使用全局关键词拦截，避免误杀正常 API
4. **不硬编码私钥** — `ca-p12`/`ca-passphrase` 已移除，由 Shadowrocket 本地生成
5. **避免通配脚本** — 仅对白名单域名启用 http-response 脚本
6. **优先 RULE-SET** — 用 BlackMatrix7 远程规则集替代手工域名列表

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。如需脚本去广告功能，请先开启 `mitm-enable.sgmodule`，然后在 Shadowrocket → MITM → 证书内自行生成并信任证书。

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置 | YouTube 可打开 |
| 2 | 开启 mitm-enable + youtubeads | YouTube 广告减少 |
| 3 | 按需开启其他模块 | 对应 App 去广告生效 |
