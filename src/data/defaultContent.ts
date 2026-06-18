export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  image: string;
  video: string;
  link?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  type: string;
  icon: string;
  image: string;
}

export interface Education {
  id: string;
  school: string;
  period: string;
  degree: string;
  details: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  image: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface SocialItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

export interface TechGroup {
  id: string;
  category: string;
  items: string[];
}

export interface Content {
  hero: {
    name: string;
    quote: string;
    about: string[];
    image: string;
  };
  interests: string[];
  education: Education[];
  projects: Project[];
  experience: Experience[];
  techStack: TechGroup[];
  certifications: Certification[];
  contact: ContactItem[];
  socials: SocialItem[];
}

export const defaultContent: Content = {
  hero: {
    name: "Earl John Gomez",
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    about: [
      "I am a Bachelor of Science in Information Systems (BSIS) student with strong skills in web development, graphic design, and social media management. I have hands-on experience creating digital solutions, managing online content, and designing promotional materials that enhance brand engagement.",
      "Proficient in HTML, CSS, JavaScript, PHP, and basic AI integration, I enjoy combining creativity and technology to solve problems and deliver user-friendly solutions.",
      "I am passionate about learning and seeking opportunities to contribute my technical and creative skills to a dynamic, growth-oriented team.",
    ],
    image: "/uploads/image/image.png",
  },
  interests: [
    "💻 Web Development",
    "🎨 Graphic Design",
    "🤖 Artificial Intelligence",
    "📱 Social Media Management",
    "🚀 Technology",
  ],
  education: [
    {
      id: "1",
      school: "Dr. Filemon C. Aguilar Memorial College",
      period: "2022 – Present",
      degree: "Bachelor of Science in Information Systems",
      details: ["PSITE Head Programmer (2023–2026)", "Currently Enrolled"],
    },
    {
      id: "2",
      school: "Zarate College",
      period: "2020 – 2022",
      degree: "ICT Strand",
      details: ["ICT Vice President"],
    },
    {
      id: "3",
      school: "Captain Albert Aguilar National High School",
      period: "2016 – 2020",
      degree: "Completed Secondary Education",
      details: [],
    },
  ],
  projects: [
    {
      id: "1",
      title: "PhotoCabin",
      description:
        "A photography booking & management system built with CodeIgniter 3/PHP. Features a public landing page with portfolio (image/video), packages, multi-step booking (date → package → details → venue → submit), date availability check, and OTP registration. Client portal includes a dashboard with booking timeline, accept quotes, upload payment proof, digitally sign contracts, rate/review, view albums, real-time chat with admin, and profile management. Admin panel handles full booking lifecycle, payment verification, auto-generated contracts, calendar view, package/add-on CRUD, portfolio management, client management, album/media management, real-time chat, SMTP settings, and gallery import. Notifications include email alerts for booking, quotation, payment, contract, OTP, and drive link sharing.",
      tags: ["CodeIgniter", "PHP", "MySQL", "JavaScript", "Bootstrap", "AJAX"],
      featured: true,
      image: "https://placehold.co/600x400/151515/EF4444?text=PhotoCabin",
      video: "/uploads/video/photocabin.mp4",
    },
    {
      id: "2",
      title: "Online Grading Management System",
      description:
        "A digital grading platform for managing student records, grades, and academic performance.",
      tags: ["PHP", "MySQL", "Bootstrap"],
      featured: false,
      image: "https://placehold.co/600x400/151515/EF4444?text=Grading+System",
      video: "/uploads/video/sample%201.mp4",
    },
    {
      id: "3",
      title: "Roma Tour",
      description:
        "An online booking platform for bus private tours. Customers can browse tour packages, check availability, and book private bus tours with ease.",
      tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      featured: false,
      image: "https://placehold.co/600x400/151515/EF4444?text=Roma+Tour",
      video: "/uploads/video/romaoturs%20(1).mp4",
    },
    {
      id: "4",
      title: "Memorial & Home Services",
      description:
        "A memorial/home services website built with Next.js 14, React 18, and Tailwind CSS. Features a single-page layout with Navbar, Hero, StatsCounter, About, Services, MoreServices, WhyChooseUs, Gallery, Reviews, Contact form (Nodemailer), and scroll animations. Deployed via Vercel.",
      tags: ["Next.js", "React", "Tailwind CSS", "Nodemailer", "Vercel"],
      featured: false,
      image: "/uploads/image/image.png",
      video: "",
      link: "https://memorial-cyan.vercel.app/",
    },
  ],
  experience: [
    {
      id: "1",
      title: "Web Software Engineer",
      organization: "St. Dominic College of Asia",
      type: "Internship",
      icon: "💼",
      image: "",
    },
    {
      id: "2",
      title: "Technical Support Staff",
      organization: "GitHub Seminar",
      type: "Seminar",
      icon: "🛠️",
      image:
        "https://placehold.co/800x400/151515/EF4444?text=GitHub+Seminar",
    },
    {
      id: "3",
      title: "Blockchain Technology",
      organization: "The BLOKC Seminar",
      type: "Seminar",
      icon: "🔗",
      image:
        "https://placehold.co/800x400/151515/EF4444?text=Blockchain+Seminar",
    },
    {
      id: "4",
      title: "Developer Club Tour Philippines",
      organization: "Daytona Seminar",
      type: "Seminar",
      icon: "🌐",
      image:
        "https://placehold.co/800x400/151515/EF4444?text=Developer+Tour",
    },
  ],
  techStack: [
    {
      id: "1",
      category: "Frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "SCSS",
        "Styled Components",
        "Vite",
        "Webpack",
        "ESLint",
        "Prettier",
      ],
    },
    {
      id: "2",
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "Java",
        "PHP",
        "Express.js",
        "NestJS",
        "FastAPI",
        "Spring Boot",
        "Laravel",
        "PostgreSQL",
        "MySQL",
      ],
    },
    {
      id: "3",
      category: "DevOps & Cloud",
      items: ["AWS", "GitHub Actions", "GitLab CI", "AWS CloudFormation"],
    },
    {
      id: "4",
      category: "AI & Machine Learning",
      items: ["TensorFlow", "PyTorch", "LangChain", "Transformers", "OpenAI"],
    },
    {
      id: "5",
      category: "Security & Identity",
      items: ["AWS IAM", "Auth0"],
    },
    {
      id: "6",
      category: "Developer Tools",
      items: [
        "Git",
        "GitHub",
        "GitLab",
        "Bitbucket",
        "VS Code",
        "JetBrains IntelliJ",
        "PyCharm",
        "Discord",
        "Teams",
      ],
    },
    {
      id: "7",
      category: "CMS & No-Code",
      items: [
        "WordPress",
        "Strapi",
        "Bubble",
        "Webflow",
        "Microsoft Power Platform",
      ],
    },
  ],
  certifications: [
    {
      id: "1",
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      icon: "🌐",
      image:
        "https://placehold.co/600x400/151515/EF4444?text=Responsive+Web",
    },
    {
      id: "2",
      title: "JavaScript Algorithms and Data Structures",
      issuer: "FreeCodeCamp",
      icon: "📊",
      image:
        "https://placehold.co/600x400/151515/EF4444?text=JS+Algorithms",
    },
    {
      id: "3",
      title: "Python Programming",
      issuer: "FreeCodeCamp",
      icon: "🐍",
      image:
        "https://placehold.co/600x400/151515/EF4444?text=Python",
    },
  ],
  contact: [
    {
      id: "1",
      icon: "MapPin",
      label: "Location",
      value: "Las Piñas City, Philippines",
      href: "",
    },
    {
      id: "2",
      icon: "Mail",
      label: "Email",
      value: "earljohngomez66@gmail.com",
      href: "mailto:earljohngomez66@gmail.com",
    },
    {
      id: "3",
      icon: "Phone",
      label: "Phone",
      value: "+63 ** ***",
      href: "",
    },
    {
      id: "4",
      icon: "GraduationCap",
      label: "Status",
      value: "BS Information Systems Student",
      href: "",
    },
  ],
  socials: [
    { id: "1", icon: "Code2", label: "GitHub", href: "#" },
    { id: "2", icon: "Link2", label: "LinkedIn", href: "#" },
    { id: "3", icon: "Camera", label: "Instagram", href: "#" },
    { id: "4", icon: "Globe", label: "Portfolio", href: "#" },
    { id: "5", icon: "Mail", label: "Email", href: "mailto:earljohngomez66@gmail.com" },
  ],
};
