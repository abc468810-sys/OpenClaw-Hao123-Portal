# AI 跨境招商系统完整流程

## 一句话定位

这是一个围绕中俄台跨境项目的 AI 商业操作系统：

> 项目发现 → AI 评分 → 内容生成 → H5 展示 → 视频包装 → 线索收集 → 数据反馈 → 项目优化

---

# 1. 项目输入层

## 输入内容

项目可以来自：

- 中俄贸易机会
- 俄罗斯资源项目
- 电商套利商品
- 代理招商产品
- 线下供应链项目

## 当前项目数据库

文件：

```text
data/projects.json
```

当前示例项目包括：

- 俄罗斯蜂蜜
- 俄罗斯泥炭土
- 松子仁
- 琥珀蜜蜡
- 工业电源/配电箱
- 二手车预售

---

# 2. 项目评分层

## 评分标准

文件：

```text
schemas/project-score.schema.json
```

核心标准：

- 高利润
- 低监管
- 轻资产
- 可招商
- 可裂变
- 可 AI 放大

## 输出结果

系统输出：

- STRONG GO
- GO
- WATCH
- NO GO

---

# 3. 套利分析层

## 目的

对比：

```text
中国采购价
VS
俄罗斯售价
```

计算：

- 成本
- 运费
- EAC/认证成本
- 毛利
- 毛利率
- 推荐等级

## 脚本

```bash
npm run arbitrage
```

对应文件：

```text
scripts/arbitrage-calculator.js
```

---

# 4. 内容包生成层

## 目的

把一个项目自动转成完整内容包。

## 生成内容

- H5 标题
- 项目介绍
- 视频结构
- 小红书素材
- Telegram 素材
- VK 素材
- 俄语版本

## 脚本

```bash
npm run content
```

对应文件：

```text
scripts/content-package-generator.js
```

输出：

```text
data/content-packages.json
```

---

# 5. 图片包生成层

## 目的

为每个项目生成图片/海报 Prompt。

## 生成内容

- 小红书封面
- 微信长图
- Telegram 横版图
- 项目卡片

## 脚本

```bash
node scripts/image-prompt-generator.js
```

输出：

```text
data/image-packages.json
```

---

# 6. 视频包生成层

## 目的

把项目自动转成视频脚本与分镜。

## 生成内容

- 30 秒短视频脚本
- 60 秒招商视频脚本
- 分镜头脚本
- 旁白
- 字幕
- Sora Prompt
- Seedance Prompt
- CapCut Prompt

## 脚本

```bash
npm run video
```

对应文件：

```text
scripts/video-script-generator.js
```

输出：

```text
data/video-packages.json
```

---

# 7. H5 页面生成层

## 目的

把项目数据库自动生成手机 H5 招商页面。

## 脚本

```bash
npm run h5
```

对应文件：

```text
scripts/h5-page-generator.js
```

输出目录：

```text
generated-h5/
```

生成：

- 每个项目独立 H5
- H5 页面库索引

---

# 8. 展示层

## 首页

```text
index.html
```

作用：

- 系统总入口
- Demo V1 入口
- Dashboard 入口
- H5 页面库入口
- 线索 Dashboard 入口

## Demo V1

```text
demo.html
```

当前示范项目：

- 俄罗斯蜂蜜

包含：

- 项目介绍
- 图片占位
- 视频占位
- 俄语示范
- 报价结构
- 静态线索表单
- 风险提醒

## 项目排行榜

```text
dashboard.html
```

作用：

- 项目数据库展示
- 套利案例展示
- 自动评分排序

## 招商线索 Dashboard

```text
leads.html
```

作用：

- 查看线索来源
- 查看客户类型
- 查看预算区间
- 查看跟进状态

---

# 9. 线索收集层

## 当前状态

当前是静态表单 + 示例线索。

示例数据：

```text
data/sample-leads.json
```

线索结构：

```text
schemas/lead.schema.json
```

## 后续可接

- Airtable
- Supabase
- Notion
- GitHub Issues
- 简单 CRM

---

# 10. 构建层

## 一键构建

```bash
npm run build
```

会依次生成：

- 套利分析
- Content Package
- Video Package
- Image Package
- H5 页面

对应文件：

```text
scripts/build-all.js
```

---

# 11. 部署层

## GitHub Pages

推荐部署方式：

```text
Settings → Pages → Deploy from branch → main → root
```

上线后入口：

```text
https://用户名.github.io/OpenClaw-Hao123-Portal/
```

---

# 12. 反馈闭环

完整商业闭环：

```text
项目数据库
↓
AI 自动评分
↓
内容包生成
↓
图片包生成
↓
视频包生成
↓
H5 页面生成
↓
Demo 展示
↓
用户填写表单
↓
线索 Dashboard
↓
反馈项目效果
↓
优化项目数据库
```

---

# 13. 当前阶段判断

## 已完成

- 系统入口
- Demo V1
- Dashboard
- H5 页面库
- 视频脚本生成
- 图片 Prompt 生成
- 内容包生成
- 线索 Dashboard
- 一键构建

## 仍需补充

- 真实图片
- 真实视频
- 表单保存
- CMS 后台
- 实时价格数据
- 自动配音
- 真实报价系统

---

# 14. 当前最优先动作

## 第一优先

GitHub Pages 上线。

## 第二优先

替换 Demo V1 中的真实图片和视频。

## 第三优先

接入表单保存。

## 第四优先

补真实报价和供应链资料。

---

# 15. 最终目标

形成：

> AI 自动化跨境招商媒体与运营系统

最终闭环：

```text
发现项目
↓
AI 判断
↓
AI 包装
↓
AI 生成 H5/视频/图片
↓
人工审核
↓
发布传播
↓
收集线索
↓
成交验证
↓
数据回流
```
