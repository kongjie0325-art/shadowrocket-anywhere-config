# Shadowrocket / Anywhere Proxy Config
# 整理版
# 时间戳: 2026-07-25 18:53:13

## 文件结构

```
├── README.md                # 本说明
├── ACKNOWLEDGMENTS.md       # 来源与许可
├── USAGE.md                 # 使用指导
├── full-config.ini          # 完整配置（Shadowrocket 单文件导入）
├── config/
│   ├── general.ini          # [General] 段
│   ├── proxy-group.ini      # [Proxy Group] 段
│   └── mitm.ini             # [MITM] 段
├── rules/                   # 模块化规则集（可独立启用/禁用）
│   ├── p0-base.ini          # P0: 局域网与基础防御
│   ├── p1-tools.ini         # P1: DNS/测速
│   ├── p2-ai.ini            # P2: AI 专属
│   ├── p3-streaming.ini     # P3: 视频/游戏
│   ├── p4-social.ini        # P4: 社交
│   ├── p5-developer.ini    # P5: 开发者与云
│   ├── p6-corporate.ini    # P6: 大厂（Google/微软/苹果）
│   ├── p7-finance.ini      # P7: 金融/IO
│   ├── p8-fallback.ini     # P8: 兜底
│   └── adblock.ini          # 广告拦截独立模块（远程 RULE-SET + 本地）
└── scripts/
    └── tiktok-region-unlock.srs  # TikTok 区域解锁脚本
```

## 快速导入

- **单文件导入**: `full-config.ini`
- **远程 URL**: 已内置 `update-url`

详细使用说明见 [USAGE.md](USAGE.md)
