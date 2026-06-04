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
        deepDive: `A model family is a collection of models built using the same architecture and training methodology but released in different sizes or versions.

Family lineages:

GPT Family: GPT-1 → GPT-2 → GPT-3 → GPT-3.5 → GPT-4 → GPT-4 Turbo → GPT-4o
Llama Family: Llama 1 → Llama 2 → Llama 3 → Llama 3.1 → Llama 4
Qwen Family: Qwen 1 → Qwen 2 → Qwen 2.5 → Qwen 3
Gemini Family: Gemini 1.0 → Gemini 1.5 → Gemini 2.x

1. Open Weight vs Closed Weight

Open Weight models are publicly available. You can download, fine-tune, host, and modify them. Examples: Llama, Qwen, Mistral, Gemma, DeepSeek. Advantages: full control, privacy, custom fine-tuning, lower long-term costs. Disadvantages: need GPUs, infrastructure management, maintenance.

Closed Weight models hide their weights — API-only access. Examples: GPT-4o, Claude, Gemini. Advantages: best performance, no infrastructure, easy deployment. Disadvantages: API costs, vendor lock-in, limited customization.

2. Foundation Models

A Foundation Model is a large pretrained model trained on massive datasets. These models learn language, reasoning, coding, and general knowledge. They serve as the base for many downstream applications. Examples: GPT-4o, Claude, Gemini, Llama, Qwen.

3. Base Models

A Base Model is trained only for next-token prediction. It has not been instructed to behave like a chatbot. Prompt "What is the capital of France?" may continue text unpredictably. Characteristics: raw language modeling, not aligned, not instruction-following. Examples: Llama Base, GPT Base models.

Base Model → further trained → Instruct Model
Instruct Model → conversational tuning → Chat Model

4. Instruct Models

Base models are further trained to follow instructions. Prompt "Explain quantum computing in simple terms" gets a proper response. Characteristics: better instruction following, safer outputs, better user interactions. Examples: Llama Instruct, Qwen Instruct, GPT Chat models.

5. Chat Models

Built specifically for conversations. Features: multi-turn memory, conversational tuning, human preference alignment. Examples: ChatGPT, Claude, Gemini Chat, Llama Chat. Applications: assistants, customer support, research agents.

6. Reasoning Models

Designed to perform deeper reasoning before answering. Characteristics: multi-step thinking, planning, problem solving, tool usage. Examples: OpenAI reasoning models, DeepSeek-R1, Qwen reasoning variants. Applications: math, coding, agent planning, complex decision making.

7. Code Models

Specialized for programming tasks. Training data: GitHub repositories, documentation, source code. Capabilities: code generation, debugging, refactoring, test creation. Examples: Codex, DeepSeek-Coder, CodeLlama, Qwen-Coder. Applications: AI software engineers, coding assistants.

8. Embedding Models

These models generate vectors, not text. Input "How to learn machine learning?" → Output [0.12, -0.44, 0.77, ...]. Applications: semantic search, RAG, similarity search, recommendations. Examples: text-embedding-3-small, text-embedding-3-large, BGE, E5.

9. Reranker Models

Used after retrieval to improve quality. Workflow:

User Query
↓
Vector Search
↓
Top 50 Docs
↓
Reranker
↓
Top 5 Docs
↓
LLM

Purpose: improve retrieval quality, increase RAG accuracy. Examples: BGE Reranker, Cohere Reranker.

10. Multimodal Models

Process multiple data types: text, images, audio, video. Examples: GPT-4o, Gemini, Claude, Qwen-VL. Applications: image analysis, document understanding, visual agents.

11. Vision-Language Models (VLMs)

Specialized multimodal models. Can understand: screenshots, diagrams, charts, documents. Examples: GPT-4o Vision, Gemini Vision, LLaVA, Qwen-VL. Applications: OCR, UI automation, medical imaging.

12. Speech Models

Speech-to-Text: Whisper, Deepgram. Text-to-Speech: ElevenLabs, OpenAI TTS. Applications: voice agents, call centers, meeting assistants.

13. Small Language Models (SLMs)

Smaller models — usually 1B–10B parameters. Examples: Phi, Gemma Small, TinyLlama. Advantages: faster, cheaper, local deployment. Applications: edge devices, mobile AI, lightweight agents.

14. Large Language Models (LLMs)

Typically 20B–1000B+ parameters. Examples: GPT-4o, Claude, Gemini, Llama 405B. Advantages: better reasoning, generalization, more knowledge. Applications: enterprise AI, research agents, complex automation.

15. Mixture of Experts (MoE)

Instead of activating the whole model, only selected experts are used. Architecture:

Input
↓
Router
↓
Selected Experts
↓
Output

Advantages: faster inference, lower compute, larger effective capacity. Examples: DeepSeek-V3, Mixtral, some Gemini variants.

16. Domain-Specific Models

Fine-tuned for specific industries. Medical: clinical LLMs, healthcare assistants. Legal: contract analysis, legal research. Finance: risk analysis, trading systems.

17. Agent-Oriented Models

Optimized for tool calling and workflows. Capabilities: function calling, structured outputs, planning, tool selection. Examples: GPT-4o, Claude, Gemini, Qwen-Agent variants. Applications: AI agents, multi-agent systems, autonomous workflows.

What Every AI Engineer Should Know

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
        deepDive: `Parameters control how an LLM generates responses. Without changing the model itself, you can make it more creative, deterministic, concise, diverse, or focused.

Temperature

The most important generation parameter. Controls randomness in token selection.

Low Temperature (0.0–0.3): Predictable, consistent, deterministic. Best for coding, SQL, data extraction, structured outputs. Question "What is 2 + 2?" → always "4".

Medium Temperature (0.5–0.8): Balanced creativity and consistency. Best for general chat, AI assistants, educational applications.

High Temperature (1.0–2.0): Creative, diverse, unpredictable. Best for story writing, brainstorming, creative content. Each response to "Write a fantasy kingdom" may be completely different.

Top-P (Nucleus Sampling)

Controls how many possible next tokens are considered. Instead of looking at all possible tokens, the model only considers the most likely tokens whose cumulative probability reaches P. Example: Top-P = 0.9 uses only the top 90% probability mass. Low Top-P: safer, more focused. High Top-P: more diverse, more creative.

Most providers recommend using either Temperature or Top-P — not both aggressively.

Common production settings:

Chat Applications — Temperature = 0.7, Top-P = 1.0
Coding — Temperature = 0.1, Top-P = 1.0
Creative Writing — Temperature = 1.0, Top-P = 1.0

Max Tokens

Controls maximum response length. If Max Tokens = 100, the model stops after approximately 100 generated tokens. Prevents excessive costs, runaway generations, and unnecessarily long outputs. Used heavily in AI agents, customer support bots, and RAG systems.

Stop Sequences

Custom stopping rules. When the model generates a stop sequence like "User:", generation halts. Useful for agents, structured outputs, and multi-turn conversations.

Frequency Penalty

Reduces repetition. Without penalty the model repeats "Python is great." endlessly. With penalty it avoids repeating identical words frequently.

Presence Penalty

Encourages new topics. High presence penalty makes the model explore new ideas rather than repeating previous concepts. Useful for brainstorming and creative generation.

Seed

Used for reproducibility. Generates identical outputs across multiple runs. Important for testing, evaluation, and benchmarks.

Context Window

One of the most important concepts in LLM engineering. The maximum number of tokens a model can process at once. Everything — system prompt, user prompt, chat history, RAG context, tool results, generated response — must fit inside the context window.

Context sizes: Small (8K, 16K, 32K), Medium (128K, 200K), Large (1M+).

Solutions when context is exceeded: summarization, context compression, RAG, memory systems.

2. Streaming

Streaming is how modern AI chat applications feel fast. Without streaming, the user waits for the entire response to be generated. With streaming, tokens are sent immediately as generated — "The capital of France is Paris" appears token-by-token instead of all at once.

Benefits: Better user experience with immediate feedback, lower perceived latency (actual 5s feels like 0.5s), better agent interactions (agents stream thoughts progressively).

Streaming challenges: partial responses need buffering, network connections can break, tool calls often pause streaming during execution.

3. Pricing

Most providers charge per token. You pay for input tokens (everything sent to the model — system prompt, user message, chat history, RAG context) and output tokens (everything generated — final response, agent reasoning).

Total Cost = (Input Tokens × Input Rate) + (Output Tokens × Output Rate)

Cached tokens offer discounts for repeated context. Hidden cost drivers: chat history grows with every message, RAG context adds documents, agent tool outputs loop back. A single agent request may invoke 4–10 model calls.

Cost Optimization Techniques

Context Compression — reduce unnecessary text
Summarization — replace long conversations with summaries
Smart Chunking — retrieve only relevant documents
Model Routing — simple tasks use small models, complex tasks use large ones
Caching — reuse previous results

Throughput Metrics

Tokens Per Second (TPS) — how quickly a model generates text
Latency — time until first token appears
Time To First Token (TTFT) — critical for streaming
Total Response Time — complete generation duration

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
          "Memory is what separates a stateless chatbot from a true agent. Without it, every conversation starts from zero — the agent cannot build on past context, learn from previous tasks, or adapt to the user over time. With memory, the agent learns, remembers, and improves. Modern systems like ChatGPT Memory, Claude Projects, Devin, and Cursor all rely on memory architectures to maintain continuity across sessions and tasks.\n\nAgent memory mirrors human memory in structure. Short-term memory is the context window — fast, accurate, but finite and resets every session. Working memory holds the live state of the current task: the plan, intermediate results, and collected data that only matter while the agent is actively executing. Long-term memory persists across sessions in an external database or vector store, retrieved when relevant to the current task. Episodic memory stores experiences — not raw facts, but events: 'Last Tuesday the agent debugged a race condition in the auth service.' Semantic memory stores factual knowledge independent of when or how it was acquired: company policies, API documentation, user preferences. Procedural memory stores how-to knowledge: workflows, playbooks, and strategies the agent has learned to apply reliably.\n\nIn practice, agents compose multiple memory types simultaneously. A coding agent uses working memory to track the current plan, short-term memory to hold the last 20 messages, semantic memory to recall relevant API docs, and episodic memory to avoid repeating a failed approach it tried in a previous session. The memory lifecycle is continuous: receive input → retrieve relevant memories → reason → act → update memory. Every memory layer both reads and writes on every turn.",
        deepDive: `Memory is what makes agents intelligent over time. A model without memory is stationary — it can never improve, personalize, or build on past work. Here are the eight memory types every agent engineer must understand.

1. Short-Term Memory

The most basic memory type. Stores the current conversation context inside the prompt.

Architecture:

User Input
↓
Context Window (messages list)
↓
LLM
↓
Response appended to context

Everything in the messages array is short-term memory. The model can reference any prior turn directly.

Example:
User: "My name is Tisha."
Later: "What's my name?" → "Tisha."

Limitations:
Context windows are finite — 128K, 200K, or 1M tokens.
Once the window fills, old messages must be dropped or summarized.
Resets entirely at the end of every session.

Implementation:

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user",   "content": "My name is Tisha"},
    {"role": "assistant", "content": "Nice to meet you, Tisha."},
    {"role": "user",   "content": "What's my name?"}
]

Manage context size:

MAX_TOKENS = 100_000

def trim_messages(messages: list, max_tokens: int) -> list:
    while count_tokens(messages) > max_tokens:
        messages.pop(1)  # remove oldest non-system message
    return messages

2. Working Memory

The agent's scratch pad during a single task execution. Holds live state — the current plan, intermediate results, and collected data — that only matters while the task is running. Deleted when the task completes.

Example — research agent working memory:

working_memory = {
    "task": "Research top 5 AI coding tools",
    "plan": ["search", "scrape", "compare", "summarize"],
    "current_step": "scrape",
    "collected_sources": [...],
    "partial_results": {...},
    "notes": "GitHub Copilot has 1.5M users"
}

Human analogy: the numbers you hold in your head while doing mental arithmetic. Gone once you have the answer.

Implementation pattern:

class WorkingMemory:
    def __init__(self):
        self.state: dict = {}

    def set(self, key: str, value):
        self.state[key] = value

    def get(self, key: str, default=None):
        return self.state.get(key, default)

    def clear(self):
        self.state = {}

3. Long-Term Memory

Persists across sessions in an external database or vector store. The agent retrieves relevant long-term memories at the start of each conversation and injects them into the system prompt.

Architecture:

End of session
↓
Extract key facts from conversation
↓
Store in PostgreSQL / Redis / Vector DB
↓
New session starts
↓
Retrieve relevant memories by semantic search
↓
Inject into system prompt
↓
Agent has context from past sessions

Storage options:
PostgreSQL — structured facts (user preferences, settings)
Redis — fast key/value (session state, recent activity)
Vector DB — semantic retrieval (Qdrant, Pinecone, Chroma)

Implementation:

def save_memory(user_id: str, content: str, category: str):
    embedding = embed(content)
    db.execute(
        "INSERT INTO memories (user_id, content, embedding, category, created_at) VALUES (%s, %s, %s, %s, NOW())",
        [user_id, content, embedding, category]
    )

def retrieve_memory(user_id: str, query: str, top_k: int = 5) -> list[str]:
    query_embedding = embed(query)
    rows = db.execute(
        "SELECT content FROM memories WHERE user_id = %s ORDER BY embedding <-> %s LIMIT %s",
        [user_id, query_embedding, top_k]
    )
    return [row["content"] for row in rows]

4. Episodic Memory

Stores experiences — past events, decisions, and outcomes — not raw facts. The agent can recall what happened and apply that learning to future situations.

Semantic memory: "OAuth 2.0 is an authorization protocol."
Episodic memory: "On March 3rd, the OAuth token expired mid-task and caused a 401 loop. Fixed by checking token expiry before each API call."

What gets stored:
Past tasks and their outcomes
Decisions made and why
Failures and how they were resolved
Sequences of actions that worked

Implementation:

@dataclass
class Episode:
    timestamp: datetime
    task: str
    actions: list[str]
    outcome: str
    lessons: str

def store_episode(episode: Episode):
    content = f"Task: {episode.task}\nOutcome: {episode.outcome}\nLesson: {episode.lessons}"
    save_memory(user_id, content, category="episode")

Before starting a new task, retrieve similar past episodes:

similar_episodes = retrieve_memory(user_id, f"similar to: {current_task}", top_k=3)
system_prompt += f"\n\nRelevant past experiences:\n" + "\n".join(similar_episodes)

5. Semantic Memory

Stores factual knowledge independent of experience — things the agent knows, not things the agent has done.

Examples:
Company: "Acme Corp uses PostgreSQL 15 on AWS RDS."
User: "Prefers concise responses, no bullet points, uses Python 3.11."
Domain: "The refund policy allows returns within 30 days."
Technical: "The payments API rate limit is 100 req/min."

Implementation with RAG:

Document ingestion:
Company handbook → chunk → embed → vector DB

Retrieval at query time:
User question → embed → similarity search → top-k chunks → inject into prompt

Semantic memory answers: what does the agent know?
Episodic memory answers: what has the agent experienced?

Both are stored the same way (vector DB) but serve different reasoning purposes.

6. Procedural Memory

Stores how-to knowledge: workflows, strategies, and playbooks.

Examples:
"To debug a production incident: check logs first, then metrics, then traces."
"To onboard a new customer: create CRM record → send welcome email → create billing subscription."
"To review a PR: check for security issues, then performance, then style."

Architecture:
Often stored as: system prompt instructions, agent rules, named playbooks.

PLAYBOOKS = {
    "debug_incident": [
        "Check application logs for errors in the last 30 minutes",
        "Check metrics dashboard for anomalies",
        "Check recent deployments for correlation",
        "Create incident report"
    ],
    "customer_onboarding": [
        "Create customer in CRM",
        "Send welcome email",
        "Create Stripe subscription",
        "Open onboarding ticket in Jira"
    ]
}

def get_playbook(task_type: str) -> list[str]:
    return PLAYBOOKS.get(task_type, [])

7. Shared Memory (Multi-Agent)

When multiple agents collaborate, they share a common memory store.

Agent A (researcher) stores:
Market analysis results
Source URLs
Statistics

Agent B (writer) reads the same store and uses the data.

Architecture:

Agent A → Write → Shared Memory Store ← Read → Agent B

Implementation:

class SharedMemory:
    def __init__(self):
        self._store = {}

    def write(self, agent_id: str, key: str, value):
        self._store[f"{key}"] = {"value": value, "written_by": agent_id}

    def read(self, key: str):
        return self._store.get(key, {}).get("value")

Used in: LangGraph multi-agent graphs, CrewAI shared state, AutoGen group chats.

8. Vector Memory

The most common modern implementation of long-term, semantic, and episodic memory. Stores memories as embeddings in a vector database. Retrieval is semantic — the agent finds the most relevant memories for the current context regardless of exact wording.

Memory
↓
text-embedding-3-small → [0.12, -0.55, 0.89, ...]
↓
Qdrant / Pinecone / Chroma
↓
At query time: embed query → cosine similarity search → top-k results

Implementation with Qdrant:

from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

client = QdrantClient(":memory:")

def store_memory(memory_id: int, text: str, metadata: dict):
    client.upsert("memories", points=[
        PointStruct(id=memory_id, vector=embed(text), payload={"text": text, **metadata})
    ])

def recall(query: str, top_k: int = 5) -> list[str]:
    results = client.search("memories", query_vector=embed(query), limit=top_k)
    return [r.payload["text"] for r in results]

Memory Hierarchy in Production

Long-term memory (vector DB + PostgreSQL) — persists forever
Semantic memory (RAG over documents) — persists forever
Episodic memory (past experiences) — persists forever
Working memory (task state dict) — deleted on task completion
Short-term memory (context window messages) — resets each session

The agent reads all layers before reasoning. It writes to long-term, episodic, and semantic memory at end-of-task.

Memory Challenges

Memory bloat — too many stored memories slow retrieval and increase costs.
Solution: importance scoring + TTL. Only store memories above a relevance threshold; expire memories unused for 90 days.

Memory drift — stored facts become outdated.
Solution: recency weighting. Newer memories score higher than older ones during retrieval.

Retrieval failure — the right memory exists but doesn't surface.
Solution: hybrid search (dense vector + sparse BM25 keyword). Also store memories with rich metadata for filtering.

Conflicting memories — two stored memories disagree.
Solution: resolve by recency (newer wins) or confidence score. Flag conflicts for human review in high-stakes applications.`,
        keyPoints: [
          "Short-term memory = the messages list / context window — fast and accurate, resets every session",
          "Working memory = live task state dict (plan, partial results, notes) — exists only during execution, cleared on completion",
          "Long-term memory = external PostgreSQL / Redis / vector DB — persists across sessions, retrieved by semantic search",
          "Episodic memory = past experiences with outcomes and lessons — 'OAuth loop caused failure on March 3, fixed by pre-checking expiry'",
          "Semantic memory = factual knowledge (user preferences, company policies, API docs) — the agent knows it, doesn't remember learning it",
          "Procedural memory = how-to workflows and playbooks — stored as rules, instructions, or named procedure lists",
          "Shared memory = multi-agent pattern — Agent A writes, Agent B reads from the same store (LangGraph state, CrewAI)",
          "Vector memory = embed text → store in Qdrant/Pinecone/Chroma → semantic similarity search at retrieval time",
          "Memory lifecycle: retrieve relevant memories → inject into prompt → agent reasons → act → store new memories",
          "Memory bloat: importance scoring + TTL — only store above threshold, expire unused memories after 90 days",
          "Memory drift: recency weighting — newer memories score higher than older ones during retrieval",
          "Conflicting memories: resolve by recency (newer wins) or confidence score; flag high-stakes conflicts for human review",
        ],
        project:
          "Build a memory-layered personal assistant with all four main memory types. Short-term: rolling window of last 20 messages, trimmed when context exceeds 80K tokens. Working memory: a WorkingMemory class with set/get/clear — the agent stores its current plan and intermediate results here during multi-step tasks. Long-term memory: after each conversation, extract 3–5 key facts using an LLM call ('Extract facts from this conversation as JSON: name, preferences, decisions, context'), store them in PostgreSQL with embeddings via pgvector. Episodic memory: after each completed task, store an Episode(task, actions, outcome, lesson) — retrieve the top 3 similar past episodes before starting any new multi-step task. Test with 5 consecutive sessions where each session builds on context from the previous: session 1 (user introduces themselves and states preferences), session 2 (agent recalls preferences without being told again), session 3 (user asks for help with a task that failed similarly before), session 4 (agent recalls the episode and avoids the previous failure), session 5 (ask the agent to describe everything it remembers about the user — verify all four layers contributed).",
        stack: ["PostgreSQL", "pgvector", "Qdrant", "OpenAI Embeddings", "Python"],
        resources: [
          { title: "mem0 — Memory Layer for AI Agents", url: "https://docs.mem0.ai/" },
          { title: "pgvector — Vector Search in PostgreSQL", url: "https://github.com/pgvector/pgvector" },
          { title: "Qdrant Documentation", url: "https://qdrant.tech/documentation/" },
        ],
      },
      {
        id: "memory-systems",
        icon: "🗄️",
        label: "Memory Systems",
        level: "intermediate",
        concept:
          "A memory system is the infrastructure that lets an agent store, organize, retrieve, and update information over time. Without one, every conversation starts from zero — the agent forgets everything the moment a session ends. With a full memory system, the agent remembers user preferences, learns from past tasks, reuses knowledge across sessions, and improves its decisions over time. This is what separates a stateful agent from a stateless chatbot.\n\nA complete memory system combines multiple storage backends, each suited to a different kind of information. Context window memory holds the current conversation directly in the prompt — simple and accurate, but finite and temporary. Vector memory stores embeddings in a database like Qdrant or Pinecone, enabling semantic retrieval across thousands of past memories. Relational database memory (PostgreSQL, SQLite) handles structured facts — user profiles, preferences, project metadata. Graph memory stores relationships between entities, enabling multi-hop reasoning: user → works at → company → uses → product. Most production agents layer all four.\n\nThe hardest problem in memory system design is retrieval: finding the right memory at the right time. The standard approach is hybrid retrieval — combine semantic similarity search (dense vector) with recency weighting and importance scoring. mem0 is the most widely adopted managed memory library for agents — it handles storage, embedding, retrieval, deduplication, and conflict resolution with a single API. For custom systems, the pattern is always: retrieve relevant memories before the LLM call, inject them into the system prompt, and update memory after the agent responds.",
        deepDive: `A memory system has five components: storage, manager, retrieval, ranking, and updating. Each plays a specific role.

Memory System Architecture

User Input
↓
Memory Manager
↓
Memory Retrieval (reads from storage)
↓
Agent Reasoning (LLM + injected memories)
↓
Tool Usage
↓
Memory Update (writes to storage)
↓
Storage

Memory is both read and written on every turn.

1. Context Window Memory

The simplest memory system — store the conversation in the messages list.

messages = [
    {"role": "system",    "content": system_prompt},
    {"role": "user",      "content": "My name is Tisha"},
    {"role": "assistant", "content": "Nice to meet you, Tisha."},
    {"role": "user",      "content": "What's my name?"}
]

Advantages: zero setup, perfectly accurate within a session.
Limitations: finite window, resets on session end, expensive at scale.

Manage context size by trimming when it exceeds a threshold:

def trim_to_limit(messages: list, max_tokens: int) -> list:
    while count_tokens(messages) > max_tokens:
        messages.pop(1)  # remove oldest non-system message
    return messages

2. Vector Memory System

The most common architecture for long-term agent memory. Each memory is embedded and stored as a vector. Retrieval is semantic — the agent finds relevant memories regardless of exact wording.

Storage:
Memory text → embedding model → vector + metadata → vector DB (Qdrant, Pinecone, Chroma)

Retrieval:
Current context → embed → cosine similarity search → top-k results → inject into prompt

Implementation with Qdrant:

from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Distance, VectorParams

client = QdrantClient(url="http://localhost:6333")
client.create_collection("agent_memory", vectors_config=VectorParams(size=1536, distance=Distance.COSINE))

def store(memory_id: int, text: str, user_id: str, category: str):
    client.upsert("agent_memory", points=[
        PointStruct(
            id=memory_id,
            vector=embed(text),
            payload={"text": text, "user_id": user_id, "category": category, "ts": time.time()}
        )
    ])

def retrieve(query: str, user_id: str, top_k: int = 5) -> list[str]:
    results = client.search(
        "agent_memory",
        query_vector=embed(query),
        query_filter={"must": [{"key": "user_id", "match": {"value": user_id}}]},
        limit=top_k
    )
    return [r.payload["text"] for r in results]

3. Relational Database Memory

Structured facts and user profiles stored in PostgreSQL or SQLite. Best for queryable, structured data — not semantic search.

Schema:

CREATE TABLE user_memory (
    id          SERIAL PRIMARY KEY,
    user_id     TEXT NOT NULL,
    category    TEXT NOT NULL,   -- 'preference', 'fact', 'project', 'episode'
    content     TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    importance  FLOAT DEFAULT 1.0
);

CREATE INDEX ON user_memory (user_id, category);

Operations:

def save_fact(user_id: str, category: str, content: str, importance: float = 1.0):
    db.execute(
        "INSERT INTO user_memory (user_id, category, content, importance) VALUES (%s, %s, %s, %s)",
        [user_id, category, content, importance]
    )

def get_facts(user_id: str, category: str) -> list[str]:
    rows = db.execute(
        "SELECT content FROM user_memory WHERE user_id = %s AND category = %s ORDER BY updated_at DESC",
        [user_id, category]
    )
    return [r["content"] for r in rows]

Best for: user profiles, explicit preferences, project history, structured agent metadata.

4. Graph Memory System

Stores entities and relationships. Enables multi-hop reasoning that flat vector search cannot do.

Structure:
Nodes: User, Company, Project, Technology
Edges: works_at, uses, owns, depends_on

Example:
(Tisha) --works_at--> (Acme Corp) --uses--> (PostgreSQL)

Query: "What database does Tisha's company use?"
Graph traversal: Tisha → works_at → Acme Corp → uses → PostgreSQL

Libraries: Neo4j, NetworkX (local), or LLM-extracted JSON graphs.
Used in: enterprise knowledge agents, Graph RAG, research systems with complex entity relationships.

Memory Retrieval Strategies

Similarity-based (most common)
Embed the current query → cosine search → top-k memories
Best for: semantic retrieval across large memory stores

Recency-based
Sort by timestamp DESC → take most recent N
Best for: conversation continuity, "what did we discuss last time?"

Importance-based
Each memory has an importance score
High-importance memories (user's name, key preferences) surface first regardless of recency
Assign importance at storage time; increment when memory is repeatedly confirmed

Hybrid (production standard)
Combine all three with a weighted score:

def hybrid_score(similarity: float, recency_days: float, importance: float) -> float:
    recency_score = 1 / (1 + recency_days * 0.1)
    return (0.5 * similarity) + (0.3 * recency_score) + (0.2 * importance)

Re-rank candidates by hybrid_score and take top-k.

Memory Manager — the Central Controller

The memory manager orchestrates all operations. Every agent interaction passes through it.

class MemoryManager:
    def __init__(self, user_id: str, vector_store, relational_db):
        self.user_id = user_id
        self.vector = vector_store
        self.db = relational_db

    def before_turn(self, query: str) -> str:
        """Retrieve relevant memories and format for injection."""
        facts = self.db.get_facts(self.user_id, "preference")
        semantic = self.vector.retrieve(query, self.user_id, top_k=5)
        memories = facts + semantic
        if not memories:
            return ""
        return "Relevant context:\n" + "\n".join(f"- {m}" for m in memories)

    def after_turn(self, conversation: list):
        """Extract and store new facts from the completed conversation."""
        new_facts = extract_facts_llm(conversation)  # LLM call to extract key facts
        for fact in new_facts:
            self.db.save_fact(self.user_id, fact["category"], fact["content"], fact["importance"])
            self.vector.store(new_id(), fact["content"], self.user_id, fact["category"])

Inject retrieved memories into the system prompt:

memories = memory_manager.before_turn(user_query)
system_prompt = base_system_prompt
if memories:
    system_prompt += f"\n\n{memories}"

5. mem0 — Managed Memory Layer

mem0 is the most widely used memory library for agents. It handles storage, embedding, deduplication, conflict resolution, and retrieval behind a simple API.

pip install mem0ai

from mem0 import Memory

m = Memory()

# Store a memory
m.add("The user prefers Python over JavaScript", user_id="tisha")

# Retrieve relevant memories
results = m.search("programming language preference", user_id="tisha")
for r in results:
    print(r["memory"])

# Update a memory
m.update(memory_id, "The user now prefers Rust over Python")

# Get all memories for a user
all_memories = m.get_all(user_id="tisha")

mem0 handles:
Vector storage (uses Qdrant or Chroma under the hood)
Deduplication (avoids storing the same fact twice)
Conflict resolution (new contradicting fact replaces old)
Versioning (keeps history of changed memories)

Memory Consolidation

As memories grow, retrieval degrades. Consolidation keeps the system efficient.

Summarization — replace a batch of episodic memories with a single summary:

def consolidate_episodes(episodes: list[str]) -> str:
    prompt = f"Summarize these experiences into key lessons:\n" + "\n".join(episodes)
    return llm_call(prompt)

Importance scoring — filter out low-value memories before they accumulate:

def worth_storing(memory: str, context: str) -> bool:
    score = llm_score(f"How important is this to remember? '{memory}' (0-10)")
    return score >= 6

TTL-based expiry — expire memories unused for N days:

DELETE FROM user_memory WHERE updated_at < NOW() - INTERVAL '90 days' AND importance < 0.5

Reflection-based consolidation — advanced agents periodically reflect on their experiences:

Task completed
↓
LLM reflection: "What did I learn? What would I do differently?"
↓
Store lesson as a high-importance semantic memory

Multi-Agent Shared Memory

When agents collaborate, they share a common memory store.

Agent A (Researcher) → stores findings → Shared Memory Store
Agent B (Writer)     → reads findings → Shared Memory Store
Agent C (Reviewer)   → reads draft + findings → Shared Memory Store

Implementation:

class SharedMemory:
    def __init__(self):
        self._store: dict = {}
        self._lock = asyncio.Lock()

    async def write(self, key: str, value, agent_id: str):
        async with self._lock:
            self._store[key] = {"value": value, "by": agent_id, "ts": time.time()}

    async def read(self, key: str):
        return self._store.get(key, {}).get("value")

Used in: LangGraph state (the graph's shared state dict), CrewAI shared context, AutoGen group chat history.

Memory System Design Patterns

Memory Layer Pattern — stack memory types in order of persistence:
Short-term (context window) → Working (task state) → Long-term (vector + DB)

Retrieval-Augmented Memory — retrieve before every LLM call:
Question → Memory Retrieval → Context Injection → LLM → Response → Memory Update

Reflection Pattern — learn from every task:
Action → Result → LLM Reflection → Store Lesson

Shared Memory Pattern — multi-agent coordination:
All agents read from and write to one shared store with locking

Memory Evaluation Metrics

Recall — did retrieval find the relevant memory?
Precision — were retrieved memories actually useful (low noise)?
Latency — how fast was retrieval? (target: < 100ms)
Storage cost — bytes per memory; grows with user base
Freshness — are retrieved memories up to date?

Test memory quality by running 20 queries where you know which memories should surface, measure hit rate, and track false positives.`,
        keyPoints: [
          "Memory system = store + manager + retrieval + ranking + updating — all five components required for production",
          "Context window memory: messages list in the prompt — zero setup, accurate within session, resets on end",
          "Vector memory: text → embed → Qdrant/Pinecone/Chroma → semantic similarity search — standard for long-term memory",
          "Relational DB memory: PostgreSQL with user_memory table — structured facts, preferences, project history",
          "Graph memory: nodes + edges (works_at, uses, depends_on) — multi-hop reasoning, enterprise knowledge bases",
          "Hybrid retrieval: 0.5 × similarity + 0.3 × recency + 0.2 × importance — production-standard ranking",
          "MemoryManager: before_turn() retrieves + injects; after_turn() extracts facts via LLM and stores them",
          "mem0: pip install mem0ai — managed memory with deduplication, conflict resolution, versioning built in",
          "Consolidation: summarize old episodes, importance-score new ones (store ≥ 6/10), TTL-expire unused memories",
          "Reflection pattern: after each task, LLM reflects on lessons → stored as high-importance semantic memory",
          "Shared memory: asyncio.Lock() protected dict — LangGraph state, CrewAI context, AutoGen group history",
          "Evaluation: recall (right memory found), precision (low noise), latency (< 100ms), freshness (not stale)",
        ],
        project:
          "Build a complete four-layer memory system from scratch. Layer 1 — context window with trim_to_limit() that drops oldest non-system messages when token count exceeds 80K. Layer 2 — relational memory: PostgreSQL user_memory table (user_id, category, content, importance, created_at, updated_at); save_fact() and get_facts() functions. Layer 3 — vector memory: Qdrant collection with store() and retrieve() functions using OpenAI text-embedding-3-small; filter by user_id metadata. Layer 4 — MemoryManager class with before_turn(query) → returns formatted memory string for system prompt injection, and after_turn(conversation) → calls an LLM to extract structured facts (category, content, importance 0-1) and stores them in both PostgreSQL and Qdrant. Test the full system across 6 sessions: session 1 (user shares name, job, tech preferences), session 2 (agent recalls all three without being told), session 3 (user starts a project — agent stores project context), session 4 (user references the project by implication — agent retrieves context correctly), session 5 (user changes a preference — agent updates the fact and uses the new one), session 6 (ask agent to summarize everything it knows about the user — verify all layers contributed). Finally, measure retrieval latency and confirm it stays under 150ms.",
        stack: ["mem0", "PostgreSQL", "Qdrant", "OpenAI Embeddings", "Python", "asyncio"],
        resources: [
          { title: "mem0 Documentation", url: "https://docs.mem0.ai/" },
          { title: "Qdrant Documentation", url: "https://qdrant.tech/documentation/" },
          { title: "pgvector — Vector Search in PostgreSQL", url: "https://github.com/pgvector/pgvector" },
        ],
      },
      {
        id: "memory-maintenance",
        icon: "🔧",
        label: "Memory Maintenance",
        level: "advanced",
        concept:
          "Building a memory system is only half the job. Without active maintenance, memory degrades: it bloats with low-value entries, drifts as facts become outdated, accumulates duplicates that slow retrieval, and fills with contradictions that corrupt reasoning. A coding agent that has run for months can accumulate tens of thousands of memories — without maintenance, retrieval latency climbs, costs rise, and the agent starts returning stale or wrong context.\n\nMemory maintenance is the set of processes that keep memory accurate, relevant, and efficient over time. The core operations are: summarization (compress long conversations into dense summaries), deduplication (collapse semantically equivalent memories into one), updating (replace outdated facts when new contradicting information arrives), pruning (delete low-importance, expired, or unused memories), archiving (move historical memories to cold storage instead of deleting them), and reflection (extract lessons from completed tasks and store them as high-importance memories). Each operation runs either continuously after every turn or on a scheduled background job.\n\nImportance scoring is the foundation everything else builds on. Every stored memory receives a score from 0 to 1 at storage time — a passing weather query scores 0.1, a confirmed user preference scores 0.9. Importance gates pruning (remove if score < 0.3 and last accessed > 30 days ago), controls TTL length (high-importance memories never expire), and ranks retrieval candidates when the context window can only fit a limited number of injected memories. Without importance scoring, all memories look equal and maintenance has no basis for any decision.",
        deepDive: `Memory maintenance keeps the system fast, accurate, and cheap as it scales. Here are the eight core operations.

Memory Lifecycle

Create → Store → Retrieve → Update → Archive → Delete

Every memory passes through this lifecycle. Maintenance manages every transition.

1. Importance Scoring

The foundation of all maintenance decisions. Assign a score to every memory at storage time.

def score_memory(content: str, category: str) -> float:
    scores = {
        "core_preference": 0.95,   # "user prefers Python over JS"
        "project_context": 0.85,   # "working on AI agent for fintech"
        "decision":        0.75,   # "chose PostgreSQL over MongoDB"
        "episode":         0.60,   # past task experience
        "fact":            0.50,   # general knowledge
        "conversation":    0.30,   # casual exchange
        "transient":       0.10,   # "asked about today's weather"
    }
    base = scores.get(category, 0.40)
    # boost if the content is explicitly confirmed ("I always...", "I definitely...")
    if any(w in content.lower() for w in ["always", "prefer", "never", "definitely"]):
        base = min(1.0, base + 0.15)
    return base

Importance is used by every downstream operation: pruning threshold, TTL length, retrieval ranking weight.

2. Context Window Summarization

When the conversation history grows beyond the context budget, summarize the oldest turns.

Trigger: token count > 80% of context limit
Action: summarize the oldest 50% of messages into a single compressed summary

def summarize_old_turns(messages: list, keep_last_n: int = 10) -> list:
    if len(messages) <= keep_last_n + 1:  # +1 for system prompt
        return messages

    system = messages[0]
    old_turns = messages[1:-keep_last_n]
    recent_turns = messages[-keep_last_n:]

    conversation_text = "\n".join(
        f"{m['role'].upper()}: {m['content']}" for m in old_turns
    )
    summary = llm_call(
        f"Summarize this conversation, preserving all key facts, decisions, and user preferences:\n\n{conversation_text}"
    )
    summary_message = {"role": "system", "content": f"[Earlier conversation summary]: {summary}"}
    return [system, summary_message] + recent_turns

This keeps the context window manageable while preserving the signal from earlier turns.

3. Fact Extraction

After every conversation, extract durable facts and store them as long-term memories.

def extract_facts(conversation: list) -> list[dict]:
    messages_text = "\n".join(f"{m['role']}: {m['content']}" for m in conversation)
    response = llm_call(f"""
Extract key facts from this conversation as JSON. Only include information worth remembering long-term.
Return a list of objects with: category, content, importance (0.0-1.0).

Categories: core_preference, project_context, decision, episode, fact

Conversation:
{messages_text}

Return JSON only.""")
    return json.loads(response)

Example output:
[
  {"category": "core_preference", "content": "User prefers Rust over Python for systems work", "importance": 0.9},
  {"category": "project_context", "content": "Building a distributed KV store as a side project", "importance": 0.8},
  {"category": "decision", "content": "Chose async Rust (tokio) over sync for the networking layer", "importance": 0.7}
]

Store each extracted fact in both PostgreSQL and the vector DB.

4. Deduplication

Duplicate memories waste storage and inject redundant context. Remove semantic duplicates before storing new facts.

def is_duplicate(new_content: str, existing_memories: list[str], threshold: float = 0.92) -> bool:
    new_embedding = embed(new_content)
    for existing in existing_memories:
        similarity = cosine_similarity(new_embedding, embed(existing))
        if similarity > threshold:
            return True
    return False

def store_if_unique(user_id: str, content: str, category: str, importance: float):
    recent = get_recent_memories(user_id, limit=200)
    if not is_duplicate(content, recent):
        save_memory(user_id, content, category, importance)

mem0 handles this automatically. If you build your own system, run deduplication before every write.

5. Conflict Resolution

When new information contradicts a stored memory, one must win.

Example:
Stored: "User prefers Python"
New:    "User now prefers Rust"

Resolution strategies:
Recency wins (default) — newer information replaces older
Confidence wins — the more explicit/confirmed statement wins
Version history — keep both, mark old as superseded

def resolve_conflict(user_id: str, new_content: str, new_importance: float):
    conflicting = find_conflicting_memory(user_id, new_content)
    if conflicting:
        if new_importance >= conflicting["importance"]:
            # supersede the old memory
            archive_memory(conflicting["id"], reason="superseded")
            save_memory(user_id, new_content, conflicting["category"], new_importance)
        else:
            # old memory wins — store new as low-confidence note
            save_memory(user_id, f"[Unconfirmed update]: {new_content}", "fact", 0.3)
    else:
        save_memory(user_id, new_content, "fact", new_importance)

Conflict detection uses embedding similarity — if new content is > 0.80 similar to an existing memory and the content contradicts it, flag it.

6. Memory Pruning

Regularly delete memories that are no longer worth keeping.

Pruning criteria:
Low importance score (< 0.3) AND last accessed > 30 days ago
Expired TTL (transient memories: 7 days, conversation memories: 90 days)
Superseded by a newer, conflicting memory (archived, not deleted immediately)
Marked as incorrect by the agent during reflection

def prune_memories(user_id: str):
    # Delete low-importance, stale memories
    db.execute("""
        DELETE FROM user_memory
        WHERE user_id = %s
          AND importance < 0.3
          AND last_accessed_at < NOW() - INTERVAL '30 days'
    """, [user_id])

    # Delete expired transient memories
    db.execute("""
        DELETE FROM user_memory
        WHERE user_id = %s
          AND category = 'transient'
          AND created_at < NOW() - INTERVAL '7 days'
    """, [user_id])

Run as a background job — daily for active users, weekly for inactive.

7. Memory Archiving

Valuable old memories should be archived, not deleted. They may be needed for auditing, compliance, or historical analysis.

def archive_memory(memory_id: int, reason: str):
    db.execute("""
        INSERT INTO memory_archive (memory_id, user_id, content, category, importance, archived_at, reason)
        SELECT id, user_id, content, category, importance, NOW(), %s
        FROM user_memory WHERE id = %s
    """, [reason, memory_id])
    db.execute("DELETE FROM user_memory WHERE id = %s", [memory_id])

Active memory (user_memory table) — hot, searched on every query
Archive (memory_archive table) — cold, queried only when explicitly needed

For vector DBs, move archived vectors to a separate low-cost collection.

8. Reflection-Based Memory

After completing a task, the agent reflects and stores lessons as high-importance memories.

def reflect_on_task(task: str, actions: list[str], outcome: str, user_id: str):
    reflection_prompt = f"""
Task: {task}
Actions taken: {chr(10).join(actions)}
Outcome: {outcome}

In 2-3 sentences: what went well, what failed, and what should I do differently next time?
Be specific and actionable.
"""
    lesson = llm_call(reflection_prompt)
    save_memory(
        user_id,
        content=f"[Lesson from task '{task}']: {lesson}",
        category="episode",
        importance=0.75
    )

Before starting a similar new task, retrieve past lessons:

past_lessons = retrieve_memory(user_id, f"lessons from tasks similar to: {current_task}", top_k=3)

9. Retrieval Optimization

Maintenance also improves retrieval quality over time.

Re-embedding — when a better embedding model is released, re-embed all stored memories:

def reembed_all(user_id: str):
    memories = get_all_memories(user_id)
    for m in memories:
        new_embedding = embed_v2(m["content"])  # new model
        update_vector(m["id"], new_embedding)

Metadata indexing — tag memories with searchable metadata at storage time for faster filtering:

payload = {
    "text": content,
    "user_id": user_id,
    "category": category,
    "importance": importance,
    "project": current_project,  # filter by project
    "tags": extract_tags(content)  # ["python", "authentication", "agent"]
}

Access tracking — record last_accessed_at on every retrieval hit (used by pruning):

def retrieve_and_track(user_id: str, query: str) -> list[str]:
    results = vector_search(user_id, query)
    ids = [r.id for r in results]
    db.execute("UPDATE user_memory SET last_accessed_at = NOW() WHERE id = ANY(%s)", [ids])
    return [r.payload["text"] for r in results]

Scheduled Maintenance Jobs

Run as async background tasks — never block the agent loop.

Daily jobs:
Fact extraction from yesterday's conversations
Deduplication pass over new memories
Prune expired transient memories

Weekly jobs:
Prune low-importance stale memories
Consolidate similar episodic memories into summaries
Refresh re-fetchable facts (e.g., company policy documents)

On-task:
Context window summarization (triggered by token threshold)
Conflict resolution (triggered on every write)
Reflection (triggered on task completion)

Memory Health Metrics

Track these to know if your system is healthy:

Recall — what % of relevant memories surface in top-5 retrieval?
Precision — what % of retrieved memories are actually useful?
Deduplication rate — what % of writes were rejected as duplicates?
Staleness — average age of memories being retrieved (high = drift problem)
Pruning rate — memories deleted per day (too high = storing junk)
Storage growth — GB/month per user (should plateau, not grow linearly)

Test recall and precision by running 50 queries where you know the correct answer and measuring hit rate.`,
        keyPoints: [
          "Importance score (0-1) at storage time: core_preference=0.95, project_context=0.85, transient=0.10 — gates all downstream decisions",
          "Context window summarization: when tokens > 80% of limit, summarize oldest 50% of turns into one compressed message",
          "Fact extraction: after every conversation, LLM call extracts {category, content, importance} JSON → stored in both PostgreSQL and vector DB",
          "Deduplication: cosine similarity > 0.92 against recent memories → skip write; mem0 handles this automatically",
          "Conflict resolution: new memory contradicts old → recency wins by default; archive superseded memory, don't delete it",
          "Pruning: DELETE WHERE importance < 0.3 AND last_accessed_at < 30 days ago; expire transient memories after 7 days",
          "Archiving: move old/superseded memories to memory_archive table instead of deleting — audit trail + recovery",
          "Reflection: after task completion, LLM reflects on outcome → store lesson as importance=0.75 episode memory",
          "Re-embedding: when a better model releases, regenerate all stored vectors — retrieval quality improves immediately",
          "Access tracking: update last_accessed_at on every retrieval hit — feeds pruning, importance decay, and health metrics",
          "Scheduled jobs: daily (fact extract + dedup + prune transient), weekly (prune stale + consolidate episodes + refresh facts)",
          "Health metrics: recall %, precision %, deduplication rate, staleness, pruning rate, storage growth — measure all six",
        ],
        project:
          "Build a complete memory maintenance pipeline on top of the memory system from the previous project. Implement all eight operations: (1) Importance scorer — assign_importance(content, category) returns float 0-1 using the category table plus keyword boosters. (2) Context summarizer — summarize_old_turns(messages) triggers when token count > 80K, summarizes oldest 50% and returns trimmed messages list. (3) Fact extractor — extract_facts(conversation) LLM call after each session, returns JSON list, stores to both PostgreSQL and Qdrant. (4) Deduplicator — before every write, embed the new content, check cosine similarity against the user's last 200 memories, skip if > 0.92 similar. (5) Conflict resolver — find_conflicting_memory() + resolve_conflict() that archives the old memory and stores the new one when importance >= old. (6) Pruner — prune_memories() SQL that deletes low-importance stale entries and expired transients, runs as a scheduled async job. (7) Archiver — archive_memory() moves to memory_archive table with reason field. (8) Reflector — reflect_on_task() runs after each multi-step task and stores a lesson as an episode. Run 20 simulated sessions with varied inputs: some changing preferences (triggers conflict resolution), some with duplicates (triggers deduplication), some completing tasks (triggers reflection). After all 20 sessions, measure recall on 10 test queries, report deduplication rate, and confirm the memory table size stayed flat after week 3 due to pruning.",
        stack: ["PostgreSQL", "Qdrant", "OpenAI API", "OpenAI Embeddings", "asyncio", "Python"],
        resources: [
          { title: "mem0 Documentation", url: "https://docs.mem0.ai/" },
          { title: "pgvector", url: "https://github.com/pgvector/pgvector" },
        ],
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
          "Most beginners think RAG is: question → vector database → answer. In reality, a RAG system succeeds or fails based on three components that happen before any query is ever made: embeddings, chunking, and indexing. These form the ingestion pipeline — and a large percentage of production RAG failures trace back to mistakes here, not to the LLM or retrieval logic.\n\nEmbeddings convert text into dense numerical vectors that capture semantic meaning. Similar concepts cluster near each other in vector space — 'how do I train an LLM?' and 'large language model training guide' land near each other even with zero word overlap, while 'quarterly revenue report' lands far away. The embedding model you choose determines the quality of this mapping. OpenAI's text-embedding-3-small is fast and cheap; text-embedding-3-large is more accurate for complex domains. Open-source options (BGE, E5, Instructor) are strong for self-hosted systems. The critical rule: never mix embedding models — a query embedded with model A cannot be compared against documents embedded with model B.\n\nChunking is how you split large documents into pieces small enough to embed usefully. Embedding a 500-page PDF as one giant vector produces one nearly useless embedding. Chunk too small and you lose context; chunk too large and retrieval precision drops. Recursive chunking (LangChain's RecursiveCharacterTextSplitter) is the production default — it splits on paragraph, then sentence, then word boundaries, respecting natural structure. Always add overlap (100–200 tokens) so information at chunk boundaries isn't lost. Always attach metadata to every chunk (document name, page number, section, timestamp) — metadata enables filtered retrieval and source citations. Indexing then organizes the stored embeddings so similarity search runs in milliseconds across millions of vectors, using HNSW for most workloads and hybrid (vector + BM25 keyword) search when exact-term recall matters.",
        deepDive: `The ingestion pipeline runs once. The retrieval pipeline runs on every query. Getting ingestion right determines everything downstream.

Full RAG Pipeline

Ingestion (runs once):
Documents → Text Extraction → Cleaning → Chunking → Metadata → Embedding → Indexing → Vector DB

Retrieval (runs on every query):
User Question → Query Embedding → Similarity Search → Top-K Chunks → LLM Prompt → Answer

PART 1: EMBEDDINGS

What is an Embedding?

Text is converted into a fixed-size vector of floating point numbers.

"Python is a programming language" → [0.12, -0.84, 0.44, 0.21, ...]

The vector has hundreds or thousands of dimensions. The position in that space encodes meaning. Similar texts produce similar vectors — close in space. Dissimilar texts produce distant vectors.

Semantic Space

Animal cluster:
Dog, Cat, Tiger, Lion → nearby vectors

Programming cluster:
Python, Java, Rust, C++ → nearby vectors

Finance cluster:
Revenue, EBITDA, Balance Sheet → nearby vectors

Similarity search works because this spatial structure is meaningful.

Embedding Models

OpenAI (hosted):
text-embedding-3-small — 1536 dims, fast, cheap ($0.02/1M tokens) — best default
text-embedding-3-large — 3072 dims, more accurate, 5x cost — use for high-stakes retrieval
text-embedding-ada-002  — legacy, 1536 dims, slightly weaker — avoid for new projects

Open source (self-hosted):
BGE-large-en-v1.5  — 1024 dims, top open-source performance, runs on CPU
E5-large-v2        — 1024 dims, strong on retrieval benchmarks
Instructor-xl      — 768 dims, task-specific instructions improve domain retrieval
Sentence Transformers — many variants, easy to run locally

Choosing an embedding model:
General documents (docs, wikis, support):   text-embedding-3-small
High-accuracy production RAG:               text-embedding-3-large or BGE-large
Self-hosted, cost-sensitive:                BGE-large-en-v1.5
Domain-specific (medical, legal, code):     fine-tuned domain model or Instructor-xl

Generating Embeddings

from openai import OpenAI

client = OpenAI()

def embed(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

Batch embedding (much more efficient):

def embed_batch(texts: list[str]) -> list[list[float]]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts  # up to 2048 texts per request
    )
    return [item.embedding for item in sorted(response.data, key=lambda x: x.index)]

Always batch — single-item embedding calls are expensive at scale.

Similarity Metrics

Cosine similarity (most common):
Measures the angle between two vectors. Range: -1 to 1.
1.0 = identical meaning, 0 = unrelated, -1 = opposite.
Standard choice for RAG.

import numpy as np

def cosine_similarity(a: list[float], b: list[float]) -> float:
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

Dot product: faster, used internally by most vector DBs. Requires normalized vectors for the same results as cosine.

Euclidean distance: geometric distance. Less common in NLP — use cosine for text.

Critical Rules for Embeddings

Never mix embedding models.
Query and documents must be embedded with the same model.
Mixing produces meaningless similarity scores.

Never change embedding models mid-project.
Changing models requires re-embedding all stored documents.
Build a re-embedding pipeline before upgrading.

Embed the same way you chunk.
If chunks are 512 tokens with overlap, ensure no single chunk exceeds the model's input limit.
text-embedding-3-small: 8191 token limit — fine for all standard chunk sizes.

PART 2: CHUNKING

Why Chunking Matters

A 500-page PDF embedded as one vector = one similarity score compared against the query.
The same PDF split into 2,000 chunks = 2,000 similarity scores, each from a specific passage.

Chunking makes precise retrieval possible.

Question: "How does token expiry work in JWT authentication?"
Without chunking: one document embedding scores 0.41 against the query.
With chunking: the specific paragraph about token expiry scores 0.89.

Chunk Size Tradeoffs

Too small (< 100 tokens):
High precision — finds the exact sentence
Loses surrounding context — LLM can't use it
Answer is incomplete

Too large (> 1000 tokens):
Retrieval is imprecise — chunk is about many things at once
Lower similarity scores — harder to rank correctly

Sweet spot: 256–512 tokens with 50–150 token overlap.
Adjust based on your document type and query style.

Chunking Strategies

1. Fixed-size chunking (baseline, rarely used in production)

Split every N tokens regardless of content.
Fast, simple, but breaks mid-sentence, mid-paragraph.

def fixed_chunk(text: str, size: int = 500) -> list[str]:
    tokens = text.split()
    return [" ".join(tokens[i:i+size]) for i in range(0, len(tokens), size)]

Use only as a baseline to compare against.

2. Recursive chunking (production default)

Splits on a hierarchy of separators: paragraph (\n\n) → sentence (\n) → word ( ).
Preserves natural boundaries. Handles unstructured documents well.

from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=128,
    length_function=len,
    separators=["\n\n", "\n", ". ", " ", ""]
)
chunks = splitter.split_text(document_text)

This is the right default for most RAG systems.

3. Semantic chunking

Split when the topic changes rather than at a fixed token count.
Embed consecutive sentences and split where cosine similarity drops below a threshold.
Produces more coherent chunks — each chunk is about one thing.

Better retrieval quality than fixed/recursive for long, varied documents.
Slower ingestion — requires embedding during chunking.
Use for: research papers, books, long technical documentation.

4. Document-aware chunking

Use the document's own structure: headings, sections, table of contents.

Markdown → split on ## headings
HTML → split on <h2> / <section> tags
PDF with structure → extract by PDF section hierarchy

Result: each chunk maps to exactly one logical section.
Best for: API documentation, product wikis, structured technical guides.

Chunk Overlap

Without overlap:

Chunk A: "...authentication requires a valid JWT token."
Chunk B: "The token must include the user_id claim..."

The connection is lost at the boundary.

With overlap (128 tokens):

Chunk A: "...authentication requires a valid JWT token. The token must include the user_id claim..."
Chunk B: "The token must include the user_id claim. Expiry is set via the exp field..."

Context survives. Retrieval improves.

Standard overlap: 15–25% of chunk size.
chunk_size=512, chunk_overlap=128 is a strong production default.

Metadata Enrichment

Every chunk must carry metadata. Metadata enables filtered retrieval and source citations.

def chunk_with_metadata(text: str, source: dict) -> list[dict]:
    splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=128)
    chunks = splitter.split_text(text)
    return [
        {
            "text": chunk,
            "metadata": {
                "source":      source["filename"],
                "page":        source.get("page"),
                "section":     source.get("section"),
                "doc_type":    source.get("type"),
                "ingested_at": datetime.utcnow().isoformat(),
            }
        }
        for chunk in chunks
    ]

At retrieval time: filter by doc_type="policy" before vector search.
For citations: return source + page with every retrieved chunk.

PART 3: INDEXING

After embedding, chunks must be organized for fast retrieval. This is indexing.

Without indexing: compare query vector against every stored vector — O(N) — 1 second for 10K docs, 100 seconds for 1M docs.
With indexing: search a hierarchical structure — sub-linear — milliseconds at any scale.

HNSW (Hierarchical Navigable Small Worlds)

The most widely used vector index. Used by Qdrant, Weaviate, Chroma, and Pinecone.

Structure: a multi-layer graph of vectors. Higher layers are sparse (fast navigation), lower layers are dense (accurate search).

Workflow:
Query enters at the top (sparse) layer
Navigates down through layers, getting closer
Returns approximate nearest neighbors at the bottom

Parameters:
m — number of connections per node (higher = more accurate, more memory)
ef_construction — index build quality (higher = slower build, better recall)
ef_search — search quality (tune at query time for accuracy/speed tradeoff)

Benefits: fast (< 10ms for millions of vectors), high recall (98%+), scales well.
Default choice for all workloads under 50M vectors.

IVF (Inverted File Index)

Clusters all vectors into N groups. At search time, only the nearest cluster(s) are searched.
Faster for very large datasets but lower recall than HNSW.
Used by FAISS for large-scale research workloads.

Metadata Filtering

Not all retrieval needs pure vector search. Combine metadata filters with vector search to narrow the search space first.

from qdrant_client.models import Filter, FieldCondition, MatchValue

results = client.search(
    collection_name="documents",
    query_vector=embed(user_query),
    query_filter=Filter(
        must=[
            FieldCondition(key="doc_type", match=MatchValue(value="policy")),
            FieldCondition(key="department", match=MatchValue(value="engineering"))
        ]
    ),
    limit=10
)

Filter first → search smaller subset → faster, more precise.
Essential for multi-tenant systems (filter by user_id) and domain-specific retrieval.

Hybrid Indexing (Vector + Keyword)

Pure vector search misses exact-term matches. BM25 keyword search misses semantic matches.
Hybrid search combines both.

from qdrant_client.models import SparseVector

# Dense (semantic) search + sparse (keyword) search
results = client.query_points(
    collection_name="documents",
    prefetch=[
        models.Prefetch(query=embed(query), using="dense", limit=20),
        models.Prefetch(query=sparse_embed(query), using="sparse", limit=20),
    ],
    query=models.FusionQuery(fusion=models.Fusion.RRF),  # Reciprocal Rank Fusion
    limit=10
)

Reciprocal Rank Fusion (RRF) merges the two ranked lists into one.
Consistently outperforms pure vector or pure keyword search on production benchmarks.

Complete Ingestion Pipeline

import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

def ingest_pdf(filepath: str, client: QdrantClient, openai: OpenAI):
    # 1. Extract text
    with pdfplumber.open(filepath) as pdf:
        pages = [{"text": page.extract_text(), "page": i+1} for i, page in enumerate(pdf.pages)]

    # 2. Chunk with metadata
    splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=128)
    chunks = []
    for page in pages:
        if not page["text"]:
            continue
        for chunk_text in splitter.split_text(page["text"]):
            chunks.append({
                "text": chunk_text,
                "source": filepath,
                "page": page["page"]
            })

    # 3. Embed in batches
    texts = [c["text"] for c in chunks]
    embeddings = embed_batch(texts)

    # 4. Index in vector DB
    points = [
        PointStruct(
            id=i,
            vector=embeddings[i],
            payload={"text": chunks[i]["text"], "source": chunks[i]["source"], "page": chunks[i]["page"]}
        )
        for i in range(len(chunks))
    ]
    client.upsert(collection_name="documents", points=points)
    return len(chunks)

Production Best Practices

Embeddings:
Use text-embedding-3-small as default; upgrade to 3-large only if retrieval quality is demonstrably insufficient
Always batch embed (up to 2048 texts per request)
Never mix embedding models — define the model in a config constant and enforce it everywhere
Re-embed all documents when you change models

Chunking:
Use RecursiveCharacterTextSplitter as the default
chunk_size=512, chunk_overlap=128 for most document types
chunk_size=256, chunk_overlap=64 for dense technical docs (code, legal)
chunk_size=1024, chunk_overlap=256 for narrative text (books, long articles)
Always attach metadata — source, page, section, ingestion timestamp

Indexing:
HNSW for all workloads under 50M vectors
Enable metadata filtering — filter before vector search, not after
Add hybrid search (BM25 + vector) when your documents have important exact terms
Build a reindexing pipeline before you need it — documents change`,
        keyPoints: [
          "Ingestion pipeline: Documents → Extract → Clean → Chunk → Metadata → Embed → Index → Vector DB — runs once",
          "Embedding = text → fixed-size float vector; similar meaning → nearby vectors; different meaning → distant vectors",
          "text-embedding-3-small: default for most RAG (1536 dims, cheap); text-embedding-3-large: high-stakes retrieval",
          "Never mix embedding models — query and documents must use the same model or similarity scores are meaningless",
          "Batch embed (up to 2048 texts per request) — single-call embedding is 100x more expensive at scale",
          "Recursive chunking (RecursiveCharacterTextSplitter): splits on \\n\\n → \\n → sentence — production default",
          "chunk_size=512, chunk_overlap=128: strong default; overlap prevents information loss at chunk boundaries",
          "Semantic chunking: split when topic changes (embedding similarity drops) — better quality, slower ingestion",
          "Every chunk needs metadata: source, page, section, doc_type, ingested_at — enables filtering and citations",
          "HNSW index: hierarchical graph, < 10ms search at millions of vectors — default for all workloads under 50M",
          "Metadata filtering: filter by department/doc_type/user_id BEFORE vector search — faster and more precise",
          "Hybrid search (vector + BM25 with RRF fusion): consistently outperforms pure vector on production benchmarks",
        ],
        project:
          "Build a complete document ingestion and retrieval system. Ingestion: take 5 PDFs (at least 50 pages each), extract text with pdfplumber, chunk with RecursiveCharacterTextSplitter (chunk_size=512, chunk_overlap=128), attach metadata (source filename, page number, section if detectable), batch-embed with text-embedding-3-small, and store in Qdrant with metadata payload. Retrieval: given a question, embed it, search Qdrant for top-10 chunks, inject them into an LLM prompt with source citations. Test 3 chunking strategies on the same documents — fixed (500 tokens), recursive (512/128), and semantic (split on embedding similarity drop) — and measure retrieval quality on 20 questions where you know the correct answer (hit rate: was the correct chunk in the top-5?). Then add metadata filtering: tag each document with a category (technical, policy, reference), add a filter parameter to your search function, and confirm that filtering by category reduces irrelevant results. Finally, implement hybrid search by adding a sparse BM25 vector to each Qdrant point alongside the dense vector, and measure whether hybrid search improves hit rate on exact-term queries.",
        stack: ["OpenAI Embeddings", "Qdrant", "pdfplumber", "LangChain Text Splitters", "PostgreSQL", "Python"],
        resources: [
          { title: "OpenAI Embeddings Guide", url: "https://platform.openai.com/docs/guides/embeddings" },
          { title: "Qdrant Documentation", url: "https://qdrant.tech/documentation/" },
          { title: "LangChain Text Splitters", url: "https://python.langchain.com/docs/how_to/recursive_text_splitter/" },
          { title: "BEIR Benchmark (embedding model comparison)", url: "https://github.com/beir-cellar/beir" },
        ],
      },
      {
        id: "rag-vectordbs",
        icon: "🗃️",
        label: "Vector Databases",
        level: "intermediate",
        concept:
          "A vector database is a specialized database built to store, index, and retrieve embeddings by similarity. Traditional SQL databases excel at exact matching — WHERE city = 'Mumbai' works because the strings are identical. RAG requires semantic matching — 'how can I learn Python?' must surface 'Python tutorial', 'beginner Python course', and 'introduction to programming' even though none of those contain the exact query words. Vector databases solve this by storing float vectors and finding the nearest ones using cosine similarity or dot product, with indexes that make search sub-linear even at millions of documents.\n\nEvery record in a vector database contains three things: the embedding vector, the original text (payload), and metadata. Metadata is what separates a useful production system from a slow one — by filtering on department='finance' or doc_type='policy' before running vector search, you shrink the search space dramatically and eliminate irrelevant results entirely. Without metadata filtering, a query about finance policy surfaces chunks from every department. With it, only the finance documents are ever searched.\n\nChoosing a vector database is an infrastructure decision, not just a technical one. Chroma is the right choice for local development and prototypes — zero setup, runs in-process. Qdrant is the production default for most teams: open-source, Rust-based, fast HNSW, strong metadata filtering, available self-hosted or managed. Pinecone is fully managed and serverless — the right call when you want zero infrastructure overhead at scale. pgvector extends PostgreSQL with vector search — the right choice when you want one database for both relational and vector data. Every serious team builds a VectorDB abstraction layer so the backend can be swapped without changing application code.",
        deepDive: `Vector databases are purpose-built for one operation: given a query vector, find the N most similar vectors in storage as fast as possible.

Why Traditional Databases Fail

Traditional SQL databases use indexes for exact and range lookups — B-tree for equality and range, full-text index for keyword search.

SELECT * FROM docs WHERE content LIKE '%Python%'

This finds exact substring matches. It cannot find semantically related content.

"Learn Python" does not LIKE-match "Python programming tutorial for beginners."

Vector search finds it because both embed to nearby vectors in semantic space.

The O(N) Problem

Naive similarity search: compare query vector against every stored vector.

10K vectors: ~5ms — acceptable
1M vectors: ~500ms — too slow
100M vectors: ~50s — unusable

Vector databases solve this with approximate nearest neighbor indexes (ANN) — structured search that finds results in milliseconds at any scale, trading a tiny amount of accuracy for a massive speed gain.

What a Vector DB Stores

Every record (called a point in Qdrant, a document in Chroma) contains:

{
  "id": "uuid-or-int",
  "vector": [0.12, -0.55, 0.89, ...],   # the embedding
  "payload": {                            # metadata + content
    "text":       "Python is a programming language...",
    "source":     "python_docs.pdf",
    "page":       12,
    "section":    "Introduction",
    "doc_type":   "documentation",
    "ingested_at": "2025-01-15T10:30:00Z"
  }
}

The vector enables similarity search.
The payload enables metadata filtering and source citations.

Core Operations

Upsert (insert or update):

client.upsert(
    collection_name="documents",
    points=[
        PointStruct(id=1, vector=embed(text), payload={"text": text, "source": "policy.pdf"})
    ]
)

Search:

results = client.search(
    collection_name="documents",
    query_vector=embed(user_query),
    limit=10
)
for r in results:
    print(r.score, r.payload["text"])

Delete:

client.delete("documents", points_selector=PointIdsList(points=[1, 2, 3]))

Scroll (retrieve all without search):

results, next_page = client.scroll("documents", limit=100, offset=None)

Metadata Filtering

Filtering runs before vector search — it narrows the search space so similarity search only runs over relevant records.

from qdrant_client.models import Filter, FieldCondition, MatchValue, Range

# Filter by exact value
results = client.search(
    collection_name="documents",
    query_vector=embed(query),
    query_filter=Filter(must=[
        FieldCondition(key="doc_type", match=MatchValue(value="policy"))
    ]),
    limit=5
)

# Filter by multiple conditions
results = client.search(
    collection_name="documents",
    query_vector=embed(query),
    query_filter=Filter(must=[
        FieldCondition(key="department", match=MatchValue(value="finance")),
        FieldCondition(key="year",       range=Range(gte=2024))
    ]),
    limit=5
)

Production pattern: always expose filter parameters in your search function.

def search(query: str, doc_type: str = None, department: str = None, top_k: int = 5):
    filters = []
    if doc_type:
        filters.append(FieldCondition(key="doc_type", match=MatchValue(value=doc_type)))
    if department:
        filters.append(FieldCondition(key="department", match=MatchValue(value=department)))

    return client.search(
        collection_name="documents",
        query_vector=embed(query),
        query_filter=Filter(must=filters) if filters else None,
        limit=top_k
    )

Vector Database Options

1. Qdrant — production default for most teams

Open-source, written in Rust. Excellent HNSW implementation, strong metadata filtering, available as Docker container or managed cloud.

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(url="http://localhost:6333")   # Docker
# client = QdrantClient(url="https://xyz.qdrant.io", api_key="...")  # cloud

client.create_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

client.upsert("documents", points=[
    PointStruct(id=1, vector=embed(text), payload={"text": text, "source": "docs.pdf"})
])

results = client.search("documents", query_vector=embed(query), limit=5)

Best for: self-hosted production systems, teams that want control and performance.

2. Chroma — local development default

In-process or client-server. Zero infrastructure setup. Perfect for prototyping and small-scale deployment.

import chromadb

client = chromadb.PersistentClient(path="./chroma")
collection = client.get_or_create_collection("documents")

collection.add(
    ids=["1", "2", "3"],
    embeddings=[embed(t) for t in texts],
    documents=texts,
    metadatas=[{"source": "docs.pdf", "page": i} for i in range(len(texts))]
)

results = collection.query(query_embeddings=[embed(query)], n_results=5)

Best for: prototypes, local testing, tutorials. Not recommended for production at scale.

3. Pinecone — managed cloud, zero infrastructure

Fully serverless. No containers to manage. Auto-scales. Best choice when infrastructure overhead must be zero.

from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="...")
pc.create_index("documents", dimension=1536, metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"))

index = pc.Index("documents")

index.upsert(vectors=[
    {"id": "1", "values": embed(text), "metadata": {"text": text, "source": "docs.pdf"}}
])

results = index.query(vector=embed(query), top_k=5, include_metadata=True)

Best for: early-stage teams that want fast setup and managed scaling without DevOps.

4. pgvector — vector search inside PostgreSQL

Extension that adds a vector column type and ANN index to PostgreSQL. Right choice when you want one database for both relational and vector data — no separate vector DB infrastructure.

pip install pgvector psycopg2-binary

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id         SERIAL PRIMARY KEY,
    content    TEXT,
    source     TEXT,
    page       INTEGER,
    embedding  vector(1536)
);

CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

Python:

from pgvector.psycopg2 import register_vector
import psycopg2, numpy as np

conn = psycopg2.connect(DATABASE_URL)
register_vector(conn)

with conn.cursor() as cur:
    cur.execute(
        "INSERT INTO documents (content, source, embedding) VALUES (%s, %s, %s)",
        [text, "docs.pdf", embed(text)]
    )

    cur.execute(
        "SELECT content, source, 1 - (embedding <=> %s) AS score FROM documents ORDER BY embedding <=> %s LIMIT 5",
        [embed(query), embed(query)]
    )
    results = cur.fetchall()

Best for: teams already on PostgreSQL, startups that want to minimize infrastructure, SQL-fluent teams.

5. FAISS — in-process library, not a full database

Facebook AI Similarity Search. A library, not a server — runs in the same Python process. No persistence by default. Extremely fast for research and offline batch workloads.

import faiss, numpy as np

dimension = 1536
index = faiss.IndexFlatIP(dimension)         # exact dot product
index = faiss.IndexHNSWFlat(dimension, 32)   # HNSW approximate

vectors = np.array([embed(t) for t in texts], dtype=np.float32)
faiss.normalize_L2(vectors)
index.add(vectors)

query_vec = np.array([embed(query)], dtype=np.float32)
faiss.normalize_L2(query_vec)
D, I = index.search(query_vec, k=5)  # D=distances, I=indices

Best for: research, offline batch processing, when you want maximum speed and no server overhead.

Hybrid Search — Vector + Keyword

Pure vector search misses exact-term matches. BM25 keyword search misses semantic matches.
Hybrid search combines both.

Example query: "PTO policy"
Vector search alone: finds "vacation allowance guidelines" (semantic match) but misses "PTO" exact occurrences
Keyword search alone: finds "PTO" but misses "paid time off" and "leave policy"
Hybrid: finds both

Qdrant hybrid search with Reciprocal Rank Fusion:

from qdrant_client.models import SparseVector, Prefetch, FusionQuery, Fusion

results = client.query_points(
    collection_name="documents",
    prefetch=[
        Prefetch(query=embed(query),        using="dense",  limit=20),
        Prefetch(query=sparse_embed(query), using="sparse", limit=20),
    ],
    query=FusionQuery(fusion=Fusion.RRF),
    limit=5
)

Always implement hybrid search in production — it consistently outperforms pure vector on benchmarks.

Multi-Tenant Architecture

Enterprise systems serve multiple users or organizations in one vector DB.

Option 1 — Collection per tenant (strong isolation, high overhead):
Client A → collection_client_a
Client B → collection_client_b

Option 2 — Metadata filter per tenant (single collection, efficient):

results = client.search(
    "documents",
    query_vector=embed(query),
    query_filter=Filter(must=[FieldCondition(key="tenant_id", match=MatchValue(value=user.tenant_id))]),
    limit=5
)

Option 2 is standard — one collection, always filter by tenant_id. Never let queries cross tenant boundaries.

VectorDB Abstraction Layer

Build a protocol so your application never touches the vector DB client directly.

from abc import ABC, abstractmethod

class VectorStore(ABC):
    @abstractmethod
    def upsert(self, id: str, vector: list[float], payload: dict): ...

    @abstractmethod
    def search(self, query_vector: list[float], top_k: int, filters: dict = None) -> list[dict]: ...

    @abstractmethod
    def delete(self, ids: list[str]): ...

class QdrantStore(VectorStore):
    def __init__(self, url: str, collection: str):
        self.client = QdrantClient(url=url)
        self.collection = collection

    def upsert(self, id: str, vector, payload):
        self.client.upsert(self.collection, points=[PointStruct(id=id, vector=vector, payload=payload)])

    def search(self, query_vector, top_k=5, filters=None):
        results = self.client.search(self.collection, query_vector=query_vector, limit=top_k)
        return [{"text": r.payload["text"], "score": r.score, "source": r.payload.get("source")} for r in results]

    def delete(self, ids):
        self.client.delete(self.collection, points_selector=PointIdsList(points=ids))

Swap to ChromaStore, PineconeStore, or PgvectorStore by changing one line at instantiation.

Choosing the Right Vector DB

Prototyping or local dev:              Chroma
Production, self-hosted:               Qdrant
Production, managed zero-infra:        Pinecone
Already on PostgreSQL:                 pgvector
Research / offline batch:              FAISS
Multi-modal or graph features:         Weaviate

Comparison on the things that matter:

Qdrant:   self-hosted or cloud, excellent filtering, hybrid search, Rust performance
Chroma:   zero setup, embedded or server, limited production features
Pinecone: fully managed, serverless, auto-scale, vendor lock-in
pgvector: SQL joins, transactional, single DB, slower than dedicated vector DBs at scale
FAISS:    fastest search, no server, no persistence without custom code`,
        keyPoints: [
          "Vector DB core operation: store embedding + payload → given query vector, return N nearest by cosine similarity",
          "Every record = vector (for search) + payload (text, source, page, doc_type, tenant_id) — both are required",
          "Metadata filtering runs BEFORE vector search — filter by department/doc_type/tenant_id to shrink search space first",
          "HNSW index: sub-linear ANN search, < 10ms at millions of vectors, 98%+ recall — default for all production workloads",
          "Qdrant: open-source Rust, strong HNSW + filtering, Docker or cloud — best default for self-hosted production",
          "Chroma: PersistentClient(path='./chroma'), zero setup — right choice for local dev and prototypes only",
          "Pinecone: fully serverless, auto-scales, zero DevOps — right when infrastructure overhead must be zero",
          "pgvector: CREATE EXTENSION vector; vector(1536) column + HNSW index — one DB for relational + vector data",
          "FAISS: in-process library, no server, IndexHNSWFlat for ANN — research, offline batch, no server overhead",
          "Hybrid search (vector + BM25 + RRF fusion): always outperforms pure vector on production benchmarks",
          "Multi-tenant: single collection with tenant_id metadata filter — never let queries cross tenant boundaries",
          "VectorStore abstraction: define upsert/search/delete interface — swap backends without changing application code",
        ],
        project:
          "Build a provider-agnostic RAG system with a VectorStore abstraction. Implement the interface for three backends: QdrantStore (Docker, local), ChromaStore (PersistentClient), and PgvectorStore (PostgreSQL + pgvector extension). Ingest the same 100 document chunks into all three. Write a benchmark: for 20 queries, measure p50 and p95 search latency, verify all three return the same top-5 results for each query (within a small score tolerance), and confirm metadata filtering by doc_type works on all three. Add multi-tenant support: tag half the chunks with tenant_id='a' and half with tenant_id='b', then confirm a search with tenant_id='a' filter never returns a tenant_b chunk. Finally, implement hybrid search on the Qdrant backend — add a sparse BM25 vector field alongside the dense vector, run the same 20 queries with hybrid vs dense-only, and report whether hybrid search improves top-5 hit rate on exact-term queries. Swap backends by changing one instantiation line and confirm the benchmark numbers are consistent.",
        stack: ["Qdrant", "ChromaDB", "pgvector", "PostgreSQL", "OpenAI Embeddings", "Python"],
        resources: [
          { title: "Qdrant Documentation", url: "https://qdrant.tech/documentation/" },
          { title: "pgvector GitHub", url: "https://github.com/pgvector/pgvector" },
          { title: "Pinecone Documentation", url: "https://docs.pinecone.io/" },
          { title: "Chroma Documentation", url: "https://docs.trychroma.com/" },
        ],
      },
      {
        id: "rag-advanced",
        icon: "🚀",
        label: "Advanced RAG",
        level: "advanced",
        concept:
          "Basic RAG — question → vector search → top-k chunks → LLM → answer — works for small projects. In production systems with millions of documents, complex queries, and enterprise knowledge bases, it breaks down: retrieval misses relevant content, chunks lack context, answers are incomplete or hallucinated. Advanced RAG is a set of techniques that each address a specific failure mode of basic RAG, and in practice you layer several of them together.\n\nThe first upgrade that every production system should make is hybrid search — combining dense vector search with sparse BM25 keyword search, merged via Reciprocal Rank Fusion. Pure vector search misses exact-term queries ('PTO policy' may not surface chunks containing only the acronym 'PTO'). Pure keyword search misses semantic queries. Hybrid catches both. The second most impactful upgrade is reranking: retrieve the top-20 candidates fast with vector search, then pass them through a cross-encoder reranker (Cohere Rerank, BGE Reranker) that scores each chunk against the full query. The reranker is slower but far more accurate — it surfaces the 5 truly relevant chunks from the 20 candidates. Query transformation techniques (multi-query, HyDE, step-back prompting) address the problem that the user's question often doesn't match the language of the documents.\n\nBeyond retrieval improvements, architectural patterns like parent-child retrieval, agentic RAG, and corrective RAG (CRAG) change how the system uses retrieved content. Parent-child stores small embeddings for precision but returns the full parent section for context. Agentic RAG loops — retrieve, reason, identify gaps, retrieve again — until the answer can be fully supported. CRAG evaluates retrieval quality before answering and triggers a new search if relevance is too low. Production advanced RAG is a pipeline with multiple stages, each measurable and tunable independently.",
        deepDive: `Advanced RAG is not a single technique — it is a collection of improvements, each targeting a specific weakness. Layer them based on what your evaluation metrics tell you is failing.

RAG Evolution

Generation 1 — Basic RAG
Question → Vector Search → Top-K → LLM → Answer
Works for simple demos. Breaks at production scale.

Generation 2 — Improved Retrieval
Hybrid search + reranking + query transformation
Significantly better accuracy. Required for most production use cases.

Generation 3 — Agentic RAG
Retrieve → Reason → Identify gaps → Retrieve again → Verify → Answer
Handles complex multi-step questions.

Generation 4 — Multi-Agent RAG
Retriever Agent + Research Agent + Reasoning Agent + Answer Agent
Enterprise-scale knowledge systems.

1. Hybrid Search

The most impactful single upgrade. Combines dense vector search with sparse BM25 keyword search.

Why it matters:
Vector search: finds "vacation allowance guidelines" when asked about "PTO" (semantic match)
BM25 search: finds "PTO" when asked about "PTO" (exact term match)
Hybrid: finds both

Implementation with rank_bm25 + vector search:

from rank_bm25 import BM25Okapi
import numpy as np

class HybridSearcher:
    def __init__(self, chunks: list[str], embeddings: list[list[float]]):
        tokenized = [c.lower().split() for c in chunks]
        self.bm25 = BM25Okapi(tokenized)
        self.embeddings = np.array(embeddings)
        self.chunks = chunks

    def search(self, query: str, top_k: int = 10, alpha: float = 0.5) -> list[dict]:
        # BM25 scores (sparse)
        bm25_scores = self.bm25.get_scores(query.lower().split())
        bm25_norm = (bm25_scores - bm25_scores.min()) / (bm25_scores.max() - bm25_scores.min() + 1e-9)

        # Vector scores (dense)
        query_vec = np.array(embed(query))
        dot_products = self.embeddings @ query_vec
        vec_norm = (dot_products - dot_products.min()) / (dot_products.max() - dot_products.min() + 1e-9)

        # Fuse with Reciprocal Rank Fusion or weighted sum
        combined = alpha * vec_norm + (1 - alpha) * bm25_norm
        top_indices = np.argsort(combined)[::-1][:top_k]
        return [{"text": self.chunks[i], "score": float(combined[i])} for i in top_indices]

alpha=0.5: equal weight. alpha=0.7: favour semantic. alpha=0.3: favour keyword.
Tune alpha on your evaluation set.

2. Reranking

Initial vector retrieval is fast but coarse — it finds approximately relevant chunks.
A cross-encoder reranker reads the full (query, chunk) pair and scores each chunk far more accurately.

Pattern: retrieve top-20 fast → rerank → take top-5.

With Cohere Rerank:

import cohere

co = cohere.Client("...")

def rerank(query: str, chunks: list[str], top_n: int = 5) -> list[str]:
    results = co.rerank(
        model="rerank-v3.5",
        query=query,
        documents=chunks,
        top_n=top_n
    )
    return [chunks[r.index] for r in results.results]

With a local cross-encoder (BGE Reranker):

from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

def rerank_local(query: str, chunks: list[str], top_n: int = 5) -> list[str]:
    pairs = [[query, chunk] for chunk in chunks]
    scores = reranker.predict(pairs)
    ranked = sorted(zip(chunks, scores), key=lambda x: x[1], reverse=True)
    return [chunk for chunk, _ in ranked[:top_n]]

Reranking consistently produces the largest accuracy jump in production benchmarks.
Always retrieve 3–4× more candidates than you need (retrieve 20, rerank to 5).

3. Query Transformation

Users rarely phrase queries the same way documents are written.
Query transformation bridges this gap before retrieval.

Multi-Query Retrieval — generate multiple query variants, retrieve for each, merge:

def multi_query_retrieve(question: str, top_k_per_query: int = 5) -> list[str]:
    prompt = f"""Generate 4 different search queries for this question.
Return as JSON array. Question: {question}"""
    queries = json.loads(llm_call(prompt))

    seen, results = set(), []
    for q in queries:
        chunks = vector_search(q, top_k=top_k_per_query)
        for chunk in chunks:
            if chunk not in seen:
                seen.add(chunk)
                results.append(chunk)
    return results

Example: "How does FastAPI authentication work?" generates:
"FastAPI JWT authentication tutorial"
"OAuth2 with FastAPI example"
"FastAPI security middleware"
"Bearer token FastAPI implementation"

HyDE (Hypothetical Document Embeddings) — generate a hypothetical ideal answer, embed that, search:

def hyde_search(question: str, top_k: int = 5) -> list[str]:
    hypothetical_answer = llm_call(
        f"Write a detailed answer to this question as if you were an expert:\n{question}"
    )
    return vector_search(hypothetical_answer, top_k=top_k)

HyDE works because the hypothetical answer uses the same vocabulary as real documents.
Especially effective when user questions use different terminology than the source material.

Step-Back Prompting — transform specific questions into broader ones to retrieve general principles:

User: "Why does my FastAPI POST /users endpoint return 422?"
Step-back: "What causes 422 validation errors in FastAPI?"

def step_back(question: str) -> str:
    return llm_call(f"Rewrite this specific question as a more general principle question: {question}")

4. Parent-Child Retrieval

The fundamental tension in chunking: small chunks have high retrieval precision but lose context; large chunks have rich context but low precision.

Parent-child solves this: embed small chunks for precise retrieval, but return the full parent section to the LLM.

class ParentChildRetriever:
    def __init__(self):
        self.child_store = {}   # child_id → child_text (for embedding)
        self.parent_store = {}  # parent_id → full parent text (for LLM)
        self.child_to_parent = {}

    def ingest(self, parent_id: str, parent_text: str, child_size: int = 200):
        self.parent_store[parent_id] = parent_text
        children = split_text(parent_text, chunk_size=child_size, overlap=50)
        for i, child in enumerate(children):
            child_id = f"{parent_id}_child_{i}"
            self.child_store[child_id] = child
            self.child_to_parent[child_id] = parent_id
            upsert_vector(child_id, embed(child), {"text": child})

    def retrieve(self, query: str, top_k: int = 3) -> list[str]:
        child_results = vector_search(embed(query), top_k=top_k * 3)
        parent_ids = {self.child_to_parent[r.id] for r in child_results}
        return [self.parent_store[pid] for pid in list(parent_ids)[:top_k]]

Search finds the precise child chunk; LLM receives the full parent context.

5. Contextual Retrieval

Chunks often lose meaning without their document context.

Standalone chunk: "It was approved in 2024." — meaningless.
Contextualized chunk: "From Acme Corp Security Policy v3.1: It was approved in 2024." — useful.

def add_context_to_chunk(document_summary: str, chunk: str) -> str:
    prompt = f"""Given the document:
{document_summary}

Add a one-sentence context prefix to this chunk so it makes sense when retrieved in isolation:
{chunk}

Return only the contextualized chunk."""
    return llm_call(prompt)

Run this at ingestion time. Store the contextualized version as the embedding text.
Anthropic published research showing this improves retrieval accuracy by 49%.

6. Agentic RAG

Instead of one fixed retrieval round, the agent decides when and what to retrieve.

async def agentic_rag(question: str, max_iterations: int = 5) -> str:
    context = []
    messages = [{"role": "user", "content": question}]

    for i in range(max_iterations):
        tools = [search_tool, done_tool]
        response = await llm_with_tools(messages, tools)

        if response.tool_calls:
            for tc in response.tool_calls:
                if tc.name == "search_documents":
                    results = vector_search(tc.args["query"], top_k=5)
                    context.extend(results)
                    messages.append(tool_result(tc.id, format_results(results)))
                elif tc.name == "done":
                    return tc.args["answer"]
        else:
            return response.text

    return summarize_with_context(question, context)

The agent can search multiple times, follow up on gaps, and stop when confident.
Powers systems like Perplexity and Claude's research mode.

7. Corrective RAG (CRAG)

CRAG evaluates retrieval quality before answering. If retrieved chunks are not relevant enough, it triggers a web search or different retrieval strategy.

def crag_pipeline(question: str) -> str:
    chunks = vector_search(question, top_k=10)
    relevance_scores = [score_relevance(question, c) for c in chunks]
    avg_relevance = sum(relevance_scores) / len(relevance_scores)

    if avg_relevance > 0.7:
        # Good retrieval — proceed
        return generate_answer(question, chunks)
    elif avg_relevance > 0.3:
        # Mixed — supplement with web search
        web_results = web_search(question)
        return generate_answer(question, chunks + web_results)
    else:
        # Poor retrieval — fall back to web search entirely
        web_results = web_search(question)
        return generate_answer(question, web_results)

def score_relevance(question: str, chunk: str) -> float:
    response = llm_call(f"Score 0-1: how relevant is this chunk to the question?\nQ: {question}\nChunk: {chunk}\nScore:")
    return float(response.strip())

8. Graph RAG

Instead of flat vector search, Graph RAG stores entities and relationships as a knowledge graph and traverses it during retrieval.

Multi-hop query: "Who is the CEO of the company that acquired GitHub?"
Vector search: retrieves chunks mentioning GitHub or Microsoft separately — may miss the connection.
Graph traversal: GitHub → acquired_by → Microsoft → CEO → Satya Nadella.

Graph RAG is used in Microsoft's GraphRAG library and is particularly effective for enterprise knowledge bases with complex entity relationships.

RAG Evaluation

Every advanced RAG system must be evaluated. Without measurement, tuning is guesswork.

from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall

dataset = [
    {"question": q, "answer": a, "contexts": c, "ground_truth": g}
    for q, a, c, g in test_cases
]

scores = evaluate(dataset, metrics=[faithfulness, answer_relevancy, context_precision, context_recall])
print(scores)

Four metrics:
Faithfulness — is the answer supported by the retrieved chunks? (no hallucination)
Answer relevancy — does the answer actually address the question?
Context precision — are the retrieved chunks relevant? (retrieval quality)
Context recall — did retrieval find all the information needed?

Run evaluation on 50–100 test cases with known ground truth after every pipeline change.

Advanced RAG Pipeline

Full production stack:

Query in
↓
Query transformation (multi-query + step-back)
↓
Hybrid retrieval (dense + BM25 + RRF)
↓
Metadata filtering
↓
Reranking (Cohere Rerank v3.5 or BGE)
↓
Parent-child resolution (return full parent sections)
↓
Context deduplication and compression
↓
LLM call with retrieved context
↓
Faithfulness check
↓
Answer out

Not every system needs all stages. Start with hybrid + reranking. Add the others based on evaluation metrics showing what is failing.`,
        keyPoints: [
          "Hybrid search (vector + BM25 + RRF): the single most impactful upgrade — catches exact-term queries vector misses",
          "alpha=0.5 (equal weight) is a safe default; tune alpha on your eval set toward semantic or keyword based on query types",
          "Reranking: retrieve top-20 fast → CrossEncoder or Cohere Rerank → return top-5 — biggest single accuracy jump",
          "Always over-retrieve for reranking: retrieve 3-4× more candidates than you need (retrieve 20, rerank to 5)",
          "Multi-query: LLM generates 4 query variants → retrieve for each → deduplicate → merge all results",
          "HyDE: generate hypothetical ideal answer → embed the answer → search with that vector — bridges query/document vocabulary gap",
          "Step-back prompting: rewrite specific question as general principle → retrieve broader context first",
          "Parent-child: embed small chunks (200 tokens) for precision; return full parent section (1000 tokens) to the LLM",
          "Contextual retrieval: prepend document context to each chunk at ingestion — 'From Acme Policy v3: ...' — 49% recall improvement",
          "Agentic RAG: LLM decides when to retrieve, what to search for, and when it has enough — loops until confident",
          "CRAG: score retrieved chunk relevance before answering; below threshold → re-search or fall back to web search",
          "Evaluation with RAGAS: faithfulness, answer_relevancy, context_precision, context_recall — measure after every change",
        ],
        project:
          "Build a production advanced RAG pipeline in stages, measuring accuracy at each stage on a fixed evaluation set of 30 questions with known correct answers. Stage 1 (baseline): basic vector search, top-5 chunks. Stage 2: add hybrid search (vector + BM25 via rank_bm25, alpha=0.5, RRF fusion) — measure hit rate improvement. Stage 3: add Cohere Rerank v3.5 — retrieve top-20, rerank to top-5 — measure improvement over Stage 2. Stage 4: add multi-query retrieval — LLM generates 4 query variants, retrieve for each, deduplicate, pass all to reranker — measure improvement. Stage 5: implement parent-child — index small chunks (200 tokens, 50 overlap), return parent sections (800 tokens) to LLM — measure answer completeness. Stage 6: add contextual retrieval — at ingestion, prepend a one-sentence document context to each chunk, re-embed, and compare retrieval hit rate against Stage 1. Stage 7: implement CRAG — score retrieved chunks for relevance, fall back to web search (Tavily) when avg relevance < 0.4. Run RAGAS evaluation (faithfulness + context_precision + context_recall) on the final pipeline vs the Stage 1 baseline. Report the metric deltas for each stage so you can see which upgrade contributed the most.",
        stack: ["Cohere API", "rank_bm25", "Qdrant", "RAGAS", "Tavily API", "OpenAI API", "Python"],
        resources: [
          { title: "Anthropic Contextual Retrieval", url: "https://www.anthropic.com/news/contextual-retrieval" },
          { title: "RAGAS Evaluation Framework", url: "https://docs.ragas.io/" },
          { title: "Cohere Rerank API", url: "https://docs.cohere.com/docs/rerank-2" },
          { title: "Corrective RAG Paper", url: "https://arxiv.org/abs/2401.15884" },
        ],
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
          "ReAct (Reason + Act) is the foundational pattern behind almost every modern AI agent — ChatGPT Deep Research, Claude Code, Cursor, OpenAI Agents SDK, and LangGraph all build on it. The core idea: instead of answering immediately, the agent alternates between Thought (internal reasoning about what to do) and Action (a tool call), then reads the Observation (tool result) and thinks again. This loop continues until the goal is achieved. It is simple, dynamic, and naturally handles tool use — the agent adapts as new information arrives from each observation.\n\nReAct has one key weakness: it has no long-term plan. The agent only reasons about the immediately next action. For short tasks this is fine. For complex, multi-step tasks — 'research AI startups, compare funding rounds, and write a structured report' — ReAct can become inefficient, looping without a clear strategy. Planner-Executor solves this by separating thinking from doing. The Planner receives the goal and generates a structured task list up front. The Executor then works through each task, using tools as needed, and reports results back. The Planner reviews results and replans if anything fails.\n\nIn practice, the most powerful agents combine both: a Planner creates the strategy, and a ReAct loop drives each execution step. This gives you strategic decomposition at the top level and adaptive, tool-using execution at the step level. Claude Code uses exactly this pattern — a high-level plan over the task, with ReAct-style read-think-edit-run loops inside each step. Understanding when to use ReAct alone, Planner-Executor alone, and the hybrid is one of the core architectural skills of an agent engineer.",
        deepDive: `ReAct and Planner-Executor are not competing architectures — they solve different problems and are often used together.

Why Agent Architectures Exist

A traditional LLM call:

Question → LLM → Answer

One response. No iteration. Works for simple Q&A.

For complex tasks:

Research top AI startups, compare funding, generate report.

A single response cannot do this. The agent needs to search, read results, search again, compare, and write — multiple rounds of thinking and acting. Agent architectures define how this multi-step process is structured.

PART 1: REACT

ReAct was introduced in a 2022 paper from Google Brain and Princeton. The insight was simple: combine reasoning and acting in an interleaved loop. The model thinks about what to do, does it, observes the result, thinks about what to do next, and repeats.

ReAct Loop

Thought: internal reasoning — what do I need? what tool should I use?
Action: a tool call — search, execute, read, write
Observation: the tool's return value — what happened?

Loop:

Thought → Action → Observation → Thought → Action → Observation → ... → Final Answer

Implementation from scratch:

import json
from openai import OpenAI

client = OpenAI()

def react_agent(goal: str, tools: list, max_iterations: int = 10) -> str:
    messages = [
        {"role": "system", "content": "You are an agent. Think step by step. Use tools when needed."},
        {"role": "user",   "content": goal}
    ]

    for i in range(max_iterations):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
        message = response.choices[0].message
        messages.append(message)

        # No tool calls — agent has finished
        if not message.tool_calls:
            return message.content

        # Execute each tool call (Observation phase)
        for tc in message.tool_calls:
            result = execute_tool(tc.function.name, json.loads(tc.function.arguments))
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": json.dumps(result)
            })

    return "Max iterations reached"

The loop is the entire architecture. There is no planner, no task list — just Thought → Action → Observation repeated until the model stops calling tools.

Logging the ReAct trace:

def react_agent_verbose(goal: str, tools: list) -> str:
    messages = [...]
    iteration = 0

    while True:
        response = call_llm(messages, tools)
        message = response.choices[0].message

        if not message.tool_calls:
            print(f"[{iteration}] ANSWER: {message.content}")
            return message.content

        for tc in message.tool_calls:
            print(f"[{iteration}] THOUGHT → ACTION: {tc.function.name}({tc.function.arguments})")
            result = execute_tool(tc.function.name, json.loads(tc.function.arguments))
            print(f"[{iteration}] OBSERVATION: {str(result)[:200]}")
            messages.append(tool_result_message(tc.id, result))

        iteration += 1

Run this during development. Watching the Thought → Action → Observation trace tells you exactly where the agent gets confused, loops, or uses the wrong tool.

ReAct Example Trace

Goal: "What is the current population of Japan and how has it changed in the last decade?"

[0] ACTION: search_web("Japan population 2025")
[0] OBSERVATION: "Japan's population is approximately 123.2 million as of 2025..."

[1] ACTION: search_web("Japan population 2015 trend")
[1] OBSERVATION: "Japan's population was 127 million in 2015, declining due to..."

[2] ANSWER: "Japan's population is 123.2 million in 2025, down from 127 million in 2015 — a decline of roughly 3.8 million over a decade, driven by low birth rates and limited immigration."

Three steps. Two tool calls. The agent decided it had enough information after the second observation and produced the final answer.

ReAct Safeguards

Infinite loop prevention:

max_iterations = 15  # never exceed this

Budget enforcement:

total_tokens = sum(count_tokens(m) for m in messages)
if total_tokens > 50_000:
    return "Token budget exceeded — stopping"

Repetition detection:

last_actions = [tc.function.name for m in messages if hasattr(m, 'tool_calls') for tc in (m.tool_calls or [])]
if len(last_actions) >= 3 and len(set(last_actions[-3:])) == 1:
    return "Agent appears stuck in a loop — stopping"

PART 2: PLANNER-EXECUTOR

For complex tasks, ReAct without a plan is inefficient. The agent figures out strategy one step at a time, which often leads to redundant actions and missed coverage.

Planner-Executor separates planning from execution:

Planner — LLM receives the goal and generates a structured plan: a list of tasks, in order, with dependencies.
Executor — works through each task in the plan, using tools as needed, and returns results.
Planner (again) — reviews the results, identifies failures, and replans if necessary.

Implementation:

import json
from dataclasses import dataclass

@dataclass
class Task:
    id: str
    description: str
    tool: str
    args: dict
    depends_on: list[str] = None

def planner(goal: str) -> list[Task]:
    prompt = f"""Break this goal into a list of tasks. Return JSON array.
Each task: {{"id": "t1", "description": "...", "tool": "tool_name", "args": {{}}, "depends_on": []}}

Goal: {goal}"""
    raw = llm_call(prompt)
    tasks_json = json.loads(raw)
    return [Task(**t) for t in tasks_json]

def executor(tasks: list[Task]) -> dict[str, any]:
    results = {}
    for task in tasks:
        # Wait for dependencies
        if task.depends_on:
            for dep_id in task.depends_on:
                if dep_id not in results:
                    raise ValueError(f"Dependency {dep_id} not yet completed")

        # Execute the task
        result = execute_tool(task.tool, task.args)
        results[task.id] = result
        print(f"[EXECUTOR] {task.id}: {task.description} → done")

    return results

def replanner(goal: str, original_tasks: list[Task], results: dict) -> list[Task]:
    completed = [t for t in original_tasks if t.id in results]
    failed = [t for t in original_tasks if t.id not in results]
    if not failed:
        return []

    prompt = f"""Goal: {goal}
Completed: {[t.description for t in completed]}
Failed: {[t.description for t in failed]}
Results so far: {json.dumps({k: str(v)[:200] for k, v in results.items()})}

Generate a revised task list to complete the goal. JSON array."""
    raw = llm_call(prompt)
    return [Task(**t) for t in json.loads(raw)]

Full Planner-Executor loop:

def planner_executor_agent(goal: str) -> str:
    tasks = planner(goal)
    print(f"[PLAN] {len(tasks)} tasks generated")

    results = executor(tasks)

    # Check if replanning needed
    if len(results) < len(tasks):
        revised = replanner(goal, tasks, results)
        if revised:
            additional = executor(revised)
            results.update(additional)

    # Synthesize final answer
    return synthesize(goal, results)

Planner-Executor Example

Goal: "Create a competitor analysis report for OpenAI."

Plan generated:
t1: Search for OpenAI competitors (depends_on: [])
t2: Get funding data for each competitor (depends_on: [t1])
t3: Get product comparison (depends_on: [t1])
t4: Analyze market positioning (depends_on: [t2, t3])
t5: Write structured report (depends_on: [t4])

Executor runs t1 → feeds output into t2 and t3 → merges → t4 → t5.

PART 3: HYBRID ARCHITECTURE

The most powerful agents use both. The Planner creates the strategy. Each execution step runs a ReAct loop.

def hybrid_agent(goal: str) -> str:
    # Step 1: Plan
    tasks = planner(goal)

    # Step 2: Execute each task with a ReAct sub-loop
    results = {}
    for task in tasks:
        task_result = react_agent(
            goal=task.description,
            tools=get_tools_for_task(task),
            context=results  # pass prior results as context
        )
        results[task.id] = task_result

    # Step 3: Replan if needed
    if any_task_failed(results):
        revised = replanner(goal, tasks, results)
        for task in revised:
            results[task.id] = react_agent(task.description, tools=get_tools_for_task(task))

    # Step 4: Synthesize
    return synthesize(goal, results)

This is the pattern behind Deep Research, Devin, and Manus.

Planner provides: strategy, coverage, parallelism opportunities.
ReAct provides: adaptability, tool use, dynamic response to observations.

When to Use Each

ReAct alone:
Interactive chat agents — user is in the loop, tasks are short
Simple research (1–3 tool calls)
When flexibility matters more than coverage

Planner-Executor alone:
Well-defined multi-step workflows with known task structure
Business automation (onboarding, report generation, data pipelines)
When predictability and auditability matter

Hybrid (Planner + ReAct per task):
Complex autonomous research (Deep Research style)
Coding agents (plan the feature, then ReAct-loop through read/edit/test)
Enterprise workflows where tasks are complex but the high-level structure is known

ReAct vs Planner-Executor

ReAct:
Immediate decision focus
Minimal upfront planning
High flexibility, adapts to new information
Best for: chat agents, simple research, interactive tasks
Risk: can loop without direction on complex tasks

Planner-Executor:
Task decomposition focus
Extensive upfront planning
Structured, predictable, auditable
Best for: complex workflows, research projects, coding
Risk: plan may be wrong, environment changes invalidate it

Failure Modes and Safeguards

ReAct failures:
Infinite loops → enforce max_iterations (10–25)
Tool overuse → enforce per-tool call limits
No strategic coverage → switch to hybrid if task is complex

Planner-Executor failures:
Bad initial plan → add plan review step before execution
Outdated plan → monitor execution results, trigger replanning on failure
Overplanning → cap plan depth to 8–10 tasks; executor handles sub-steps

Production monitoring:
Log every Thought → Action → Observation triple
Track total tokens per task (set budget alerts)
Record step count distribution — consistent outliers signal architecture problems`,
        keyPoints: [
          "ReAct loop: Thought (internal reasoning) → Action (tool call) → Observation (result) → repeat until no tool calls",
          "ReAct is simple to implement — one function calling loop; the model stops calling tools when it has enough to answer",
          "Log every Thought/Action/Observation during development — the trace reveals exactly where the agent loops or goes wrong",
          "ReAct safeguards: max_iterations (10–25), token budget, repetition detection (same tool 3× in a row → stop)",
          "Planner-Executor: Planner LLM generates a structured JSON task list up front; Executor runs each task in order",
          "Tasks have depends_on fields — task t3 waits for t2's result before executing",
          "Replanner: reviews completed tasks and results, generates revised task list for anything that failed",
          "Hybrid = Planner creates strategy + ReAct loop runs each individual task — used by Deep Research, Devin, Claude Code",
          "ReAct alone: best for short, interactive, adaptive tasks where flexibility > coverage",
          "Planner-Executor alone: best for well-defined multi-step workflows with known structure and auditability requirements",
          "Hybrid: best for complex autonomous research, coding agents, enterprise workflows with unknown sub-task complexity",
          "Production: log step counts per task, set token budget alerts, treat consistent outliers as architecture signals",
        ],
        project:
          "Build all three architectures for the same task: 'Research the top 3 AI coding assistants, compare their features and pricing, and write a structured comparison report.' Architecture 1 — pure ReAct: one agent loop with search_web, read_url, and write_file tools. Add verbose logging of every Thought/Action/Observation. Enforce max_iterations=15 and a 40K token budget. Architecture 2 — pure Planner-Executor: Planner generates a JSON task list (5–8 tasks with depends_on), Executor runs each using the same tools, Replanner checks for failures and revises. Architecture 3 — hybrid: Planner generates 4 high-level tasks (research each tool, compare, write), each task runs its own ReAct sub-loop. Measure all three on: task completion quality (human eval 1–5), total steps taken, total tokens consumed, and wall-clock time. Add a fourth measurement: break one tool mid-run (make search_web fail on the 3rd call) and observe how each architecture handles the failure — ReAct adapts, pure Planner fails unless Replanner kicks in, Hybrid handles it at the task level. Report which architecture performed best for this task type and why.",
        stack: ["Python", "OpenAI API", "Anthropic API", "Tavily API"],
        resources: [
          { title: "ReAct Paper — Reason + Act", url: "https://arxiv.org/abs/2210.03629" },
          { title: "OpenAI Agents SDK", url: "https://openai.github.io/openai-agents-python/" },
        ],
      },
      {
        id: "arch-advanced",
        icon: "🕸️",
        label: "DAG & Multi-Agent Systems",
        level: "advanced",
        concept:
          "When a task becomes too large for a single agent — research 100 companies, analyze competitors, generate a report, then review findings — two architectural patterns solve the problem: DAGs and multi-agent systems. A DAG (Directed Acyclic Graph) represents a workflow as nodes (tasks) connected by edges (dependencies). Tasks with no dependency on each other run in parallel; tasks that need a prior result wait. This structure is what makes complex pipelines fast, scalable, and debuggable. LangGraph is built entirely around this model.\n\nA multi-agent system goes further by assigning each node to a specialized agent — a separate LLM call with its own system prompt, tools, and responsibility. A Research Agent knows how to search and extract. A Writer Agent knows how to structure and compose. A Reviewer Agent knows how to fact-check and critique. Specialization produces higher quality output than asking one general agent to do everything. The Supervisor pattern is the most common structure: one orchestrator agent decomposes the goal, delegates tasks to specialists, collects results, and synthesizes the final output.\n\nMost production systems combine both patterns. The DAG defines the workflow topology — which tasks run in parallel, which wait for dependencies. Multi-agent assignment gives each node a specialized identity. Shared memory (a state dict passed through the graph) lets every agent read prior results and write its own outputs. This is the architecture behind ChatGPT Deep Research, Manus, and enterprise AI platforms — parallel specialist agents executing a structured workflow with a coordinator synthesizing the final result.",
        deepDive: `DAGs and multi-agent systems address the same root problem from different angles: a single agent trying to do everything breaks down at scale.

PART 1: DAGs

What is a DAG?

Directed Acyclic Graph:
Directed — information flows in a specific direction
Acyclic — no cycles (no infinite loops)
Graph — tasks are nodes, dependencies are edges

In agent systems: nodes are tasks or agent calls, edges encode "this task must complete before that one can start."

Sequential DAG (all tasks depend on the previous):

Task A → Task B → Task C → Task D

Branching DAG (independent tasks run in parallel):

           Task A
          /       \
     Task B     Task C
          \       /
           Task D

Task B and C run simultaneously. Task D waits for both.

Why DAGs matter

Without a DAG:

One agent runs everything sequentially.
Total time = sum of all task durations.

With a parallel DAG:

Independent tasks run concurrently.
Total time = longest path through the graph (critical path).

For a research pipeline with 4 independent searches:
Sequential: 4 × 3s = 12s
Parallel DAG: 3s (all run at once)

DAG Implementation with asyncio

from dataclasses import dataclass, field
import asyncio

@dataclass
class DAGNode:
    id: str
    fn: callable
    args: dict = field(default_factory=dict)
    depends_on: list[str] = field(default_factory=list)

async def execute_dag(nodes: list[DAGNode]) -> dict[str, any]:
    results = {}
    completed = set()
    node_map = {n.id: n for n in nodes}

    async def run_node(node: DAGNode):
        # Wait for all dependencies
        while not all(dep in completed for dep in node.depends_on):
            await asyncio.sleep(0.01)

        # Inject dependency results into args
        dep_results = {dep: results[dep] for dep in node.depends_on}
        result = await node.fn(**node.args, **dep_results)
        results[node.id] = result
        completed.add(node.id)

    await asyncio.gather(*[run_node(n) for n in nodes])
    return results

Example — Research DAG:

nodes = [
    DAGNode("search_companies", search_web, args={"query": "top AI startups 2025"}),
    DAGNode("search_funding",   search_web, args={"query": "AI startup funding 2025"}),
    DAGNode("search_products",  search_web, args={"query": "AI products comparison 2025"}),
    DAGNode("analyze",          analyze_fn, depends_on=["search_companies", "search_funding", "search_products"]),
    DAGNode("write_report",     write_fn,   depends_on=["analyze"]),
]

results = await execute_dag(nodes)

All three search nodes fire simultaneously. Analyze waits for all three. write_report waits for analyze.

Critical Path

The critical path is the longest chain of dependencies — it determines the total execution time.

Optimization: identify the critical path and prioritize reducing latency on those nodes.
Independent tasks not on the critical path can be slow without affecting total time.

PART 2: MULTI-AGENT SYSTEMS

Why Specialization Works

A single general-purpose agent asked to research, analyze, write, and review has context split across all four concerns. Each task suffers.

Specialized agents:
Research Agent — its entire system prompt, tool list, and reasoning pattern is optimized for search and extraction.
Writer Agent — optimized for structure, coherence, and clarity.
Reviewer Agent — optimized for fact-checking, gap identification, and critique.

Each agent is better at its job because it only has one job.

Agent as a Function

The simplest mental model: an agent is just an async function.

async def research_agent(query: str, tools: list) -> str:
    return await llm_call(
        system="You are a research specialist. Search thoroughly and extract key facts.",
        user=query,
        tools=tools
    )

async def writer_agent(research_results: str, format: str) -> str:
    return await llm_call(
        system="You are a professional writer. Structure findings clearly and concisely.",
        user=f"Write a {format} based on:\n{research_results}"
    )

async def reviewer_agent(draft: str, criteria: str) -> str:
    return await llm_call(
        system="You are a critical reviewer. Identify gaps, errors, and improvements.",
        user=f"Review this against criteria: {criteria}\n\nDraft:\n{draft}"
    )

Each agent has: a focused system prompt, appropriate tools, and a single well-defined responsibility.

Multi-Agent Patterns

1. Supervisor Pattern (most common)

One orchestrator agent receives the goal, decomposes it, delegates to specialists, and synthesizes the output.

async def supervisor_agent(goal: str) -> str:
    # Step 1: Decompose
    subtasks = await llm_call(
        system="You are a project manager. Break goals into specialist tasks.",
        user=f"Decompose: {goal}\nReturn JSON: [{{'agent': 'research|write|review', 'task': '...'}}]"
    )
    tasks = json.loads(subtasks)

    # Step 2: Delegate in parallel where possible
    research_tasks = [t for t in tasks if t["agent"] == "research"]
    research_results = await asyncio.gather(*[
        research_agent(t["task"], tools=search_tools) for t in research_tasks
    ])

    # Step 3: Write
    draft = await writer_agent(
        research_results="\n\n".join(research_results),
        format="structured report"
    )

    # Step 4: Review
    review = await reviewer_agent(draft, criteria="accuracy, completeness, clarity")

    # Step 5: Revise if needed
    if "REVISION NEEDED" in review:
        draft = await writer_agent(f"{draft}\n\nReview feedback:\n{review}", format="revised report")

    return draft

2. Peer-to-Peer Pattern

Agents pass messages directly without a central coordinator.
Used in debate-style systems where agents challenge each other's outputs.

async def peer_review_loop(proposal: str, rounds: int = 3) -> str:
    agent_a_position = proposal
    for _ in range(rounds):
        critique = await critic_agent(agent_a_position)
        agent_a_position = await proposer_agent(f"Revise given critique:\n{critique}\n\nOriginal:\n{agent_a_position}")
    return agent_a_position

3. Hierarchical Pattern

Manager agents coordinate team leads, who coordinate workers.
Used in very large systems where no single agent can oversee everything.

Manager Agent
↓
Team Lead A         Team Lead B
↓         ↓         ↓         ↓
Worker 1  Worker 2  Worker 3  Worker 4

Manager sees only team lead outputs.
Team leads see only their workers' outputs.

4. Self-Critique Pattern

One agent generates, another critiques, the first revises.
Dramatically improves output quality — like a human editing their own work with fresh eyes.

async def self_critique(task: str, iterations: int = 2) -> str:
    draft = await generator_agent(task)
    for i in range(iterations):
        critique = await critic_agent(
            f"Critique this output. Be specific about what is wrong or missing:\n{draft}"
        )
        if "LOOKS GOOD" in critique:
            break
        draft = await generator_agent(
            f"Revise based on this critique:\n{critique}\n\nCurrent draft:\n{draft}"
        )
    return draft

Used by: coding agents (generate → test → fix), writing agents (draft → critique → revise), research agents (find → verify → expand).

Agent Communication via Shared State

The cleanest way for agents to share information is a shared state dict passed through the pipeline.

@dataclass
class PipelineState:
    goal: str
    research: dict = field(default_factory=dict)
    analysis: str = ""
    draft: str = ""
    review: str = ""
    final: str = ""

async def research_node(state: PipelineState) -> PipelineState:
    state.research = await research_agent(state.goal)
    return state

async def analysis_node(state: PipelineState) -> PipelineState:
    state.analysis = await analysis_agent(state.research)
    return state

async def write_node(state: PipelineState) -> PipelineState:
    state.draft = await writer_agent(state.analysis)
    return state

# Sequential pipeline
state = PipelineState(goal=user_goal)
state = await research_node(state)
state = await analysis_node(state)
state = await write_node(state)

Every agent reads from state and writes back to state. No agent needs to know about agents other than what state fields it reads and writes.

PART 3: COMBINED DAG + MULTI-AGENT

The most powerful architecture: a DAG workflow where each node is a specialized agent.

async def deep_research_system(topic: str) -> str:
    state = ResearchState(topic=topic)

    # Phase 1: Parallel research (DAG — all independent)
    web_results, pdf_results, db_results = await asyncio.gather(
        web_search_agent(topic),
        pdf_search_agent(topic),
        database_agent(topic)
    )

    # Phase 2: Analysis (depends on all three)
    state.analysis = await analysis_agent(web_results, pdf_results, db_results)

    # Phase 3: Write (depends on analysis)
    state.draft = await writer_agent(state.analysis)

    # Phase 4: Review + Revise loop
    for _ in range(2):
        review = await reviewer_agent(state.draft)
        if review.score >= 8:
            break
        state.draft = await writer_agent(state.draft, feedback=review.feedback)

    return state.draft

This is the pattern behind ChatGPT Deep Research and Manus.

Real Production Architecture

User Query
↓
Planner Agent (decomposes goal into DAG)
↓
Parallel Research Phase (DAG nodes running concurrently):
  Web Search Agent | PDF Extraction Agent | Database Agent
↓
Analysis Agent (waits for all research)
↓
Writer Agent (depends on analysis)
↓
Reviewer Agent (self-critique loop, 2 passes)
↓
Final Output

Challenges

Communication overhead: every LLM call costs tokens and latency — minimize message passing between agents.
Failure propagation: one agent failing can break downstream nodes — add fallbacks at every node.
Cost: N agents × M iterations = N×M LLM calls — set token budgets per agent.
Debugging: log every agent's input and output with timestamps and token counts.

Monitoring a multi-agent run:

async def monitored_agent(name: str, fn: callable, *args, **kwargs):
    start = time.time()
    result = await fn(*args, **kwargs)
    elapsed = time.time() - start
    tokens = count_tokens(str(result))
    log.info(f"agent={name} duration={elapsed:.2f}s tokens={tokens}")
    return result

When to Use Each Architecture

Single ReAct agent:
Simple tasks (1–5 tool calls), interactive chat, unknown task structure

Planner-Executor:
Well-defined multi-step tasks, business automation, auditable workflows

Parallel DAG:
Independent subtasks that can run concurrently, when latency matters

Multi-Agent Supervisor:
Complex tasks requiring specialized skills, quality-critical outputs (write + review)

Combined DAG + Multi-Agent:
Large-scale autonomous research, enterprise knowledge workflows, coding agents on full features`,
        keyPoints: [
          "DAG: nodes = tasks, edges = dependencies — independent nodes run in parallel with asyncio.gather(), dependent nodes wait",
          "Critical path: the longest dependency chain determines total runtime — optimize the critical path first",
          "DAG speedup: 4 independent searches sequentially = 12s; in parallel DAG = 3s (critical path only)",
          "Supervisor pattern: orchestrator decomposes goal → delegates to specialists in parallel → collects results → synthesizes",
          "Specialist agent = async function with a focused system prompt + purpose-specific tools — one job, done well",
          "Shared state dict: every agent reads from and writes to PipelineState — clean handoff, no direct agent coupling",
          "Self-critique pattern: generator → critic → revise → repeat N times — used in coding, writing, and research agents",
          "Peer-to-peer: agents pass messages directly without coordinator — debate style, proposal/critique loops",
          "Combined DAG + multi-agent: parallel specialized agents in Phase 1, sequential dependent agents in Phase 2+",
          "Monitoring: log agent name, duration, token count on every call — multi-agent systems are expensive and slow without visibility",
          "Failure handling: add fallback at every node — one agent failing should not crash the pipeline",
          "Cost control: N agents × M iterations = N×M LLM calls — set per-agent token budgets before deployment",
        ],
        project:
          "Build a multi-agent research pipeline using DAG + supervisor architecture. The system takes a topic and produces a structured report. Phase 1 — parallel DAG (3 specialized agents run concurrently via asyncio.gather()): WebSearchAgent (Tavily, returns top 10 results), PDFAgent (reads 2 local PDFs about the topic), and DataAgent (queries a local SQLite DB with structured facts). Phase 2 — AnalysisAgent (waits for all three Phase 1 results, identifies key themes and contradictions). Phase 3 — WriterAgent (produces a structured 5-section report). Phase 4 — ReviewerAgent (scores the draft 1–10 on accuracy, completeness, and clarity; if score < 7 returns specific feedback). Phase 5 — RevisionLoop (WriterAgent revises based on feedback; max 2 rounds). Add a SupervisorAgent that orchestrates all phases and a monitored_agent() wrapper that logs agent name, duration, and token count for every call. Implement failure handling: if any Phase 1 agent fails, log and continue with the other two. Measure total wall-clock time vs sequential execution of the same tasks. Compare output quality: single ReAct agent vs the multi-agent pipeline on the same topic using human evaluation (1–5 score on depth, accuracy, structure).",
        stack: ["Python", "asyncio", "OpenAI API", "Anthropic API", "Tavily API", "SQLite"],
        resources: [
          { title: "LangGraph Multi-Agent Docs", url: "https://langchain-ai.github.io/langgraph/concepts/multi_agent/" },
          { title: "OpenAI Agents SDK — Handoffs", url: "https://openai.github.io/openai-agents-python/handoffs/" },
        ],
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
