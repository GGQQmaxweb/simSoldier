import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_keys = [k.strip() for k in os.getenv("GEMINI_API_KEY", "").split(",") if k.strip()]
if not api_keys:
    print("GEMINI_API_KEY not found in environment.")
    exit(1)

for i, api_key in enumerate(api_keys, 1):
    print(f"\n--- Testing API Key #{i} ---")
    try:
        client = genai.Client(api_key=api_key)
        print("Listing models...")
        for model in client.models.list():
            print(f"Model: {model.name}")
    except Exception as e:
        print(f"Error listing models for key #{i}: {e}")
