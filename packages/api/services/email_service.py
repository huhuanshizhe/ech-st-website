"""
Email service for sending inquiry notifications
询盘邮件通知服务
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import httpx


# SMTP settings (can be replaced with any email service)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "your-email@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "your-password")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "sales@ech-st.com")


async def send_inquiry_notification(
    inquiry_data: dict,
    inquiry_id: str,
) -> bool:
    """
    发送询盘通知邮件给管理员
    Send inquiry notification email to admin
    """
    
    subject = f"新询盘来自 {inquiry_data.get('company_name', inquiry_data.get('contact_name'))} - ECH-ST"
    
    # HTML email content
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #1d4ed8; color: white; padding: 20px; text-align: center; }}
            .content {{ background: #f9fafb; padding: 20px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ color: #64748b; font-weight: bold; }}
            .value {{ color: #1e293b; }}
            .footer {{ text-align: center; padding: 20px; color: #64748b; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>新询盘通知</h2>
                <p>来自 ECH-ST 网站</p>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">询盘ID：</span>
                    <span class="value">{inquiry_id}</span>
                </div>
                <div class="field">
                    <span class="label">公司名称：</span>
                    <span class="value">{inquiry_data.get('company_name', '未提供')}</span>
                </div>
                <div class="field">
                    <span class="label">联系人：</span>
                    <span class="value">{inquiry_data.get('contact_name')}</span>
                </div>
                <div class="field">
                    <span class="label">邮箱：</span>
                    <span class="value">{inquiry_data.get('email')}</span>
                </div>
                <div class="field">
                    <span class="label">电话：</span>
                    <span class="value">{inquiry_data.get('phone', '未提供')}</span>
                </div>
                <div class="field">
                    <span class="label">国家/地区：</span>
                    <span class="value">{inquiry_data.get('country', '未提供')}</span>
                </div>
                <div class="field">
                    <span class="label">感兴趣的产品：</span>
                    <span class="value">{inquiry_data.get('products', '未提供')}</span>
                </div>
                <div class="field">
                    <span class="label">留言内容：</span>
                    <div class="value" style="margin-top: 10px; white-space: pre-wrap;">
                        {inquiry_data.get('message')}
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>请尽快处理此询盘 | ECH-ST Electrics</p>
                <p><a href="https://admin.ech-st.com/inquiries/{inquiry_id}">在后台查看详情</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text fallback
    text_content = f"""
新询盘通知 - ECH-ST Electrics

询盘ID: {inquiry_id}
公司名称: {inquiry_data.get('company_name', '未提供')}
联系人: {inquiry_data.get('contact_name')}
邮箱: {inquiry_data.get('email')}
电话: {inquiry_data.get('phone', '未提供')}
国家/地区: {inquiry_data.get('country', '未提供')}
感兴趣的产品: {inquiry_data.get('products', '未提供')}
留言内容:
{inquiry_data.get('message')}

请尽快处理此询盘。
后台链接: https://admin.ech-st.com/inquiries/{inquiry_id}
"""
    
    try:
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = ADMIN_EMAIL
        
        msg.attach(MIMEText(text_content, "plain"))
        msg.attach(MIMEText(html_content, "html"))
        
        # Send email (实际部署时使用)
        # with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        #     server.starttls()
        #     server.login(SMTP_USER, SMTP_PASSWORD)
        #     server.sendmail(SMTP_USER, ADMIN_EMAIL, msg.as_string())
        
        print(f"[Email] 询盘通知已准备发送: {inquiry_id}")
        return True
        
    except Exception as e:
        print(f"[Email Error] 发送失败: {e}")
        return False


async def send_reply_email(
    to_email: str,
    subject: str,
    content: str,
) -> bool:
    """
    发送回复邮件给客户
    Send reply email to customer
    """
    
    try:
        msg = MIMEText(content, "html")
        msg["Subject"] = subject
        msg["From"] = ADMIN_EMAIL
        msg["To"] = to_email
        
        print(f"[Email] 回复邮件已准备发送给: {to_email}")
        return True
        
    except Exception as e:
        print(f"[Email Error] 回复发送失败: {e}")
        return False