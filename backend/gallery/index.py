"""
Business: API для управления фотогалереей - получение списка, загрузка и удаление фото.
Args: event - dict с httpMethod, body, queryStringParameters, headers; context - объект с request_id.
Returns: HTTP-ответ JSON со списком фото / результатом загрузки / удаления.
"""
import json
import os
import base64
import uuid
from typing import Any, Dict

import boto3
import psycopg2


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Access-Control-Max-Age': '86400',
}


def _resp(status: int, body: Any) -> Dict[str, Any]:
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps(body, ensure_ascii=False),
    }


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )


def _cdn_url(key: str) -> str:
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if method == 'GET':
        with _conn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, url, title FROM t_p31883984_promo_site_creation_.gallery_photos ORDER BY id DESC"
                )
                rows = cur.fetchall()
        photos = [{'id': r[0], 'url': r[1], 'title': r[2] or ''} for r in rows]
        return _resp(200, {'photos': photos})

    if method == 'POST':
        try:
            payload = json.loads(event.get('body') or '{}')
        except json.JSONDecodeError:
            return _resp(400, {'error': 'invalid json'})

        file_b64 = payload.get('file_base64', '')
        content_type = payload.get('content_type', 'image/jpeg')
        title = (payload.get('title') or '').strip()[:120]

        if not file_b64:
            return _resp(400, {'error': 'file_base64 required'})

        try:
            data = base64.b64decode(file_b64)
        except Exception:
            return _resp(400, {'error': 'invalid base64'})

        ext = 'jpg'
        if 'png' in content_type:
            ext = 'png'
        elif 'webp' in content_type:
            ext = 'webp'
        elif 'jpeg' in content_type or 'jpg' in content_type:
            ext = 'jpg'

        key = f"gallery/{uuid.uuid4().hex}.{ext}"
        _s3().put_object(
            Bucket='files',
            Key=key,
            Body=data,
            ContentType=content_type,
        )
        url = _cdn_url(key)

        safe_title = title.replace("'", "''")
        with _conn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"INSERT INTO t_p31883984_promo_site_creation_.gallery_photos (url, title) VALUES ('{url}', '{safe_title}') RETURNING id"
                )
                new_id = cur.fetchone()[0]
            conn.commit()

        return _resp(200, {'id': new_id, 'url': url, 'title': title})

    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        raw_id = params.get('id')
        if not raw_id or not str(raw_id).isdigit():
            return _resp(400, {'error': 'id required'})
        photo_id = int(raw_id)
        with _conn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"DELETE FROM t_p31883984_promo_site_creation_.gallery_photos WHERE id = {photo_id}"
                )
            conn.commit()
        return _resp(200, {'deleted': photo_id})

    return _resp(405, {'error': 'method not allowed'})
