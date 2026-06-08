import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Background from './Background';
import './index.css';

const easeCustom = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* COMMENTED OUT FOR NOW:
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: easeCustom,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeCustom,
    },
  },
};
*/

const experiences = [
  {
    role: "AI/ML Engineer",
    company: "4th Orbit",
    date: "Jul 2025 – Present",
    points: [
      "Built ML/AI core for two internal products — Orbithyre (AI recruitment) and Gaplytiq (job readiness) — owning end-to-end model development, NLP pipelines, and LLM integration.",
      "Developed candidate–job matching engine (scikit-learn) with feature engineering on skills, experience, and role metadata; improved match quality 45%. Screening pipeline processed 1,000+ profiles, cutting manual review time 60%.",
      "Built NLP pipelines for resume parsing, semantic skill extraction, and ATS-optimized resume generation using Hugging Face Transformers and prompt-chained LLM workflows.",
      "Designed LLM-as-evaluator mock interview system assessing technical depth, role fit, and communication quality with structured feedback generation.",
      "Engineered skill-gap analysis pipeline comparing competency profiles against JD requirements; produced ranked upskilling recommendations via LangChain reasoning chains.",
      "Built recruiter-configurable assessment workflows with dynamic, difficulty-targeted question generation powered by LLM pipelines.",
      "Developed hiring analytics and job-readiness dashboards backed by ML-scored signals and pipeline conversion data."
    ],
    tech: ["Scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "OpenAI API", "FastAPI", "Node/Express", "PostgreSQL", "Docker"]
  },
  {
    role: "Research Intern",
    company: "IIIT Naya Raipur",
    date: "Jan 2024 – Jun 2024",
    points: [
      "Conducted performance analysis of Apache Spark job schedulers for large-scale big data workloads, evaluating 3+ scheduling strategies to optimize resource utilization and execution efficiency.",
      "Benchmarked experiments on 100K+ record datasets, reducing job completion time 25% and improving cluster resource utilization 30% through scheduler tuning.",
      "Analyzed key metrics (latency, throughput, memory usage, task distribution) to identify bottlenecks and optimization opportunities.",
      "Published research findings accepted at TENSYMP 2024, contributing practical insights to big data analytics and distributed computing."
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
          <div className="card-scrollable">
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

function EducationCard() {
  return (
    <motion.div 
      className="education-card"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="edu-glow"></div>
      <h3>B.Tech Hons. in CSE (Data Science)</h3>
      <h4>Chhattisgarh Swami Vivekanand Technical University | 2021 – 2025</h4>
      <div className="edu-footer">
        <span className="cgpa-badge">CGPA: 8.14</span>
        <span className="edu-status">Graduating 2025</span>
      </div>
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
    title: "RetailGPT: AI-Powered Business Intelligence Platform",
    date: "May 2026 – Present",
    link: "https://retail-gpt.vercel.app/",
    problem: "Retail businesses drown in sales data but lack tools to query it without SQL knowledge, detect anomalies in real time, or forecast demand before stock-outs hit. RetailGPT bridges that gap.",
    solution: [
      "Built full-stack BI platform (React, Node.js, Python) enabling natural language querying over 50K-row retail dataset via Text-to-SQL pipeline (OpenAI API) with Supabase/SQLite backend",
      "Developed XGBoost-based demand forecasting and auto-pilot stock reordering system to predict future trends and prevent stock-outs",
      "Implemented Isolation Forest anomaly detection for real-time outlier flagging across revenue, profit, and quantity; extended monitoring to payment logs for exploit pattern detection",
      "Built RAG pipeline (ChromaDB + sentence-transformers) for semantic retrieval over corporate policy documents, enriching chatbot responses with contextual grounding",
      "Engineered automated chart-type inference generating dynamic Recharts visualizations (line, bar, pie, table) based on SQL result shape and query intent",
      "Designed fault-tolerant fallback layer: cloud failure degrades gracefully to local SQLite and keyword matching, ensuring zero-downtime reliability"
    ],
    tech: ["Python", "Node.js", "React", "TypeScript", "XGBoost", "OpenAI API", "ChromaDB", "Sentence-Transformers", "Pandas", "NumPy", "Supabase", "SQLite", "Recharts", "Vite"]
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
      <h2 className="section-title" style={{ marginTop: '4rem' }}>Skills</h2>
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
    <div className="projects-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      {projectsData.map((proj, i) => (
        <motion.div 
          key={i} 
          className="project-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ color: '#00fff9', fontSize: '1.4rem', fontFamily: 'var(--ff)', margin: 0, lineHeight: 1.3 }}>
              {(proj as any).link ? (
                <a href={(proj as any).link} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dotted #00fff9' }}>
                  {proj.title} ↗
                </a>
              ) : (
                proj.title
              )}
            </h3>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{proj.date}</span>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>Problem Statement</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>{proj.problem}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>What I Did</h4>
            <ul style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1.5rem', margin: 0 }}>
              {proj.solution.map((item, j) => <li key={j} style={{ marginBottom: '0.3rem' }}>{item}</li>)}
            </ul>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {proj.tech.map((t, j) => (
              <span key={j} style={{ background: 'rgba(0,255,249,0.1)', color: '#00fff9', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
                {t}
              </span>
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
      <div className="window-content">
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
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  // const lenis = useLenis();

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (curRef.current) {
        curRef.current.style.left = e.clientX - 4 + 'px';
        curRef.current.style.top = e.clientY - 4 + 'px';
      }
    };

    const animRing = () => {
      rxRef.current += (mousePos.x - rxRef.current) * 0.12;
      ryRef.current += (mousePos.y - ryRef.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current - 16 + 'px';
        ringRef.current.style.top = ryRef.current - 16 + 'px';
      }
      requestRef.current = requestAnimationFrame(animRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(2)';
        ringRef.current.style.opacity = '0.5';
      }
    };
    const handleMouseLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1)';
        ringRef.current.style.opacity = '1';
      }
    };

    const interactables = document.querySelectorAll('a, button, .proj-row, .skill-cell');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  /* COMMENTED OUT FOR NOW:
  const scrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  */

  return (
    <ReactLenis root>
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
      <div className="cursor" id="cur" ref={curRef}></div>
      <div className="cursor-ring" id="ring" ref={ringRef}></div>

      {/* LUXURY PILL NAVBAR */}
      <AnimatePresence>
        {!isInsideScreen && (
          <motion.nav
            className="luxury-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: easeCustom }}
          >
            {/* Left Pill Capsule */}
            <div className="nav-capsule-left">
              <div className="nav-logo-circle">TS</div>
              <a href="#about" className="nav-capsule-link" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }}>About</a>
            </div>

            {/* Right Buttons Container */}
            <div className="nav-capsule-right">
              <button className="btn-resume-capsule" onClick={() => window.open(import.meta.env.BASE_URL + 'AI_ML_Engineer.pdf', '_blank')}>RESUME</button>
              <button className="btn-mail-circle" aria-label="Send email" onClick={() => window.location.href = 'mailto:tanishaasinha02@gmail.com'}>
                <svg aria-hidden="true" viewBox="0 0 24 20" width="18" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Typographic Hero Name and Designation Overlay */}
      <div className="hero-container">
        <div className="hero-typographic-block">
          <motion.div
            className="hero-name-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: easeCustom }}
          >
            Tanisha
          </motion.div>
          
          <div className="hero-mid-row">
            <motion.div
              className="hero-designation-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: easeCustom }}
            >
              <span className="hero-designation">AI / ML</span>
              <span className="hero-designation" style={{ marginTop: 0 }}>Engineer</span>
            </motion.div>
            
            <motion.div
              className="hero-name-massive"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeCustom }}
            >
              Sinha
            </motion.div>
          </div>
        </div>
      </div>



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
          <div className="os-container" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}wallpaper.png')` }}>
            
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
                  <h3 className="widget-title">AI/ML Engineer</h3>
                  <h4 className="widget-subtitle">4th Orbit • Jul 2025 – Present</h4>
                  <p className="widget-text">
                    Built recruitment & readiness ML cores, Own end-to-end model development, custom NLP parsers, and Hugging Face/LangChain prompt-chained pipelines.
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
                      <div className="widget-project-title">RetailGPT BI Platform</div>
                      <div className="widget-project-desc">Natural language Text-to-SQL & XGBoost forecasting.</div>
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
                    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                      <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--ff)', textAlign: 'center' }}>Connect With Me</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <a href="mailto:tanishaasinha02@gmail.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
                          <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff00c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Email</span>
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>tanishaasinha02@gmail.com</span>
                          </div>
                        </a>
                        <a href="https://www.linkedin.com/in/tanishasinhaa" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
                          <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>LinkedIn</span>
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Connect professionally</span>
                          </div>
                        </a>
                        <a href="https://github.com/tanisshaaa" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
                          <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>GitHub</span>
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Check out my repositories</span>
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
              <p>I am an AI/ML Engineer at 4th Orbit, building end-to-end ML pipelines, LLM-powered systems, and NLP workflows. I hold a B.Tech (Hons.) in Computer Science (Data Science) from CSVTU (2025, CGPA 8.14).</p>
              <p>My expertise spans Machine Learning, LLM Fine-tuning, Prompt Engineering, RAG, and Agentic AI. I build with FastAPI, Docker, n8n, and Power BI, leveraging frameworks like Hugging Face, LangChain, and the OpenAI API.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReactLenis>
  );
}

export default App;
