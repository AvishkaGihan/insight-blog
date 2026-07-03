import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";

dotenv.config();

// ─── Helpers ────────────────────────────────────────────────────────────────

const slugify = (title) =>
  title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSubset = (arr, max) => {
  const count = Math.floor(Math.random() * (max + 1));
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

// ─── Seed Data ───────────────────────────────────────────────────────────────

const RAW_PASSWORD = "password123";

const USERS = [
  {
    username: "admin",
    email: "admin@insight.com",
    isAdmin: true,
    profilePicture: "https://api.dicebear.com/8.x/avataaars/svg?seed=admin",
  },
  {
    username: "johndoe",
    email: "john@example.com",
    isAdmin: false,
    profilePicture: "https://api.dicebear.com/8.x/avataaars/svg?seed=johndoe",
  },
  {
    username: "janedoe",
    email: "jane@example.com",
    isAdmin: false,
    profilePicture: "https://api.dicebear.com/8.x/avataaars/svg?seed=janedoe",
  },
  {
    username: "techwriter",
    email: "tech@example.com",
    isAdmin: false,
    profilePicture:
      "https://api.dicebear.com/8.x/avataaars/svg?seed=techwriter",
  },
  {
    username: "blogger42",
    email: "blogger@example.com",
    isAdmin: false,
    profilePicture: "https://api.dicebear.com/8.x/avataaars/svg?seed=blogger42",
  },
];

const POSTS = [
  // ── JavaScript ──────────────────────────────────────────────────────────
  {
    title: "Understanding JavaScript Closures",
    category: "javascript",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    content: `<h2>What is a Closure?</h2>
<p>A closure is one of the most powerful features of JavaScript. It occurs when an inner function has access to the outer (enclosing) function's variables even after the outer function has returned.</p>
<pre><code>function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const increment = outer();
increment(); // 1
increment(); // 2</code></pre>
<h2>Why Closures Matter</h2>
<p>Closures enable patterns like data encapsulation, factory functions, and memoization. They are at the heart of popular patterns in JavaScript development.</p>
<h2>Common Use Cases</h2>
<ul>
  <li>Module pattern for private state</li>
  <li>Currying and partial application</li>
  <li>Event handler bindings in loops</li>
  <li>Memoization for performance</li>
</ul>
<p>Understanding closures is essential to writing clean, maintainable JavaScript code and is a frequent topic in technical interviews.</p>`,
  },
  {
    title: "JavaScript Promises and Async Await Explained",
    category: "javascript",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    content: `<h2>The Problem with Callbacks</h2>
<p>Before Promises, asynchronous JavaScript relied on callbacks. Nested callbacks led to the infamous "callback hell" that made code hard to read and maintain.</p>
<h2>Promises to the Rescue</h2>
<p>A Promise represents a value that may be available now, in the future, or never. It has three states: <strong>pending</strong>, <strong>fulfilled</strong>, and <strong>rejected</strong>.</p>
<pre><code>fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));</code></pre>
<h2>Async/Await Syntax</h2>
<p>Async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code.</p>
<pre><code>async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}</code></pre>
<p>Always use try/catch with async/await to handle errors gracefully.</p>`,
  },
  {
    title: "ES6 Features Every Developer Should Know",
    category: "javascript",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800",
    content: `<h2>Arrow Functions</h2>
<p>Arrow functions provide a concise syntax and lexically bind <code>this</code>, solving many common confusion points around the <code>this</code> keyword.</p>
<pre><code>const add = (a, b) => a + b;</code></pre>
<h2>Destructuring</h2>
<p>Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.</p>
<pre><code>const { name, age } = user;
const [first, ...rest] = items;</code></pre>
<h2>Template Literals</h2>
<p>Template literals enable embedded expressions and multi-line strings using backtick syntax.</p>
<h2>Spread and Rest Operators</h2>
<p>The spread operator expands iterables, while rest collects remaining elements. Together they simplify working with arrays and function arguments.</p>
<h2>Modules (import/export)</h2>
<p>Native ES6 modules replaced workarounds like CommonJS and AMD, enabling clean dependency management with static analysis.</p>`,
  },
  {
    title: "JavaScript Array Methods You Must Master",
    category: "javascript",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    content: `<h2>map, filter, and reduce</h2>
<p>These three methods are the workhorses of functional programming in JavaScript. Mastering them will transform how you write data transformations.</p>
<pre><code>const doubled = [1, 2, 3].map(n => n * 2);
const evens   = [1, 2, 3].filter(n => n % 2 === 0);
const sum     = [1, 2, 3].reduce((acc, n) => acc + n, 0);</code></pre>
<h2>find and findIndex</h2>
<p>Use <code>find</code> when you need the first matching element, and <code>findIndex</code> when you need its position.</p>
<h2>flat and flatMap</h2>
<p>These newer methods simplify working with nested arrays — a common scenario when processing API responses.</p>
<h2>every and some</h2>
<p>These predicates let you test conditions across all or any elements without writing manual loops.</p>`,
  },

  // ── React.js ────────────────────────────────────────────────────────────
  {
    title: "React Hooks A Complete Guide",
    category: "reactjs",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    content: `<h2>Why Hooks?</h2>
<p>Hooks were introduced in React 16.8 to let you use state and other React features without writing a class. They make it easy to reuse stateful logic between components.</p>
<h2>useState</h2>
<p><code>useState</code> is the most basic hook. It returns a state value and a setter function.</p>
<pre><code>const [count, setCount] = useState(0);</code></pre>
<h2>useEffect</h2>
<p><code>useEffect</code> lets you perform side effects like data fetching, DOM manipulation, and subscriptions.</p>
<pre><code>useEffect(() => {
  fetchData();
  return () => cleanup();
}, [dependency]);</code></pre>
<h2>useContext</h2>
<p>Eliminates prop drilling by providing a way to pass data through the component tree without manually passing props at every level.</p>
<h2>useMemo and useCallback</h2>
<p>These performance hooks memoize expensive calculations and callback references to prevent unnecessary re-renders.</p>`,
  },
  {
    title: "State Management with Redux Toolkit",
    category: "reactjs",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
    content: `<h2>What is Redux Toolkit?</h2>
<p>Redux Toolkit is the official, opinionated toolset for efficient Redux development. It eliminates boilerplate and encourages best practices out of the box.</p>
<h2>Setting Up a Store</h2>
<pre><code>import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer },
});</code></pre>
<h2>Creating a Slice</h2>
<p>A slice automatically generates action creators and action types from your reducer functions.</p>
<pre><code>const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++; },
    decrement: state => { state.value--; },
  },
});</code></pre>
<h2>RTK Query</h2>
<p>RTK Query is a powerful data fetching and caching tool built into Redux Toolkit. It simplifies API interactions dramatically compared to thunks.</p>`,
  },
  {
    title: "Building Responsive UIs with Tailwind CSS and React",
    category: "reactjs",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab19836100?w=800",
    content: `<h2>Why Tailwind with React?</h2>
<p>Tailwind CSS pairs naturally with React's component model. Instead of context-switching between CSS files, you style directly in JSX with utility classes.</p>
<h2>Responsive Design</h2>
<p>Tailwind's breakpoint prefixes (sm, md, lg, xl) make responsive layouts intuitive:</p>
<pre><code>&lt;div className="flex flex-col md:flex-row gap-4"&gt;
  &lt;Sidebar /&gt;
  &lt;Main /&gt;
&lt;/div&gt;</code></pre>
<h2>Dark Mode</h2>
<p>Enabling Tailwind's dark mode is a one-line config change. Pair it with a React context to toggle themes dynamically.</p>
<h2>Component Patterns</h2>
<p>Extract repeated utility class combinations into reusable React components to keep your JSX clean and consistent.</p>`,
  },
  {
    title: "React Performance Optimization Tips",
    category: "reactjs",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
    content: `<h2>The Re-render Problem</h2>
<p>React re-renders a component whenever its state or props change. Unnecessary re-renders are the #1 source of React performance issues.</p>
<h2>React.memo</h2>
<p>Wrap components with <code>React.memo</code> to skip re-rendering when props haven't changed.</p>
<pre><code>const MyComponent = React.memo(({ value }) => {
  return &lt;div&gt;{value}&lt;/div&gt;;
});</code></pre>
<h2>useCallback and useMemo</h2>
<p>Memoize callback functions and expensive calculations to stabilize references and prevent child component re-renders.</p>
<h2>Code Splitting with lazy()</h2>
<p>Use <code>React.lazy()</code> with <code>Suspense</code> to split your bundle and load route components on demand, reducing initial load time.</p>
<h2>Virtualization</h2>
<p>For long lists, use libraries like react-window to render only the visible items rather than the entire list.</p>`,
  },

  // ── Next.js ─────────────────────────────────────────────────────────────
  {
    title: "Getting Started with Nextjs 14",
    category: "nextjs",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
    content: `<h2>What is Next.js?</h2>
<p>Next.js is a React framework that gives you building blocks to create full-stack web applications. It handles routing, rendering, and optimization out of the box.</p>
<h2>The App Router</h2>
<p>Next.js 13+ introduced the App Router with a new <code>app/</code> directory. It co-locates layouts, pages, loading states, and error boundaries using file-based conventions.</p>
<pre><code>app/
  layout.tsx
  page.tsx
  dashboard/
    page.tsx
    loading.tsx</code></pre>
<h2>Server Components</h2>
<p>By default, all components in the App Router are React Server Components. They render on the server, reducing JavaScript sent to the client.</p>
<h2>Getting Started</h2>
<pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>
<p>Visit <code>http://localhost:3000</code> and start editing <code>app/page.tsx</code> to see live updates.</p>`,
  },
  {
    title: "Server Side Rendering vs Static Generation in Nextjs",
    category: "nextjs",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800",
    content: `<h2>The Rendering Spectrum</h2>
<p>Next.js gives you full control over how and when your pages are rendered. The right choice depends on how frequently your data changes.</p>
<h2>Static Site Generation (SSG)</h2>
<p>Pages are rendered at build time. Perfect for content that doesn't change often — like blog posts and documentation. The result is blazing fast because pages are served from a CDN.</p>
<h2>Server-Side Rendering (SSR)</h2>
<p>Pages are rendered on every request. Use this for data that changes per user or in real time — dashboards, personalized feeds, etc.</p>
<h2>Incremental Static Regeneration (ISR)</h2>
<p>The best of both worlds. Pages are statically generated but can be revalidated in the background at a set interval, without a full rebuild.</p>
<pre><code>export const revalidate = 60; // revalidate every 60 seconds</code></pre>
<h2>Choosing the Right Strategy</h2>
<p>Ask yourself: how fresh does the data need to be? Match your rendering strategy to your data freshness requirements.</p>`,
  },
  {
    title: "Building a REST API with Nextjs Route Handlers",
    category: "nextjs",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    content: `<h2>Route Handlers</h2>
<p>Next.js App Router replaces the old <code>pages/api</code> with Route Handlers — files named <code>route.ts</code> inside the <code>app/</code> directory.</p>
<pre><code>// app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return Response.json(user, { status: 201 });
}</code></pre>
<h2>Dynamic Route Handlers</h2>
<p>Create segments with brackets to handle dynamic values like IDs.</p>
<pre><code>// app/api/users/[id]/route.ts
export async function GET(req: Request, { params }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  return Response.json(user);
}</code></pre>
<h2>Middleware</h2>
<p>Use Next.js Middleware to add auth checks, redirects, and header manipulation before requests reach your route handlers.</p>`,
  },
  {
    title: "Deploying Nextjs Apps to Vercel",
    category: "nextjs",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    content: `<h2>Why Vercel?</h2>
<p>Vercel is built by the creators of Next.js and offers the best-in-class deployment experience. It auto-detects Next.js projects and configures everything for you.</p>
<h2>Deploying in 3 Steps</h2>
<ol>
  <li>Push your project to GitHub</li>
  <li>Import the repository on vercel.com</li>
  <li>Click Deploy — Vercel handles the rest</li>
</ol>
<h2>Environment Variables</h2>
<p>Set environment variables in the Vercel dashboard under <strong>Settings &gt; Environment Variables</strong>. They are automatically injected at build time and runtime.</p>
<h2>Preview Deployments</h2>
<p>Every pull request gets an automatic preview deployment with a unique URL. This makes code review much more effective for frontend changes.</p>
<h2>Edge Functions</h2>
<p>Vercel can run your Next.js middleware and route handlers at the edge — closer to your users — for ultra-low latency responses worldwide.</p>`,
  },
];

const COMMENT_TEXTS = [
  "Great article! Learned something new today.",
  "This is exactly what I was looking for. Thanks for the clear explanation!",
  "Could you elaborate more on the advanced use cases?",
  "Bookmarked this for future reference. Excellent write-up.",
  "I disagree with the approach in section 2. Callbacks are not always bad.",
  "Just implemented this in my project and it works perfectly.",
  "The code examples really help. More posts like this please!",
  "Well written and straight to the point. No fluff.",
  "I've been struggling with this concept for weeks. Finally it clicked!",
  "Would love to see a follow-up post on testing this pattern.",
  "Is this compatible with older browsers without polyfills?",
  "Shared this with my entire dev team. Super useful.",
  "Any recommended resources to dive deeper into this topic?",
  "The code examples make this really clear. Thank you!",
  "Clean code examples. How do you handle error boundaries in this setup?",
  "This approach scales really well. We use something similar at work.",
  "Minor nit: the third code block could be more concise, otherwise brilliant.",
  "Finally an explanation that doesn't assume you already know the concept!",
  "Do you have a GitHub repo with the full working example?",
  "One of the best technical articles I've read this year. Five stars.",
];

// ─── Main Seeder ─────────────────────────────────────────────────────────────

const resetOnly = process.argv.includes("--reset-only");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("\n🔌 Connected to MongoDB\n");

    // ── 1. Clear existing data ───────────────────────────────────────────
    console.log("🗑️  Clearing existing collections...");
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log("   ✓ Users, Posts, Comments cleared\n");

    if (resetOnly) {
      console.log("✅ Reset complete. Database is now empty.\n");
      process.exit(0);
    }

    // ── 2. Insert Users ──────────────────────────────────────────────────
    console.log("👤 Seeding users...");
    const hashedPassword = await bcryptjs.hash(RAW_PASSWORD, 10);
    const insertedUsers = await User.insertMany(
      USERS.map((u) => ({ ...u, password: hashedPassword }))
    );
    console.log(`   ✓ ${insertedUsers.length} users created\n`);

    const adminUser = insertedUsers.find((u) => u.isAdmin);
    const allUserIds = insertedUsers.map((u) => u._id.toString());

    // ── 3. Insert Posts ──────────────────────────────────────────────────
    console.log("📝 Seeding posts...");
    const insertedPosts = await Post.insertMany(
      POSTS.map((p) => ({
        ...p,
        slug: slugify(p.title),
        userId: adminUser._id.toString(),
      }))
    );
    console.log(`   ✓ ${insertedPosts.length} posts created\n`);

    // ── 4. Insert Comments ───────────────────────────────────────────────
    console.log("💬 Seeding comments...");
    const comments = COMMENT_TEXTS.map((text) => {
      const post = randomItem(insertedPosts);
      const author = randomItem(insertedUsers);
      const likedByUsers = randomSubset(allUserIds, 4);
      return {
        content: text,
        postId: post._id.toString(),
        userId: author._id.toString(),
        likes: likedByUsers,
        numberOfLikes: likedByUsers.length,
      };
    });
    const insertedComments = await Comment.insertMany(comments);
    console.log(`   ✓ ${insertedComments.length} comments created\n`);

    // ── 5. Summary ───────────────────────────────────────────────────────
    console.log("═══════════════════════════════════════════════");
    console.log("  ✅  Seeding complete!");
    console.log("═══════════════════════════════════════════════");
    console.log(`  Users    : ${insertedUsers.length}`);
    console.log(`  Posts    : ${insertedPosts.length}`);
    console.log(`  Comments : ${insertedComments.length}`);
    console.log("───────────────────────────────────────────────");
    console.log(`  Password for all users: ${RAW_PASSWORD}`);
    console.log("───────────────────────────────────────────────");
    insertedUsers.forEach((u) => {
      const role = u.isAdmin ? "[ADMIN]" : "[user] ";
      console.log(`  ${role}  ${u.email}`);
    });
    console.log("═══════════════════════════════════════════════\n");

    process.exit(0);
  } catch (err) {
    console.error("\n❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
