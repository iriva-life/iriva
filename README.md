# IRIVA · 青鸟

让远方的声音，成为身边的朋友。

## 工程交接

业务源码基线：`7d43bcf6ed1aa6504a9e64c8c7eb9cc89ac89e0c`（当前已发布第51版）。本次只导出当前快照，不包含历史开发提交。

目标域名：**iriva.life**。域名尚未由此仓库完成切换。

- [完整部署与迁移说明](docs/DEPLOYMENT_HANDOFF.md)
- [现有检查记录与未完成验收](docs/HANDOFF_VALIDATION.md)
- [原框架技术说明](docs/README_SITES_TEMPLATE.md)

本仓库含前后端实现与内部方法，按项目要求应使用私有仓库管理。生产数据和密钥不在仓库中。

## 技术栈

React / TypeScript / Vinext / Vite / Cloudflare Workers / D1。

```bash
npm run install:ci
npm run dev
```

安装后执行功能与类型检查：

```bash
node scripts/check-all.mjs
```

构建：

```bash
npm run build
```

**正式部署前必须完成：**独立环境身份验证、真实 D1 绑定/迁移、管理员权限、域名回调与手机端验收。当前托管环境代管 ChatGPT 登录，换域名不会自动迁移身份服务；不要在公开 Worker 上直接信任访客发送的身份头。

当前 AI 功能未连接，保留真实 Beta 状态。会议链接由 Host/团队设置。站内通知和 .ics 已有实现，尚无自动邮件/微信消息或在线支付结账。

## 目录

- `app/`：官网、资料表、学习空间、运营台及 API
- `components/`、`public/`：界面与品牌素材
- `db/`、`drizzle/`：数据库与顺序迁移
- `lib/`：权限、会话、时间及资料工具
- `worker/`、`vite.config.ts`：运行入口与构建配置
- `tests/`：现有功能检查

用户资料、草稿与团队资料访问必须保留服务器校验。正式上线以部署说明中的验收清单为准。
