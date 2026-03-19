type Feature = {
  title: string;
  body: string;
  eyebrow: string;
};

type GalleryItem = {
  title: string;
  body: string;
  image: string;
  featured?: boolean;
};

type Surface = {
  name: string;
  description: string;
  signal: string;
};

type Capability = {
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    eyebrow: "Discover",
    title: "先看清本地装了什么",
    body:
      "自动发现 Skills、MCP Servers、Prompts、Tools 与插件组件，先把资产盘点清楚。",
  },
  {
    eyebrow: "Analyze",
    title: "把风险变成可读事实",
    body:
      "围绕 shell 执行、敏感文件访问、联网、下载和注入模式建立规则视图与安全评分。",
  },
  {
    eyebrow: "Control",
    title: "发现问题后立刻处置",
    body:
      "高风险组件可以直接进入隔离区，不需要手动翻目录或猜测哪个 Skill 在作怪。",
  },
];

const gallery: GalleryItem[] = [
  {
    title: "安全概览",
    body: "先看到整体扫描状态，再进入具体组件与风险明细。这是 AOS 的主入口。",
    image: "/assets/dashboard.png",
    featured: true,
  },
  {
    title: "组件管理",
    body: "把本地已安装的 Skills 与生态探索拆开管理，避免把来源、能力和风险混在一起。",
    image: "/assets/skills-management.png",
  },
  {
    title: "风险分析",
    body: "每个 Skill 都能下钻到具体发现、评分、文件路径和规则上下文，不只给一个模糊结论。",
    image: "/assets/risk-analysis.png",
  },
  {
    title: "隔离与处置",
    body: "把高风险组件移出活跃环境，再决定恢复、继续观察或永久清理。",
    image: "/assets/activity-monitor.png",
  },
];

const useCases = [
  "给本地安装的 Agent Skills 做一次系统体检",
  "在团队引入第三方 MCP 或工具前先跑一遍安全基线",
  "快速定位哪个插件在访问敏感文件或尝试联网",
  "把 AI 开发环境从“能跑”升级到“可见、可控、可隔离”",
];

const surfaces: Surface[] = [
  {
    name: "Skills",
    description: "发现本地安装的 Skill 目录与描述文件，先把资产盘点清楚。",
    signal: "~/.openclaw/skills · ~/.agents/skills",
  },
  {
    name: "Plugins",
    description: "覆盖插件与扩展生态，把不在主流程里的执行面也纳入视野。",
    signal: "~/.cline/plugins",
  },
  {
    name: "MCP / Tools",
    description: "识别工具与 server 的能力边界，避免把外部执行能力当作黑盒。",
    signal: "mcp_server · tool · resource",
  },
  {
    name: "Prompts",
    description: "把 Prompt 与说明文本也纳入检测，而不只扫描代码文件。",
    signal: "prompt · markdown · descriptors",
  },
];

const capabilities: Capability[] = [
  {
    title: "发现与检测分层进行",
    body: "先由 discovery-engine 盘点组件，再由 local-scanner 做规则检测，结果更清楚，也更适合后续扩展。",
  },
  {
    title: "风险规则贴近真实行为",
    body: "不是抽象分数，而是围绕执行、访问、联网、下载和注入建立具象规则。",
  },
  {
    title: "桌面端里完成闭环",
    body: "从概览到分析，再到隔离与监控，处理动作都留在同一个桌面入口里。",
  },
  {
    title: "更适合本地安全入口",
    body: "基于 Tauri、React、Rust 与 SQLite 的本地架构，更适合作为持续存在的桌面产品。",
  },
];

const workflow = [
  "Discover",
  "Classify",
  "Score",
  "Quarantine",
  "Monitor",
];

function ShieldMark() {
  return (
    <svg
      aria-hidden="true"
      className="shield-mark"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M32 6 14 14v16c0 12 7 22.8 18 28 11-5.2 18-16 18-28V14L32 6Z"
        className="shield-outline"
      />
      <path
        d="m24.8 31.8 4.9 5.2 9.7-11"
        className="shield-check"
      />
    </svg>
  );
}

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#hero">
          <ShieldMark />
          <div>
            <span>Agents-of-Shield</span>
            <strong>Desktop security for the agent era</strong>
          </div>
        </a>

        <nav className="topnav">
          <a href="#product">Product</a>
          <a href="#surface">Surface</a>
          <a href="#proof">Proof</a>
          <a href="#workflow">Workflow</a>
          <a href="#launch">Launch</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="hero-copy">
            <div className="eyebrow">DESKTOP SECURITY FOR AGENTS</div>
            <h1>
              为本地 AI Agent
              <br />
              建立一层清晰可控的
              <span>安全界面</span>
            </h1>
            <p className="hero-text">
              Agents-of-Shield 是面向本地 AI Agent 生态的桌面安全控制台。
              它会发现并扫描 Skills、MCP Servers、Tools、Prompts 与 Plugins，
              把原本分散且不可见的风险，变成可以查看、分析与处置的工作流。
            </p>

            <div className="hero-note">
              不是让 Agent 更强，而是让 Agent Runtime 更可见、更可控。
            </div>

            <div className="hero-actions">
              <a className="button primary" href="#launch">
                预约演示
              </a>
              <a className="button secondary" href="#proof">
                查看产品界面
              </a>
              <a className="button secondary" href="#workflow">
                了解工作流
              </a>
            </div>

            <ul className="signal-list">
              <li>盘点本地 Skills、MCP、Plugins、Prompts 与 Tools</li>
              <li>识别 shell 执行、文件访问、联网、下载与注入风险模式</li>
              <li>在一个原生桌面工作流里完成查看、分析与隔离</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-shot">
              <div className="hero-shot-copy">
                <span>主界面预览</span>
                <p>从这里开始查看本地 Agent 生态的整体安全状态。</p>
              </div>
              <img alt="Agents-of-Shield desktop overview" src="/assets/dashboard.png" />
            </div>

            <div className="hero-meta">
              <div>
                <span>扫描对象</span>
                <strong>Skills、MCP、Tools、Prompts、Plugins</strong>
              </div>
              <div>
                <span>核心动作</span>
                <strong>扫描、评分、隔离、监控</strong>
              </div>
              <div>
                <span>本地架构</span>
                <strong>Tauri、React、Rust、SQLite</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip section" id="product">
          <div className="proof-card">
            <span>定位</span>
            <strong>本地 AI Agent 安全控制台</strong>
          </div>
          <div className="proof-card">
            <span>关注面</span>
            <strong>组件、能力与执行路径</strong>
          </div>
          <div className="proof-card">
            <span>处理动作</span>
            <strong>扫描、评分、隔离、持续监控</strong>
          </div>
          <div className="proof-card">
            <span>形态</span>
            <strong>原生桌面安全入口</strong>
          </div>
        </section>

        <section className="surface section" id="surface">
          <div className="section-heading">
            <div className="eyebrow">INSPECTION SURFACE</div>
            <h2>从文件夹到执行能力，AOS 看的不是一个组件，而是一整层本地 Agent attack surface。</h2>
            <p>
              它不是另一个 Agent Builder，也不是抽象的“AI 安全”口号。
              AOS 关心的是本地环境里哪些组件被安装、具备哪些能力、又可能带来哪些风险。
            </p>
          </div>

          <div className="surface-grid">
            {surfaces.map((item) => (
              <article className="surface-card" key={item.name}>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <span>{item.signal}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="story section">
          <div className="section-heading">
            <div className="eyebrow">WHY NOW</div>
            <h2>Agent 生态正在快速扩张，安全可见性却几乎空白。</h2>
            <p>
              真正的问题不是用户会不会安装第三方组件，而是装上之后，谁来告诉你它会执行什么、
              读取什么、连接哪里，以及什么时候应该被隔离。AOS 的目标，是成为 Agent 时代每台电脑上的本地安全守护层。
            </p>
          </div>

          <div className="feature-grid">
            {features.map((item) => (
              <article className="feature-card" key={item.title}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery section" id="proof">
          <div className="section-heading narrow">
            <div className="eyebrow">PRODUCT PROOF</div>
            <h2>不是概念稿，而是已经成型的桌面产品工作流。</h2>
            <p>
              页面里不展示抽象示意图，而直接展示当前产品界面。先看整体概览，再进入组件管理与具体分析，这就是 AOS 的产品路径。
            </p>
          </div>

          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <article
                className={`gallery-card gallery-${index + 1}${item.featured ? " featured" : ""}`}
                key={item.title}
              >
                <div className="gallery-copy">
                  <span>{item.title}</span>
                  <p>{item.body}</p>
                </div>
                <img alt={item.title} src={item.image} />
              </article>
            ))}
          </div>
        </section>

        <section className="workflow section" id="workflow">
          <div className="section-heading narrow">
            <div className="eyebrow">OPERATION MODEL</div>
            <h2>从发现到隔离，形成一条可以执行的安全闭环。</h2>
            <p>不是扫描一次就结束，而是把发现、判断和处置连成一条连续路径。</p>
          </div>

          <div className="workflow-rail">
            {workflow.map((step, index) => (
              <div className="workflow-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <div className="use-case-panel">
            <div>
              <span className="eyebrow">USE CASES</span>
              <h3>适合谁</h3>
            </div>
            <ul>
              {useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta section" id="launch">
          <div className="cta-panel">
            <div>
              <div className="eyebrow">PRIVATE PREVIEW</div>
              <h2>不是让 Agent 更强，而是让使用 Agent 这件事更安全。</h2>
              <p>
                如果你们接下来要对外讲清楚产品定位，这一页已经足够承载下载入口、Waitlist、
                Demo 预约或测试版申请。
              </p>

              <div className="launch-actions">
                <a className="button primary" href="#hero">
                  申请体验
                </a>
                <a className="button secondary" href="#proof">
                  浏览界面
                </a>
              </div>
            </div>

            <div className="faq-list">
              <div>
                <span>AOS 是什么</span>
                <p>面向本地 AI Agent 生态的桌面安全控制台。</p>
              </div>
              <div>
                <span>它扫描什么</span>
                <p>Skills、MCP、Plugins、Prompts、Tools 以及它们的高风险行为模式。</p>
              </div>
              <div>
                <span>它的差异点</span>
                <p>它不做“更强的 Agent”，而做“更可控的 Agent Runtime”。</p>
              </div>
              <div>
                <span>运行在哪里</span>
                <p>作为原生桌面应用运行，目标环境包括 macOS、Windows 和 Linux。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section">
        <div className="footer-brand">
          <ShieldMark />
          <div>
            <strong>Agents-of-Shield</strong>
            <p>为本地 AI Agent 生态提供可见性与安全控制。</p>
          </div>
        </div>
        <div className="footer-links">
          <a href="#hero">Top</a>
          <a href="#surface">Surface</a>
          <a href="#proof">Proof</a>
          <a href="#launch">Launch</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
