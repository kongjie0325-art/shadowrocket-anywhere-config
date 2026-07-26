# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、远程 Rule Set 优先、可独立启停**。

## 架构

```
full-config.ini          # 主配置：仅 General / Proxy / Proxy Group / Rule / MITM(默认关闭)
                             不再硬编码业务脚本和 MITM 细节，全部由独立模块处理。
modules/
  ├── mitm-enable.sgmodule     # MITM 开关（只负责开启 HTTPS 解密）
  ├── youtube-core.sgmodule    # YouTube 基础广告拦截（仅 Rewrite，稳定，永久开启）
  ├── youtube-mitm.sgmodule    # YouTube HTTPS 解密（按需开启，范围最小）
  ├── youtube-script.sgmodule  # YouTube 高级去广告（实验性，2026新版脚本）
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

## YouTube 模块拆分（2026 增强版）

YouTube 模块拆分为三层，独立开关，互不影响：

| 模块 | 层级 | 作用 | 推荐状态 |
|------|------|------|----------|
| `youtube-core.sgmodule` | 稳定层 | 仅 Rewrite（pagead/ptracking/ads），不带 Script | 永久开启 |
| `youtube-mitm.sgmodule` | 按需层 | MITM 仅解密 `youtubei.googleapis.com` + `s.youtube.com` | 需要 Script 时开启 |
| `youtube-script.sgmodule` | 实验层 | 新版 Script（处理 browse/next/player） | 找到稳定脚本后开启 |

**设计思路**：Rewrite 为主、Script 为辅。如果新版 Script 导致播放器异常，关闭 Script 模块即可恢复，不影响 Core 层广告拦截。

## 模块索引

| 模块 | 导入链接 |
|------|----------|
| MITM 开关 | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/mitm-enable.sgmodule` |
| YouTube Core（Rewrite） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-core.sgmodule` |
| YouTube MITM | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-mitm.sgmodule` |
| YouTube Script（实验） | `https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtube-script.sgmodule` |
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
7. **Rewrite 优先** — YouTube 去广告优先用 URL Rewrite，Script 作为实验性补充

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。如需脚本去广告功能，请先开启 `mitm-enable.sgmodule`，然后在 Shadowrocket → MITM → 证书内自行生成并信任证书。

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置 | YouTube 可打开 |
| 2 | 开启 youtube-core | 广告统计被拦截，播放器正常 |
| 3 | 开启 mitm-enable + youtube-mitm | HTTPS 解密启用 |
| 4 | 开启 youtube-script（可选） | 广告进一步减少；如播放器异常则关闭此模块 |
