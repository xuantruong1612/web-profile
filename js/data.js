// ========== SKILLS DATA ========== //
const skillsData = [
    // Frontend
    {
        name: "React",
        icon: "fab fa-react",
        level: 95,
        color: "#61dafb",
        category: "frontend",
        experience: "4+ years",
        projects: 12,
        certification: "Meta React Developer",
        yearStarted: 2020,
        trending: true
    },
    {
        name: "Vue.js",
        icon: "fab fa-vuejs",
        level: 90,
        color: "#4fc08d",
        category: "frontend",
        experience: "3+ years",
        projects: 8,
        yearStarted: 2021
    },
    {
        name: "Next.js",
        icon: "fas fa-forward",
        level: 88,
        color: "#000000",
        category: "frontend",
        experience: "3+ years",
        projects: 6,
        yearStarted: 2021,
        trending: true
    },
    {
        name: "TypeScript",
        icon: "fab fa-js-square",
        level: 92,
        color: "#3178c6",
        category: "frontend",
        experience: "3+ years",
        projects: 15,
        yearStarted: 2021
    },
    {
        name: "Tailwind CSS",
        icon: "fas fa-paint-brush",
        level: 94,
        color: "#06b6d4",
        category: "frontend",
        experience: "2+ years",
        projects: 20,
        yearStarted: 2022
    },
    {
        name: "Three.js",
        icon: "fas fa-cube",
        level: 75,
        color: "#049ef4",
        category: "frontend",
        experience: "2+ years",
        projects: 5,
        yearStarted: 2022,
        specialty: "3D Graphics"
    },
    
    // Backend
    {
        name: "Node.js",
        icon: "fab fa-node-js",
        level: 93,
        color: "#339933",
        category: "backend",
        experience: "5+ years",
        projects: 25,
        yearStarted: 2019
    },
    {
        name: "Python",
        icon: "fab fa-python",
        level: 89,
        color: "#3776ab",
        category: "backend",
        experience: "4+ years",
        projects: 18,
        yearStarted: 2020
    },
    {
        name: "Express.js",
        icon: "fas fa-server",
        level: 91,
        color: "#000000",
        category: "backend",
        experience: "4+ years",
        projects: 20,
        yearStarted: 2020
    },
    {
        name: "GraphQL",
        icon: "fas fa-project-diagram",
        level: 85,
        color: "#e10098",
        category: "backend",
        experience: "2+ years",
        projects: 8,
        yearStarted: 2022
    },
    {
        name: "PostgreSQL",
        icon: "fas fa-database",
        level: 87,
        color: "#336791",
        category: "backend",
        experience: "3+ years",
        projects: 15,
        yearStarted: 2021
    },
    {
        name: "MongoDB",
        icon: "fas fa-leaf",
        level: 88,
        color: "#47a248",
        category: "backend",
        experience: "4+ years",
        projects: 18,
        yearStarted: 2020
    },
    
    // DevOps
    {
        name: "Docker",
        icon: "fab fa-docker",
        level: 84,
        color: "#2496ed",
        category: "devops",
        experience: "3+ years",
        projects: 12,
        yearStarted: 2021
    },
    {
        name: "AWS",
        icon: "fab fa-aws",
        level: 82,
        color: "#ff9900",
        category: "devops",
        experience: "2+ years",
        projects: 10,
        yearStarted: 2022
    },
    {
        name: "Kubernetes",
        icon: "fas fa-dharmachakra",
        level: 76,
        color: "#326ce5",
        category: "devops",
        experience: "2+ years",
        projects: 6,
        yearStarted: 2022
    },
    {
        name: "Nginx",
        icon: "fas fa-server",
        level: 80,
        color: "#009639",
        category: "devops",
        experience: "2+ years",
        projects: 8,
        yearStarted: 2022
    },
    
    // Tools
    {
        name: "Git",
        icon: "fab fa-git-alt",
        level: 96,
        color: "#f05032",
        category: "tools",
        experience: "5+ years",
        projects: 50,
        yearStarted: 2019
    },
    {
        name: "VS Code",
        icon: "fas fa-code",
        level: 98,
        color: "#007acc",
        category: "tools",
        experience: "5+ years",
        projects: 50,
        yearStarted: 2019
    },
    {
        name: "Figma",
        icon: "fab fa-figma",
        level: 86,
        color: "#f24e1e",
        category: "tools",
        experience: "3+ years",
        projects: 15,
        yearStarted: 2021
    },
    {
        name: "Postman",
        icon: "fas fa-paper-plane",
        level: 89,
        color: "#ff6c37",
        category: "tools",
        experience: "3+ years",
        projects: 25,
        yearStarted: 2021
    }
];

// ========== PROJECTS DATA ========== //
const projectsData = [
    {
        id: 1,
        title: "CyberShop - E-commerce Platform",
        subtitle: "AI-Powered Shopping Experience",
        description: "Nền tảng thương mại điện tử full-stack với AI recommendation, real-time chat, blockchain payment integration và advanced analytics dashboard.",
        image: "fas fa-shopping-cart",
        technologies: ["React", "Node.js", "GraphQL", "PostgreSQL", "Stripe", "Socket.io", "TensorFlow"],
        demoLink: "https://cybershop-demo.com",
        codeLink: "https://github.com/xuantruong1612/cybershop",
        featured: true,
        status: "Live",
        difficulty: 5,
        developmentTime: "6 months",
        linesOfCode: "25,000+",
        teamSize: 1,
        metrics: {
            performance: "98/100 Lighthouse",
            users: "10,000+ active users",
            conversion: "15% sales increase"
        }
    },
    {
        id: 2,
        title: "Neural Network Visualizer",
        subtitle: "Interactive ML Learning Tool",
        description: "Interactive 3D visualization tool cho machine learning models với real-time training progress, performance metrics và model comparison features.",
        image: "fas fa-brain",
        technologies: ["Three.js", "Python", "TensorFlow", "WebGL", "D3.js", "FastAPI"],
        demoLink: "https://neural-viz.com",
        codeLink: "https://github.com/xuantruong1612/neural-viz",
        featured: true,
        status: "Live",
        difficulty: 5,
        developmentTime: "8 months",
        linesOfCode: "35,000+",
        teamSize: 2,
        metrics: {
            performance: "60fps rendering",
            users: "5,000+ researchers",
            accuracy: "95% visualization"
        }
    },
    {
        id: 3,
        title: "CloudOps Dashboard",
        subtitle: "Enterprise Monitoring Solution",
        description: "Enterprise-grade cloud monitoring dashboard với real-time metrics, intelligent alerting system, automated scaling và comprehensive reporting.",
        image: "fas fa-cloud",
        technologies: ["Vue.js", "Express", "Redis", "Docker", "Kubernetes", "AWS", "Grafana"],
        demoLink: "https://cloudops-dashboard.com",
        codeLink: "https://github.com/xuantruong1612/cloudops",
        featured: true,
        status: "Beta",
        difficulty: 5,
        developmentTime: "4 months",
        linesOfCode: "20,000+",
        teamSize: 3,
        metrics: {
            performance: "99.9% uptime",
            monitoring: "1000+ servers",
            alerts: "Real-time notifications"
        }
    },
    {
        id: 4,
        title: "AI Code Assistant",
        subtitle: "Smart Development Tool",
        description: "VS Code extension với AI-powered code completion, intelligent bug detection, performance optimization suggestions và code review automation.",
        image: "fas fa-robot",
        technologies: ["TypeScript", "OpenAI API", "VS Code API", "Python", "Machine Learning"],
        demoLink: "https://marketplace.visualstudio.com/ai-assistant",
        codeLink: "https://github.com/xuantruong1612/ai-code-assistant",
        featured: false,
        status: "Published",
        difficulty: 4,
        developmentTime: "3 months",
        linesOfCode: "15,000+",
        teamSize: 1,
        metrics: {
            downloads: "50,000+ installs",
            rating: "4.8/5 stars",
            efficiency: "40% faster coding"
        }
    },
    {
        id: 5,
        title: "Blockchain Voting System",
        subtitle: "Decentralized Democracy",
        description: "Secure và transparent voting platform using blockchain technology với end-to-end encryption, voter anonymity và immutable vote recording.",
        image: "fas fa-vote-yea",
        technologies: ["Solidity", "Web3.js", "React", "IPFS", "MetaMask", "Ethereum"],
        demoLink: "https://crypto-vote.com",
        codeLink: "https://github.com/xuantruong1612/blockchain-voting",
        featured: false,
        status: "Development",
        difficulty: 5,
        developmentTime: "5 months",
        linesOfCode: "18,000+",
        teamSize: 2,
        metrics: {
            security: "256-bit encryption",
            transparency: "100% auditable",
            scalability: "10,000+ voters"
        }
    },
    {
        id: 6,
        title: "AR Portfolio Showcase",
        subtitle: "Immersive Experience",
        description: "Augmented reality portfolio experience using WebXR với interactive 3D models, gesture controls và immersive project presentations.",
        image: "fas fa-vr-cardboard",
        technologies: ["A-Frame", "WebXR", "Three.js", "Blender", "WebGL", "JavaScript"],
        demoLink: "https://ar-portfolio.com",
        codeLink: "https://github.com/xuantruong1612/ar-portfolio",
        featured: false,
        status: "Experimental",
        difficulty: 4,
        developmentTime: "2 months",
        linesOfCode: "8,000+",
        teamSize: 1,
        metrics: {
            compatibility: "90% devices",
            performance: "30fps AR",
            innovation: "Cutting-edge tech"
        }
    }
];

// ========== TYPING ANIMATION DATA ========== //
const typingRoles = [
    "Full Stack Developer",
    "UI/UX Designer", 
    "DevOps Engineer",
    "Tech Innovator",
    "Problem Solver",
    "Code Architect",
    "Digital Creator",
    "System Designer"
];

// ========== CONTACT INFO ========== //
const contactInfo = {
    email: "xuantruong.tech@example.com",
    phone: "+84 123 456 789",
    location: "Hà Nội, Vietnam",
    linkedin: "https://linkedin.com/in/xuantruong",
    github: "https://github.com/xuantruong1612",
    twitter: "https://twitter.com/xuantruong",
    discord: "xuantruong#1234"
};

// ========== CONFIG ========== //
const config = {
    particleCount: 25,
    typingSpeed: 80,
    deletingSpeed: 40,
    delayBetweenWords: 2500,
    animationDuration: 600,
    scrollOffset: 100
};

// ========== EXPORT DATA ========== //
if (typeof window !== 'undefined') {
    window.skillsData = skillsData;
    window.projectsData = projectsData;
    window.typingRoles = typingRoles;
    window.contactInfo = contactInfo;
    window.config = config;
}
