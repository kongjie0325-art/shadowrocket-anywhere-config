# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、远程 Rule Set 优先、可独立启停**。

## 架构

```
full-config.ini          # 主配置：仅 General / Proxy / Proxy Group / Rule / MITM(默认关闭)
modules/
  ├── mitm-enable.sgmodule     # MITM 开关
  ├── YouTube (5 modules)       # YouTube 三层 + SponsorBlock + DualSubs
  ├── TikTok.sgmodule
  ├── Bilibili.sgmodule
  ├── 广告拦截 (微博/知乎/小红书/高德/网易云/什么值得买/京东/Pixiv/喜马拉雅/银行)
  ├── 功能模块 (Spotify/Telegram/Apple WLOC)
```

## YouTube 模块拆分（2026 增强版）

基于 Maasea `YouTube.Enhance.sgmodule` 改造为三层：

| 模块 | 层级 | 作用 | 推荐状态 |
|------|------|------|----------|
| `youtube-core.sgmodule` | 稳定层 | 仅 Rewrite（pagead/ptracking/ads/stats） | 永久开启 |
| `youtube-mitm.sgmodule` | 按需层 | MITM 精简为 `youtubei.googleapis.com` + `s.youtube.com` | 仅 Script 需要时 |
| `youtube-script.sgmodule` | 实验层 | Maasea request/response 脚本 | 稳定后推荐 |
| `sponsorblock.sgmodule` | 可选 | 跳过视频片头/赞助/自我推广 | 按需开启 |
| `dual-subs.sgmodule` | 可选 | 双字幕/翻译字幕 | 按需开启 |

## 模块索引（共 21 个）

| 模块 | 导入链接 |
|------|----------|
| MITM 开关 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/mitm-enable.sgmodule` |
| YouTube Core | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-core.sgmodule` |
| YouTube MITM | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-mitm.sgmodule` |
| YouTube Script | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-script.sgmodule` |
| SponsorBlock | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/sponsorblock.sgmodule` |
| DualSubs | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/dual-subs.sgmodule` |
| TikTok 解锁+去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/tiktok-unlock.sgmodule` |
| Bilibili 去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/bilibiliads.sgmodule` |
| 微博去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/weiboads.sgmodule` |
| 知乎去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/zhihuads.sgmodule` |
| 小红书去广告去水印 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/xiaohongshu.sgmodule` |
| 高德去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/amapads.sgmodule` |
| 网易云音乐去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/netease-music.sgmodule` |
| 什么值得买去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/smzdm.sgmodule` |
| 京东去广告/价格破解 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/jd.sgmodule` |
| Pixiv 去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/pixiv.sgmodule` |
| 喜马拉雅去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/ximalaya.sgmodule` |
| 银行App去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/bank-ads.sgmodule` |
| Spotify 解锁去广告 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/spotify-unlock.sgmodule` |
| Telegram Web 优化 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/telegram-web.sgmodule` |
| Apple 定位修改 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/apple-wloc.sgmodule` |

## 设计原则

1. **主配置不动** — 只负责通用分流，业务模块独立维护
2. **MITM 最小化** — 仅对需要修改响应的域名做 MITM
3. **去 DOMAIN-KEYWORD** — 不使用全局关键词拦截
4. **不硬编码私钥** — `ca-p12`/`ca-passphrase` 已移除
5. **避免通配脚本** — 仅对白名单域名启用 http-response 脚本
6. **优先 RULE-SET** — 用 BlackMatrix7 远程规则集替代手工域名列表
7. **Rewrite 优先，Script 为辅** — YouTube 去广告优先用 URL Rewrite

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置 | YouTube/Google 可正常访问 |
| 2 | 开启 youtube-core | 广告统计/pagead 被拦截 |
| 3 | 开启 mitm-enable + youtube-mitm | HTTPS 解密启用 |
| 4 | 开启 youtube-script | UI 增强 + 部分广告过滤 |
| 5 | 开启 sponsorblock/dual-subs | 跳过赞助/双字幕 |
| 6 | 按需开启广告拦截模块 | 对应 App 去广告生效 |

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。如需脚本去广告功能，请先开启 `mitm-enable.sgmodule`，然后在 Shadowrocket → MITM → 证书内自行生成并信任证书。
