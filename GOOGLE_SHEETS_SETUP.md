# Google Sheets 集成设置指南

本指南将帮助您设置Google Sheets集成，以便将用户提交的邮箱地址自动保存到Google表格中。

## 🚨 快速修复403错误

如果您遇到403错误，请立即执行以下步骤：

1. **访问您的Google Apps Script项目**
2. **点击 "部署" > "管理部署"**
3. **点击现有部署旁边的编辑图标（铅笔图标）**
4. **将访问权限改为 "任何人，甚至匿名用户"**
5. **点击 "部署"**
6. **如果提示授权，完成授权流程**
7. **复制新的Web应用URL并更新您的 `.env.local` 文件**
8. **重启开发服务器**

## ⚠️ "Google hasn't verified this app" 警告处理

当您首次访问Google Apps Script URL时，可能会看到安全警告。这是正常的，因为这是您自己创建的应用：

1. **看到警告页面时**：
   - 点击 "Advanced" 或 "高级"
   - 点击 "Go to [your-script-url] (unsafe)" 或 "转到 [您的脚本URL]（不安全）"
   - 这样做是安全的，因为这是您自己的脚本

2. **授权您的应用**：
   - 选择您的Google账户
   - 点击 "Allow" 或 "允许"
   - 授予访问Google Sheets的权限

3. **完成后**：
   - 您的脚本现在可以正常工作
   - 后续请求不会再显示此警告

## 步骤1：创建Google表格

1. 访问 [Google Sheets](https://sheets.google.com)
2. 创建一个新的表格
3. 在第一行添加列标题：`Email`, `Timestamp`, `Source`
4. 复制表格的ID（URL中 `/d/` 和 `/edit` 之间的部分）

## 步骤2：创建Google Apps Script

1. 访问 [Google Apps Script](https://script.google.com)
2. 创建新项目
3. 将以下代码粘贴到编辑器中：

```javascript
function doPost(e) {
  try {
    // 替换为您的Google表格ID
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 添加新行到表格
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.source
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. 将 `YOUR_SPREADSHEET_ID_HERE` 替换为步骤1中复制的表格ID
5. 保存项目（Ctrl+S 或 Cmd+S）

## 步骤3：部署Web应用

1. 点击 "部署" > "新建部署"
2. 选择类型："Web应用"
3. **重要设置**：
   - **执行身份**：选择您的账户
   - **访问权限**：选择 "任何人" 或 "任何人，甚至匿名用户"
   - **版本**：选择 "新版本"
4. 点击 "部署"
5. **授权步骤**：
   - 如果出现授权提示，点击 "授权访问"
   - 选择您的Google账户
   - 点击 "允许" 授予必要权限
6. 复制生成的Web应用URL

## 步骤4：配置环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：

```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. 将 `YOUR_SCRIPT_ID` 替换为步骤3中获得的Web应用URL

## 步骤5：测试集成

1. 启动开发服务器：`npm run dev`
2. 访问网站并尝试提交邮箱
3. 检查Google表格是否收到了新数据

## 故障排除

### 常见问题：

1. **403错误（权限被拒绝）**：
   - 检查Google Apps Script的访问权限是否设置为 "任何人"
   - 确认已完成授权流程
   - 尝试重新部署Web应用并选择 "新版本"
   - 检查Google账户是否有访问表格的权限

2. **500错误**：检查表格ID是否正确

3. **网络错误**：检查环境变量是否正确设置

### 调试步骤：

1. **检查权限设置**：
   - 访问Google Apps Script项目
   - 点击 "部署" > "管理部署"
   - 确认访问权限设置为 "任何人"

2. **重新授权**：
   - 在Google Apps Script中点击 "运行" 按钮测试函数
   - 如果提示授权，完成授权流程

3. **检查日志**：
   - 检查浏览器开发者工具的网络标签
   - 查看Google Apps Script的执行日志
   - 确认环境变量已正确加载

4. **测试URL**：
   - 直接在浏览器中访问Web应用URL
   - 应该看到错误信息而不是403页面

## 安全注意事项

- 不要将 `.env.local` 文件提交到版本控制系统
- 定期检查Google Apps Script的访问日志
- 考虑添加速率限制以防止滥用