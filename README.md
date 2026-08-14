# Shadowrocket Anywhere Config

生产级 Shadowrocket 配置，五层架构，规则按 Shadowrocket 顺序匹配。

## 架构

```text
L1 Node Pools → L2 Exit Policies → L3 Application Policies → L4 Rules → FINAL
```

## 当前生产配置

主配置：

```text
full-config-prod-v10.ini
```

导入链接：

```text
https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config-prod-v10.ini
```

## 规则顺序

```text
P0  LAN / Private IPv4/IPv6
P1  DNS / Speedtest
P2  AI
P3  YouTube
P4  Google
P5  Streaming
P6  Gaming
P7  Social
P8  Developer / Work
P9  Microsoft
P10 Apple CN / Proxy / General
P11 Finance
P12 Download
P13 Bilibili
P14 WeChat
P15 Ad Block
P16 China Direct / GEOIP CN
P17 GFW / ProxyGFW
FINAL GENERAL-EXIT
```

## 关键路由

```text
youtube.com           → YOUTUBE-EXIT → YOUTUBE-CLOUDNIUM → CLOUDNIUM-CDN
googlevideo.com       → YOUTUBE-EXIT → YOUTUBE-CLOUDNIUM → CLOUDNIUM-CDN
api.openai.com        → AI-EXIT
bilibili.com          → DIRECT
apple.com.cn          → DIRECT
WeChat                → DIRECT
GFW                   → PROXY
FINAL                 → GENERAL-EXIT
```

## 仓库目录

```text
full-config-prod-v10.ini    生产配置
rules/surge/                Surge/Shadowrocket 兼容规则集
scripts/                    MITM 脚本资源
archive/legacy_versions/    历史配置归档
README.md                   本说明
AUDIT-v10.txt               v10 审计报告
```

## 注意事项

- `use=true` 需要 Shadowrocket 中已有对应订阅源。
- 默认订阅源名称假设为 `VMRACK`、`CLOUDNIUM`、`ORACLE-ARM`。
- 若你的订阅源名称不同，请同步修改 Proxy Group 中的订阅名。
- `force-http-engine-hosts` 只保留 YouTube 相关 host。
- 生产配置默认关闭 MITM：`enable = false`。
