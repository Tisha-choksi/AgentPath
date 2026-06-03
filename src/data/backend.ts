import type { RoadmapPhase } from "./roadmap";

export const backendData: RoadmapPhase[] = [
  {
    id: "be-1",
    phaseNumber: 1,
    title: "Programming Foundations",
    subtitle: "pick a language",
    accent: "#3B82F6",
    bg: "#0d1929",
    nodes: [
      {
        id: "be-1-1",
        icon: "🐍",
        label: "Variables, Loops & Functions",
        level: "beginner",
        concept:
          "The three pillars of any program. Variables store data in named memory slots — each has a type (int, string, list) and a scope. Loops repeat code: for iterates over a sequence, while repeats until a condition is false. Functions are named, reusable blocks that take input (parameters) and produce output (return values). Master these three and you can write any algorithm.",
        keyPoints: [
          "Python is recommended — clean syntax, massive AI/backend ecosystem",
          "Variables: x = 10, name = 'Alice', items = [1, 2, 3]",
          "for item in items: / while condition: — know both",
          "def greet(name): return f'Hello {name}' — define and call functions",
          "Scope: variables inside a function are local — not visible outside",
        ],
        project:
          "Build a CLI number guessing game: program picks a random number 1–100, user guesses, program says higher/lower, count attempts. Use variables, a while loop, a function to check guesses, and f-strings for output.",
        stack: ["Python 3"],
        resources: [
          { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
        ],
      },
      {
        id: "be-1-2",
        icon: "📦",
        label: "OOP & Classes",
        level: "beginner",
        concept:
          "Object-Oriented Programming organizes code around objects — bundles of data (attributes) and behavior (methods). A class is the blueprint; an object is an instance. The four pillars: Encapsulation (hide internal state), Inheritance (child class extends parent), Polymorphism (same method name, different behavior), Abstraction (expose only what's needed).",
        keyPoints: [
          "class Dog: — define a class",
          "__init__(self, name): — constructor, runs on object creation",
          "self: reference to the current instance",
          "Inheritance: class Puppy(Dog): — Puppy gets all Dog methods",
          "OOP shines when modeling real-world entities (User, Product, Order)",
        ],
        project:
          "Model a simple bank system with OOP: BankAccount class with attributes (owner, balance), methods (deposit, withdraw, get_balance). Create SavingsAccount that inherits BankAccount and adds interest_rate. Test creating multiple accounts and transferring between them.",
        stack: ["Python 3"],
        resources: [],
      },
      {
        id: "be-1-3",
        icon: "🛡️",
        label: "Exception & File Handling",
        level: "beginner",
        concept:
          "Exceptions are runtime errors — division by zero, file not found, invalid type. Without handling them, your program crashes. try/except catches them gracefully. File handling reads and writes persistent data. The with statement ensures files are closed even if an error occurs. These two skills together let you write programs that survive real-world conditions.",
        keyPoints: [
          "try: / except ValueError as e: / finally: — exception handling",
          "raise ValueError('message') — throw your own exceptions",
          "with open('file.txt', 'r') as f: data = f.read() — safe file read",
          "open modes: 'r' read, 'w' write (overwrite), 'a' append",
          "json.dump() and json.load() — read/write JSON files",
        ],
        project:
          "Build a contact book CLI: save contacts to a JSON file, load on startup, add/search/delete contacts with try/except around all file operations and user input parsing. The data should persist between program runs.",
        stack: ["Python 3", "json module"],
        resources: [],
      },
    ],
  },
  {
    id: "be-2",
    phaseNumber: 2,
    title: "Internet Fundamentals",
    subtitle: "how the web works",
    accent: "#06B6D4",
    bg: "#0a1f22",
    nodes: [
      {
        id: "be-2-1",
        icon: "🌐",
        label: "How the Internet Works",
        level: "beginner",
        concept:
          "The internet is a global network of computers communicating via standardized protocols. When you visit a website: your browser asks a DNS server to resolve the domain name to an IP address, your computer opens a TCP connection to that IP, the browser sends an HTTP request, the server sends back a response. Every backend you build lives somewhere in this chain.",
        keyPoints: [
          "IP address: unique identifier for each machine on a network",
          "TCP/IP: reliable, ordered data delivery — the backbone protocol",
          "Packet: data is broken into small chunks and reassembled",
          "Port: a numbered door on a server (80=HTTP, 443=HTTPS, 5432=PG)",
          "Latency: round-trip time from request sent to response received",
        ],
        project:
          "Use curl -v to make a raw HTTP request to google.com. Read every line of the output: the DNS lookup, TCP handshake, TLS handshake, request headers, and response. Write a 1-page explanation of what happened at each step.",
        stack: ["curl", "Browser DevTools"],
        resources: [
          { title: "How Does the Internet Work", url: "https://cs.fyi/guide/how-does-internet-work" },
        ],
      },
      {
        id: "be-2-2",
        icon: "🔒",
        label: "HTTP, HTTPS & DNS",
        level: "beginner",
        concept:
          "HTTP is the request/response protocol of the web. HTTPS = HTTP over TLS — the same protocol but with encryption so nobody can read your data in transit. DNS (Domain Name System) translates human-readable names (google.com) into IP addresses — like a phone book for the internet. Without DNS you'd memorize IP addresses; without HTTPS your passwords would be visible on public Wi-Fi.",
        keyPoints: [
          "HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE",
          "Status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Error",
          "TLS handshake: server sends certificate → client verifies → encrypted channel established",
          "DNS record types: A (domain→IP), CNAME (alias), MX (mail server)",
          "nslookup google.com — query DNS records from your terminal",
        ],
        project:
          "Register a free domain on Freenom or use a subdomain service. Point it to a server using an A record. Verify with nslookup. Observe the difference between HTTP and HTTPS responses in curl — check the certificate info.",
        stack: ["curl", "DNS tools"],
        resources: [
          { title: "MDN: HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
        ],
      },
      {
        id: "be-2-3",
        icon: "🏠",
        label: "Hosting & Browser Flow",
        level: "beginner",
        concept:
          "Hosting means running your server on a computer accessible via the internet. Types: shared hosting (multiple sites on one machine), VPS (your own virtual machine), PaaS (Render, Railway — they manage the server), serverless (code runs on demand). The browser request flow: type URL → DNS lookup → TCP connect → TLS handshake → HTTP request → server processes → HTTP response → browser renders.",
        keyPoints: [
          "VPS: Virtual Private Server — you get root access, manage everything",
          "PaaS (Render/Railway): push code, they handle servers — easiest to start",
          "CDN: Content Delivery Network — serves static files from servers near the user",
          "SSL certificate: proves your domain's identity — free via Let's Encrypt",
          "Browser renders HTML → parses CSS → runs JS → makes more HTTP requests for assets",
        ],
        project:
          "Deploy a simple 'Hello World' Python HTTP server to Render (free tier). Give it a custom domain (or use the Render subdomain). Access it from your phone on mobile data to confirm it's live on the real internet.",
        stack: ["Render", "Python", "Terminal"],
        resources: [],
      },
    ],
  },
  {
    id: "be-3",
    phaseNumber: 3,
    title: "Version Control",
    subtitle: "git & github",
    accent: "#F97316",
    bg: "#1f1208",
    nodes: [
      {
        id: "be-3-1",
        icon: "📸",
        label: "Git Basics",
        level: "beginner",
        concept:
          "Git is a version control system — it tracks every change you make to your code. Every save is a commit: a snapshot with a message, author, and timestamp. You can travel back to any commit. This means you can experiment freely — if something breaks, roll back. Git is non-negotiable for professional development.",
        keyPoints: [
          "git init: start tracking a folder",
          "git add . && git commit -m 'message': snapshot your changes",
          "git log --oneline: compact history of all commits",
          "git diff: see exactly what changed since last commit",
          "git restore file: undo changes to a file",
        ],
        project:
          "Initialize a git repo for your contact book project. Make 5 meaningful commits — one per feature you add. Write proper commit messages. Use git log --oneline --graph to see the history. Practice reverting one commit with git revert.",
        stack: ["Git", "Terminal"],
        resources: [
          { title: "Learn Git Branching (interactive)", url: "https://learngitbranching.js.org/" },
        ],
      },
      {
        id: "be-3-2",
        icon: "🌿",
        label: "GitHub & Branching",
        level: "beginner",
        concept:
          "GitHub hosts your Git repos in the cloud so teammates (or future employers) can see your work. Branches let you work on a feature without touching the main codebase. Create a branch, make commits, then merge when done. This is how every professional dev team works — main is always stable, features are developed in isolation.",
        keyPoints: [
          "git remote add origin <url>: link your local repo to GitHub",
          "git push origin main: upload your commits to GitHub",
          "git switch -c feature-name: create and switch to a new branch",
          "git merge feature-name: bring a branch's changes into main",
          "git push -u origin feature-name: push a new branch to GitHub",
        ],
        project:
          "Push all your existing projects to separate GitHub repos. For your contact book, create a feature/search branch, add a search feature there, then merge it back into main. Check GitHub to confirm the merge history is visible.",
        stack: ["GitHub", "Git"],
        resources: [
          { title: "GitHub Docs", url: "https://docs.github.com/en/get-started" },
        ],
      },
      {
        id: "be-3-3",
        icon: "⚔️",
        label: "PRs & Merge Conflicts",
        level: "intermediate",
        concept:
          "A Pull Request is a request to merge one branch into another — with a code review attached. It's how teams discuss and approve changes before they hit production. Merge conflicts happen when two branches changed the same lines — Git can't auto-decide which version is correct, so it asks you. Resolving conflicts is a daily skill in team environments.",
        keyPoints: [
          "Open a PR on GitHub: branch → compare & pull request → describe changes",
          "Reviewers leave comments on specific lines; you respond or fix then re-push",
          "Conflict markers: <<<HEAD (your version) === (separator) >>>branch (their version)",
          "Resolve by editing to the correct final state, then git add + git commit",
          "Best practice: pull main into your branch before opening a PR to minimize conflicts",
        ],
        project:
          "Using two GitHub accounts (or asking a friend): open a PR from a feature branch, leave a review comment, address the comment, get approval, and merge. Then deliberately create a merge conflict on a test file and resolve it manually.",
        stack: ["GitHub", "Git"],
        resources: [],
      },
    ],
  },
  {
    id: "be-4",
    phaseNumber: 4,
    title: "Backend Development",
    subtitle: "fastapi",
    accent: "#22C55E",
    bg: "#0d1f12",
    nodes: [
      {
        id: "be-4-1",
        icon: "🚀",
        label: "Routing & Request/Response",
        level: "beginner",
        concept:
          "FastAPI is a modern Python web framework — fast to write, fast to run, and auto-generates docs. You define route handlers with decorators: @app.get('/users') maps GET /users to a function. Every request comes in with a method, URL, headers, and optional body. You reply with a status code and body — usually JSON.",
        keyPoints: [
          "@app.get('/items/{id}') — path parameter in the URL",
          "Query params: def search(q: str, page: int = 1) — automatic parsing",
          "Return a dict → FastAPI auto-converts to JSON response",
          "Pydantic models: define the expected request/response shape with types",
          "uvicorn main:app --reload — run the dev server with hot reload",
        ],
        project:
          "Start building a Student Management API: GET /students (list all), GET /students/{id} (get one), define a Student Pydantic model with name, age, grade fields. Run it and test with FastAPI's built-in /docs Swagger UI.",
        stack: ["FastAPI", "Python", "uvicorn"],
        resources: [
          { title: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
        ],
      },
      {
        id: "be-4-2",
        icon: "🛤️",
        label: "Middleware & Validation",
        level: "intermediate",
        concept:
          "Middleware runs on every request before it reaches your route handler — perfect for logging, CORS, authentication, and request timing. FastAPI uses Pydantic for validation: define your expected input shape, and FastAPI automatically returns a 422 error with field details if the request doesn't match. This eliminates dozens of manual checks.",
        keyPoints: [
          "CORS middleware: allow browsers from other origins to call your API",
          "@app.middleware('http'): run code before/after every request",
          "Pydantic BaseModel: class StudentCreate(BaseModel): name: str; age: int",
          "Field validators: Field(min_length=1), Field(ge=0, le=150) — auto-validated",
          "422 Unprocessable Entity: FastAPI's response when validation fails",
        ],
        project:
          "Add to your Student API: CORS middleware allowing all origins, a logging middleware that prints method + path + duration, and strict validation on the student creation endpoint (name can't be empty, age must be 5–100, grade must be A/B/C/D/F).",
        stack: ["FastAPI", "Pydantic"],
        resources: [],
      },
      {
        id: "be-4-3",
        icon: "⚠️",
        label: "Error Handling",
        level: "intermediate",
        concept:
          "Unhandled exceptions crash requests with a generic 500 error that leaks internals to the client. FastAPI's HTTPException lets you raise proper HTTP errors anywhere. Exception handlers catch specific exception types globally and return consistent error shapes. Good error handling: the client always gets a useful message, and internal details never leak.",
        keyPoints: [
          "raise HTTPException(status_code=404, detail='Student not found')",
          "@app.exception_handler(404): customize the 404 response globally",
          "Always return a consistent error shape: {detail: string, code: string}",
          "Log the full exception server-side; send a clean message to the client",
          "Distinguish 4xx (client's fault) from 5xx (server's fault) in error messages",
        ],
        project:
          "Complete the Student Management API: add proper 404s when a student isn't found, 400s for duplicate student IDs, a global exception handler that formats all errors as {detail, status_code}, and a GET /health endpoint that returns 200 with server status.",
        stack: ["FastAPI", "Python"],
        resources: [],
      },
    ],
  },
  {
    id: "be-5",
    phaseNumber: 5,
    title: "Databases",
    subtitle: "postgresql",
    accent: "#8B5CF6",
    bg: "#150d2a",
    nodes: [
      {
        id: "be-5-1",
        icon: "🗄️",
        label: "CRUD & Joins",
        level: "beginner",
        concept:
          "SQL is the language of relational databases. CRUD maps to: INSERT (create), SELECT (read), UPDATE, DELETE. Joins combine data from multiple tables via shared keys — the most powerful SQL feature. Without joins you'd need multiple queries; with them, one query fetches related data from 3 tables at once.",
        keyPoints: [
          "SELECT * FROM books WHERE available = true ORDER BY title",
          "INSERT INTO books (title, author) VALUES ('Dune', 'Herbert')",
          "UPDATE books SET available = false WHERE id = 5",
          "INNER JOIN: only rows with a match in both tables",
          "LEFT JOIN: all rows from left table, NULLs where no match on right",
        ],
        project:
          "Create a Library Management System in PostgreSQL: tables for books, members, and loans. Write queries to: list all books borrowed by a member (JOIN), list overdue loans (JOIN + WHERE), mark a book as returned (UPDATE).",
        stack: ["PostgreSQL", "SQL"],
        resources: [
          { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" },
        ],
      },
      {
        id: "be-5-2",
        icon: "📊",
        label: "Aggregations & Indexes",
        level: "intermediate",
        concept:
          "Aggregation functions compute summaries across rows: COUNT, SUM, AVG, MIN, MAX. GROUP BY splits rows into groups before aggregating. HAVING filters groups (like WHERE but for aggregated values). Indexes are data structures that speed up queries by pre-sorting or hashing a column — essential for tables with millions of rows, but they slow down writes.",
        keyPoints: [
          "SELECT author, COUNT(*) FROM books GROUP BY author",
          "HAVING COUNT(*) > 3 — filter groups (use WHERE for row-level filters)",
          "CREATE INDEX idx_books_author ON books(author) — speed up searches by author",
          "EXPLAIN ANALYZE SELECT ...: show query execution plan + timing",
          "Index tradeoff: faster reads, slower writes, more disk space",
        ],
        project:
          "Add analytics queries to your library system: most-borrowed books (GROUP BY + ORDER BY COUNT), members with overdue loans (aggregation + date comparison), books never borrowed (LEFT JOIN WHERE NULL). Use EXPLAIN ANALYZE before and after adding indexes.",
        stack: ["PostgreSQL"],
        resources: [],
      },
      {
        id: "be-5-3",
        icon: "🔐",
        label: "Transactions & Normalization",
        level: "intermediate",
        concept:
          "A transaction groups multiple SQL operations into an atomic unit — all succeed or all fail. Critical for operations like transferring money (debit one account, credit another — must both succeed). Normalization organizes tables to eliminate redundancy: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Properly normalized databases are easier to maintain and less prone to anomalies.",
        keyPoints: [
          "BEGIN; ... COMMIT; — wrap operations in a transaction",
          "ROLLBACK; — undo everything in the current transaction on error",
          "ACID: Atomicity, Consistency, Isolation, Durability",
          "1NF: each cell has one value; no repeating groups",
          "3NF: eliminate fields that depend on non-key fields",
        ],
        project:
          "Add a loan transaction to your library: borrowing a book should atomically (1) insert a loan record and (2) update book availability. Wrap both in a transaction — simulate a failure mid-way and confirm neither change was saved.",
        stack: ["PostgreSQL"],
        resources: [],
      },
    ],
  },
  {
    id: "be-6",
    phaseNumber: 6,
    title: "APIs",
    subtitle: "rest & docs",
    accent: "#34D399",
    bg: "#0a1f18",
    nodes: [
      {
        id: "be-6-1",
        icon: "📡",
        label: "REST APIs & JSON",
        level: "beginner",
        concept:
          "REST (Representational State Transfer) is an architectural style for APIs. Resources are identified by URLs (nouns, not verbs). HTTP methods define the operation. Responses are typically JSON. REST is stateless — each request carries all the info needed, with no server-side session. JSON is the universal data format: key-value pairs, arrays, nested objects.",
        keyPoints: [
          "Resource URL: /products, /products/123, /products/123/reviews",
          "Never put verbs in URLs: /getProduct → GET /products/:id",
          "JSON: {\"name\": \"Ring\", \"price\": 999, \"tags\": [\"gold\", \"diamond\"]}",
          "Content-Type: application/json in both request and response headers",
          "Versioning: /api/v1/ prefix protects existing clients when you change the API",
        ],
        project:
          "Design and build an E-commerce API: GET /products (list + filter by category), POST /products (create), GET /products/:id, PATCH /products/:id, DELETE /products/:id. Follow REST conventions strictly — no verbs in URLs.",
        stack: ["FastAPI", "Python"],
        resources: [
          { title: "RESTful API Design", url: "https://restfulapi.net/" },
        ],
      },
      {
        id: "be-6-2",
        icon: "🔢",
        label: "Status Codes & Errors",
        level: "beginner",
        concept:
          "HTTP status codes tell the client what happened. Using the wrong code breaks clients that rely on status codes for flow control. A 200 with an error in the body is an antipattern — use 4xx for client errors and 5xx for server errors. Consistent error response shapes let frontend developers handle errors uniformly.",
        keyPoints: [
          "200 OK, 201 Created, 204 No Content (DELETE success)",
          "400 Bad Request (invalid input), 401 Unauthorized, 403 Forbidden",
          "404 Not Found, 409 Conflict (duplicate), 422 Validation Error",
          "500 Internal Server Error — never leak stack traces to clients",
          "Always return: {detail: '...', status_code: N} consistently",
        ],
        project:
          "Audit your E-commerce API: ensure every endpoint returns the semantically correct status code for every scenario (success, not found, duplicate, invalid input). Write a test script that calls each endpoint and asserts the status code.",
        stack: ["FastAPI", "Python", "httpx"],
        resources: [],
      },
      {
        id: "be-6-3",
        icon: "📖",
        label: "API Docs & Postman",
        level: "beginner",
        concept:
          "An undocumented API is unusable by others (and by future you). FastAPI auto-generates interactive docs from your code — visit /docs for Swagger UI, /redoc for ReDoc. Postman is a GUI tool to test APIs without writing code — save requests, organize them in collections, and share with teammates.",
        keyPoints: [
          "FastAPI /docs: interactive Swagger UI, try endpoints directly in browser",
          "Add descriptions to your Pydantic models and route docstrings — they appear in docs",
          "Postman collection: save all your API requests as a shareable file",
          "Environment variables in Postman: switch base URL between local and production",
          "Export OpenAPI spec: FastAPI generates /openapi.json automatically",
        ],
        project:
          "Polish your E-commerce API docs: add description fields to every Pydantic model, write docstrings for every route, add example values to fields. Export the OpenAPI spec and import it into Postman. Share the Postman collection with a teammate.",
        stack: ["FastAPI", "Postman"],
        resources: [
          { title: "Postman Learning Center", url: "https://learning.postman.com/" },
        ],
      },
    ],
  },
  {
    id: "be-7",
    phaseNumber: 7,
    title: "Authentication",
    subtitle: "identity & access",
    accent: "#F59E0B",
    bg: "#1f1a0d",
    nodes: [
      {
        id: "be-7-1",
        icon: "🍪",
        label: "Sessions & Cookies",
        level: "intermediate",
        concept:
          "Session-based auth: user logs in, server creates a session (random ID stored in DB), sends the ID as a cookie. On every subsequent request, the browser automatically sends the cookie, server looks up the session, identifies the user. Stateful — the server must store sessions. Cookies are automatically sent by browsers, making them easy to use but requiring CSRF protection.",
        keyPoints: [
          "Session ID: random string stored server-side, sent to client as cookie",
          "httpOnly cookie: JS can't read it — prevents XSS token theft",
          "Secure flag: cookie only sent over HTTPS",
          "SameSite=Strict: cookie not sent in cross-site requests — CSRF protection",
          "Session expiry: invalidate sessions after timeout for security",
        ],
        project:
          "Build session auth for your student API: POST /auth/login stores a session in a dict (or Redis), returns a session cookie. GET /me reads the cookie, looks up the session, returns current user. POST /auth/logout deletes the session.",
        stack: ["FastAPI", "Python"],
        resources: [],
      },
      {
        id: "be-7-2",
        icon: "🎫",
        label: "JWT",
        level: "intermediate",
        concept:
          "JWT (JSON Web Token) is a signed, self-contained token. The server signs a payload (user ID, roles, expiry) with a secret key. The client stores the token and sends it in the Authorization header. The server verifies the signature — no DB lookup needed. Stateless — scales across multiple servers. Short-lived access tokens (15 min) + long-lived refresh tokens (7 days).",
        keyPoints: [
          "Structure: header.payload.signature — all base64url encoded",
          "pip install python-jose — JWT library for Python",
          "jose.jwt.encode({sub: user_id, exp: datetime}, SECRET, algorithm='HS256')",
          "Verify: jose.jwt.decode(token, SECRET, algorithms=['HS256'])",
          "Never store sensitive data in payload — it's encoded, not encrypted",
        ],
        project:
          "Add JWT auth to your API: POST /auth/register (hash password with bcrypt, save user), POST /auth/login (verify password, return JWT), protect routes with a Depends(get_current_user) dependency that validates the JWT header.",
        stack: ["FastAPI", "python-jose", "passlib[bcrypt]"],
        resources: [
          { title: "FastAPI Security Docs", url: "https://fastapi.tiangolo.com/tutorial/security/" },
        ],
      },
      {
        id: "be-7-3",
        icon: "🔐",
        label: "OAuth Basics",
        level: "intermediate",
        concept:
          "OAuth 2.0 is the protocol behind 'Login with Google/GitHub'. Users grant your app limited access to their account without sharing their password. The Authorization Code flow: user clicks login → redirect to Google → user approves → Google sends a code → your server exchanges code for an access token → token used to fetch user profile. Use a library — don't implement OAuth yourself.",
        keyPoints: [
          "OAuth roles: Resource Owner (user), Client (your app), Authorization Server (Google), Resource Server (Google APIs)",
          "Authorization Code flow: the most secure, designed for web apps with a backend",
          "Access token: short-lived, scoped permission to call APIs",
          "Scopes: request only what you need — openid, email, profile",
          "Authlib or python-social-auth: libraries that handle OAuth for Python",
        ],
        project:
          "Add 'Login with GitHub' to your app using Authlib. Register an OAuth app in GitHub settings, configure client ID and secret, implement the callback endpoint, and display the logged-in user's GitHub username and avatar.",
        stack: ["FastAPI", "Authlib", "GitHub OAuth"],
        resources: [
          { title: "OAuth 2.0 Simplified", url: "https://www.oauth.com/" },
        ],
      },
    ],
  },
  {
    id: "be-8",
    phaseNumber: 8,
    title: "ORM",
    subtitle: "sqlalchemy / prisma",
    accent: "#EC4899",
    bg: "#1f0d1a",
    nodes: [
      {
        id: "be-8-1",
        icon: "🗺️",
        label: "Models & Relationships",
        level: "intermediate",
        concept:
          "ORMs let you define database tables as Python/TypeScript classes and query them using your language instead of raw SQL. SQLAlchemy is the standard for Python. You define models (classes that map to tables), relationships (foreign keys as Python attributes), and query using Python method chains. The ORM translates to SQL behind the scenes.",
        keyPoints: [
          "class User(Base): id = Column(Integer, primary_key=True) — define a table",
          "relationship(): declare a Python-level link between models",
          "ForeignKey('users.id'): create the DB constraint",
          "Lazy vs eager loading: load related records on access vs upfront",
          "session.query(User).filter(User.age > 18).all() — ORM query",
        ],
        project:
          "Start your Blog Backend. Define 3 models with SQLAlchemy: User, Post (many posts belong to one user), Comment (many comments belong to one post and one user). Create the tables and verify they exist in psql.",
        stack: ["SQLAlchemy", "FastAPI", "PostgreSQL"],
        resources: [
          { title: "SQLAlchemy ORM Tutorial", url: "https://docs.sqlalchemy.org/en/14/orm/tutorial.html" },
        ],
      },
      {
        id: "be-8-2",
        icon: "🔀",
        label: "Migrations",
        level: "intermediate",
        concept:
          "Migrations track changes to your database schema over time — like git commits but for your DB structure. When you add a column or change a type, you create a migration file that describes the change. Alembic is the standard migration tool for SQLAlchemy. Running migrations applies them in order; rolling back reverses them.",
        keyPoints: [
          "alembic init alembic — set up migration environment",
          "alembic revision --autogenerate -m 'add email to users' — generate migration",
          "alembic upgrade head — apply all pending migrations",
          "alembic downgrade -1 — roll back the last migration",
          "Never modify a migration that has already been applied in production",
        ],
        project:
          "Set up Alembic for your blog. Create an initial migration for your 3 models. Then add a published_at timestamp to Post and generate a second migration. Apply both migrations and verify the schema with psql. Practice rolling back.",
        stack: ["Alembic", "SQLAlchemy", "PostgreSQL"],
        resources: [],
      },
      {
        id: "be-8-3",
        icon: "✍️",
        label: "Blog Backend",
        level: "intermediate",
        concept:
          "Bring together everything learned so far into a complete Blog Backend. Users can register and log in. Authenticated users can create, edit, and delete their own posts. Anyone can read posts and comments. Pagination is essential — don't return all 10,000 posts at once.",
        keyPoints: [
          "Pagination: GET /posts?page=2&limit=10 — offset = (page-1) * limit",
          "Authorization: users can only edit/delete their own posts",
          "Eager loading: include author in post response with a single JOIN",
          "Schema separation: DatabasePost (ORM model) vs PostResponse (API schema)",
          "Soft delete: set deleted_at timestamp instead of actually deleting",
        ],
        project:
          "Complete the Blog Backend: full CRUD for posts and comments, JWT auth protecting write operations, pagination on list endpoints, a user can only delete their own content (403 otherwise), and all data returned through clean Pydantic response schemas.",
        stack: ["FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "JWT"],
        resources: [],
      },
    ],
  },
  {
    id: "be-9",
    phaseNumber: 9,
    title: "Testing",
    subtitle: "pytest",
    accent: "#14B8A6",
    bg: "#0a1f1e",
    nodes: [
      {
        id: "be-9-1",
        icon: "🔬",
        label: "Unit Testing",
        level: "intermediate",
        concept:
          "Unit tests test a single function or class in isolation — no database, no network. They're fast (run in milliseconds), reliable (no external dependencies), and serve as documentation. A unit test: arrange the inputs, act by calling the function, assert the output is correct. If a function is hard to unit test, it's usually a signal the function is doing too much.",
        keyPoints: [
          "pytest: def test_something(): assert result == expected",
          "AAA pattern: Arrange → Act → Assert",
          "pytest fixtures: @pytest.fixture — reusable setup code",
          "parametrize: test the same function with multiple inputs",
          "pytest -v: verbose output showing each test name",
        ],
        project:
          "Write unit tests for all pure functions in your blog backend: password hashing/verification, JWT creation/verification, pagination logic, slug generation. Aim for 100% coverage on these functions. Run pytest -v and see all green.",
        stack: ["pytest", "Python"],
        resources: [
          { title: "pytest Docs", url: "https://docs.pytest.org/en/stable/" },
        ],
      },
      {
        id: "be-9-2",
        icon: "🔗",
        label: "Integration Testing",
        level: "intermediate",
        concept:
          "Integration tests test multiple components working together — typically your API endpoints hitting a real (test) database. Unlike unit tests, they catch bugs at the boundaries: ORM queries, HTTP parsing, auth flow. They're slower than unit tests but catch a different class of bugs. Use a separate test database so you can wipe it between tests.",
        keyPoints: [
          "TestClient (FastAPI/Starlette): make HTTP requests to your app without a real server",
          "Test database: separate DB just for tests, wiped before each test run",
          "Fixtures: create test users, posts, etc. before each test then clean up",
          "Test auth flow: register → login → use token → call protected endpoint",
          "scope='function' (default) vs scope='session' fixtures — understand the difference",
        ],
        project:
          "Write integration tests for your blog API: test the full auth flow (register → login → get token → use token), test post CRUD as an authenticated user, test that a user can't delete another user's post (assert 403). Use a test PostgreSQL database.",
        stack: ["pytest", "FastAPI TestClient", "PostgreSQL"],
        resources: [],
      },
      {
        id: "be-9-3",
        icon: "✅",
        label: "Test Coverage & CI",
        level: "intermediate",
        concept:
          "Test coverage measures what percentage of your code is executed by your tests. 80%+ is a reasonable target for backends. pytest-cov generates HTML coverage reports so you can see exactly which lines aren't tested. Connecting tests to CI means every push to GitHub automatically runs your test suite — a failing test blocks a PR from merging.",
        keyPoints: [
          "pytest --cov=app --cov-report=html: generate HTML coverage report",
          "Coverage ≠ quality — 100% coverage with bad assertions is worthless",
          "Test happy paths AND error paths (what happens with bad input?)",
          "Mock external services (email, payment) with unittest.mock or pytest-mock",
          "GitHub Actions: run pytest on every push with a simple workflow YAML",
        ],
        project:
          "Add test coverage to your blog backend: run pytest --cov and aim for 80%+. Add missing tests for error scenarios (404s, 403s, validation failures). Set up a GitHub Actions workflow that runs the test suite on every push to main.",
        stack: ["pytest-cov", "GitHub Actions"],
        resources: [],
      },
    ],
  },
  {
    id: "be-10",
    phaseNumber: 10,
    title: "Caching",
    subtitle: "redis",
    accent: "#EF4444",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "be-10-1",
        icon: "💡",
        label: "Caching Concepts",
        level: "intermediate",
        concept:
          "Caching stores the result of an expensive operation so future requests can return it instantly. Instead of querying the database for the top 10 posts every request, compute it once, store in cache for 5 minutes, return from cache for all requests in that window. Trade-off: speed vs freshness. Cache invalidation — knowing when to expire cached data — is one of the hardest problems in computing.",
        keyPoints: [
          "Cache hit: data found in cache — fast. Cache miss: not found, fetch from DB",
          "TTL (Time To Live): how long cached data stays valid",
          "Cache-aside pattern: check cache → on miss, fetch DB → store in cache → return",
          "Write-through: update cache whenever DB is updated — stays fresh, more complex",
          "Cache stampede: many requests miss cache simultaneously — use locks or jitter",
        ],
        project:
          "Analyze your blog API's slow endpoints. Identify 3 endpoints that could benefit from caching (e.g. list posts, get popular tags, user profile). Design the caching strategy: what's the TTL? When should the cache be invalidated?",
        stack: ["Python"],
        resources: [],
      },
      {
        id: "be-10-2",
        icon: "⚡",
        label: "Redis",
        level: "intermediate",
        concept:
          "Redis is an in-memory data store — data lives in RAM, so reads/writes are microseconds vs milliseconds for a PostgreSQL query. It supports: strings, lists, sets, sorted sets, and hashes. Used as a cache, session store, message queue, and rate limiter. redis-py is the Python client. Always set a TTL on cached values — otherwise the cache grows forever.",
        keyPoints: [
          "pip install redis — Python client",
          "r.set('key', value, ex=300): store with 5-minute expiry",
          "r.get('key'): returns bytes or None if expired/missing",
          "r.delete('key'): invalidate a cache entry",
          "r.incr('rate:user:123'): atomic increment — perfect for rate limiting",
        ],
        project:
          "Add Redis caching to your blog API: cache GET /posts (list) for 60 seconds, cache GET /posts/:id for 5 minutes. On POST/PATCH/DELETE, invalidate the relevant cache keys. Measure the response time difference with and without cache using curl -w '%{time_total}'.",
        stack: ["Redis", "redis-py", "FastAPI"],
        resources: [
          { title: "Redis Documentation", url: "https://redis.io/docs/" },
        ],
      },
      {
        id: "be-10-3",
        icon: "🏎️",
        label: "Advanced Caching",
        level: "advanced",
        concept:
          "Beyond simple key-value caching: HTTP caching headers (Cache-Control, ETag) let browsers and CDNs cache responses without hitting your server. Rate limiting with Redis prevents API abuse — track request counts per user per minute. Full-page caching caches the entire API response; fragment caching caches parts of it. Distributed caching coordinates cache across multiple server instances.",
        keyPoints: [
          "Cache-Control: max-age=60 header: tell browsers/CDNs to cache the response",
          "ETag: hash of response — client sends If-None-Match, server returns 304 if unchanged",
          "Rate limiting: INCR + EXPIRE per user key, reject when count > limit",
          "Redis Pub/Sub: broadcast cache invalidation events to all server instances",
          "Memcached vs Redis: Memcached is simpler and faster; Redis has more data types",
        ],
        project:
          "Add rate limiting to your blog API: 100 requests per minute per IP, return 429 with Retry-After header when exceeded. Use Redis INCR + EXPIRE. Also add ETag support to your GET /posts/:id endpoint — confirm the browser returns 304 on second request.",
        stack: ["Redis", "FastAPI"],
        resources: [],
      },
    ],
  },
  {
    id: "be-11",
    phaseNumber: 11,
    title: "Message Queues",
    subtitle: "async processing",
    accent: "#A78BFA",
    bg: "#140d2a",
    nodes: [
      {
        id: "be-11-1",
        icon: "📬",
        label: "Queue Concepts",
        level: "intermediate",
        concept:
          "A message queue decouples the request handler from slow operations. Instead of making the user wait 3 seconds for a welcome email to send, you push a 'send_email' message to a queue and return 201 immediately. A separate worker process reads the queue and sends the email. This improves response times, handles traffic spikes, and isolates failures.",
        keyPoints: [
          "Producer: puts messages on the queue (your API handler)",
          "Consumer/Worker: reads messages and processes them (background process)",
          "Queue: buffer that holds messages until a worker is ready",
          "Acknowledgement: worker confirms processing succeeded; message is removed",
          "Dead letter queue: messages that fail repeatedly go here for inspection",
        ],
        project:
          "Design (on paper) an email notification system for your blog: what events trigger emails (new comment on your post, someone follows you), what data goes in the message, what does the worker do, what happens if the email service is down?",
        stack: ["Python"],
        resources: [],
      },
      {
        id: "be-11-2",
        icon: "🐰",
        label: "RabbitMQ",
        level: "intermediate",
        concept:
          "RabbitMQ is a message broker — it sits between producers and consumers. Messages are sent to exchanges, which route them to queues based on routing keys. Consumers subscribe to queues. RabbitMQ supports: direct routing, fan-out (broadcast to all queues), and topic routing (pattern matching). pika is the Python client.",
        keyPoints: [
          "Exchange → routing key → queue → consumer — the routing path",
          "pip install pika — Python RabbitMQ client",
          "channel.basic_publish(exchange, routing_key, body): send a message",
          "channel.basic_consume(queue, callback): start consuming",
          "Message persistence: make messages survive a RabbitMQ restart",
        ],
        project:
          "Build an Email Notification Service: when a comment is added to a post, publish a message to RabbitMQ. A separate worker consumes messages and logs 'Sending email to {author} about new comment'. Run both processes simultaneously.",
        stack: ["RabbitMQ", "pika", "Python"],
        resources: [
          { title: "RabbitMQ Tutorials", url: "https://www.rabbitmq.com/tutorials" },
        ],
      },
      {
        id: "be-11-3",
        icon: "⚡",
        label: "Kafka Basics",
        level: "advanced",
        concept:
          "Kafka is a distributed event streaming platform. Unlike RabbitMQ (messages are consumed and deleted), Kafka retains events in a log for a configurable time — consumers can replay history. Topics are partitioned for parallelism; consumer groups allow scaling. Kafka is designed for very high throughput (millions of events/sec). Overkill for most apps, essential for data pipelines and event sourcing.",
        keyPoints: [
          "Topic: named stream of events (like a queue, but persistent and replayable)",
          "Partition: topic split into ordered, immutable logs for parallelism",
          "Consumer group: multiple consumers sharing the work of a topic",
          "Offset: position in the partition — consumers track their own offset",
          "Kafka vs RabbitMQ: Kafka for event sourcing + replay; RabbitMQ for task queues",
        ],
        project:
          "Set up a local Kafka with Docker. Create a 'user_events' topic. Write a producer that publishes events (user_registered, post_created). Write two consumers in the same group — verify events are split between them. Then add a second group that independently processes all events.",
        stack: ["Apache Kafka", "kafka-python", "Docker"],
        resources: [
          { title: "Kafka Quickstart", url: "https://kafka.apache.org/quickstart" },
        ],
      },
    ],
  },
  {
    id: "be-12",
    phaseNumber: 12,
    title: "Docker",
    subtitle: "containerization",
    accent: "#0EA5E9",
    bg: "#0a1929",
    nodes: [
      {
        id: "be-12-1",
        icon: "🐳",
        label: "Docker Basics",
        level: "intermediate",
        concept:
          "Docker packages your app and all its dependencies into a container — a lightweight, isolated environment that runs identically everywhere. No more 'works on my machine'. An image is the blueprint; a container is a running instance. Docker Hub hosts public images (postgres, redis, python) you can pull and run instantly.",
        keyPoints: [
          "docker pull postgres: download the official Postgres image",
          "docker run -d -p 5432:5432 postgres: run Postgres in background",
          "docker ps: list running containers",
          "docker logs <container>: view container output",
          "docker exec -it <container> bash: open a shell inside a container",
        ],
        project:
          "Stop your locally-installed PostgreSQL and Redis. Instead, run them with Docker. Confirm your blog backend still connects and works. Practice stopping, restarting, and removing containers. Run your own Python script inside a python:3.11 container.",
        stack: ["Docker"],
        resources: [
          { title: "Docker Get Started", url: "https://docs.docker.com/get-started/" },
        ],
      },
      {
        id: "be-12-2",
        icon: "📄",
        label: "Dockerfile",
        level: "intermediate",
        concept:
          "A Dockerfile is a script that builds a Docker image for your app. Each instruction (FROM, COPY, RUN, CMD) creates a layer. Layer caching means unchanged layers aren't rebuilt — put things that change rarely (pip install) before things that change often (COPY your code). A good Dockerfile produces a small, secure image that starts fast.",
        keyPoints: [
          "FROM python:3.11-slim — start from a base image",
          "WORKDIR /app — set the working directory inside the container",
          "COPY requirements.txt . && RUN pip install — cache deps layer",
          "COPY . . — copy app code (changes frequently, goes last)",
          "CMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\"] — start command",
        ],
        project:
          "Write a Dockerfile for your blog backend. Build the image with docker build. Run it with docker run and confirm the API responds. Then make a code change and observe which layers are rebuilt vs cached. Reduce image size by switching to python:3.11-slim.",
        stack: ["Docker", "Python"],
        resources: [],
      },
      {
        id: "be-12-3",
        icon: "🎼",
        label: "Docker Compose",
        level: "intermediate",
        concept:
          "Docker Compose defines and runs multi-container apps with a single YAML file. Instead of manually running 3 docker run commands for your API, database, and Redis, docker-compose up starts everything with the right configs, networks, and volumes. The gold standard for local development environments.",
        keyPoints: [
          "docker-compose.yml: defines services, images, ports, volumes, env vars",
          "docker compose up -d: start all services in background",
          "docker compose down: stop and remove containers",
          "depends_on: db — start service only after db is ready",
          "volumes: persist DB data between container restarts",
        ],
        project:
          "Write a docker-compose.yml for your blog backend that starts: your FastAPI app, PostgreSQL, and Redis — all connected on the same network. A single 'docker compose up' should give a fully working local environment. Add a .env file for secrets.",
        stack: ["Docker Compose", "FastAPI", "PostgreSQL", "Redis"],
        resources: [],
      },
    ],
  },
  {
    id: "be-13",
    phaseNumber: 13,
    title: "CI/CD",
    subtitle: "automate everything",
    accent: "#84CC16",
    bg: "#111a0a",
    nodes: [
      {
        id: "be-13-1",
        icon: "⚙️",
        label: "GitHub Actions",
        level: "intermediate",
        concept:
          "GitHub Actions is a CI/CD platform built into GitHub. You define workflows in YAML files inside .github/workflows/. A workflow runs when triggered by a push, PR, or schedule. It runs on GitHub's servers — no infrastructure to manage. This is how you automate: run tests on every PR, build Docker images on merge, deploy on tag.",
        keyPoints: [
          "on: push / on: pull_request — workflow triggers",
          "jobs: group of steps running on a virtual machine (ubuntu-latest)",
          "steps: individual commands — checkout, setup-python, run pytest",
          "Secrets: store API keys in GitHub Secrets, access as ${{ secrets.KEY }}",
          "Matrix builds: test on multiple Python versions in parallel",
        ],
        project:
          "Write a GitHub Actions workflow for your blog backend that: (1) triggers on every push to main and every PR, (2) installs Python dependencies, (3) starts a test PostgreSQL service, (4) runs pytest. Confirm it passes on GitHub.",
        stack: ["GitHub Actions", "pytest"],
        resources: [
          { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
        ],
      },
      {
        id: "be-13-2",
        icon: "🧪",
        label: "Automated Testing",
        level: "intermediate",
        concept:
          "CI's primary job is running your test suite automatically. Every PR must pass tests before merging — this is the core contract that keeps main stable. GitHub Actions can run services (postgres, redis) alongside your tests using the services: key. Branch protection rules enforce that CI must pass before merging.",
        keyPoints: [
          "services: postgres: image: postgres:15 — start a real PG for tests",
          "Branch protection: Settings → Branches → require status checks to pass",
          "PR gates: failing tests block the merge button",
          "Test reporting: upload test results as artifacts for inspection",
          "Fail fast: stop all jobs if one fails to save CI minutes",
        ],
        project:
          "Extend your CI workflow: add the PostgreSQL and Redis services, run your full integration test suite. Enable branch protection on main — confirm a PR with a failing test can't be merged. Add a coverage report comment to the PR using pytest-cov.",
        stack: ["GitHub Actions", "pytest", "PostgreSQL"],
        resources: [],
      },
      {
        id: "be-13-3",
        icon: "🚀",
        label: "Automated Deployment",
        level: "advanced",
        concept:
          "CD (Continuous Deployment) automatically deploys your app after tests pass. Push to main → tests pass → build Docker image → push to registry → deploy to server. Zero manual steps. Render, Railway, and Fly.io all support auto-deploy on push. For more control, use GitHub Actions to SSH into a server and restart your service.",
        keyPoints: [
          "Docker Hub / GitHub Container Registry: store Docker images",
          "docker build → docker push → server pulls and restarts",
          "Render auto-deploy: connect GitHub repo → Render deploys on push",
          "Zero-downtime deploy: start new container, health check, then stop old one",
          "Rollback: keep previous Docker image tagged, re-deploy if new one fails",
        ],
        project:
          "Set up auto-deploy for your blog backend: on push to main (after tests pass), GitHub Actions builds and pushes a Docker image to GitHub Container Registry. Render pulls the new image and redeploys automatically. Confirm end-to-end in under 5 minutes.",
        stack: ["GitHub Actions", "Docker", "Render", "GitHub Container Registry"],
        resources: [],
      },
    ],
  },
  {
    id: "be-14",
    phaseNumber: 14,
    title: "System Design",
    subtitle: "architecture",
    accent: "#D97706",
    bg: "#1f190a",
    nodes: [
      {
        id: "be-14-1",
        icon: "🏗️",
        label: "Monolith vs Microservices",
        level: "advanced",
        concept:
          "A monolith is one codebase, one deployment, one database — simple to develop and deploy. Microservices split the system into independent services (auth service, notification service, payment service) — each with its own database and deployment. Start with a monolith: microservices add enormous operational complexity that's only worthwhile at scale. Most startups that went microservices too early regret it.",
        keyPoints: [
          "Monolith: one process, one DB — fast to build, easy to debug",
          "Microservices: independent deployability, team autonomy, tech diversity",
          "Microservice downsides: distributed system problems (network failures, consistency)",
          "Strangler fig pattern: migrate monolith to microservices piece by piece",
          "Rule of thumb: start monolith, extract services only when a clear boundary emerges",
        ],
        project:
          "Design the architecture for an Instagram-like backend on paper. Start with a monolith design. Then identify which components would be the first to extract into microservices and why. Draw the service diagram, data flow, and API contracts between services.",
        stack: ["System Design"],
        resources: [
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
        ],
      },
      {
        id: "be-14-2",
        icon: "⚖️",
        label: "Load Balancers & Scalability",
        level: "advanced",
        concept:
          "A load balancer distributes incoming requests across multiple server instances. Horizontal scaling adds more instances; vertical scaling adds more CPU/RAM to one instance. Horizontal is preferred — you can add/remove instances dynamically. Stateless servers scale easily; stateful servers (with local session storage) don't. CAP theorem: distributed systems can only guarantee two of Consistency, Availability, Partition tolerance.",
        keyPoints: [
          "Round-robin: requests distributed evenly across instances",
          "Sticky sessions: route a user's requests to the same instance — avoid this",
          "Stateless backends: store sessions in Redis, not in-process memory",
          "CAP theorem: during a network partition, choose Consistency OR Availability",
          "Horizontal pod autoscaler (Kubernetes): auto-add instances under load",
        ],
        project:
          "Continue the Instagram design: how many servers does the photo upload service need for 1M daily uploads? How do you ensure the API is still available if one server crashes? Design the load balancer setup and explain which CAP guarantees you'd make.",
        stack: ["System Design"],
        resources: [],
      },
      {
        id: "be-14-3",
        icon: "🗃️",
        label: "DB Replication & Caching",
        level: "advanced",
        concept:
          "Read replicas duplicate your primary database to multiple read-only copies — route SELECT queries to replicas, writes to primary. This multiplies your read capacity. Database sharding splits data across multiple databases (e.g., users 1–1M on DB1, 1M–2M on DB2). CDNs cache static content (images, videos) at edge servers globally. Together these patterns handle billions of requests.",
        keyPoints: [
          "Primary/Replica: one write DB, N read replicas — replication lag is the tradeoff",
          "Read/write splitting: ORM routes queries automatically to the right DB",
          "Horizontal sharding: partition by user ID hash or geography",
          "CDN: store images in S3, serve via CloudFront — milliseconds globally",
          "Database connection pooling: reuse DB connections across requests (PgBouncer)",
        ],
        project:
          "Complete the Instagram backend design: database replication strategy for feed reads, CDN strategy for photo storage, caching layer for user profiles and follower counts, and sharding strategy for when the user base hits 100M. Present as a full architecture diagram.",
        stack: ["System Design", "PostgreSQL", "Redis", "CDN"],
        resources: [],
      },
    ],
  },
  {
    id: "be-15",
    phaseNumber: 15,
    title: "Cloud",
    subtitle: "aws",
    accent: "#60A5FA",
    bg: "#0d1929",
    nodes: [
      {
        id: "be-15-1",
        icon: "🖥️",
        label: "EC2 & IAM",
        level: "advanced",
        concept:
          "EC2 (Elastic Compute Cloud) is AWS's virtual machine service — rent a Linux server by the hour. IAM (Identity and Access Management) controls who can do what in your AWS account. Every AWS resource interaction uses IAM: your EC2 instance needs an IAM role to read from S3; a developer needs an IAM user to deploy. The principle of least privilege: grant only the minimum permissions needed.",
        keyPoints: [
          "EC2 instance types: t3.micro (free tier), t3.small → t3.xlarge",
          "Security group: firewall rules — open port 22 (SSH) and 443 (HTTPS) only",
          "Key pair: SSH key to log into your EC2 instance",
          "IAM role: attach to EC2 so it can call other AWS services without hardcoded keys",
          "Never put AWS credentials in code — use IAM roles or environment variables",
        ],
        project:
          "Launch a t3.micro EC2 instance. SSH in, install your blog backend, and get it running. Create an IAM role for the instance with S3 read access. Set up a security group that only allows ports 22 and 443. Connect an Elastic IP so the address doesn't change on restart.",
        stack: ["AWS EC2", "AWS IAM", "Linux"],
        resources: [
          { title: "AWS Getting Started", url: "https://aws.amazon.com/getting-started/" },
        ],
      },
      {
        id: "be-15-2",
        icon: "🗄️",
        label: "S3 & RDS",
        level: "advanced",
        concept:
          "S3 (Simple Storage Service) stores files — images, backups, videos — with 99.999999999% durability. Files are called objects, stored in buckets. RDS (Relational Database Service) is managed PostgreSQL/MySQL — AWS handles backups, patches, and failover. You pay more than self-managing, but save significant operational time. S3 + RDS + EC2 is the classic backend stack.",
        keyPoints: [
          "S3 bucket: globally unique name, choose the region closest to your users",
          "boto3: AWS Python SDK — s3.upload_file(), s3.generate_presigned_url()",
          "Presigned URL: time-limited URL letting clients upload directly to S3 (bypass your server)",
          "RDS: create a PostgreSQL instance, connect with standard PG connection string",
          "RDS Multi-AZ: automatic failover to a standby in another availability zone",
        ],
        project:
          "Add file upload to your blog: users can upload a profile photo. Photo goes directly to S3 (via presigned URL from your API). URL stored in RDS (managed PostgreSQL). Migrate your local Postgres data to RDS. Confirm the full flow works end-to-end.",
        stack: ["AWS S3", "AWS RDS", "boto3", "PostgreSQL"],
        resources: [],
      },
      {
        id: "be-15-3",
        icon: "🚀",
        label: "Deploy Full Backend",
        level: "advanced",
        concept:
          "Deploying the full stack means wiring together all AWS components into a production-grade system. Traffic enters via a load balancer (ALB), hits multiple EC2 instances running your app, which reads/writes to RDS and stores files in S3. Environment variables come from AWS Secrets Manager. CloudWatch monitors everything and alerts on errors.",
        keyPoints: [
          "ALB (Application Load Balancer): distributes traffic across EC2 instances",
          "Auto Scaling Group: automatically add/remove EC2 instances based on CPU",
          "AWS Secrets Manager: store DB passwords and API keys — fetched at runtime",
          "CloudWatch: logs, metrics, alarms — set up alerts for 5xx errors and high latency",
          "Route 53: AWS DNS — point your domain to the ALB",
        ],
        project:
          "Deploy your complete blog backend to AWS: EC2 behind an ALB, RDS for PostgreSQL, S3 for file uploads, Secrets Manager for credentials, CloudWatch alarms for errors. Set up auto scaling to add EC2 instances when CPU > 70%. Document the architecture.",
        stack: ["AWS EC2", "AWS ALB", "AWS RDS", "AWS S3", "AWS CloudWatch"],
        resources: [],
      },
    ],
  },
  {
    id: "be-16",
    phaseNumber: 16,
    title: "Advanced Backend",
    subtitle: "production scale",
    accent: "#7F77DD",
    bg: "#12102a",
    nodes: [
      {
        id: "be-16-1",
        icon: "🔍",
        label: "Elasticsearch & GraphQL",
        level: "advanced",
        concept:
          "Elasticsearch is a search engine built for full-text search — searching blog posts by content, autocomplete, fuzzy matching. It stores data as JSON documents in an inverted index, making text search orders of magnitude faster than SQL LIKE queries. GraphQL is an alternative to REST where the client specifies exactly what data it needs — no over-fetching, no under-fetching. One /graphql endpoint replaces dozens of REST endpoints.",
        keyPoints: [
          "Elasticsearch index: like a database table, optimized for text search",
          "Query DSL: {match: {title: 'python tutorial'}} — full-text search",
          "Sync from PostgreSQL to Elasticsearch on writes using a background task",
          "GraphQL schema: defines types, queries, and mutations",
          "Strawberry (Python): code-first GraphQL schema definition",
        ],
        project:
          "Add full-text search to your blog using Elasticsearch: sync posts on create/update, expose GET /posts/search?q=... that queries Elasticsearch. Then build a GraphQL endpoint alongside your REST API that lets clients query posts with any combination of fields.",
        stack: ["Elasticsearch", "GraphQL", "Strawberry", "FastAPI"],
        resources: [
          { title: "Elasticsearch Guide", url: "https://www.elastic.co/guide/index.html" },
        ],
      },
      {
        id: "be-16-2",
        icon: "⚡",
        label: "WebSockets & Event-Driven",
        level: "advanced",
        concept:
          "WebSockets provide full-duplex communication — both client and server can send messages at any time over a persistent connection. Essential for real-time features: chat, live notifications, collaborative editing. Event-Driven Architecture decouples services using events: instead of service A calling service B directly, A publishes an event; B subscribes. Looser coupling, better scalability, easier to add new consumers.",
        keyPoints: [
          "WebSocket: single TCP connection, both sides send/receive messages",
          "FastAPI WebSocket: @app.websocket('/ws') async def endpoint(ws: WebSocket)",
          "Event-driven: User registered → publish event → email service, analytics, welcome service all react",
          "Event sourcing: store every state change as an immutable event log",
          "CQRS: separate read models from write models for performance",
        ],
        project:
          "Build a real-time chat feature in your blog: users in the same post's comment section see new comments appear instantly via WebSockets. Use Redis Pub/Sub to broadcast messages across multiple server instances.",
        stack: ["FastAPI WebSockets", "Redis Pub/Sub", "Python"],
        resources: [],
      },
      {
        id: "be-16-3",
        icon: "🔭",
        label: "Observability & Monitoring",
        level: "advanced",
        concept:
          "Observability answers: what is my system doing right now? The three pillars: Logs (what happened), Metrics (how much/fast), Traces (the path of one request through the system). Production systems fail in ways you didn't anticipate — observability is how you debug them. Set up alerting so you know about problems before users report them.",
        keyPoints: [
          "Structured logging: log JSON with request_id, user_id, duration — easy to query",
          "Prometheus: scrapes metrics from your app (request count, latency histograms)",
          "Grafana: visualize Prometheus metrics in dashboards",
          "Distributed tracing: OpenTelemetry + Jaeger — trace a request across 5 services",
          "Alerting: page on-call when error rate > 1% or p99 latency > 2s",
        ],
        project:
          "Instrument your blog backend completely: structured JSON logging with request IDs, Prometheus metrics endpoint (/metrics) for request count and latency, a Grafana dashboard showing the four golden signals (latency, traffic, errors, saturation), and an alert when error rate exceeds 1%.",
        stack: ["Prometheus", "Grafana", "OpenTelemetry", "structlog"],
        resources: [
          { title: "OpenTelemetry Python", url: "https://opentelemetry.io/docs/languages/python/" },
        ],
      },
    ],
  },
];
