/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
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
  Cpu, 
  Download,
  ChevronRight,
  Menu,
  X,
  Briefcase,
  Layers,
  Search,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="atmosphere fixed inset-0 z-0 pointer-events-none glow-mesh opacity-100" />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-primary/50 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-primary/5 pointer-events-none z-0 blur-[140px] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 pointer-events-none`}
    >
      <div className="container mx-auto px-6 flex justify-center">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center gap-2 p-2 rounded-full border pointer-events-auto transition-all duration-500 ${
            isScrolled 
            ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl px-6' 
            : 'bg-transparent border-transparent px-2'
          }`}
        >
          <div className="flex items-center gap-8 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium tracking-tight text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          
          <a href={`${import.meta.env.BASE_URL}Sohaib_Resume.pdf`} download="Sohaib_Resume.pdf">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-white text-black text-[12px] font-bold tracking-tight hover:bg-white/90 transition-all cursor-pointer"
            >
              Resume
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Mobile Toggle - Hidden on desktops for this minimalist look */}
      <div className="md:hidden fixed top-8 right-8 pointer-events-auto">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl md:hidden p-12 flex flex-col justify-center items-center gap-8 pointer-events-auto"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-bold text-white tracking-tighter"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`${import.meta.env.BASE_URL}Sohaib_Resume.pdf`} 
            download="Sohaib_Resume.pdf"
            className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold text-lg"
          >
            Download Resume
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-48 md:pt-64 overflow-hidden px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-4xl relative z-20"
      >
        <h1 className="text-[clamp(2.5rem,10vw,140px)] font-bold text-white tracking-tighter leading-none text-gradient mb-8 whitespace-nowrap">
          Sohaib Tausif<span className="text-brand-primary">.</span>
        </h1>

        <p className="text-[17px] md:text-[20px] leading-relaxed text-white/40 max-w-2xl font-medium tracking-tight mb-12 px-4">
          Cybersecurity student at GIKI and full-stack developer. Building bulletproof systems and intuitive experiences at the intersection of security and code.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-[14px] tracking-tight flex items-center gap-2 cursor-pointer shadow-[0_15px_30px_rgba(255,255,255,0.08)]"
          >
            View Projects
          </motion.button>
          
          <div className="flex items-center gap-3">
            {[
              { icon: <Github />, href: 'https://github.com/Sohaib-10' },
              { icon: <Linkedin />, href: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394' },
              { icon: <Mail />, href: 'mailto:sohaibtausif141@gmail.com' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ y: -5, color: '#white' }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:bg-white/5 border-white/5"
              >
                <div className="scale-100">{social.icon}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modern Background Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-primary/10 rounded-full blur-[180px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-brand-bg via-brand-bg to-transparent z-10" />
    </section>
  );
};

const ProjectCard = ({ title, stack, description, delay, link, imageUrl, objectPosition = 'center 20%' }: { title: string, stack: string, description: string, delay: number, link?: string, imageUrl?: string, objectPosition?: string }) => {
  const CardWrapper = link ? motion.a : motion.div;
  
  return (
    <CardWrapper
      href={link}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={`group relative flex flex-col h-full rounded-[32px] overflow-hidden glass p-1 ${link ? 'cursor-pointer' : ''}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] mb-8 bg-zinc-900 flex items-center justify-center">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-40 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
              style={{ objectPosition }}
            />
            {/* Blending Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Terminal className="w-12 h-12 text-white/5 opacity-50 group-hover:scale-110 transition-transform duration-500" />
          </>
        )}
        
        {link && (
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>

      <div className="px-8 pb-10 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-6">
          {stack.split(' · ').map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">{tag}</span>
          ))}
        </div>
        
        <h3 className="text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed font-medium mb-8 flex-grow">
          {description}
        </p>
        
        <div className="flex items-center gap-2 group/btn">
          <span className="text-[12px] font-bold text-white uppercase tracking-tight">View Details</span>
          <ChevronRight className="w-4 h-4 text-brand-primary group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </div>
    </CardWrapper>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: 'GIKI University',
      role: 'Cybersecurity & Full-Stack Development',
      period: '2024 — Present',
      description: 'Currently pursuing a degree in Cybersecurity while building real world projects in full stack development and security engineering.'
    },
    {
      company: 'Event Management & Leadership',
      role: 'Lead Organizer',
      period: '',
      description: 'Orchestrated high-impact campus initiatives, including career fairs, educational expos, and Model United Nations (MUN) conferences. Managed end-to-end logistics, stakeholder relations, and multi-disciplinary teams for large-scale execution.'
    }
  ];

  return (
    <section id="experience" className="py-40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-brand-primary font-bold text-[12px] tracking-[4px] uppercase mb-4 block">Journey</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6">
            Evolution<span className="text-white/20">.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
          
          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-12 relative ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(129,140,248,0.5)] z-10" />
                
                <div className="w-full md:w-1/2 flex flex-col px-12 md:px-0">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                    {exp.period && (
                      <span className="text-[12px] font-bold text-brand-primary font-mono uppercase tracking-[2px] mb-4">{exp.period}</span>
                    )}
                    <h3 className="text-3xl font-bold text-white mb-2">{exp.company}</h3>
                    <p className="text-lg font-medium text-white/40 mb-6 font-mono tracking-tight">{exp.role}</p>
                    <p className="text-white/30 text-sm leading-relaxed max-w-sm">{exp.description}</p>
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
      title: 'Security',
      icon: <Shield className="w-6 h-6 border-none" />,
      skills: ['Network Security', 'InfoSec Principles', 'Cryptography', 'RBAC Systems']
    },
    {
      title: 'Frontend',
      icon: <Layers className="w-6 h-6" />,
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma']
    },
    {
      title: 'Backend',
      icon: <Database className="w-6 h-6" />,
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Python']
    }
  ];

  return (
    <section id="skills" className="py-40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-brand-primary font-bold text-[12px] tracking-[4px] uppercase mb-4 block">Technology</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 text-gradient">
            Expertise<span className="text-white/20">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[40px] group transition-all duration-500 hover:bg-white/[0.03]"
            >
              <div className="w-14 h-14 rounded-[20px] bg-white text-black flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-white/60 tracking-tight uppercase group-hover:text-white transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white overflow-x-hidden pb-20">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />

        <section id="about" className="py-20 md:py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:auto-rows-[250px]">
              
              {/* Bio Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-8 lg:row-span-2 glass p-8 md:p-12 rounded-[40px] flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full glow-mesh opacity-5 pointer-events-none" />
                <span className="text-brand-primary font-bold text-[10px] tracking-[4px] uppercase mb-6 block">About Me</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1]">
                  Merging <span className="text-white/20">Security</span> <br /> & Pure <span className="text-brand-primary italic">Detail</span>.
                </h2>
                <div className="max-w-2xl space-y-4">
                  <p className="text-lg md:text-xl text-white/50 leading-relaxed font-medium tracking-tight">
                    Study Cybersec at GIKI and craft high-perf applications. I focus on making tech that feels intuitive and stands up to the heaviest scrutiny.
                  </p>
                  <p className="text-md text-white/20 leading-relaxed font-medium tracking-tight italic">
                    "Expanding the digital frontier through robust engineering and seamless detail."
                  </p>
                </div>
              </motion.div>

              {/* Identity Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-4 lg:row-span-2 glass rounded-[40px] overflow-hidden group shadow-2xl relative"
              >
                 <img 
                    src={`${import.meta.env.BASE_URL}WhatsApp Image 2026-04-22 at 11.55.21 PM.jpeg`} 
                    alt="Sohaib Tausif" 
                    className="w-full h-full object-cover grayscale opacity-50 contrast-125 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                    }}
                 />
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="glass backdrop-blur-3xl p-4 rounded-2xl border-white/10 group-hover:border-white/20 transition-all duration-500">
                     <p className="text-[9px] font-bold text-brand-primary uppercase tracking-[2px] mb-1">Identity</p>
                     <p className="text-lg font-bold text-white tracking-tight">Sohaib Bin Tausif</p>
                   </div>
                 </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 glass p-8 rounded-[40px] flex flex-col justify-center text-center"
              >
                <p className="text-4xl font-bold text-white mb-1">2024</p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Inception</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-4 glass p-8 rounded-[40px] flex flex-col justify-center text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                   <p className="text-4xl font-bold text-white">5+</p>
                   <Briefcase className="w-6 h-6 text-brand-primary" />
                </div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Milestones</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-4 glass p-8 rounded-[40px] flex flex-col justify-center text-center group cursor-pointer hover:bg-brand-primary/10 transition-all duration-500"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <p className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Get in Touch</p>
                <p className="text-[9px] font-bold text-brand-primary uppercase tracking-[2px]">Initiate Connection</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-40 bg-zinc-950/30">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-32">
              <h2 className="text-5xl md:text-9xl font-bold tracking-tight text-white mb-8 text-gradient">
                Projects<span className="text-white/20">.</span>
              </h2>
              <p className="max-w-xl text-white/40 text-lg font-medium tracking-tight">
                Engineering security systems and web applications with architectural integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard 
                title="OptiSpace"
                stack="React · Node · Postgre"
                description="A smart campus facility booking and utilization system with a recommendation engine to suggest optimal spaces based on usage patterns."
                delay={0}
                imageUrl={`${import.meta.env.BASE_URL}Gemini_Generated_Image_mzzqnfmzzqnfmzzq.png`}
                objectPosition="center 10%"
              />
              <ProjectCard 
                title="RBAC Security"
                stack="C++ · Cryptography"
                description="Engineered a role based access control system featuring real time OTP verification and XOR cipher for local credential security."
                delay={0.1}
                imageUrl={`${import.meta.env.BASE_URL}WhatsApp Image 2026-04-24 at 12.18.24 AM.jpeg`}
                objectPosition="center 10%"
                link="https://github.com/21Lexar/Secure-Login-System"
              />
              <ProjectCard 
                title="Personal Notebook"
                stack="Data Structures · C++"
                description="Multi-user notebook system leveraging advanced data structures (Linked Lists, BSTs, Queues) for identity and expense management."
                delay={0.2}
                imageUrl={`${import.meta.env.BASE_URL}Gemini_Generated_Image_9re6gf9re6gf9re6.png`}
                objectPosition="center 40%"
                link="https://github.com/MGK-76/Notebook_Application_In_Cpp_Using_DSA"
              />
              <ProjectCard 
                title="Algorithmic Data Analyzer"
                stack="Algorithms · Python"
                description="Optimized scalable algorithms for automated data analysis. Significantly reduced time complexity and resource overhead."
                delay={0.3}
                imageUrl={`${import.meta.env.BASE_URL}WhatsApp Image 2026-04-24 at 12.31.42 AM.jpeg`}
                objectPosition="center 10%"
                link="https://github.com/Sohaib-10/Statistical-Analysis-using-Python"
              />
            </div>
          </div>
        </section>

        <Experience />

        <Skills />

        <section id="contact" className="py-40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <span className="text-brand-primary font-bold text-[12px] tracking-[4px] uppercase mb-8 block">Connect</span>
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.9] text-gradient mb-12">
                  Initiate <br /> <span className="text-white/20">Contact.</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Chat with me', value: 'sohaibtausif141@gmail.com', href: 'mailto:sohaibtausif141@gmail.com' },
                    { label: 'Follow Work', value: 'GitHub / Sohaib-10', href: 'https://github.com/Sohaib-10' },
                    { label: 'Official Profile', value: 'LinkedIn / Sohaib T.', href: 'https://www.linkedin.com/in/sohaib-tausif-3a2153394' }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target="_blank"
                      whileHover={{ x: 5 }}
                      className="flex flex-col p-8 glass rounded-[32px] group"
                    >
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[2px] mb-2">{item.label}</span>
                      <span className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{item.value}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 glass p-10 md:p-16 rounded-[56px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
                <h3 className="text-3xl font-bold mb-12 text-white">Direct Transmission</h3>
                
                <form 
                  className="space-y-8 relative z-10"
                  action="https://formsubmit.co/sohaibtausif141@gmail.com"
                  method="POST"
                >
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[2px] ml-2">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-white/[0.03] border border-white/5 rounded-[24px] px-8 py-5 text-white outline-none focus:border-brand-primary/30 transition-all placeholder:text-white/10 font-medium"
                        placeholder="Identity"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-[2px] ml-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-white/[0.03] border border-white/5 rounded-[24px] px-8 py-5 text-white outline-none focus:border-brand-primary/30 transition-all placeholder:text-white/10 font-medium"
                        placeholder="Electronic Mail"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-white/30 uppercase tracking-[2px] ml-2">Description</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-[24px] px-8 py-5 text-white outline-none focus:border-brand-primary/30 transition-all resize-none placeholder:text-white/10 font-medium"
                      placeholder="Brief overview of the project..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-6 rounded-[24px] bg-white text-black font-bold uppercase tracking-[2px] text-[13px] hover:bg-neutral-200 transition-all"
                  >
                    Send Brief →
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 pt-32 pb-12 text-center">
        <div className="h-[1px] bg-white/5 w-full mb-20" />
        <p className="text-[12px] font-bold tracking-[6px] text-white/20 uppercase mb-4">Sohaib Bin Tausif</p>
        <p className="text-sm font-medium tracking-tight text-white/10 uppercase">Built with precision at GIKI · 2026</p>
      </footer>
    </div>
  );
}

