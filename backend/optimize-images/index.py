import json
import os
import io
import urllib.request
from typing import Dict, Any

import boto3
from PIL import Image


SOURCE_IMAGES = [
    "25ebae46-7ba9-4578-bf0d-143b11e13dd7.jpg",
    "6cb55b51-beaf-4c4b-9929-88ec189dcc88.jpg",
    "9fc2dbd6-6a08-418e-9843-54336b1f1d73.jpg",
    "d7bec23c-93fa-4969-bdcd-be1720513233.jpg",
    "d0e31965-0530-42d8-9995-d734d1d1b20a.jpg",
    "3138f5f3-691c-46f7-b827-5eec91cdebe7.jpg",
    "15ce670a-19b9-4685-b85f-76e994429bf1.jpg",
    "fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg",
    "613e002a-001c-4a4e-912f-90b75833213c.jpg",
    "d99d0679-23e1-4500-8e59-063e0bc3088d.jpg",
    "2935b944-aac2-4b40-bdd3-0ee94a0d4b4d.jpg",
]

PROJECT_PREFIX = "9cdf5cd0-327a-49a6-b274-7ec4148eeedf"
MAX_WIDTH = 1400
QUALITY = 80


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Сжимает фотографии галереи и фонов в лёгкие версии и сохраняет в S3. Возвращает новые URL."""
    method = event.get("httpMethod", "GET")
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=access_key,
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    results = []
    for name in SOURCE_IMAGES:
        src_url = f"https://cdn.poehali.dev/projects/{PROJECT_PREFIX}/bucket/{name}"
        req = urllib.request.Request(src_url, headers={"User-Agent": "img-optimizer"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw = resp.read()

        img = Image.open(io.BytesIO(raw))
        img = img.convert("RGB")
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)

        out = io.BytesIO()
        img.save(out, format="JPEG", quality=QUALITY, optimize=True, progressive=True)
        out.seek(0)
        data = out.getvalue()

        base = name.rsplit(".", 1)[0]
        key = f"optimized/{base}.jpg"
        s3.put_object(
            Bucket="files",
            Key=key,
            Body=data,
            ContentType="image/jpeg",
            CacheControl="public, max-age=31536000",
        )
        cdn = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
        results.append({
            "source": name,
            "url": cdn,
            "original_kb": round(len(raw) / 1024),
            "optimized_kb": round(len(data) / 1024),
        })

    return {
        "statusCode": 200,
        "headers": {**cors, "Content-Type": "application/json"},
        "body": json.dumps({"images": results}, ensure_ascii=False),
    }
