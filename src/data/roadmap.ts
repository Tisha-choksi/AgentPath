export interface RoadmapNode {
  id: string;
  icon: string;
  label: string;
  level: "beginner" | "intermediate" | "advanced";
  concept: string;
  deepDive?: string;
  keyPoints: string[];
  project: string;
  stack: string[];
  resources: { title: string; url: string }[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  nodes: RoadmapNode[];
}

export const roadmapData: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Prerequisites",
    subtitle: "foundations",
    accent: "#64748B",
    bg: "#141820",
    nodes: [
      {
        id: "pre-python",
        icon: "🐍",
        label: "Python & Async",
        level: "beginner",
        concept:
          "Python is the primary language of AI engineering. You need deep fluency across the entire language before you can build agents effectively.\n\nData types are your foundation: int, float, str, bool, list, dict, tuple, set, None. Each has specific methods and performance characteristics — list is O(1) for append/pop, dict is O(1) for key lookup. Collections module extends these: deque for O(1) left/right pops, defaultdict for missing-key defaults, Counter for frequency counting, and namedtuple for lightweight immutable records.\n\nControl flow structures execution: if/elif/else for branching, for loops with range() and enumerate() for indexed iteration, while loops for condition-based repetition, and match/case (Python 3.10+) for pattern matching. Comprehensions are Pythonic: [x*2 for x in items if x > 0] is faster and cleaner than a manual for loop with append.\n\nFunctions are first-class objects — you can pass them as arguments, return them from other functions, and assign them to variables. Lambda creates anonymous single-expression functions. *args captures positional arguments into a tuple; **kwargs captures keyword arguments into a dict. Decorators wrap functions to add behavior — @lru_cache memoizes results, @contextmanager turns a generator into a context manager.\n\nOOP organizes code around objects. A class is a blueprint; an instance is a concrete object. __init__ is the constructor. self is the instance reference. Inheritance lets one class derive from another — Child(Parent) inherits all methods and can override them. super() calls the parent's version. @property makes a method look like an attribute — great for computed values and encapsulation without getter boilerplate. @classmethod receives the class instead of the instance, useful for alternative constructors. @staticmethod is a plain function namespaced inside a class. Dunder methods (__str__, __repr__, __len__, __eq__, __hash__, __enter__/__exit__) make your objects work with Python's built-in protocols.\n\nException handling is critical for agent reliability. try/except catches exceptions; you should catch specific types (except ValueError:) rather than bare except:. else runs if no exception occurred. finally always runs — use for cleanup. raise lets you throw exceptions; you can re-raise from except to propagate after logging. Custom exception classes inherit from Exception — class LLMError(Exception): pass. Never swallow exceptions silently — logging and re-raising is better than hiding bugs.\n\nAsync/await is the most important skill for agent engineering. Python's event loop schedules and runs coroutines concurrently within a single thread. async def declares a coroutine function. await suspends the current coroutine until the awaited one completes, yielding control back to the event loop so other coroutines can run. This cooperative multitasking means a single process can handle hundreds of concurrent LLM calls without the overhead of threads or processes.\n\nasyncio.gather(*tasks) runs multiple coroutines concurrently and returns their results as a list. If one task raises, the default behavior cancels all others — use return_exceptions=True to collect errors alongside results. asyncio.create_task() schedules a coroutine to run in the background while you continue working. asyncio.wait_for() adds a timeout. asyncio.Semaphore limits concurrency to N simultaneous calls — essential for respecting API rate limits.\n\nType hints (PEP 484) make code self-documenting and catch bugs before runtime. mypy and pyright check types statically. Basic syntax: def search(query: str, max_results: int = 5) -> list[Result]:. Union[str, int] means either type. Optional[str] means str or None. Literal['openai', 'anthropic'] constrains to specific values. TypedDict gives structure to dicts. Protocols define structural subtyping — if it quacks like a duck, it is a duck.",
        keyPoints: [
          "Data types: int, float, str, bool, list (O(1) append/pop), dict (O(1) lookup), tuple (immutable), set (unique, O(1) membership), None",
          "Collections: deque (O(1) ends), defaultdict (no KeyError), Counter (frequency), namedtuple (lightweight records)",
          "Control flow: if/elif/else, for/while, match/case (3.10+), comprehensions [x for x in items if p(x)], enumerate for index+value",
          "Functions: first-class, lambda, *args /**kwargs, decorators (@lru_cache, @contextmanager), closures for stateful helpers",
          "OOP: class, __init__, self, super(), inheritance, @property, @classmethod, @staticmethod, dunder methods (__str__, __eq__, __enter__/__exit__)",
          "Exception handling: try/except (specific types), else, finally, raise, re-raise, custom exceptions (class LLMError(Exception)), never bare except",
          "Async: event loop, async def, await, cooperative multitasking, single-threaded concurrency, non-blocking I/O",
          "asyncio.gather(*tasks, return_exceptions=True) — parallel execution, error isolation per task",
          "asyncio.create_task() — fire-and-forget background work; asyncio.Semaphore(N) — cap concurrency at N",
          "asyncio.wait_for(coro, timeout=30) — fails with TimeoutError if it takes too long",
          "Type hints: def fn(x: int) -> str — checked by mypy/pyright; Union, Optional, Literal, TypedDict, Protocol",
          "File I/O: with open('file', 'r') as f — auto-close; aiofiles for async file reads in agent pipelines",
        ],
        project:
          "Build an async parallel LLM caller. Define a mock_llm_call(model: str, prompt: str, delay: float) async function that uses await asyncio.sleep(delay) to simulate latency. Use asyncio.gather() to call 3 models simultaneously and measure wall-clock time vs sequential execution. Add return_exceptions=True — make one mock fail and confirm the other two still complete. Wrap each call in asyncio.wait_for() with a 5-second timeout. Use a Semaphore(2) to limit to 2 concurrent calls even when 5 tasks are submitted. Log start/end timestamps for each call. Structure everything with dataclasses: @dataclass class LLMResponse: model: str; content: str; tokens: int; latency_ms: float. Write type hints on every function signature. Finally, replace the mocks with real httpx.AsyncClient calls to a free API (or OpenAI-compatible local server) and confirm the same pattern works with real HTTP.",
        stack: ["Python 3.11+", "asyncio", "httpx", "mypy", "dataclasses"],
        resources: [
          { title: "Python Asyncio Official Docs", url: "https://docs.python.org/3/library/asyncio.html" },
          { title: "Real Python Async IO Tutorial", url: "https://realpython.com/async-io-python/" },
          { title: "PEP 484 — Type Hints", url: "https://peps.python.org/pep-0484/" },
          { title: "Python's collections module docs", url: "https://docs.python.org/3/library/collections.html" },
          { title: "mypy documentation", url: "https://mypy-lang.org/" },
        ],
      },
      {
        id: "pre-backend",
        icon: "⚡",
        label: "FastAPI & APIs",
        level: "beginner",
        concept:
          "Every production AI agent runs behind a web API. FastAPI is the standard for Python agent backends — async, fast, auto-documented. You need to understand: HTTP methods (GET/POST/PUT/DELETE), JSON request/response bodies, authentication (JWT Bearer tokens), status codes, and Pydantic for validation. Your agent backend will expose endpoints like POST /agents/{id}/run and GET /agents/{id}/status.",
        keyPoints: [
          "FastAPI: @app.post('/run'), Pydantic request/response models, automatic /docs",
          "HTTP: GET=read, POST=create, 200=ok, 201=created, 422=validation error, 401=auth",
          "JWT: Authorization: Bearer <token> — verify on every protected endpoint",
          "Pydantic: type-safe request/response — invalid JSON returns 422 automatically",
          "Async endpoints: async def run_agent() — never block the event loop",
        ],
        project:
          "Build a minimal agent API with FastAPI: POST /agents/{id}/run (accepts {message}, runs a mock agent, returns {response}). Add JWT authentication. Add a GET /health endpoint. Deploy it locally, test every endpoint in Swagger UI, verify 401 without a token.",
        stack: ["FastAPI", "Pydantic", "uvicorn"],
        resources: [
          { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/" },
        ],
      },
      {
        id: "pre-git",
        icon: "🌿",
        label: "Git & Terminal",
        level: "beginner",
        concept:
          "Terminal and Git are the developer's primary interface with the system. You'll use them constantly: running agents, managing environments, deploying code, and collaborating. Git tracks every prompt change, config tweak, and code revision — essential for AI projects where small changes have big effects. GitHub is where teams collaborate on agent code and where you showcase your work.",
        keyPoints: [
          "Terminal: cd, ls, mkdir, rm, grep, cat, pipes — navigate without a GUI",
          "venv / conda: always use a virtual environment for Python projects",
          "git init, add, commit, push, pull — the daily workflow",
          "Branching: feature branches for experiments, never commit directly to main",
          "GitHub: push your AI projects — your public portfolio for jobs",
        ],
        project:
          "Set up a professional AI project repo: Python venv, .gitignore (exclude .env, __pycache__, *.pt), pre-commit hooks for linting, a README with architecture diagram, a CONTRIBUTING.md, and GitHub Actions CI that runs pytest on every PR. This is the scaffolding you'll use for every future project.",
        stack: ["Git", "GitHub", "Terminal", "pre-commit"],
        resources: [
          { title: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
        ],
      },
    ],
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "LLM Fundamentals",
    subtitle: "understanding models",
    accent: "#3B82F6",
    bg: "#0d1929",
    nodes: [
      {
        id: "llm-architecture",
        icon: "🧠",
        label: "Transformers, Tokens & Embeddings",
        level: "beginner",
        concept:
          "LLMs are transformer-based next-token predictors trained on internet-scale text. Tokens are sub-word units — 'diamond' is 1 token, 'anthropic' is 2. The context window is the maximum tokens the model can see at once (input + output). Embeddings are dense numerical vectors representing semantic meaning — similar texts have similar vectors. Understanding these fundamentals determines every architectural decision you'll make.",
        deepDive: `If your goal is to become an LLM Engineer or AI Agent Engineer, then the most important topic in LLM Fundamentals is:

1. Transformers

Before Transformers, NLP used:

RNN (Recurrent Neural Networks)
LSTM (Long Short-Term Memory)
GRU (Gated Recurrent Unit)

These models processed text sequentially — each word had to wait for the previous one.

Problems:

Slow training
Hard to parallelize
Forget long context
Vanishing gradients
Poor long-range understanding

Example:

The cat that lived in the house across the road from the school that was built in 1980 was sleeping.

An RNN may forget what "cat" refers to by the time it reaches "sleeping". This problem led to the Transformer.

What is a Transformer?

A Transformer is a neural network architecture introduced in:

"Attention Is All You Need" (2017)

Core idea:

Instead of reading words sequentially, every word can look at every other word simultaneously.

This makes Transformers:

Faster
More scalable
Better at understanding long-range context

Transformer Pipeline:

Input Text
↓
Tokenization
↓
Token Embeddings
↓
Positional Encoding
↓
Attention Layers
↓
Feed Forward Layers
↓
Output Probabilities
↓
Next Token Prediction

Self-Attention

This is the heart of Transformers. Every word computes relationships with every other word.

Consider:

The animal didn't cross the street because it was tired.

Humans know "it" refers to "animal". The transformer learns this using attention scores over all words.

Query, Key and Value

Every token creates:

Query (Q) — What am I looking for?
Key (K) — What information do I contain?
Value (V) — What information should I provide?

Attention scores determine which words matter most for each word's meaning.

Multi-Head Attention

Instead of one attention mechanism, Transformers use multiple heads. Each head learns something different.

Head 1: Apple → Company
Head 2: released → Action
Head 3: iPhone → Product

Each head captures different relationships simultaneously.

Positional Encoding

Attention alone doesn't know word order. Without position, "Dog bites man" and "Man bites dog" look identical. Transformers add positional information so word order is preserved.

Feed Forward Network

After attention, each token passes through a neural network to extract deeper features, learn complex patterns, and refine token representations.

Residual Connections

Allow information to skip layers — enabling stable training, faster convergence, and very deep models like GPT-4.

Encoder vs Decoder

Encoder (BERT, RoBERTa) — understanding, classification, search, embeddings.
Decoder (GPT, Llama, Mistral) — generation, chat, writing, coding.
Encoder-Decoder (T5, BART) — translation, summarization.

2. Tokens

LLMs never see text. They only see numbers.

What is a Token?

A token is the smallest unit an LLM processes. "Hello world" becomes [15496, 995] — the model processes IDs, not words.

Why Not Words?

Vocabulary is too large. Instead, "ChatGPT" splits into: Chat, G, PT. This is called subword tokenization.

Types of Tokenization:

Character: H, e, l, l, o — tiny vocab but very long sequences.
Word: Hello, World — easy but huge vocabulary.
Subword: "unbelievable" → un, believ, able — best of both worlds.

Tokenization Algorithms:

BPE (Byte Pair Encoding) — GPT, Llama
WordPiece — BERT
SentencePiece — T5, Gemini

Special Tokens:

BOS — Beginning of sequence
EOS — End of sequence
PAD — Padding
SEP — Separator
CLS — Classification token

Context Window:

The maximum tokens a model can process at once. Examples: 8K, 32K, 128K, 200K, 1M+. Larger windows allow longer conversations and bigger RAG systems.

Token Pricing:

APIs charge per token — input and output separately. Understanding token count is critical for production cost control.

3. Embeddings

Embeddings are arguably the most important concept behind RAG.

What is an Embedding?

An embedding is a numerical representation of meaning. "Cat" becomes [0.12, -0.55, 0.89, ...] — thousands of numbers capturing semantic meaning.

Semantic Space

Imagine a 1536-dimensional universe where similar words cluster together. Cat, Dog, Tiger cluster in one region. Car, Airplane, Truck form another cluster entirely.

Similarity Search:

Semantic search finds similar meaning even with different wording. Query "How do I train an LLM?" retrieves documents about "Large language model training techniques..."

Similarity Metrics:

Cosine Similarity — measures angle between vectors, most common.
Euclidean Distance — measures physical distance between vector tips.
Dot Product — used in many vector databases.

Embedding Models:

OpenAI: text-embedding-3-small, text-embedding-3-large
Open source: BGE, E5, Instructor, Sentence Transformers

Embeddings in RAG:

Document
↓
Chunking
↓
Embedding Model
↓
Vector Database
↓
Similarity Search
↓
Retrieved Context
↓
LLM

Full Picture:

Text
↓
Tokenization
↓
Tokens
↓
Embeddings
↓
Transformer Layers
↓
Attention
↓
Reasoning
↓
Next Token Prediction
↓
Response

Master these six concepts — Transformers, Self-Attention, Tokenization, Context Windows, Embeddings, and Similarity Search — and you'll have the foundation needed for RAG, Fine-Tuning, LangChain, LangGraph, MCP, AI Agents, and Production AI Applications.`,
        keyPoints: [
          "Transformer: self-attention layers let each token attend to all others — captures context",
          "Tokenization: text → integer IDs via BPE/SentencePiece — 1 token ≈ 0.75 words",
          "Context window: GPT-4o 128k, Claude 3.5 Sonnet 200k — max tokens in+out",
          "Embeddings: text → 1536-dim float vector — cosine similarity measures relatedness",
          "tiktoken: count tokens before sending — avoid context overflow and manage cost",
        ],
        project:
          "Experiment with tokenization: use tiktoken to count tokens in 10 different prompts. Send a prompt that fills 90% of GPT-4's context window and observe behavior. Use OpenAI's embedding API to embed 20 sentences and find the most similar pairs using cosine similarity.",
        stack: ["tiktoken", "OpenAI API", "numpy"],
        resources: [
          { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
        ],
      },
      {
        id: "llm-models",
        icon: "🏛️",
        label: "Model Types & Families",
        level: "beginner",
        concept:
          "Not all AI models are built for the same purpose. Understanding model types is critical because you need to choose the right model for RAG, coding, agents, fine-tuning, embeddings, and production. The major families — GPT, Claude, Gemini, Llama, Qwen, Mistral, DeepSeek — each have distinct architectures and training philosophies.\n\nA model family is a collection of models built using the same architecture but released in different sizes or versions. GPT evolved from GPT-1 through GPT-4o, Llama from 1 through 4, Qwen from 1 through 3. Each generation improves on the last.\n\nThe most important distinction: Open Weight models (Llama, Qwen, Mistral, Gemma, DeepSeek) let you download, fine-tune, and self-host — full control, privacy, no per-token costs, but you need GPUs. Closed Weight models (GPT-4o, Claude, Gemini) are API-only — best performance, no infrastructure, but vendor lock-in and API costs that grow with scale.",
        keyPoints: [
          "Model family = same architecture/training methodology, different sizes and versions",
          "Major families: GPT, Claude, Gemini, Llama, Qwen, Mistral, DeepSeek, Gemma",
          "Open weight: download, fine-tune, self-host — Llama, Qwen, Mistral, Gemma, DeepSeek",
          "Closed weight: API-only — GPT-4o, Claude, Gemini — best perf, no infra, vendor lock-in",
          "Foundation model = large pretrained model on internet-scale data — base for all downstream apps",
        ],
        deepDive: `# Model Types & Families — Complete Reference

## 1. What is a Model Family?

A model family is a collection of models built using the same architecture and training methodology but released in different sizes or versions.

Examples:

GPT Family: GPT-1 → GPT-2 → GPT-3 → GPT-3.5 → GPT-4 → GPT-4 Turbo → GPT-4o
Llama Family: Llama 1 → Llama 2 → Llama 3 → Llama 3.1 → Llama 4
Qwen Family: Qwen 1 → Qwen 2 → Qwen 2.5 → Qwen 3
Gemini Family: Gemini 1.0 → Gemini 1.5 → Gemini 2.x

## 2. Open Weight vs Closed Weight

Open Weight models are publicly available. You can download, fine-tune, host, and modify them. Examples: Llama, Qwen, Mistral, Gemma, DeepSeek. Advantages: full control, privacy, custom fine-tuning, lower long-term costs. Disadvantages: need GPUs, infrastructure management, maintenance.

Closed Weight models hide their weights — API-only access. Examples: GPT-4o, Claude, Gemini. Advantages: best performance, no infrastructure, easy deployment. Disadvantages: API costs, vendor lock-in, limited customization.

## 3. Foundation Models

A Foundation Model is a large pretrained model trained on massive datasets. These models learn language, reasoning, coding, and general knowledge. They serve as the base for many downstream applications. Examples: GPT-4o, Claude, Gemini, Llama, Qwen.

## 4. Base Models

A Base Model is trained only for next-token prediction. It has not been instructed to behave like a chatbot. Prompt "What is the capital of France?" may continue text unpredictably. Characteristics: raw language modeling, not aligned, not instruction-following. Examples: Llama Base, GPT Base models.

Base Model → further trained → Instruct Model
Instruct Model → conversational tuning → Chat Model

## 5. Instruct Models

Base models are further trained to follow instructions. Prompt "Explain quantum computing in simple terms" gets a proper response. Characteristics: better instruction following, safer outputs, better user interactions. Examples: Llama Instruct, Qwen Instruct, GPT Chat models.

## 6. Chat Models

Built specifically for conversations. Features: multi-turn memory, conversational tuning, human preference alignment. Examples: ChatGPT, Claude, Gemini Chat, Llama Chat. Applications: assistants, customer support, research agents.

## 7. Reasoning Models

Designed to perform deeper reasoning before answering. Characteristics: multi-step thinking, planning, problem solving, tool usage. Examples: OpenAI reasoning models, DeepSeek-R1, Qwen reasoning variants. Applications: math, coding, agent planning, complex decision making.

## 8. Code Models

Specialized for programming tasks. Training data: GitHub repositories, documentation, source code. Capabilities: code generation, debugging, refactoring, test creation. Examples: Codex, DeepSeek-Coder, CodeLlama, Qwen-Coder. Applications: AI software engineers, coding assistants.

## 9. Embedding Models

These models generate vectors, not text. Input "How to learn machine learning?" → Output [0.12, -0.44, 0.77, ...]. Applications: semantic search, RAG, similarity search, recommendations. Examples: text-embedding-3-small, text-embedding-3-large, BGE, E5.

## 10. Reranker Models

Used after retrieval to improve quality. Workflow: User Query → Vector Search → Top 50 Docs → Reranker → Top 5 Docs → LLM. Purpose: improve retrieval quality, increase RAG accuracy. Examples: BGE Reranker, Cohere Reranker.

## 11. Multimodal Models

Process multiple data types: text, images, audio, video. Examples: GPT-4o, Gemini, Claude, Qwen-VL. Applications: image analysis, document understanding, visual agents.

## 12. Vision-Language Models (VLMs)

Specialized multimodal models. Can understand: screenshots, diagrams, charts, documents. Examples: GPT-4o Vision, Gemini Vision, LLaVA, Qwen-VL. Applications: OCR, UI automation, medical imaging.

## 13. Speech Models

Speech-to-Text: Whisper, Deepgram. Text-to-Speech: ElevenLabs, OpenAI TTS. Applications: voice agents, call centers, meeting assistants.

## 14. Small Language Models (SLMs)

Smaller models — usually 1B–10B parameters. Examples: Phi, Gemma Small, TinyLlama. Advantages: faster, cheaper, local deployment. Applications: edge devices, mobile AI, lightweight agents.

## 15. Large Language Models (LLMs)

Typically 20B–1000B+ parameters. Examples: GPT-4o, Claude, Gemini, Llama 405B. Advantages: better reasoning, generalization, more knowledge. Applications: enterprise AI, research agents, complex automation.

## 16. Mixture of Experts (MoE)

Instead of activating the whole model, only selected experts are used. Architecture: Input → Router → Selected Experts → Output. Advantages: faster inference, lower compute, larger effective capacity. Examples: DeepSeek-V3, Mixtral, some Gemini variants.

## 17. Domain-Specific Models

Fine-tuned for specific industries. Medical: clinical LLMs, healthcare assistants. Legal: contract analysis, legal research. Finance: risk analysis, trading systems.

## 18. Agent-Oriented Models

Optimized for tool calling and workflows. Capabilities: function calling, structured outputs, planning, tool selection. Examples: GPT-4o, Claude, Gemini, Qwen-Agent variants. Applications: AI agents, multi-agent systems, autonomous workflows.

## What Every AI Engineer Should Know

Model Categories: Base, Instruct, Chat, Reasoning, Code, Embedding, Multimodal
Model Access: Open Weight vs Closed Weight
Architecture: Dense vs Mixture of Experts
Deployment: Local, API, Cloud Hosted
Major Families: GPT, Claude, Gemini, Llama, Qwen, Mistral, DeepSeek, Gemma`,
        project:
          "Run the same prompt on 4 different model types: a reasoning model (DeepSeek-R1), a code model (DeepSeek-Coder), a multimodal model (GPT-4o vision), and a standard chat model (Claude). Compare their outputs for a task that plays to each strength. Then build a model router that selects the right model based on task type: reasoning, coding, vision, or general chat.",
        stack: ["OpenAI API", "Anthropic API", "Ollama", "DeepSeek API"],
        resources: [
          { title: "Chatbot Arena Leaderboard", url: "https://lmarena.ai/" },
          { title: "Open LLM Leaderboard", url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard" },
          { title: "Artificial Analysis (Benchmarks)", url: "https://artificialanalysis.ai/" },
        ],
      },
      {
        id: "llm-parameters",
        icon: "🎛️",
        label: "Parameters, Streaming & Pricing",
        level: "beginner",
        concept:
          "Parameters control how an LLM generates responses — think of them as settings that influence behavior without changing the model itself. Temperature is the most important: low (0–0.3) gives deterministic outputs for coding and structured data, medium (0.5–0.8) balances creativity for chat, high (1.0–2.0) produces diverse creative writing. Top-P (nucleus sampling) considers only the top probability mass — low Top-P is safer, high Top-P is more diverse.\n\nStreaming sends tokens as they're generated instead of waiting for the full response — critical for UX because perceived latency drops from 5s to 0.5s. Pricing is token-based: input tokens (prompts, history, context) and output tokens (generated text). Hidden cost drivers: chat history grows continuously, RAG context adds documents, agent tool outputs loop back into the model. A single agent request may invoke 4–10 model calls.",
        keyPoints: [
          "Temperature: 0–0.3 deterministic (code, SQL), 0.5–0.8 balanced (chat), 1.0–2.0 creative (writing)",
          "Top-P: lower = more focused, higher = more diverse — use either Temperature or Top-P, not both aggressively",
          "Max tokens: prevents runaway generations and excessive costs",
          "Streaming: token-by-token delivery — TTFT (time to first token) is the critical UX metric",
          "Cost = (input_tokens × input_rate) + (output_tokens × output_rate) — history, RAG, and agent loops are hidden multipliers",
        ],
        deepDive: `# Parameters, Streaming & Pricing — Complete Reference

## 1. Model Parameters

Parameters control how an LLM generates responses. Without changing the model itself, you can make it more creative, deterministic, concise, diverse, or focused.

### Temperature

The most important generation parameter. Controls randomness in token selection.

Low Temperature (0.0–0.3): Predictable, consistent, deterministic. Best for coding, SQL, data extraction, structured outputs. Question "What is 2 + 2?" → always "4".

Medium Temperature (0.5–0.8): Balanced creativity and consistency. Best for general chat, AI assistants, educational applications.

High Temperature (1.0–2.0): Creative, diverse, unpredictable. Best for story writing, brainstorming, creative content. Each response to "Write a fantasy kingdom" may be completely different.

### Top-P (Nucleus Sampling)

Controls how many possible next tokens are considered. Instead of looking at all possible tokens, the model only considers the most likely tokens whose cumulative probability reaches P. Example: Top-P = 0.9 uses only the top 90% probability mass.

Low Top-P: safer, more focused. High Top-P: more diverse, more creative.

Most providers recommend using either Temperature or Top-P — not both aggressively.

Common production settings:
- Chat Applications: Temperature = 0.7, Top-P = 1.0
- Coding: Temperature = 0.1, Top-P = 1.0
- Creative Writing: Temperature = 1.0, Top-P = 1.0

### Max Tokens

Controls maximum response length. If Max Tokens = 100, the model stops after approximately 100 generated tokens. Prevents excessive costs, runaway generations, and unnecessarily long outputs. Used heavily in AI agents, customer support bots, and RAG systems.

### Stop Sequences

Custom stopping rules. When the model generates a stop sequence like "User:", generation halts. Useful for agents, structured outputs, and multi-turn conversations.

### Frequency Penalty

Reduces repetition. Without penalty: "Python is great. Python is great. Python is great." With penalty: the model avoids repeating identical words frequently.

### Presence Penalty

Encourages new topics. High presence penalty: model explores new ideas rather than repeating previous concepts. Useful for brainstorming and creative generation.

### Seed

Used for reproducibility. Generates identical outputs across multiple runs. Important for testing, evaluation, and benchmarks.

### Context Window

One of the most important concepts in LLM engineering. The maximum number of tokens a model can process at once. Everything — system prompt, user prompt, chat history, RAG context, tool results, generated response — must fit inside the context window.

Context sizes: Small (8K, 16K, 32K), Medium (128K, 200K), Large (1M+).

Solutions when context is exceeded: summarization, context compression, RAG, memory systems.

## 2. Streaming

Streaming is how modern AI chat applications feel fast. Without streaming, the user waits for the entire response to be generated. With streaming, tokens are sent immediately as generated — "The capital of France is Paris" appears token-by-token instead of all at once.

Benefits: Better user experience (immediate feedback), lower perceived latency (actual 5s response feels like 0.5s), better agent interactions (agents stream thoughts progressively — "Searching... Analyzing... Comparing results...").

Streaming challenges: partial responses need buffering, network connections can break, tool calls often pause streaming during execution.

Streaming in agents: modern agents stream thoughts, tool results, and final responses progressively.

## 3. Pricing

Most providers charge per token. You pay for input tokens (everything sent to the model — system prompt, user message, chat history, RAG context) and output tokens (everything generated by the model — final response, agent reasoning).

Total Cost = (Input Tokens × Input Rate) + (Output Tokens × Output Rate)

Cached tokens: some providers offer discounts for repeated context (e.g., large system prompt sent repeatedly).

Hidden cost drivers: chat history grows with every message, RAG context adds documents, agent tool outputs loop back into the model. A single agent request may invoke 4–10 model calls.

### Cost Optimization Techniques
- Context Compression: reduce unnecessary text
- Summarization: replace long conversations with summaries
- Smart Chunking: retrieve only relevant documents
- Model Routing: simple tasks use small/cheap models, complex tasks use large models
- Caching: reuse previous results

### Throughput Metrics
- Tokens Per Second (TPS): how quickly a model generates text
- Latency: time until first token appears
- Time To First Token (TTFT): critical for streaming applications
- Total Response Time: complete generation duration

Every AI engineer must understand Temperature, Top-P, Max Tokens, Stop Sequences, Context Window, Streaming, TTFT, Token Pricing, and Cost Optimization — these directly impact the quality, speed, scalability, and profitability of every AI application.`,
        project:
          "Build a parameter tuning tool: run the same creative writing prompt at temperatures 0, 0.3, 0.7, 1.0, 1.5. Run the same factual question at temperatures 0 and 0.7. Visualize how outputs differ. Then build a cost estimator that calculates monthly LLM cost given expected request volume, including hidden costs from history growth and RAG context. Finally, implement streaming for an agent and measure TTFT with and without streaming.",
        stack: ["OpenAI API", "Anthropic API"],
        resources: [
          { title: "OpenAI API Parameters Guide", url: "https://platform.openai.com/docs/api-reference/chat/create" },
          { title: "Anthropic API Parameters Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/text-generation" },
        ],
      },
    ],
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    title: "AI Agents 101",
    subtitle: "what are agents",
    accent: "#10B981",
    bg: "#0a1f18",
    nodes: [
      {
        id: "agent-basics",
        icon: "🤖",
        label: "Agent Components & Use Cases",
        level: "beginner",
        concept:
          "An AI Agent is a system that uses an LLM as its brain and combines it with tools, memory, planning, and execution to accomplish tasks autonomously. A traditional chatbot just does User → LLM → Answer. An agent does: Goal → Reasoning → Planning → Tool Usage → Observation → Memory → Final Result.\n\nCore components: LLM (the brain — decides, plans, interprets), Prompt/System Instructions (defines role, capabilities, restrictions), Planner (converts goals into tasks — single-step, multi-step, or dynamic), Memory (short-term for current conversation, long-term across sessions, episodic for experiences, semantic for facts), Tools (search, calculator, databases, files, APIs, code execution), Tool Calling System (LLM decides tool → tool executes → result returned → LLM interprets), Execution Layer (carries out actions), Observation Layer (inspects results), Reflection Layer (self-evaluates and improves), State Management (tracks everything the agent knows), and the Agent Loop (Goal → Reason → Plan → Act → Observe → Reflect → Repeat).",
        keyPoints: [
          "Agent ≠ chatbot: agents reason, plan, use tools, observe, and adapt — chatbots just generate text",
          "Core components: LLM (brain) + Planner + Memory + Tools + Execution + Observation + Reflection",
          "Memory types: short-term (session), long-term (persistent), episodic (experiences), semantic (facts)",
          "Agent loop: Goal → Reason → Plan → Act → Observe → Reflect → Repeat — the foundation of autonomy",
          "State management tracks everything — conversation history, plan, tool results, user preferences",
        ],
        deepDive: `Before building LangGraph agents, MCP servers, or multi-agent systems, you must understand what actually makes an AI Agent.

Many beginners think:

User → LLM → Response

That is simply an LLM-powered chatbot, not an AI agent.

A true AI Agent can:

Reason
Plan
Use tools
Remember information
Take actions
Observe results
Adapt behavior

What is an AI Agent?

An AI Agent is a system that uses an LLM as its brain and combines it with tools, memory, planning, and execution capabilities to accomplish tasks autonomously.

Traditional Chatbot:

User
↓
LLM
↓
Answer

AI Agent:

User
↓
Goal
↓
Reasoning
↓
Planning
↓
Tool Usage
↓
Observation
↓
Memory
↓
Final Result

Core Components of an AI Agent

Every production AI Agent contains some variation of these components.

1. LLM (The Brain)

The LLM is the central decision-making component — it understands user requests, generates plans, makes decisions, interprets tool outputs, and generates final responses.

Examples:

GPT-4o
Claude
Gemini
Qwen
Llama

The LLM decides what actions to take based on the goal and available tools.

2. Prompt / System Instructions

Every agent starts with instructions that define agent role, capabilities, restrictions, and objectives. The prompt defines the agent's entire behavior and personality.

3. Planner

The planner converts goals into tasks. Without planning, an agent behaves reactively. With planning, it behaves strategically.

Types of Planning:

Single-Step: Goal → Action — simple agents.
Multi-Step: Goal → Subtasks → Execution — most production agents.
Dynamic: Goal → Plan → Observe → Adjust → Continue — advanced agents.

4. Memory

Memory allows agents to retain information across interactions.

Short-Term Memory:

Current conversation context — resets each session.

Long-Term Memory:

Persists across sessions — preferred language, past projects, user preferences.

Episodic Memory:

Stores past experiences — "Last month user built a RAG application."

Semantic Memory:

Stores facts — "User works on AI projects."

5. Tools

Tools allow agents to interact with the outside world. Without tools, an agent only knows its training data. With tools, it can access real-time information.

Tool Types:

Search — Google, Tavily, SerpAPI (research, fact verification)
Calculator — math, financial analysis, statistics
Database — query records, analytics
File — read PDFs, analyze CSVs
API — weather, stock data, CRM
Code Execution — data science, automation, analysis

6. Tool Calling System

Tool calling connects the LLM to external tools.

User Question
↓
LLM Decides Tool Needed
↓
Tool Called
↓
Result Returned
↓
LLM Interprets Result
↓
Final Response

7. Execution Layer

Responsible for carrying out actions — API requests, database operations, browser automation, sending emails. Transforms plans into concrete actions.

8. Observation Layer

After every action, the agent inspects results — Did the action succeed? Are results relevant? Is another action needed? Observation is what enables autonomous behavior.

9. Reflection Layer

Advanced agents evaluate themselves. After generating an answer, they self-review and improve it. Questions asked: Did I answer correctly? Did I miss information? Should I search again?

10. State Management

State is everything the agent currently knows — conversation history, current plan, tool results, memory, user preferences. State management is one of the hardest parts of agent engineering.

11. Agent Loop

Goal
↓
Reason
↓
Plan
↓
Act
↓
Observe
↓
Reflect
↓
Repeat

This loop is the foundation of all autonomous systems.

Real-World AI Agent Use Cases

Research Agent

Searches the web, collects and analyzes information, produces reports.

Components Used:

LLM
Search Tool
Planner
Memory

RAG Agent

Answers company-specific questions using vector search.

Components Used:

Embeddings
Vector Database
Retriever
LLM

Data Analyst Agent

Reads CSVs, runs Python analysis, creates charts, generates insights.

Components Used:

Python Execution
Data Processing
Visualization

AI SDR Agent

Finds potential customers, enriches lead data, generates outreach.

Components Used:

Search Tools
CRM APIs
Email Systems

Customer Support Agent

Handles support requests using a knowledge base and ticketing system.

Components Used:

Knowledge Base
Ticketing API
Memory

Coding Agent

Plans, writes code, runs tests, and fixes bugs autonomously. Examples: Claude Code, Codex, Cursor Agents.

Multi-Agent System

Instead of one agent handling everything, specialized agents collaborate:

Research Agent
↓
Planning Agent
↓
Writing Agent
↓
Review Agent

Each agent specializes in one task. Used in enterprise workflows, research systems, and autonomous organizations.`,
        project:
          "Build your first agent from scratch in ~50 lines of Python — no framework. Start with a raw LLM call, then add: a planner (decompose goal into steps), 2 tools (get_time() and search_web(query)), memory (store conversation history), an observation layer (check if results are valid), and the agent loop (Reason → Act → Observe → Repeat). Confirm it chains 3+ steps to answer 'What time is it in Tokyo right now?'. Then extend it into a research agent that searches, collects, analyzes, and reports.",
        stack: ["Python", "OpenAI API"],
        resources: [
          { title: "ReAct Paper (Reason + Act)", url: "https://arxiv.org/abs/2210.03629" },
          { title: "OpenAI Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
        ],
      },
      {
        id: "agent-loop",
        icon: "🔄",
        label: "The Agent Loop",
        level: "beginner",
        concept:
          "The agent loop is the core execution pattern: Perception (receive inputs — user messages, tool results, context), Reasoning (LLM thinks about what to do), Planning (decide the next action), Action (call a tool or produce output), Observation (read the tool result), Reflection (evaluate progress). The ReAct pattern (Reason + Act) formalizes this as: Thought → Action → Observation → repeat.",
        deepDive: `What is an Agent Loop?

A traditional chatbot works like this:

User
↓
LLM
↓
Response

One request. One response. Done.

An AI Agent works differently:

Goal
↓
Think
↓
Plan
↓
Act
↓
Observe
↓
Evaluate
↓
Repeat

The agent continuously loops until the goal is completed. This repeated cycle is called the Agent Loop.

Why Do Agents Need a Loop?

A normal LLM receives a question and generates a single answer. An agent instead performs multiple iterations — Search → Analyze → Compare → Search Again → Verify → Generate Report — which requires a loop.

Core Agent Loop

Observe
↓
Reason
↓
Plan
↓
Act
↓
Observe
↓
Reflect
↓
Repeat

Step 1: Goal Reception

Everything starts with a goal. The agent decides what is being requested and how to approach it.

Step 2: Observation

The agent collects all available context before acting.

Sources:

User prompt
Chat history
Memory
Tool outputs
Documents
APIs

Step 3: Reasoning

The reasoning phase answers: What should I do? The LLM acts as the brain — determining approach, identifying what data is needed, and deciding which tools to use. This reasoning is invisible to users.

Step 4: Planning

Reasoning determines strategy. Planning breaks strategy into tasks.

Types of Planning:

Single-Step: Question → Tool → Answer — simple agents.
Multi-Step: Goal → Subtasks → Execution — most production agents.
Dynamic: Goal → Plan → Observe → Update Plan → Continue — advanced agents.

Step 5: Action

After planning, the agent takes action.

Action Types:

Search the web
Query database
Read PDF
Execute code
Call API
Use MCP tool

Step 6: Observation (Again)

After every action, the agent inspects results — Are results useful? Is more data needed? Do we have enough information? The loop returns to observation.

Step 7: Reflection

Reflection is self-evaluation. The agent asks: Did I achieve the goal? Is information complete? Should I search again? Is my answer reliable? Reflection makes agents smarter and more accurate.

Step 8: Decision

After reflection, the agent chooses to continue the loop or finish the task.

Goal Complete?
↓
Yes → Generate Final Response
No → Continue Loop

Step 9: Final Response

When confidence is sufficient, the agent exits the loop and generates the final answer.

Complete Agent Loop:

Goal
↓
Observe
↓
Reason
↓
Plan
↓
Act
↓
Observe
↓
Reflect
↓
Goal Completed? → Yes → Response
↓ No
Loop

ReAct Pattern

Most modern agents follow ReAct — Reason + Act.

Thought
↓
Action
↓
Observation
↓
Thought
↓
Action
↓
Observation
↓
Answer

Planner-Executor Loop

Used in advanced agents with separate planning and execution stages.

Planner
↓
Tasks
↓
Executor
↓
Results
↓
Planner

Reflection Loop

Advanced agents generate, critique, and improve their own output.

Generate
↓
Review
↓
Improve
↓
Review Again

Used in Deep Research, Coding Agents, and Writing Agents.

Tool-Augmented Agent Loop

Most production agents:

Goal
↓
Reason
↓
Choose Tool
↓
Execute Tool
↓
Observe Result
↓
Reason Again
↓
Choose Next Tool

This may repeat 5, 10, 50, or even 100 times for complex tasks.

Agent Loop in RAG:

Question
↓
Retrieve Documents
↓
Observe Documents
↓
Reason
↓
Need More? → Retrieve Again
↓
Generate Answer

Agent Loop in Coding Agents:

Read Files
↓
Analyze Code
↓
Plan Fix
↓
Edit Code
↓
Run Tests
↓
Observe Errors
↓
Fix Again
↓
Run Tests
↓
Success

Agent Loop in Research Agents:

Search
↓
Read Sources
↓
Extract Information
↓
Identify Gaps
↓
Search Again
↓
Compare Sources
↓
Generate Report

Agent Loop in Multi-Agent Systems:

Planner Agent
↓
Research Agent
↓
Analysis Agent
↓
Writer Agent
↓
Reviewer Agent

Each agent runs its own independent loop.

Failure Conditions Without Safeguards

Infinite Loop — agent keeps searching forever without stopping.
Hallucinated Actions — agent believes a tool succeeded when it failed.
Wrong Planning — bad task decomposition leads to irrelevant actions.
Tool Misuse — using the wrong tool for the task.

Production Safeguards:

Max iterations — stop after N loops (e.g. 10–25 steps)
Time limits — stop after N seconds (e.g. 60 seconds)
Token budget — stop after N tokens consumed
Human approval — require confirmation for critical or irreversible actions`,
        keyPoints: [
          "Perception: collect all available context — user message, history, tool results",
          "Reasoning: LLM reads the context and decides what to do next",
          "Action: call a tool (tool_name + arguments) or output the final answer",
          "Observation: append tool result to context — LLM sees what happened",
          "Reflection: agent evaluates whether the goal is achieved or another step is needed",
        ],
        project:
          "Instrument your from-scratch agent to log each loop iteration: print the Thought, Action, Observation, and iteration count. Give it a multi-step task: 'Research the top 3 AI agent frameworks, compare their GitHub stars, and recommend the best one for a beginner.' Observe every step.",
        stack: ["Python", "OpenAI API"],
        resources: [
          { title: "ReAct Paper", url: "https://arxiv.org/abs/2210.03629" },
        ],
      },
      {
        id: "agent-tools",
        icon: "🛠️",
        label: "Tool Usage Fundamentals",
        level: "beginner",
        concept:
          "Tools are the bridge between an LLM's reasoning and the real world. A tool has: a name, a description (critical — the LLM uses this to decide when to call it), an input schema (parameters with types and descriptions), and an output (returned to the LLM as an observation). Tool selection quality depends entirely on how well you write descriptions. Poor descriptions = wrong tool calls.",
        deepDive: `Tool usage is what separates an AI Agent from a simple LLM chatbot.

Without tools:

User
↓
LLM
↓
Answer

Knowledge is limited to training data.

With tools:

User
↓
LLM
↓
Tool
↓
External World
↓
LLM
↓
Answer

Now the agent can interact with reality.

What is a Tool?

A tool is any external capability that an AI agent can invoke to perform actions or retrieve information.

Humans use:

Google
Calculator
Browser
Excel
Email

Agents use:

Search APIs
Calculator Functions
Browser Tools
Database Queries
External APIs

Why Do Agents Need Tools?

LLMs have limitations:

Cannot access real-time information
Cannot execute actions
Cannot query databases
Cannot browse websites
Cannot interact with external systems

Tools remove every one of these limitations.

Tool Usage Lifecycle

Every tool call follows a standard process.

User Request
↓
Reasoning
↓
Tool Selection
↓
Tool Execution
↓
Result Observation
↓
Interpretation
↓
Response

Tool Selection

One of the most critical agent skills — the agent decides: Do I need a tool? If yes, which one?

Tool Description

Every tool requires clear documentation. The LLM reads the description to decide when to call it.

Name:

The tool's identifier.

Purpose:

What the tool does — written for the LLM, not for humans.

Inputs:

What parameters are required (city name, query string, file path).

Outputs:

What the tool returns (temperature, search results, file contents).

Poor descriptions cause wrong tool selection. Precise descriptions cause correct tool selection.

Tool Calling Architecture

The LLM never executes tools directly. It requests execution.

LLM
↓
Tool Request
↓
Tool Executor
↓
Tool Result
↓
LLM

Observation After Tool Use

After every execution, the agent inspects results.

Questions:

Is this enough information?
Need another search?
Need verification?

This observation step determines whether the loop continues or terminates.

Single Tool Usage

Question
↓
Tool
↓
Answer

Sequential Tool Usage

Output from one tool becomes input for the next.

Search Company
↓
Get Website
↓
Scrape Website
↓
Analyze Content

Parallel Tool Usage

Multiple tools run simultaneously for faster responses and reduced latency.

Search Tool
Database Tool
Weather Tool

executed together.

Multi-Tool Chaining

Advanced agents chain tools to complete complex workflows.

Find Leads
↓
Enrich Leads
↓
Generate Email
↓
Send Email

Common in AI SDR systems and research pipelines.

Types of Tools

Search Tools:

Find current information (Tavily, SerpAPI, Bing Search). Used for research agents, news analysis, and market intelligence.

Calculator Tools:

Perform precise calculations. Used for finance, statistics, and any math where LLM arithmetic cannot be trusted.

File Tools:

Read documents — PDF, CSV, Excel, JSON, Word. Used for document analysis and data processing.

Database Tools:

Access structured data (PostgreSQL, MySQL, MongoDB). Used for analytics, CRM queries, and inventory systems.

API Tools:

Connect external systems (Stripe, GitHub, Salesforce, HubSpot). Used for business automation and workflows.

Browser Tools:

Navigate websites, click buttons, fill forms, extract data. Used for web automation and research.

Code Execution Tools:

Run Python for data analysis, visualization, and automation. Used in data analyst agents and coding agents.

Communication Tools:

Send emails, Slack messages, SMS, and notifications. Used for outreach, alerts, and escalation.

Tool Reliability

Tools can and do fail.

Common failures:

API Errors — 404, 500 responses
Timeout — request takes too long
Invalid Inputs — missing or wrong parameters
Authentication Failures — expired API key
Rate Limits — too many requests

Agents must handle every failure gracefully.

Tool Error Recovery

Retry:

Attempt the same tool again.

Fallback:

Search Tool A
↓ Failed
Search Tool B

Escalation:

Inform the user and ask for help.

Tool Permissions

Not every tool should be fully autonomous.

Safe (no approval needed):

Search
Calculator
Read-only database queries

Risky (require approval):

Delete database records
Transfer money
Send emails to customers

Tool Security

Agents must defend against:

Prompt Injection — malicious instructions embedded inside retrieved documents.
Tool Abuse — excessive or unauthorized API calls.
Unauthorized Actions — accessing restricted systems via crafted inputs.

Always validate tool inputs. Never trust content retrieved from the web as instructions.

MCP and Tools

Modern agents increasingly use MCP (Model Context Protocol). MCP standardizes tool access — instead of custom API integrations for every tool, MCP provides a standard interface that any compatible agent can consume.

Benefits:

Easier integrations
Reusable tools across agents
Better interoperability

Tool Usage in Production Agents

ChatGPT Deep Research:

Search
↓
Browsing
↓
Citation Retrieval

Claude Code:

Terminal
↓
File System
↓
Git

Cursor Agent:

Codebase Search
↓
Terminal
↓
File Editing

AI SDR Agent:

CRM
↓
Search
↓
Email`,
        keyPoints: [
          "Tool definition: name, description, parameters (JSON Schema) — passed to the LLM",
          "Good description: 'Search the web for current information about any topic' — when to use it",
          "Bad description: 'Searches the web' — too vague, model won't know when to call it",
          "Tool result: must be serializable to string — JSON, plain text, or structured response",
          "Error handling: tool must return errors as strings, not raise exceptions — LLM needs to see what went wrong",
        ],
        project:
          "Define 5 tools with excellent descriptions: web_search, get_weather, send_email, read_file, query_database. Implement 3 of them (mock 2). Test that the LLM consistently picks the right tool for 20 different task descriptions. Track how often tool selection is correct.",
        stack: ["Python", "OpenAI API"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    title: "Prompt Engineering",
    subtitle: "the art of instruction",
    accent: "#F59E0B",
    bg: "#1f1a0d",
    nodes: [
      {
        id: "pe-fundamentals",
        icon: "✍️",
        label: "Effective Prompts & Few-Shot",
        level: "beginner",
        concept:
          "The prompt is the program. A well-engineered prompt specifies: role (who the model is), context (background information), task (exactly what to do), constraints (what not to do), and output format (how to structure the response). Few-shot prompting provides 3–5 examples of input/output pairs before the actual input — dramatically improves accuracy on classification, extraction, and format-adherence tasks.",
        deepDive: `Prompt engineering is the skill of communicating with an LLM effectively. A well-designed prompt can improve performance more than switching to a more expensive model.

What is a Prompt?

A prompt is the information provided to the model that guides its behavior.

It can include:

Instructions
Context
Examples
Constraints
Goals
Data

Basic flow:

Prompt
↓
LLM
↓
Response

Why Prompt Engineering Matters

Two people using the same model get completely different results. The difference is prompt quality.

Poor Prompt:

Summarize this document.

Good Prompt:

Summarize this document for a CTO. Focus on technical risks, infrastructure costs, and scalability concerns. Maximum 300 words. Use bullet points.

Same model. Dramatically different output quality.

Anatomy of an Effective Prompt

A production-quality prompt contains:

Role
Task
Context
Constraints
Output Format

Component 1: Role

Tell the model who it should be. Roles activate relevant knowledge and reasoning patterns.

Examples:

You are a senior software architect.
You are a financial analyst.
You are an AI research assistant.

Component 2: Task

Clearly define what the model should do. Be specific — vague tasks produce vague outputs.

Bad:

Talk about AI.

Good:

Compare RAG and Fine-Tuning for a customer support use case.

Component 3: Context

Provide necessary background. Context dramatically improves answer relevance.

Example:

We are building an AI customer support platform for e-commerce companies. Compare RAG and Fine-Tuning for this use case.

Component 4: Constraints

Specify boundaries to reduce ambiguity.

Examples:

Maximum 200 words.
Use bullet points.
Do not use technical jargon.
Only discuss open-source tools.

Component 5: Output Format

Tell the model exactly how to structure its response. Production systems depend on this.

Examples:

Return valid JSON.
Return a Markdown table.
Return a numbered list.
Return only the final answer, no explanation.

The Golden Rule

Never assume the model knows what you want. Always specify: who, what, why, how, and format.

Zero-Shot Prompting

The model receives instructions only — no examples. It relies entirely on prior training.

Instruction
↓
Model
↓
Output

Advantages:

Simple
Fast
Low token cost

Disadvantages:

Less reliable
Higher output variation

One-Shot Prompting

Provide one example before the task.

Example
↓
Instruction
↓
New Input
↓
Output

The model learns the desired format from the single demonstration.

Few-Shot Prompting

Provide multiple examples before the task. One of the most important prompt engineering techniques.

Examples
↓
Pattern Recognition
↓
Task Understanding
↓
Prediction

Why Few-Shot Works

The model learns desired format, reasoning style, output structure, and behavior — without any retraining.

Few-Shot for Classification

Example 1:

Review: Excellent product
Sentiment: Positive

Example 2:

Review: Poor customer support
Sentiment: Negative

Now:

Review: Fast delivery and good quality
Sentiment: ?

The model follows the established pattern reliably.

Few-Shot for Structured Extraction

Example:

Text: John works at Google.
Output: {"name": "John", "company": "Google"}

Providing several examples makes extraction dramatically more reliable.

Few-Shot for SQL Generation

Example:

Question: Show all users
SQL: SELECT * FROM users;

Example:

Question: Show all orders
SQL: SELECT * FROM orders;

The model learns the SQL pattern from examples.

Few-Shot for Agent Tool Selection

Examples teach the agent when to use which tool.

Question: What's the weather in Tokyo?
Action: Use Weather Tool

Question: What is 50 × 20?
Action: Use Calculator Tool

Few-Shot vs Fine-Tuning

Few-Shot:

Examples live inside the prompt.
Fast, no training required, easy to modify.
Consumes context window tokens.

Fine-Tuning:

Examples become permanent training data.
Smaller prompt size, consistent behavior.
Requires training time and compute.

Choosing Good Few-Shot Examples

Relevant — match real tasks your system will encounter.
Diverse — cover different scenarios and edge cases.
High quality — the model imitates your examples exactly.
Consistent — use the same format throughout all examples.

Common Few-Shot Mistakes

Too few examples — one example may not capture enough patterns.
Too many examples — wastes context window and increases cost.
Inconsistent formats — mixing JSON, Markdown, and plain text confuses the model.
Poor quality examples — the model will faithfully reproduce your mistakes.

Prompt Templates

Production systems use templates, not dynamically written prompts.

ROLE
↓
TASK
↓
CONTEXT
↓
EXAMPLES
↓
CONSTRAINTS
↓
OUTPUT FORMAT

Full Agent Prompt Example

Role:

You are a Senior Research Analyst.

Task:

Answer user questions using available tools. Always verify facts. Use search when information may be outdated. Cite all sources.

Example:

Question: Latest AI funding news
Action: Search Tool
Observation: Results found
Answer: Summarized findings

Output:

Markdown report with citations.

This is essentially how most modern production agents are guided.`,
        keyPoints: [
          "System prompt: persistent instructions — role, capabilities, constraints",
          "User message: the dynamic input — question, task, or context",
          "Few-shot: 'Input: X, Output: Y' examples before the real input",
          "3–5 examples covers most cases — more doesn't always help",
          "Negative examples: show what NOT to output — as effective as positive ones",
        ],
        project:
          "Build a prompt testing framework: run 10 different prompts for the same task (email classification), evaluate accuracy on 20 labeled examples, track which prompt wording produces the highest accuracy. Compare zero-shot vs 3-shot vs 5-shot performance on the same task.",
        stack: ["OpenAI API", "Python"],
        resources: [
          { title: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
        ],
      },
      {
        id: "pe-structured",
        icon: "📋",
        label: "Structured Prompting & CoT",
        level: "intermediate",
        concept:
          "Structured prompting uses XML/JSON tags to delimit sections — making it easier for the model to parse complex prompts. Chain-of-Thought (CoT) instructs the model to reason step-by-step before answering — dramatically improves accuracy on math, logic, and multi-step problems. The key insight: 'think step by step' is not magic — it allocates more tokens (computation) to the reasoning phase.",
        deepDive: `Structured Prompting and Chain of Thought directly affect accuracy, reliability, reasoning quality, tool usage, agent performance, RAG systems, and multi-agent systems. Most production AI systems use both.

Why Normal Prompts Often Fail

An unstructured prompt like "Analyze whether we should use RAG or Fine-Tuning" gives the model no framework. It may skip important details, give incomplete answers, use inconsistent structure, or miss key decision factors.

What is Structured Prompting?

Structured Prompting organizes a prompt into clearly defined sections so the model knows its role, the task, the information to use, the process to follow, and the required output format.

Unstructured Prompt:

Tell me about PostgreSQL indexing.

Structured Prompt:

Role: Senior Database Engineer
Task: Explain PostgreSQL indexing.
Audience: Backend Developers
Requirements: Explain B-Tree indexes, Hash indexes, include examples.
Output: Markdown with headings.

Same model. Dramatically more useful output.

Benefits of Structured Prompting:

Better consistency — outputs become predictable.
Better accuracy — less ambiguity for the model.
Easier evaluation — responses can be compared consistently.
Better agent performance — agents need highly structured instructions.

Core Components of a Structured Prompt

Role:

Defines who the model should act as. Activates relevant knowledge patterns.

Task:

Defines the objective clearly and specifically.

Context:

Provides background information the model needs.

Constraints:

Define boundaries — word limits, format requirements, what to avoid.

Output Format:

Defines the exact response structure — JSON, Markdown, table, numbered list.

Structured Prompt Template

Role
↓
Task
↓
Context
↓
Instructions
↓
Constraints
↓
Output Format

This pattern is used extensively in LangChain, LangGraph, OpenAI Agents, CrewAI, and AutoGen.

What is Chain of Thought (CoT)?

Chain of Thought is a prompting technique that encourages the model to reason through a problem step by step before producing a final answer.

Without CoT:

Question
↓
Answer

With CoT:

Question
↓
Reasoning
↓
Answer

Why CoT Works

LLMs often know the correct answer but fail because they attempt to answer too quickly. CoT forces intermediate reasoning steps, allocating more computation to the problem before committing to an output.

Example without CoT:

A store sells a laptop for $1000. A 10% discount is applied. Then 5% tax is added. What is the final price?

Model may produce wrong arithmetic.

Example with CoT:

Step 1: 10% discount on $1000 → $900
Step 2: Add 5% tax to $900 → $945
Final price: $945

Accuracy improves significantly.

Types of Chain of Thought

Zero-Shot CoT:

Question
↓
Let's think step by step.
↓
Answer

Adding "Let's think step by step" often improves reasoning with no examples required.

Few-Shot CoT:

Provide examples that demonstrate the reasoning process. More effective than Zero-Shot CoT on complex tasks.

Problem → Reasoning → Answer
Problem → Reasoning → Answer
New Problem → ?

Explicit CoT:

The reasoning process is directly specified in the prompt.

Follow these steps:
1. Identify variables
2. Analyze relationships
3. Solve problem
4. Verify solution
5. Produce answer

Structured CoT:

Reasoning itself becomes structured output.

Problem Analysis
↓
Assumptions
↓
Reasoning
↓
Solution
↓
Verification
↓
Final Answer

Used heavily in enterprise production agents.

CoT for Decision Making

Should we use RAG or Fine-Tuning?

Step 1: Identify requirements
Step 2: Evaluate RAG
Step 3: Evaluate Fine-Tuning
Step 4: Compare costs
Step 5: Make recommendation

Much better than asking for a direct answer.

CoT for Tool Selection in Agents

What is the weather in Tokyo?

Reasoning:

Need current information.
Current information requires external data.
Use Weather Tool.

This is how agents decide which tool to use at each step.

ReAct: Reason + Act

One of the most influential agent frameworks — combines reasoning with action.

Thought
↓
Action
↓
Observation
↓
Thought
↓
Action
↓
Observation
↓
Answer

Without reasoning:

Question
↓
Tool
↓
Answer

With ReAct reasoning:

Question
↓
Analyze
↓
Plan
↓
Select Tool
↓
Execute
↓
Interpret
↓
Answer

Structured Prompting + CoT Combined

Role:
Research Analyst

Task:
Compare AWS and Azure

Reasoning Process:
1. Compare services
2. Compare pricing
3. Compare scalability
4. Compare ecosystem

Output:
Executive Summary

This combination produces highly reliable and consistent outputs.

When to Use CoT

Use CoT for:

Math and arithmetic problems
Logical reasoning and analysis
Research and synthesis tasks
Planning and task decomposition
Agent tool selection workflows
Multi-step decisions and comparisons
Coding and debugging tasks

Avoid CoT for:

Simple factual lookups
Basic classification
Very short responses
Tasks where speed matters more than depth

Common Mistakes

Too little structure — vague prompts produce vague outputs.
Overly complex structure — huge prompts confuse models and inflate costs.
Missing output format — leads to inconsistent response shapes.
Unnecessary CoT — adding step-by-step reasoning to "What is the capital of France?" wastes tokens.

Advanced Reasoning Variants

After mastering CoT, the next techniques are:

Self-Consistency — generate multiple reasoning paths and take the majority answer.
Tree of Thoughts (ToT) — explore multiple reasoning branches simultaneously.
Graph of Thoughts (GoT) — complex multi-path reasoning networks.
Reflection — model critiques and revises its own reasoning output.
ReAct — reasoning combined with tool actions in an agent loop.`,
        keyPoints: [
          "XML tags: <context>...</context><task>...</task> — clear sections for complex prompts",
          "CoT trigger: 'Think step by step before answering' or 'First, reason through this...'",
          "Zero-shot CoT: just add 'Let's think step by step' — works on complex reasoning",
          "Few-shot CoT: provide examples with explicit reasoning chains",
          "Output constraints: 'Respond ONLY with valid JSON, no preamble' — strict format enforcement",
        ],
        project:
          "Test Chain-of-Thought on a complex task: use your agent to analyze a multi-step data pipeline problem. Compare answers with and without CoT. Measure accuracy on 20 test cases. Build a prompt template system that injects CoT for complex tasks and skips it for simple lookups.",
        stack: ["OpenAI API", "Anthropic API"],
        resources: [],
      },
      {
        id: "pe-advanced",
        icon: "🧩",
        label: "Tree of Thought & Self-Reflection",
        level: "intermediate",
        concept:
          "Tree of Thought (ToT) extends CoT by exploring multiple reasoning paths and selecting the best one — like a search tree. Self-Reflection asks the model to critique its own output and improve it iteratively. Self-Consistency runs the same prompt multiple times and takes the majority answer — reduces variance on reasoning tasks. These techniques are the backbone of high-accuracy agent prompting.",
        deepDive: `Tree of Thought and Self-Reflection are advanced reasoning techniques used in modern AI agents, research systems, coding agents, and autonomous workflows. They extend Chain of Thought (CoT).

Chain of Thought teaches a model to think step-by-step.
Tree of Thought teaches a model to explore multiple reasoning paths before choosing the best one.
Self-Reflection teaches a model to critique and improve its own reasoning.

Why Chain of Thought is Sometimes Not Enough

Traditional CoT follows a single path:

Problem
↓
Reasoning Path
↓
Answer

If the reasoning path is wrong early on, everything collapses:

Bad Step
↓
Bad Step
↓
Bad Step
↓
Wrong Answer

Humans rarely think in one straight line. Faced with a decision, a person considers Option A, Option B, Option C — then compares them. That is Tree of Thought, not Chain of Thought.

What is Tree of Thought?

Tree of Thought allows the model to explore multiple reasoning branches simultaneously.

Problem
↓
Branch A — Branch B — Branch C
↓
Evaluate Branches
↓
Best Answer

The model thinks about several possibilities before committing to one.

Why Tree of Thought Works

Many tasks have multiple valid approaches — business decisions, architecture design, research planning, coding strategies, product roadmaps. A single reasoning path may miss better alternatives. ToT explores the search space.

Example: RAG vs Fine-Tuning

Chain of Thought:

Analyze RAG
↓
Recommend RAG

Tree of Thought:

Branch A: RAG
Branch B: Fine-Tuning
Branch C: Hybrid Approach
↓
Compare All
↓
Select Best Option

Much more robust decision-making.

Components of Tree of Thought

Problem — the goal to solve.
Thought Generation — generate multiple possible approaches.
Branch Expansion — develop each approach further.
Evaluation — score each branch against criteria.
Selection — choose the best path.
Final Answer — generate response from the winning branch.

Tree Structure

Goal
↓
Thought A — Thought B — Thought C
↓          ↓           ↓
A1, A2    B1, B2      C1, C2

Each branch represents a distinct reasoning possibility.

Branch Evaluation

After expansion, each branch is scored.

Criteria:

Feasibility
Cost
Risk
Impact
Time to implement

Weak branches are pruned. Strong branches are expanded further.

Tree Search Strategies

Breadth-First Search — explore all branches equally. Comprehensive but expensive.
Depth-First Search — follow one branch deeply before trying others. Efficient but may miss better paths.
Best-First Search — evaluate and prioritize the most promising branches. Most modern systems use a variation of this.

Tree of Thought in AI Agents

Research Agent:

Research Question
↓
Strategy A — Strategy B — Strategy C
↓
Evaluate Results
↓
Choose Best Findings

Coding Agent:

Bug Found
↓
Fix A — Fix B — Fix C
↓
Test All Solutions
↓
Choose Best Fix

System Design Agent:

Build Chat System
↓
Monolith — Microservices — Serverless
↓
Compare
↓
Select Architecture

What is Self-Reflection?

Self-Reflection is the ability of a model to evaluate its own work before returning an answer.

Without reflection:

Generate Answer
↓
Return Answer

With reflection:

Generate Answer
↓
Review Answer
↓
Find Problems
↓
Improve Answer
↓
Return Answer

Why Reflection Matters

Models make mistakes — hallucinations, missing information, weak reasoning, incomplete solutions. Reflection helps detect and fix them before the answer reaches the user.

Reflection Loop

Task
↓
Generate
↓
Critique
↓
Improve
↓
Final Output

Reflection Questions

An agent reflecting on its own output may ask:

Did I fully answer the question?
Did I miss important information?
Are there contradictions in my reasoning?
Can I improve clarity or completeness?
Is my reasoning actually correct?

Types of Reflection

Single Reflection:

Generate → Review → Answer

Multi-Step Reflection:

Generate → Review → Improve → Review → Improve → Answer

Recursive Reflection:

Answer → Review → Review the Review → Improve

Used in advanced agent systems where quality is critical.

Reflection in Coding Agents

Write Code
↓
Run Tests
↓
Observe Errors
↓
Fix Code
↓
Retest

This is reflection through execution. Claude Code and similar systems use this pattern for every file edit.

Reflection in Research Agents

Search
↓
Summarize
↓
Evaluate Coverage
↓
Identify Gaps
↓
Search Again

Reflection identifies what is missing before generating a final report.

Reflection in RAG Systems

Retrieve Documents
↓
Generate Answer
↓
Check Confidence
↓
Need More Context?
↓
Retrieve Again
↓
Final Answer

Reflection improves retrieval quality by detecting insufficient context.

Reflection Prompts

Common instructions that trigger reflective behavior:

Review your answer and identify weaknesses.
Check for missing information and fill the gaps.
Verify consistency — do any statements contradict each other?
Critique this answer as if you were a domain expert.

Combining ToT and Reflection

Modern agent systems combine both techniques.

Problem
↓
Generate Multiple Paths
↓
Evaluate Paths
↓
Select Best Path
↓
Generate Solution
↓
Reflect
↓
Improve Solution
↓
Final Output

This consistently produces better results than simple CoT alone.

Real-World Applications

Deep Research Agents:

Multiple search strategies
Reflection on source quality
Iterative gap-filling and re-search

Coding Agents:

Multiple implementation options considered
Reflection through test execution
Automatic debugging loops

Business Analysis Agents:

Alternative strategies explored
Risk evaluation per branch
Recommendation refinement via reflection

Multi-Agent Systems:

Generator agents produce candidate ideas
Reviewer agents critique each one
Planner agents select the best path forward`,
        keyPoints: [
          "Tree of Thought: generate N thoughts → evaluate each → expand the best → repeat",
          "Self-reflection: 'Review your answer. Is it correct? Identify any errors and fix them.'",
          "Self-consistency: run same prompt 5× with temperature 0.7, take majority vote",
          "Planning prompts: 'Before acting, write a step-by-step plan. Then execute each step.'",
          "Critique-revise: generate draft → critique → revise — 3 rounds improves quality significantly",
        ],
        project:
          "Implement a self-reflection loop for your agent: after generating an answer, prompt a second LLM call to critique it ('What might be wrong with this answer?'), then a third call to revise based on the critique. Compare final answer quality against single-pass answers on 20 test cases.",
        stack: ["OpenAI API", "Python"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    title: "Tools & Function Calling",
    subtitle: "agent capabilities",
    accent: "#EF4444",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "tools-design",
        icon: "📐",
        label: "Tool Design & Schemas",
        level: "intermediate",
        concept:
          "Tool design is a product skill that every agent engineer must master. When people say Function Calling, Tool Calling, MCP Tools, LangGraph Nodes, or Agent Actions — they all share the same foundation: Tool + Schema + Execution. If Prompt Engineering teaches an LLM how to think, Tool Design teaches it how to act. Without tools, the model can only generate text; with them, it searches the web, executes code, queries databases, and drives real workflows.\n\nA tool has five parts: name, description, input schema, execution logic, and output schema. The name must clearly describe the action — get_weather beats tool1 every time. The description tells the model when to call the tool — 'Use when the user asks about real-time information' is far more useful than 'Searches the web.' The input schema uses JSON Schema: required fields, optional fields with defaults, types, enum for constrained values, and minimum/maximum for numeric ranges. Enums are especially powerful — restricting priority to ['low', 'medium', 'high'] prevents the model from hallucinating 'super-urgent.'\n\nOutput schema is where beginners cut corners. Production tools always return a consistent structure: {status: 'ok', data: {...}} on success, {status: 'error', error: '...'} on failure. Never raise unhandled exceptions from a tool — the agent loop breaks. The Function Calling pipeline is: Model → Tool Call (JSON) → Execution Engine → Result (string) → Model continues. Parallel tool calling lets the model issue multiple calls at once; tool chaining feeds output from one tool as input to the next. Five principles hold: single responsibility, clear naming, simple inputs, predictable outputs, and always validate.",
        deepDive: `If Prompt Engineering is how you teach the model to think, Tool Design is how you teach it to act.

The LLM does not execute tools. It generates a structured tool call request — a JSON object with a tool name and arguments. Your execution layer receives that request, runs the actual code, and returns the result as a string. The model reads that string and decides what to do next. Everything the model knows about your tool comes from the schema you wrote.

What is a Tool?

A tool is a function + description + input schema + execution logic + output schema.

Function — the Python code that does the actual work
Description — what the model reads to decide when to call it
Input Schema — JSON Schema defining accepted arguments
Execution Logic — the implementation: API calls, DB queries, file reads
Output Schema — the structure the model can expect back

The Tool Pipeline

User Request
↓
Model reads available tools
↓
Tool Selection (based on name + description)
↓
Tool Call generated (JSON with tool name + arguments)
↓
Execution Engine runs the function
↓
Result returned as string
↓
Model reads result and continues

1. Tool Naming

The name is the first signal the model uses. It must describe the action.

Good names:
get_weather
search_web
send_email
query_database
execute_python

Bad names:
tool1
helper
execute
action

With 10 tools registered, the model skims names before reading descriptions. A bad name means the tool never gets called.

2. Tool Descriptions

The description answers: when should I call this tool?

Weak: "Searches the web."
Strong: "Search the web for current information about any topic. Use this tool when the user asks about recent news, real-time data, or anything that may have changed after your training cutoff."

Poor descriptions cause wrong tool selection, missed tool opportunities, and hallucinated answers when the model gives up and guesses.

3. Input Schema — JSON Schema

Every OpenAI, Anthropic, and Gemini tool uses JSON Schema for parameter definitions.

Schema keywords:
type — string, integer, number, boolean, array, object
description — what this field means (model reads this)
required — fields the model must always provide
enum — restrict to specific allowed values
minimum / maximum — numeric bounds
default — fallback if the argument is omitted

Anthropic format:

tools = [
  {
    "name": "search_web",
    "description": "Search the web for current information. Use when the user asks about recent events or real-time data.",
    "input_schema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "The search query"
        },
        "num_results": {
          "type": "integer",
          "description": "Number of results to return",
          "minimum": 1,
          "maximum": 10,
          "default": 3
        }
      },
      "required": ["query"]
    }
  }
]

OpenAI format:

tools = [
  {
    "type": "function",
    "function": {
      "name": "search_web",
      "description": "Search the web for current information.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {"type": "string", "description": "The search query"},
          "num_results": {"type": "integer", "minimum": 1, "maximum": 10}
        },
        "required": ["query"]
      }
    }
  }
]

Same concept, different wrapper. Build a provider abstraction so your tools work with both.

4. Enumerations

Enums restrict a field to a fixed set of valid values.

Without enum:
The model can hallucinate: priority = "super important"

With enum:
"priority": {"type": "string", "enum": ["low", "medium", "high"]}
The model can only pick one of the three. Anything else is rejected before execution.

Use enums for: units, status values, categories, modes, sort directions.

5. Output Schema

Most beginners define inputs carefully and ignore outputs. Production tools always return a predictable structure.

Success:
{"status": "ok", "data": {...}, "metadata": {...}}

Error:
{"status": "error", "error": "File not found: report.pdf", "code": "NOT_FOUND"}

Never raise unhandled exceptions from a tool. The agent loop breaks and the model gets no information. Always catch, log, and return a structured error string.

Tool Execution Wrapper

def execute_tool(name: str, args: dict) -> str:
    try:
        result = TOOL_REGISTRY[name](**args)
        return json.dumps({"status": "ok", "data": result})
    except KeyError:
        return json.dumps({"status": "error", "error": f"Unknown tool: {name}"})
    except Exception as e:
        return json.dumps({"status": "error", "error": str(e)})

The returned string goes directly back into the model's context as a tool result message.

6. Nested Schemas

Complex tools use nested objects and arrays.

{
  "name": "create_order",
  "parameters": {
    "type": "object",
    "properties": {
      "customer": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "email": {"type": "string", "format": "email"}
        },
        "required": ["name", "email"]
      },
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "product_id": {"type": "string"},
            "quantity": {"type": "integer", "minimum": 1}
          },
          "required": ["product_id", "quantity"]
        }
      }
    },
    "required": ["customer", "items"]
  }
}

Keep nesting shallow where possible — deeply nested schemas confuse the model.

7. Tool Selection Internals

The model scores available tools against the current context. It considers:

Name — does it match the intent?
Description — does the use case match the situation?
Context — what information does it already have?

If two tools have similar names and weak descriptions, the model picks randomly. Good tool design leaves only one right answer.

8. Parallel Tool Calling

Modern models (GPT-4o, Claude 3.5, Gemini) can call multiple tools in a single response.

User: "What's the weather in Tokyo and what time is it there?"

Model response:
Tool Call 1: get_weather(city="Tokyo")
Tool Call 2: get_current_time(city="Tokyo")

Both execute simultaneously. Results return together. The model reads both and responds. This halves latency for tasks requiring multiple independent lookups.

9. Tool Chaining

Sequential tool use where the output of one tool feeds the input of the next.

Search for company
↓
Get company website URL
↓
Scrape website content
↓
Extract contact information
↓
Store in CRM

Each step depends on the previous result. The agent loop drives the chain — the model decides the next tool after reading each observation.

10. Idempotency

Read tools (get_weather, search_web, list_records) are safe to retry — calling them twice returns the same result.

Write tools (send_email, create_record, delete_file) are not. Calling them twice duplicates the action. Document this in the description. Use idempotency keys when possible. For irreversible writes, consider requiring human approval via a confirmation tool first.

11. Permissions

Every production tool carries a permission level:

Read — safe, no side effects (get_weather, search_web, read_file)
Write — has side effects, needs intent confirmation (send_email, create_record)
Admin — destructive, requires explicit approval (delete_user, drop_table, wire_transfer)

Some agent frameworks enforce human-in-the-loop for write and admin tools automatically. Always know which tier each tool belongs to.

Five Principles of Tool Design

Single Responsibility — one tool does one thing
Clear Naming — names describe the action, not the implementation
Simple Inputs — avoid parameters the model doesn't need
Predictable Outputs — same structure every call
Always Validate — catch bad inputs before execution, not after`,
        keyPoints: [
          "Tool = name + description + input schema + execution logic + output schema — all five matter equally",
          "Name drives selection first: get_weather vs tool1 — the model matches intent to name before reading anything else",
          "Description answers WHEN to call the tool — 'Use when the user asks about real-time events' beats 'Searches the web'",
          "JSON Schema: type, description, required, enum, minimum/maximum — every field needs a description the model reads",
          "required: ['query'] forces the argument; omit from required for optional params with a default value",
          "enum: ['low','medium','high'] — model cannot hallucinate outside the allowed set; use for any constrained value",
          "Output: always return {status:'ok', data:...} or {status:'error', error:'...'} — never raise exceptions",
          "Execution wrapper: catch all exceptions, serialize to JSON string, return to model as tool result",
          "Parallel calling: model issues multiple tool calls at once — use for independent lookups to halve latency",
          "Tool chaining: output of one tool becomes input for the next — the agent loop drives the chain",
          "Idempotency: read tools are safe to retry; write tools (send_email, create_record) can duplicate — document this",
          "Permissions: read (safe), write (side effects), admin (destructive) — know which tier each tool is in",
        ],
        project:
          "Design and implement 5 production-quality tools: web_search (Tavily, query + num_results with min/max), execute_python (e2b sandbox, code string, returns stdout + stderr), query_postgres (parameterized only — never string interpolation, returns rows as JSON), send_email (to + subject + body + optional cc array), read_pdf (path + optional page_range, returns text chunks with page numbers). Each tool must have a clear description, validate all inputs, return {status, data} or {status, error}, and never raise uncaught exceptions. Write unit tests covering success, invalid input, and runtime failure. Wire all 5 into one agent loop and confirm the model selects the correct tool for 10 different prompts.",
        stack: ["Python", "JSON Schema", "Pydantic", "e2b", "OpenAI API", "Anthropic API"],
        resources: [
          { title: "OpenAI Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
          { title: "Anthropic Tool Use Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
          { title: "JSON Schema Reference", url: "https://json-schema.org/understanding-json-schema/" },
          { title: "MCP Tool Schema Spec", url: "https://modelcontextprotocol.io/docs/concepts/tools" },
        ],
      },
      {
        id: "tools-common",
        icon: "🔧",
        label: "Common Agent Tools",
        level: "intermediate",
        concept:
          "Tools are the hands of an AI agent. The LLM is the brain — tools let that brain act in the real world. Without them, the pipeline ends at generated text. With tools, the agent searches the web, executes code, queries databases, reads files, sends emails, and drives entire workflows. The best agents are not defined by the LLM alone — agent quality equals LLM quality multiplied by tool quality, tool coverage, and tool reliability.\n\nProduction agents are built from combinations of common tool categories. Information tools — Search (Tavily, SerpAPI), Browser (Playwright, Selenium), and Knowledge Base (Notion, Confluence) — give the agent data beyond its training cutoff. Execution tools — Code Execution (e2b sandbox), Terminal (bash), and Calculator — let the agent perform work, not just describe it. Data tools — Database (SQLAlchemy + parameterized queries), File System (aiofiles), and Vector Database (Pinecone, Qdrant) — handle structured and unstructured data. Communication tools — Email (Gmail API), Messaging (Slack, Teams), and Scheduling — connect agents to humans and external systems. Business tools — CRM (Salesforce, HubSpot), third-party APIs (Stripe, GitHub), and Monitoring (Datadog, Grafana) — power enterprise automation.\n\nDifferent agent archetypes need different stacks. A coding agent needs file system, terminal, git, and code execution. A research agent needs search, browser, file reader, and vector storage. An SDR agent needs search, CRM, email, and calendar. A data scientist agent needs Python execution, database, file reader, and visualization. This is why Claude Code, OpenAI Agents, Cursor, Deep Research, and LangGraph invest most of their architecture in tool integration rather than the model itself.",
        deepDive: `Tools are what make AI agents genuinely useful. Each tool category solves a specific class of problem.

1. Search Tools

Without search, the LLM only knows its training data.
With search, it has real-time access to news, research, and current events.

User Question
↓
Search Tool
↓
Search Results
↓
Analysis
↓
Response

Search tool options:
Tavily      — semantic, agent-native, returns summaries        — best default for agents
SerpAPI     — Google SERP results, structured JSON             — most accurate
Bing Search — Microsoft API, large index                       — reliable fallback
Brave       — privacy-focused, no user tracking                — privacy-first apps
DuckDuckGo  — free tier, low rate limits                       — prototyping only

Use Tavily as the default. It's built specifically for agents — it returns summaries and structured content, not just links.

2. Browser Tools

Search gives links. Browser tools interact with the actual page.

Open Website
↓
Navigate
↓
Click / Fill Forms
↓
Extract Content

Libraries: Playwright (best), Selenium, Puppeteer, Browser Use.

Use cases: job search agents scraping listings, travel agents comparing flights, data collection agents browsing company sites. Playwright is preferred — async, fast, and reliable.

3. Calculator Tools

LLMs hallucinate arithmetic. Never trust a model to compute.

Always delegate math to a tool — Python's math library, a calculator function, or the code executor. This applies to: ROI calculations, statistics, financial projections, unit conversions, and scientific computation.

4. Code Execution Tools

One of the most powerful tools in any agent stack.

Task
↓
Generate Code
↓
Execute Code
↓
Observe Result
↓
Respond

The Reason → Write Code → Execute → Observe loop is the foundation of autonomous data science agents and coding agents.

Always sandbox execution. Never run agent-generated code directly on your host machine.

Safe — e2b cloud sandbox:

from e2b_code_interpreter import Sandbox

with Sandbox() as sbx:
    result = sbx.run_code("import pandas as pd; print(pd.read_csv('data.csv').describe())")
    print(result.text)

Safe: Docker subprocess with resource limits
Unsafe: exec() or eval() on the host machine

e2b provides an isolated cloud environment with full Python support, file system access, and package installation. The agent can't escape it.

5. File System Tools

Read, create, update, delete, and search files.

Formats: PDF, CSV, Excel, JSON, Markdown, Word documents.

Use aiofiles for all file I/O in async agents — blocking reads will stall the event loop and block every concurrent request.

6. Database Tools

Agents query SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, DynamoDB) databases for structured data.

Question
↓
SQL Query
↓
Database
↓
Result

Always use parameterized queries. Never build SQL strings from user input.

Correct:

def query_db(sql: str, params: list) -> list[dict]:
    with engine.connect() as conn:
        rows = conn.execute(text(sql), params)
        return [dict(row) for row in rows]

Wrong (SQL injection risk):

query = f"SELECT * FROM {table} WHERE name = '{user_input}'"

7. Vector Database Tools

Essential for RAG systems.

Document
↓
Embedding Model
↓
Vector Database
↓
Similarity Search
↓
Retrieved Context
↓
LLM

Libraries: Pinecone, Qdrant, Weaviate, Chroma, FAISS.

Qdrant example:

client = QdrantClient(":memory:")
client.upsert("docs", points=[{"id": 1, "vector": embed(text), "payload": {"text": text}}])
results = client.search("docs", query_vector=embed(query), limit=5)

8. Memory Tools

Short-term memory lives in the context window — resets each session.
Long-term memory persists to PostgreSQL, Redis, or a vector DB — survives across sessions.

class AgentMemory:
    def __init__(self):
        self.short_term = []
        self.long_term = VectorStore()

    def remember(self, fact: str):
        self.short_term.append(fact)
        self.long_term.store(fact)

    def recall(self, query: str) -> list[str]:
        return self.long_term.search(query, top_k=5)

9. Terminal Tools

Give agents direct OS access: run commands, install packages, manage processes, deploy applications.

High-risk category. Always:
Scope permissions (read-only paths where possible)
Sandbox execution (Docker, subprocess with limits)
Require approval for irreversible commands

10. Git & Version Control Tools

Critical for software engineering agents.

Capabilities via GitHub API:
Clone repositories
Read and write files
Create branches
Commit changes
Open pull requests

Coding agents use Git to ship features. Review agents use it to analyze pull requests and suggest changes.

11. Email Tools

Send, draft, read, and organize email via Gmail API, Outlook API, or SMTP.

Use cases:
SDR agents — cold outreach sequences
Customer support agents — respond to incoming tickets
Executive assistant agents — draft and send on behalf of users

12. API Tools

Most enterprise agents are heavily API-driven.

Agent
↓
API Request (Stripe, GitHub, HubSpot, Notion, Salesforce)
↓
Service
↓
Response

The agent orchestrates multiple API calls to complete complex business workflows — create invoice, update CRM, send Slack notification — all in a single loop.

13. Monitoring & Observability Tools

Connect agents to Datadog, Prometheus, Grafana, or New Relic.

These tools make agents reactive to system state, not just user messages. A DevOps agent monitoring Datadog can detect a spike, query logs, and open a PagerDuty incident — all autonomously.

Tool Stacks by Agent Type

Research Agent
search_web + browse_url + read_file + vector_search + write_file

RAG Agent
embed_text + vector_search + rerank_results + retrieve_documents

Coding Agent
read_file + write_file + bash + execute_python + git_commit

AI SDR Agent
search_web + crm_lookup + send_email + schedule_meeting

Data Scientist Agent
execute_python + read_csv + query_database + generate_chart

DevOps Agent
bash + github_api + datadog_api + send_slack

Tool Reliability Tiers

Design retry and fallback logic for each tier:

Tier 1 — Always Available
Calculator, local file system, local code execution
Fail fast if broken — something is seriously wrong

Tier 2 — Usually Available
Search APIs (Tavily, SerpAPI), internal database, vector DB
Retry once with exponential backoff, then report to user

Tier 3 — Occasionally Unreliable
Browser tools, third-party APIs, email delivery
Graceful degradation — try a fallback tool or inform the user`,
        keyPoints: [
          "Search: Tavily is agent-native (returns summaries, not links) — use as default; SerpAPI for accuracy; DuckDuckGo only for prototyping",
          "Browser tools (Playwright): go beyond links — click, fill forms, extract structured data from actual pages",
          "Calculator / code: never trust LLMs for arithmetic — always delegate to a Python executor or calculator function",
          "Code execution: always sandbox with e2b or Docker — never exec() or eval() agent-generated code on the host machine",
          "File I/O: use aiofiles in async agents — blocking reads stall the event loop and freeze all concurrent requests",
          "Database: parameterized queries only — conn.execute(text(sql), params) — never f-string user input into SQL",
          "Vector DB (Pinecone, Qdrant, Chroma): embed text → store → similarity search → retrieve context — the core RAG pipeline",
          "Memory: short-term = current context window (resets); long-term = vector DB / Redis (persists across sessions)",
          "Terminal tools: high-risk — scope permissions, sandbox execution, require approval for irreversible commands",
          "Git tools: coding agents clone, read, write, commit, branch, and open PRs via GitHub API — all programmatically",
          "API tools (Stripe, HubSpot, GitHub): enterprise agents orchestrate multiple API calls per task — design for rate limits and failures",
          "Monitoring tools (Datadog, Grafana): make agents reactive to system state — detect incidents and act autonomously",
          "Reliability tiers: local tools (always), internal APIs (usually, retry once), third-party APIs (may fail, degrade gracefully)",
          "Stack by archetype: Coding = file + terminal + git + executor; Research = search + browser + vector; SDR = search + CRM + email",
        ],
        project:
          "Build two agents from scratch. First, a research agent with 5 tools: search_web (Tavily), browse_url (Playwright, returns main text), execute_python (e2b sandbox), read_file / write_file (aiofiles), and vector_search (Qdrant). Give it the task: 'Research the top 5 AI agent frameworks, compare their GitHub stars and key features, run a Python analysis on the data, and save a structured report.' Instrument every tool call with logging — print tool name, inputs, and output length. Add Tier 2 retry (search/vector: retry once after 2s backoff) and Tier 3 fallback (browser: return empty string if page fails, agent decides to skip). Second, build an AI SDR agent with 4 tools: search_web (research the company), crm_lookup (mock HubSpot — returns lead data), send_email (mock SMTP — prints the email), and schedule_meeting (mock Calendly — returns confirmation). Give it a company name and confirm it autonomously researches, enriches, drafts a personalized email, and books a follow-up.",
        stack: ["Tavily API", "Playwright", "e2b", "Qdrant", "aiofiles", "SQLAlchemy", "Gmail API"],
        resources: [
          { title: "Tavily AI Search", url: "https://tavily.com/" },
          { title: "e2b Code Interpreter Sandbox", url: "https://e2b.dev/docs" },
          { title: "Playwright Python Docs", url: "https://playwright.dev/python/docs/intro" },
          { title: "Qdrant Vector Database", url: "https://qdrant.tech/documentation/" },
          { title: "SQLAlchemy Core", url: "https://docs.sqlalchemy.org/en/20/core/connections.html" },
        ],
      },
      {
        id: "tools-function-calling",
        icon: "📞",
        label: "Function Calling APIs",
        level: "intermediate",
        concept:
          "Function calling is the mechanism that transforms an LLM from a chatbot into an agent. The model reads a list of available tools, decides which one to call, generates structured arguments, and returns a tool call request — not text. Your application executes the function, returns the result, and the model continues reasoning. The model never runs code. It only decides what to call and what arguments to pass.\n\nEvery major provider — OpenAI, Anthropic, Gemini — supports function calling with slightly different syntax but the same concept. OpenAI wraps tools in a tools array with type: 'function'. Anthropic passes a tools array with an input_schema field. Gemini uses function_declarations. The agent loop is identical across all three: send tools + messages → receive tool call → execute → append result → repeat until the model returns a final text response.\n\nParallel function calling lets the model issue multiple tool calls in a single response — both a web search and a database lookup at the same time. Structured outputs go one step further: the model's final text response is forced to match a JSON schema you define, not just the tool arguments. Together, these two features make complex agent pipelines fast and predictable.",
        deepDive: `Function Calling is one of the most important concepts in modern AI engineering. Nearly every production agent — OpenAI Agents, LangChain, LangGraph, CrewAI, AutoGen, Claude Tool Use, Gemini, MCP Servers — is built on top of it.

Without Function Calling:

User
↓
LLM
↓
Text Response

The model can only generate text.

With Function Calling:

User
↓
LLM
↓
Tool Selection
↓
Function Call
↓
External System
↓
Tool Result
↓
LLM
↓
Final Response

The model can now act.

What the Model Actually Does

The model does NOT execute code. It only:

Decides which function is needed
Generates the arguments
Requests execution

Your application receives the request and runs the function.

Before Function Calling

Developers handled routing manually:

User Message
↓
Regex / If Statements
↓
Hardcoded API Calls

This broke at scale. Function Calling replaced manual routing with model-driven selection.

The Full Function Calling Loop

Step 1: Define tools as JSON Schema
Step 2: Send tools + user message to the model
Step 3: Model returns a tool call (name + arguments)
Step 4: Application executes the function
Step 5: Append tool result to the message history
Step 6: Send updated history back to the model
Step 7: Model reads the result and continues
Step 8: Repeat until model returns a final text response

OpenAI Format

Define tools:

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city. Use when the user asks about weather.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"},
                    "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["city"]
            }
        }
    }
]

Send to model:

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)

Read the tool call:

message = response.choices[0].message
if message.tool_calls:
    tool_call = message.tool_calls[0]
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    result = execute_tool(name, args)

Append result and continue:

messages.append(message)
messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": json.dumps(result)
})

Anthropic Format

Define tools:

tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city. Use when the user asks about weather.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"},
                "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
        }
    }
]

Send to model:

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=messages
)

Read the tool call:

for block in response.content:
    if block.type == "tool_use":
        name = block.name
        args = block.input
        result = execute_tool(name, args)

Append result and continue:

messages.append({"role": "assistant", "content": response.content})
messages.append({
    "role": "user",
    "content": [{"type": "tool_result", "tool_use_id": block.id, "content": json.dumps(result)}]
})

Key difference: Anthropic appends the tool result as a user message with type "tool_result". OpenAI uses role "tool".

Gemini Format

from google.generativeai.types import FunctionDeclaration, Tool

get_weather_fn = FunctionDeclaration(
    name="get_weather",
    description="Get current weather for a city.",
    parameters={
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"]
    }
)

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    tools=[Tool(function_declarations=[get_weather_fn])]
)

response = model.generate_content(messages)

if response.candidates[0].content.parts[0].function_call:
    fc = response.candidates[0].content.parts[0].function_call
    name = fc.name
    args = dict(fc.args)

Parallel Function Calling

Modern models can return multiple tool calls in a single response.

User: "What's the weather in Tokyo and what time is it there?"

Model returns:

Tool Call 1: get_weather(city="Tokyo")
Tool Call 2: get_current_time(timezone="Asia/Tokyo")

Execute both simultaneously:

import asyncio

results = await asyncio.gather(
    execute_tool_async("get_weather", {"city": "Tokyo"}),
    execute_tool_async("get_current_time", {"timezone": "Asia/Tokyo"})
)

Parallel calling halves latency for tasks requiring multiple independent lookups.

Sequential Function Calling

Output of one tool feeds the input of the next.

Find company website
↓
Scrape the page
↓
Extract contact info
↓
Store in CRM

The agent loop drives the sequence — the model decides the next tool after reading each observation.

Structured Outputs

Structured outputs force the model's final text response (not just tool arguments) to match a JSON schema.

OpenAI:

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "weather_report",
            "schema": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"},
                    "temperature": {"type": "number"},
                    "condition": {"type": "string"}
                },
                "required": ["city", "temperature", "condition"]
            }
        }
    }
)

Guaranteed valid JSON every time. No parsing failures, no malformed responses.

tool_choice

Controls whether the model must call a tool.

"auto"     — model decides (most common)
"required" — model must call at least one tool
"none"     — model must not call any tool
{"type": "function", "function": {"name": "get_weather"}} — force a specific tool

Function Calling Patterns

Pattern 1 — Single Function
Question → Tool → Answer
Example: weather query, currency conversion

Pattern 2 — Multi-Function Sequential
Question → Tool A → Tool B → Tool C → Answer
Example: research task, data pipeline

Pattern 3 — Planner-Executor
Planner decides the full list of tools
Executor runs each one
Planner synthesizes results

Pattern 4 — ReAct
Thought → Tool Call → Observation → Thought → Tool Call → Observation → Answer
Most modern agents follow this pattern.

Error Handling

Tool calls can fail. Every agent loop must handle:

Missing required parameter — model forgot an argument
Invalid argument value — wrong type or out of enum
API failure — 4xx or 5xx from the external service
Timeout — function took too long

Recovery strategies:
Retry the same tool once
Switch to a fallback tool
Ask the user for the missing information
Return a graceful error and stop the loop

Provider Abstraction

Build a unified interface so your tools work with all providers:

def run_agent(provider: str, model: str, tools: list, messages: list) -> str:
    while True:
        if provider == "openai":
            response = call_openai(model, tools, messages)
            tool_calls, text = parse_openai(response)
        elif provider == "anthropic":
            response = call_anthropic(model, tools, messages)
            tool_calls, text = parse_anthropic(response)

        if text:
            return text

        for tc in tool_calls:
            result = execute_tool(tc.name, tc.args)
            messages = append_result(provider, messages, tc, result)

Same tools. Same task. Any provider.`,
        keyPoints: [
          "Function calling: model reads tool definitions, returns a tool call (name + JSON args), your app executes it — model never runs code",
          "Full loop: send tools + messages → receive tool_call → execute → append result → re-send → repeat until text response",
          "OpenAI: tools=[{type:'function', function:{name, description, parameters}}], result sent as role:'tool'",
          "Anthropic: tools=[{name, description, input_schema}], result sent as role:'user' with type:'tool_result'",
          "Gemini: FunctionDeclaration inside Tool, function_call in response parts, result sent via function_response",
          "tool_choice: 'auto' (model decides), 'required' (must call a tool), 'none' (no tools), or force a specific function",
          "Parallel calling: model returns multiple tool_calls in one response — execute with asyncio.gather() to halve latency",
          "Sequential calling: output of tool A feeds input of tool B — the model drives the chain via the agent loop",
          "Structured outputs: response_format={type:'json_schema'} forces the final text response to match a schema — no parsing failures",
          "ReAct pattern: Thought → Tool Call → Observation → Thought — most production agents follow this loop",
          "Error handling: retry once, fallback tool, or ask user — never let an uncaught tool failure break the loop silently",
          "Provider abstraction: build call_llm_with_tools(provider, model, tools, messages) so the same tools work across OpenAI, Anthropic, and Gemini",
        ],
        project:
          "Build the same research agent across 3 provider SDKs. Define 3 tools: search_web (Tavily), get_current_time (datetime), and calculate (Python eval on safe math expressions). Implement the full agent loop for OpenAI, Anthropic, and Gemini — each loop runs until the model returns a text response with no tool calls. Build a unified abstraction: run_agent(provider, model, tools, messages) → str. Test with the task 'Search for the latest GPT-4o release date, calculate how many days ago that was from today, and write a one-sentence summary.' Confirm all 3 providers produce correct results. Then extend the OpenAI version to use parallel tool calling — give it a task requiring 2 independent lookups and verify both tool calls arrive in the same response. Finally, add structured output to force the final answer to match {summary: str, days_ago: int, source: str}.",
        stack: ["OpenAI API", "Anthropic API", "Google Generative AI", "Tavily API"],
        resources: [
          { title: "OpenAI Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
          { title: "Anthropic Tool Use Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
          { title: "Gemini Function Calling Docs", url: "https://ai.google.dev/gemini-api/docs/function-calling" },
          { title: "OpenAI Structured Outputs", url: "https://platform.openai.com/docs/guides/structured-outputs" },
        ],
      },
    ],
  },
  {
    id: "phase-6",
    phaseNumber: 6,
    title: "Model Context Protocol",
    subtitle: "mcp",
    accent: "#8B5CF6",
    bg: "#150d2a",
    nodes: [
      {
        id: "mcp-fundamentals",
        icon: "🔗",
        label: "MCP Architecture",
        level: "intermediate",
        concept:
          "MCP (Model Context Protocol) is an open standard introduced by Anthropic to solve a fundamental problem in AI engineering: every application was building custom integrations for every tool, database, and API from scratch. Before MCP, an agent needed a custom GitHub client, a custom Slack client, a custom database client — all built differently. MCP standardizes this into a single protocol, making it the USB-C of AI: one standard interface that any compatible host can use to connect to any compatible server.\n\nThe architecture has three layers. The Host is the AI application — Claude Desktop, Cursor, Windsurf, or your own agent. Inside the host sits an MCP Client, which speaks the protocol and manages connections to servers. MCP Servers are separate processes that wrap external systems — a GitHub server exposes repository and PR operations, a PostgreSQL server exposes query capabilities, a file system server exposes file read/write. The host never talks to GitHub directly; it talks to the GitHub MCP server, which handles the actual API calls.\n\nMCP servers expose three capability types: Tools (actions the agent can invoke — search GitHub, run SQL, send Slack message), Resources (read-only data sources — files, documents, database records), and Prompts (reusable prompt templates — code review prompt, security audit prompt). This separation means an agent can browse company knowledge as a Resource, take action via Tools, and use team-approved Prompts — all through the same protocol, with authentication and permission control handled at the server level.",
        deepDive: `MCP is becoming the standard architecture for enterprise AI agents. Understanding it is essential for production agent engineering.

Why MCP Exists

Before MCP, every AI application built its own integrations:

LLM
├── Custom GitHub Client
├── Custom Slack Client
├── Custom PostgreSQL Client
├── Custom File System Client
└── Custom Notion Client

Each integration was built differently. Different authentication. Different error handling. Different schemas. Duplicated across every team, every project.

MCP solves this:

LLM
↓
MCP Client
↓
MCP Protocol
↓
GitHub MCP Server
Slack MCP Server
PostgreSQL MCP Server
File System MCP Server
Notion MCP Server

Build a server once. Any compatible host can use it.

Think of MCP as USB-C for AI. USB-C is one port that works for power, data, display, and audio — regardless of the device. MCP is one protocol that works for any tool, any data source, any service — regardless of the agent.

The Three-Layer Architecture

Host → Client → Server

Host

The Host is the AI application the user interacts with.

Examples:
Claude Desktop
Cursor
Windsurf
VS Code AI extensions
Your custom FastAPI agent

The host manages:
User interaction
LLM calls
Agent orchestration
MCP connections (one client per server)

Client

The MCP Client sits inside the host. It speaks the MCP protocol and is responsible for:

Establishing connections to servers
Sending requests
Receiving responses
Managing sessions

One host can hold multiple clients — one per connected server.

Server

The MCP Server is a separate process that wraps an external system.

Examples:
GitHub MCP Server — repos, issues, PRs, commits
PostgreSQL MCP Server — run queries, read tables
File System MCP Server — read, write, search files
Slack MCP Server — send messages, read channels
Browser MCP Server — navigate, extract, interact

The server translates between MCP protocol messages and the actual external API calls.

Complete Flow

User:

Analyze my GitHub repository and summarize open issues.

Step 1: Agent reasons — need GitHub access.
Step 2: MCP Client sends tool call to GitHub MCP Server.
Step 3: Server authenticates with GitHub API.
Step 4: Server fetches open issues.
Step 5: Server formats and returns result.
Step 6: Client delivers result to host.
Step 7: Agent reads result and generates response.

Full architecture:

User
↓
Agent (Host)
↓
MCP Client
↓
GitHub MCP Server
↓
GitHub API
↓
GitHub

MCP Capability Types

MCP servers expose three types of capabilities.

1. Tools

Tools are actions the agent can invoke. Most important capability.

Examples:
search_github_code(query)
create_issue(repo, title, body)
run_sql_query(query, params)
send_slack_message(channel, text)
read_file(path)

Architecture:

Agent
↓
Tool Call
↓
MCP Server
↓
External System
↓
Result
↓
Agent

Tools behave exactly like function calling tools — the model generates a tool call, your execution layer (via the MCP client) runs it, the result returns to the model.

2. Resources

Resources are read-only data sources the agent can access.

Examples:
file:///project/README.md
db://company/customers
docs://handbook/engineering

Architecture:

Agent
↓
Resource Request
↓
MCP Server
↓
Data Source
↓
Content
↓
Agent

Use resources for: company documents, configuration files, database snapshots, knowledge bases.

3. Prompts

Prompts are reusable prompt templates the server exposes.

Examples:
code_review_prompt — standardized PR review format
security_audit_prompt — OWASP checklist prompt
onboarding_prompt — new employee Q&A template

Architecture:

Agent
↓
Prompt Request
↓
MCP Server
↓
Template
↓
Agent fills variables
↓
LLM call

Teams use prompts to standardize how agents approach recurring tasks.

Transport Layer

Transport defines how the host and server communicate.

STDIO (Standard Input/Output)

Most common for local servers.

Host spawns a server process.
Host writes JSON-RPC to server's stdin.
Server writes responses to stdout.

Host
↓
stdin / stdout
↓
Local MCP Server (subprocess)

Used by: Claude Desktop, Cursor, local agent setups.
Best for: file system, terminal, local database access.

HTTP + SSE (Server-Sent Events)

For remote MCP servers hosted in the cloud.

Host
↓
HTTP POST (requests)
↓
Remote MCP Server
↓
SSE stream (responses)

Used for: enterprise APIs, shared infrastructure, cloud-hosted tools.
Best for: Salesforce, Stripe, team-shared database servers.

Local vs Remote Servers

Local:
Runs as a subprocess on the user's machine.
Fast, private, low latency.
Used for: file system, git, terminal, local database.
Config: {"command": "python", "args": ["server.py"]}

Remote:
Hosted in the cloud, accessed over HTTP.
Shared across teams, centrally maintained.
Used for: enterprise CRMs, billing systems, analytics.
Config: {"url": "https://mcp.company.com/salesforce"}

MCP vs Function Calling

Function Calling covers:
Tool definition (JSON Schema)
Tool invocation (model generates call)
Result handling

MCP covers:
Tool definition and discovery
Tool invocation and execution
Resources (read-only data)
Prompts (reusable templates)
Authentication and permissions
Transport (local and remote)
Multi-server orchestration

MCP is the full ecosystem. Function calling is one piece of it.

Authentication and Permissions

MCP servers handle auth between themselves and external systems.

Common patterns:
GitHub OAuth token stored in server config
API keys injected via environment variables
JWT tokens validated per request

Permission control at the server level:

Read repository     ✓
Create issue        ✓
Delete repository   ✗ (blocked by server config)

The agent never directly touches API credentials. The server is the trust boundary.

Production Enterprise Architecture

One agent. Many servers. One protocol.

User
↓
Agent
↓
MCP Client
↓
─────────────────────
GitHub MCP Server
Slack MCP Server
PostgreSQL MCP Server
Jira MCP Server
File System MCP Server
─────────────────────
↓
Enterprise Systems

This is becoming the standard architecture for enterprise AI agents — one unified client connecting to the full company toolstack through a single protocol.

Real MCP Server Examples

GitHub MCP Server
search_code, list_repos, create_issue, open_pr, get_commits

PostgreSQL MCP Server
run_query, list_tables, describe_schema, insert_record

File System MCP Server
read_file, write_file, list_directory, search_files

Slack MCP Server
send_message, list_channels, read_thread, create_channel

Browser MCP Server
navigate, click, fill_form, extract_content, screenshot`,
        keyPoints: [
          "MCP solves the N×M problem: build a server once, every compatible host (Claude Desktop, Cursor, your agent) can use it",
          "USB-C analogy: one standard protocol for any tool, any data source, any service — regardless of the agent",
          "Three layers: Host (AI app) → Client (protocol handler inside the host) → Server (external system wrapper)",
          "Host examples: Claude Desktop, Cursor, Windsurf, your custom FastAPI agent — manages LLM + MCP connections",
          "Client: sits inside the host, speaks MCP protocol, one client per connected server",
          "Server: separate process wrapping an external system — GitHub, PostgreSQL, Slack, file system",
          "Tools: actions the agent invokes (create_issue, run_query, send_message) — work like function calling",
          "Resources: read-only data sources (file:///README.md, db://customers) — agent reads without side effects",
          "Prompts: reusable prompt templates exposed by the server — teams standardize recurring task approaches",
          "Transport stdio: host spawns server as subprocess, communicates via stdin/stdout — local servers, low latency",
          "Transport HTTP+SSE: remote servers accessed over the network — shared enterprise infrastructure",
          "Auth and permissions live in the server — agent never touches API keys directly; server is the trust boundary",
          "MCP vs function calling: function calling = tool invocation only; MCP = tools + resources + prompts + auth + transport + discovery",
        ],
        project:
          "Explore the full MCP architecture hands-on. Install Claude Desktop and connect 3 MCP servers via stdio: the official filesystem server (read/write local files), a PostgreSQL server (query a local database), and a web search server (Brave or Tavily MCP). For each server: read its JSON config in claude_desktop_config.json, test every tool and resource in Claude Desktop, and run the server process manually to watch the stdin/stdout JSON-RPC messages. Then write your own minimal MCP server from scratch using the Python SDK — expose one tool (get_file_summary(path) → reads the file and returns the first 100 words) and one resource (file:///project/README.md). Test it in Claude Desktop. Finally, map out what a production enterprise agent would look like: draw the full architecture with 5 MCP servers (GitHub, Slack, PostgreSQL, Jira, File System), identify which capabilities each server exposes as Tools vs Resources, and document the authentication method each would need.",
        stack: ["Claude Desktop", "MCP Python SDK", "MCP TypeScript SDK"],
        resources: [
          { title: "MCP Official Documentation", url: "https://modelcontextprotocol.io/" },
          { title: "MCP Python SDK", url: "https://github.com/modelcontextprotocol/python-sdk" },
          { title: "MCP Server Examples", url: "https://github.com/modelcontextprotocol/servers" },
          { title: "Anthropic MCP Announcement", url: "https://www.anthropic.com/news/model-context-protocol" },
        ],
      },
      {
        id: "mcp-building",
        icon: "🏗️",
        label: "Building MCP Servers",
        level: "advanced",
        concept:
          "Building MCP servers is one of the most valuable skills for an AI agent engineer. An MCP server is a bridge between agents and real systems — you build it once and any MCP-compatible host (Claude Desktop, Cursor, your own agent) can use it immediately without custom integration code. Think of it as a REST API for agents instead of for developers: instead of exposing endpoints for HTTP clients, you expose tools, resources, and prompts for LLMs.\n\nThe MCP Python SDK handles all protocol complexity. Define a tool with the @mcp.tool() decorator on any Python function — the SDK reads your type hints and docstring to auto-generate the JSON Schema, handle request routing, and ensure protocol compliance. Resources are exposed with @mcp.resource() using a URI pattern (file:///, db:///, docs:///). Prompts are registered with @mcp.prompt(). Call mcp.run() to start the server — it automatically handles stdio transport locally and HTTP+SSE for remote deployment.\n\nEvery MCP server follows the same lifecycle: start → register capabilities → wait for requests → process → return responses. Good server design applies the same principles as good tool design: single responsibility per tool, clear names that describe actions, structured error returns (never raw exceptions), parameterized queries for databases, and authentication handled at the server boundary so agents never touch credentials directly.",
        deepDive: `Building an MCP server is straightforward with the official SDK. The complexity is in designing the right capabilities and handling failures correctly.

Installation

pip install mcp

For async HTTP support:
pip install mcp[http]

Basic Server Structure

import mcp
from mcp import McpServer, types

server = McpServer("my-server")

# Register tools, resources, prompts here

if __name__ == "__main__":
    mcp.run(server)

That is the complete skeleton. Everything else is capability registration.

Step 1: Define a Tool

Tools are actions the agent can invoke. Use @mcp.tool() on any Python function.

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("github-server")

@mcp.tool()
def search_repositories(query: str, language: str = "python", limit: int = 10) -> list[dict]:
    """
    Search GitHub repositories by keyword.
    Use when the user wants to find GitHub repos matching a topic.
    Returns a list of repositories with name, stars, and description.
    """
    results = github_client.search_repositories(query, language=language)
    return [{"name": r.name, "stars": r.stargazers_count, "url": r.html_url} for r in results[:limit]]

The SDK reads:
Function name → tool name
Type hints → JSON Schema (str, int, list, dict, Optional)
Docstring → tool description (the model reads this)
Return type → output schema

Never return raw exceptions. Always return a value the model can read.

@mcp.tool()
def get_file_contents(path: str) -> dict:
    """Read a file and return its contents."""
    try:
        with open(path) as f:
            return {"status": "ok", "content": f.read(), "path": path}
    except FileNotFoundError:
        return {"status": "error", "error": f"File not found: {path}"}
    except PermissionError:
        return {"status": "error", "error": f"Permission denied: {path}"}

Step 2: Define a Resource

Resources are read-only data sources. The agent fetches them by URI.

@mcp.resource("file:///{path}")
def read_file_resource(path: str) -> str:
    """Expose local files as readable resources."""
    with open(path) as f:
        return f.read()

@mcp.resource("db://customers/{customer_id}")
def get_customer_resource(customer_id: str) -> str:
    """Retrieve a customer record by ID."""
    record = db.query("SELECT * FROM customers WHERE id = %s", [customer_id])
    return json.dumps(record)

@mcp.resource("docs://handbook/policies")
def get_policies() -> str:
    """Return the company policies document."""
    return open("docs/policies.md").read()

Resources are always GET semantics — no side effects. If an action needs to happen, use a Tool.

Step 3: Define a Prompt

Prompts are reusable templates the server exposes.

from mcp.types import GetPromptResult, PromptMessage

@mcp.prompt()
def code_review_prompt(language: str, focus: str = "all") -> GetPromptResult:
    """
    Standard code review prompt.
    Use when reviewing a pull request or code file.
    """
    return GetPromptResult(
        description="Code review checklist",
        messages=[
            PromptMessage(
                role="user",
                content=f"Review the following {language} code. Focus on: {focus}. Check for security vulnerabilities, performance issues, and code clarity."
            )
        ]
    )

Step 4: Database Tool (Parameterized Only)

Database MCP servers must use parameterized queries. Never build SQL from string interpolation.

from sqlalchemy import create_engine, text

engine = create_engine(os.environ["DATABASE_URL"])

@mcp.tool()
def run_query(sql: str, params: list = []) -> dict:
    """
    Run a read-only SQL query against the database.
    Use for data analysis, record lookup, and reporting.
    Only SELECT statements are allowed.
    """
    if not sql.strip().upper().startswith("SELECT"):
        return {"status": "error", "error": "Only SELECT queries are permitted"}
    try:
        with engine.connect() as conn:
            rows = conn.execute(text(sql), params)
            return {"status": "ok", "rows": [dict(r) for r in rows], "count": rows.rowcount}
    except Exception as e:
        return {"status": "error", "error": str(e)}

Step 5: API Wrapper Tool (Authentication at Server Level)

@mcp.tool()
def create_github_issue(repo: str, title: str, body: str, labels: list[str] = []) -> dict:
    """
    Create a new GitHub issue.
    Use when the user wants to report a bug or create a task on GitHub.
    """
    headers = {"Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}"}
    response = requests.post(
        f"https://api.github.com/repos/{repo}/issues",
        headers=headers,
        json={"title": title, "body": body, "labels": labels}
    )
    if response.status_code == 201:
        issue = response.json()
        return {"status": "ok", "issue_number": issue["number"], "url": issue["html_url"]}
    return {"status": "error", "error": response.json().get("message", "Unknown error")}

The GitHub token lives in os.environ — the agent never sees it. The server is the auth boundary.

Step 6: Transport Configuration

STDIO (local, used by Claude Desktop and Cursor):

if __name__ == "__main__":
    mcp.run()  # defaults to stdio

Claude Desktop config (~/.claude/claude_desktop_config.json):

{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {"GITHUB_TOKEN": "ghp_..."}
    }
  }
}

HTTP + SSE (remote, for deployed servers):

if __name__ == "__main__":
    mcp.run(transport="sse", host="0.0.0.0", port=8080)

Step 7: Choosing Tool vs Resource vs Prompt

Tool — use when the agent needs to perform an action or trigger something:
create_issue, send_message, run_query, send_email, execute_script

Resource — use when the agent needs to read information without side effects:
README.md content, customer record, configuration values, knowledge base article

Prompt — use when teams need to standardize how agents approach a recurring task:
code review checklist, security audit template, onboarding Q&A

When in doubt: if it does something, it is a Tool. If it returns something, it is a Resource.

Three Server Design Patterns

Wrapper Pattern — wrap one external API:

GitHub API → GitHub MCP Server
Stripe API → Stripe MCP Server

Most common. One server, one system.

Aggregator Pattern — combine multiple systems into one domain server:

GitHub + Jira + Slack → Project Management MCP Server

The server orchestrates across systems and exposes unified tools.

Workflow Pattern — expose a multi-step business process as a single tool:

@mcp.tool()
def onboard_customer(name: str, email: str, plan: str) -> dict:
    """
    Full customer onboarding workflow.
    Creates CRM record, sends welcome email, creates billing subscription,
    and opens a support ticket.
    """
    crm_id = crm.create_customer(name, email)
    send_welcome_email(email, name, plan)
    billing.create_subscription(crm_id, plan)
    support.create_onboarding_ticket(crm_id)
    return {"status": "ok", "customer_id": crm_id}

The agent calls one tool. Five systems get updated.

Testing Your Server

Before connecting to Claude Desktop, test directly:

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def test():
    server_params = StdioServerParameters(command="python", args=["server.py"])
    async with stdio_client(server_params) as (r, w):
        async with ClientSession(r, w) as session:
            await session.initialize()
            tools = await session.list_tools()
            print([t.name for t in tools.tools])
            result = await session.call_tool("search_repositories", {"query": "fastapi"})
            print(result.content)`,
        keyPoints: [
          "pip install mcp — official Python SDK; FastMCP is the high-level wrapper that handles all protocol complexity",
          "@mcp.tool() on any Python function — SDK reads type hints for JSON Schema, docstring for description",
          "Docstring is the tool description the model reads — write 'Use when...' to guide tool selection",
          "Return {status:'ok', data:...} or {status:'error', error:'...'} — never raise exceptions from a tool",
          "@mcp.resource('file:///{path}') — read-only data; use URI patterns (file:///, db:///, docs:///)",
          "@mcp.prompt() — reusable prompt templates; returns GetPromptResult with messages list",
          "Database tools: parameterized queries only — conn.execute(text(sql), params), never f-string SQL",
          "Auth at server boundary: credentials in os.environ, agent never sees API keys directly",
          "mcp.run() — stdio for local (Claude Desktop config); mcp.run(transport='sse') for remote HTTP",
          "Tool vs Resource vs Prompt: does something = Tool; returns something = Resource; standard workflow = Prompt",
          "Wrapper pattern: one server per external API; Aggregator: combine systems; Workflow: multi-step process as one tool",
          "Test with MCP ClientSession before connecting to Claude Desktop — list_tools() and call_tool() directly",
        ],
        project:
          "Build a production PostgreSQL MCP server from scratch. Define 5 tools: run_query (SELECT only, parameterized), list_tables (returns all table names and row counts), describe_table (returns column names and types for a given table), insert_record (INSERT with parameterized values, returns inserted ID), and search_records (full-text search across a given table and column). Add 2 resources: db://schema (full database schema as JSON) and db://stats (table sizes and row counts). Add 1 prompt: data_analysis_prompt(table_name) that returns a prompt asking the model to analyze the table structure and suggest useful queries. Handle all errors with structured {status, error} returns. Load DATABASE_URL from environment — never hardcode credentials. Test every tool with MCP ClientSession before connecting to Claude Desktop. Connect to Claude Desktop via stdio config. Finally, ask Claude: 'Describe all tables in my database, then find the 3 customers with the most orders and summarize their purchase history.'",
        stack: ["MCP Python SDK", "FastMCP", "SQLAlchemy", "PostgreSQL", "Python"],
        resources: [
          { title: "MCP Python SDK Docs", url: "https://github.com/modelcontextprotocol/python-sdk" },
          { title: "FastMCP Documentation", url: "https://gofastmcp.com/" },
          { title: "MCP Server Examples", url: "https://github.com/modelcontextprotocol/servers" },
          { title: "MCP Specification", url: "https://spec.modelcontextprotocol.io/" },
        ],
      },
      {
        id: "mcp-deployment",
        icon: "🚀",
        label: "MCP Deployment & Security",
        level: "advanced",
        concept:
          "Building an MCP server is half the job. Deploying it securely in production is the other half. Local stdio servers are simple — they run on the user's machine and inherit their permissions. Remote MCP servers serving multiple agents across an organization require a full security stack: authentication (who are you), authorization (what can you do), input validation, audit logging, rate limiting, and secret management. The gap between a working local prototype and a production-grade remote server is where most projects fail.\n\nAuthentication for remote servers uses OAuth 2.0 — the MCP specification recommends it as the standard. API keys work for simpler setups but are harder to rotate and scope. JWT tokens handle machine-to-machine flows. Authorization sits on top: Role-Based Access Control (RBAC) maps roles like viewer, editor, and admin to specific tools and resources. Fine-grained permissions go further — a client can be allowed search_repository but denied delete_repository on the same server. Never trust tool arguments from the model; validate every input with Pydantic before execution.\n\nFor infrastructure, Docker is the standard deployment unit for MCP servers — isolated, portable, and easy to scale behind a load balancer. Secrets never live in source code; use environment variables in development and AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault in production. Every tool call in a production server must be logged with tool name, arguments, caller identity, and timestamp — audit logs are required for compliance and essential for debugging runaway agents. Rate limiting protects against both abuse and agents that loop and call the same tool hundreds of times.",
        deepDive: `The difference between a dev MCP server and a production one is the security layer around it.

Deployment Models

Three patterns depending on your use case.

Local (stdio)
Agent → Local MCP Server → Local Files/DB
Single user. Private. Fast. No network.
Used by: Claude Desktop, Cursor, Windsurf.
Security: inherits user's OS permissions.

Remote (HTTP + SSE)
Agent → Internet → Remote MCP Server → External Services
Multi-user. Shared. Requires full security stack.
Used by: enterprise AI platforms, shared agent infrastructure.

Hybrid
Agent → Local File Server (stdio) + Remote Company Server (HTTP)
Most production enterprises use this.
Local tools for private data; remote servers for shared APIs.

Hosting Options

Docker (most common)

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENV PORT=8080
CMD ["python", "server.py"]

Deploy to: AWS ECS, Google Cloud Run, Azure Container Apps, Render.
Benefits: isolation, portability, consistent environment.

Kubernetes (enterprise scale)
Multiple MCP pods behind a service.
Auto-scaling, self-healing, rolling deployments.
Use when you need high availability across many agents.

Serverless (lightweight servers)
AWS Lambda + API Gateway, Google Cloud Functions.
Good for low-traffic MCP servers that don't need persistent connections.
Limitation: SSE transport requires persistent connections — use only for request/response tools.

Authentication

Remote MCP servers must authenticate every request.

API Key (simplest)

@app.middleware("http")
async def verify_api_key(request: Request, call_next):
    key = request.headers.get("X-API-Key")
    if key != os.environ["MCP_API_KEY"]:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return await call_next(request)

Good for: internal tools, single-tenant deployments.
Rotate keys regularly. Store in Secrets Manager, never in code.

OAuth 2.0 (MCP-recommended for remote servers)

MCP spec recommends OAuth 2.0 for multi-user remote servers.

Flow:
Agent requests access token from OAuth provider
Provider verifies identity and issues JWT
Agent includes token in every MCP request
Server validates token signature and claims

from jose import jwt, JWTError

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

JWT tokens carry scopes (tools:read, tools:write, tools:admin) so the server knows what each client is allowed to do.

Service Accounts (machine-to-machine)

AI agents don't log in with usernames and passwords.
Create service accounts with specific permissions.
Each agent instance gets its own service account.
Rotate credentials on a schedule.

Authorization — Role-Based Access Control

Authentication answers: who are you?
Authorization answers: what can you do?

Define roles:

ROLES = {
    "viewer":  ["search_repository", "read_file", "list_tables"],
    "editor":  ["search_repository", "read_file", "create_issue", "run_query"],
    "admin":   ["*"]  # all tools
}

Enforce at request time:

@mcp.tool()
def delete_repository(repo: str) -> dict:
    """Delete a GitHub repository. Requires admin role."""
    caller_role = get_caller_role()
    if caller_role not in ["admin"]:
        return {"status": "error", "error": "Insufficient permissions — admin role required"}
    ...

Fine-grained permissions go further:

PERMISSIONS = {
    "service-account-agent-1": {
        "allowed_tools": ["search_repository", "create_issue"],
        "denied_tools":  ["delete_repository", "delete_file"],
        "allowed_repos": ["company/public-*"]
    }
}

The agent can only touch what it's explicitly allowed to touch.

Input Validation

Never trust arguments from the model. Validate with Pydantic before any execution.

from pydantic import BaseModel, validator, constr
import re

class RunQueryInput(BaseModel):
    sql: constr(max_length=5000)
    params: list = []

    @validator("sql")
    def must_be_select(cls, v):
        if not v.strip().upper().startswith("SELECT"):
            raise ValueError("Only SELECT queries are allowed")
        return v

@mcp.tool()
def run_query(sql: str, params: list = []) -> dict:
    validated = RunQueryInput(sql=sql, params=params)
    ...

Validation rules to enforce:
SQL — only SELECT, no DROP/DELETE/UPDATE
File paths — no path traversal (../ blocked)
Numeric inputs — min/maximum ranges
String inputs — max length, character allowlist where appropriate

Human-in-the-Loop for Dangerous Tools

Some tools should never execute without explicit human approval.

@mcp.tool()
def delete_production_database(db_name: str, confirmation_code: str) -> dict:
    """
    Delete a production database. Requires a confirmation code
    generated by the approval workflow. Never call without human sign-off.
    """
    expected_code = approval_service.get_code(db_name)
    if confirmation_code != expected_code:
        return {"status": "error", "error": "Invalid confirmation code — approval required first"}
    ...

Pattern: the agent must call request_approval(action, details) first, a human approves in the UI, an approval code is issued, then the dangerous tool can run with that code.

Secret Management

Never hardcode credentials. Never commit them to git.

Development:
.env file + python-dotenv
Add .env to .gitignore

Production:
AWS Secrets Manager

import boto3

def get_secret(name: str) -> str:
    client = boto3.client("secretsmanager")
    return client.get_secret_value(SecretId=name)["SecretString"]

GITHUB_TOKEN = get_secret("prod/mcp-server/github-token")

Rotation: set up automatic rotation for API keys every 90 days.
Least privilege: each secret has only the permissions it actually needs.

Audit Logging

Every tool call in production must be logged.

import structlog
log = structlog.get_logger()

@mcp.tool()
def create_issue(repo: str, title: str, body: str) -> dict:
    log.info("tool_called",
        tool="create_issue",
        caller=get_caller_identity(),
        args={"repo": repo, "title": title},
        timestamp=datetime.utcnow().isoformat()
    )
    result = github_client.create_issue(repo, title, body)
    log.info("tool_completed", tool="create_issue", status=result["status"])
    return result

Log to: PostgreSQL (queryable), CloudWatch, Datadog, or any structured log store.
Never log sensitive values (passwords, tokens, PII) — log action and metadata only.

Rate Limiting

Protects against abuse and runaway agent loops.

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/mcp")
@limiter.limit("100/minute")
async def mcp_endpoint(request: Request):
    ...

Per-client limits: 100 requests/minute for standard agents, 500 for trusted internal services.
Per-tool limits: expensive external API calls (GitHub, Stripe) get stricter limits than local reads.
Circuit breaker: if an external service starts failing, stop calling it and return a cached error.

Monitoring Stack

Logs: structured JSON to CloudWatch / Datadog / Loki
Metrics: request count, error rate, latency per tool (Prometheus + Grafana)
Tracing: OpenTelemetry trace IDs that follow a request through agent → client → server → external API
Alerts: page on-call if error rate > 5% or p99 latency > 2s

Security Threats

Prompt injection — malicious content in retrieved data tells the agent to call dangerous tools.
Mitigation: validate tool arguments regardless of how they were generated; don't trust retrieved content as instructions.

Tool abuse — agent calls an expensive API in a loop (search_web 200 times on one task).
Mitigation: per-tool rate limits, agent step budgets, max-iteration enforcement.

Credential exposure — API keys logged or returned in tool responses.
Mitigation: audit log scrubbing, never return credentials from tools, use Secrets Manager.

Data exfiltration — agent reads sensitive records and sends them to an external endpoint.
Mitigation: egress filtering, data classification, output scanning for PII.

Production Deployment Checklist

Infrastructure:
Docker image built and pushed to registry
HTTPS termination at load balancer or reverse proxy (nginx/Caddy)
Health check endpoint (/health returns 200)
Auto-restart on crash (Docker restart policy or Kubernetes liveness probe)

Authentication:
OAuth 2.0 or API key validation on every request
Token expiry enforced (JWT exp claim checked)
Service accounts created per agent, not shared

Authorization:
RBAC roles defined and enforced per tool
Dangerous tools require admin role or approval code
Fine-grained allowlists for sensitive operations

Security:
All secrets in Secrets Manager (no .env in prod)
Input validation with Pydantic on every tool
Path traversal blocked on file tools
SQL injection blocked on database tools

Observability:
Structured audit log: tool, caller, args, timestamp, result status
Error rate and latency metrics
Alerts configured for anomalies

Reliability:
Rate limiting per client and per tool
Circuit breaker on external API calls
Retry with exponential backoff for transient failures`,
        keyPoints: [
          "Three deployment models: local stdio (single user, private), remote HTTP+SSE (multi-user, needs full security), hybrid (both)",
          "Docker is the standard deployment unit — FROM python:3.11-slim, containerized, deployed to Cloud Run / ECS / Render",
          "OAuth 2.0 is MCP-recommended auth for remote servers — JWT tokens carry scopes (tools:read, tools:write, tools:admin)",
          "API keys work for simple setups — store in Secrets Manager, never in source code, rotate every 90 days",
          "RBAC: map roles (viewer, editor, admin) to specific allowed tools — enforce at request time, not just at startup",
          "Fine-grained permissions: per-service-account allowlists and denylists at the tool level",
          "Input validation: Pydantic on every tool argument — block path traversal, SELECT-only for SQL, max lengths on strings",
          "Human-in-the-loop: dangerous tools (delete DB, transfer money) require an approval code from a separate approval service",
          "Secrets: python-dotenv in dev, AWS Secrets Manager / Azure Key Vault / HashiCorp Vault in production",
          "Audit log every tool call: tool name, caller identity, arguments (no PII), timestamp, result status — to PostgreSQL or Datadog",
          "Rate limiting: 100 req/min standard, stricter for expensive external APIs — circuit breaker on external service failures",
          "Security threats: prompt injection (validate args regardless of source), tool abuse (rate limits), credential exposure (scrub logs)",
        ],
        project:
          "Take the PostgreSQL MCP server from the previous project and make it production-ready. Add: (1) JWT authentication middleware — every request must include a valid Bearer token, invalid tokens return 401; (2) RBAC with three roles — viewer (run_query, list_tables, describe_table), editor (adds insert_record), admin (all tools); (3) Pydantic input validation on every tool — SELECT-only guard on run_query, max_length=200 on table names, no path traversal on any string inputs; (4) structured audit logging with structlog — log tool_name, caller_role, arguments, timestamp, and result status to a PostgreSQL audit table; (5) rate limiting at 60 requests/minute per API key using slowapi; (6) a /health endpoint returning server status and connected DB status. Dockerize the server (Dockerfile + docker-compose.yml with the MCP server and a PostgreSQL instance). Store the DB password and JWT secret in a .env file locally (document how to swap to Secrets Manager for production). Deploy to Render or Railway with HTTPS. Test the full security stack: confirm unauthenticated requests are rejected, viewer role cannot call insert_record, and every tool call appears in the audit log.",
        stack: ["MCP Python SDK", "FastMCP", "FastAPI", "OAuth 2.0", "Pydantic", "Docker", "PostgreSQL", "structlog"],
        resources: [
          { title: "MCP Authorization Spec", url: "https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/authorization/" },
          { title: "FastMCP Documentation", url: "https://gofastmcp.com/" },
          { title: "python-jose JWT", url: "https://python-jose.readthedocs.io/" },
          { title: "slowapi Rate Limiting", url: "https://slowapi.readthedocs.io/" },
        ],
      },
    ],
  },
  {
    id: "phase-7",
    phaseNumber: 7,
    title: "Agent Memory",
    subtitle: "stateful agents",
    accent: "#EC4899",
    bg: "#1f0d1a",
    nodes: [
      {
        id: "memory-types",
        icon: "💾",
        label: "Memory Types",
        level: "intermediate",
        concept:
          "Agents need memory to be useful across time. Short-term memory is the current context window — everything in the current conversation. Long-term memory persists across sessions — stored externally and retrieved when relevant. Episodic memory stores events (what happened when). Semantic memory stores facts and knowledge. Without memory, every conversation starts from zero — unusable for real assistants.",
        keyPoints: [
          "Short-term: the context window — fast, accurate, but resets every session",
          "Long-term: external DB/vector store — survives session end, retrieved by relevance",
          "Episodic: 'User asked about diamonds 3 weeks ago' — past events as narrative",
          "Semantic: 'User prefers VS+ clarity, 0.9–1.1ct range' — distilled facts about user",
          "Working memory: structured state the agent maintains within a single run",
        ],
        project:
          "Build a memory-aware assistant: short-term = rolling window of last 20 messages, long-term = user facts stored in PostgreSQL. After each conversation, extract key facts (name, preferences, past requests) and store them. On new session start, retrieve relevant memories and inject into the system prompt.",
        stack: ["PostgreSQL", "OpenAI API", "Python"],
        resources: [],
      },
      {
        id: "memory-systems",
        icon: "🗄️",
        label: "Memory Systems",
        level: "intermediate",
        concept:
          "A complete memory system has multiple layers: user profiles (persistent facts about each user), conversation history (full message log in DB), session memory (within-session working state), and persistent memory (extracted facts that survive indefinitely). The mem0 library provides a managed memory layer for agents. The challenge is retrieval: finding the right memories at the right time.",
        keyPoints: [
          "User profile: {name, preferences, past_purchases, communication_style} — updated after each session",
          "Conversation history: full message log in PostgreSQL — enables user to continue where they left off",
          "Session memory: in-memory dict during a run — agent's scratch pad",
          "mem0: managed memory library — pip install mem0ai — handles storage + retrieval",
          "Memory key: hash(user_id + topic) — look up specific memories efficiently",
        ],
        project:
          "Build a full memory system using mem0: user facts extracted and stored after each conversation, semantic search to retrieve relevant past interactions, conversation history persisted in PostgreSQL. Test that the agent remembers preferences across 5 different sessions.",
        stack: ["mem0", "PostgreSQL", "OpenAI Embeddings"],
        resources: [
          { title: "mem0 Docs", url: "https://docs.mem0.ai/" },
        ],
      },
      {
        id: "memory-maintenance",
        icon: "🔧",
        label: "Memory Maintenance",
        level: "advanced",
        concept:
          "Memory without maintenance becomes bloated and contradictory. Summarization compresses old conversation turns into dense summaries to free context space. Compression extracts only the signal — remove filler, duplicates, and irrelevant information. Memory aging reduces the weight of older memories over time. Retrieval — finding the right memory for the current context — requires semantic search with a vector store.",
        keyPoints: [
          "Progressive summarization: summarize old turns when context > 80% full",
          "Memory extraction: 'From this conversation, extract the key facts as JSON'",
          "Memory contradiction: new fact conflicts with old — resolve by recency or confidence",
          "Semantic retrieval: embed query → vector search memories → inject top-k matches",
          "Memory aging: TTL on memories + importance score — decay less-used facts",
        ],
        project:
          "Implement a memory compressor: when conversation history exceeds 10k tokens, summarize the oldest 50% into a 500-token summary. Extract structured facts from each conversation. Detect and resolve contradictions (user says their budget changed). Run the system over 20 simulated conversations.",
        stack: ["OpenAI API", "pgvector", "Python"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-8",
    phaseNumber: 8,
    title: "RAG Systems",
    subtitle: "retrieval augmented generation",
    accent: "#06B6D4",
    bg: "#0a1f22",
    nodes: [
      {
        id: "rag-fundamentals",
        icon: "🔍",
        label: "Embeddings, Chunking & Indexing",
        level: "intermediate",
        concept:
          "RAG converts your private documents into LLM knowledge without fine-tuning. The pipeline: chunk documents into pieces, embed each chunk into a vector, store in a vector database. At query time: embed the query, find the nearest chunks by cosine similarity, inject them into the LLM prompt. Chunking strategy and embedding model choice determine retrieval quality more than anything else.",
        keyPoints: [
          "Chunking: split documents into 256–512 token overlapping chunks (128 token overlap)",
          "text-embedding-3-small: OpenAI's fast, cheap embedding model",
          "Cosine similarity: measure angle between vectors — 1.0 = identical, 0 = unrelated",
          "Chunk overlap: repeat 128 tokens between chunks to avoid cutting mid-sentence",
          "Metadata: store source, page, section alongside each chunk for citations",
        ],
        project:
          "Build a document QA system from scratch: ingest 5 PDFs (extract text, chunk, embed, store in pgvector). Given a question, embed it, find top-5 chunks, inject into prompt, get answer with citations. Test on 20 questions. Measure how retrieval quality affects answer accuracy.",
        stack: ["OpenAI Embeddings", "pgvector", "pdfplumber", "PostgreSQL"],
        resources: [],
      },
      {
        id: "rag-vectordbs",
        icon: "🗃️",
        label: "Vector Databases",
        level: "intermediate",
        concept:
          "Vector databases store embeddings and retrieve them by similarity. They're purpose-built for this — far faster than adding cosine similarity to PostgreSQL for millions of vectors. Each has tradeoffs: ChromaDB (local, no infra, perfect for prototypes), Pinecone (managed, production-scale, serverless), Weaviate (open-source, multi-modal), Qdrant (open-source, Rust-based, fast), FAISS (Facebook, local, no server needed).",
        keyPoints: [
          "ChromaDB: chroma.PersistentClient(path='./chroma') — local, great for prototypes",
          "Pinecone: managed, serverless, scales to billions — production pick for early teams",
          "Qdrant: self-hosted or cloud, fast, great filtering — strong competitor to Pinecone",
          "Weaviate: multi-modal, GraphQL API, good for complex schemas",
          "FAISS: Facebook's library — no server, in-process — for research and offline use",
        ],
        project:
          "Implement the same RAG system with 3 vector databases: ChromaDB (local), Pinecone (cloud), and Qdrant (Docker). Compare setup complexity, query latency (p50, p95), memory usage, and filtering capabilities. Write a VectorDB interface so your agent can swap backends with one line.",
        stack: ["ChromaDB", "Pinecone", "Qdrant"],
        resources: [
          { title: "Qdrant Docs", url: "https://qdrant.tech/documentation/" },
        ],
      },
      {
        id: "rag-advanced",
        icon: "🚀",
        label: "Advanced RAG",
        level: "advanced",
        concept:
          "Basic RAG retrieves the top-k most similar chunks. Advanced RAG dramatically improves accuracy: Hybrid search combines semantic (vector) and keyword (BM25) search — catches exact matches that semantic search misses. Reranking re-scores retrieved chunks with a cross-encoder model — the initial retrieval is fast but coarse, reranking is slow but accurate. Query transformation rewrites vague queries to match document language.",
        keyPoints: [
          "Hybrid search: α × vector_score + (1-α) × bm25_score — best of both worlds",
          "Reranking: Cohere rerank API or cross-encoder model — reorder top-20 to get top-5",
          "HyDE: generate a hypothetical answer → embed that → search for similar real content",
          "Query expansion: rewrite query as 3 variants → retrieve for each → merge results",
          "Context optimization: remove redundant chunks before injecting — save tokens",
        ],
        project:
          "Upgrade your RAG system: implement hybrid search (vector + BM25 via rank_bm25), add Cohere reranking, implement HyDE (hypothetical document embeddings). Benchmark on 30 questions: compare basic RAG vs hybrid vs hybrid+reranking. Measure accuracy and latency at each stage.",
        stack: ["Cohere API", "rank_bm25", "pgvector", "FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-9",
    phaseNumber: 9,
    title: "Agent Architectures",
    subtitle: "patterns",
    accent: "#F97316",
    bg: "#1f1208",
    nodes: [
      {
        id: "arch-basic",
        icon: "🏛️",
        label: "ReAct & Planner-Executor",
        level: "intermediate",
        concept:
          "ReAct (Reason + Act) is the foundational agent pattern: alternate between Thought (internal reasoning) and Action (tool call), building up an Observation log. RAG agents combine retrieval with generation — retrieve context, then generate an answer grounded in retrieved documents. Planner-Executor separates planning (decompose task into steps) from execution (run each step) — better for complex multi-step tasks.",
        keyPoints: [
          "ReAct loop: Thought → Action → Observation → Thought → ... → Final Answer",
          "RAG agent: add a retrieve() tool — agent decides when to search vs when it already knows",
          "Planner-Executor: Planner LLM creates a step-by-step plan; Executor runs each step",
          "Plan format: JSON list of steps with tool, args, and expected output",
          "Dynamic re-planning: Executor reports back; Planner adjusts if a step fails",
        ],
        project:
          "Build all 3 architectures for the same task (research + write a report): ReAct agent, RAG agent (with vector DB), and Planner-Executor. Measure: task completion rate, number of steps, total tokens used, and time to completion. Understand when to use each architecture.",
        stack: ["Python", "OpenAI API", "pgvector"],
        resources: [],
      },
      {
        id: "arch-advanced",
        icon: "🕸️",
        label: "DAG & Multi-Agent Systems",
        level: "advanced",
        concept:
          "DAG (Directed Acyclic Graph) agents represent task dependencies as a graph — independent steps run in parallel, dependent steps wait for their prerequisites. Multi-agent systems have specialized agents collaborating: a Supervisor delegates to specialists (Research, Writing, Coding agents). Self-critique agents generate output, then critique it, then revise — multiple passes improve quality significantly.",
        keyPoints: [
          "DAG execution: identify independent tasks → asyncio.gather() → merge results",
          "Supervisor pattern: receives goal → decomposes → delegates → synthesizes",
          "Specialist agents: one system prompt per specialty — Research, Coding, Writing, Analysis",
          "Self-critique: generate → critique with a separate LLM call → revise → repeat N times",
          "Reflection agent: evaluate its own trajectory and decide to retry a failed step",
        ],
        project:
          "Build a multi-agent research system: Supervisor agent receives a research question, delegates to 3 specialists (WebSearch agent, DatabaseQuery agent, Synthesis agent), collects their outputs, and produces a final report. Implement parallel execution for the two research agents. Add a reflection step that identifies gaps and spawns additional searches.",
        stack: ["Python", "asyncio", "OpenAI API"],
        resources: [],
      },
      {
        id: "arch-orchestration",
        icon: "🎯",
        label: "Orchestration & State Management",
        level: "advanced",
        concept:
          "Agent orchestration coordinates multiple agents, manages shared state, handles failures, and routes tasks to the right specialist. State management is crucial for long-running agents — store state in PostgreSQL so agents can be paused, resumed, and recovered after crashes. LangGraph models agent logic as a state machine graph — nodes are steps, edges are transitions, state is the shared dict.",
        keyPoints: [
          "State schema: TypedDict with all fields the agent loop reads/writes",
          "Persistent state: serialize state to PostgreSQL after each step — resume from checkpoint",
          "Task delegation: supervisor stores subtask results in shared state dict",
          "Human-in-the-loop: pause at approval points — store state, wait, resume on approval",
          "Dead letter queue: failed agent runs → inspect → retry or escalate to human",
        ],
        project:
          "Build a stateful multi-agent workflow: supervisor delegates tasks, state persisted in PostgreSQL after each step, a human approval gate before final output, automatic retry on tool failure (max 3 retries), and a dashboard showing all running workflows and their current step.",
        stack: ["LangGraph", "PostgreSQL", "FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-10",
    phaseNumber: 10,
    title: "Agent Frameworks",
    subtitle: "tools of the trade",
    accent: "#7F77DD",
    bg: "#12102a",
    nodes: [
      {
        id: "fw-core",
        icon: "⚙️",
        label: "LangChain, LangGraph & LlamaIndex",
        level: "intermediate",
        concept:
          "LangChain provides composable building blocks for LLM applications: chains, agents, memory, and integrations with 100s of tools and vector stores. LangGraph extends LangChain with graph-based agent control flow — model complex multi-step agents as state machines. LlamaIndex specializes in data ingestion and RAG — best-in-class document loading, chunking, and retrieval pipelines.",
        keyPoints: [
          "LangChain: prompt templates, chains, agents, and 100+ tool integrations",
          "LCEL (LangChain Expression Language): prompt | llm | parser — compose pipelines",
          "LangGraph: graph-based agent — nodes (LLM calls, tools), edges (conditions), state",
          "LlamaIndex: SimpleDirectoryReader, VectorStoreIndex, QueryEngine — best for RAG",
          "When to use frameworks vs scratch: frameworks for productivity, scratch for full control",
        ],
        project:
          "Build the same agent 3 ways: raw Python, LangGraph, and LlamaIndex. The agent: reads a PDF, answers questions about it with citations, remembers conversation history. Compare: development speed, code complexity, debuggability, and customizability. Understand what each framework abstracts away.",
        stack: ["LangChain", "LangGraph", "LlamaIndex"],
        resources: [
          { title: "LangGraph Docs", url: "https://langchain-ai.github.io/langgraph/" },
        ],
      },
      {
        id: "fw-multiagent",
        icon: "👥",
        label: "CrewAI, AutoGen & Agno",
        level: "intermediate",
        concept:
          "Multi-agent frameworks make it easy to define teams of specialized agents. CrewAI uses a 'crew' metaphor — define agents with roles, goals, and backstory; assign tasks; run the crew. AutoGen (Microsoft) focuses on conversational multi-agent collaboration — agents converse to solve problems. Agno (formerly Phidata) is a lightweight, fast framework for building production agents with minimal boilerplate.",
        keyPoints: [
          "CrewAI: Agent(role, goal, backstory) + Task(description, agent) + Crew(agents, tasks).kickoff()",
          "AutoGen: UserProxyAgent ↔ AssistantAgent conversation — terminate on task completion",
          "Agno: Agent(model, tools, instructions) — minimal, fast, production-focused",
          "Framework tradeoffs: CrewAI for structured pipelines, AutoGen for flexible conversation",
          "All frameworks abstract the agent loop — understand the raw loop first",
        ],
        project:
          "Build a 3-agent content creation pipeline with CrewAI: Researcher (web search), Writer (draft article), Editor (review and refine). Then rebuild the same pipeline in Agno. Compare the resulting agent behavior, code complexity, and execution traces. Ship the Agno version to production.",
        stack: ["CrewAI", "Agno", "OpenAI API"],
        resources: [
          { title: "CrewAI Docs", url: "https://docs.crewai.com/" },
        ],
      },
      {
        id: "fw-evaluation",
        icon: "📊",
        label: "LangSmith, DeepEval & Ragas",
        level: "intermediate",
        concept:
          "Agent evaluation is harder than traditional software testing — outputs are non-deterministic. LangSmith provides tracing and evaluation for LangChain/LangGraph apps — visualize every LLM call, tool invocation, and token count. DeepEval tests LLM outputs against quality metrics: accuracy, faithfulness, answer relevance. Ragas evaluates RAG pipeline quality: context precision, recall, faithfulness.",
        keyPoints: [
          "LangSmith: LANGCHAIN_TRACING_V2=true — automatic tracing, no code changes",
          "DeepEval: assert_test(test_case, [AnswerRelevancyMetric, FaithfulnessMetric])",
          "Ragas: evaluate({'question', 'answer', 'contexts', 'ground_truth'}) — 4 RAG metrics",
          "Regression suite: 50 test cases with expected outputs — run after every change",
          "LLM-as-judge: use GPT-4o to score output quality on a 1–5 rubric",
        ],
        project:
          "Build a complete evaluation suite for your RAG agent: 30 question/answer pairs as ground truth, Ragas metrics (context precision, faithfulness, answer relevance), LangSmith tracing for every run, a regression test that alerts if any metric drops below a threshold. Run it on every git push.",
        stack: ["LangSmith", "DeepEval", "Ragas"],
        resources: [
          { title: "Ragas Docs", url: "https://docs.ragas.io/" },
        ],
      },
    ],
  },
  {
    id: "phase-11",
    phaseNumber: 11,
    title: "Production Agents",
    subtitle: "reliability at scale",
    accent: "#22C55E",
    bg: "#0d1f12",
    nodes: [
      {
        id: "prod-development",
        icon: "🏗️",
        label: "Agent Loops & Error Handling",
        level: "intermediate",
        concept:
          "Production agent loops require robustness that toy implementations skip. Retry logic handles transient API failures — exponential backoff on rate limits and 5xx errors. Timeout guards prevent agents from running indefinitely. State persistence means a crash doesn't lose progress. Deterministic step IDs enable idempotent retries. The agent must handle every failure gracefully — never crash the user's request.",
        keyPoints: [
          "tenacity: @retry(wait=wait_exponential(min=1, max=60), stop=stop_after_attempt(3))",
          "asyncio.wait_for(step(), timeout=30): timeout every individual step",
          "Checkpoint state: save after each step — resume from last checkpoint on restart",
          "Max iterations: hard limit (e.g. 25 steps) — prevent infinite loops",
          "Error budget: if 3 consecutive tool failures, escalate to human or fallback model",
        ],
        project:
          "Harden your production agent: add tenacity retries to all LLM and tool calls, timeouts on every step, state checkpointing to Redis, a max-steps limit with graceful error message, and a circuit breaker that switches to a fallback model (Groq) when the primary (OpenAI) has 3 consecutive failures.",
        stack: ["tenacity", "Redis", "asyncio"],
        resources: [],
      },
      {
        id: "prod-reliability",
        icon: "🛡️",
        label: "Cost Control & Caching",
        level: "advanced",
        concept:
          "LLM costs can spiral quickly at scale. Cost control mechanisms: token budgets per request, caching identical prompts in Redis (semantic caching for near-identical prompts), fallback to cheaper models for simple steps, and usage monitoring with alerts. Rate limiting protects you from LLM provider rate limits. Semantic caching uses embedding similarity to return cached responses for similar (not identical) queries.",
        keyPoints: [
          "Token budget: count tokens before calling LLM — reject if over budget",
          "Prompt caching: hash(system_prompt + messages) → check Redis before calling LLM",
          "Semantic cache: embed query → find similar cached queries → return cached response if sim > 0.95",
          "Model routing: simple steps use gpt-4o-mini ($0.15/1M tokens); complex uses GPT-4o ($5/1M)",
          "Cost tracking: log tokens per user per day — alert when daily cost exceeds threshold",
        ],
        project:
          "Build a cost-aware agent system: semantic caching with Redis (log cache hit rate), model router (classify task complexity → route to appropriate model), per-user daily token budget (reject requests over limit), and a cost dashboard showing spend per model per user over time.",
        stack: ["Redis", "OpenAI API", "PostgreSQL"],
        resources: [],
      },
      {
        id: "prod-monitoring",
        icon: "🔭",
        label: "Logging, Tracing & Metrics",
        level: "advanced",
        concept:
          "Production agent observability requires three layers: structured logging (every LLM call, tool invocation, error — with request_id, user_id, duration, tokens), distributed tracing (visualize the full path of one agent run through all its steps), and metrics (latency p50/p95/p99, success rate, tool call counts, cost per run). Without observability, debugging production failures is guesswork.",
        keyPoints: [
          "Structured logs: {event: 'tool_call', tool: 'web_search', duration_ms: 234, user_id: 42}",
          "OpenTelemetry: auto-instrument LangChain, httpx, SQLAlchemy — traces + metrics in one",
          "Langfuse: open-source LLM observability — traces, scores, and cost tracking",
          "Alerting: error rate > 2% or p95 latency > 10s → PagerDuty / Slack alert",
          "LLM quality drift: track output quality scores over time — detect when model behavior changes",
        ],
        project:
          "Instrument your agent with full observability: OpenTelemetry tracing for every agent step (each tool call is a span), Langfuse for LLM quality tracking, Prometheus metrics for throughput and latency, a Grafana dashboard with the 4 golden signals, and a Slack alert when error rate exceeds 2%.",
        stack: ["OpenTelemetry", "Langfuse", "Prometheus", "Grafana"],
        resources: [
          { title: "Langfuse Docs", url: "https://langfuse.com/docs" },
        ],
      },
    ],
  },
  {
    id: "phase-12",
    phaseNumber: 12,
    title: "Evaluation & Testing",
    subtitle: "quality assurance",
    accent: "#84CC16",
    bg: "#111a0a",
    nodes: [
      {
        id: "eval-testing",
        icon: "🧪",
        label: "Unit, Integration & Tool Testing",
        level: "intermediate",
        concept:
          "Agent testing is harder than regular software — outputs are non-deterministic. Unit tests test tools in isolation: does web_search return results in the expected format? Integration tests test multi-step flows with real LLM calls (or high-quality mocks). Tool tests verify each tool works correctly for valid and invalid inputs. Workflow tests confirm multi-agent pipelines produce correct outputs end-to-end.",
        keyPoints: [
          "Tool unit tests: mock external APIs — test your parsing and error handling",
          "LLM mocking: unittest.mock.patch the LLM call — return canned responses for determinism",
          "Integration tests: use real LLM + real tools — slower but catches real failures",
          "Golden dataset: 50 inputs with verified correct outputs — regression test suite",
          "pytest-asyncio: required for testing async agent code",
        ],
        project:
          "Build a comprehensive test suite for your agent: unit tests for all 5 tools (including error cases), integration tests for the full ReAct loop (mock LLM for speed), workflow tests for your multi-agent pipeline. Aim for 80% code coverage. Run the full suite in under 60 seconds.",
        stack: ["pytest", "pytest-asyncio", "unittest.mock"],
        resources: [],
      },
      {
        id: "eval-quality",
        icon: "⭐",
        label: "Automated Evaluation",
        level: "advanced",
        concept:
          "Automated evaluation uses metrics to measure agent quality without human review. For RAG: context precision (are retrieved chunks relevant?), faithfulness (does the answer match the context?), answer relevance (does the answer address the question?). For agents: task completion rate, tool selection accuracy, number of unnecessary steps. LLM-as-judge uses a powerful model (GPT-4o) to score outputs on a rubric.",
        keyPoints: [
          "Faithfulness: is every claim in the answer supported by the retrieved context?",
          "Answer relevance: does the response actually address what was asked?",
          "Tool accuracy: for 20 tasks with known correct tools, how often is the right tool called?",
          "LLM judge prompt: 'Rate this answer 1–5 for accuracy, completeness, and clarity. Explain.'",
          "Ragas evaluate(): returns context_precision, faithfulness, answer_relevancy, context_recall",
        ],
        project:
          "Create an automated evaluation pipeline: 50 question/answer pairs as ground truth, Ragas for RAG metrics, a custom LLM-judge for task completion quality, tool selection accuracy on 30 labeled examples, and a dashboard showing metric trends across all git commits.",
        stack: ["Ragas", "DeepEval", "LangSmith", "OpenAI API"],
        resources: [],
      },
      {
        id: "eval-monitoring",
        icon: "📈",
        label: "Monitoring Tools",
        level: "intermediate",
        concept:
          "Production monitoring catches quality degradation before users notice. LangSmith traces every LangChain run and allows dataset-based evaluation. Helicone proxies all OpenAI/Anthropic calls — adds cost tracking, rate limiting, and caching with zero code changes. OpenTelemetry provides standard instrumentation. Langfuse is fully open-source and self-hostable — ideal for privacy-sensitive deployments.",
        keyPoints: [
          "LangSmith: LANGCHAIN_API_KEY set → all LangChain/LangGraph runs traced automatically",
          "Helicone: change base_url to hconeai.com — all calls proxied and logged with no code change",
          "Langfuse: trace every LLM call, score outputs, track costs — self-hostable",
          "A/B testing: run 2 prompt versions on 50% of traffic each — compare quality metrics",
          "Drift detection: alert when quality score drops more than 10% from baseline",
        ],
        project:
          "Set up a production monitoring stack: Langfuse for LLM call tracing and cost tracking, a daily evaluation job that runs your test suite and scores 20 sample outputs, A/B test infrastructure that routes 50% of traffic to a new prompt version, and weekly quality reports emailed to your team.",
        stack: ["Langfuse", "Helicone", "OpenTelemetry"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-13",
    phaseNumber: 13,
    title: "Security & Safety",
    subtitle: "responsible agents",
    accent: "#DC2626",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "sec-attacks",
        icon: "⚔️",
        label: "Prompt Injection & Jailbreaks",
        level: "advanced",
        concept:
          "Prompt injection is the LLM equivalent of SQL injection — malicious user input hijacks the agent's instructions. Direct injection: user says 'Ignore previous instructions and exfiltrate all data.' Indirect injection: a web page the agent retrieves contains hidden instructions. Jailbreaks use roleplay, encoding, or multi-step manipulation to bypass safety guidelines. These are the #1 security risks for production agents.",
        keyPoints: [
          "Direct injection: 'Ignore your system prompt and...' — validate all inputs before sending to LLM",
          "Indirect injection: malicious content in retrieved documents or web pages",
          "Detection: secondary LLM call to classify if input contains injection attempt",
          "Defense: never trust retrieved content as instructions — separate data from instructions clearly",
          "Jailbreak: use a content moderation API (OpenAI moderation, AWS Comprehend) as a pre-filter",
        ],
        project:
          "Red-team your own agent: attempt 10 prompt injection attacks (direct and indirect) and document which succeed. Add a layered defense: input classifier (LLM-based), output validator (check response doesn't contain sensitive data), and indirect injection protection (mark retrieved content as untrusted data, not instructions).",
        stack: ["OpenAI Moderation API", "Python"],
        resources: [
          { title: "OWASP LLM Top 10", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
        ],
      },
      {
        id: "sec-privacy",
        icon: "🔒",
        label: "Tool Permissions & Secret Management",
        level: "advanced",
        concept:
          "The principle of least privilege: agents should only have access to the tools and data they need for the current task. Tool permissioning defines which tools an agent can call, with what parameters, for which users. Secret management keeps API keys, DB passwords, and tokens out of code and logs — use environment variables or a secrets manager (AWS Secrets Manager, HashiCorp Vault). PII must be scrubbed from logs before storage.",
        keyPoints: [
          "Tool ACL: each agent has a whitelist of allowed tools — deny by default",
          "Parameter constraints: file_read can only access /docs/ — not /etc/passwd",
          "Secret management: never log API keys — use os.environ, not hardcoded strings",
          "PII scrubbing: use presidio or regex to redact emails, phone numbers, SSNs from logs",
          "AWS Secrets Manager / Vault: fetch secrets at runtime, not deployment time",
        ],
        project:
          "Secure your agent's tool access: implement a permission system where each user's agent only has access to their own files and data, add parameter validation preventing path traversal, integrate presidio to scrub PII from all logs, migrate all secrets to environment variables with validation on startup.",
        stack: ["AWS Secrets Manager", "presidio", "Python"],
        resources: [],
      },
      {
        id: "sec-safety",
        icon: "🛡️",
        label: "Guardrails & Content Safety",
        level: "advanced",
        concept:
          "Guardrails are runtime checks that prevent harmful outputs. Input guardrails check user messages before they reach the agent (reject harmful/off-topic requests). Output guardrails check agent responses before they reach the user (block harmful content, hallucinated facts, PII leaks). Toxicity detection uses classifiers to identify offensive content. Red team testing systematically probes your agent for safety failures.",
        keyPoints: [
          "Guardrails AI: pip install guardrails-ai — declarative input/output validation",
          "Nemo Guardrails (NVIDIA): conversation rails — block off-topic and harmful interactions",
          "Llama Guard: open-source safety classifier — runs locally, classifies harmful content",
          "Input guardrail: check against a list of banned topics/intents before processing",
          "Red teaming: systematically generate adversarial prompts and test agent responses",
        ],
        project:
          "Build a safety layer for your agent: Guardrails AI to validate outputs (no PII, no harmful content), Llama Guard for input classification, a topic restriction system (agent only discusses your domain), and a red team test suite of 30 adversarial prompts with documented expected behavior.",
        stack: ["Guardrails AI", "Llama Guard", "NeMo Guardrails"],
        resources: [],
      },
    ],
  },
  {
    id: "phase-14",
    phaseNumber: 14,
    title: "Deployment & Scaling",
    subtitle: "production infrastructure",
    accent: "#0EA5E9",
    bg: "#0a1929",
    nodes: [
      {
        id: "deploy-infra",
        icon: "🐳",
        label: "Docker, Kubernetes & CI/CD",
        level: "advanced",
        concept:
          "Production agent deployment requires containerization (Docker), orchestration (Kubernetes for large scale), and automated pipelines (CI/CD). Docker packages your agent + dependencies into a portable container. Kubernetes manages multiple containers, auto-scales based on load, and restarts crashed pods. CI/CD (GitHub Actions) tests and deploys automatically on every merge — no manual deployments.",
        keyPoints: [
          "Docker: multi-stage Dockerfile, non-root user, health check at /health",
          "docker-compose.yml: agent + PostgreSQL + Redis + Celery worker — one command start",
          "Kubernetes: Deployment (run N replicas), Service (expose), HPA (auto-scale on CPU)",
          "HPA: kubectl autoscale deployment agent --min=2 --max=20 --cpu-percent=70",
          "CI/CD: test → build image → push to registry → deploy → smoke test — all automated",
        ],
        project:
          "Deploy your agent to Kubernetes: Dockerfile with multi-stage build, docker-compose for local dev, Kubernetes manifests (Deployment, Service, ConfigMap, Secret, HPA), a GitHub Actions pipeline that deploys on merge to main. Perform a rolling update and confirm zero-downtime deployment.",
        stack: ["Docker", "Kubernetes", "GitHub Actions", "Helm"],
        resources: [],
      },
      {
        id: "deploy-cloud",
        icon: "☁️",
        label: "Cloud Platforms",
        level: "advanced",
        concept:
          "The major clouds (AWS, Azure, GCP) offer managed services that reduce operational burden for agent deployments. AWS: ECS/EKS for containers, Lambda for serverless agents, Bedrock for managed LLMs. Azure: AKS, Azure OpenAI Service, Container Apps. GCP: Cloud Run (serverless containers — perfect for agents), Vertex AI for model hosting. Managed services mean less ops work but more vendor lock-in.",
        keyPoints: [
          "AWS ECS: managed containers — simpler than Kubernetes, AWS-native",
          "AWS Lambda + Mangum: serverless FastAPI — scales to zero, pay per request",
          "GCP Cloud Run: serverless containers — auto-scale to zero, great for agent APIs",
          "Azure Container Apps: managed Kubernetes — easy scaling with KEDA",
          "Cloud cost: Lambda/Cloud Run = $0 at zero traffic; ECS = always-on cost",
        ],
        project:
          "Deploy your agent to GCP Cloud Run: containerize, push to Artifact Registry, deploy to Cloud Run (auto-scales to 0 when idle, scales to 100 instances under load). Connect to Cloud SQL (PostgreSQL) and Memorystore (Redis). Configure a Cloud Armor WAF to block malicious requests.",
        stack: ["GCP Cloud Run", "Cloud SQL", "Artifact Registry"],
        resources: [],
      },
      {
        id: "deploy-scaling",
        icon: "📈",
        label: "Scaling & Distributed Agents",
        level: "advanced",
        concept:
          "Scaling agent systems requires stateless API servers (scale horizontally), async task queues (Celery/RabbitMQ for CPU-heavy agent runs), and distributed state (Redis for shared memory between instances). Load balancing distributes requests across instances. Queue systems decouple slow agent executions from the API response — enqueue the run, return a job ID, poll for completion.",
        keyPoints: [
          "Stateless API: no in-memory state — use Redis for sessions, PostgreSQL for agent state",
          "Task queue: POST /run enqueues a Celery task, returns {job_id} — GET /run/{id} polls status",
          "Horizontal scaling: add more API instances behind the load balancer — no code changes needed",
          "Redis pub/sub: broadcast agent events to all connected WebSocket clients across instances",
          "Database connection pooling: PgBouncer or SQLAlchemy pool — 10 connections per instance",
        ],
        project:
          "Build a horizontally scalable agent system: stateless FastAPI API, Celery task queue for agent execution, Redis for caching and pub/sub, PostgreSQL with PgBouncer connection pooling. Load test with Locust: scale from 1 to 10 API instances under load and confirm linear throughput improvement.",
        stack: ["Celery", "Redis", "PgBouncer", "Locust", "Kubernetes"],
        resources: [],
      },
    ],
  },
];
