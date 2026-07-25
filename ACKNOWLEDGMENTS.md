# 来源与许可

本仓库基于以下外部资源整理而成，保留原始出处链接。

## 主配置来源

| 项目 | 链接 |
|---|---|
| **Anywhere-Hub** (原始配置源) | https://anywhere-hub.chikacya.indevs.in |
| **Shadowrocket 官方配置格式** | https://github.com/Shadowrocket/Shadowrocket/wiki/Configuration |

## 规则集来源

| 规则集 | 链接 |
|---|---|
| **Loyalsoldier 基础拦截** | https://github.com/Loyalsoldier/surge-rules |
| **AWAvenue 秋风广告规则** (TG-Twilight) | https://github.com/TG-Twilight/AWAvenue-Ads-Rule |
| **ACL4SSR 通用规则** | https://github.com/ACL4SSR/ACL4SSR |
| **fengzhiguyin 去广告脚本** | https://github.com/fengzhiguyin/adblock-scripts |

## MITM 证书与脚本

| 项目 | 说明 |
|---|---|
| **CA 证书密码** | `88YHhW0Z` |
| **MITM 用途** | TikTok / YouTube / Bilibili / 知乎 / 微博 / Spotify 去广告 |
| **TikTok 解锁脚本** | 来自 Shadowrocket 社区共享 |

## 模块与脚本来源

| 类型 | 来源 |
|---|---|
| 广告拦截模块 | 基于 Loyalsoldier / AWAvenue / adblock-scripts 整合 |
| 网络检测脚本 | 自研，基于公开 IP/DNS 检测接口 |
| App 增强脚本 | 基于社区通用 UA 伪装 + 追踪参数清理方案 |
| 自动任务脚本 | 基于 Cron + generate_204 / GeoIP 更新方案 |

## 代理节点与分组

| 分组 | 节点列表 |
|---|---|
| **节点-代理** | 3X-UI.ZENT.DE5.NET-2, PANEL.ARM-US.SEEKWAY.GGFF.NET, PANEL.VMRACK.NEXX.DE5.NET, DELUX18, KURUN1, PANEL.DE.SEEKWAY.GGFF.NET, PANEL.GB.SEEKWAY.GGFF.NET, PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-AI** | PANEL.LAX69.SEEKWAY.GGFF.NET, PANEL.VMRACK.NEXX.DE5.NET, LAX69, KURUN1, PANEL.GB.SEEKWAY.GGFF.NET, PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-流媒体** | PANEL.AMD1-US.SEEKWAY.GGFF.NET, 3X-UI.ZENT.DE5.NET-2, KURUN1, DELUX18, PANEL.AOTE-HK.SEEKWAY.GGFF.NET, KURUN2, PANEL.VMRACK.NEXX.DE5.NET, VMRACK-CN2, PANEL.DE.SEEKWAY.GGFF.NET, PANEL.GB.SEEKWAY.GGFF.NET, PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-社交** | PANEL.AMD1-US.SEEKWAY.GGFF.NET, PANEL.VMRACK.NEXX.DE5.NET, ORACLE-ARM, PANEL.AMD2-US.SEEKWAY.GGFF.NET-3, PANEL.LAX69.SEEKWAY.GGFF.NET, KURUN1, KURUN2, PANEL.DE.SEEKWAY.GGFF.NET, PANEL.GB.SEEKWAY.GGFF.NET, PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-工作** | PANEL.ARM-US.SEEKWAY.GGFF.NET, PANEL.AMD2-US.SEEKWAY.GGFF.NET-3, ORACLE-AMD1, PANEL.AMD1-US.SEEKWAY.GGFF.NET, KURUN1, VMRACK-CN2, KURUN2, DELUX18, PANEL.DE.SEEKWAY.GGFF.NET, PANEL.GB.SEEKWAY.GGFF.NET, PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-DE (新增)** | PANEL.DE.SEEKWAY.GGFF.NET, 3X-UI.ZENT.DE5.NET-2, PANEL.VMRACK.NEXX.DE5.NET |
| **节点-GB (新增)** | PANEL.GB.SEEKWAY.GGFF.NET |
| **节点-NL (新增)** | PANEL.NL.SEEKWAY.GGFF.NET |
| **节点-欧洲 (新增)** | 节点-DE, 节点-GB, 节点-NL |

## 许可说明

- 本仓库配置基于 Shadowrocket 公开格式
- 广告规则来自 Loyalsoldier / AWAvenue / fengzhiguyin 公共仓库
- 原始配置从 anywhere-hub.chikacya.indevs.in 获取
- 本仓库仅做整理、修复与模块化重构
- 新增德国/英国/荷兰节点组以扩大区域覆盖
