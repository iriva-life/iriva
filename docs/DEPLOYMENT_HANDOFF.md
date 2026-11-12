# IRIVA · 工程师部署交接说明

**目标域名：iriva.life**  
**源码版本：`7d43bcf6ed1aa6504a9e64c8c7eb9cc89ac89e0c`，对应当前已发布第 51 版。**  
对照站：https://iriva-household.moonlithyssop2.chatgpt.site/

此包为私密工程交接材料，含前后端源码和内部实现。请放入私有仓库，只授权项目工程师；不要将整个压缩包、源码、内部资料或文档放进网站静态资源目录。

## 1. 先明确交付范围

需要迁移的是「官网＋报名资料＋学习空间＋运营工作台」，不仅是静态首页。当前代码已在原托管环境构建、发布；**尚未在工程师自己的账户或 iriva.life 上完成部署验证**。原站保持运行，完成新环境验收后再切换域名。

本仓库包含当前完整前后端源码、素材、锁文件、13个 SQL 迁移和13个功能检查脚本。源码直接位于仓库根目录。历史开发版本不属于本次导出范围。

此仓库不包含生产数据库、学员资料、运行密钥、云账户凭据、Git 凭据、node_modules 或机器本地缓存。身份与数据库资源需要在目标环境接入。

## 2. 技术栈与主要入口

| 项目 | 当前实现 |
| --- | --- |
| 前端与路由 | React 19、TypeScript、Vinext 1.0.0-beta.5 / Vite 8，使用 Next API 兼容层 |
| 服务运行时 | Cloudflare Workers；API 直接使用 `cloudflare:workers` 环境绑定 |
| 数据 | Cloudflare D1，绑定名必须为 `DB`；Drizzle 管理 schema 与 SQL 迁移 |
| 开发环境 | Node.js >= 22.13.0、npm；执行现有部分测试还需要 Python 3 |
| 素材 | `public/`，包括透明青鸟与 favicon |
| 运行入口 | `worker/index.ts` |
| 构建配置 | `vite.config.ts`、`scripts/`、`.openai/hosting.json` |

主要路由：

- `/`、`/en`：中文/英文公开官网。
- `/apply`：学员资料；`/apply?role=host`：独立 Host 资料入口。
- `/learn`：学习空间；`/app` 为旧入口。
- `/team`：管理员/工作人员工作台。
- `/feedback`：独立的「给青鸟的建议」。

`app/chatgpt-auth.ts` 管身份；`lib/team.ts` 管团队角色；`app/api/*` 管真实写入和访问控制。`app/app/*` 为学习空间，`components/learning-details.tsx` 为简短 Host 介绍。

`docs/README_SITES_TEMPLATE.md` 是框架原始说明，可参考技术命令；其中「schema starts empty」等起始模板文字已不代表本业务现状，以本说明及实际源码为准。

## 3. 首先解决登录与身份接入

**这是完整应用迁出当前托管环境的前置工作。单独绑定域名不会自动迁移登录。**

现站由托管网关注入 `oai-authenticated-user-id`、`oai-authenticated-user-email` 等身份头，接管 `/signin-with-chatgpt`、`/signout-with-chatgpt` 和 `/callback`。这些路径不是当前业务代码自带的一套独立 OAuth 服务。

工程师需选择一种有真实验证能力的身份方案，并适配 `app/chatgpt-auth.ts`：

1. 在自有环境实现服务端会话或经验证的身份网关；根据面向中国学员的实际场景选择可用登录方式。
2. 保留应用需要的用户结构：稳定 `userId`、经验证邮箱、可选显示名。调整登录、退出和回调路由；包括当前源码中的直接登录/退出链接。
3. 如果继续采用可信网关转发身份头，必须先移除访客自行提供的同名身份头，再验证会话并由可信服务写入。**不能在公开 Worker 上直接信任客户端传来的这些头。**
4. 管理员权限必须由服务器确认。配置 `IRIVA_ADMIN_EMAILS`；不要为了快速上线把所有登录者、Host 或指定前端参数当作管理员。
5. 本地开发的 Seedy 模拟登录仅用于 localhost，不代表正式身份验证；不要把 mock 登录扩展到生产。

在身份方案接好前，公开官网可用于外观验收；报名、私人数据与运营工作台不得作为已完成的正式功能上线。现有单元检查大量使用模拟身份，不能替代目标环境的真实登录测试。

## 4. 推荐部署方向与构建

延续 Cloudflare Workers + D1 是与当前实现差异较小的迁移方向。若改到普通 Node/Vercel/其他数据库，需适配 `cloudflare:workers` 导入、D1 查询/批处理和鉴权，不能视作普通 Next.js 项目直接上传。

在 仓库根目录安装并本地构建：

```bash
npm run install:ci
npm run build
```

本地开发：

```bash
npm run dev
```

类型与现有功能检查：在仓库根目录执行：

```bash
node scripts/check-all.mjs
```

新拷贝没有 `.sites-runtime/`，构建默认使用 portable 配置，不需要原对话内的插件绝对路径。npm 锁文件的依赖下载地址使用 registry.npmjs.org。请先用锁文件安装，不要在第一次迁移时同时升级框架。

构建后的主要产物为 `dist/server/index.js` 和 `dist/client/`。`dist/server/wrangler.json` 是生成文件，原配置中的 D1 ID 是本地占位值，不能把它当成可用的生产数据库。

工程师应在自己的 Cloudflare 账户配置目标 Worker、真实 D1 资源和静态资源：

- 使用 `nodejs_compat`；现源码 compatibility date 为 `2026-05-15`。
- 服务端入口使用 Worker 构建输出；同时发布客户端静态资源，不要只上传 client 目录。
- D1 的 binding 为 `DB`，database_id/database_name 使用目标账户的真实值。
- 通过生产专用的 Vite/Wrangler 配置管理这些值，避免每次重建覆盖手工修改的产物。
- 不依赖 `.openai/hosting.json` 里的原项目 ID 创建新项目。该 ID 只是原托管环境的关联信息，不是生产凭据或新账户资源 ID。
- 当前连接器预览脚手架属于原开发环境；业务不依赖外部 Gmail/Slack 等连接器。迁出时按需移除本地预览集成，保留真正使用的业务路由。

这里没有提供可直接执行的生产发布命令或现成生产凭据；请工程师完成身份及目标资源配置后，使用自己账户的实际配置部署。

## 5. 数据库迁移与真实数据

数据库共 14 张业务表：applications、households、members、messages、sessions、practice_pairs、practice_invites、placements、notifications、coach_drafts、coach_usage、team_members、team_tasks、feedback。

- schema：`db/schema.ts`。
- 迁移：`drizzle/0000_*.sql` 至 `0012_*.sql`，按编号顺序。
- 若使用 Wrangler migrations，设置该 D1 数据库的 `migrations_dir` 指向 `drizzle`，检查目录和执行目标后再应用。
- **全新空库**可顺序应用全部迁移；已有数据库应先备份、确认迁移历史，只运行未应用部分。
- 原托管环境与 Wrangler 的迁移记录不一定相同；迁移已有库时不要直接重放全部 SQL。
- `0009_four_week_pilot_households.sql` 会将旧六周小组改为四周并限制周次；这是历史数据变更，已有库迁移前需确认其影响。
- schema 中 Household 的默认 duration 仍保留历史值 6；当前创建流程明确写入 4。迁移时按当前流程创建四周 Pilot，不要仅依据默认值判断业务周期。

**本仓库没有导出原生产数据。**如要保留现有申请、分组、会话或草稿，需要另行由有权限的人员导出并迁移，且先在隔离环境验证。

身份系统切换时，原用户 ID 可能变化。需要映射应用中的 user/owner/author/creator/participant/host、练习双方和通知归属；不要只迁移邮箱就认为所有关联已完成。涉及的表包括 applications、members、households、messages、sessions、practice_pairs、practice_invites、notifications、coach_drafts、coach_usage、feedback；其中 coach_usage 的 ID 还含用户 ID 与日期组合。现有 placements 按邮箱管理，仍需核对。

## 6. 配置与当前功能边界

| 配置/资源 | 要求 |
| --- | --- |
| `DB` | 必需，D1 binding；不写入前端 |
| `IRIVA_ADMIN_EMAILS` | 用安全环境配置设置真实管理员邮箱，逗号分隔；不在本仓库给出实际值 |
| `OPENAI_API_KEY`、`COACH_MODEL` | 可选；当前 AI 尚未接通。两者完整配置后才启用 AI 文本请求 |
| R2 / `BUCKET` | 当前没有业务上传依赖，hosting 声明 r2=null，无需为现功能强行开通 |
| 实际会议链接 | Host/团队为固定伙伴设置真实 HTTPS 链接，不自动生成视频会议 |

- AI 目前为 Beta/建设中，准备稿、录音、复盘可用；不要把未连接状态改成假 AI 成功。
- 录音默认在浏览器标签页中，可下载；没有自动云端上传或语音转写。已保存的文字准备稿存 D1。
- 通知为站内消息＋手动导入 .ics（提前一天、15分钟）；没有自动邮件、微信或短信发送。
- .ics 为一次性文件导入，不自动同步后续改期。
- 目前没有在线支付结账接口；匹配确认后由团队跟进付款。不要把资料提交当作付款成功。
- 草稿由用户选择保存在当前设备，7天有效；更换浏览器或域名不会自动带走 localStorage 草稿。

## 7. 域名与正式切换

1. 先明确 iriva.life 目前的 DNS/托管账户以及 `/learn` 等既有路径是否正在使用；本仓库没有读取或修改这些账户。
2. 在测试域名完成身份、D1、素材与功能验收。
3. 完整应用使用 Cloudflare 时，可按官方 Custom Domains 流程将 `iriva.life` 绑定到目标 Worker；若该域名保留现有站点，需先确定路径路由和替换范围。
4. 核对 HTTPS、主域与 www 跳转、认证回调地址、Cookie 范围、同源检查和缓存规则。
5. 私人资料与 API 响应不得被公共 CDN 缓存；保留服务端 no-store 行为。
6. 切换后保留原站和数据备份以便回滚，确认真实登录及全链路通过后再考虑下线旧环境。

## 8. 上线验收

- [ ] 首页/英文页：青鸟与彩虹、两张便签、三个体验页签、响应式、锚点链接正常。
- [ ] 保留现有品牌排版；不恢复已撤下的「你的一周」和内部方法介绍。
- [ ] 首屏不显示价格；费用区与填写资料前显示四周 Pilot ¥1,980/人，目前只开放母语档。
- [ ] 学员/Host 独立入口；时区为 UTC＋代表城市；时段至少两小时；微信优先时需要填写联系方式。
- [ ] 草稿保存/恢复/清除、七天到期、账号隔离、资料查看/补充均正常。
- [ ] 资料更新后团队重新确认；不能使用过期资料分组。
- [ ] 普通用户不能访问他人申请、私人草稿或团队资料；不能通过请求头、参数或前端开关伪造身份。
- [ ] 管理员与工作人员权限、Host/学员权限分别验证。
- [ ] 固定两对伙伴由 Host 安排；提出/接受/另提时间/撤回流程正常；单方面发起不直接生成已确认会议。
- [ ] 固定会议链接设置后能进入，确认后带入日程；缺少真实链接时明确提示。
- [ ] 日程显示与输入均为北京时间；成员卡片显示各自时区。用美国和中国设备分别验证同一时刻。
- [ ] 站内发布通知、会前提醒和 .ics 权限及时间正确。
- [ ] 建议只走独立入口，资料表不重新加入重复留言栏。
- [ ] 未配置 AI 时显示真实 Beta/建设中状态；不声称能够评测发音或已经转写录音。
- [ ] 手机端实际走完整个加入、练习和通知路径；此前未完成浏览器视觉复核。

## 9. 内部信息保护待办

已有接口对运营资料进行角色校验，AI 系统提示词在服务端。仍已定位到以下收紧机会，**尚未实现，不能当成已修复**：

- 团队页面部分内部匹配提示和对比维度存在于客户端构建脚本；应通过授权后的服务端交付内部规则，而不是仅隐藏页面入口。
- AI 准备工具的完整步骤和固定反馈格式可在客户端看到；后续完整题库、评价准则与引导规则应尽量留在服务端按需提供。
- 未开放两档仍展示规划 Host 配置；是否进一步收紧公开文案由产品负责人确认。

这些是业务方法可见性问题，不是本次检查已发现真实学员资料被公开泄露的结论。不要通过删除必要购买条件、削弱学员操作说明来替代内部方法保护。

## 10. 交接前验证记录与参考

当前版本已在原托管环境构建并发布；导出前已执行类型与现有功能检查、SQLite 迁移验证及源码归档校验。测试使用模拟身份和样例数据，不能替代新环境的登录、DNS、数据库迁移及手机实测。

官方参考：

- Vinext：https://github.com/cloudflare/vinext
- Workers Custom Domains：https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- D1 migrations：https://developers.cloudflare.com/d1/reference/migrations/
- D1 import/export：https://developers.cloudflare.com/d1/best-practices/import-export-data/

请工程师交付：目标配置、身份方案、数据迁移/不迁移说明、测试域名、验收结果、正式切换和回滚步骤。工程交接并不代表 iriva.life 已切换完成。
