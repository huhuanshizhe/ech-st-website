# 客户资料映射指南

本文档说明如何将客户提供的资料复制到网站项目中。

## 资料源目录
```
d:\qoder 专用\ECH-ST网站开发项目\ECH-ST  网站资料\
```

## 映射关系

### 1. 公司资料 → 前端 public 目录

| 源文件 | 目标位置 | 用途 |
|-------|---------|------|
| `ECH-ST Electrics Company profile/ECH-ST LOGO.png` | `apps/web/public/images/logo.png` | 网站Logo |
| `ECH-ST Electrics Company profile/ECH-ST LOGO.png` | `apps/admin/public/images/logo.png` | 后台Logo |
| `ECH-ST Electrics Company profile/ECH-ST Electrics factory.jpg` | `apps/web/public/images/factory/factory-main.jpg` | 关于我们-工厂主图 |
| `ECH-ST Electrics Company profile/SMART DISTRIBUTION SYSTEM SOLUTION.jpg` | `apps/web/public/images/factory/smart-distribution.jpg` | 关于我们-智能配电方案 |

### 2. 产品图片 → 前端 public 目录

| 源文件 | 目标位置 | 用途 |
|-------|---------|------|
| `Main Products/MCCB/ECB-250P.png` | `apps/web/public/images/products/mccb/ecb-250p.png` | MCCB产品图 |
| `Main Products/MCCB/MCB Product .jpg` | `apps/web/public/images/products/mccb/mcb-product.jpg` | MCCB产品图 |
| `Main Products/MCCB/MCCB.jpg` | `apps/web/public/images/products/mccb/main.jpg` | MCCB分类图 |
| `Main Products/MCCB/New Energy Photovoltaic Dc Circuit Breaker.jpg` | `apps/web/public/images/products/mccb/new-energy.jpg` | 新能源断路器 |
| `Main Products/MCB/MCB.jpg` | `apps/web/public/images/products/mcb/main.jpg` | MCB分类图 |
| `Main Products/RS485 Serial communication Chip/ECH485EESA.png` | `apps/web/public/images/products/rs485/ech485eesa.png` | RS485芯片 |
| `Main Products/Microgrid（Energy Storage Solution ）/1757424012742956.jpg` | `apps/web/public/images/products/energy-storage/main.jpg` | 储能系统 |

### 3. 产品PDF文档 → 前端 public/pdfs 目录

创建 `apps/web/public/pdfs/` 目录并复制以下文件:

**MCCB系列:**
- `ECHSTM6-Thermomagnetic Molded Case Circuit Breaker.pdf`
- `ECHSTM6E-Electronic Molded Case Circuit Breaker.pdf`
- `ECHSTM6LE-250 Residual Current Operated Circuit Breaker.pdf`
- `ECHSTM6LY-250M R Thermomagnetic Adjustable Residual Current Circuit Breaker.pdf`
- `ECHSTM6ZY-250M-IoT Intelligent Circuit Breaker.pdf`
- `ECHSTM6ZY-400MP-IoT circuit breaker.pdf`
- `ECHSTM6EY-LC-Intelligent Measurement Circuit Breaker.pdf`
- `ECHSTM6LE-160 GZ IoT Reclosing Circuit Breaker.pdf`
- `ECHSTM7-320-New Energy Height Voltage Circuit Breaker.pdf`
- `ECHSTM7DC-630-New Energy DC Circuit Breaker.pdf`
- `ECB-250 Cost control Molded Case Circuit Breaker.pdf`
- `LOW VOLTAGE ELECTRONIC COMPONENTS.pdf`

**MCB系列:**
- `MCB Product Catalog.pdf`
- `Type-B-RCBO.pdf`
- `100B-RCCB.pdf`
- `RCCB B type.pdf`
- `RCCB.pdf`

**电路保护器件:**
- `Metal Oxide Varistor(MOV) -7D 10D 14D 20DSeries.pdf`
- `Metal Oxide Varistor(MOV) -25D 34S 40S 40D 48R 54R 60D Series.pdf`
- `Metal Oxide Varistor (MOV) Datasheet.pdf`
- `Surge Protective Device and Backup Protector Selection Guide.pdf`

**储能系统:**
- `ESS_All-in-one.pdf`
- `SOLAR ENERGY STORAGE SYSTEM.pdf`
- `C&I Energy Storage.pdf`

**智能设备:**
- `Product Manual for Smart Cutout.pdf`
- `ZW32-12_Product_Manual_EN.pdf`

**其他:**
- `RS485(ECH485EESA、ECH485NEESA)-Specification sheet.pdf`
- `Capacitor Catalogue.pdf`
- `Accessory series.pdf`

### 4. 工厂视频 → 前端 public/videos 目录

创建 `apps/web/public/videos/` 目录并复制:

| 源文件 | 目标位置 |
|-------|---------|
| `ECH-ST manufacturing facility/MCCB Manufacturing workshop.mp4` | `apps/web/public/videos/mccb-workshop.mp4` |
| `ECH-ST manufacturing facility/Circuit breaker mechanism parts production workshop.mp4` | `apps/web/public/videos/mechanism-workshop.mp4` |
| `ECH-ST manufacturing facility/Injection molding manufacturing workshop.mp4` | `apps/web/public/videos/injection-workshop.mp4` |
| `ECH-ST manufacturing facility/testing center.mp4` | `apps/web/public/videos/testing-center.mp4` |

### 5. 联系方式资料

| 源文件 | 目标位置 | 用途 |
|-------|---------|------|
| `Contact Information/WeChat QR code.png` | `apps/web/public/images/contact/wechat-qr.png` | 微信二维码 |
| `Contact Information/Company Address.png` | `apps/web/public/images/contact/address.png` | 公司地址图 |

## 快速复制脚本 (Windows PowerShell)

```powershell
# 设置源目录和目标目录
$source = "d:\qoder 专用\ECH-ST网站开发项目\ECH-ST  网站资料"
$target = "d:\qoder 专用\ECH-ST网站开发项目\ech-st-website\apps\web\public"

# 创建目录
New-Item -ItemType Directory -Force -Path "$target\images\products\mccb"
New-Item -ItemType Directory -Force -Path "$target\images\products\mcb"
New-Item -ItemType Directory -Force -Path "$target\images\products\energy-storage"
New-Item -ItemType Directory -Force -Path "$target\images\products\rs485"
New-Item -ItemType Directory -Force -Path "$target\images\factory"
New-Item -ItemType Directory -Force -Path "$target\images\contact"
New-Item -ItemType Directory -Force -Path "$target\pdfs"
New-Item -ItemType Directory -Force -Path "$target\videos"

# 复制Logo
Copy-Item "$source\ECH-ST Electrics Company profile\ECH-ST LOGO.png" "$target\images\logo.png"

# 复制工厂图片
Copy-Item "$source\ECH-ST Electrics Company profile\ECH-ST Electrics factory.jpg" "$target\images\factory\factory-main.jpg"
Copy-Item "$source\ECH-ST Electrics Company profile\SMART DISTRIBUTION SYSTEM SOLUTION.jpg" "$target\images\factory\smart-distribution.jpg"

# 复制产品图片
Copy-Item "$source\Main Products\MCCB\MCCB.jpg" "$target\images\products\mccb\main.jpg"
Copy-Item "$source\Main Products\MCCB\ECB-250P.png" "$target\images\products\mccb\ecb-250p.png"
Copy-Item "$source\Main Products\MCB\MCB.jpg" "$target\images\products\mcb\main.jpg"
Copy-Item "$source\Main Products\RS485 Serial communication Chip\ECH485EESA.png" "$target\images\products\rs485\ech485eesa.png"
Copy-Item "$source\Main Products\Microgrid（Energy Storage Solution ）\1757424012742956.jpg" "$target\images\products\energy-storage\main.jpg"

# 复制联系资料
Copy-Item "$source\Contact Information\WeChat QR code.png" "$target\images\contact\wechat-qr.png"
Copy-Item "$source\Contact Information\Company Address.png" "$target\images\contact\address.png"

# 复制所有PDF (需要手动复制)
Write-Host "请手动复制PDF文件到 $target\pdfs\ 目录"

# 复制所有视频 (需要手动复制)
Write-Host "请手动复制视频文件到 $target\videos\ 目录"
```

## 注意事项

1. **图片格式**: 建议将大型PNG图片转换为WebP格式以提高加载速度
2. **PDF优化**: 大型PDF文件可以考虑压缩或使用在线PDF服务
3. **视频托管**: 视频文件较大，建议使用云存储或视频托管服务
4. **版权信息**: 确保所有资料使用符合客户要求

---

更新日期: 2026-04-03