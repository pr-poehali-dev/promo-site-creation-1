import json
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    '''
    Business: определяет город пользователя по его IP-адресу для автоподстановки в форму контактов.
    Args: event с httpMethod и requestContext.identity.sourceIp; context с request_id.
    Returns: HTTP-ответ с JSON {city, region, country}.
    '''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    ip = ''
    try:
        ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', '') or ''
    except Exception:
        ip = ''

    headers_in = event.get('headers') or {}
    if not ip:
        for h in ('x-forwarded-for', 'X-Forwarded-For', 'x-real-ip', 'X-Real-IP'):
            v = headers_in.get(h)
            if v:
                ip = v.split(',')[0].strip()
                break

    result = {'city': '', 'region': '', 'country': '', 'ip': ip}

    if not ip or ip.startswith(('10.', '192.168.', '127.', '172.')):
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps(result, ensure_ascii=False),
        }

    try:
        url = f'http://ip-api.com/json/{ip}?lang=ru&fields=status,country,regionName,city,query'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('status') == 'success':
                result['city'] = data.get('city', '') or ''
                result['region'] = data.get('regionName', '') or ''
                result['country'] = data.get('country', '') or ''
    except (urllib.error.URLError, TimeoutError, Exception):
        pass

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps(result, ensure_ascii=False),
    }
