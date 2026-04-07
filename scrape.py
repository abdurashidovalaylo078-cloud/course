import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request("https://www.youtube.com/playlist?list=PLtJ-ufoDnA2DDcPhReJXU06cCF6KtE6eo", headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')

ids = set()
vids = []

for match in re.finditer(r'\"title\":\{\"runs\":\[\{\"text\":\"(.*?)\"\}\].*?\"videoId\":\"([a-zA-Z0-9_-]{11})\"', html):
    t, v = match.group(1), match.group(2)
    t = t.replace('\\u0026', '&')
    if v not in ids and t != "Private video":
        ids.add(v)
        vids.append({"id": v, "title": t})

with open('vids.json', 'w', encoding='utf-8') as f:
    json.dump(vids, f)
print("Saved", len(vids))
