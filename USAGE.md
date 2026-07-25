# Shadowrocket / Anywhere 使用指导

## 环境要求

- iOS / iPadOS
- Shadowrocket（App Store 付费应用）
- 代理账号（订阅链接或手动配置节点）

---

## 一、首次导入完整配置

### 方式 1：远程 URL 导入（推荐）

打开 Shadowrocket → 配置 → 点击右上角 `+` → 粘贴：

```
https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config.ini
```

点击「完成」后，新配置会出现在列表中。

### 方式 2：本地文件导入

把 `full-config.ini` 传到 iCloud Drive / 文件 App，Shadowrocket 打开该文件 → 自动导入。

---

## 二、配置代理节点

导入后，需在 Shadowrocket 的「订阅」功能中添加你的节点订阅源：

1. 点击底部「订阅」
2. 右上角 `+` 添加订阅 URL
3. Shadowrocket 会自动拉取节点并更新到策略组

**如果节点名不匹配**：配置中引用的节点名（如 `3X-UI.ZENT.DE5.NET-2`）必须与你订阅中的节点名一致，否则会显示空白。

---

## 三、启用广告规则（去广告）

广告拦截已拆分为**独立模块**，可通过以下两种方式启用：

### 方式 A：通过订阅自动同步（推荐）

配置中已包含：

```ini
RULE-SET,https://raw.githubusercontent.com/fengzhiguyin/adblock-scripts/main/rules/ads_merged.txt,拦截
```

Shadowrocket 会定期自动拉取远程广告规则，无需手动操作。

### 方式 B：本地启用/禁用

修改 `rules/adblock.ini`，注释掉不需要的拦截项，然后**重新导入主配置**。

---

## 四、启用 TikTok 区域解锁

TikTok 换区依赖 MITM 解密，需额外操作：

### 步骤 1：确认 MITM 已启用

在配置文件中确认：

```ini
[MITM]
enable = true
hostname = *.tiktokv.com, *.byteoversea.com, *.tik-tokapi.com, *.tiktok.com
ca-passphrase = 88YHhW0Z
```

### 步骤 2：生成并信任 CA 证书

打开 Shadowrocket → 设置 → 找到「生成 CA 证书」或「MITM」相关选项 → 点击生成。

生成后按提示到 **iOS 设置 → 通用 → VPN与设备管理**，信任该 CA 证书。

> ⚠️ 不信任证书，TikTok 区域解锁脚本会失效。

### 步骤 3：启用解锁脚本

确保 `[Script]` 段包含：

```ini
(?<=_region=)CN(?=&) US 307
(?<=&mcc_mnc=)460[0-9]{2}(?=&) 310410 307
(?<=&sys_region=)CN(?=&) US 307
(?<=&carrier_region=)CN(?=&) US 307
```

---

## 五、验证配置

导入后，可逐项验证：

| 验证项 | 验证方法 |
|---|---|
| DNS 解析 | 任意网站能否打开 |
| Telegram | 能否收发消息 |
| YouTube | 视频播放是否流畅（4K 码率） |
| TikTok | 能否刷到美区内容（美国热门） |
| AI 服务 | ChatGPT / Claude / Gemini 能否访问 |
| 广告拦截 | 浏览网页是否减少广告显示 |

---

## 六、更新配置

### 更新主配置

**方式 A（推荐）**：由于已设置 `update-url`，Shadowrocket 会自动定期更新。

**方式 B**：手动重新导入 `full-config.ini` URL。

### 更新广告规则

广告规则通过远程 RULE-SET 自动更新，无需重新导入主配置。

### 更新 TikTok 脚本

修改 `scripts/tiktok-region-unlock.srs` 后，需重新导入主配置。

---

## 七、模块化说明

完整配置拆分为独立文件，方便维护：

```
├── full-config.ini          # 完整单文件（供 Shadowrocket 直接导入）
├── config/                  # 配置分段
│   ├── general.ini          # [General]
│   ├── proxy-group.ini      # [Proxy Group]
│   └── mitm.ini             # [MITM]
├── rules/                   # 规则模块
│   ├── p0-base.ini          # 基础路由
│   ├── p1-tools.ini         # DNS/测速
│   ├── p2-ai.ini            # AI 服务
│   ├── p3-streaming.ini     # 视频/游戏
│   ├── p4-social.ini        # 社交
│   ├── p5-developer.ini    # 开发者
│   ├── p6-corporate.ini    # 大厂
│   ├── p7-finance.ini      # 金融
│   ├── p8-fallback.ini     # 兜底
│   └── adblock.ini          # 广告拦截（可独立修改）
```

**模块化对 Shadowrocket 用户的影响**：零。Shadowrocket 只认 `full-config.ini`，模块文件用于源码版本控制。

---

## 八、常见问题

### Q1: 导入后节点名都空白

**A**：订阅中的节点名与配置不匹配。打开 Shadowrocket 订阅，确认节点名与配置中的名称一致（区分大小写）。

### Q2: TikTok 区域解锁不生效

**A**：检查以下三项：
1. `[MITM] enable = true`
2. CA 证书已生成并在 iOS 设置中信任
3. 解锁脚本在 `[Script]` 段正确启用

### Q3: 广告拦截未生效

**A**：
1. 确认 `p0-base.ini` 中 `RULE-SET` 未被注释掉
2. 远程规则需自动更新，检查 Shadowrocket 的订阅更新日志
3. 手动测试：访问已知广告站是否被封

### Q4: YouTube 4K 播放卡顿

**A**：检查 `force-http-engine-hosts` 是否含 `googlevideo.com`（应已移除）。如仍卡顿，尝试切换至「节点-流媒体」中的低延迟节点。

### Q5: 配置导入后某些规则不生效

**A**：检查配置文件是否有语法错误（不匹配引号、多余空格）。可使用 Shadowrocket 的「测试配置」功能验证。

---

## 九、相关链接

- [主配置文件 (full-config.ini)](https://raw.githubusercontent.com/kongjie0325-art/shadowrocket-anywhere-config/master/full-config.ini)
- [GitHub 仓库](https://github.com/kongjie0325-art/shadowrocket-anywhere-config)
- [来源站 (Anywhere-Hub)](https://anywhere-hub.chikacya.indevs.in)
- [去广告规则源](https://github.com/fengzhiguyin/adblock-scripts)
