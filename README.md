# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、远程 Rule Set 优先、可独立启停**。

## 架构

```
full-config.ini          # 主配置：仅 General / Proxy / Proxy Group / Rule / MITM(默认关闭)
modules/
  ├── mitm-enable.sgmodule       # MITM 开关
  ├── youtube-ultimate.sgmodule  # YouTube 完整增强（一模块搞定，推荐）
  ├── youtube-core.sgmodule      # YouTube 仅 Rewrite（最稳定，备用）
  ├── youtube-script.sgmodule    # YouTube Enhance（Maasea，备用）
  ├── dual-subs.sgmodule         # YouTube 双字幕（DualSubs 官方架构）
  ├── sponsorblock.sgmodule      # SponsorBlock 跳过赞助
  ├── tiktok-unlock.sgmodule     # TikTok 解锁+去广告
  ├── bilibiliads.sgmodule       # Bilibili 去广告
  ├── weiboads.sgmodule          # 微博去广告
  ├── amapads.sgmodule           # 高德去广告
  ├── xiaohongshu.sgmodule       # 小红书去广告去水印
  ├── zhihuads.sgmodule          # 知乎去广告
  ├── netease-music.sgmodule     # 网易云音乐去广告
  ├── smzdm.sgmodule             # 什么值得买去广告
  ├── jd.sgmodule                # 京东去广告/价格破解
  ├── pixiv.sgmodule             # Pixiv 去广告
  ├── ximalaya.sgmodule          # 喜马拉雅去广告
  ├── bank-ads.sgmodule          # 银行App去广告
  ├── spotify-unlock.sgmodule    # Spotify 解锁去广告
  ├── telegram-web.sgmodule      # Telegram Web 优化
  └── apple-wloc.sgmodule        # Apple 定位修改
```

## 推荐使用方式（YouTube）

| 模块 | 作用 | 推荐状态 |
|------|------|----------|
| `youtube-ultimate.sgmodule` | **一模块搞定**：Core Rewrite + Maasea Enhance + 广告拦截 | ✅ **推荐** |
| `mitm-enable.sgmodule` | 开启 HTTPS 解密 | 必须和 ultimate 一起开 |
| `dual-subs.sgmodule` | 双字幕增强 | 可选 |

**如果 Ultimate 模块导致播放器异常**：
- 降级为 `youtube-core.sgmodule`（仅 Rewrite，最稳定）
- 或 `youtube-script.sgmodule`（仅 Maasea Enhance，不含额外 Rewrite）

## 模块索引（共 22 个）

| 模块 | 导入链接 |
|------|----------|
| MITM 开关 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/mitm-enable.sgmodule` |
| YouTube Ultimate（推荐） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-ultimate.sgmodule` |
| YouTube Core（备用） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-core.sgmodule` |
| YouTube Script（备用） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-script.sgmodule` |
| DualSubs | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/dual-subs.sgmodule` |
| SponsorBlock | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/sponsorblock.sgmodule` |
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
7. **YouTube 一模块搞定** — 用 Ultimate 模块组合多个功能，减少冲突

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置 | YouTube/Google 可正常访问 |
| 2 | 开启 youtube-core | 广告统计/pagead 被拦截 |
| 3 | 开启 mitm-enable + youtube-ultimate | HTTPS 解密 + Enhance + 广告拦截 全部启用 |
| 4 | 如果播放器异常 | 降级为 youtube-core + youtube-script（分开加载） |
| 5 | 按需开启其他模块 | 对应 App 去广告生效 |

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。如需脚本去广告功能，请先开启 `mitm-enable.sgmodule`，然后在 Shadowrocket → MITM → 证书内自行生成并信任证书。
