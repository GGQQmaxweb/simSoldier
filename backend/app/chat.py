from google import genai
import chromadb
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key:
    try:
        client = genai.Client(api_key=api_key)
    except Exception as e:
        print(f"Failed to initialize Gemini client: {e}")

# Setup local vector database
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="my_knowledge_base")

# Example Data
documents = [
    "Our company policy allows for 20 days of PTO per year.",
    "The office is located at 123 AI Lane, San Francisco.",
    "Remote work is supported for all engineering roles."
]
prompt_template = """
    Use the following context to answer the question.
    If the answer is not in the context, say so.
    
    Context: {context}
    User Info: {user_info}
    Question: {question}
    """

# Generate embeddings and store them
if client:
    try:
        for i, text in enumerate(documents):
            result = client.models.embed_content(
                model="models/gemini-embedding-001",
                contents=text
            )
            collection.add(
                ids=[str(i)],
                embeddings=[result.embeddings[0].values],
                documents=[text]
            )
    except Exception as e:
        print(f"Failed to generate/store embeddings: {e}")

def ask_gemini(user_info:dict,question: str):
    if not client:
        return "Chat service is currently unavailable (API Key missing or invalid)."

    try:
        # 1. Embed the question
        result = client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=question
        )
        
        # 2. Search for similar documents
        results = collection.query(
            query_embeddings=[result.embeddings[0].values],
            n_results=2
        )
        
        # 3. Build context from search results
        if results['documents']:
             context = "\n".join(results['documents'][0])
        else:
             context = ""
        
        # 4. Ask Gemini with the context
        prompt = prompt_template.format(context=context, user_info=user_info, question=question)
        
        response = client.models.generate_content(
            model="models/gemini-2.0-flash",
            contents=prompt
        )
        
        return response.text
    except Exception as e:
        print(f"Error during chat: {e}")
        return f"I'm sorry, I'm having trouble connecting to my brain right now. Error: {str(e)}"

# Test
if __name__ == "__main__":
    print(ask_gemini({}, "How many days of PTO do employees get?"))