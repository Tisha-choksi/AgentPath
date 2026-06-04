import type { RoadmapPhase } from "./roadmap";

export const restApiData: RoadmapPhase[] = [
  {
    id: "fa-1",
    phaseNumber: 1,
    title: "FastAPI Fundamentals",
    subtitle: "introduction",
    accent: "#3B82F6",
    bg: "#0d1929",
    nodes: [
      {
        id: "fa-1-1",
        icon: "🚀",
        label: "What is FastAPI",
        level: "beginner",
        concept:
          "FastAPI is a modern Python web framework for building APIs, built on top of Starlette and Pydantic. It's one of the fastest Python frameworks (on par with Node.js and Go), auto-generates interactive docs, and enforces type safety. It was created by Sebastián Ramírez and has become the default choice for Python backend development, especially for AI and ML APIs.",
        keyPoints: [
          "Based on Python type hints — your annotations become validation, docs, and editor support",
          "Auto-generated Swagger UI at /docs and ReDoc at /redoc",
          "One of the fastest Python frameworks — async-first, built on Starlette",
          "Pydantic integration: request validation, serialization, and response shaping",
          "Used by Microsoft, Netflix, Uber for production AI APIs",
        ],
        project:
          "Install FastAPI and uvicorn. Create a main.py with one GET /hello endpoint that returns {message: 'Hello from FastAPI'}. Run it, open /docs, and test the endpoint in the Swagger UI. Add your name as a path parameter: GET /hello/{name}.",
        stack: ["FastAPI", "Python", "uvicorn"],
        resources: [
          { title: "FastAPI Official Docs", url: "https://fastapi.tiangolo.com/" },
        ],
      },
      {
        id: "fa-1-2",
        icon: "⚡",
        label: "ASGI vs WSGI",
        level: "beginner",
        concept:
          "WSGI (Web Server Gateway Interface) is the old Python web standard — synchronous, one request at a time per worker. ASGI (Asynchronous Server Gateway Interface) is the modern standard — supports async/await, handles thousands of concurrent connections efficiently. FastAPI is ASGI. Django and Flask are WSGI by default. The difference matters enormously for AI APIs that wait on slow LLM responses.",
        keyPoints: [
          "WSGI: synchronous — one request blocks until complete before next starts",
          "ASGI: asynchronous — await slow I/O (LLM calls, DB queries) while handling other requests",
          "uvicorn: production ASGI server — runs your FastAPI app",
          "async def endpoint(): — define async route handlers for non-blocking I/O",
          "10x+ throughput for I/O-bound workloads (API calls, DB queries) with ASGI",
        ],
        project:
          "Write two versions of the same endpoint: one with def (sync) and one with async def (async). Add an await asyncio.sleep(1) in the async version to simulate a slow LLM call. Use curl to hit both simultaneously and observe the async version handles concurrent requests without blocking.",
        stack: ["FastAPI", "uvicorn", "asyncio"],
        resources: [],
      },
      {
        id: "fa-1-3",
        icon: "📁",
        label: "FastAPI Project Structure",
        level: "beginner",
        concept:
          "A well-structured FastAPI project is maintainable as it grows. The standard structure separates: routers (route handlers), schemas (Pydantic models), models (ORM models), services (business logic), dependencies (shared DI), and core (config, database). This separation keeps each file focused on one concern.",
        keyPoints: [
          "app/ directory: main FastAPI app with routers, schemas, models, services",
          "routers/: one file per resource — users.py, products.py, agents.py",
          "schemas/: Pydantic request/response models",
          "models/: SQLAlchemy ORM models",
          "core/: config.py (settings), database.py (DB connection), security.py",
        ],
        project:
          "Scaffold a production FastAPI project structure: app/main.py, app/routers/, app/schemas/, app/models/, app/services/, app/core/. Create empty __init__.py files. Write a config.py using Pydantic Settings that reads environment variables. Wire it all together so uvicorn app.main:app works.",
        stack: ["FastAPI", "Python"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-2",
    phaseNumber: 2,
    title: "Routing",
    subtitle: "http methods",
    accent: "#22C55E",
    bg: "#0d1f12",
    nodes: [
      {
        id: "fa-2-1",
        icon: "📥",
        label: "GET & POST Routes",
        level: "beginner",
        concept:
          "Routes map URL + HTTP method to a Python function. GET retrieves data — safe and idempotent, no request body. POST submits data to create a resource — carries a JSON body. In FastAPI, decorators define routes: @app.get('/items') and @app.post('/items'). The function's return value is automatically serialized to JSON.",
        keyPoints: [
          "@app.get('/items'): list all items",
          "@app.get('/items/{id}'): get one item by ID",
          "@app.post('/items', status_code=201): create an item",
          "Return a dict or Pydantic model — FastAPI auto-converts to JSON",
          "response_model=ItemResponse: declare the response shape for docs and validation",
        ],
        project:
          "Build a simple in-memory notes API: GET /notes (returns all notes list), GET /notes/{id} (returns one note or 404), POST /notes (creates a note from JSON body, returns 201). Use a global list to store notes. Test all endpoints in Swagger UI.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-2-2",
        icon: "✏️",
        label: "PUT, PATCH & DELETE",
        level: "beginner",
        concept:
          "PUT replaces an entire resource with new data — the request body must contain the full resource. PATCH partially updates — only send the fields you want to change. DELETE removes a resource — typically returns 204 No Content (no body). These three verbs complete the CRUD triangle alongside GET and POST.",
        keyPoints: [
          "@app.put('/notes/{id}'): full replacement — all fields required",
          "@app.patch('/notes/{id}'): partial update — optional fields",
          "@app.delete('/notes/{id}', status_code=204): delete and return no content",
          "PATCH with Optional fields: class NoteUpdate(BaseModel): title: Optional[str] = None",
          "Return 404 if resource not found for PUT/PATCH/DELETE",
        ],
        project:
          "Complete the notes API: add PUT /notes/{id} (replace entire note), PATCH /notes/{id} (update only provided fields), DELETE /notes/{id} (remove and return 204). Handle missing note IDs with HTTPException(404). Test all edge cases in Swagger UI.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-2-3",
        icon: "🗺️",
        label: "Router Organization",
        level: "intermediate",
        concept:
          "APIRouter groups related routes into separate files and mounts them at a prefix. This keeps main.py clean — it only includes routers, it doesn't define routes directly. Routers can have their own tags (for docs grouping), prefix, and default response models. For AI projects: separate routers for agents, tools, conversations, and embeddings.",
        keyPoints: [
          "router = APIRouter(prefix='/notes', tags=['Notes'])",
          "@router.get('/'): path is relative to the prefix — becomes /notes/",
          "app.include_router(notes_router): register the router in main.py",
          "Multiple routers: include_router(agents_router), include_router(tools_router)",
          "Router-level dependencies: apply auth to all routes in a router at once",
        ],
        project:
          "Refactor your notes API into a proper router: create app/routers/notes.py with an APIRouter, move all routes there, import and include it in main.py. Add a second router for /tags (CRUD for note tags). Confirm /docs shows both routers with separate sections.",
        stack: ["FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-3",
    phaseNumber: 3,
    title: "Parameters",
    subtitle: "input handling",
    accent: "#F59E0B",
    bg: "#1f1a0d",
    nodes: [
      {
        id: "fa-3-1",
        icon: "🔗",
        label: "Path Parameters",
        level: "beginner",
        concept:
          "Path parameters are variable parts of the URL — declared with {name} in the route and as function arguments. FastAPI validates them automatically based on type annotations. If a path parameter is declared as int and receives 'abc', FastAPI returns a 422 automatically. Enums constrain path parameters to valid values.",
        keyPoints: [
          "@app.get('/items/{item_id}'): declare in the route path",
          "def get_item(item_id: int): FastAPI validates and converts to int",
          "Invalid type → automatic 422 with clear error message",
          "class ModelName(str, Enum): gpt4 = 'gpt-4' — constrain to valid values",
          "Multiple path params: /users/{user_id}/posts/{post_id}",
        ],
        project:
          "Add path parameters to your API: GET /agents/{agent_id} (must be a valid UUID), GET /models/{model_name} (must be one of: gpt-4, claude-3, gemini-pro via Enum). Test that invalid types return 422 with a clear error message.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-3-2",
        icon: "❓",
        label: "Query Parameters",
        level: "beginner",
        concept:
          "Query parameters appear after ? in the URL — ?page=2&limit=10. In FastAPI, function parameters that aren't path parameters are automatically treated as query parameters. They can be optional (with default values) or required (no default). FastAPI validates and converts types automatically. Use Query() for additional constraints like min/max values.",
        keyPoints: [
          "def list_items(page: int = 1, limit: int = 10): — optional with defaults",
          "def search(q: str): — required query param (no default)",
          "Query(ge=1, le=100): min/max constraints on the value",
          "Optional[str] = None: truly optional — None if not provided",
          "Bool query params: ?active=true — FastAPI parses 'true'/'false'/'1'/'0'",
        ],
        project:
          "Add rich query params to GET /notes: q (search text, optional), page (int, default=1, min=1), limit (int, default=10, max=100), created_after (date, optional). Filter the in-memory list based on these params. Test pagination and search in Swagger.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-3-3",
        icon: "📦",
        label: "Request Bodies",
        level: "beginner",
        concept:
          "Request bodies carry data in the HTTP request payload — used with POST, PUT, PATCH. Declare a Pydantic model as a function parameter — FastAPI reads the JSON body, validates it against the model, and passes it as a typed Python object. Multiple body params are allowed, as well as mixing body with path and query params.",
        keyPoints: [
          "class ItemCreate(BaseModel): name: str; price: float",
          "def create_item(item: ItemCreate): — body is the Pydantic model",
          "FastAPI reads Content-Type: application/json automatically",
          "Path + query + body: def update(id: int, q: str, item: ItemUpdate)",
          "Body(embed=True): wrap body in a named key {\"item\": {...}}",
        ],
        project:
          "Add request bodies to all write operations in your notes API. Create NoteCreate (required: title, content), NoteUpdate (all optional). Test that missing required fields return 422 with field-level errors. Test that extra fields are ignored (by default in Pydantic v2).",
        stack: ["FastAPI", "Pydantic"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-4",
    phaseNumber: 4,
    title: "Data Validation",
    subtitle: "pydantic",
    accent: "#8B5CF6",
    bg: "#150d2a",
    nodes: [
      {
        id: "fa-4-1",
        icon: "✅",
        label: "BaseModel & Field Validation",
        level: "beginner",
        concept:
          "Pydantic BaseModel is FastAPI's core validation engine. Define a class, annotate fields with types, and Pydantic validates automatically. Field() adds constraints: min/max length, numeric bounds, regex patterns, descriptions, and examples. Invalid data raises a ValidationError — FastAPI catches it and returns a 422 with details about every failed field.",
        keyPoints: [
          "class User(BaseModel): name: str; email: EmailStr; age: int",
          "Field(min_length=1, max_length=100, description='User name')",
          "EmailStr: validates email format — pip install pydantic[email]",
          "Field(ge=0, le=150): age must be 0–150 (ge=greater or equal)",
          "model.model_dump(): convert Pydantic model to dict",
        ],
        project:
          "Create a strict UserCreate schema for an AI platform: name (str, 1–50 chars), email (EmailStr), password (str, min 8 chars, regex for complexity), role (Enum: admin/user/viewer), api_key_limit (int, 1–100). Test that every invalid input case returns a 422 with the right field error.",
        stack: ["FastAPI", "Pydantic"],
        resources: [
          { title: "Pydantic V2 Docs", url: "https://docs.pydantic.dev/latest/" },
        ],
      },
      {
        id: "fa-4-2",
        icon: "🔧",
        label: "Nested Models & Custom Validators",
        level: "intermediate",
        concept:
          "Nested Pydantic models represent complex data structures — an agent with a list of tools, each tool with its own schema. Custom validators run arbitrary Python code for validation logic that Field() can't express: cross-field validation (end date after start date), database uniqueness checks, or business rule enforcement.",
        keyPoints: [
          "class Tool(BaseModel): name: str; description: str",
          "class Agent(BaseModel): name: str; tools: list[Tool]",
          "@field_validator('email') @classmethod def validate_email(cls, v): ...",
          "@model_validator(mode='after') — validate the whole model after all fields",
          "Cross-field: if self.end_date <= self.start_date: raise ValueError(...)",
        ],
        project:
          "Model an AI agent schema with nested Pydantic: AgentCreate has name, description, list[ToolConfig] (nested model with name + parameters dict), LLMConfig (nested: model, temperature, max_tokens). Add a custom validator that ensures temperature is 0.0–2.0 and model is a known value.",
        stack: ["Pydantic"],
        resources: [],
      },
      {
        id: "fa-4-3",
        icon: "📤",
        label: "Response Models & Serialization",
        level: "intermediate",
        concept:
          "Response models define exactly what the API returns — separate from the database model. This prevents accidentally returning sensitive fields (hashed passwords, internal IDs). response_model on a route tells FastAPI to validate and filter the output. model_config controls serialization behavior: alias generation, extra fields, and JSON serialization.",
        keyPoints: [
          "response_model=UserResponse: filter output to only declared fields",
          "UserResponse excludes password_hash, internal_flags from UserDB",
          "response_model_exclude_unset=True: exclude None fields from response",
          "model_config = ConfigDict(from_attributes=True): serialize from ORM objects",
          "model_serializer: custom JSON serialization logic for specific types",
        ],
        project:
          "Create separate schemas for your user: UserCreate (has password), UserInDB (has password_hash), UserResponse (no password, no hash — just id, name, email, role, created_at). Configure response_model on your POST /users endpoint. Test that the password never appears in the API response.",
        stack: ["FastAPI", "Pydantic"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-5",
    phaseNumber: 5,
    title: "API Development",
    subtitle: "crud & design",
    accent: "#34D399",
    bg: "#0a1f18",
    nodes: [
      {
        id: "fa-5-1",
        icon: "♻️",
        label: "CRUD Operations",
        level: "beginner",
        concept:
          "CRUD (Create, Read, Update, Delete) is the foundation of every REST API. Building clean CRUD requires: consistent patterns across all resources, correct HTTP methods and status codes, proper error handling for not-found and conflict cases, and separation of concerns between the route handler and business logic.",
        keyPoints: [
          "POST /resources → 201 Created with the new resource in the body",
          "GET /resources → 200 with paginated list",
          "GET /resources/{id} → 200 or 404",
          "PUT/PATCH /resources/{id} → 200 with updated resource or 404",
          "DELETE /resources/{id} → 204 No Content",
        ],
        project:
          "Build a complete CRUD API for AI conversations: Conversation (id, title, model, created_at) with full CRUD. Separate the business logic into a service layer (services/conversation_service.py). The router just calls the service — no DB logic in the router.",
        stack: ["FastAPI", "Python"],
        resources: [],
      },
      {
        id: "fa-5-2",
        icon: "🎯",
        label: "REST Best Practices",
        level: "intermediate",
        concept:
          "REST best practices ensure your API is predictable, versioned, and developer-friendly. Resource-oriented URLs use nouns not verbs. Consistent error responses let clients handle all errors uniformly. API versioning protects clients when you make breaking changes. Pagination is mandatory — never return all rows from a large table.",
        keyPoints: [
          "URL: /api/v1/agents — never /api/v1/getAgents or /api/v1/agent/create",
          "Versioning: /api/v1/ prefix — when v2 breaks v1, both run simultaneously",
          "Pagination: {data: [...], total: 100, page: 2, limit: 10, has_next: true}",
          "Error envelope: {detail: 'message', code: 'RESOURCE_NOT_FOUND', status: 404}",
          "HATEOAS: include links to related resources in responses",
        ],
        project:
          "Audit and refactor your conversations API: add /api/v1/ prefix via APIRouter, implement cursor-based pagination returning {data, next_cursor, has_more}, standardize all error responses to {detail, code, status}, add X-Request-ID header to every response.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-5-3",
        icon: "⚠️",
        label: "Error Handling & Versioning",
        level: "intermediate",
        concept:
          "Consistent error handling is what separates professional APIs from amateur ones. HTTPException is FastAPI's built-in mechanism. Custom exception handlers catch specific exception types globally and format them consistently. Versioning strategies: URL path (/v1/, /v2/), header (Accept: application/vnd.api+json;version=2), or query param (?version=2). URL path is the most explicit and widely used.",
        keyPoints: [
          "raise HTTPException(status_code=404, detail='Agent not found')",
          "@app.exception_handler(404): customize the 404 response globally",
          "Custom exception class: class AgentNotFoundError(Exception): pass",
          "@app.exception_handler(AgentNotFoundError): return JSONResponse(status_code=404, ...)",
          "APIRouter prefix='/api/v1': easy versioning — add v2 router alongside v1",
        ],
        project:
          "Build a robust error handling system: custom exceptions (ResourceNotFound, DuplicateResource, ValidationError, Unauthorized), a global exception handler for each, a consistent error response schema. Add a v2 router alongside v1 where one endpoint's response shape changed.",
        stack: ["FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-6",
    phaseNumber: 6,
    title: "Database Integration",
    subtitle: "sqlalchemy & postgres",
    accent: "#EC4899",
    bg: "#1f0d1a",
    nodes: [
      {
        id: "fa-6-1",
        icon: "🗄️",
        label: "PostgreSQL & Schema Design",
        level: "intermediate",
        concept:
          "PostgreSQL is the recommended database for FastAPI applications — robust, scalable, and supports JSON columns for flexible AI data. Schema design defines tables, relationships, and indexes upfront. For AI applications: think carefully about how to store agent configurations, conversation history, and tool definitions — these often have flexible schemas that benefit from JSONB columns.",
        keyPoints: [
          "asyncpg: async PostgreSQL driver for FastAPI — pip install asyncpg",
          "Relationships: one-to-many (user→conversations), many-to-many (agents↔tools)",
          "JSONB column: store flexible data (tool parameters, agent config) with indexing",
          "Indexes on foreign keys and frequently filtered columns — check with EXPLAIN ANALYZE",
          "Connection URL: postgresql+asyncpg://user:pass@localhost:5432/dbname",
        ],
        project:
          "Design and create a PostgreSQL schema for an AI agent platform: users, agents (with JSONB config), conversations (with agent_id FK), messages (with conversation_id FK, role enum, content). Write CREATE TABLE statements. Add indexes on all foreign keys.",
        stack: ["PostgreSQL", "asyncpg"],
        resources: [],
      },
      {
        id: "fa-6-2",
        icon: "🔗",
        label: "SQLAlchemy ORM",
        level: "intermediate",
        concept:
          "SQLAlchemy is Python's most powerful database toolkit. With FastAPI, use the async version: AsyncSession, async_engine, and async_sessionmaker. Define models as Python classes. The session is the unit of work — all DB operations go through it. Use FastAPI's Depends() to inject a DB session into route handlers without repeating connection logic.",
        keyPoints: [
          "from sqlalchemy.orm import DeclarativeBase, mapped_column, relationship",
          "class Agent(Base): __tablename__ = 'agents'; id: Mapped[int] = mapped_column(primary_key=True)",
          "AsyncSession: async with async_session() as session: await session.execute(...)",
          "Depends(get_db): inject the DB session into route handlers",
          "await session.commit() after writes; await session.refresh(obj) to get DB-generated values",
        ],
        project:
          "Implement SQLAlchemy models for your AI platform: Agent, Conversation, Message with proper relationships. Create an async database session factory. Write CRUD operations using AsyncSession: create agent, list agents for a user, get conversation with messages (eager loading).",
        stack: ["SQLAlchemy", "FastAPI", "asyncpg"],
        resources: [
          { title: "SQLAlchemy Async Docs", url: "https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html" },
        ],
      },
      {
        id: "fa-6-3",
        icon: "🔀",
        label: "Alembic Migrations",
        level: "intermediate",
        concept:
          "Alembic manages database schema changes as versioned migration files. Each migration has an upgrade (apply the change) and downgrade (revert it). Autogenerate compares your SQLAlchemy models to the current DB schema and writes the migration for you. Never manually edit a DB schema in production — always use migrations.",
        keyPoints: [
          "alembic init alembic: initialize migration environment",
          "alembic revision --autogenerate -m 'add agents table': generate migration",
          "alembic upgrade head: apply all pending migrations",
          "alembic downgrade -1: revert the last migration",
          "env.py: configure Alembic to use your async DB URL and model metadata",
        ],
        project:
          "Set up Alembic for your AI platform: initial migration for all 4 tables. Then add a status column to agents and a token_count to messages — generate and apply the migration. Practice rollback. Set up alembic upgrade head to run automatically on app startup.",
        stack: ["Alembic", "SQLAlchemy", "PostgreSQL"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-7",
    phaseNumber: 7,
    title: "Authentication & Authorization",
    subtitle: "security",
    accent: "#F97316",
    bg: "#1f1208",
    nodes: [
      {
        id: "fa-7-1",
        icon: "🔐",
        label: "Password Hashing & JWT",
        level: "intermediate",
        concept:
          "Password hashing transforms a plaintext password into an irreversible hash using bcrypt (via passlib). Even if your DB is stolen, attackers can't recover passwords. JWT (JSON Web Token) is a signed, self-contained token — the server issues it on login, the client sends it with every request. FastAPI's OAuth2PasswordBearer handles the extraction from the Authorization header automatically.",
        keyPoints: [
          "passlib CryptContext: hash = pwd_context.hash(password); pwd_context.verify(plain, hash)",
          "python-jose: jwt.encode({sub: user_id, exp: datetime + timedelta}, SECRET)",
          "OAuth2PasswordBearer(tokenUrl='/auth/token'): extracts Bearer token from header",
          "Depends(get_current_user): verify JWT and return the user in any route",
          "Access token (15 min) + refresh token (7 days) pattern",
        ],
        project:
          "Build complete JWT auth: POST /auth/register (hash password, store user), POST /auth/token (OAuth2PasswordRequestForm, verify password, return JWT), GET /users/me (Depends on verified JWT). The /users/me route must fail with 401 without a valid token.",
        stack: ["FastAPI", "passlib", "python-jose"],
        resources: [
          { title: "FastAPI Security Tutorial", url: "https://fastapi.tiangolo.com/tutorial/security/" },
        ],
      },
      {
        id: "fa-7-2",
        icon: "🎫",
        label: "OAuth2",
        level: "intermediate",
        concept:
          "OAuth2 is the protocol behind 'Login with Google/GitHub'. FastAPI has first-class OAuth2 support with OAuth2PasswordBearer (for password flow — API clients) and OAuth2AuthorizationCodeBearer (for authorization code flow — web apps). For AI platforms: let users authenticate via Google, then issue your own JWT for subsequent API calls.",
        keyPoints: [
          "OAuth2PasswordRequestForm: built-in form parser for username/password",
          "Authorization Code flow: redirect → user grants → code → exchange for token",
          "Authlib: Python OAuth client library — handles the OAuth dance for you",
          "Social login: Google/GitHub redirect → your callback endpoint → create/find user → issue JWT",
          "Scopes: request minimum permissions — openid email profile",
        ],
        project:
          "Add 'Login with GitHub' to your AI platform using Authlib: register a GitHub OAuth App, implement GET /auth/github (redirect to GitHub) and GET /auth/github/callback (exchange code for token, create user, return your own JWT). Test the full OAuth flow.",
        stack: ["FastAPI", "Authlib", "GitHub OAuth"],
        resources: [],
      },
      {
        id: "fa-7-3",
        icon: "🛡️",
        label: "Roles, Permissions & Protected Routes",
        level: "intermediate",
        concept:
          "Authorization controls what an authenticated user can do. Role-Based Access Control (RBAC) assigns roles to users; permissions are granted to roles. In FastAPI, authorization is enforced via dependencies — a require_role('admin') dependency raises 403 if the user doesn't have that role. Resource-level permissions ensure users can only modify their own data.",
        keyPoints: [
          "User.role: Enum(admin, editor, viewer) stored in DB",
          "def require_role(role): return Depends(lambda u=current_user: check_role(u, role))",
          "Route: @router.delete('/agents/{id}', dependencies=[Depends(require_admin)])",
          "Resource ownership: if agent.user_id != current_user.id: raise 403",
          "Scopes in JWT: {'sub': user_id, 'scopes': ['agents:read', 'agents:write']}",
        ],
        project:
          "Add RBAC to your AI platform: admin (full access), developer (own agents), viewer (read only). Protect all write endpoints with role checks. Ensure developers can only modify their own agents (403 if they try another user's). Add an admin-only GET /admin/users endpoint.",
        stack: ["FastAPI", "SQLAlchemy"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-8",
    phaseNumber: 8,
    title: "Middleware & Dependencies",
    subtitle: "shared logic",
    accent: "#06B6D4",
    bg: "#0a1f22",
    nodes: [
      {
        id: "fa-8-1",
        icon: "🛤️",
        label: "Logging & Auth Middleware",
        level: "intermediate",
        concept:
          "Middleware runs on every request and response — wrapping the entire application. It's the right place for cross-cutting concerns: logging (request method, path, duration, status code), authentication (check token before routing), CORS headers, and request ID injection. Keep middleware lightweight — heavy logic belongs in dependencies.",
        keyPoints: [
          "@app.middleware('http'): async def middleware(request, call_next): ...",
          "response = await call_next(request): pass to the next handler",
          "Request ID: generate uuid, set on request.state, include in response headers",
          "Timing: time.time() before and after call_next — log the duration",
          "Starlette BaseHTTPMiddleware: class-based middleware for more complex logic",
        ],
        project:
          "Add 3 middleware to your AI platform: (1) structured JSON logger (method, path, status, duration, request_id), (2) X-Request-ID header on all responses, (3) a request size limit (reject bodies over 10MB). Confirm every request logs correctly in JSON format.",
        stack: ["FastAPI", "Starlette"],
        resources: [],
      },
      {
        id: "fa-8-2",
        icon: "⏱️",
        label: "Rate Limiting Middleware",
        level: "intermediate",
        concept:
          "Rate limiting prevents API abuse by capping requests per user per time window. Implement it as middleware using Redis: on each request, INCR a counter keyed by user IP or API key, set EXPIRE on first increment, return 429 if over the limit. For AI platforms: different rate limits per tier (free=10 req/min, pro=100 req/min, enterprise=unlimited).",
        keyPoints: [
          "Redis key: f'rate:{user_id}:{current_minute}' — auto-expires after 60s",
          "r.incr(key): atomic increment, returns new count",
          "Return 429 with Retry-After header: time until the window resets",
          "Tiered limits: get user's plan from DB or JWT claims, apply appropriate limit",
          "slowapi: FastAPI rate limiting library — decorator-based",
        ],
        project:
          "Implement tiered rate limiting: 10 req/min for anonymous, 60 req/min for free users, 500 req/min for pro. Use Redis for counters. Include X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers in every response. Test that 429 is returned with the correct Retry-After header.",
        stack: ["FastAPI", "Redis", "slowapi"],
        resources: [],
      },
      {
        id: "fa-8-3",
        icon: "💉",
        label: "Dependency Injection",
        level: "intermediate",
        concept:
          "FastAPI's Depends() system is one of its most powerful features. Dependencies are callables that run before route handlers — they can yield resources (DB sessions), perform validation (verify JWT), or return shared objects (current user, settings). Dependencies can depend on other dependencies — forming a tree. Sub-dependencies are cached per request by default.",
        keyPoints: [
          "def get_db(): yield AsyncSession — inject DB session, close on done",
          "Depends(get_db): inject into any route or other dependency",
          "Depends(get_current_user): authentication as a dependency",
          "Security(OAuth2PasswordBearer(...)): combines Depends with OpenAPI security docs",
          "Dependencies are cached per request — get_current_user called once even if used 3 times",
        ],
        project:
          "Build a dependency tree for your AI platform: get_db (yields DB session), get_settings (returns config), get_current_user (uses get_db + verifies JWT), require_admin (uses get_current_user + checks role). Wire them so every protected route just adds Depends(require_admin) and gets the DB, user, and role check for free.",
        stack: ["FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-9",
    phaseNumber: 9,
    title: "File Handling",
    subtitle: "uploads & storage",
    accent: "#EF4444",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "fa-9-1",
        icon: "📤",
        label: "File Uploads",
        level: "intermediate",
        concept:
          "FastAPI handles file uploads via UploadFile — it's a file-like object with the filename, content_type, and a read() method. Single uploads take one UploadFile parameter; multiple uploads take List[UploadFile]. Validate file types by checking content_type — never trust the extension. Size limits prevent abuse — reject files over a configured max size.",
        keyPoints: [
          "async def upload(file: UploadFile = File(...)): — single file upload",
          "async def upload(files: List[UploadFile] = File(...)): — multiple files",
          "await file.read(): read entire file into memory (careful with large files)",
          "Chunk reading: while chunk := await file.read(1024): — streaming read",
          "Validate: if file.content_type not in ['application/pdf', 'text/plain']: raise 400",
        ],
        project:
          "Build a document upload endpoint for your AI platform: POST /documents accepts PDF and TXT files (reject others with 400), validates size < 10MB, saves the file, returns a document ID. Add a multiple-file endpoint POST /documents/batch that accepts up to 10 files at once.",
        stack: ["FastAPI", "Python"],
        resources: [],
      },
      {
        id: "fa-9-2",
        icon: "☁️",
        label: "Local & Cloud Storage",
        level: "intermediate",
        concept:
          "Local storage saves files on the server's filesystem — simple but doesn't scale (files are lost when the server restarts or is replaced). Cloud storage (S3, GCS, Azure Blob) is durable, scalable, and globally accessible. The pattern for cloud uploads: client requests a presigned URL from your API, client uploads directly to S3 (bypassing your server), client notifies API of completion.",
        keyPoints: [
          "Local: aiofiles.open('uploads/file.pdf', 'wb') as f: await f.write(data)",
          "boto3 / aiobotocore: async S3 client for Python",
          "s3.upload_fileobj(file.file, bucket, key): upload directly from UploadFile",
          "Presigned URL: s3.generate_presigned_url('put_object', ...) — client uploads directly",
          "Store S3 key in DB, not the URL (URLs expire; keys don't)",
        ],
        project:
          "Switch your document storage from local filesystem to AWS S3: generate a presigned PUT URL for client-side upload, store the S3 key in PostgreSQL, generate a time-limited presigned GET URL when a client requests the document. Files never pass through your server.",
        stack: ["AWS S3", "boto3", "FastAPI"],
        resources: [],
      },
      {
        id: "fa-9-3",
        icon: "⚙️",
        label: "PDF, Image & CSV Processing",
        level: "intermediate",
        concept:
          "AI applications frequently process uploaded documents: extract text from PDFs, resize and validate images, parse CSV datasets. These operations are CPU-heavy — run them in background tasks or a thread pool to avoid blocking the async event loop. For RAG systems, PDF text extraction is the first step in the document ingestion pipeline.",
        keyPoints: [
          "PyMuPDF / pdfplumber: extract text and structure from PDFs",
          "Pillow: resize, validate, and convert images",
          "pandas: parse and validate CSV uploads",
          "asyncio.to_thread(cpu_bound_function): run CPU work without blocking event loop",
          "Background task: trigger processing after upload, return immediately",
        ],
        project:
          "Build a document ingestion pipeline: upload PDF → save to S3 → trigger background task → extract text with pdfplumber → split into chunks → store chunks in PostgreSQL → return document status. Add GET /documents/{id}/status showing processing state (uploaded, processing, ready, failed).",
        stack: ["pdfplumber", "FastAPI", "asyncio", "PostgreSQL"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-10",
    phaseNumber: 10,
    title: "Background Tasks",
    subtitle: "async processing",
    accent: "#A78BFA",
    bg: "#140d2a",
    nodes: [
      {
        id: "fa-10-1",
        icon: "⚡",
        label: "Async & Background Tasks",
        level: "intermediate",
        concept:
          "FastAPI's BackgroundTasks lets you run work after returning the response — perfect for sending emails, triggering processing, or logging analytics without making the client wait. The task runs in the same process as the main app. For truly heavy workloads (processing 100MB PDFs, training loops), use a proper task queue (Celery). BackgroundTasks is for lightweight, fire-and-forget operations.",
        keyPoints: [
          "background_tasks: BackgroundTasks parameter in route function",
          "background_tasks.add_task(send_email, user.email, 'Welcome!'): schedule task",
          "Task runs after response is sent — client doesn't wait",
          "No retry on failure — if you need retries, use Celery",
          "Access to DB session in background task: create a new session (don't reuse request's)",
        ],
        project:
          "Add background tasks to your AI platform: after a user registers, send a welcome email in a background task. After a document is uploaded, trigger extraction in a background task. After an agent run completes, log analytics. Test that the API response is immediate even if the background task is slow.",
        stack: ["FastAPI"],
        resources: [],
      },
      {
        id: "fa-10-2",
        icon: "📬",
        label: "Celery & Redis Queue",
        level: "advanced",
        concept:
          "Celery is a distributed task queue for production-grade async processing. Tasks are pushed to a broker (Redis or RabbitMQ) and executed by worker processes — completely separate from your API server. This means: the API server is always fast (just enqueues tasks), workers can run on different machines, and failed tasks can be retried automatically.",
        keyPoints: [
          "celery -A tasks worker --loglevel=info: start a Celery worker",
          "@celery.task: define a task function",
          "task.delay(arg1, arg2): enqueue a task asynchronously",
          "task.apply_async(args, countdown=60): run after 60 seconds",
          "Celery Beat: scheduler for periodic tasks (run every hour)",
        ],
        project:
          "Replace your document processing background task with Celery: define a process_document.delay(doc_id) task, configure Redis as the broker, run a Celery worker. Add retry logic: @celery.task(max_retries=3, default_retry_delay=30). Monitor tasks in Flower (Celery monitoring UI).",
        stack: ["Celery", "Redis", "FastAPI"],
        resources: [
          { title: "Celery Docs", url: "https://docs.celeryq.dev/en/stable/" },
        ],
      },
      {
        id: "fa-10-3",
        icon: "🐰",
        label: "RabbitMQ & Task Scheduling",
        level: "advanced",
        concept:
          "RabbitMQ as a Celery broker offers more routing flexibility than Redis — topic exchanges, priority queues, and dead letter queues. Priority queues ensure paid users' tasks execute before free users'. Dead letter queues catch failed tasks for inspection. Celery Beat handles periodic scheduling: run model evaluations at midnight, clean up expired sessions every hour, send weekly reports on Mondays.",
        keyPoints: [
          "Priority queue: @celery.task with queue='high_priority'",
          "route_task: map task names to specific queues in CELERY_TASK_ROUTES",
          "celery_beat_schedule: {'task': 'tasks.run_evals', 'schedule': crontab(hour=0)}",
          "Dead letter queue: tasks that exceed max_retries go to a DLQ for inspection",
          "Task chaining: (extract_text.s(doc_id) | chunk_text.s() | embed_chunks.s()).delay()",
        ],
        project:
          "Build a scheduled AI pipeline: nightly at 2am, run a Celery Beat task that fetches all active users, runs model evaluation for each agent, stores results, and emails a summary. Use RabbitMQ as the broker with priority queues — enterprise users get higher priority processing.",
        stack: ["Celery", "RabbitMQ", "Celery Beat"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-11",
    phaseNumber: 11,
    title: "Caching",
    subtitle: "redis",
    accent: "#14B8A6",
    bg: "#0a1f1e",
    nodes: [
      {
        id: "fa-11-1",
        icon: "🔴",
        label: "Redis Cache Basics",
        level: "intermediate",
        concept:
          "Redis stores data in memory — reads are microseconds vs milliseconds for PostgreSQL. For AI APIs, caching is essential: LLM responses can take 3–10 seconds — caching identical prompts saves cost and latency dramatically. The cache-aside pattern: check cache first; on miss, fetch from DB/LLM, store in cache, return. Always set TTL to prevent stale data.",
        keyPoints: [
          "pip install redis[asyncio]: async Redis client for FastAPI",
          "await redis.set('key', json.dumps(value), ex=300): store with 5-min TTL",
          "cached = await redis.get('key'): returns bytes or None",
          "Cache key design: 'agent:{id}:config' — hierarchical for easy invalidation",
          "Redis SCAN: find and delete all keys matching a pattern",
        ],
        project:
          "Add Redis caching to your AI platform: cache agent configurations for 5 minutes (invalidate on update), cache user profiles for 60 seconds, cache the list of available models for 1 hour. Measure response time with and without cache using curl -w '%{time_total}'.",
        stack: ["Redis", "FastAPI"],
        resources: [],
      },
      {
        id: "fa-11-2",
        icon: "💾",
        label: "API Caching & Session Storage",
        level: "intermediate",
        concept:
          "HTTP caching headers let browsers and CDNs cache API responses without hitting your server. Cache-Control: max-age=60 tells browsers to use the cached response for 60 seconds. ETag is a hash of the response — the client sends If-None-Match and gets a 304 Not Modified if unchanged. Redis also serves as a session store: store session data keyed by session ID in a cookie.",
        keyPoints: [
          "response.headers['Cache-Control'] = 'max-age=60, public'",
          "ETag: hashlib.md5(response_body).hexdigest() — compare with If-None-Match header",
          "Session: store {user_id, preferences, ...} in Redis under a UUID session key",
          "httpx-cache / fastapi-cache2: decorator-based caching for FastAPI",
          "@cache(expire=300): cache a route's response for 5 minutes with one decorator",
        ],
        project:
          "Install fastapi-cache2. Add @cache(expire=60) to your GET /agents list endpoint. Add ETag support to GET /agents/{id} — return 304 if the agent hasn't changed. Implement Redis-backed sessions for non-JWT auth scenarios (admin panel).",
        stack: ["fastapi-cache2", "Redis", "FastAPI"],
        resources: [],
      },
      {
        id: "fa-11-3",
        icon: "🎯",
        label: "Cache Invalidation & Strategies",
        level: "advanced",
        concept:
          "Cache invalidation — knowing when to expire cached data — is the hardest part of caching. Strategies: TTL-based (expire after N seconds, simple but may serve stale data), event-based (invalidate on write, always fresh but complex), write-through (update cache on every DB write, most consistent). For AI platforms: when a user updates an agent, immediately invalidate the agent's cache entry.",
        keyPoints: [
          "Pattern delete: SCAN + DEL keys matching 'agent:{id}:*' on agent update",
          "Write-through: update DB and cache atomically in the service layer",
          "Cache stampede: many requests hit expired cache simultaneously — use locks",
          "Redis SETNX (set if not exists): distributed lock to prevent stampede",
          "Vary header: cache different responses for different Accept-Language values",
        ],
        project:
          "Implement write-through cache for agents: on create/update/delete, update both PostgreSQL and Redis atomically. Add a distributed lock (Redis SETNX) to prevent stampede on popular cache misses. Add a GET /admin/cache/stats endpoint showing cache hit rate (instrument with Redis INFO).",
        stack: ["Redis", "FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-12",
    phaseNumber: 12,
    title: "Real-Time Features",
    subtitle: "websockets & streaming",
    accent: "#0EA5E9",
    bg: "#0a1929",
    nodes: [
      {
        id: "fa-12-1",
        icon: "🔌",
        label: "WebSockets",
        level: "intermediate",
        concept:
          "WebSockets maintain a persistent bidirectional connection — unlike HTTP where the client must initiate every exchange. FastAPI has native WebSocket support. The connection stays open; both server and client can send messages at any time. Essential for: real-time agent outputs, live agent status updates, collaborative editing, and chat applications.",
        keyPoints: [
          "@app.websocket('/ws/{client_id}'): define a WebSocket endpoint",
          "await websocket.accept(): complete the WebSocket handshake",
          "await websocket.receive_text(): wait for a message from client",
          "await websocket.send_text(message): push a message to the client",
          "ConnectionManager: class to track active connections and broadcast messages",
        ],
        project:
          "Build a WebSocket endpoint for live agent execution: client connects via WS, sends a prompt, server streams the agent's step-by-step thinking (tool calls, intermediate results, final answer) as JSON messages. Client disconnects when it receives {type: 'done'}.",
        stack: ["FastAPI", "WebSockets"],
        resources: [],
      },
      {
        id: "fa-12-2",
        icon: "💬",
        label: "Chat Systems & Live Updates",
        level: "intermediate",
        concept:
          "Real-time chat requires: a WebSocket connection per user, a connection manager tracking all active connections, and broadcast logic to push new messages to all participants. Redis Pub/Sub enables broadcasting across multiple server instances — one server publishes a message, all servers receive and forward to their connected clients.",
        keyPoints: [
          "ConnectionManager: dict mapping user_id → WebSocket connection",
          "broadcast(message): iterate all connections and send",
          "Redis Pub/Sub: subscribe('chat:room:123'), publish('chat:room:123', msg)",
          "Reconnection: client should auto-reconnect on disconnect with exponential backoff",
          "WebSocket auth: send JWT in the first message or as a query param in the WS URL",
        ],
        project:
          "Build a multi-user agent collaboration room: multiple users connect to /ws/rooms/{room_id}, see each other's messages in real-time, see when a user joins/leaves. Use Redis Pub/Sub so it works across multiple FastAPI instances. Add WebSocket authentication via JWT query param.",
        stack: ["FastAPI", "Redis Pub/Sub", "WebSockets"],
        resources: [],
      },
      {
        id: "fa-12-3",
        icon: "📡",
        label: "SSE & Streaming Responses",
        level: "intermediate",
        concept:
          "Server-Sent Events (SSE) is a simpler alternative to WebSockets for one-directional streaming — perfect for LLM token streaming where the server pushes data and the client only listens. StreamingResponse in FastAPI yields chunks as they're generated. This is how ChatGPT's streaming works: each token is sent as an SSE event as soon as the model generates it.",
        keyPoints: [
          "StreamingResponse(generator(), media_type='text/event-stream')",
          "SSE format: 'data: {json}\\n\\n' — two newlines terminate each event",
          "async def generate(): yield 'data: token\\n\\n' — async generator",
          "EventSource in browser: const es = new EventSource('/stream') — built-in API",
          "LLM streaming: stream=True in OpenAI/Anthropic client → yield each chunk",
        ],
        project:
          "Build a streaming chat endpoint: POST /chat/stream starts an LLM call with streaming enabled, yields each token as an SSE event (data: {token: '...'}) as the model generates it. Send a final event (data: {done: true}). Test with curl -N to see tokens arrive in real-time.",
        stack: ["FastAPI", "StreamingResponse", "OpenAI API"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-13",
    phaseNumber: 13,
    title: "Testing",
    subtitle: "pytest & testclient",
    accent: "#84CC16",
    bg: "#111a0a",
    nodes: [
      {
        id: "fa-13-1",
        icon: "🔬",
        label: "Unit & Endpoint Testing",
        level: "intermediate",
        concept:
          "FastAPI's TestClient (from Starlette) lets you make HTTP requests to your app in tests without starting a server. It's synchronous — no async needed in tests. Unit tests test individual functions in isolation. Endpoint tests test full request/response cycles including validation, auth, and response shapes.",
        keyPoints: [
          "from fastapi.testclient import TestClient; client = TestClient(app)",
          "client.get('/items/1'): make a request — returns a response object",
          "assert response.status_code == 200; assert response.json() == {...}",
          "Override dependencies: app.dependency_overrides[get_db] = get_test_db",
          "httpx.AsyncClient: for testing async routes directly",
        ],
        project:
          "Write endpoint tests for your AI platform: test successful agent creation (201 + correct body), test validation failure (422 + field errors), test auth required (401 without token), test admin-only access (403 for regular user). Aim for every status code your API can return.",
        stack: ["pytest", "FastAPI TestClient"],
        resources: [],
      },
      {
        id: "fa-13-2",
        icon: "🔗",
        label: "Integration & Database Testing",
        level: "intermediate",
        concept:
          "Integration tests test multiple layers together — your route, service, ORM, and database. Use a separate test database (PostgreSQL or SQLite) that's wiped before each test. pytest fixtures create and tear down test data. The key pattern: use transactional fixtures that roll back after each test so tests are isolated.",
        keyPoints: [
          "conftest.py: define shared fixtures at the test directory level",
          "@pytest.fixture: db_session, test_client, sample_user, sample_agent",
          "Test database: separate DB, run alembic upgrade head before tests",
          "Transactional rollback: wrap each test in a transaction, rollback after — fast and isolated",
          "pytest-asyncio: for testing async FastAPI code with async tests",
        ],
        project:
          "Write integration tests for agent CRUD: create a user fixture, create an agent fixture (depends on user), test the full lifecycle (create, read, update, delete), test cross-user isolation (user A can't modify user B's agent). Use a real PostgreSQL test DB with rollback per test.",
        stack: ["pytest", "pytest-asyncio", "PostgreSQL"],
        resources: [],
      },
      {
        id: "fa-13-3",
        icon: "✅",
        label: "API Testing & Coverage",
        level: "intermediate",
        concept:
          "Complete API test coverage tests all paths through your code: happy path, all error cases, edge cases, and security scenarios. pytest-cov measures which lines are covered. For AI APIs: mock LLM calls in tests (they're slow and cost money) using unittest.mock or respx. Add a GitHub Actions workflow that runs tests on every PR.",
        keyPoints: [
          "pytest --cov=app --cov-report=html: generate coverage report",
          "unittest.mock.patch('app.services.llm_service.call_llm'): mock LLM calls",
          "respx: mock httpx requests — for mocking external API calls",
          "Parametrize: @pytest.mark.parametrize('input, expected', [...])",
          "pytest -x: stop on first failure — faster feedback during development",
        ],
        project:
          "Achieve 80%+ test coverage on your AI platform. Mock all LLM calls with canned responses. Write parametrized tests for validation edge cases. Add a GitHub Actions workflow that runs pytest, generates coverage, and fails the PR if coverage drops below 80%.",
        stack: ["pytest", "pytest-cov", "respx", "GitHub Actions"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-14",
    phaseNumber: 14,
    title: "Security",
    subtitle: "protect your api",
    accent: "#D97706",
    bg: "#1f190a",
    nodes: [
      {
        id: "fa-14-1",
        icon: "🔒",
        label: "CORS, CSRF & HTTPS",
        level: "intermediate",
        concept:
          "CORS (Cross-Origin Resource Sharing) allows browsers to call your API from a different domain. Without it, browser requests from your frontend to your API are blocked. CSRF (Cross-Site Request Forgery) tricks a user's browser into making unwanted requests. HTTPS encrypts all traffic — mandatory in production. FastAPI's CORSMiddleware handles CORS configuration.",
        keyPoints: [
          "CORSMiddleware: allow_origins, allow_methods, allow_headers, allow_credentials",
          "allow_origins=['https://yourfrontend.com']: never use ['*'] in production with credentials",
          "CSRF protection: SameSite=Strict cookies or CSRF tokens for form submissions",
          "HTTPS: obtain Let's Encrypt certificate via certbot or Nginx proxy",
          "HSTS header: Strict-Transport-Security: max-age=31536000 — enforce HTTPS for 1 year",
        ],
        project:
          "Lock down your AI platform's security: configure CORSMiddleware for your frontend domain only, add HSTS and other security headers (X-Content-Type-Options, X-Frame-Options) via middleware, configure HTTPS with a self-signed cert for local testing. Verify CORS works from your frontend.",
        stack: ["FastAPI", "Nginx"],
        resources: [],
      },
      {
        id: "fa-14-2",
        icon: "🛡️",
        label: "Input Validation & SQL Injection",
        level: "intermediate",
        concept:
          "SQL injection is the #1 web vulnerability — attackers inject SQL code through user input. SQLAlchemy's parameterized queries prevent it automatically (never use string formatting in SQL). Input validation rejects malformed data before it reaches your business logic. For AI platforms: sanitize prompts, validate file types, and limit input sizes to prevent prompt injection.",
        keyPoints: [
          "Never: f'SELECT * FROM users WHERE name = {user_input}' — SQL injection!",
          "Always: session.execute(select(User).where(User.name == name)) — parameterized",
          "Pydantic: validates all input shapes before reaching service layer",
          "HTML escaping: sanitize any user content that will be rendered in HTML",
          "Prompt injection: validate and sanitize user inputs before passing to LLMs",
        ],
        project:
          "Security audit your AI platform: review every DB query for potential injection (should all use SQLAlchemy ORM). Add prompt injection protection: reject user inputs containing 'ignore previous instructions' patterns. Add a maximum input length validation to all text fields.",
        stack: ["FastAPI", "SQLAlchemy"],
        resources: [
          { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-10/" },
        ],
      },
      {
        id: "fa-14-3",
        icon: "⚔️",
        label: "Rate Limiting & API Security",
        level: "intermediate",
        concept:
          "Beyond rate limiting, a production AI API needs: API key rotation (invalidate compromised keys instantly), request signing (HMAC to verify request integrity), IP allowlisting for admin endpoints, secret scanning (prevent leaked keys from being used), and anomaly detection (flag unusual usage patterns). slowapi provides decorator-based rate limiting for FastAPI.",
        keyPoints: [
          "API key hashing: store SHA256(key) in DB — verify by hashing incoming key",
          "Key rotation: allow multiple active keys per user for zero-downtime rotation",
          "IP allowlist: admin endpoints only accessible from known IPs",
          "slowapi: @limiter.limit('10/minute'): per-route rate limiting",
          "Audit log: record every sensitive action (key created, permissions changed, data deleted)",
        ],
        project:
          "Harden your AI platform: implement API key authentication as an alternative to JWT (for server-to-server calls), add an audit log table recording every API key creation and deletion, add IP-based allowlisting for the /admin/* routes, and set up anomaly detection that flags users exceeding 10× their typical usage.",
        stack: ["FastAPI", "Redis", "slowapi"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-15",
    phaseNumber: 15,
    title: "Monitoring & Logging",
    subtitle: "observability",
    accent: "#60A5FA",
    bg: "#0d1929",
    nodes: [
      {
        id: "fa-15-1",
        icon: "📋",
        label: "Structured Logging",
        level: "intermediate",
        concept:
          "Structured logging outputs JSON instead of plain text — every log entry has queryable fields: timestamp, level, request_id, user_id, endpoint, duration, error. This makes logs searchable in tools like Datadog, Elasticsearch, or CloudWatch. structlog is the standard library for structured logging in Python. Always include request_id to trace all logs for one request.",
        keyPoints: [
          "structlog.configure(): set up JSON rendering",
          "log = structlog.get_logger()",
          "log.info('request_complete', path='/agents', duration_ms=23, user_id=42)",
          "bind_contextvars(request_id=uuid): add fields to all subsequent log calls",
          "Log levels: DEBUG (dev), INFO (normal ops), WARNING (unexpected), ERROR (failures)",
        ],
        project:
          "Replace print() and basic logging with structlog across your entire API: every request logs method, path, status, duration, request_id, and user_id. Every error logs the full exception. Configure structlog to output JSON in production and colorful text in development.",
        stack: ["structlog", "FastAPI"],
        resources: [],
      },
      {
        id: "fa-15-2",
        icon: "📊",
        label: "Metrics & Health Checks",
        level: "intermediate",
        concept:
          "Metrics are numeric measurements over time: request count, error rate, p95 latency, active WebSocket connections, LLM tokens consumed. Prometheus scrapes your /metrics endpoint and stores time-series data. Grafana visualizes it. Health checks answer 'is the API healthy?': GET /health returns 200 if the DB, Redis, and LLM API are reachable.",
        keyPoints: [
          "prometheus-fastapi-instrumentator: auto-instruments all routes with request metrics",
          "Counter, Histogram, Gauge: Prometheus metric types",
          "GET /health: check DB connection, Redis ping, external API reachable",
          "GET /ready: more detailed — are migrations applied? Is the model loaded?",
          "Four golden signals: latency, traffic (req/s), errors (% 5xx), saturation (CPU/memory)",
        ],
        project:
          "Add full observability to your AI platform: prometheus-fastapi-instrumentator for request metrics, custom Counters for LLM token usage and agent runs, a /health endpoint checking DB and Redis, a Grafana dashboard showing the 4 golden signals, and an alert when error rate exceeds 1%.",
        stack: ["Prometheus", "Grafana", "FastAPI"],
        resources: [],
      },
      {
        id: "fa-15-3",
        icon: "🔭",
        label: "Distributed Tracing",
        level: "advanced",
        concept:
          "Distributed tracing follows a single request through all components: API → service → DB query → LLM call → response. Each hop is a span; all spans share a trace ID. OpenTelemetry is the standard instrumentation library — it works with Jaeger, Tempo, or Datadog. For AI agents: trace the full agent execution — each tool call is a span, showing exactly where time is spent.",
        keyPoints: [
          "OpenTelemetry SDK: auto-instrument FastAPI, SQLAlchemy, httpx requests",
          "Span: one unit of work — name, start time, duration, attributes",
          "Trace: collection of spans for one request, linked by trace ID",
          "Jaeger: open-source distributed tracing UI — run locally with Docker",
          "Trace LLM calls: record model, tokens, latency as span attributes",
        ],
        project:
          "Instrument your AI platform with OpenTelemetry: every agent execution creates a trace with spans for each tool call. Record the LLM model, input/output token count, and latency on each span. View traces in Jaeger. Add a span for the PostgreSQL query that loads the agent configuration.",
        stack: ["OpenTelemetry", "Jaeger", "FastAPI"],
        resources: [
          { title: "OpenTelemetry Python", url: "https://opentelemetry.io/docs/languages/python/" },
        ],
      },
    ],
  },
  {
    id: "fa-16",
    phaseNumber: 16,
    title: "Deployment",
    subtitle: "docker & cloud",
    accent: "#7C3AED",
    bg: "#160d2a",
    nodes: [
      {
        id: "fa-16-1",
        icon: "🐳",
        label: "Docker & Docker Compose",
        level: "intermediate",
        concept:
          "Docker packages your FastAPI app and all dependencies into a container that runs identically everywhere. Multi-stage builds reduce image size: build stage installs everything, final stage copies only what's needed. Docker Compose orchestrates your full stack locally: FastAPI app + PostgreSQL + Redis + Celery worker — one docker compose up starts everything.",
        keyPoints: [
          "FROM python:3.12-slim: small base image",
          "Multi-stage: builder stage installs deps, final stage copies from builder",
          "docker compose services: api, db, redis, worker, flower",
          "healthcheck: test: ['CMD', 'curl', '-f', 'http://localhost:8000/health']",
          ".env file: docker compose reads environment variables from .env",
        ],
        project:
          "Write a production Dockerfile for your FastAPI app: multi-stage build, non-root user, health check, minimal final image. Write docker-compose.yml with all services (FastAPI, PostgreSQL, Redis, Celery worker). A single docker compose up should give you a fully working local development environment.",
        stack: ["Docker", "Docker Compose"],
        resources: [],
      },
      {
        id: "fa-16-2",
        icon: "🌐",
        label: "Uvicorn, Gunicorn & Nginx",
        level: "intermediate",
        concept:
          "uvicorn is the ASGI server that runs FastAPI — fast, async, production-ready. For multi-worker deployment, Gunicorn manages multiple uvicorn workers (one per CPU core). Nginx sits in front as a reverse proxy: handles SSL termination, static file serving, load balancing, and proxies /api/ requests to Gunicorn. This stack handles tens of thousands of concurrent requests.",
        keyPoints: [
          "uvicorn main:app --host 0.0.0.0 --port 8000: production launch",
          "gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app: 4 async workers",
          "Workers = (2 × CPU cores) + 1 for CPU-bound; unlimited for I/O-bound async",
          "Nginx proxy_pass http://localhost:8000: reverse proxy to Gunicorn",
          "Nginx: ssl_certificate, ssl_certificate_key, add_header HSTS",
        ],
        project:
          "Configure production serving: Gunicorn with 4 uvicorn workers in Docker, Nginx reverse proxy with SSL (self-signed for local), proper worker count based on your machine's CPU cores. Load test with locust to verify all 4 workers handle concurrent requests.",
        stack: ["uvicorn", "Gunicorn", "Nginx", "Docker"],
        resources: [],
      },
      {
        id: "fa-16-3",
        icon: "☁️",
        label: "Cloud Deployment",
        level: "intermediate",
        concept:
          "FastAPI deploys to any cloud: Render/Railway (PaaS — connect GitHub, auto-deploy, simplest), AWS ECS/EKS (containers at scale), AWS Lambda + Mangum (serverless), or a simple EC2 with Docker. For AI platforms, managed services reduce operational burden: RDS for PostgreSQL, ElastiCache for Redis, ECS for containers. CI/CD: GitHub Actions builds the Docker image, pushes to ECR, and triggers a deployment on every merge to main.",
        keyPoints: [
          "Render/Railway: connect GitHub repo, set env vars, auto-deploy on push — ideal for starting",
          "AWS ECS: run Docker containers on managed infrastructure",
          "Mangum: adapter that runs FastAPI on AWS Lambda (serverless)",
          "Environment variables: never hardcode in Dockerfile — inject at runtime",
          "Zero-downtime deploy: rolling update or blue/green deployment strategy",
        ],
        project:
          "Deploy your full AI platform to Render: FastAPI app, Render PostgreSQL, Render Redis. Set all environment variables in Render's dashboard. Set up auto-deploy from GitHub main branch. Add a GitHub Actions workflow that runs tests before every deployment — deployment is blocked if tests fail.",
        stack: ["Render", "GitHub Actions", "Docker"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-17",
    phaseNumber: 17,
    title: "FastAPI for AI Apps",
    subtitle: "llm integration",
    accent: "#10B981",
    bg: "#0a1f18",
    nodes: [
      {
        id: "fa-17-1",
        icon: "🤖",
        label: "LLM API Integration",
        level: "intermediate",
        concept:
          "FastAPI is the ideal backend for AI applications — async-first for concurrent LLM calls, streaming responses for token-by-token output, and Pydantic for validating LLM structured outputs. Integrate OpenAI, Anthropic, and Gemini through their Python SDKs. Abstract the provider behind a service layer — swap models without changing your API.",
        keyPoints: [
          "AsyncOpenAI / AsyncAnthropic: async clients for non-blocking LLM calls",
          "Service abstraction: LLMService with call_llm(model, messages) → str",
          "Provider selection: read model from request, route to correct client",
          "Cost tracking: log input/output tokens per request to DB for billing",
          "Fallback: if OpenAI fails, retry with Anthropic — circuit breaker pattern",
        ],
        project:
          "Build an LLM proxy API: POST /chat accepts {model, messages}, routes to the correct provider (OpenAI/Anthropic/Gemini based on model name), returns the response. Track token usage per user per day in PostgreSQL. Add a usage limit that returns 429 when a user exceeds their daily token budget.",
        stack: ["FastAPI", "OpenAI SDK", "Anthropic SDK"],
        resources: [],
      },
      {
        id: "fa-17-2",
        icon: "⚡",
        label: "Streaming Chat & Tool Calling",
        level: "advanced",
        concept:
          "Streaming delivers LLM tokens to the client as they're generated — no waiting for the full response. Tool/function calling lets the LLM request external data during generation — search the web, query your DB, call an API. FastAPI handles both elegantly: StreamingResponse for streaming, and a tool execution loop for function calling.",
        keyPoints: [
          "stream=True: enable streaming in OpenAI/Anthropic clients",
          "SSE: yield f'data: {json.dumps({token: chunk})}\\n\\n' for each token",
          "Tool definitions: JSON schema of available functions passed to the LLM",
          "Tool execution loop: if response.tool_calls: execute them, append results, call LLM again",
          "Parallel tool calls: execute multiple tool calls concurrently with asyncio.gather",
        ],
        project:
          "Build a streaming tool-calling API: POST /chat/tools accepts a prompt, defines 3 tools (search_web, query_database, get_weather), streams the LLM's reasoning tokens, executes tool calls in parallel, streams the final response. The client sees the full chain of thought in real-time.",
        stack: ["FastAPI", "OpenAI SDK", "StreamingResponse", "asyncio"],
        resources: [],
      },
      {
        id: "fa-17-3",
        icon: "🔍",
        label: "RAG Backend",
        level: "advanced",
        concept:
          "A RAG (Retrieval Augmented Generation) backend retrieves relevant documents from a vector store and injects them into the LLM prompt. The pipeline: receive query → embed the query → vector search for relevant chunks → inject chunks into prompt → call LLM → return answer. FastAPI orchestrates this entire pipeline asynchronously.",
        keyPoints: [
          "Embeddings API: POST /embeddings converts text to vectors using OpenAI/Cohere",
          "pgvector: PostgreSQL extension for vector similarity search",
          "cosine_similarity: find top-k most similar chunks to the query embedding",
          "Retrieval API: POST /retrieve returns top-k relevant chunks for a query",
          "Document Processing API: upload → extract text → chunk → embed → store in pgvector",
        ],
        project:
          "Build a complete RAG backend: POST /documents (upload + process + embed + store in pgvector), POST /query (embed query + retrieve top-5 chunks + call LLM with context + stream response with source citations). Test with a real document and a question answered by its content.",
        stack: ["FastAPI", "pgvector", "OpenAI Embeddings", "PostgreSQL"],
        resources: [],
      },
    ],
  },
  {
    id: "fa-18",
    phaseNumber: 18,
    title: "Agent Backend Architecture",
    subtitle: "the destination",
    accent: "#7F77DD",
    bg: "#12102a",
    nodes: [
      {
        id: "fa-18-1",
        icon: "🧠",
        label: "Agent APIs & Memory",
        level: "advanced",
        concept:
          "An agent backend manages the full lifecycle of AI agents: creation (define system prompt, tools, model), execution (run the agent loop, stream results), and memory (persist conversation history, user preferences, learned facts). The agent execution API is the core — it receives a user message, loads the agent config and conversation history, runs the ReAct loop, and streams results back.",
        keyPoints: [
          "POST /agents: create agent with name, system_prompt, tools[], model config",
          "POST /agents/{id}/run: execute agent — accepts message, returns streaming response",
          "GET /agents/{id}/memory: retrieve agent's long-term memory for a user",
          "POST /agents/{id}/memory: store a memory (fact, preference, past event)",
          "Conversation context: load last N turns from DB, inject into system prompt",
        ],
        project:
          "Build the core agent execution API: POST /agents/{id}/run accepts {user_id, message}, loads agent config + last 20 conversation turns, runs the ReAct loop (LLM → tool call → observe → repeat), streams each step as SSE events ({type: thought|action|observation|answer}), and saves the full conversation to DB on completion.",
        stack: ["FastAPI", "OpenAI SDK", "PostgreSQL", "StreamingResponse"],
        resources: [],
      },
      {
        id: "fa-18-2",
        icon: "🛠️",
        label: "Agent Tool APIs",
        level: "advanced",
        concept:
          "Agent tools are the capabilities that extend an LLM's abilities — search the web, query databases, call APIs, write files. The tool backend defines tool schemas (what parameters each tool accepts), validates tool call arguments, executes tools, and returns results to the LLM. Tools should be idempotent where possible and always have a timeout.",
        keyPoints: [
          "Tool registry: dict mapping tool_name → (schema, execute_function)",
          "Tool schema: JSON Schema describing parameters — passed to LLM as function definitions",
          "Tool execution: validate args with Pydantic, execute, return result as string",
          "Timeout: asyncio.wait_for(tool.execute(args), timeout=10) — prevent hanging tools",
          "Tool permissions: users can enable/disable tools per agent",
        ],
        project:
          "Build a tool execution service: a registry of 5 tools (web_search, query_db, send_email, create_file, read_file). Each tool has a Pydantic schema for argument validation, a timeout, and error handling. Expose POST /tools/execute for direct testing. Wire it into your agent execution API.",
        stack: ["FastAPI", "Pydantic", "asyncio"],
        resources: [],
      },
      {
        id: "fa-18-3",
        icon: "🗺️",
        label: "Multi-Agent & Workflow APIs",
        level: "advanced",
        concept:
          "Multi-agent systems have agents that spawn sub-agents, delegate tasks, and coordinate results. The orchestrator pattern: one supervisor agent receives the goal, decomposes it, delegates to specialist agents (research, writing, coding), and synthesizes results. Workflow APIs represent multi-step processes as state machines — each step can be paused, resumed, and inspected.",
        keyPoints: [
          "POST /workflows: create a workflow definition with steps and conditions",
          "POST /workflows/{id}/run: start a workflow execution — returns a run_id",
          "GET /workflows/{id}/runs/{run_id}: check execution status and step results",
          "Human-in-the-loop: workflow pauses at approval steps — POST /runs/{id}/approve",
          "Agent spawning: supervisor agent calls POST /agents/{sub_agent_id}/run internally",
        ],
        project:
          "Build a multi-agent workflow API: a ResearchWorkflow that (1) spawns a SearchAgent to find information, (2) spawns a SummaryAgent to summarize findings, (3) spawns a WritingAgent to produce the final document. Track each step's status. Add a human approval gate before the final document is sent.",
        stack: ["FastAPI", "PostgreSQL", "OpenAI SDK", "WebSockets"],
        resources: [],
      },
    ],
  },
];
