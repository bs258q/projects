import { useState } from "react";

const TABS = [
  { key: "philosophy", label: "Teaching Philosophy", icon: "🧠" },
  { key: "curriculum", label: "AI Curriculum", icon: "🗺️" },
  { key: "tools", label: "AI Tools Hands-On", icon: "🛠️" },
  { key: "projects", label: "Real Projects", icon: "🚀" },
  { key: "mindset", label: "AI Mindset", icon: "💡" },
  { key: "mistakes", label: "What NOT To Do", icon: "⚠️" },
];

const philosophy = [
  {
    title: "Teach Outcomes, Not Tools",
    icon: "🎯",
    color: "#6366f1",
    body: "The AI tool landscape changes every 3 months. If you teach 'how to use Tool X', that knowledge expires. Instead, teach the underlying pattern: 'Here's how to evaluate any new AI tool, integrate it, and measure if it's working.' Students who understand the why can pick up any new tool in a day.",
    bullets: ["Teach: 'What problem does this AI solve?' before 'How do I use this AI?'", "Always pair a tool with a real business use case, not a toy demo", "After every tool lesson: 'What would you replace this with if it disappeared tomorrow?'", "The skill is adaptability — not memorizing API calls"]
  },
  {
    title: "AI as a Collaborator, Not a Shortcut",
    icon: "🤝",
    color: "#0ea5e9",
    body: "The biggest trap beginners fall into: using AI to skip thinking. Students who let AI do their thinking never build the mental models to catch AI mistakes. And AI WILL make mistakes. Train them to use AI to go faster — not to go without thinking.",
    bullets: ["Rule: write your own attempt before asking AI to generate", "Have students spot errors in AI-generated code — intentionally introduce bugs into AI output", "Teach: 'AI is your junior dev. You are the senior. Review everything.'", "Critical thinking is 10x more valuable than prompt engineering tricks"]
  },
  {
    title: "Show Real Failures, Not Just Wins",
    icon: "💥",
    color: "#f59e0b",
    body: "Every AI demo you see online is cherry-picked. Students need to see hallucinations, bad RAG retrievals, failed agent loops, and model drift in production. If they only see perfect demos, they'll be blindsided the moment something breaks at work.",
    bullets: ["Dedicate one full session to 'AI failure modes' with live examples", "Show a hallucinating LLM confidently giving wrong medical/legal info", "Show a RAG pipeline returning irrelevant chunks and how to debug it", "Show a fine-tuned model that overfit to training data — and how to detect it"]
  },
  {
    title: "Ground Everything in Production Reality",
    icon: "🏭",
    color: "#10b981",
    body: "Most AI courses stop at 'it works in a notebook'. Real jobs need models that run at scale, cost under budget, stay accurate over time, and don't hallucinate in front of customers. Teach students to think like an engineer who owns the system 24/7 — not a researcher who runs an experiment once.",
    bullets: ["Every project must have: latency SLO, cost estimate, failure mode analysis", "Teach monitoring from day 1 — not as an afterthought", "Ask students: 'What happens to this system at 100x traffic?'", "Require a /health endpoint and an alert in every deployed project"]
  },
];

const curriculum = [
  {
    phase: "Layer 1 — AI Literacy (Everyone Needs This)",
    weeks: "Weeks 1–2",
    color: "#6366f1",
    topics: [
      { title: "How LLMs Actually Work", items: ["Transformer architecture — intuition, not math", "Tokens, context window, temperature, top-p", "Why LLMs hallucinate and what 'grounding' means", "Difference: base model vs instruction-tuned vs RLHF model", "Cost model: input tokens × price + output tokens × price"] },
      { title: "Prompt Engineering That Works", items: ["System prompts vs user prompts — what each controls", "Zero-shot, few-shot, chain-of-thought prompting", "XML tags and structured output prompting", "What NOT to put in a prompt (leaking context, injection risks)", "Eval-driven prompting: test 10 inputs before shipping"] },
    ]
  },
  {
    phase: "Layer 2 — Building with AI APIs",
    weeks: "Weeks 3–4",
    color: "#0ea5e9",
    topics: [
      { title: "API Integration & Cost Management", items: ["OpenAI / Anthropic / Gemini SDK — Python + REST", "Streaming responses for real-time UX", "Token counting and cost estimation before deploying", "Retry logic, rate limit handling, exponential backoff", "API key management — secrets, not hardcoded"] },
      { title: "Structured Outputs & Function Calling", items: ["Getting JSON back reliably from an LLM", "Tool use / function calling — how agents take actions", "Pydantic schemas for output validation", "Handling partial/malformed LLM responses gracefully", "When to use function calling vs prompt-only approaches"] },
    ]
  },
  {
    phase: "Layer 3 — RAG & Knowledge Systems",
    weeks: "Weeks 5–6",
    color: "#f59e0b",
    topics: [
      { title: "RAG Pipeline End-to-End", items: ["Document loading, chunking strategies (fixed, semantic, recursive)", "Embedding models: OpenAI, Cohere, open-source (all-MiniLM)", "Vector databases: Chroma (local), Pinecone (cloud), Weaviate", "Retrieval: cosine similarity, MMR, hybrid search (BM25 + vector)", "Reranking: why top-k retrieval isn't enough"] },
      { title: "RAG Evaluation & Debugging", items: ["Faithfulness: did the answer come from the retrieved context?", "Relevance: did we retrieve the right chunks?", "Ragas framework for automated eval", "Debugging bad retrievals — chunk too big? embedding model mismatch?", "Building a ground truth eval dataset for your domain"] },
    ]
  },
  {
    phase: "Layer 4 — AI Agents & Automation",
    weeks: "Weeks 7–8",
    color: "#10b981",
    topics: [
      { title: "Agent Fundamentals", items: ["ReAct loop: Reason → Act → Observe → Repeat", "Tool definition: search, code execution, API calls, file read/write", "When agents work well vs when they go off the rails", "Stopping criteria — how does an agent know it's done?", "Human-in-the-loop checkpoints for high-stakes decisions"] },
      { title: "Multi-Agent & Orchestration", items: ["LangGraph: state machines for reliable agent flows", "Supervisor + worker agent pattern", "Handoff protocols between agents", "Shared memory: short-term (context) vs long-term (vector store)", "Observability: tracing every LLM call in a multi-agent system"] },
    ]
  },
  {
    phase: "Layer 5 — MLOps for AI (Job-Ready)",
    weeks: "Weeks 9–10",
    color: "#ec4899",
    topics: [
      { title: "Deploying & Serving Models", items: ["FastAPI wrapper for any model — inference API pattern", "vLLM for high-throughput LLM serving", "Docker + Kubernetes for model deployments", "Blue/green and canary deploys for model updates", "Cold start problem and how to solve it (pre-warming, min replicas)"] },
      { title: "Monitoring & Drift Detection", items: ["What to monitor: latency P99, token usage, error rate, cost/request", "LLM-specific metrics: TTFT (time to first token), throughput", "Prompt injection detection", "Data drift: when input distribution shifts from training", "Alert when quality degrades — not just when it crashes"] },
    ]
  },
  {
    phase: "Layer 6 — Fine-Tuning & Customization",
    weeks: "Weeks 11–12",
    color: "#f97316",
    topics: [
      { title: "When & How to Fine-Tune", items: ["Fine-tune vs RAG vs prompt engineering — decision framework", "Supervised fine-tuning (SFT): data format, dataset size rules of thumb", "LoRA / QLoRA: why you don't need 8 GPUs to fine-tune", "Unsloth for 2x faster fine-tuning on consumer hardware", "Evaluating fine-tuned models: don't just compare training loss"] },
      { title: "Data for AI", items: ["Synthetic data generation with LLMs (for SFT datasets)", "Data quality > data quantity — 1000 great examples beat 100k bad ones", "Deduplication, decontamination, PII scrubbing", "Instruction dataset formats: Alpaca, ShareGPT, ChatML", "DPO: preference data for alignment without RLHF complexity"] },
    ]
  },
];

const tools = [
  { name: "GitHub Copilot / Cursor", category: "Coding", icon: "💻", color: "#6366f1", teach: "Use it as a pair programmer, not an autocomplete. Teach students to review every suggestion critically. Best exercise: have them fix 5 bugs that Copilot introduced in AI-generated code.", hands_on: ["Write a FastAPI endpoint — compare Copilot suggestion vs hand-written", "Ask Copilot to write a function with a deliberate edge case — does it handle it?", "Use Cursor's codebase chat to explain an unfamiliar repo"] },
  { name: "Claude / ChatGPT / Gemini", category: "LLM APIs", icon: "🤖", color: "#0ea5e9", teach: "Teach the difference between using the chatbot UI (for exploration) vs the API (for products). Every student must build at least one app that calls an LLM API programmatically.", hands_on: ["Build a document summarizer using the API (not the UI)", "Compare outputs from 3 models on the same prompt — which is more accurate?", "Measure latency and cost per request across providers"] },
  { name: "LangChain / LlamaIndex", category: "RAG Frameworks", icon: "🔗", color: "#f59e0b", teach: "These frameworks abstract a lot of complexity — which is also their danger. Teach students to understand what's happening under the hood before using the abstraction. Otherwise debugging becomes impossible.", hands_on: ["Build a RAG pipeline from scratch first (no framework)", "Then rebuild it with LlamaIndex — compare code length and tradeoffs", "Deliberately break retrieval and debug using verbose logging"] },
  { name: "LangGraph", category: "Agents", icon: "🕸️", color: "#10b981", teach: "The mental model is a state machine. Every node is a function. Every edge is a condition. Once that clicks, building reliable agents becomes systematic instead of magical.", hands_on: ["Build a 3-node agent: search → summarize → respond", "Add a human approval node before any write operation", "Trace the full execution graph in LangSmith"] },
  { name: "HuggingFace + Unsloth", category: "Fine-tuning", icon: "🤗", color: "#ec4899", teach: "Start with inference before training. Load a pretrained model, run inference, understand the output format. Then fine-tune. Students who jump to fine-tuning without understanding inference always struggle.", hands_on: ["Load Llama 3 with HuggingFace, run 5 inference examples", "Fine-tune on a 100-example custom dataset with Unsloth + QLoRA", "Compare base model vs fine-tuned model on 10 test prompts"] },
  { name: "Weights & Biases / MLflow", category: "Experiment Tracking", icon: "📊", color: "#f97316", teach: "Teach this early — not as an afterthought. Students who don't track experiments from day 1 can never reproduce their best results. This is the habit that separates serious ML engineers from notebook hackers.", hands_on: ["Log 5 fine-tuning runs with different learning rates to W&B", "Compare runs on a parallel coordinates plot", "Register best model in MLflow registry, promote to staging"] },
  { name: "Weaviate / Chroma / Pinecone", category: "Vector DBs", icon: "🗄️", color: "#8b5cf6", teach: "Teach the underlying concept first: embeddings are coordinates in high-dimensional space, similarity search finds nearest neighbors. Once that mental model is solid, any vector DB makes sense.", hands_on: ["Embed 500 documents and do similarity search by hand with numpy first", "Then rebuild with ChromaDB — see why the abstraction helps", "Compare hybrid search (BM25 + vector) vs pure vector on 20 queries"] },
  { name: "Vercel AI SDK / Streamlit", category: "AI App UI", icon: "🖥️", color: "#06b6d4", teach: "Students need to ship UIs, not just APIs. A deployed app with a real UI gets 10x more attention from employers than a GitHub repo with a great README. Lower the barrier to shipping.", hands_on: ["Build a chat UI with streaming responses in Streamlit in 1 session", "Add conversation history and a clear-chat button", "Deploy to Vercel or Streamlit Cloud — share the URL in 2 hours"] },
];

const projects = [
  { level: "Beginner", color: "#6366f1", bg: "#eef2ff", projects: [
    { name: "Personal Study Assistant", stack: ["Claude API", "Streamlit", "Python"], what: "Upload your own notes/PDFs → ask questions → get grounded answers with citations.", teaches: "RAG basics, PDF parsing, API integration, streaming UI" },
    { name: "AI Code Reviewer", stack: ["OpenAI API", "GitHub Actions", "Python"], what: "GitHub Action that automatically reviews every PR and posts AI feedback as a comment.", teaches: "API calls in CI/CD, prompt engineering for code review, GitHub webhooks" },
    { name: "Meeting Summarizer", stack: ["Whisper", "GPT-4o", "FastAPI"], what: "Upload an audio recording → transcribe with Whisper → summarize + extract action items.", teaches: "Multi-modal AI, chaining models, structured output extraction" },
  ]},
  { level: "Intermediate", color: "#0ea5e9", bg: "#e0f2fe", projects: [
    { name: "Domain-Specific RAG Chatbot", stack: ["LlamaIndex", "Weaviate", "FastAPI", "React"], what: "A chatbot for a specific domain (medical, legal, DevOps docs) with eval metrics and source display.", teaches: "RAG evaluation, hybrid search, production-quality retrieval, UI integration" },
    { name: "AI Agent for AWS Cost Optimization", stack: ["LangGraph", "boto3", "Claude API"], what: "Agent that reads your AWS bills, identifies wasteful resources, and emails a weekly report.", teaches: "Tool use, multi-step reasoning, real API integration, scheduled agents" },
    { name: "Fine-Tuned Classifier", stack: ["HuggingFace", "Unsloth", "MLflow", "FastAPI"], what: "Fine-tune a small model on a custom classification task, track experiments, serve as an API.", teaches: "End-to-end ML lifecycle, LoRA, experiment tracking, model serving" },
  ]},
  { level: "Capstone", color: "#10b981", bg: "#ecfdf5", projects: [
    { name: "Production RAG with Full Observability", stack: ["LlamaIndex", "Weaviate", "LangSmith", "Ragas", "Kubernetes"], what: "A RAG system with automated nightly evals, LangSmith tracing, drift alerts, and K8s deployment.", teaches: "Production AI engineering: monitoring, evaluation, reliability, scalability" },
    { name: "Multi-Agent Research System", stack: ["LangGraph", "Claude API", "Tavily", "Redis", "Docker"], what: "Multi-agent system: orchestrator → web search agent → summarizer agent → report writer agent.", teaches: "Agent orchestration, shared state, failure recovery, observability across agents" },
    { name: "AI-Powered DevOps Copilot", stack: ["vLLM", "EKS", "KEDA", "Prometheus", "Grafana"], what: "Deploy an open-source LLM on EKS that answers infra questions using your runbooks as context.", teaches: "LLM infrastructure, GPU scaling, inference SLOs, cost optimization at scale" },
  ]},
];

const mistakes = [
  { mistake: "Teaching tools before fundamentals", why: "Students who learn LangChain before understanding embeddings can't debug when retrieval breaks. They treat the framework as a black box.", fix: "Block all frameworks for the first 4 weeks. Build everything from scratch with raw API calls and numpy. Frameworks unlock after they understand what the framework is doing for them." },
  { mistake: "Only showing demos that work", why: "Students develop unrealistic expectations. Then on their first job they see an agent loop fail, a hallucination reach a customer, or a model degrade silently — and they panic.", fix: "Reserve 20% of every AI session for failure modes. Show real hallucinations, bad retrievals, agent infinite loops. Teach the debugging workflow for each." },
  { mistake: "Skipping evals and just 'vibes testing'", why: "Vibes testing means changing one thing, eyeballing 3 outputs, and concluding it's better. That's not engineering. Models that pass vibes tests fail in production on edge cases.", fix: "Every AI project must have a test set of at least 20 inputs with expected outputs. Students run evals before and after any change. Teach Ragas, promptfoo, or even manual eval spreadsheets." },
  { mistake: "Not teaching cost awareness", why: "GPT-4o at $15/1M tokens sounds cheap until a student builds an app that sends 50k tokens per request and gets a $400 bill after 100 users. Real companies get fired over cost surprises.", fix: "Teach token counting from day 1. Every project must include a cost estimate: 'At 1000 users/day, this costs $X/month.' Use tiktoken to measure prompts before deploying." },
  { mistake: "Skipping security and prompt injection", why: "Students ship apps with system prompts visible in frontend code, no input sanitization, and no output filtering. Real AI apps at companies have been jailbroken, data-leaked, and abused this way.", fix: "Dedicate a full session to AI security: prompt injection attacks, jailbreaking, PII leakage in RAG, API key exposure. Have students attack each other's apps in a red-team exercise." },
  { mistake: "Teaching AI in isolation from software engineering", why: "An AI feature nobody can deploy, maintain, or monitor is worthless. Students who can build a RAG pipeline but can't Dockerize it or write a health check for it won't last 6 months at a real company.", fix: "Never let an AI project exist only in a notebook. Every project: Docker container, FastAPI endpoint, GitHub repo, deployed URL, /health endpoint. Non-negotiable." },
  { mistake: "Copying tutorials without understanding", why: "Tutorial code works for the tutorial's exact case. The moment a student changes one variable, it breaks — and they have no idea why. This is the most common pattern in beginner AI engineers.", fix: "After every tutorial, give students a modified version of the problem that the tutorial doesn't directly solve. Force them to adapt, not copy. The adaptation is where the learning happens." },
];

const mindset = [
  { title: "Learn to Read Papers (Just the Important Parts)", icon: "📄", body: "Students don't need to read every ML paper. But they need to read the Abstract, Introduction, and Results of papers in their domain. Teach them: skim 10 papers → read 3 deeply → implement 1. This is how senior ML engineers stay current.", action: "Weekly habit: spend 20 min on arxiv.org/list/cs.LG. Read abstracts. If something looks relevant to your work, read the results section." },
  { title: "Build a Learning Radar", icon: "📡", body: "The AI landscape moves too fast to learn everything. Teach students to have a 3-ring radar: things they use daily (master these), things they should understand conceptually (follow these), things they know exist (ignore the noise).", action: "Monthly exercise: update your personal radar. What's moved from 'know exists' to 'need to understand'? What can you deprioritize this month?" },
  { title: "Document Everything You Build", icon: "📝", body: "AI systems decay silently. The model you deployed 6 months ago is running on different data distributions, with different user prompts, and nobody remembers the original design decisions. Engineers who document their AI systems are the ones companies trust with critical systems.", action: "For every AI system: write an ADR (Architecture Decision Record). Why this model? Why this chunking strategy? What alternatives were considered and rejected?" },
  { title: "Calibrated Confidence, Not False Humility", icon: "⚖️", body: "Students often undersell themselves because AI is moving fast and they feel they'll never know enough. Teach them: you don't need to know everything. You need to know what you know, know what you don't, and be honest about the difference. That's what senior engineers respect.", action: "Interview practice: 'I haven't worked with X directly, but here's how I'd approach it based on my experience with Y.' This answer gets you hired. 'I don't know' alone does not." },
  { title: "The 'Production or It Didn't Happen' Rule", icon: "🚢", body: "Any student can get a RAG pipeline working in a Jupyter notebook. The real skill is getting it to work reliably for real users, at real scale, without you watching. Teach students to judge their own work by this standard from day 1.", action: "At the end of every project, ask: 'If 100 users hit this right now, what would break first?' Build the answer into the project. That question is the entire job of an AI infrastructure engineer." },
];

function Card({ title, icon, color, body, bullets }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ background: "#fff", border: `1.5px solid ${open ? color : "#e5e7eb"}`, borderRadius: 14, padding: 16, cursor: "pointer", transition: "border-color .15s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{title}</span>
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 8, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, marginBottom: 12 }}>{body}</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 12.5, color: "#6b7280", padding: "3px 0", borderBottom: i < bullets.length - 1 ? "1px solid #f9fafb" : "none", lineHeight: 1.5 }}>
                <span style={{ color: color, marginRight: 6 }}>→</span>{b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ToolCard({ name, category, icon, color, teach, hands_on }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ background: "#fff", border: `1.5px solid ${open ? color : "#e5e7eb"}`, borderRadius: 14, padding: 16, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{name}</div>
            <div style={{ fontSize: 11, color: color, fontWeight: 500 }}>{category}</div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ marginTop: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#9ca3af", marginBottom: 4 }}>How to teach it</div>
          <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.6, marginBottom: 10 }}>{teach}</p>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#9ca3af", marginBottom: 4 }}>Hands-on exercises</div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {hands_on.map((h, i) => (
              <li key={i} style={{ fontSize: 12.5, color: "#4b5563", padding: "3px 0", borderBottom: i < hands_on.length - 1 ? "1px solid #f9fafb" : "none", lineHeight: 1.5 }}>
                <span style={{ color, marginRight: 6 }}>→</span>{h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("philosophy");

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", padding: "1.5rem", maxWidth: 920, margin: "0 auto", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#6366f1", marginBottom: 4 }}>Instructor Guide</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", marginBottom: 6 }}>Teaching AI Skills That Actually Prepare Students for the Real World</h1>
        <p style={{ fontSize: 13, color: "#6b7280", maxWidth: 600 }}>A full framework for training beginners to become production-ready AI engineers — not just prompt engineers.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, borderBottom: "1px solid #e5e7eb", marginBottom: "1.5rem", paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "8px 14px", fontSize: 13, cursor: "pointer", border: "none", background: "none",
            color: tab === t.key ? "#6366f1" : "#6b7280",
            borderBottom: `2px solid ${tab === t.key ? "#6366f1" : "transparent"}`,
            marginBottom: -1, fontWeight: tab === t.key ? 600 : 400, whiteSpace: "nowrap"
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {/* PHILOSOPHY */}
      {tab === "philosophy" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            Before you decide which tools or frameworks to teach, you need to nail the <strong style={{ color: "#111" }}>underlying teaching principles</strong>. The AI tool landscape changes every quarter. Your curriculum will outlive any specific tool only if it's built on the right philosophy.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 10 }}>
            {philosophy.map((p, i) => <Card key={i} {...p} />)}
          </div>
        </div>
      )}

      {/* CURRICULUM */}
      {tab === "curriculum" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            A 12-week layered curriculum. Each layer builds on the last. <strong style={{ color: "#111" }}>Do not skip Layer 1.</strong> Students who skip AI fundamentals and jump to agents produce brittle, unmaintainable systems they can't debug.
          </p>
          {curriculum.map((layer, i) => (
            <div key={i} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                <div style={{ width: 4, height: 20, background: layer.color, borderRadius: 2 }} />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{layer.phase}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 10 }}>{layer.weeks}</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
                {layer.topics.map((topic, j) => (
                  <div key={j} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, borderTop: `3px solid ${layer.color}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 8 }}>{topic.title}</div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {topic.items.map((item, k) => (
                        <li key={k} style={{ fontSize: 12.5, color: "#4b5563", padding: "3px 0", borderBottom: k < topic.items.length - 1 ? "1px solid #f9fafb" : "none", lineHeight: 1.5 }}>
                          <span style={{ color: layer.color, marginRight: 6 }}>→</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOOLS */}
      {tab === "tools" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            Click any tool to see <strong style={{ color: "#111" }}>how to teach it</strong> and the exact hands-on exercises to run. The goal is not tool mastery — it's building the mental model so students can transfer to any new tool in the same category.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
            {tools.map((t, i) => <ToolCard key={i} {...t} />)}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {tab === "projects" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            Every project must be <strong style={{ color: "#111" }}>deployed publicly</strong> with a real URL. A working app beats 10 certificates every time. Sequence matters: beginners ship simple apps, intermediates add production concerns, capstone demonstrates full MLOps maturity.
          </p>
          {projects.map((group, i) => (
            <div key={i} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: 20, background: group.bg, color: group.color, fontSize: 12, fontWeight: 600, marginBottom: "0.75rem" }}>{group.level}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                {group.projects.map((p, j) => (
                  <div key={j} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, borderLeft: `4px solid ${group.color}` }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 6 }}>{p.name}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                      {p.stack.map((s, k) => <span key={k} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 8, background: group.bg, color: group.color, border: `1px solid ${group.color}30` }}>{s}</span>)}
                    </div>
                    <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.5, marginBottom: 8 }}>{p.what}</p>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#9ca3af", marginBottom: 3 }}>Teaches</div>
                    <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{p.teaches}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MINDSET */}
      {tab === "mindset" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            Technical skills get students the interview. <strong style={{ color: "#111" }}>Mindset gets them through the job.</strong> These are the mental habits that separate engineers who grow fast from those who plateau after 6 months.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 10 }}>
            {mindset.map((m, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{m.title}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.7, marginBottom: 10 }}>{m.body}</p>
                <div style={{ background: "#f8fafc", borderRadius: 8, padding: 10, borderLeft: "3px solid #6366f1" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#6366f1", marginBottom: 4 }}>Practical habit to assign</div>
                  <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.6 }}>{m.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MISTAKES */}
      {tab === "mistakes" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.7 }}>
            These are the <strong style={{ color: "#111" }}>7 most common mistakes</strong> instructors make when building AI curricula — and exactly how to fix each one. Most courses make at least 3 of these. Great courses avoid all of them.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mistakes.map((m, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#be123c", marginBottom: 4 }}>❌ Mistake #{i + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{m.mistake}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#b45309", marginBottom: 4 }}>Why it hurts students</div>
                  <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.6 }}>{m.why}</p>
                </div>
                <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#15803d", marginBottom: 4 }}>✅ The fix</div>
                  <p style={{ fontSize: 12.5, color: "#166534", lineHeight: 1.6 }}>{m.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
