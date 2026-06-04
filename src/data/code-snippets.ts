export const codeSnippets: Record<string, { language: string; snippet: string }> = {
  "pre-python": {
    language: "python",
    snippet: `import asyncio
import httpx
from dataclasses import dataclass

@dataclass
class LLMResponse:
    model: str
    content: str
    latency_ms: float

async def call_model(client: httpx.AsyncClient, model: str) -> LLMResponse:
    import time
    start = time.monotonic()
    # replace with real API call
    await asyncio.sleep(0.1)
    return LLMResponse(model=model, content="response", latency_ms=(time.monotonic()-start)*1000)

async def main() -> None:
    sem = asyncio.Semaphore(2)          # max 2 concurrent calls

    async def guarded(model: str) -> LLMResponse:
        async with sem:
            async with httpx.AsyncClient() as client:
                return await asyncio.wait_for(call_model(client, model), timeout=30)

    models = ["gpt-4o", "claude-3-5-sonnet", "llama-3.3-70b"]
    results = await asyncio.gather(*[guarded(m) for m in models], return_exceptions=True)
    for r in results:
        if isinstance(r, Exception):
            print(f"failed: {r}")
        else:
            print(f"{r.model}: {r.latency_ms:.0f}ms")

asyncio.run(main())`,
  },

  "pre-backend": {
    language: "python",
    snippet: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

app = FastAPI()
security = HTTPBearer()

class RunRequest(BaseModel):
    message: str

class RunResponse(BaseModel):
    response: str

def verify_token(creds: HTTPAuthorizationCredentials = Depends(security)) -> str:
    if creds.credentials != "secret-token":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return creds.credentials

@app.post("/agents/{agent_id}/run", response_model=RunResponse)
async def run_agent(agent_id: str, body: RunRequest, _: str = Depends(verify_token)):
    # replace with real agent call
    return RunResponse(response=f"Agent {agent_id} processed: {body.message}")

@app.get("/health")
async def health():
    return {"status": "ok"}`,
  },

  "agent-basics": {
    language: "python",
    snippet: `import json
from datetime import datetime, timezone
from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_time",
            "description": "Return the current UTC time.",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    }
]

def get_time() -> str:
    return datetime.now(timezone.utc).isoformat()

messages = [{"role": "user", "content": "What time is it right now?"}]

while True:
    resp = client.chat.completions.create(model="gpt-4o", tools=tools, messages=messages)
    msg = resp.choices[0].message
    messages.append(msg)

    if msg.tool_calls:
        for tc in msg.tool_calls:
            result = get_time() if tc.function.name == "get_time" else "unknown tool"
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})
    else:
        print(msg.content)
        break`,
  },

  "agent-loop": {
    language: "python",
    snippet: `# ReAct: Reason + Act pattern
import json
from openai import OpenAI

client = OpenAI()

SYSTEM = """You are a research agent.
Respond with JSON: {"thought": "...", "action": "search"|"finish", "input": "..."}
When done, use action=finish and put your answer in input."""

def search(query: str) -> str:
    return f"[mock results for '{query}']"

messages = [
    {"role": "system", "content": SYSTEM},
    {"role": "user", "content": "Compare LangChain and LlamaIndex GitHub stars."},
]

for step in range(10):
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        response_format={"type": "json_object"},
    )
    raw = resp.choices[0].message.content
    data = json.loads(raw)
    print(f"[step {step+1}] thought={data['thought'][:60]}...")

    if data["action"] == "finish":
        print("Answer:", data["input"])
        break

    observation = search(data["input"])
    messages += [
        {"role": "assistant", "content": raw},
        {"role": "user", "content": f"Observation: {observation}"},
    ]`,
  },

  "agent-tools": {
    language: "python",
    snippet: `from typing import Any

# Good tool definition — clear description tells LLM when and how to use it
web_search_tool = {
    "type": "function",
    "function": {
        "name": "web_search",
        "description": (
            "Search the web for current information. Use when you need facts "
            "that may have changed after your training cutoff, or when the user "
            "asks about recent events, prices, or live data."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query"},
                "num_results": {
                    "type": "integer",
                    "description": "Number of results (1-10)",
                    "minimum": 1,
                    "maximum": 10,
                    "default": 5,
                },
            },
            "required": ["query"],
        },
    },
}

def web_search(query: str, num_results: int = 5) -> dict[str, Any]:
    try:
        # real implementation would call Tavily / SerpAPI
        return {"results": [{"title": "Result", "url": "https://example.com", "snippet": "..."}]}
    except Exception as e:
        return {"error": str(e)}  # return error as data, never raise`,
  },

  "tools-function-calling": {
    language: "python",
    snippet: `from openai import OpenAI
from anthropic import Anthropic

tools_openai = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city.",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

tools_anthropic = [{
    "name": "get_weather",
    "description": "Get current weather for a city.",
    "input_schema": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"],
    },
}]

def get_weather(city: str) -> str:
    return f"Sunny, 22°C in {city}"

# OpenAI
oai = OpenAI()
resp = oai.chat.completions.create(
    model="gpt-4o", tools=tools_openai,
    messages=[{"role": "user", "content": "Weather in Tokyo?"}],
)
if resp.choices[0].message.tool_calls:
    tc = resp.choices[0].message.tool_calls[0]
    import json; args = json.loads(tc.function.arguments)
    print(get_weather(**args))

# Anthropic
ant = Anthropic()
resp2 = ant.messages.create(
    model="claude-3-5-sonnet-20241022", tools=tools_anthropic, max_tokens=256,
    messages=[{"role": "user", "content": "Weather in Paris?"}],
)
for block in resp2.content:
    if block.type == "tool_use":
        print(get_weather(**block.input))`,
  },

  "mcp-building": {
    language: "python",
    snippet: `from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

mcp = FastMCP("my-agent-tools")

class SearchResult(BaseModel):
    title: str
    url: str
    snippet: str

@mcp.tool()
def web_search(query: str, num_results: int = 5) -> list[SearchResult]:
    """Search the web for current information about any topic."""
    # replace with real search API call
    return [SearchResult(title="Result", url="https://example.com", snippet="...")]

@mcp.tool()
def read_file(path: str) -> str:
    """Read a file from the /docs/ directory and return its contents."""
    if not path.startswith("/docs/"):
        return "Error: access restricted to /docs/"
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        return f"Error: file not found: {path}"

@mcp.resource("config://agent")
def get_config() -> str:
    """Return the current agent configuration as JSON."""
    import json
    return json.dumps({"model": "claude-3-5-sonnet", "max_steps": 25})

if __name__ == "__main__":
    mcp.run()  # stdio transport by default`,
  },

  "rag-fundamentals": {
    language: "python",
    snippet: `from openai import OpenAI
import numpy as np

client = OpenAI()

def chunk_text(text: str, size: int = 400, overlap: int = 100) -> list[str]:
    words = text.split()
    chunks, i = [], 0
    while i < len(words):
        chunks.append(" ".join(words[i : i + size]))
        i += size - overlap
    return chunks

def embed(texts: list[str]) -> np.ndarray:
    resp = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return np.array([r.embedding for r in resp.data])

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return (b @ a) / (np.linalg.norm(b, axis=1) * np.linalg.norm(a))

# --- index documents ---
docs = ["Your document text here..."]
chunks = [c for doc in docs for c in chunk_text(doc)]
vectors = embed(chunks)  # shape: (n_chunks, 1536)

# --- query ---
query = "What is RAG?"
q_vec = embed([query])[0]
scores = cosine_similarity(q_vec, vectors)
top_k = np.argsort(scores)[-5:][::-1]
context = "\n\n".join(chunks[i] for i in top_k)

answer = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": f"Answer using this context:\n{context}"},
        {"role": "user", "content": query},
    ],
)
print(answer.choices[0].message.content)`,
  },

  "rag-vectordbs": {
    language: "python",
    snippet: `import chromadb
from openai import OpenAI

client = OpenAI()
chroma = chromadb.PersistentClient(path="./chroma_db")
collection = chroma.get_or_create_collection("docs")

def embed(texts: list[str]) -> list[list[float]]:
    resp = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return [r.embedding for r in resp.data]

# --- index ---
chunks = ["Chunk one about agents.", "Chunk two about RAG.", "Chunk three about tools."]
collection.add(
    ids=[f"chunk-{i}" for i in range(len(chunks))],
    documents=chunks,
    embeddings=embed(chunks),
    metadatas=[{"source": "doc.pdf", "page": i} for i in range(len(chunks))],
)

# --- query ---
query = "How do agents use tools?"
results = collection.query(
    query_embeddings=embed([query]),
    n_results=3,
    include=["documents", "metadatas", "distances"],
)
for doc, meta, dist in zip(
    results["documents"][0], results["metadatas"][0], results["distances"][0]
):
    print(f"[score={1-dist:.3f}] [{meta['source']}] {doc}")`,
  },

  "memory-types": {
    language: "python",
    snippet: `import json
from openai import OpenAI
import psycopg2

client = OpenAI()

def extract_facts(conversation: list[dict]) -> dict:
    """Extract key facts from a conversation for long-term storage."""
    resp = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "Extract user facts as JSON: {name, preferences, requests}"},
            *conversation,
        ],
    )
    return json.loads(resp.choices[0].message.content)

def build_prompt_with_memory(user_id: str, new_message: str, conn) -> list[dict]:
    """Inject relevant long-term memories into the system prompt."""
    cur = conn.cursor()
    cur.execute("SELECT facts FROM user_memory WHERE user_id = %s", (user_id,))
    row = cur.fetchone()
    memory_str = json.dumps(row[0]) if row else "{}"

    return [
        {
            "role": "system",
            "content": f"You are a helpful assistant.\nUser memory: {memory_str}",
        },
        {"role": "user", "content": new_message},
    ]`,
  },

  "pe-structured": {
    language: "python",
    snippet: `from openai import OpenAI
import json

client = OpenAI()

def analyze_with_cot(task: str, data: str) -> dict:
    """Chain-of-Thought structured prompting with XML delimiters."""
    prompt = f"""<task>{task}</task>

<data>
{data}
</data>

Think step by step before answering. Respond with JSON:
{{"reasoning": "step-by-step analysis", "answer": "final answer", "confidence": 0.0-1.0}}"""

    resp = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a precise analytical assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    return json.loads(resp.choices[0].message.content)

result = analyze_with_cot(
    task="Identify the top performing product and explain why.",
    data="Product A: $12k revenue, Product B: $8k revenue, Product C: $15k revenue",
)
print(f"Answer: {result['answer']}")
print(f"Reasoning: {result['reasoning']}")`,
  },

  "prod-development": {
    language: "python",
    snippet: `import asyncio
import redis.asyncio as redis
import json
from tenacity import retry, wait_exponential, stop_after_attempt
from openai import AsyncOpenAI

client = AsyncOpenAI()
cache = redis.from_url("redis://localhost:6379")

@retry(wait=wait_exponential(min=1, max=60), stop=stop_after_attempt(3))
async def call_llm(messages: list[dict]) -> str:
    resp = await client.chat.completions.create(model="gpt-4o", messages=messages)
    return resp.choices[0].message.content

async def run_agent(run_id: str, goal: str, max_steps: int = 25) -> str:
    state = {"goal": goal, "step": 0, "messages": [{"role": "user", "content": goal}]}

    for step in range(max_steps):
        state["step"] = step
        # checkpoint after every step
        await cache.setex(f"run:{run_id}", 3600, json.dumps(state))

        try:
            reply = await asyncio.wait_for(call_llm(state["messages"]), timeout=30)
        except asyncio.TimeoutError:
            return "Error: step timed out"

        if "[DONE]" in reply:
            return reply.replace("[DONE]", "").strip()

        state["messages"].append({"role": "assistant", "content": reply})

    return "Error: max steps reached"`,
  },

  "deploy-infra": {
    language: "yaml",
    snippet: `# .github/workflows/deploy.yml
name: Deploy Agent

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip

      - name: Install & test
        run: |
          pip install -r requirements.txt
          pytest --tb=short -q

      - name: Build & push image
        run: |
          docker build -t ghcr.io/\${{ github.repository }}:\${{ github.sha }} .
          echo "\${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u $ --password-stdin
          docker push ghcr.io/\${{ github.repository }}:\${{ github.sha }}

      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: agent-api
          region: us-central1
          image: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
  },

  "git-19-1": {
    language: "yaml",
    snippet: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: "0 9 * * 1"   # every Monday 9am
  workflow_dispatch:        # manual trigger button

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11", cache: pip }
      - run: pip install ruff && ruff check .

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11", cache: pip }
      - run: pip install -r requirements.txt && pytest -q

  weekly-eval:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Weekly model evaluation running"`,
  },

  "git-17-1": {
    language: "yaml",
    snippet: `# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.4
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: [--baseline, .secrets.baseline]

  - repo: local
    hooks:
      - id: no-env-files
        name: block .env files
        entry: bash -c 'git diff --cached --name-only | grep -q "\.env$" && exit 1 || exit 0'
        language: system
        pass_filenames: false`,
  },
};
