import type { TeamMember, ImpactStat, Testimonial, Program, BlogPost, DonationTier } from "@/types"

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Sharmin Nasrin",
    role: "President & CEO",
    description:
      "A researcher, educator, and global advocate for climate justice. Dr. Sharmin leads with a vision to empower youth through knowledge, equity, and community action.",
    emoji: "🌿",
  },
  {
    name: "Syeda Fatima",
    role: "Vice President & Secretary",
    description:
      "Supports organizational operations and strategic decision-making. With HR and youth leadership background, ensures transparency and alignment.",
    emoji: "🌱",
  },
  {
    name: "S.M. Ferdous",
    role: "Field Coordinator (Bangladesh)",
    description:
      "Leads on-the-ground implementation in Bangladesh. Mobilizes volunteers, builds school partnerships, and ensures community reach.",
    emoji: "🌎",
  },
  {
    name: "Saira Islam",
    role: "Marketing & Communications",
    description:
      "Handles outreach, branding, and communication strategy. Ensures our message reaches and inspires the next generation of changemakers.",
    emoji: "📢",
  },
]

export const impactStats: ImpactStat[] = [
  {
    number: "120+",
    description:
      "Teachers trained in traffic awareness workshops could collectively reduce up to 7 tonnes of CO₂ per year by adopting climate-friendly travel habits and promoting safer, less congested roads.",
  },
  {
    number: "950+",
    description:
      "Drivers surveyed to inform sustainable traffic planning—supporting safer roads and climate-resilient transport systems.",
  },
  {
    number: "50+",
    description:
      "Students are trained in academic research methods to investigate real-world problems and support climate-conscious solutions.",
  },
  {
    number: "50+",
    description:
      "Participants trained in fire safety as part of building climate-resilient communities—potentially preventing emissions of up to 10–20 tonnes of CO₂ annually by reducing fire-related damages, resource loss, and emergency emissions.",
  },
  {
    number: "50+",
    description:
      "Volunteers from diverse groups were surveyed to understand perceptions of traffic management and how mobility patterns contribute to climate challenges in urban areas—insights that can guide behavior change and urban planning efforts capable of reducing emissions by an estimated 5–10 tonnes of CO₂ annually.",
  },
  {
    number: "200+",
    description:
      "School children participated in hands-on workshops where they learned how their daily actions affect the planet—and how to reduce their climate footprint. If even half of the population adopts climate-friendly habits, this initiative could lead to an estimated reduction of 3–5 tonnes of CO₂ annually through changes in energy use, transportation, and waste behavior.",
  },
  {
    number: "200+",
    description:
      "By planting 200+ lentil seeds, students contributed to an estimated reduction of approximately 40 kilograms of carbon dioxide (CO₂).",
  },
  {
    number: "15+",
    description:
      "Youth volunteers trained to teach climate and carbon footprint awareness—empowering others and potentially reducing 2–4 tonnes of CO₂ annually through behavior change.",
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "Volunteering with Acumen Haven has been a life-changing experience. I not only learned about climate change and sustainability, but I also had the opportunity to teach younger students and lead real community workshops. It made me realize that even small actions can create a significant impact. Acumen Haven gave me the tools, the voice, and the purpose to be part of the solution.",
    author: "RAZIN IBN ASAD MOLLA",
    role: "Volunteer",
  },
  {
    quote:
      "Acumen Haven's workshop changed the way our students see climate change. They will remember the 'Earth Avengers' event for a long time.",
    author: "Principal",
    role: "Desh Kindergarten",
  },
]

export const usPrograms: Program[] = [
  {
    title: "Climate Literacy Ambassadors",
    description:
      "Partnering with high schools and libraries to train student ambassadors who lead workshops on climate science, sustainability, and community action.",
    status: "upcoming",
  },
  {
    title: "1-Day Skills Bootcamp",
    description:
      "An intensive, hands-on workshop covering public speaking, climate literacy, and project planning — built for student clubs and youth groups.",
    status: "current",
  },
  {
    title: "Climate Conversation Circles",
    description:
      "Monthly peer-led discussions in schools or youth centers to promote climate awareness, emotional resilience, and collaborative solutions.",
    status: "current",
  },
]

export const bangladeshPrograms: Program[] = [
  {
    title: "Youth-Led School Workshops",
    description:
      "Engaging climate education sessions in schools for students from grade 1 to grade 5, using simple, visual tools and local storytelling.",
    status: "current",
  },
  {
    title: "Scholarship or Fellowship Program",
    description:
      "A youth-driven fellowship program that empowers under-resourced, high-potential students to become community climate and traffic awareness leaders.",
    status: "upcoming",
  },
  {
    title: "Volunteer Training & Street Outreach",
    description:
      "Empowering young volunteers to run awareness drives in markets and public spaces through posters, community talks, and flash campaigns.",
    status: "current",
  },
]

export const donationTiers: DonationTier[] = [
  {
    amount: 25,
    description: "Trains 1 climate ambassador",
    impact: "Provides training materials and resources for one student ambassador",
  },
  {
    amount: 50,
    description: "Supports 1 school workshop",
    impact: "Covers materials and facilitator costs for a complete school session",
  },
  {
    amount: 100,
    description: "Funds 1 community outreach event",
    impact: "Enables a full community awareness campaign with materials and coordination",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Empowering Youth Climate Leaders in Arizona",
    excerpt:
      "How our Climate Literacy Ambassador program is transforming young voices into powerful advocates for change.",
    content: "Full blog content would go here...",
    author: "Dr. Sharmin Nasrin",
    date: "2025-01-15",
    category: "Programs",
    image: "https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg",
  },
  {
    id: "2",
    title: "Traffic Safety Training Success in Bangladesh",
    excerpt: "Over 120 teachers trained in sustainable traffic management systems across Dhaka schools.",
    content: "Full blog content would go here...",
    author: "S.M. Ferdous",
    date: "2025-01-10",
    category: "Impact",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
  },
  {
    id: "3",
    title: "Building Climate Resilience Through Community Action",
    excerpt: "Exploring how local initiatives create lasting environmental and social impact.",
    content: "Full blog content would go here...",
    author: "Saira Islam",
    date: "2025-01-05",
    category: "Climate Action",
    image: "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg",
  },
]
