import React from 'react';
import { Terminal, Code, Server, Globe } from 'lucide-react';

export const resumeData = {
  name: "Deepayan Das",
  role: "Software Engineer",
  email: "deepayan42@gmail.com",
  location: "Kolkata, West Bengal",
  summary: "Results-driven Software Engineer with a passion for building robust, scalable infrastructure and seamless web experiences. Proficient across the stack with a strong track record of engineering comprehensive testing frameworks, optimizing CI/CD pipelines, and delivering defect-free solutions to enterprise environments.",
  experience: [
    {
      company: "Calsoft Inc",
      role: "Software Development Engineer",
      date: "Feb 2025 – Present",
      bullets: [
        "Engineered and executed comprehensive UI and API automation suites using Playwright and function-based Pytest for a Global Fortune 500 Aviation & Electronics Enterprise.",
        "Automated NBD test cases (server-client architecture) using Python; verified behavior using MobaXterm and debugged logs.",
        "Built Locust performance testing suite to ensure zero-downtime under heavy aviation system load.",
        "Implemented and maintained CI/CD pipelines for automated UI and API test suite execution and reporting.",
        "Architected 'TierSense,' an AI-assisted storage tiering proof-of-concept dynamically categorizing real-time file access logs into hot, warm, and cold tiers.",
        "Built modular backend utilizing FastAPI, Docker, and multi-LLM integrations, deploying Filebeat to reduce manual log analysis workload by 70%."
      ]
    }
  ],
  projects: [
    {
      name: "VM AutoScaler",
      tech: ["PowerShell", "Infrastructure", "Automation"],
      desc: "Developed an automated infrastructure monitoring tool using PowerShell to track real-time CPU usage and dynamically manage virtual machine states, optimizing hardware limits and test bench synchronization.",
      link: "#"
    },
    {
      name: "ExploreEase",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      desc: "Built a full-stack MERN travel platform featuring secure authentication, continuous booking workflows, media uploads, and highly responsive hotel search capabilities.",
      link: "#"
    },
    {
      name: "TierSense AI",
      tech: ["FastAPI", "Python", "Docker", "LLMs"],
      desc: "AI-assisted storage tiering proof-of-concept that dynamically categorized real-time file access logs into hot, warm, and cold tiers using large language models.",
      link: "#"
    }
  ],
  skills: [
    {
      category: "Testing & Automation",
      items: ["Selenium", "Pytest", "API Automation", "Locust", "SonarCube", "CI/CD"],
      icon: <Terminal size={20} />
    },
    {
      category: "Languages & Frameworks",
      items: ["Python", "JavaScript", "Java", "GO", "React Native", "HTML/CSS"],
      icon: <Code size={20} />
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "Kubernetes", "AWS", "Azure", "Git", "Linux Kernel", "Linux Administration", "PowerShell"],
      icon: <Server size={20} />
    },
    {
      category: "Architecture & Tools",
      items: ["REST API", "PDB (Debugging)", "Multi-LLM Integrations"],
      icon: <Globe size={20} />
    }
  ],
  education: {
    degree: "B.Tech in Information Technology",
    school: "Maulana Abul Kalam Azad University of Technology",
    date: "Sep 2021 – Jul 2025",
    gpa: "8.68"
  },
  certifications: [
    "Oracle Professional Certification (2025 - 2027)",
    "Oracle Foundations Associate Certification (2025 - 2027)",
    "AI for Everyone (Coursera)"
  ]
};

export const navItems = [
  {
    label: "About",
    bgColor: "#050508",
    textColor: "#fff",
    links: [
      { label: "About Me", href: "#about" },
      { label: "Skills", href: "#skills" },
    ]
  },
  {
    label: "Experience", 
    bgColor: "#0a0a0f",
    textColor: "#fff",
    links: [
      { label: "Timeline", href: "#experience" },
      { label: "Education", href: "#education" }
    ]
  },
  {
    label: "Work",
    bgColor: "#050508", 
    textColor: "#fff",
    links: [
      { label: "Projects", href: "#projects" }
    ]
  }
];
