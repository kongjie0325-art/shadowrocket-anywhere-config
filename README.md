# Shadowrocket 2026 顶级配置

基于 Shadowrocket 10 层架构设计的完整代理配置方案。

---

## 一、导入链接汇总

### 主配置（必须）

| 用途 | 链接 |
|---|---|
| ⭐ 主配置导入 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config.ini |

### 模块（按需添加，建议不超过 10 个）

| 模块 | 链接 |
|---|---|
| 🛡️ 通用广告拦截 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/ad-block.sgmodule |
| 📺 YouTube 去广告 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/youtubeads.sgmodule |
| 📹 Bilibili 去广告 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/bilibili-ad.sgmodule |
| 🎵 Spotify 去广告 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/spotify-ads.sgmodule |
| 🍎 Apple 增强 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/apple-enhance.sgmodule |
| 🔒 隐私保护 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/privacy.sgmodule |
| 🌐 DNS 优化 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/dns.sgmodule |
| ⚡ 网络检测 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/modules/network-test.sgmodule |

### 脚本（可选）

| 脚本 | 链接 |
|---|---|
| 🔍 网络检测脚本 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/scripts/network-check.sgmodule |
| 📱 App 增强脚本 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/scripts/app-enhance.sgmodule |
| ⏰ 自动任务脚本 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/scripts/auto.sgmodule |
| 🌍 TikTok 区域解锁 | https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/scripts/tiktok-region-unlock.srs |

### 源代码

| 项目 | 链接 |
|---|---|
| 📂 GitHub 仓库 | https://github.com/kongjie0325-art/shadowrocket-anywhere-config |
| 📄 使用指导 | https://github.com/kongjie0325-art/shadowrocket-anywhere-config/blob/master/USAGE.md |
| 📄 来源与许可 | https://github.com/kongjie0325-art/shadowrocket-anywhere-config/blob/master/ACKNOWLEDGMENTS.md |

---

## 二、文件结构

```
├── README.md ........................ 本文件（链接汇总）
├── ACKNOWLEDGMENTS.md ............... 来源与许可
├── USAGE.md ......................... 使用指导
├── full-config.ini .................. 主配置（导入此文件）
├── config/
│   ├── general.ini .................. [General] DNS/系统设置
│   ├── proxy-group.ini .............. [Proxy Group] 策略组（含DE/GB/NL）
│   └── mitm.ini ..................... [MITM] 解密域名
├── rules/ ........................... 分流规则模块
│   ├── adblock.ini .................. 广告拦截（关键词+域名+URL-REGEX）
│   ├── ai.ini ....................... AI 服务分流
│   ├── apple.ini .................... Apple 服务
│   ├── bilibili.ini ................. Bilibili
│   ├── china.ini .................... 国内直连
│   ├── developer.ini ................ 开发者工具
│   ├── finance.ini .................. 金融/下载/上传
│   ├── foreign.ini .................. 国外代理
│   ├── github.ini ................... GitHub
│   ├── google.ini ................... Google
│   ├── microsoft.ini ................ Microsoft
│   ├── social.ini ................... 社交（Meta/TikTok/Telegram/X）
│   ├── streaming.ini ................ 流媒体
│   └── final.ini .................... 兜底规则
├── modules/ ......................... Shadowrocket 模块
│   ├── ad-block.sgmodule ............ 通用广告拦截
│   ├── youtubeads.sgmodule .......... YouTube 去广告
│   ├── bilibili-ad.sgmodule ......... Bilibili 去广告
│   ├── spotify-ads.sgmodule ......... Spotify 去广告
│   ├── apple-enhance.sgmodule ....... Apple 增强
│   ├── privacy.sgmodule ............ 隐私保护
│   ├── dns.sgmodule ................. DNS 优化
│   └── network-test.sgmodule ........ 网络检测
└── scripts/ ......................... 脚本
    ├── network-check.sgmodule ....... 网络检测模块
    ├── ip-check.js .................. IP 检测脚本
    ├── dns-check.js ................. DNS 检测脚本
    ├── latency-check.js ............. 延迟检测脚本
    ├── app-enhance.sgmodule ......... App 增强模块
    ├── app-enhance.js ............... UA 伪装脚本
    ├── tracker-strip.js ............. 追踪参数移除
    ├── auto.sgmodule ................ 自动任务模块
    ├── auto-speed.js ................ 自动测速脚本
    ├── auto-geoip.js ................ GeoIP 自动更新
    └── tiktok-region-unlock.srs ...... TikTok 区域解锁
```

---

## 三、架构总览

```
订阅（节点）
        │
        ▼
策略组（香港、日本、新加坡、美国、德国、英国、荷兰、自动选择）
        │
        ▼
分流规则（Rule）
        │
  ┌─────┼──────────┐
  │     │          │
  ▼     ▼          ▼
DIRECT  PROXY    REJECT
  │     │          │
国内   国外      广告
```

### 分层架构

| 层级 | 功能 | 文件 |
|---|---|---|
| 第一层 | 分流规则 (Rule) | `rules/*.ini` |
| 第二层 | 模块 (Module) | `modules/*.sgmodule` |
| 第三层 | 脚本 (Script) | `scripts/*.srs + *.js` |
| 第四层 | MITM | `config/mitm.ini` |
| 第五层 | DNS | `config/general.ini` |
| 第六层 | 广告过滤 | `modules/ad-block.sgmodule` |
| 第七层 | 策略组 | `config/proxy-group.ini` |
| 第八层 | AI 分流 | `rules/ai.ini` |
| 第九层 | 流媒体 | `rules/streaming.ini` |
| 第十层 | 自动测速 | `scripts/auto.sgmodule` |

---

## 四、策略组架构

```
节点资源池
├── 节点-代理 (原有)
├── 节点-AI (原有)
├── 节点-流媒体 (原有，融入DE/GB/NL)
├── 节点-社交 (原有，融入DE/GB/NL)
├── 节点-工作 (原有，融入DE/GB/NL)
├── 节点-DE（新增） - 德国
├── 节点-GB（新增） - 英国
├── 节点-NL（新增） - 荷兰
├── 节点-欧洲（新增） - DE/GB/NL组合
└── 节点-综合（新增） - 全部节点组合

核心控制组
├── 代理 (主策略组)
├── 兜底分流 (Final未命中时)
└── 拦截 (REJECT)
```

---

## 五、快速使用

### 步骤 1：导入主配置

打开 Shadowrocket → 配置 → 右上角 `+` → 粘贴：

```
https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config.ini
```

### 步骤 2：添加订阅节点

Shadowrocket → 订阅 → 右上角 `+` → 添加你的订阅链接

### 步骤 3：导入模块（可选）

Shadowrocket → 底部「模块」→ 右上角 `+` → 按需粘贴模块链接

### 步骤 4：导入脚本（可选）

Shadowrocket → 底部「脚本」→ 右上角 `+` → 按需粘贴脚本链接

### 步骤 5：启用 MITM

TikTok / YouTube / Bilibili 去广告需要：

1. 确认主配置中 `[MITM] enable = true`
2. Shadowrocket → 设置 → 生成 CA 证书
3. iOS 设置 → 通用 → VPN与设备管理 → 信任证书
4. iOS 设置 → 通用 → 关于本机 → 证书信任设置 → 开启完全信任

### 步骤 6：开始代理

回到 Shadowrocket 主界面 → 选择策略组 → 开启代理

---

## 六、验证清单

| 验证项 | 验证方法 |
|---|---|
| DNS 解析 | 任意网站能否打开 |
| Telegram | 能否收发消息 |
| YouTube | 视频播放是否流畅（4K 码率） |
| TikTok | 能否刷到美区内容（美国热门） |
| AI 服务 | ChatGPT / Claude / Gemini 能否访问 |
| 广告拦截 | 浏览网页是否减少广告显示 |
| 模块生效 | 模块页面显示已启用 |

---

## 七、常见问题

**Q: 导入后节点名都空白？**
A: 订阅中的节点名与配置不匹配。打开订阅，确认节点名与配置中的名称一致（区分大小写）。

**Q: TikTok 区域解锁不生效？**
A: 检查三项：`[MITM] enable = true` + CA 证书已信任 + 解锁脚本已启用。

**Q: YouTube 4K 播放卡顿？**
A: 检查 `force-http-engine-hosts` 是否含 `googlevideo.com`（应已移除）。如仍卡顿，切换节点。

---

## 八、更新日志

### 2026-07-26 (最新)
- 新增 10 个脚本文件（网络检测/IP/延迟/App增强/自动任务）
- 新增 8 个模块（通用广告/YouTube/Bilibili/Spotify/Apple/隐私/DNS/网络检测）
- 新增德国/英国/荷兰独立节点组
- 原策略组全面融入 DE/GB/NL 节点
- 新增节点-欧洲、节点-综合组合组
- 广告拦截独立为 adblock.ini 模块
- 完善 README.md 链接汇总

### 2026-07-25
- 初始版本发布
- 基于 Anywhere-Hub 原始配置整理
- 修复 MITM/拦截/YouTube性能问题
- P0~P8 优先级规则分层
