import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Background from './Background';
import ParticleField from './ParticleField';
import './index.css';

const easeCustom = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const CONTACT_EMAIL = 'tanishaasinha02@gmail.com';

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.3,
      ease: easeCustom,
    },
  },
};

const heroSummaryStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const heroSummaryItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: easeCustom,
    },
  },
};

const heroFocusAreas = ['LLM Systems', 'NLP', 'RAG', 'Agentic AI'];

const experiences = [
  {
    role: "Team Leader",
    company: "4th Orbit",
    date: "Jul 2026 – Present · 4 mos",
    points: [
      "Currently working as a Team Leader at 4th Orbit, managing a team across multiple projects and coordinating with clients to understand requirements and track project progress.",
      "Managing team tasks and coordinating project execution.",
      "Communicating with clients and helping align project requirements with deliverables.",
      "Staying updated on project progress, new technologies, and developments relevant to our work."
    ],
    tech: ["Scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "OpenAI API", "FastAPI", "Node/Express", "PostgreSQL", "Docker"]
  },
  {
    role: "AI/ML Engineer",
    company: "4th Orbit",
    date: "Jul 2025 – Jul 2026 · 1 yr 1 mo",
    points: [
      "Worked on building AI-powered products for education and recruitment, focusing on integrating LLMs and AI-based evaluation systems into real-world applications.",
      "Gaplytiq (AI-Powered Learning Platform) — Developed an AI-powered interview feature to help users practice and evaluate their interview skills, and built an AI-powered resume maker using LLM integration.",
      "Gaplytiq — Developed an AI agent that analyzes students’ test-series results and provides deeper insights into their performance and learning gaps.",
      "Gaplytiq — Integrated AI features into the application and worked on frontend development to deliver a complete user experience.",
      "OrbitHyre (AI-Powered Recruitment Platform) — Built OrbitHyre from scratch, including job posting and AI-powered candidate screening features.",
      "OrbitHyre — Implemented a hybrid candidate-matching approach to compare resumes with job requirements and help recruiters identify suitable candidates.",
      "OrbitHyre — Worked on AI-based evaluation models to assess candidates as part of the hiring process.",
      "OrbitHyre — Integrated proctoring-enabled assessments to support candidate evaluation during tests.",
      "OrbitHyre — Connected AI capabilities with application workflows to reduce manual effort in the initial screening process."
    ],
    tech: ["Scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "OpenAI API", "FastAPI", "Node/Express", "PostgreSQL", "Docker"]
  },
  {
    role: "Research Intern",
    company: "IIIT-Naya Raipur",
    date: "Jan 2024 – Jun 2024",
    points: [
      "As a Research Intern at IIIT-Naya Raipur, I worked on analyzing the performance of different job schedulers in Apache Spark to improve big data processing.",
      "Compared different scheduling methods, including FIFO, FAIR, and DAG-based scheduling.",
      "Analyzed execution time, resource utilization, and scalability under different workloads.",
      "Studied how job dependencies, task parallelism, and workload balancing affect performance.",
      "Identified effective scheduling approaches for improving the performance of Spark-based data processing.",
      "This research helped me gain practical knowledge of big data processing, performance analysis, and Apache Spark scheduling techniques."
    ],
    tech: ["Apache Spark", "PySpark", "Hadoop", "YARN", "Python", "Pandas", "NumPy", "Jupyter", "Linux"]
  }
];

function ExperienceCard({ exp }: { exp: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="flashcard-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flashcard-front">
          <h3>{exp.role}</h3>
          <h4>{exp.company}</h4>
          <span className="card-date">{exp.date}</span>
          <div className="card-prompt">Hover or tap to flip <span className="blinking-cursor">_</span></div>
        </div>
        <div className="flashcard-back">
          <div className="card-scrollable" data-lenis-prevent>
            <ul className="exp-bullet-list">
              {exp.points.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="tech-stack-pills">
              {exp.tech.map((t: string, i: number) => (
                <span key={i} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const coursework = [
  "Artificial Intelligence: Principles and Applications",
  "Pattern Recognition and Machine Learning",
  "Natural Language Processing and Image Processing",
  "Python for Data Science and R for Data Science",
  "Intelligent Data Analysis and Data Visualization",
  "Big Data Analytics and Apache Spark-related research",
  "Computer Networks, Cloud Computing, and Software Engineering",
  "Data Wrangling, Data Warehousing, and Super Computing",
];

function EducationCard() {
  return (
    <motion.div 
      className="education-card"
      whileHover={{ scale: 1.01, y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="edu-glow"></div>
      <h3>B.Tech Hons. in CSE (Data Science)</h3>
      <h4>Chhattisgarh Swami Vivekanand Technical University | 2021 – 2025</h4>
      <div className="edu-footer">
        <span className="cgpa-badge">CGPA: 8.14</span>
        <span className="edu-status">Graduated 2025</span>
      </div>
      <p className="edu-intro">
        During my B.Tech (Hons.) in Data Science, I studied subjects that built my foundation in Artificial Intelligence, Machine Learning, and data-driven application development.
      </p>
      <h5 className="edu-coursework-title">Relevant coursework</h5>
      <ul className="edu-coursework-list">
        {coursework.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
      <p className="edu-outro">
        These subjects helped me develop a foundation in AI/ML concepts, data analysis, and software development, which I apply in my work as an AI/ML Engineer building AI-powered applications and solutions.
      </p>
    </motion.div>
  );
}

const skillsData = [
  { category: "Core AI & ML", skills: ["Python", "Machine Learning", "LLM Fine-tuning", "Prompt Engineering", "NLP", "RAG", "Agentic AI", "Scikit-learn", "Hugging Face", "n8n Automation"] },
  { category: "Backend & DevOps", skills: ["SQL", "Git & GitHub", "FastAPI", "Docker", "API Integration"] },
  { category: "Data Analytics", skills: ["Data Visualization", "Power BI", "Excel"] }
];

const projectsData = [
  {
    title: "RetailGPT — Autonomous AI Business Analyst",
    date: "May 2026 – Present",
    link: "https://retail-gpt.vercel.app/",
    problem: "An AI-powered business intelligence platform for D2C and retail businesses that analyzes Shopify and Stripe data to identify anomalies, forecast demand, prevent stock-outs, and detect potential payment gateway exploits.",
    solution: [
      "Continuous Anomaly Detection — Identifies unusual patterns in business data.",
      "Predictive Demand Forecasting — Predicts future demand to support inventory planning.",
      "Auto-Pilot Stock Reordering — Automates stock-reordering decisions to help prevent stock-outs.",
      "Payment Gateway Exploits Guard — Monitors payment logs for suspicious patterns and potential exploits."
    ],
    tech: ["React", "Node.js", "Python", "OpenAI API", "XGBoost", "Isolation Forest", "ChromaDB", "Sentence Transformers", "Supabase", "SQLite", "Recharts"]
  },
  {
    title: "Predictive Maintenance for Industrial Machinery",
    date: "Jan 2025",
    problem: "Unplanned machinery downtime and high repair costs required a proactive maintenance system to detect failures before breakdowns occurred.",
    solution: [
      "Developed Streamlit-based predictive maintenance app analyzing historical sensor data to forecast machinery failures.",
      "Trained ML models on 100K+ sensor records, achieving 88%+ prediction accuracy for early failure detection.",
      "Reduced unplanned downtime risk 35%; lowered projected operational repair costs 20%+ through proactive recommendations.",
      "Integrated MySQL for structured storage; built interactive dashboards visualizing health trends, failure probabilities, and maintenance schedules."
    ],
    tech: ["Python", "MySQL", "Scikit-Learn", "Streamlit", "Matplotlib", "Pandas", "NumPy", "Seaborn"]
  },
  {
    title: "Performance Analysis of Apache Spark Job Schedulers",
    date: "Jun 2024",
    problem: "Multi-tenant big data environments suffered from suboptimal resource utilization and long job execution times.",
    solution: [
      "Conducted comparative analysis of Spark schedulers (FIFO, Fair, Capacity) across 3+ workload scenarios; reduced average job execution time 25%.",
      "Improved cluster resource utilization 30% by identifying optimal scheduler for multi-tenant and batch workloads.",
      "Processed 100K+ record datasets using PySpark, simulating real-world big data environments."
    ],
    tech: ["Hadoop", "Apache Spark", "PySpark", "Big Data Analytics", "Performance Benchmarking"]
  }
];

function SkillsSection() {
  return (
    <>
      <h2 className="section-title">Skills</h2>
      <div className="skills-container">
        {skillsData.map((group, idx) => (
          <motion.div 
            key={idx} 
            className="skill-group-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="skill-category">{group.category}</h3>
            <div className="tech-stack-pills">
              {group.skills.map((skill, i) => (
                <span key={i} className="tech-pill skill-badge">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const networkLayers = [
  [{ x: 30, y: 40 }, { x: 30, y: 90 }, { x: 30, y: 140 }],
  [{ x: 140, y: 22 }, { x: 140, y: 68 }, { x: 140, y: 114 }, { x: 140, y: 160 }],
  [{ x: 250, y: 65 }, { x: 250, y: 118 }],
];

function DesktopDoodles() {
  return (
    <div className="desk-doodles" aria-hidden="true">
      <div className="doodle-paper-wash" />
      <svg className="doodle-pattern" width="100%" height="100%">
        <defs>
          <pattern id="desk-doodle-tile" width="340" height="340" patternUnits="userSpaceOnUse" patternTransform="rotate(-3)">
            <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M36 34 L41 48 L56 49 L44 58 L48 73 L36 64 L24 73 L28 58 L16 49 L31 48 Z" />
              <path d="M108 42 q10 -14 20 0 t20 0 t20 0 t20 0" />
              <path d="M236 68 h32 v18 a13 13 0 0 1 -13 13 h-6 a13 13 0 0 1 -13 -13 z" />
              <path d="M268 74 h6 a7 7 0 0 1 0 14 h-6" />
              <path d="M246 58 q-4 -7 0 -14 M258 58 q-4 -7 0 -14" />
              <path d="M58 148 l-13 13 l13 13 M86 148 l13 13 l-13 13 M75 142 l-8 34" />
              <circle cx="178" cy="158" r="20" strokeDasharray="5 7" />
              <path d="M248 188 h40 v28 h-40 z M240 220 h56 l-4 7 h-48 z" />
              <path d="M138 242 v26 M125 255 h26 M130 246 l18 18 M148 246 l-18 18" strokeWidth="1.3" />
              <path d="M38 274 a4 4 0 1 1 6 4 a9 9 0 1 1 -14 -10 a14 14 0 1 1 22 16" />
              <path d="M216 266 a13 13 0 0 1 8 24 v6 h-16 v-6 a13 13 0 0 1 8 -24 z M210 302 h12" />
              <path d="M300 40 l8 18 h-16 z M304 62 v10" />
              <path d="M90 210 q18 -8 36 0 q-18 8 -36 0" />
              <rect x="280" y="210" width="28" height="36" rx="3" />
              <path d="M286 218 h16 M286 226 h16 M286 234 h10" strokeWidth="1.2" />
            </g>
            <g fill="currentColor">
              <circle cx="100" cy="110" r="2" />
              <circle cx="300" cy="150" r="2" />
              <circle cx="260" cy="300" r="2" />
              <circle cx="120" cy="310" r="2" />
              <circle cx="200" cy="80" r="1.6" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#desk-doodle-tile)" />
      </svg>

      <div className="doodle-note">
        <span className="doodle-note-title">Tanisha's desk</span>
        <svg className="doodle-note-underline" viewBox="0 0 220 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M4 9 C 40 2, 70 13, 110 7 S 180 3, 216 8" />
        </svg>
        <span className="doodle-note-hint">pick a sticky note to explore</span>
        <svg className="doodle-note-arrow" viewBox="0 0 120 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M112 6 C 96 40, 56 60, 12 48" />
          <path d="M26 38 L11 48 L25 59" />
        </svg>
      </div>

      <svg className="doodle-sun" viewBox="0 0 200 200" fill="none" strokeLinecap="round">
        <circle cx="100" cy="100" r="46" className="doodle-sun-fill" />
        <circle cx="103" cy="97" r="48" className="doodle-sun-sketch" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 62}
              y1={100 + Math.sin(a) * 62}
              x2={100 + Math.cos(a) * (i % 2 ? 76 : 84)}
              y2={100 + Math.sin(a) * (i % 2 ? 76 : 84)}
              className="doodle-sun-sketch"
              strokeWidth="2.5"
            />
          );
        })}
      </svg>

      <div className="doodle-sticker doodle-sticker-hello">
        <span>hello, world ✦</span>
      </div>
      <div className="doodle-sticker doodle-sticker-ship">
        <span>ship it →</span>
      </div>

      <svg className="doodle-network" viewBox="0 0 280 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {networkLayers.slice(0, -1).flatMap((layer, li) =>
          layer.flatMap((a, ai) =>
            networkLayers[li + 1].map((b, bi) => (
              <line key={`${li}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} opacity="0.5" />
            ))
          )
        )}
        {networkLayers.flat().map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="9" className="doodle-node" strokeWidth="2" />
        ))}
        <text x="140" y="194" textAnchor="middle" className="doodle-caption">model.fit(coffee)</text>
      </svg>

      <svg className="doodle-mug" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 48 h60 v30 a22 22 0 0 1 -22 22 h-16 a22 22 0 0 1 -22 -22 z" className="doodle-mug-fill" />
        <path d="M82 56 h8 a12 12 0 0 1 0 24 h-8" />
        <path d="M38 38 q-7 -10 0 -20 M52 38 q-7 -10 0 -20 M66 38 q-7 -10 0 -20" />
        <path d="M34 66 q8 6 16 0 t16 0" opacity="0.6" />
      </svg>

      <svg className="doodle-scribble" viewBox="0 0 180 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 40 C 30 10, 50 70, 72 40 S 114 10, 136 42 S 164 68, 172 36" />
        <path d="M20 58 C 48 48, 70 72, 98 54 S 140 40, 168 60" opacity="0.55" />
      </svg>
    </div>
  );
}

function DesktopIcon({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <motion.div 
      className="desktop-icon"
      role="button"
      aria-label={`Open ${label}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-container">{icon}</div>
      <span className="icon-label">{label}</span>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <div className="projects-wrapper">
      {projectsData.map((proj, i) => (
        <motion.div 
          key={i} 
          className="project-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="project-card-head">
            <h3 className="project-card-title">
              {'link' in proj && proj.link ? (
                <a href={proj.link} target="_blank" rel="noreferrer">
                  {proj.title} ↗
                </a>
              ) : (
                proj.title
              )}
            </h3>
            <span className="project-card-date">{proj.date}</span>
          </div>
          
          <div className="project-card-block">
            <h4 className="project-card-label">Problem Statement</h4>
            <p className="project-card-text">{proj.problem}</p>
          </div>

          <div className="project-card-block">
            <h4 className="project-card-label">What I Did</h4>
            <ul className="project-card-list">
              {proj.solution.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>

          <div className="tech-stack-pills">
            {proj.tech.map((t, j) => (
              <span key={j} className="tech-pill">{t}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AppWindow({ title, onClose, icon, children }: { title: string, onClose: () => void, icon?: React.ReactNode, children: React.ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      
      if (!windowRef.current) return;
      
      const focusableElements = windowRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element on mount
    if (windowRef.current) {
      const focusableElements = windowRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        windowRef.current.focus();
      }
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div 
      ref={windowRef as any}
      tabIndex={-1}
      className="app-window"
      initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
      transition={{ type: "spring", bounce: 0.2 }}
    >
      <div className="window-taskbar">
        <div className="window-title-container">
          {icon && <div className="window-icon-small">{icon}</div>}
          <span className="window-title-text">{title}</span>
        </div>
        <button className="window-close-btn" onClick={onClose} aria-label="Close window">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="window-content" data-lenis-prevent>
        {children}
      </div>
    </motion.div>
  );
}

function TaskbarClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000); // Update every 10 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar-time">
      <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      <span style={{ fontSize: '0.65rem' }}>{time.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
    </div>
  );
}

function App() {
  // Lenis context is only available under <ReactLenis>, so hooks that need it live in PortfolioShell
  return (
    <ReactLenis root options={{ allowNestedScroll: true }}>
      <PortfolioShell />
    </ReactLenis>
  );
}

function PortfolioShell() {
  const cursorIconRef = useRef<HTMLDivElement>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, (v) => Math.max(0, 1 - v / (window.innerHeight * 0.55)));
  const heroY = useTransform(scrollY, (v) => v * 0.35);
  const heroBlur = useTransform(scrollY, (v) => {
    const blur = Math.min(8, (v / window.innerHeight) * 14);
    return blur < 0.2 ? 'none' : `blur(${blur}px)`;
  });
  const atmosphereOpacity = useTransform(scrollY, (v) => Math.max(0, 1 - v / (window.innerHeight * 0.8)));
  const scrollCueOpacity = useTransform(scrollY, (v) => Math.max(0, 1 - v / (window.innerHeight * 0.18)));

  const [isInsideScreen, setIsInsideScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the navbar when the user scrolls down more than 100vh (into the 3D screen animation)
      if (window.scrollY > window.innerHeight * 1.0) {
        setIsInsideScreen(true);
      } else {
        setIsInsideScreen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pointer cursor icon on the hero (system cursor hidden there only)
  useEffect(() => {
    document.documentElement.classList.toggle('hero-cursor', !isInsideScreen);
    return () => document.documentElement.classList.remove('hero-cursor');
  }, [isInsideScreen]);

  useEffect(() => {
    if (isInsideScreen) return;
    const el = cursorIconRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.classList.add('is-visible');
    };
    const onLeave = () => el.classList.remove('is-visible');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [isInsideScreen]);

  const enterWorkspace = () => {
    const target = document.getElementById('work');
    if (!target) return;
    if (lenis && !prefersReducedMotion) {
      // Long eased scroll so the camera dive in Background plays out instead of jumping
      lenis.scrollTo(target, { duration: 2.8, easing: easeInOutCubic });
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const openEmailModal = () => {
    setEmailCopied(false);
    setIsEmailOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
    } catch {
      // Fallback for older browsers / denied clipboard
      const input = document.createElement('input');
      input.value = CONTACT_EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setEmailCopied(true);
    }
  };

  return (
    <>
      {/* Hidden SVG Filter for Pixel Glitch Effect */}
      <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id="pixelate-glitch">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.8" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.02 0.8;0.05 0.1;0.01 0.9;0.02 0.8" dur="0.4s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -2" in="noise" result="coloredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <Background />
      <ParticleField active={!isInsideScreen} reducedMotion={prefersReducedMotion} />

      {!isInsideScreen && (
        <div className="hero-cursor-icon" ref={cursorIconRef} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5.5 3.2 L5.5 18.8 L10.2 14.6 L13.1 21.2 L15.6 20.1 L12.6 13.4 L18.5 13.2 Z"
              fill="var(--ink)"
              stroke="var(--paper)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Soft paper wash + vignette that blends the hero type into the 3D desk */}
      <motion.div className="hero-atmosphere" aria-hidden="true" style={{ opacity: atmosphereOpacity }} />

      {/* LUXURY PILL NAVBAR */}
      <AnimatePresence>
        {!isInsideScreen && (
          <motion.nav
            className="luxury-nav"
            aria-label="Primary"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeCustom }}
          >
            {/* Left Pill Capsule */}
            <div className="nav-capsule-left">
              <div className="nav-logo-circle" aria-hidden="true">TS</div>
              <a href="#about" className="nav-capsule-link" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }}>About</a>
            </div>

            {/* Right Buttons Container */}
            <div className="nav-capsule-right">
              <a className="btn-resume-capsule" href={import.meta.env.BASE_URL + 'AI_ML_Engineer.pdf'} target="_blank" rel="noreferrer">
                RESUME
                <span className="btn-resume-arrow" aria-hidden="true">↗</span>
              </a>
              <button type="button" className="btn-mail-circle" aria-label="Connect with me" onClick={openEmailModal}>
                <svg aria-hidden="true" viewBox="0 0 24 20" width="18" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Typographic Hero: name + designation, short bio, CTA */}
      <motion.div
        className="hero-container"
        style={prefersReducedMotion ? { opacity: heroOpacity } : { opacity: heroOpacity, y: heroY, filter: heroBlur }}
      >
        <motion.div
          className="hero-typographic-block"
          variants={heroStagger}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
        >
          <h1 className="hero-title" aria-label="Tanisha Sinha, Team Leader">
            <motion.span className="hero-reveal" variants={heroItem}>
              <span className="hero-name-primary">Tanisha</span>
            </motion.span>

            <span className="hero-mid-row">
              <motion.span className="hero-designation-col" variants={heroItem}>
                <span className="hero-designation">AI / ML</span>
                <span className="hero-designation" style={{ marginTop: 0 }}>Team Leader</span>
              </motion.span>

              <motion.span className="hero-reveal" variants={heroItem}>
                <span className="hero-name-massive">Sinha</span>
              </motion.span>
            </span>
          </h1>

          <motion.div className="hero-summary-block" variants={heroSummaryStagger}>
            <motion.p className="hero-bio" variants={heroSummaryItem}>
              Team Leader at <strong>4th Orbit</strong>, managing projects across the team and coordinating with clients to ship AI-powered products.
            </motion.p>
            <motion.ul className="hero-skills-mini" aria-label="Focus areas" variants={heroSummaryItem}>
              {heroFocusAreas.map((area) => (
                <li key={area} className="hero-skill-tag">{area}</li>
              ))}
            </motion.ul>
            <motion.div className="hero-actions-row" variants={heroSummaryItem}>
              <button type="button" className="hero-cta-primary" onClick={enterWorkspace}>
                Explore my work
                <span className="hero-cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </span>
              </button>
              <button type="button" className="hero-cta-link" onClick={openEmailModal}>Get in touch</button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue into the 3D laptop dive */}
      <motion.div className="hero-scroll-cue" aria-hidden="true" style={{ opacity: scrollCueOpacity }}>
        <motion.div
          className="scroll-cue-capsule"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: easeCustom }}
        >
          <span className="scroll-cue-track"><span className="scroll-cue-dot" /></span>
          <span className="scroll-cue-label">Scroll to enter</span>
        </motion.div>
      </motion.div>



      {/* Scroll spacer to trigger the 3D camera dive animation */}
      <div style={{ height: '200vh', pointerEvents: 'none' }} />

      {/* Inside the Screen - Experience & Education Section */}
      <div className="experience-section" id="work">
        <motion.div 
          className="experience-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.0, ease: easeCustom }}
        >
          <div className="os-container">
            <DesktopDoodles />

            <div className="desktop-workspace">
              <div className="desktop-grid">
                <DesktopIcon 
                  label="Education" 
                  onClick={() => setActiveApp('education')} 
                  icon={<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>} 
                />
                <DesktopIcon 
                  label="Experience" 
                  onClick={() => setActiveApp('experience')} 
                  icon={<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>} 
                />
                <DesktopIcon 
                  label="Skills" 
                  onClick={() => setActiveApp('skills')} 
                  icon={<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>} 
                />
                <DesktopIcon 
                  label="Projects" 
                  onClick={() => setActiveApp('projects')} 
                  icon={<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>} 
                />
                <DesktopIcon 
                  label="Socials" 
                  onClick={() => setActiveApp('socials')} 
                  icon={<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>} 
                />
              </div>

              {/* Desktop Sticky Preview Widgets */}
              <div className="desktop-widgets">
                {/* Active Experience Card */}
                <div 
                  className="widget-card widget-experience" 
                  onClick={() => setActiveApp('experience')} 
                  role="button" 
                  tabIndex={0} 
                  aria-label="Experience overview. Click to open Experience app."
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp('experience')}
                >
                  <div className="widget-header">
                    <span className="widget-badge">EXPERIENCE PREVIEW</span>
                    <span className="widget-action-hint">Explore App ↗</span>
                  </div>
                  <h3 className="widget-title">Team Leader</h3>
                  <h4 className="widget-subtitle">4th Orbit • Jul 2026 – Present · 4 mos</h4>
                  <p className="widget-text">
                    Managing a team across multiple projects and coordinating with clients to understand requirements and track project progress.
                  </p>
                </div>

                {/* Active Projects Card */}
                <div 
                  className="widget-card widget-projects" 
                  onClick={() => setActiveApp('projects')} 
                  role="button" 
                  tabIndex={0} 
                  aria-label="Projects list. Click to open Projects app."
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp('projects')}
                >
                  <div className="widget-header">
                    <span className="widget-badge">LATEST PROJECTS</span>
                    <span className="widget-action-hint">View All ↗</span>
                  </div>
                  <div className="widget-project-item">
                    <span className="project-dot"></span>
                    <div>
                      <div className="widget-project-title">RetailGPT — AI Business Analyst</div>
                      <div className="widget-project-desc">Shopify & Stripe BI: anomalies, demand forecast, stock reorder & payment guards.</div>
                    </div>
                  </div>
                  <div className="widget-project-item">
                    <span className="project-dot"></span>
                    <div>
                      <div className="widget-project-title">Industrial Predictive Maintenance</div>
                      <div className="widget-project-desc">Failure prediction on 100K+ records with 88% sensor accuracy.</div>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeApp === 'education' && (
                  <AppWindow 
                    key="education" 
                    title="Education.exe" 
                    onClose={() => setActiveApp(null)}
                    icon={<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                  >
                    <EducationCard />
                  </AppWindow>
                )}
                {activeApp === 'experience' && (
                  <AppWindow 
                    key="experience" 
                    title="Experience.exe" 
                    onClose={() => setActiveApp(null)}
                    icon={<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                  >
                    <div className="flashcards-wrapper">
                      {experiences.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} />
                      ))}
                    </div>
                  </AppWindow>
                )}
                {activeApp === 'skills' && (
                  <AppWindow 
                    key="skills" 
                    title="Skills.exe" 
                    onClose={() => setActiveApp(null)}
                    icon={<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                  >
                    <SkillsSection />
                  </AppWindow>
                )}
                {activeApp === 'projects' && (
                  <AppWindow 
                    key="projects" 
                    title="Projects.exe" 
                    onClose={() => setActiveApp(null)}
                    icon={<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>}
                  >
                    <ProjectsSection />
                  </AppWindow>
                )}
                {activeApp === 'socials' && (
                  <AppWindow 
                    key="socials" 
                    title="Social_Profiles.exe" 
                    onClose={() => setActiveApp(null)}
                    icon={<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>}
                  >
                    <div className="socials-panel">
                      <h2 className="socials-title">Connect With Me</h2>
                      <div className="socials-list">
                        <button type="button" className="social-link" onClick={openEmailModal}>
                          <svg className="social-link-icon social-link-icon--email" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <div className="social-link-text">
                            <span className="social-link-name">Email</span>
                            <span className="social-link-meta">{CONTACT_EMAIL}</span>
                          </div>
                        </button>
                        <a href="https://www.linkedin.com/in/tanishasinhaa" target="_blank" rel="noreferrer" className="social-link">
                          <svg className="social-link-icon social-link-icon--linkedin" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          <div className="social-link-text">
                            <span className="social-link-name">LinkedIn</span>
                            <span className="social-link-meta">Connect professionally</span>
                          </div>
                        </a>
                        <a href="https://github.com/tanisshaaa" target="_blank" rel="noreferrer" className="social-link">
                          <svg className="social-link-icon" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                          <div className="social-link-text">
                            <span className="social-link-name">GitHub</span>
                            <span className="social-link-meta">Check out my repositories</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </AppWindow>
                )}
              </AnimatePresence>
            </div>

            <div className="taskbar">
              <div className="taskbar-left">
                <div className="taskbar-btn start-btn" title="Start Menu">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg>
                </div>
                <div className="taskbar-search">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Search
                </div>
              </div>
              
              <div className="taskbar-center">
                <div 
                  className={`taskbar-btn ${activeApp === 'education' ? 'active' : ''}`}
                  title="Education (B.Tech Computer Science)"
                  onClick={() => setActiveApp(activeApp === 'education' ? null : 'education')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp(activeApp === 'education' ? null : 'education')}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div 
                  className={`taskbar-btn ${activeApp === 'experience' ? 'active' : ''}`}
                  title="Experience (Work history at 4th Orbit)"
                  onClick={() => setActiveApp(activeApp === 'experience' ? null : 'experience')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp(activeApp === 'experience' ? null : 'experience')}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div 
                  className={`taskbar-btn ${activeApp === 'skills' ? 'active' : ''}`}
                  title="Skills (AI, ML, Backend, DevOps)"
                  onClick={() => setActiveApp(activeApp === 'skills' ? null : 'skills')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp(activeApp === 'skills' ? null : 'skills')}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div 
                  className={`taskbar-btn ${activeApp === 'projects' ? 'active' : ''}`}
                  title="Projects (AI Platforms & Analytics)"
                  onClick={() => setActiveApp(activeApp === 'projects' ? null : 'projects')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp(activeApp === 'projects' ? null : 'projects')}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <div 
                  className={`taskbar-btn ${activeApp === 'socials' ? 'active' : ''}`}
                  title="Social Profiles & Contact"
                  onClick={() => setActiveApp(activeApp === 'socials' ? null : 'socials')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveApp(activeApp === 'socials' ? null : 'socials')}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
              </div>

              <div className="taskbar-right">
                <div className="taskbar-btn">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                </div>
                <TaskbarClock />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isAboutOpen && (
          <motion.div
            className="glass-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAboutOpen(false)}
          >
            <motion.div
              className="glass-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="glass-modal-close" aria-label="Close about modal" onClick={() => setIsAboutOpen(false)}>×</button>
              <div className="glass-modal-socials">
                <a href="https://www.linkedin.com/in/tanishasinhaa" target="_blank" rel="noreferrer">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/tanisshaaa" target="_blank" rel="noreferrer">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <h2>About Me</h2>
              <p>I am a Team Leader at 4th Orbit, managing a team across multiple projects and coordinating with clients to understand requirements and track progress. I hold a B.Tech (Hons.) in Computer Science (Data Science) from CSVTU (2025, CGPA 8.14).</p>
              <p>My expertise spans Machine Learning, LLM Fine-tuning, Prompt Engineering, RAG, and Agentic AI. I build with FastAPI, Docker, n8n, and Power BI, leveraging frameworks like Hugging Face, LangChain, and the OpenAI API.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEmailOpen && (
          <motion.div
            className="glass-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEmailOpen(false)}
          >
            <motion.div
              className="email-modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-modal-title"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="email-modal-close" aria-label="Close email modal" onClick={() => setIsEmailOpen(false)}>×</button>
              <p className="email-modal-eyebrow">Say hello</p>
              <h2 id="email-modal-title">Connect with me here</h2>
              <p className="email-modal-body">Copy my email and reach out whenever you'd like to chat about AI, products, or collaboration.</p>
              <div className="email-modal-row">
                <code className="email-modal-address" tabIndex={0}>{CONTACT_EMAIL}</code>
                <button type="button" className="email-modal-copy" onClick={copyEmail}>
                  {emailCopied ? 'Copied!' : 'Copy email'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
