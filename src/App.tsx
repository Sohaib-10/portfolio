/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Shield,
  Terminal,
  Code2,
  Database,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Users,
  Wrench,
  ArrowUpRight,
  ArrowRight,
  Cpu,
  FileText,
  Youtube,
  Facebook
} from 'lucide-react';

const basePath = '/portfolio/';
const ease = [0.16, 1, 0.3, 1];
const cardInView = { once: true, amount: 0.15 } as const;

const getPublicFileHref = (filename: string) =>
  `${basePath}${encodeURIComponent(filename)}?v=${Date.now()}`;

const reportButtonBaseClassName =
  'inline-flex items-center justify-center gap-2 md:gap-2.5 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-[12px] md:text-[14px] font-bold tracking-tight active:scale-[0.98] transition-all group/btn bg-transparent';

const getReportButtonClassName = (variant: 'primary' | 'burp' = 'primary') =>
  variant === 'burp'
    ? `${reportButtonBaseClassName} text-[#FF6633] border-2 border-[#FF6633] hover:bg-[#FF6633]/10 hover:shadow-[0_0_32px_rgba(255,102,51,0.3)]`
    : `${reportButtonBaseClassName} text-brand-primary border-2 border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_32px_rgba(59,130,246,0.3)]`;

const githubButtonClassName =
  'inline-flex items-center justify-center gap-2 md:gap-2.5 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-[12px] md:text-[14px] font-bold tracking-tight active:scale-[0.98] transition-all group/btn bg-white text-black border border-white/80 shadow-[0_0_32px_rgba(255,255,255,0.2)] hover:shadow-[0_0_48px_rgba(255,255,255,0.35)] hover:bg-neutral-200';

interface NavbarProps {
  activeSection: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Labs', href: '#labs', id: 'labs' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Stack', href: '#skills', id: 'skills' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Creator', href: '#creator', id: 'creator' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 transition-all duration-500 pointer-events-none flex justify-center px-6">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className={`hidden md:flex items-center gap-2 p-1.5 rounded-full border pointer-events-auto transition-all duration-700 ${isScrolled
            ? 'glass-panel shadow-2xl px-6'
            : 'bg-transparent border-transparent px-2'
            }`}
        >
          <div className="flex items-center gap-8 px-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-semibold tracking-tight transition-colors py-2 relative flex flex-col items-center ${isActive ? 'text-white font-bold' : 'text-white/50 hover:text-white'
                    }`}
                >
                  {link.name}
                  {/* Clean static active underline (no scroll-tick rendering) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLinkUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          <a href={`${basePath}Sohaib%20Resume.pdf?v=${Date.now()}`} download="Sohaib Resume.pdf">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-white text-black text-[13px] font-bold tracking-tight hover:bg-white/90 transition-all cursor-pointer flex items-center gap-2"
            >
              Resume <ArrowDownToLine className="w-3.5 h-3.5" />
            </motion.button>
          </a>
          <a href="#contact" className="ml-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-brand-primary text-white text-[13px] font-bold tracking-tight hover:bg-brand-primary/90 transition-all cursor-pointer"
            >
              Contact
            </motion.button>
          </a>
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden fixed top-6 right-6 z-50 pointer-events-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm z-40 bg-brand-bg md:hidden flex flex-col justify-center items-center pointer-events-auto border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col items-center gap-8 w-full px-8">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, ease }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-bold tracking-tight transition-colors flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'
                        }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      )}
                    </motion.a>
                  );
                })}
                <motion.a
                  href={`${basePath}Sohaib%20Resume.pdf?v=${Date.now()}`}
                  download="Sohaib Resume.pdf"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.1, ease }}
                  className="mt-6 w-full py-4 bg-white text-black rounded-full font-bold text-[15px] text-center hover:bg-neutral-200 transition-colors"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// SVG component missing in original, added here
const ArrowDownToLine = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden px-6">
      <TerminalBackground />
      <motion.div style={{ y: y1, opacity }} className="flex flex-col items-center text-center max-w-5xl relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="mb-6 px-4 py-1.5 rounded-full glass border border-brand-primary/30 text-brand-primary text-xs font-bold tracking-widest uppercase"
        >
          Cybersecurity & Engineering
        </motion.div>

        <h1 className="text-[clamp(3rem,10vw,120px)] font-extrabold text-white tracking-tighter leading-[1.1] mb-6">
          Sohaib Tausif<span className="text-brand-primary">.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="text-[15px] md:text-[18px] leading-relaxed text-white/70 max-w-2xl font-normal tracking-tight mb-12 text-left md:text-justify word-gap-mobile"
        >
          Security and systems, that's where most of my work lives. Database engineering, secure backend development, and applied cybersecurity, rooted in industry standards and shaped by hands-on testing. New tools and technologies are just problems I haven't solved yet. Outside of that, a YouTube channel I once built from scratch hit 2 million views, turns out the same curiosity drives everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-[15px] tracking-tight flex items-center gap-2 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </motion.button>

          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="w-5 h-5" />, href: 'https://github.com/Sohaib-10' },
              { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394' },
              { icon: <Mail className="w-5 h-5" />, href: 'mailto:sohaibtausif141@gmail.com' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[150px] -z-10 mix-blend-screen" />
    </section>
  );
};

const ProjectCard = ({
  title,
  stack,
  description,
  delay,
  link,
  report,
  reportVariant = 'primary',
  imageUrl,
  objectPosition = 'center 20%'
}: {
  title: string;
  stack: string;
  description: string;
  delay: number;
  link?: string;
  report?: string;
  reportVariant?: 'primary' | 'burp';
  imageUrl?: string;
  objectPosition?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={cardInView}
      transition={{ delay, duration: 0.8, ease }}
      className="group relative flex flex-col h-full rounded-[32px] overflow-hidden glass-panel glass-hover p-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] mb-6 bg-white/[0.02] flex items-center justify-center">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-70 group-hover:opacity-100"
              style={{ objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Terminal className="w-12 h-12 text-white/10 group-hover:scale-110 transition-transform duration-700" />
          </>
        )}

        {link && (
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-all"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-6 md:pb-8 flex flex-col flex-grow relative">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-4 md:right-6 text-white/40 hover:text-white transition-colors p-2 z-10"
          >
            <Github className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        )}

        <div className="flex flex-wrap gap-2 mb-4 md:mb-6 pr-8 md:pr-10">
          {stack.split(' · ').map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight mb-3 md:mb-4 group-hover:text-brand-primary transition-colors duration-500 pr-4 md:pr-10">
          {title}
        </h3>

        <div className={`text-white/50 text-[13px] md:text-[15px] leading-relaxed font-medium mb-4 md:mb-8 flex-grow ${isExpanded ? 'block' : 'hidden md:block'}`}>
          {description}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-brand-primary text-[12px] font-bold mb-4 md:mb-6 text-left flex items-center gap-1 mt-auto"
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>

        <div className="mt-auto md:mt-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={githubButtonClassName}
            >
              View on GitHub
              <Github className="w-4 h-4" />
            </a>
          ) : report ? (
            <a
              href={getPublicFileHref(report)}
              download={report}
              className={getReportButtonClassName(reportVariant)}
            >
              View Report
              <FileText className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 group/btn">
              <span className="text-[13px] font-bold text-white/50 tracking-tight">Internal Details</span>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SideProjectCard = ({ title, description, delay, link, linkType = 'live', reportVariant = 'primary', featured = false }: { title: string, description: string, delay: number, link?: string, linkType?: 'live' | 'github' | 'report', reportVariant?: 'primary' | 'burp', featured?: boolean, key?: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={cardInView}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel p-6 md:p-10 rounded-[32px] flex flex-col group glass-hover h-full relative ${featured ? 'border-2 featured-outline-glow' : ''
        }`}
    >
      {featured && (
        <div className="absolute -top-3 right-6 md:right-8 z-10 px-3 py-1 rounded-full bg-brand-bg border-2 featured-outline-glow text-[10px] md:text-[11px] font-bold text-brand-primary uppercase tracking-widest">
          Featured
        </div>
      )}
      <h4 className="text-[15px] md:text-[17px] font-bold text-white tracking-tight mb-3 md:mb-4 group-hover:text-brand-primary transition-colors duration-500">
        {title}
      </h4>
      <div className={`text-[13px] md:text-[15px] text-white/50 leading-relaxed font-medium mb-4 md:mb-0 flex-grow ${isExpanded ? 'block' : 'line-clamp-2 md:line-clamp-none'}`}>
        {description}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden text-brand-primary text-[12px] font-bold text-left flex items-center gap-1 mt-auto pt-2"
      >
        {isExpanded ? 'Hide Details' : 'View Details'}
      </button>
      {link && linkType === 'report' ? (
        <a
          href={getPublicFileHref(link)}
          download={link}
          className={`mt-6 self-start ${getReportButtonClassName(reportVariant)}`}
        >
          View Report
          <FileText className="w-4 h-4" />
        </a>
      ) : link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 self-start ${linkType === 'github'
              ? githubButtonClassName
              : 'inline-flex items-center justify-center gap-2 md:gap-2.5 px-5 py-2.5 md:px-7 md:py-3.5 rounded-full text-[12px] md:text-[14px] font-bold tracking-tight active:scale-[0.98] transition-all group/btn bg-brand-primary text-white border border-brand-primary/50 shadow-[0_0_32px_rgba(59,130,246,0.45)] hover:shadow-[0_0_48px_rgba(59,130,246,0.65)] hover:brightness-110'
            }`}
        >
          {linkType === 'github' ? 'View on GitHub' : 'Visit Live App'}
          {linkType === 'github' ? (
            <Github className="w-4 h-4" />
          ) : (
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          )}
        </a>
      ) : null}
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: 'GIKI University',
      role: 'Cybersecurity Enthusiast & Programmer',
      period: '2024 — Present',
      description:
        'Pursuing a BS in Cybersecurity at GIKI while engineering secure systems in C++ and Python, building backend platforms with PostgreSQL, and deepening expertise in network security and threat detection.'
    },
    {
      company: 'Event Management & Leadership',
      role: 'Lead Organizer',
      description:
        'Orchestrated high-impact campus initiatives, including career fairs, educational expos, and Model United Nations (MUN) conferences. Managed end-to-end logistics, stakeholder relations, and multi-disciplinary teams for large-scale execution.'
    }
  ];

  return (
    <section id="experience" className="py-40 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-brand-primary font-bold text-[12px] tracking-[4px] uppercase mb-4 block">
            Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Evolution<span className="text-white/20">.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2" />

          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Glowing Dot */}
                <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10" />

                <div className="w-full md:w-1/2 flex flex-col px-12 md:px-0">
                  <div className={`flex flex-col items-start text-left ${i % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                    {exp.period && (
                      <span className="text-[12px] font-bold text-brand-primary font-mono uppercase tracking-[2px] mb-4">
                        {exp.period}
                      </span>
                    )}
                    <h3 className="text-3xl font-bold text-white mb-2">{exp.company}</h3>
                    <p className="text-lg font-medium text-white/40 mb-6 font-mono tracking-tight">
                      {exp.role}
                    </p>
                    <p className="text-white/50 text-[13px] md:text-[15px] leading-relaxed max-w-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 className="w-6 h-6" />,
      skills: ['C++', 'Python', 'SQL', 'Node.js (Basic)']
    },
    {
      title: 'Cybersecurity',
      icon: <Shield className="w-6 h-6" />,
      skills: [
        'Network Security',
        'SOC Fundamentals',
        'Cryptography',
        'Web Application Security',
        'Vulnerability Assessment',
        'SIEM',
        'Threat Detection & Analysis'
      ]
    },
    {
      title: 'Web & Database',
      icon: <Database className="w-6 h-6" />,
      skills: ['FastAPI', 'PostgreSQL', 'Supabase', 'Vercel', 'Figma']
    },
    {
      title: 'Tools & Technologies',
      icon: <Wrench className="w-6 h-6" />,
      skills: ['Git & GitHub', 'Splunk', 'Burp Suite', 'Linux (Basic)', 'Shodan', 'Web Scraping (Python, Beautiful Soup)', 'Jira']
    },
    {
      title: 'Hardware & Systems',
      icon: <Cpu className="w-6 h-6" />,
      skills: ['Verilog / FPGA', 'SAP-1 Architecture', 'Microprogrammed Control Units', 'C++ / Assembly (x86)', 'Computer Organization']
    }
  ];

  return (
    <section id="skills" className="py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-4 block">
            Technology Stack
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Expertise<span className="text-brand-primary">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={cardInView}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover relative overflow-hidden flex flex-col"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/5 rounded-full blur-[40px] group-hover:bg-brand-primary/10 transition-colors duration-500 pointer-events-none" />

              {/* Terminal Title Bar */}
              <div className="bg-black/40 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto text-white/30 text-[11px] font-mono tracking-widest lowercase">
                  {cat.title}
                </div>
                <div className="w-11" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-8 flex-grow font-mono relative z-10">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center text-[13px] md:text-[14px] font-mono">
                    <span className="text-[#ff5f56] font-bold">sohaib@kali</span>
                    <span className="text-white/80 font-bold">:</span>
                    <span className="text-brand-primary font-bold">~/skills</span>
                    <span className="text-white/80 font-bold ml-1">$</span>
                    <span className="text-white/90 ml-2 font-normal">view "{cat.title}"</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-2 border-l-2 border-brand-primary/20 ml-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="text-[13px] md:text-[14px] font-medium text-white/70 tracking-tight hover:text-white transition-colors flex items-center gap-3 cursor-default"
                    >
                      <span className="text-brand-primary/50 text-[10px]">■</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    {
      name: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: '2024',
      image: `${basePath}cert_cisco_cybersecurity.png`,
      link: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394/details/certifications/'
    },
    {
      name: 'Networking Basics',
      issuer: 'Cisco Networking Academy',
      date: '2024',
      image: `${basePath}cert_cisco_networking_basics.png?v=2`,
      link: 'https://www.credly.com/badges/3a5a6e69-7c7a-4822-b6bd-efc22b97ec1a/linked_in_profile'
    },
    {
      name: 'Introduction to Web Scraping',
      issuer: 'Simplilearn SkillUp',
      date: '2024',
      image: `${basePath}cert_simplilearn_scraping.png`,
      link: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394/details/certifications/'
    },
    {
      name: 'SOC Fundamentals',
      issuer: 'TryHackMe',
      date: '2024',
      image: `${basePath}SOC.jpeg`,
      link: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394/details/certifications/'
    },
    {
      name: 'Junior Security Analyst Intro',
      issuer: 'TryHackMe',
      date: '2024',
      image: `${basePath}cert_tryhackme_analyst.png?v=3`,
      link: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394/details/certifications/'
    },
    {
      name: 'Cyber Security Analyst Career Path',
      issuer: 'Cisco Networking Academy',
      date: '2024',
      image: `${basePath}cert_cisco_cybersecurity_analyst.png`,
      link: 'https://www.credly.com/badges/a3ad9eda-1edb-4b1f-adbd-186fc3d45f68/linked_in_profile'
    }
  ];

  const badges = [
    {
      title: 'Firebase Studio Developer Community',
      date: 'Jun 2, 2026',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#FFCA28" d="M19.3 16.55L12.5 3.37c-.2-.36-.77-.36-.97 0L8.73 8.78l-1.95-3.67c-.2-.37-.77-.35-.95.04L2.09 16.92c-.17.38.1.8.5.8h16.2c.42 0 .69-.43.51-.81z" />
          <path fill="#FFA000" d="M14.54 17.72H2.59c-.4 0-.67-.42-.5-.8L5.83 5.15c.18-.39.75-.41.95-.04l7.76 12.61z" />
        </svg>
      )
    },
    {
      title: 'Google Developer Group discovery',
      date: 'May 16, 2026',
      icon: <Users className="w-6 h-6 text-[#34A853]" />,
    },
    {
      title: 'I/O 2026 - Registered',
      date: 'May 15, 2026',
      icon: <div className="font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#4285F4] via-[#DB4437] to-[#F4B400]">I/O</div>,
    },
    {
      title: 'Google Cloud & NVIDIA community member',
      date: 'May 14, 2026',
      icon: <div className="font-black text-[#76B900] text-[10px] tracking-widest">NVIDIA</div>,
    },
    {
      title: 'Gemini Enterprise Agent Ready',
      date: 'May 14, 2026',
      icon: <Code2 className="w-6 h-6 text-black" />,
      bg: 'bg-[#F4B400]'
    },
    {
      title: 'Code Wiki',
      date: 'May 14, 2026',
      icon: <ExternalLink className="w-6 h-6 text-[#4285F4]" />,
    },
    {
      title: 'Learning',
      date: 'May 14, 2026',
      icon: <Database className="w-6 h-6 text-[#4285F4]" />,
    },
    {
      title: 'Chrome DevTools User',
      date: 'May 14, 2026',
      icon: <Terminal className="w-6 h-6 text-[#4285F4]" />,
    },
    {
      title: 'Google Developer Program premium tier',
      date: 'May 14, 2026',
      icon: <Shield className="w-6 h-6 text-[#0F9D58]" />,
    }
  ];

  return (
    <section id="certificates" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-brand-primary font-bold text-[11px] md:text-[13px] tracking-widest uppercase mb-4 block">
            Credentials
          </span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Certifications<span className="text-brand-primary">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-20 md:mb-32 max-w-5xl mx-auto">
          {certs.map((cert, i) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={cardInView}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-panel rounded-[16px] md:rounded-[24px] overflow-hidden flex flex-col glass-hover min-w-0"
            >
              <div className="relative aspect-[4/3] p-3 md:p-6 flex items-center justify-center bg-white/[0.02]">
                <div className={`w-full h-full flex items-center justify-center ${cert.name === 'SOC Fundamentals' ? 'scale-[1.1] md:scale-[1.25]' : cert.name === 'Junior Security Analyst Intro' ? 'scale-[0.85] md:scale-[0.95]' : 'scale-[1.05] md:scale-[1.15]'}`}>
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain mix-blend-lighten opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
              </div>
              <div className="p-3 md:p-6 flex flex-col border-t border-white/5 bg-white/[0.01] min-w-0">
                <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-1 md:mb-2 text-brand-primary/80 line-clamp-1">
                  {cert.issuer}
                </p>
                <h3 className="text-[11px] md:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                  {cert.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Developer Profile Section */}
        <div className="glass-panel rounded-[40px] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#4285F4]/5 via-transparent to-[#34A853]/5 pointer-events-none" />

          <div className="flex flex-col items-center text-center mb-16 relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 flex items-center justify-center gap-3 md:gap-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Developer Profile
            </h3>
            <p className="text-white/50 text-[13px] md:text-[15px] leading-relaxed max-w-xl">
              Official achievements and credentials earned through the Google Developer Program.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 relative z-10 max-w-5xl mx-auto">
            {badges.map((badge, i) => (
              <motion.a
                key={badge.title}
                href="https://g.dev/SohaibTausif"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={cardInView}
                transition={{ delay: i * 0.05, duration: 0.5, ease }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-2 md:gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-2.5 md:p-4 md:pr-6 transition-all min-w-0"
              >
                <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-white ${badge.bg || ''} shadow-lg [&_svg]:w-5 [&_svg]:h-5 md:[&_svg]:w-6 md:[&_svg]:h-6`}>
                  {badge.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] md:text-[12px] font-bold text-white tracking-tight leading-snug line-clamp-2">{badge.title}</span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 flex justify-center relative z-10">
            <motion.a
              href="https://g.dev/SohaibTausif"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white text-black text-[12px] md:text-[13px] font-bold tracking-tight hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              View Full Profile <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Labs = () => {
  return (
    <section id="labs" className="py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-4 block">
            Simulations
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Practical Labs<span className="text-brand-primary">.</span>
          </h2>
          <p className="max-w-xl text-white/50 text-[15px] md:text-[18px] leading-relaxed font-medium tracking-tight">
            Hands-on cyber security training, vulnerability research, and threat simulation platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* HackTheBox Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-8 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#9FEF00]/5 rounded-full blur-[40px] group-hover:bg-[#9FEF00]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#9FEF00]/30 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#9FEF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                  <path d="M12 22V12" />
                  <path d="M2 7l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Hack The Box</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Machine Exploitation
                </p>
              </div>
            </div>

            <div className="space-y-8 flex-grow">
              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Pwned Machines
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Meow',
                    'Fawn',
                    'Appointment'
                  ].map((mach) => (
                    <span
                      key={mach}
                      className="px-3.5 py-1.5 rounded-full border border-[#9FEF00]/20 bg-[#9FEF00]/5 text-[11px] font-bold text-[#9FEF00] uppercase tracking-widest transition-colors hover:bg-[#9FEF00]/10"
                    >
                      {mach}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Earned Badges
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { title: 'Unwavering User', image: 'badge_unwavering_user.png' },
                    { title: 'Academician', image: 'badge_academician.png' }
                  ].map((badge) => (
                    <div
                      key={badge.title}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 pr-5 transition-all hover:border-[#9FEF00]/30 hover:bg-white/[0.08]"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-black/40">
                        <img
                          src={`${basePath}${badge.image}`}
                          alt={badge.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-white tracking-tight">{badge.title}</span>
                        <span className="text-[10px] text-[#9FEF00] font-bold uppercase tracking-wider">HTB Badge</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* TryHackMe Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-8 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C11111]/5 rounded-full blur-[40px] group-hover:bg-[#C11111]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#C11111]/30 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#C11111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">TryHackMe</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Security Learning Paths
                </p>
              </div>
            </div>

            <div className="space-y-8 flex-grow">
              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Completed Rooms
                </h4>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">
                      Blue Team & SOC
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {[
                        'SOC Fundamentals',
                        'SOC Role in Blue Team',
                        'Junior Security Analyst Intro'
                      ].map((room) => (
                        <span
                          key={room}
                          className="px-3.5 py-1.5 rounded-full border border-[#C11111]/20 bg-[#C11111]/5 text-[11px] font-bold text-[#C11111] uppercase tracking-widest transition-colors hover:bg-[#C11111]/10"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">
                      Offensive Security
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3.5 py-1.5 rounded-full border border-[#C11111]/20 bg-[#C11111]/5 text-[11px] font-bold text-[#C11111] uppercase tracking-widest transition-colors hover:bg-[#C11111]/10">
                        Offensive Security Intro
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forage Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-8 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#00A3FF]/5 rounded-full blur-[40px] group-hover:bg-[#00A3FF]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#00A3FF]/30 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  <rect x="2" y="6" width="20" height="14" rx="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Forage</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Virtual Job Simulations
                </p>
              </div>
            </div>

            <div className="space-y-8 flex-grow">
              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Completed Simulations
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_69f68f777cb9723a4c3dc75a_1777767005976_completion_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full border border-[#00A3FF]/20 bg-[#00A3FF]/5 text-[11px] font-bold text-[#00A3FF] uppercase tracking-widest transition-colors hover:bg-[#00A3FF]/15 flex items-center gap-1.5"
                  >
                    Deloitte Australia · Cyber Security <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_69f68f777cb9723a4c3dc75a_1787162114279_completion_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full border border-[#00A3FF]/20 bg-[#00A3FF]/5 text-[11px] font-bold text-[#00A3FF] uppercase tracking-widest transition-colors hover:bg-[#00A3FF]/15 flex items-center gap-1.5"
                  >
                    Mastercard · Cybersecurity <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Key Tasks & Analysis
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Cyber Threat Analysis',
                    'Log & Traffic Triage',
                    'Phishing Analysis',
                    'Security Proposal & Mitigation',
                    'Malware Analysis'
                  ].map((task) => (
                    <span
                      key={task}
                      className="px-3.5 py-1.5 rounded-full border border-[#00A3FF]/20 bg-[#00A3FF]/5 text-[11px] font-bold text-[#00A3FF] uppercase tracking-widest transition-colors hover:bg-[#00A3FF]/10"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Burp Suite Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-8 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF6633]/5 rounded-full blur-[40px] group-hover:bg-[#FF6633]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#FF6633]/30 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF6633" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M8 11h8" />
                  <path d="M12 8v6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Burp Suite</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Access Control Assessment
                </p>
              </div>
            </div>

            <div className="space-y-8 flex-grow">
              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Vulnerabilities Tested
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Vertical & Horizontal Privilege Escalation',
                    'IDOR (Insecure Direct Object References)',
                    'Parameter Manipulation',
                    'Multi-step Process Flaws',
                    'Broken Authorization'
                  ].map((vuln) => (
                    <span
                      key={vuln}
                      className="px-3.5 py-1.5 rounded-full border border-[#FF6633]/20 bg-[#FF6633]/5 text-[11px] font-bold text-[#FF6633] uppercase tracking-widest transition-colors hover:bg-[#FF6633]/10"
                    >
                      {vuln}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Methodology & Tools
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Request Interception',
                    'HTTP Parameter Modification',
                    'Intruder Automated Testing',
                    'Access Control Validation'
                  ].map((focus) => (
                    <span
                      key={focus}
                      className="px-3.5 py-1.5 rounded-full border border-[#FF6633]/20 bg-[#FF6633]/5 text-[11px] font-bold text-[#FF6633] uppercase tracking-widest transition-colors hover:bg-[#FF6633]/10"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
const TerminalBackground = () => {
  const [texts, setTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let id = 0;
    const commands = [
      'sudo nmap -sS -p- 10.0.0.1',
      'ssh-keygen -t ed25519 -C "admin"',
      'tail -f /var/log/auth.log',
      'netstat -tulpn | grep LISTEN',
      'cat /etc/shadow | grep root',
      'chmod +x ./payload.sh && ./payload.sh',
      'docker-compose up --build -d',
      'python3 exploit.py --target 192.168.1.5',
      'grep -r "password" /var/www/html',
      'systemctl restart sshd',
      'ping -c 4 8.8.8.8',
      'tar -czvf backup.tar.gz /data'
    ];

    const interval = setInterval(() => {
      setTexts(prev => {
        const newText = {
          id: id++,
          text: commands[Math.floor(Math.random() * commands.length)],
          x: Math.random() * 70 + 10,
          y: Math.random() * 80 + 10
        };
        const current = [...prev, newText];
        if (current.length > 6) return current.slice(current.length - 6);
        return current;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0, transition: { duration: 2 } }}
          className="absolute inset-0 overflow-hidden font-mono text-[12px] md:text-[14px] text-brand-primary pointer-events-none select-none z-[1]"
        >
          <AnimatePresence>
            {texts.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{
                  opacity: { duration: 0.5 },
                  clipPath: { duration: 2, ease: "linear" },
                  exit: { duration: 2 }
                }}
                className="absolute whitespace-pre font-bold tracking-tight"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <span className="text-[#ff5f56]">sohaib@kali</span>:<span className="text-white">~</span>$ {item.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SVGScrollTracker = ({ activeSection }: { activeSection: string }) => {
  const SECTIONS = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'labs', name: 'Labs' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Stack' },
    { id: 'certificates', name: 'Certifications' },
    { id: 'creator', name: 'Creator' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleDotClick = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 items-end">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => handleDotClick(sec.id)}
            className="group relative flex items-center justify-center w-6 h-6 cursor-pointer focus:outline-none after:absolute after:-inset-y-4 after:-left-12 after:-right-4 after:content-['']"
            aria-label={`Scroll to ${sec.name}`}
          >
            {/* Tooltip text (plain, no cards) */}
            <span className="absolute right-8 text-[9px] font-bold tracking-widest text-white/45 uppercase pointer-events-none opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
              {sec.name}
            </span>

            {/* Micro Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 0.8,
                backgroundColor: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.25)',
                boxShadow: isActive ? '0 0 8px rgba(59, 130, 246, 0.6)' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full group-hover:bg-white group-hover:scale-110 transition-all"
            />
          </button>
        );
      })}
    </div>
  );
};

const Creator = () => {
  return (
    <section id="creator" className="py-20 md:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12 md:mb-24">
          <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-4 block">
            Media & Community
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Content Creation<span className="text-brand-primary">.</span>
          </h2>
          <p className="max-w-xl text-white/50 text-[15px] md:text-[18px] leading-relaxed font-medium tracking-tight">
            Building digital audiences, managing social media channels, and creating engaging online content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* YouTube Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={cardInView}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-6 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF0000]/5 rounded-full blur-[40px] group-hover:bg-[#FF0000]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#FF0000]/30 transition-all">
                <Youtube className="w-6 h-6 text-[#FF0000]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">YouTube Channel</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Content Creation & SEO
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-6">
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                  Subscribers
                </span>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  2,500+
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                  Total Views
                </span>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  2M+
                </span>
              </div>
            </div>

            <p className="text-white/50 text-[13px] md:text-[15px] leading-relaxed font-medium mb-6 flex-grow">
              Built and grew a football channel from scratch. Developed production pipelines, optimized video SEO to drive discoverability, analyzed viewer metrics, and fostered an active community, scaling the channel completely.
            </p>

            <div className="inline-flex items-center gap-2 text-white/30 text-[11px] font-mono tracking-widest uppercase mt-auto">
              <span>Channel Growth</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
            </div>
          </motion.div>

          {/* Facebook Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={cardInView}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="glass-panel rounded-[24px] md:rounded-[32px] group glass-hover p-6 md:p-10 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#1877F2]/5 rounded-full blur-[40px] group-hover:bg-[#1877F2]/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#1877F2]/30 transition-all">
                <Facebook className="w-6 h-6 text-[#1877F2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Facebook Page</h3>
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-0.5">
                  Community & Brand Management
                </p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                Audience Following
              </span>
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                15,000+
              </span>
            </div>

            <p className="text-white/50 text-[13px] md:text-[15px] leading-relaxed font-medium mb-6 flex-grow">
              Managed and scaled a dedicated page, growing its digital reach to over 15k followers. Formulated brand strategy, designed engaging content layouts, and implemented community moderation guidelines to maintain active engagement and positive interaction.
            </p>

            <div className="inline-flex items-center gap-2 text-white/30 text-[11px] font-mono tracking-widest uppercase mt-auto">
              <span>Audience Growth</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'projects', 'labs', 'experience', 'skills', 'certificates', 'creator', 'contact'];
      let currentSection = 'hero';

      const viewportCenter = window.innerHeight * 0.35; // 35% from top of the screen is the focus point

      let closestSection = 'hero';
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          let distance = 0;
          if (rect.top > viewportCenter) {
            distance = rect.top - viewportCenter;
          } else if (rect.bottom < viewportCenter) {
            distance = viewportCenter - rect.bottom;
          }

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      }

      currentSection = closestSection;

      // Force last section to be active when scrolled to the very bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set correct state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-white/90 selection:bg-brand-primary/30 selection:text-white font-sans overflow-x-hidden relative">

      {/* Hardware-accelerated animated background orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-brand-bg select-none">
        <div className="hidden md:block absolute -top-96 -left-96 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_75%)] animate-orb-slow-1 will-change-transform" />
        <div className="hidden md:block absolute -bottom-96 -right-96 w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_75%)] animate-orb-slow-2 will-change-transform" />

        {/* Floating micro-particles */}
        <div className="hidden md:block">
          {[...Array(20)].map((_, i) => {
            const size = (i % 3) + 2; // 2px to 4px
            const left = (i * 7.7) % 100;
            const delay = (i * 1.3) % 15;
            const duration = 15 + ((i * 2.7) % 15);
            return (
              <div
                key={i}
                className="absolute bottom-0 rounded-full bg-white/10 blur-[0.5px] animate-float select-none pointer-events-none"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <Navbar activeSection={activeSection} />

      <SVGScrollTracker activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />

        <section id="about" className="py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bio Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="lg:col-span-8 glass-panel p-10 md:p-14 rounded-[40px] flex flex-col justify-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full group-hover:bg-brand-primary/20 transition-colors duration-1000" />
                <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-6 block relative z-10">
                  About Me
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-[1.1] relative z-10">
                  Cybersecurity Undergraduate <br className="hidden md:block" />
                  <span className="text-white/50">@ GIKI.</span>
                </h2>
                <div className="max-w-2xl space-y-6 relative z-10">
                  <p className="text-[15px] md:text-[18px] leading-relaxed text-white/60 font-medium">
                    I specialize in bridging the gap between bulletproof backend security and seamless user
                    experiences. My engineering philosophy revolves around building high performance systems
                    that are intuitive on the surface but incredibly secure under the hood.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {['Robust Architecture', 'Data Optimization', 'Data Privacy', 'Leadership & Events'].map(
                      (item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-white/80 text-[14px] font-semibold tracking-tight"
                        >
                          <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* Identity Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease }}
                className="lg:col-span-4 glass-panel rounded-[40px] overflow-hidden group relative min-h-[400px]"
              >
                <img
                  src={`${basePath}IMG_20260527_095228.jpg`}
                  alt="Sohaib Tausif"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-100 lg:mix-blend-luminosity lg:opacity-40 lg:group-hover:mix-blend-normal lg:group-hover:opacity-100 lg:group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-50 lg:opacity-90 lg:group-hover:opacity-50 transition-opacity duration-1000" />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass backdrop-blur-2xl p-5 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">
                      Identity
                    </p>
                    <p className="text-xl font-bold text-white tracking-tight">Sohaib Bin Tausif</p>
                  </div>
                </div>
              </motion.div>

              {/* Small Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease }}
                className="lg:col-span-4 glass-panel p-8 rounded-[32px] flex flex-col justify-center text-center hover:bg-white/[0.02] transition-colors"
              >
                <MapPin className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">
                  Topi, KPK <span className="text-white/40">· PK</span>
                </p>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  Ghulam Ishaq Khan Institute
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease }}
                className="lg:col-span-4 glass-panel p-8 rounded-[32px] flex flex-col justify-center text-center hover:bg-white/[0.02] transition-colors"
              >
                <Users className="w-8 h-8 text-brand-primary mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">
                  800+ Attendees
                </p>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  Community Leadership
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease }}
                className="lg:col-span-4 glass-panel p-8 rounded-[32px] flex flex-col justify-center text-center cursor-pointer hover:bg-white/[0.05] hover:border-white/20 transition-all group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-8 h-8 text-white group-hover:text-brand-primary transition-colors mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">
                  Get in Touch
                </p>
                <p className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">
                  Initiate Connection
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-24">
              <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-4 block">
                Selected Work
              </span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                Projects<span className="text-brand-primary">.</span>
              </h2>
              <p className="max-w-xl text-white/50 text-[15px] md:text-[18px] leading-relaxed font-medium tracking-tight">
                Engineering security systems and web applications with architectural integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectCard
                title="OptiSpace"
                stack="React · Node · Postgre"
                description="A smart campus facility booking and utilization system designed to streamline resource allocation. Integrated a recommendation engine to suggest optimal spaces based on historical usage patterns, capacity requirements, and real-time availability. Built with a scalable architecture using React, Node.js, and PostgreSQL for robust data management."
                delay={0}
                imageUrl={`${basePath}Optispace.png`}
                objectPosition="center 10%"
                link="https://github.com/Reyan-kashif/Optispace"
              />
              <ProjectCard
                title="Secure Login System"
                stack="C++ · Cryptography · OTP"
                description="Engineered a highly secure, offline role based access control (RBAC) system from the ground up using C++. Implemented an intricate security model featuring real-time One Time Password (OTP) verification and a custom XOR cryptographic cipher to ensure robust local credential security and data integrity against localized threats."
                delay={0.1}
                imageUrl={`${basePath}SLS.jpeg`}
                objectPosition="center 10%"
                link="https://github.com/21Lexar/Secure-Login-System"
              />
              <ProjectCard
                title="Access Control Vulnerability Assessment"
                stack="Burp Suite · Web Security · Access Control"
                description="Performed end to end web application security assessment using Burp Suite, targeting access control vulnerabilities by intercepting and modifying HTTP requests to analyze authentication and authorization workflows. The assessment involved a gamut of attack techniques such as vertical and horizontal privilege escalation, insecure direct object references (IDOR), parameter manipulation and multi-step process bypass flaws, testing the robustness of role-based access restrictions at every step. The project included hands-on exploitation and validation of these vulnerabilities, which cemented practical knowledge in authorization testing methodologies and best practices in designing secure access control mechanisms within the context of modern application security."
                delay={0.2}
                imageUrl={`${basePath}burp_suite.png`}
                objectPosition="center center"
                report="Access Control Vulnerability Report.pdf"
                reportVariant="burp"
              />
              <ProjectCard
                title="NorthStar Security Framework"
                stack="NIST · Flask · RBAC · Security"
                description="Developed and implemented a cybersecurity framework and a secure Flask web application for a logistics company, following the NIST CSF 2.0 and ISO/IEC 27001:2022 standards. This project incorporated STRIDE threat modelling, a risk register of 28 items, and a formal policy framework that aligns with the compliance requirements of PECA, GDPR and PCI DSS. The application layer was secured with security controls, including RBAC, bcrypt authentication, CSRF protection, TLS encryption, and rate limiting, and was validated against an 18-item evaluation framework achieving a 100% success rate."
                delay={0.3}
                imageUrl={`${basePath}NorthStar.jpeg`}
                objectPosition="center 20%"
                report="NorthStar Project Report.pdf"
              />
              <ProjectCard
                title="Statistical Analysis using Python"
                stack="Algorithms · Python"
                description="Architected and optimized a suite of scalable data analysis algorithms using Python, engineered to process extensive datasets with minimal computational latency. By systematically profiling and refactoring core functions, the project significantly reduced both asymptotic time complexity and system resource overhead for automated insights."
                delay={0.4}
                imageUrl={`${basePath}Statistical-Analysis.jpeg`}
                objectPosition="center 10%"
                link="https://github.com/Sohaib-10/Statistical-Analysis-using-Python"
              />
              <ProjectCard
                title="Multi-User Personal Notebook System"
                stack="Data Structures · C++"
                description="Developed a comprehensive multi-user digital notebook and expense tracking application leveraging advanced C++ data structures. The system utilizes Linked Lists for dynamic data storage, Binary Search Trees (BST) for highly efficient identity searching, and Queues for sequential task execution to guarantee optimal runtime performance."
                delay={0.5}
                imageUrl={`${basePath}Notebook.png`}
                objectPosition="center 40%"
                link="https://github.com/MGK-76/Notebook_Application_In_Cpp_Using_DSA"
              />

            </div>

            {/* Side Projects */}
            <div className="mt-32">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="text-brand-primary font-bold text-[13px] tracking-widest uppercase mb-4 block">
                  Other Endeavors
                </span>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                  Side Projects<span className="text-brand-primary">.</span>
                </h3>
              </div>
              <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {[
                  {
                    title: "🖥️ 24-bit Multi-Mode Processor Simulator",
                    desc: "A custom designed processor built from scratch with a 24 bit ISA (Instruction Set Architecture) supporting 23+ instructions across multiple addressing modes. It includes a two pass assembler written in C++ that converts assembly code into machine code resolving labels in the first pass and generating binary in the second. A C++ based simulator emulates the processors execution pipeline, simulating register states, memory operations, and instruction fetch decode execute cycles at the software level.",
                    link: "https://github.com/Sohaib-10/24-bit-Multi-Mode-Processor-Simulator",
                    linkType: "github" as const
                  },
                  {
                    title: "⚽ Footy-Trivia: Soccer Trivia & Predictions",
                    desc: "Footy Trivia is a football trivia web app built as a global competition platform, featuring over 250 questions across 13 categories covering major leagues like the Premier League, La Liga, Bundesliga, Serie A, and the UEFA Champions League. It offers four game modes including Solo, Blitz, Hardcore, and a Daily Challenge with streak tracking, alongside real time Battle Rooms where players can compete live via invite codes. A Wordle style Transfer Guesser mini game lets users identify footballers from career clues, while a full Global Leaderboard tracks daily, weekly, and all time rankings with an ELO system. The newest addition is a FIFA World Cup 2026 Hub featuring group stage predictions, a Knockout Bracket Predictor, live match scores, player analytics, and award predictions. The app is built on a FastAPI and Supabase backend deployed on Vercel, with vanilla HTML, CSS, and JS on the frontend.",
                    link: "https://footy--trivia.vercel.app",
                    featured: true
                  },
                  {
                    title: "🔢 7-Segment Counter Display",
                    desc: "A two digit decimal counter built as a hardware project for CE221 (Digital Logic Design) at GIKI. The system uses two cascaded 74190 BCD up/down counter ICs driven by a push button, counting from 00 to 99. The BCD outputs are decoded by two 7447 decoder ICs and displayed on dual common anode 7 segment displays. The circuit was designed, simulated in Proteus, and physically assembled on a breadboard successfully verified through step by step testing. The project demonstrates the practical integration of sequential logic (counters) and combinational logic (BCD decoding) in a real hardware system.",
                    link: "7-Segment Counter Display Report.pdf",
                    linkType: "report" as const
                  }
                ].map((proj, i) => (
                  <SideProjectCard
                    key={proj.title}
                    title={proj.title}
                    description={proj.desc}
                    delay={i * 0.1}
                    link={'link' in proj ? proj.link : undefined}
                    linkType={'linkType' in proj ? proj.linkType : 'live'}
                    featured={'featured' in proj ? proj.featured : false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Labs />

        <Experience />
        <Skills />
        <Certifications />
        <Creator />

        <section id="contact" className="py-32 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="lg:col-span-5 flex flex-col justify-center"
              >
                <span className="text-brand-primary font-bold text-[11px] md:text-[12px] tracking-widest uppercase mb-5 block">
                  Connect
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1] mb-8">
                  Initiate <br /> <span className="text-white/40">Contact.</span>
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Chat with me', value: 'sohaibtausif141@gmail.com', href: 'mailto:sohaibtausif141@gmail.com' },
                    { label: 'Follow Work', value: 'GitHub / Sohaib-10', href: 'https://github.com/Sohaib-10' },
                    {
                      label: 'Official Profile',
                      value: 'LinkedIn / Sohaib T.',
                      href: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394'
                    }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target="_blank"
                      whileHover={{ x: 10 }}
                      className="flex flex-col p-5 md:p-6 glass-panel rounded-[24px] group"
                    >
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">
                        {item.label}
                      </span>
                      <span className="text-base md:text-lg font-semibold text-white group-hover:text-brand-primary transition-colors">
                        {item.value}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease }}
                className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-[40px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />
                <h3 className="text-xl md:text-2xl font-bold mb-8 text-white relative z-10">Direct Transmission</h3>

                <form
                  className="space-y-5 relative z-10"
                  action="https://formsubmit.co/sohaibtausif141@gmail.com"
                  method="POST"
                >
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-[11px] font-bold text-white/50 uppercase tracking-widest pl-4">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-[14px] md:text-[15px] text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.02] transition-all placeholder:text-white/20 font-medium"
                        placeholder="Identity"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-[11px] font-bold text-white/50 uppercase tracking-widest pl-4">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-[14px] md:text-[15px] text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.02] transition-all placeholder:text-white/20 font-medium"
                        placeholder="Electronic Mail"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-bold text-white/50 uppercase tracking-widest pl-4">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-[14px] md:text-[15px] text-white outline-none focus:border-brand-primary/50 focus:bg-white/[0.02] transition-all resize-none placeholder:text-white/20 font-medium"
                      placeholder="Brief overview of your project..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-[11px] md:text-[12px] hover:bg-neutral-200 transition-all mt-3"
                  >
                    Transmit Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-16 text-center relative z-10 border-t border-white/5">
        <p className="text-[13px] font-bold tracking-widest text-white/40 uppercase mb-2">Sohaib Bin Tausif</p>
        <p className="text-[12px] font-medium tracking-tight text-white/20 uppercase">
          GIKI · 2026
        </p>
      </footer>
    </div>
  );
}
