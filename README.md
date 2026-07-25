# Shadowrocket 2026 顶级配置

基于 Shadowrocket 10 层架构设计的完整配置方案：
Rule → Module → Script → MITM → DNS → AdBlock → Policy Group → AI分流 → Streaming → Auto Test

## 目录结构

```
├── README.md - 项目说明
├── ACKNOWLEDGMENTS.md - 来源与许可
├── USAGE.md - 使用指导
├── full-config.ini - Shadowrocket 单文件导入
├── config/
│   ├── general.ini - [General] DNS/系统/MITM基础设置
│   ├── proxy-group.ini - [Proxy Group] 策略组定义（含DE/GB/NL）
│   └── mitm.ini - [MITM] 解密域名
├── rules/ - 分流规则（按优先级排序）
│   ├── adblock.ini - 广告拦截 + URL Rewrite
│   ├── apple.ini - Apple 服务
│   ├── ai.ini - AI 服务（OpenAI/Claude/Gemini/Grok/DeepSeek等）
│   ├── telegram.ini - Telegram
│   ├── google.ini - Google
│   ├── github.ini - GitHub/GitLab
│   ├── microsoft.ini - Microsoft/Office/Azure
│   ├── streaming.ini - YouTube/Netflix/Spotify/Disney+
│   ├── developer.ini - 开发者工具（Docker/K8s/Cloudflare等）
│   ├── social.ini - Meta/TikTok/X/Discord/Reddit
│   ├── finance.ini - 金融支付/下载/上传
│   ├── china.ini - 国内直连
│   ├── foreign.ini - 国外代理
│   └── final.ini - Final/GEOIP兜底
├── modules/ - Shadowrocket Module（.sgmodule）
│   ├── ad-block.sgmodule - 通用去广告模块
│   ├── youtubeads.sgmodule - YouTube 专用去广告
│   ├── bilibili-ad.sgmodule - Bilibili 去广告
│   ├── spotify-ads.sgmodule - Spotify 去广告
│   ├── apple-enhance.sgmodule - Apple 服务增强
│   ├── privacy.sgmodule - 隐私保护模块
│   └── dns.sgmodule - DNS 模块
├── scripts/ - 脚本
│   ├── network-test.sgmodule - 网络检测/IP/延迟/自动测试
│   ├── app-enhance.sgmodule - App增强脚本
│   └── auto.sgmodule - 自动任务（签到/Cookie更新等）
└── assets/ - 资源文件
    └── CHANGELOG.md - 更新日志
```

## 快速开始

### 导入方式

1. 复制 `full-config.ini` 的远程 URL
2. Shadowrocket → 配置 → 右上角 `+` → 粘贴 URL 导入
3. 或使用 iCloud Drive / 文件 App 本地导入

### 推荐模块

按需加载，建议不超过 10 个：

| 模块 | 用途 |
|---|---|
| ad-block | 通用广告拦截 |
| youtubeads | YouTube 去广告 |
| bilibili-ad | Bilibili 去广告 |
| spotify-ads | Spotify 去广告 |
| apple-enhance | Apple 服务加速 |
| privacy | 隐私保护 |
| dns | DNS 优化 |
| network-test | 网络检测 |

### 使用指南

详见 [USAGE.md](USAGE.md)

## 特性

- ✅ 10 层架构完整覆盖
- ✅ 模块化设计，可按需加载
- ✅ 广告拦截（DNS + URL Rewrite + JS）
- ✅ MITM 支持，HTTPS 广告可拦截
- ✅ AI 单独分流（OpenAI/Claude/Gemini等）
- ✅ 流媒体优化（YouTube/Netflix/Spotify）
- ✅ 自动测速切换
- ✅ 隐私保护
- ✅ 国内国外智能分流
- ✅ **新增德国/英国/荷兰独立节点组**

## 节点组架构

```
节点资源池
├── 节点-代理 (原有)
├── 节点-AI (原有)
├── 节点-流媒体 (原有，融入DE/GB/NL)
├── 节点-社交 (原有，融入DE/GB/NL)
├── 节点-工作 (原有，融入DE/GB/NL)
├── 节点-DE (新增) - 德国
├── 节点-GB (新增) - 英国
├── 节点-NL (新增) - 荷兰
├── 节点-欧洲 (新增) - DE/GB/NL组合
└── 节点-综合 (新增) - 全部节点组合
```

## 更新日志

### 2026-07-26
- 新增德国/英国/荷兰独立节点组
- 原策略组全面融入 DE/GB/NL 节点
- 新增 节点-欧洲、节点-综合 组合组
- 更新 MITM hostname 列表
