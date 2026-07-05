import re
import json

with open(r'C:\Users\tejes\.gemini\antigravity-ide\brain\138ac2df-be26-4b13-93ed-f93280f071a7\.system_generated\steps\201\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r'https://framerusercontent\.com/(?:images|assets)/[^\s"\'\)>]+', content)
urls = list(set(urls))

print(json.dumps(urls, indent=2))
