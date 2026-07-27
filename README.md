# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、远程 Rule Set 优先、可独立启停**。

## 架构

```
full-config.ini          # 主配置：仅 General / Proxy / Proxy Group / Rule / MITM(默认关闭)
                             不再硬编码业务脚本和 MITM 细节，全部由独立模块处理。
modules/
  ├── mitm-enable.sgmodule     # MITM 开关（只负责开启 HTTPS 解密）
  ├── youtube-core.sgmodule    # YouTube 基础广告拦截（仅 Rewrite，稳定，永久开启）
  ├── youtube-mitm.sgmodule    # YouTube MITM 最小 hostname（按需开启）
  ├── youtube-script.sgmodule  # YouTube 增强（基于 Maasea，含 request/response，实验性）
  ├── sponsorblock.sgmodule    # 跳过视频片头/赞助/自我推广（可选）
  ├── dual-subs.sgmodule       # 双字幕/翻译字幕增强（可选）
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
  └── upstream/                # 上游 .amrs/.arrs 备份（anywhere-rules）
```

## 使用方式

**主配置不开启 MITM。** 如需去广告：
1. 开启 `mitm-enable.sgmodule`
2. 再按需开启对应业务模块

模块内用 `%APPEND%` 追加 MITM hostname，互不覆盖。

## YouTube 模块拆分（2026 增强版）

基于 Maasea 上游 `YouTube.Enhance.sgmodule` 改造为三层，独立开关：

| 模块 | 层级 | 作用 | 推荐状态 |
|------|------|------|----------|
| `youtube-core.sgmodule` | 稳定层 | 仅 Rewrite（pagead/ptracking/ads/stats），不带 Script | 永久开启 |
| `youtube-mitm.sgmodule` | 按需层 | MITM 精简为 `youtubei.googleapis.com` + `s.youtube.com` | 仅 Script 层需要时开启 |
| `youtube-script.sgmodule` | 实验层 | 基于 Maasea 的 request/response 脚本 + `*.googlevideo.com` MITM | 稳定后推荐开启 |
| `sponsorblock.sgmodule` | 可选 | 跳过视频片头/赞助/自我推广（基于 SponsorBlock API） | 按需开启 |
| `dual-subs.sgmodule` | 可选 | 双字幕/翻译字幕增强（基于 Maasea 架构） | 按需开启 |

**设计思路**：
- Core 层负责最稳定的广告入口拦截；
- Script 层只做兼容性增强和 UI 优化，不暴力删字段；
- SponsorBlock 跳过视频内嵌片段（非官方广告）；
- DualSubs 增强字幕体验；
- 若新版 YouTube 更新导致 Script 异常，关闭 `youtube-script` 即可恢复播放，Core 层依然拦截 pagead/ptracking。

## 模块索引

| 模块 | 导入链接 |
|------|----------|
| MITM 开关 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/mitm-enable.sgmodule` |
| YouTube Core（Rewrite） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-core.sgmodule` |
| YouTube MITM | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-mitm.sgmodule` |
| YouTube Script（Maasea） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-script.sgmodule` |
| SponsorBlock | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/sponsorblock.sgmodule` |
| DualSubs（双字幕） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/dual-subs.sgmodule` |
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
2. **MITM 最小化** — 仅对需要修改响应的域名做 MITM
3. **去 DOMAIN-KEYWORD** — 不使用全局关键词拦截
4. **不硬编码私钥** — `ca-p12`/`ca-passphrase` 已移除，由 Shadowrocket 本地生成
5. **避免通配脚本** — 仅对白名单域名启用 http-response 脚本
6. **优先 RULE-SET** — 用 BlackMatrix7 远程规则集替代手工域名列表
7. **Rewrite 优先，Script 为辅** — YouTube 去广告优先用 URL Rewrite，Script 做兼容性增强

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。如需脚本去广告功能，请先开启 `mitm-enable.sgmodule`，然后在 Shadowrocket → MITM → 证书内自行生成并信任证书。

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置 | YouTube 可打开 |
| 2 | 开启 youtube-core | 广告统计/pagead/ptracking 被拦截，播放器正常 |
| 3 | 开启 mitm-enable + youtube-mitm | HTTPS 解密启用 |
| 4 | 开启 youtube-script | UI 增强 + 部分广告过滤；如播放器异常则关闭此模块 |
| 5 | 开启 sponsorblock / dual-subs | 跳过赞助片段 / 双字幕生效 |
| 6 | 按需开启其他模块 | 对应 App 去广告生效 |
