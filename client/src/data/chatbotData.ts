import type { UserType } from "@/types/enquiry"

export type { UserType }

export type BotReply = {
  text: string
  showForm?: boolean
  defaultUserType?: UserType
}

export const QUICK_QUESTIONS = [
  "What services does DroneTV provide?",
  "What courses / training are available?",
  "How can I contact DroneTV?",
  "How can I register?",
  "I am interested in a service.",
  "I am a student.",
  "I want to speak with someone.",
]

export const WELCOME_TEXT =
  "Welcome to the DroneTV Assistant! How can I help you today? Ask about our services, partner training, Drone Doctor technical support, or choose one of the quick questions below."

type Rule = {
  keywords: string[]
  reply: BotReply
}

const RULES: Rule[] = [
  {
    keywords: [
      "i want to speak with someone",
      "speak with someone",
      "speak",
      "talk",
      "human",
      "someone",
      "agent",
      "call me",
      "advisor",
      "representative",
    ],
    reply: {
      text: "Certainly! Please share your contact details and enquiry in the form below. A DroneTV representative from our Hyderabad office will reach out to you directly.",
      showForm: true,
      defaultUserType: "Other",
    },
  },
  {
    keywords: [
      "i am a student",
      "student",
      "career",
      "job",
      "internship",
      "placement",
      "pilot career",
      "hiring",
      "fresher",
    ],
    reply: {
      text: "Welcome! DroneTV connects students and aspiring pilots with accredited RPTO training partners, GIS geospatial workflows, and career openings across leading drone tech companies. Share your details below and our team will connect you with verified learning tracks and opportunities.",
      showForm: true,
      defaultUserType: "Student",
    },
  },
  {
    keywords: [
      "i am interested in a service",
      "interested in a service",
      "interested",
      "hire",
      "quote",
      "pricing quote",
      "client enquiry",
      "commercial inquiry",
    ],
    reply: {
      text: "We would be delighted to assist you! Please share what service you are looking for in the form below (Media coverage, Marketplace listing, Drone Doctor support, or Advertising). Our operations team will get in touch shortly.",
      showForm: true,
      defaultUserType: "Customer",
    },
  },
  {
    keywords: [
      "how can i register",
      "register",
      "registration",
      "enroll",
      "enrollment",
      "sign up",
      "join",
      "admission",
      "apply",
    ],
    reply: {
      text: "To register your interest for partner training programs, media spotlight coverage, or directory listings, please fill out the enquiry form below. Our team will verify your requirements and guide you through the next steps.",
      showForm: true,
      defaultUserType: "Other",
    },
  },
  {
    keywords: [
      "what courses / training are available",
      "courses / training are available",
      "course",
      "courses",
      "training",
      "pilot license",
      "dgca",
      "rpto",
      "certification",
      "certified",
      "education",
      "pilot training",
    ],
    reply: {
      text: "DroneTV collaborates with DGCA-authorized Remote Pilot Training Organizations (RPTOs), universities, and training partners such as India Drone Academy. Available learning tracks through partners include:\n\n1. DGCA Remote Pilot Certification (Small & Medium category)\n2. GIS Aerial Surveying & Photogrammetry\n3. Precision Agriculture Drone Operations\n4. Drone AI, Thermal Inspection, and Data Processing\n\nSpecific batch fees and timelines require partner confirmation. Submit an enquiry to connect with verified training institutes.",
      showForm: true,
      defaultUserType: "Student",
    },
  },
  {
    keywords: [
      "what services does dronetv provide",
      "services does dronetv provide",
      "service",
      "services",
      "provide",
      "offer",
      "what do you do",
      "capabilities",
      "solutions",
    ],
    reply: {
      text: "DroneTV delivers comprehensive solutions across the drone ecosystem:\n\n1. Digital Media & Video Broadcast: Expo coverage, product launches, and executive interviews.\n2. Ecosystem Marketplace & Directory: Discovery platform for drones, GIS tools, and AI software.\n3. Drone Doctor Consultations: Technical diagnostics, compliance, and maintenance guidance.\n4. Brand Advertising & Sponsorship: Targeted promotion for UAV businesses and enterprise tech.\n\nSubmit an enquiry below for custom media or business collaboration.",
      showForm: true,
      defaultUserType: "Customer",
    },
  },
  {
    keywords: [
      "how can i contact dronetv",
      "contact dronetv",
      "contact",
      "email",
      "phone",
      "call",
      "address",
      "reach",
      "whatsapp",
      "location",
      "office",
      "where are you",
    ],
    reply: {
      text: "You can reach DroneTV through official verified channels:\n\nOffice: DroneTv 5A/6B, White Waters, Timber Lake Colony, Shaikpet, Hyderabad, Telangana, India\nEmail: bd@dronetv.in\nHelpline: +91 8882210038 / +91 9354688923\nSocial: YouTube (@indiadronetv), Instagram (@dronetv.in), Facebook (dronetv.in), X (@indiadronetv)\n\nYou can also submit an enquiry form directly in this chat!",
      showForm: true,
      defaultUserType: "Other",
    },
  },
  {
    keywords: [
      "price",
      "fee",
      "fees",
      "cost",
      "pricing",
      "rate",
      "charge",
      "duration",
      "schedule",
      "batch",
      "timing",
      "dates",
      "when start",
      "how much",
    ],
    reply: {
      text: "Course fees and batch schedules are determined directly by verified DGCA RPTO training partners and institutes. DroneTV does not publish fixed proprietary tuition rates. Please submit an enquiry below so our team can connect you with verified partner fee structures, upcoming batch dates, and syllabus details.",
      showForm: true,
      defaultUserType: "Student",
    },
  },
  {
    keywords: [
      "doctor",
      "drone doctor",
      "troubleshoot",
      "repair",
      "maintenance",
      "fix",
      "issue",
      "compliance",
      "technical support",
    ],
    reply: {
      text: "The Drone Doctor Help Line is DroneTV's dedicated support service for drone pilots and operators. It provides guidance on technical troubleshooting, firmware issues, sensor calibration, hardware maintenance, and DGCA compliance. You can reach the helpline at +91 8882210038 / +91 9354688923 or submit an enquiry.",
      showForm: true,
      defaultUserType: "Customer",
    },
  },
  {
    keywords: [
      "advertise",
      "advertising",
      "sponsor",
      "sponsorship",
      "promote",
      "promotion",
      "ad plan",
      "commercial",
      "tokens",
      "slot",
    ],
    reply: {
      text: "DroneTV offers tailored advertising and sponsorship plans for drone manufacturers, component suppliers, and enterprise software providers. Offerings include featured video showcases, Drone Expo stall walk-throughs, newsletter highlights, and portal banner placements. Submit an enquiry below to discuss partnership packages.",
      showForm: true,
      defaultUserType: "Customer",
    },
  },
  {
    keywords: [
      "event",
      "events",
      "expo",
      "drone expo",
      "mumbai",
      "hyderabad",
      "curtain raiser",
      "conference",
      "exhibition",
    ],
    reply: {
      text: "DroneTV is an official media partner for premier industry gatherings, including Drone Expo 2025 in Hyderabad and the official portal launch at the Drone Expo Curtain Raiser in Goregaon, Mumbai. DroneTV also covers upcoming editions including Drone Expo Mumbai (Sept 25-27), featuring interviews with top exhibitors, innovators, and policy leaders.",
    },
  },
  {
    keywords: [
      "video",
      "videos",
      "interview",
      "interviews",
      "youtube",
      "coverage",
      "media",
      "showcase",
    ],
    reply: {
      text: "DroneTV produces exclusive video content covering the UAV industry. Verified highlights include interviews with Dr. Pranay Kumar (RPTO Association), Gowrav Reddy (CropWings), Teja (Corteva on Drone Agriculture), Rini Bansal (Carbon Light design), Kalyan (XBOOM underwater drones), and Dev R (DroneTV Founder). Watch our coverage on YouTube at @indiadronetv.",
    },
  },
  {
    keywords: [
      "company",
      "companies",
      "marketplace",
      "directory",
      "partner",
      "partners",
      "vendor",
      "manufacturer",
    ],
    reply: {
      text: "DroneTV serves as India's #1 Drone, GIS, and AI Marketplace. It connects verified hardware manufacturers, software innovators, and commercial operators. Key partners and institutional collaborators include Telangana Govt, Andhra Govt, Odisha Govt, Corteva, Aparna, APGENCO, NCC Urban, Pioneer, IPAGE UMS, and Dev AI Labs.",
    },
  },
  {
    keywords: [
      "about dronetv",
      "about drone tv",
      "about us",
      "about you",
      "what is dronetv",
      "what is drone tv",
      "who are you",
      "founder",
      "dev r",
      "ceo",
      "mission",
      "vision",
      "who founded",
    ],
    reply: {
      text: "DroneTV (DroneTv.in) is the Voice of Drone Technology, GIS, and AI Technologies in India. Founded by Dev R (who also founded India Drone Academy and IPAGE UM Services), DroneTV unites innovators, pilots, manufacturers, and enterprise buyers under a unified digital media and marketplace ecosystem.",
    },
  },
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
    ],
    reply: {
      text: "Hello! Welcome to the DroneTV Assistant. How can I assist you with drone technology, GIS, AI, media coverage, or our ecosystem partners today? Feel free to ask or pick one of the quick questions below.",
    },
  },
]

export const FALLBACK_REPLY: BotReply = {
  text: "I do not have verified information on that specific topic. For unverified course fees, custom schedules, or specific technical enquiries, please submit the form below and our team will confirm the details for you.",
  showForm: true,
  defaultUserType: "Other",
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function isKeywordMatch(inputText: string, keyword: string): boolean {
  const cleanInput = inputText.toLowerCase().trim()
  const cleanKw = keyword.toLowerCase().trim()

  if (!cleanInput.includes(cleanKw)) return false

  const escaped = escapeRegex(cleanKw)
  const reg = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, "i")
  return reg.test(cleanInput)
}

export function getBotReply(input: string): BotReply {
  const text = input.trim()
  if (!text) return FALLBACK_REPLY

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => isKeywordMatch(text, kw))) {
      return rule.reply
    }
  }

  return FALLBACK_REPLY
}
