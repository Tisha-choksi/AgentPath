import type { RoadmapPhase } from "./roadmap";

export const restApiData: RoadmapPhase[] = [
  {
    id: "api-phase-1",
    phaseNumber: 1,
    title: "HTTP Deep Dive",
    subtitle: "the protocol",
    accent: "#34D399",
    bg: "#0a1f18",
    nodes: [
      {
        id: "api-methods",
        icon: "📡",
        label: "HTTP methods",
        level: "beginner",
        concept:
          "HTTP methods (verbs) describe the intent of a request. GET retrieves data. POST submits data to create. PUT replaces an entire resource. PATCH partially updates. DELETE removes. The verb is part of the contract — callers know what to expect. Using the wrong verb (e.g. GET for deletion) breaks caching, security, and tooling.",
        keyPoints: [
          "GET: read-only, safe, idempotent — calling 10 times = same result",
          "POST: creates a new resource — not idempotent",
          "PUT: replace entire resource — idempotent",
          "PATCH: update specific fields — not always idempotent",
          "DELETE: remove resource — idempotent",
        ],
        project:
          "Using only curl: GET a list from JSONPlaceholder, POST a new item, PUT a full replacement, PATCH a single field, DELETE a record. Read each response and identify the status code. Note how the response shape differs per method.",
        stack: ["curl", "JSONPlaceholder API"],
        resources: [
          { title: "MDN HTTP Methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" },
        ],
      },
      {
        id: "api-status-codes",
        icon: "🔢",
        label: "Status codes",
        level: "beginner",
        concept:
          "Status codes are 3-digit numbers in every HTTP response. They tell the client what happened. The first digit defines the category: 2xx success, 3xx redirection, 4xx client error, 5xx server error. Using the right code matters — a 200 with an error message in the body is actively misleading and breaks clients that rely on status codes.",
        keyPoints: [
          "200 OK, 201 Created, 204 No Content",
          "301 Permanent Redirect, 302 Temporary Redirect",
          "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found",
          "409 Conflict (duplicate), 422 Unprocessable Entity (validation)",
          "500 Internal Server Error, 503 Service Unavailable",
        ],
        project:
          "Build an Express endpoint that returns the correct status code for each case: valid data (200), created resource (201), missing resource (404), invalid input (400), duplicate email (409), and a simulated server crash (500). Test each with curl.",
        stack: ["Express.js", "curl"],
        resources: [
          { title: "HTTP Status Codes", url: "https://httpstatuses.com/" },
        ],
      },
      {
        id: "api-headers",
        icon: "📋",
        label: "Headers & body",
        level: "beginner",
        concept:
          "Headers are key-value metadata attached to every request and response. They control behavior: Content-Type tells the receiver what format the body is in, Authorization carries auth credentials, Cache-Control sets caching rules, CORS headers allow cross-origin browser requests. The body carries the actual data payload — usually JSON in modern APIs.",
        keyPoints: [
          "Content-Type: application/json — tells receiver to parse as JSON",
          "Authorization: Bearer <token> — carries the auth token",
          "Accept: what response format the client wants",
          "CORS: Access-Control-Allow-Origin header enables browser cross-origin requests",
          "Cache-Control: max-age=3600 — cache for 1 hour",
        ],
        project:
          "Use curl -H to manually set custom headers. Build an endpoint that reads the Authorization header and returns 401 if missing. Add proper Content-Type headers to all responses. Enable CORS by adding the Access-Control-Allow-Origin header.",
        stack: ["curl", "Express.js"],
        resources: [
          { title: "MDN HTTP Headers", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers" },
        ],
      },
    ],
  },
  {
    id: "api-phase-2",
    phaseNumber: 2,
    title: "REST Principles",
    subtitle: "design",
    accent: "#F472B6",
    bg: "#1f0d1a",
    nodes: [
      {
        id: "api-resources",
        icon: "🎯",
        label: "Resources & endpoints",
        level: "beginner",
        concept:
          "REST organizes APIs around resources — nouns, not verbs. A resource is a thing: a user, a product, an order. The URL identifies the resource; the HTTP method describes the action. Good endpoint design uses plural nouns, hierarchical paths for relationships, and never puts verbs in the URL.",
        keyPoints: [
          "Good: GET /users/123 — Bad: GET /getUser?id=123",
          "Collection: /users — Single resource: /users/:id",
          "Nested: /users/:id/orders — user's orders",
          "Query params for filtering: /products?category=rings&sort=price",
          "Versioning: /api/v1/users — protects existing clients",
        ],
        project:
          "Design the URL structure for a diamond inventory API before writing any code. Define endpoints for: listing diamonds, getting one, creating, updating, deleting, listing a customer's saved searches, and creating a new saved search. Critique your own design.",
        stack: ["API Design"],
        resources: [
          { title: "REST API Design Best Practices", url: "https://restfulapi.net/" },
        ],
      },
      {
        id: "api-crud",
        icon: "♻️",
        label: "CRUD operations",
        level: "beginner",
        concept:
          "CRUD (Create, Read, Update, Delete) maps directly to HTTP methods and SQL operations. This mapping is the backbone of most REST APIs. Knowing it fluently means you can implement any standard API quickly. The tricky parts: partial updates (PATCH vs PUT), soft deletes (marking inactive instead of removing), and batch operations.",
        keyPoints: [
          "Create: POST /users → 201 with created resource in body",
          "Read list: GET /users → 200 with array",
          "Read one: GET /users/:id → 200 or 404",
          "Update: PUT /users/:id (full) or PATCH /users/:id (partial)",
          "Delete: DELETE /users/:id → 204 No Content (no body needed)",
        ],
        project:
          "Build a complete CRUD API for a 'products' resource using Express + an in-memory array. Implement all 5 operations with correct status codes. Add input validation: POST requires name and price, PATCH only updates provided fields. Test all operations.",
        stack: ["Express.js", "Node.js"],
        resources: [],
      },
      {
        id: "api-idempotency",
        icon: "🛡️",
        label: "Idempotency & safety",
        level: "intermediate",
        concept:
          "Safe methods (GET, HEAD) don't modify server state. Idempotent methods (GET, PUT, DELETE) produce the same result regardless of how many times you call them. This matters for retries: if a network failure means you're unsure whether your request succeeded, you can safely retry an idempotent request. POST is neither safe nor idempotent — retrying may create duplicates.",
        keyPoints: [
          "Safe: GET, HEAD — no side effects",
          "Idempotent: GET, PUT, DELETE — repeat calls = same state",
          "POST is NOT idempotent — duplicate orders are a real bug",
          "Idempotency key: client sends a unique ID so server deduplicates",
          "This is why payment APIs require idempotency keys",
        ],
        project:
          "Add an idempotency key to your POST /orders endpoint: client sends X-Idempotency-Key header, server stores key → result mapping. If the same key is sent again within 24 hours, return the original result instead of creating a duplicate.",
        stack: ["Express.js", "Node.js"],
        resources: [],
      },
    ],
  },
  {
    id: "api-phase-3",
    phaseNumber: 3,
    title: "Authentication",
    subtitle: "identity & access",
    accent: "#FBBF24",
    bg: "#1f190a",
    nodes: [
      {
        id: "api-keys",
        icon: "🔑",
        label: "API keys",
        level: "beginner",
        concept:
          "API keys are simple shared secrets — the client includes a key in every request header, the server looks it up and identifies who's calling. Easy to implement and use, but have limits: they can't expire automatically, they're hard to rotate without downtime, and if leaked they're valid until manually revoked. Best for server-to-server calls, not end-user auth.",
        keyPoints: [
          "Sent as header: X-API-Key: sk-abc123 or Authorization: Bearer sk-abc123",
          "Store hashed in DB — never store plaintext API keys",
          "Scope: each key can have different permissions",
          "Rate limit per key to prevent abuse",
          "Rotation: allow multiple active keys so old one can be retired gracefully",
        ],
        project:
          "Add API key authentication to your Express API: generate a key (crypto.randomBytes), hash it with SHA256 before storing, validate incoming requests by hashing the provided key and comparing. Add per-key rate limiting (10 req/min). Test with curl.",
        stack: ["Node.js crypto", "Express.js"],
        resources: [],
      },
      {
        id: "api-jwt",
        icon: "🎫",
        label: "JWT tokens",
        level: "intermediate",
        concept:
          "JWTs (JSON Web Tokens) are self-contained, signed tokens. The payload contains claims (user ID, roles, expiry) and is base64-encoded. The signature proves the server issued it. Because all info is in the token, the server is stateless — no session store needed. JWTs expire (exp claim), after which a refresh token can issue a new one.",
        keyPoints: [
          "Structure: header.payload.signature — all base64url encoded",
          "Sign: jwt.sign({ userId }, SECRET, { expiresIn: '15m' })",
          "Verify: jwt.verify(token, SECRET) — throws if invalid/expired",
          "Access token (short-lived: 15m) + refresh token (long-lived: 7d)",
          "Never put sensitive data in payload — it's encoded, not encrypted",
        ],
        project:
          "Add JWT auth to your API: POST /auth/login returns a 15-minute access token and a 7-day refresh token. Protect routes with a middleware that verifies the token. Build POST /auth/refresh that issues a new access token if the refresh token is valid.",
        stack: ["jsonwebtoken", "Express.js"],
        resources: [
          { title: "JWT.io Debugger", url: "https://jwt.io/" },
        ],
      },
      {
        id: "api-oauth",
        icon: "🔐",
        label: "OAuth 2.0",
        level: "intermediate",
        concept:
          "OAuth 2.0 is the protocol behind 'Login with Google/GitHub'. Instead of sharing passwords, the user grants a third-party app limited access to their account. The app receives an access token scoped to specific permissions (read email, access repos). You don't implement OAuth 2.0 yourself — you integrate with a provider (Google, GitHub, Auth0).",
        keyPoints: [
          "Authorization Code flow: user → provider login → callback with code → exchange code for token",
          "Scopes: request minimum permissions needed (principle of least privilege)",
          "Access token: short-lived, used to call the provider's API",
          "Refresh token: long-lived, used to get new access tokens",
          "PKCE: required for public clients (mobile apps, SPAs)",
        ],
        project:
          "Add 'Login with GitHub' to a Next.js app using NextAuth.js. Configure the GitHub OAuth app in GitHub settings, set up NextAuth with the GitHub provider, and display the logged-in user's name and avatar. Protect a page so only logged-in users can see it.",
        stack: ["NextAuth.js", "GitHub OAuth", "Next.js"],
        resources: [
          { title: "NextAuth.js Docs", url: "https://next-auth.js.org/" },
        ],
      },
    ],
  },
  {
    id: "api-phase-4",
    phaseNumber: 4,
    title: "Consuming APIs",
    subtitle: "client side",
    accent: "#38BDF8",
    bg: "#0a1929",
    nodes: [
      {
        id: "api-fetch",
        icon: "📡",
        label: "fetch & axios",
        level: "beginner",
        concept:
          "fetch is the native browser and modern Node.js API for making HTTP requests. It returns a Promise. Always check response.ok before parsing the body — a 404 doesn't throw, it just has ok:false. Axios is a popular library that adds: automatic JSON parsing, request/response interceptors, and better error handling (throws on non-2xx).",
        keyPoints: [
          "fetch(url).then(r => r.json()): basic GET request",
          "response.ok: false for 4xx/5xx — check before .json()",
          "POST with fetch: { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }",
          "axios.get(url): returns data directly (no .json() needed)",
          "axios interceptor: transform every request/response globally",
        ],
        project:
          "Build a product search UI in Next.js that calls your own API. Use fetch with async/await. Handle 3 states: loading, success, error. Show a spinner while loading, render products on success, show an error message on failure. Debounce the search input.",
        stack: ["fetch API", "Next.js", "React"],
        resources: [
          { title: "MDN fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
        ],
      },
      {
        id: "api-error-handling",
        icon: "⚠️",
        label: "Error handling",
        level: "intermediate",
        concept:
          "Network requests can fail in many ways: the server is down, the request times out, the response is 4xx/5xx, the JSON is malformed, or the connection drops mid-response. Robust error handling distinguishes between these cases and tells the user something useful. Never just catch an error and ignore it.",
        keyPoints: [
          "Network error: fetch throws — catch and show 'Connection failed'",
          "4xx: client sent wrong data — show validation message",
          "5xx: server crashed — show 'Try again later'",
          "Timeout: set AbortController with setTimeout to cancel slow requests",
          "Retry logic: exponential backoff for transient failures",
        ],
        project:
          "Add robust error handling to your API client: distinguish between network errors, 4xx, and 5xx. Show different UI for each case. Add a timeout (AbortController, 5 seconds). Add automatic retry with exponential backoff for 5xx errors (max 3 retries).",
        stack: ["fetch API", "React", "AbortController"],
        resources: [],
      },
      {
        id: "api-rate-limits",
        icon: "⏱️",
        label: "Rate limits & retry",
        level: "intermediate",
        concept:
          "Most APIs limit how many requests you can make (rate limits). Exceeding them returns a 429 Too Many Requests with a Retry-After header. Polling (checking for updates on an interval) is inefficient and quickly hits rate limits — prefer webhooks when available. Caching API responses locally reduces calls and improves performance.",
        keyPoints: [
          "429: Too Many Requests — read Retry-After header for when to retry",
          "Exponential backoff: 1s → 2s → 4s → 8s wait between retries",
          "Cache responses: store results in memory or localStorage with a TTL",
          "Webhook: API calls YOU when data changes (inverse of polling)",
          "API quotas: daily/monthly limits — track usage to avoid surprises",
        ],
        project:
          "Build a caching layer around an external API call: on first call, fetch and store result with a timestamp. On subsequent calls within 5 minutes, return cached result. After 5 minutes, refetch. Add a 429 handler that reads Retry-After and waits before retrying.",
        stack: ["Node.js", "TypeScript"],
        resources: [],
      },
    ],
  },
  {
    id: "api-phase-5",
    phaseNumber: 5,
    title: "Building APIs",
    subtitle: "server side",
    accent: "#A78BFA",
    bg: "#140d2a",
    nodes: [
      {
        id: "api-router",
        icon: "🏗️",
        label: "Express router",
        level: "intermediate",
        concept:
          "As your API grows, putting all routes in one file becomes unmanageable. Express Router lets you split routes into separate files and mount them at different base paths. Each router file handles one resource (users, products, orders). This mirrors how a well-organized codebase separates concerns.",
        keyPoints: [
          "express.Router(): create a mini-app for a resource",
          "router.get('/', handler): path is relative to mount point",
          "app.use('/api/users', usersRouter): mount at a prefix",
          "Router-level middleware: only applies to that router's routes",
          "Separate controllers: move handler logic out of route files",
        ],
        project:
          "Refactor a monolithic Express app into separate router files: usersRouter.ts, productsRouter.ts, ordersRouter.ts. Each mounted at /api/users, /api/products, /api/orders. Move auth middleware to a shared middleware file. Confirm all routes still work.",
        stack: ["Express.js", "TypeScript"],
        resources: [],
      },
      {
        id: "api-validation",
        icon: "✅",
        label: "Validation & schema",
        level: "intermediate",
        concept:
          "Never trust request data. Validate all inputs at the API boundary before they touch your database. Zod is the best TypeScript validation library — you define a schema, parse the request body through it, and get a typed object if valid or a detailed error if not. Validation prevents bad data, SQL injection, and confusing DB errors.",
        keyPoints: [
          "Zod: z.object({ name: z.string().min(1), price: z.number().positive() })",
          "schema.parse(data): throws ZodError with field-level messages if invalid",
          "schema.safeParse(data): returns { success, data } or { success, error }",
          "Return 400 with error details when validation fails",
          "Validate params and query strings too, not just body",
        ],
        project:
          "Add Zod validation to all your POST and PATCH endpoints. Define schemas for each request body. Return 400 with a list of field errors on validation failure. Also validate route params (e.g. :id must be a valid UUID). Write tests for the invalid cases.",
        stack: ["Zod", "TypeScript", "Express.js"],
        resources: [
          { title: "Zod Docs", url: "https://zod.dev/" },
        ],
      },
      {
        id: "api-docs",
        icon: "📖",
        label: "API documentation",
        level: "intermediate",
        concept:
          "An undocumented API is unusable. Good API docs describe every endpoint: URL, method, request parameters, request body schema, possible status codes, and example responses. OpenAPI (Swagger) is the industry standard — define your API in a JSON/YAML spec and tools can generate interactive docs, SDKs, and tests from it.",
        keyPoints: [
          "OpenAPI spec: machine-readable API description in YAML/JSON",
          "Swagger UI: renders OpenAPI spec as interactive docs",
          "swagger-jsdoc: generate spec from JSDoc comments in code",
          "Postman Collection: importable file with all your API requests",
          "README: at minimum document auth, base URL, and key endpoints",
        ],
        project:
          "Document your entire API using swagger-jsdoc and swagger-ui-express. Add JSDoc comments to every route with request/response schemas. Mount Swagger UI at GET /api/docs. Export a Postman collection and share it. Verify every endpoint works from the Swagger UI.",
        stack: ["swagger-jsdoc", "swagger-ui-express", "Postman"],
        resources: [
          { title: "OpenAPI Specification", url: "https://swagger.io/specification/" },
        ],
      },
    ],
  },
];
