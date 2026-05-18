import json
import os
import re
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr


def handler(event: dict, context) -> dict:
    '''
    Принимает заявку с сайта (имя, телефон, город, комментарий)
    и отправляет её на почту получателя через SMTP Mail.ru.
    '''
    method = event.get('httpMethod', 'POST')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    name = (body.get('name') or '').strip()[:100]
    phone = (body.get('phone') or '').strip()[:30]
    city = (body.get('city') or '').strip()[:60]
    message = (body.get('message') or '').strip()[:1000]

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    if not re.match(r'^[\d\s\+\-\(\)]{6,}$', phone):
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Некорректный телефон'}),
        }

    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient = os.environ.get('RECIPIENT_EMAIL', '')

    if not smtp_user or not smtp_password or not recipient:
        return {
            'statusCode': 500,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'SMTP не настроен'}),
        }

    ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', '—')

    subject = f'Новая заявка с сайта: {name} ({city or "город не указан"})'

    text_body = (
        f'Новая заявка с сайта Сладкие Грёзы\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Город: {city or "—"}\n'
        f'Комментарий: {message or "—"}\n\n'
        f'IP: {ip}\n'
    )

    html_body = f'''
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #faf7f5; border-radius: 12px;">
      <h2 style="color: #2541ff; margin: 0 0 16px;">💋 Новая заявка с сайта</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #777; width: 130px;">Имя:</td><td style="padding: 8px 0; font-weight: 600; color: #222;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #777;">Телефон:</td><td style="padding: 8px 0; font-weight: 600; color: #e30613;"><a href="tel:{phone}" style="color:#e30613; text-decoration:none;">{phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #777;">Город:</td><td style="padding: 8px 0; color: #222;">{city or "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #777; vertical-align: top;">Комментарий:</td><td style="padding: 8px 0; color: #222;">{message or "—"}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #999; font-size: 12px;">IP клиента: {ip}</p>
    </div>
    '''

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = formataddr(('Сладкие Грёзы — Заявки', smtp_user))
    msg['To'] = recipient
    msg['Reply-To'] = smtp_user
    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    context_ssl = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.mail.ru', 465, context=context_ssl, timeout=15) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [recipient], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
    }
