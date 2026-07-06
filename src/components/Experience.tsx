import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const experiences = [
  {
    title: "Technical Lead",
    company: "HCL Tech",
    fullCompany: "HCL Tech (Client: Emirates NBD)",
    date: "May 2024 – Present",
    responsibilities: [
      "Architected a high-performance Node.js/TypeScript orchestration framework and automated CI/CD pipelines, reducing development effort by 55%.",
      "Led end-to-end migration of a core Credit Card app to a scalable Node.js distributed system, reducing operational costs by 40% and increasing efficiency by 30%.",
      "Engineered an automated E2E testing suite using Playwright and Claude (MCP), reducing manual testing effort by 75% and accelerating releases.",
      "Led cross-functional teams in code/architecture reviews and technology selection to guarantee system scale, performance, and quality."
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "MatchLog Solutions",
    fullCompany: "MatchLog Solutions Private Limited, Bengaluru",
    date: "Apr 2021 – May 2024",
    responsibilities: [
      "Designed scalable real-time logistics systems (TMS, TRI, CASA) with robust Jest testing, driving a 30% improvement in fleet utilization.",
      "Architected a service-oriented platform (Node.js/React/Angular) supporting 100,000+ monthly container reuse operations via offline batching and messaging.",
      "Directed end-to-end delivery of supply chain optimization projects through agile planning, mitigating empty transport runs by 40%.",
      "Engineered highly reusable frontend components and optimized Node.js backends (RxJS/TypeScript), decreasing development workload by 50%.",
      "Implemented single-spa micro-frontend architecture to enhance maintainability and reduce enterprise application page load times by 35%.",
      "Automated deployments across Docker and Kubernetes environments via Jenkins CI/CD pipelines, accelerating release cycles by 40%.",
      "Mentored a team of 5+ developers, establishing engineering best practices through rigorous code and architecture reviews."
    ]
  },
  {
    title: "Software Engineer (Grade 2)",
    company: "Shiplyst Systems",
    fullCompany: "Shiplyst Systems Private Limited, Bengaluru",
    date: "Aug 2019 – Mar 2021",
    responsibilities: [
      "Automated third-party API data retrieval processes, achieving a 50% reduction in processing time.",
      "Designed a high-performance search matching algorithm, reducing API response latency by 45%.",
      "Developed globally reusable Angular UI components and validators, accelerating feature delivery by 30%.",
      "Maintained 99.9% defect-free major production releases through rigorous debugging and Test-Driven Development (TDD)."
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Canvas Digital",
    fullCompany: "Canvas Digital, Bengaluru",
    date: "Nov 2018 – Aug 2019",
    responsibilities: [
      "Developed a full-stack booking engine with e-commerce integration, driving a 25% increase in online appointments.",
      "Engineered a marketplace bidding portal with optimized backend architecture to handle 10,000+ concurrent users."
    ]
  },
  {
    title: "Programmer Scale-1",
    company: "Intecons Lab",
    fullCompany: "Intecons Software Lab, Bengaluru",
    date: "Jan 2017 – Jan 2018",
    responsibilities: [
      "Engineered a real-time WebSocket chat application facilitating communications for 5,000+ active users.",
      "Integrated mapping and autocomplete APIs for advanced real-time features, improving user engagement by 20%."
    ]
  }
]

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="experience" className="py-24 relative z-10 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#00ff66]/20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-16 text-center text-white tracking-tighter"
      >
        <span className="text-[#00ff66] font-mono text-xl sm:text-3xl md:text-4xl mr-2">02.</span>WORK<span className="text-[#7000ff]">_EXPERIENCE</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* Left Column: Navigation Tabs */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide border-b lg:border-b-0 lg:border-l border-white/10 lg:pl-4">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-shrink-0 text-left px-6 py-4 lg:py-5 font-mono text-sm uppercase tracking-wider transition-all duration-300 relative border-l-2 lg:border-l-0 lg:border-l-2 ${
                activeTab === idx 
                  ? 'text-[#00ff66] border-[#00ff66] bg-[#00ff66]/5' 
                  : 'text-[#888] border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="opacity-50 text-xs">0{idx + 1}</span>
                {exp.company}
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Experience Details */}
        <div className="lg:col-span-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 md:p-10 border-[#00ff66]/30 h-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    {experiences[activeTab].title}
                  </h3>
                  <p className="text-[#00ff66] font-mono text-sm md:text-base">
                    @ {experiences[activeTab].fullCompany}
                  </p>
                </div>
                <span className="font-mono text-[#7000ff] text-sm tracking-wider border border-[#7000ff]/30 bg-[#7000ff]/10 px-4 py-2 rounded-full whitespace-nowrap">
                  {experiences[activeTab].date}
                </span>
              </div>
              
              <ul className="space-y-5 text-[#b0b0b0]">
                {experiences[activeTab].responsibilities.map((resp, i) => (
                  <li key={i} className="relative pl-8 before:content-['▹'] before:absolute before:left-0 before:top-0 before:text-[#00ff66] before:text-lg before:leading-tight">
                    {resp}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
