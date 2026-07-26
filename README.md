# Shadowrocket Anywhere Config

与 [anywhere-rules](https://github.com/chikacya/anywhere-rules) 同源设计理念：**模块化、MITM 最小化、可独立启停**。

## 架构

```
full-config.ini          # 主配置：通用Proxy/规则/DNS，无硬编码节点
                             移除得局部脚本和 MITM 细节，交由独立模块处理。
rules/
  ├── upstream.list       # 远程 Rule Set 引用（LOYAL/TikTok/Google/AI/Apple/Microsoft）
modules/
  ├── youtubeads.sgmodule     # YouTube 广告（URL Rewrite + 独立脚本 + MITM）
  ├── tiktok-unlock.sgmodule  # TikTok 区域解锁 + 广告过滤
  ├── bilibiliads.sgmodule    # Bilibili 去广告
  ├── weiboads.sgmodule       # 微博去广告
  ├── amapads.sgmodule        # 高德地图去广告
scripts/
  ├── youtube-ads.js
  ├── tiktok-ad.js
  ├── bilibili-ad.js
  ├── weibo-ad.js
  ├── amap-ad.js
```

## Anywhere 风格核心原则

1. **不要依赖单一巨型配置** - 按平台拆分成独立 `.sgmodule`，故障时单独禁用
2. **MITM 最小化** - 不 MITM Google/YouTube；仅对需要修改响应的域名做 MITM
3. **去 DOMAIN-KEYWORD** - 不使用 `ads`/`analytics`/`tracker` 等全局关键词，避免误杀正常 API
4. **不硬编码私钥** - `ca-p12`/`ca-passphrase` 已移除，由 Shadowrocket 本地生成
5. **避免通配脚本** - 不用 `pattern=^https?://` 全局 Hook，仅对白名单域名启用
6. **不 MITM 播放域名** - 为保护 YouTube/Spotify 播放稳定性，不把它们加入 MITM 列表
7. **优先 RULE-SET** - 用远程规则集替代手工域名列表，降低维护成本

## 安全说明

⚠️ 本仓库不包含任何 CA 私钥。导入配置后，请在 **Shadowrocket → MITM → 证书** 内自行生成并信任证书。

## 快速开始

1. 导入主配置：https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config.ini
2. 在 Shadowrocket 代理页将你的节点填入对应策略组（`节点-流媒体`/`节点-US` 等）
3. 安装 MITM 证书：Shadowrocket → MITM → Generate CA → Install & Trust
4. 按需开启模块（YouTube/TikTok/Bilibili/微博/高德）

## 测试顺序

| 步骤 | 动作 | 期望 |
|------|------|------|
| 1 | 仅导入主配置，不开任何模块 | YouTube 可打开 |
| 2 | 开启 youtubeads.sgmodule | YouTube 广告减少 |
| 3 | 开启其他模块 | 对应 App 去广告生效 |
