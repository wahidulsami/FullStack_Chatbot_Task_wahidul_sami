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
  "What are the course fees and pricing?",
  "What is the course duration and schedule?",
  "How can I register / enroll?",
  "How can I contact DroneTV?",
  "I want to speak with someone.",
]

export const WELCOME_TEXT =
  "Hi! I'm the DroneTV Assistant. How can I help you today? Ask about our courses, course fees, duration, services, or how to register."

type Rule = {
  keywords: string[]
  reply: BotReply
}

// ক্রম গুরুত্বপূর্ণ: আগে ফর্ম সংক্রান্ত বা নির্দিষ্ট নিয়ম, পরে সাধারণ নিয়ম, সবার শেষে greeting
const RULES: Rule[] = [
  {
    keywords: [
      "speak",
      "talk",
      "human",
      "someone",
      "agent",
      "call me",
      "support",
      "help",
      "কথা বলতে চাই",
      "মানুষ",
      "প্রতিনিধি",
      "সাহায্য",
    ],
    reply: {
      text: "Sure! Share your details in the form below and an advisor from our support team will get in touch with you shortly.",
      showForm: true,
      defaultUserType: "Other",
    },
  },
  {
    keywords: [
      "student",
      "career",
      "job",
      "internship",
      "placement",
      "study",
      "ছাত্র",
      "শিক্ষার্থী",
      "ক্যারিয়ার",
      "চাকরি",
      "ইন্টার্নশিপ",
    ],
    reply: {
      text: "Great! Students use DroneTV to discover hands-on drone pilot training, GIS portfolio building, and career placement support with leading drone tech startups. Share your details below and our counselor will guide you.",
      showForm: true,
      defaultUserType: "Student",
    },
  },
  {
    keywords: [
      "interested in a service",
      "interested",
      "hire",
      "quote",
      "client",
      "কাজের জন্য",
      "ভাড়া",
      "হায়ার",
    ],
    reply: {
      text: "Wonderful — tell us what you need in the form below and we will connect you with our aerial operations and GIS team.",
      showForm: true,
      defaultUserType: "Customer",
    },
  },
  {
    keywords: [
      "register",
      "registration",
      "enroll",
      "enrollment",
      "sign up",
      "join",
      "admission",
      "apply",
      "ভর্তি",
      "রেজিস্ট্রেশন",
      "আবেদন",
      "যুক্ত হব",
    ],
    reply: {
      text: "To register for an upcoming batch, submit the enquiry form below. Our admissions coordinator will verify your information and share the confirmation details.",
      showForm: true,
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
      "খরচ",
      "ফি",
      "টাকা",
      "মূল্য",
      "কত টাকা",
    ],
    reply: {
      text: "Our course fees are structured by specialization:\n\n• Remote Pilot Certification (Basic): $150 (৳15,000)\n• GIS Survey & Land Mapping: $280 (৳28,000)\n• Advanced AI & Photogrammetry: $450 (৳45,000)\n\n💡 We provide 10% student discounts and flexible 2-installment payment options. Inquire below to reserve your seat!",
    },
  },
  {
    keywords: [
      "duration",
      "time",
      "how long",
      "schedule",
      "timing",
      "length",
      "batch",
      "period",
      "সময়",
      "কতদিন",
      "মেয়াদ",
      "শিডিউল",
      "ক্লাস",
      "সময়কাল",
    ],
    reply: {
      text: "Course durations vary based on the learning track:\n\n• Weekend Intensive Track: 2 Weeks (Saturdays & Sundays)\n• Standard Pilot Certification: 4 Weeks (includes 16 flight hours)\n• Professional GIS & AI Master: 8 Weeks (hands-on project work)\n\nNew batches start on the 1st and 15th of every month. Both weekday and weekend schedules are available!",
    },
  },
  {
    keywords: [
      "certificate",
      "certification",
      "license",
      "certified",
      "credential",
      "সার্টিফিকেট",
      "সনদপত্র",
      "লাইসেন্স",
      "সনদ",
    ],
    reply: {
      text: "Yes! Upon successfully completing both simulator assessments and physical flying exams, you will receive a verified, industry-recognized Drone Pilot Certificate. This credential allows you to operate commercially in survey, mapping, and media industries.",
    },
  },
  {
    keywords: [
      "discount",
      "offer",
      "promo",
      "concession",
      "ছাড়",
      "অফার",
      "ডিসকাউন্ট",
    ],
    reply: {
      text: "We currently have two active offers:\n\n1. 🎓 Student Discount: 10% off with valid college/university ID\n2. 👥 Group Enrollment: 15% off when enrolling with 3 or more peers\n\nAsk our team or fill in the enquiry form to claim your offer!",
    },
  },
  {
    keywords: [
      "service",
      "services",
      "provide",
      "offer",
      "aerial",
      "survey",
      "inspection",
      "সার্ভিস",
      "সেবা",
      "ড্রোন সেবা",
    ],
    reply: {
      text: "DroneTV brings the drone, GIS, and AI ecosystem into one place:\n\n• Commercial Aerial Videography & Media\n• Topographical Survey & Land Mapping\n• Agricultural Crop Health & Spraying Analytics\n• Solar & Infrastructure Defect Inspection\n\nVisit our Services page for full details or request a quote!",
    },
  },
  {
    keywords: [
      "course",
      "courses",
      "training",
      "pilot",
      "learn",
      "কোর্স",
      "ট্রেনিং",
      "প্রশিক্ষণ",
      "পাইলট",
      "ক্লাস",
    ],
    reply: {
      text: "We offer hands-on training with professional flight simulators and actual flight testing:\n\n1. DGCA Remote Pilot Certification\n2. GIS Surveying & Photogrammetry\n3. Precision Agriculture Drone Operations\n4. Drone Data Processing & AI Vision\n\nVisit our Courses page to view curriculum and upcoming batch openings.",
    },
  },
  {
    keywords: [
      "contact",
      "email",
      "phone",
      "call",
      "address",
      "reach",
      "whatsapp",
      "location",
      "office",
      "যোগাযোগ",
      "ফোন",
      "ঠিকানা",
      "নাম্বার",
      "হোয়াটসঅ্যাপ",
      "অফিস",
    ],
    reply: {
      text: "You can reach DroneTV & ChatBot Academy directly:\n\n📧 Email: hello@chatbotacademy.com\n📞 Phone / WhatsApp: +880 1712 345678 / +91 75201 23555\n📍 Office: Dhaka, Bangladesh & Hyderabad, India\n🕒 Working Hours: Saturday – Thursday, 9:00 AM – 6:00 PM\n\nYou can also submit an enquiry right here in the chat!",
    },
  },
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "salam",
      "assalamu alaikum",
      "greetings",
      "হাই",
      "হ্যালো",
      "সালাম",
      "নমস্কার",
      "কেমন আছেন",
    ],
    reply: {
      text: "Hello! Welcome to DroneTV Assistant 👋 How can I help you today? You can ask about our courses, course fees, duration, services, or how to register!",
    },
  },
]

export const FALLBACK_REPLY: BotReply = {
  text: "I didn't quite catch that. You can ask about courses, fees/pricing, duration, services, or contact details — or select one of the quick questions above!\n\n(বাংলায় 'কোর্স', 'ফি', 'সময়' বা 'যোগাযোগ' লিখেও প্রশ্ন করতে পারেন)",
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function isKeywordMatch(inputText: string, keyword: string): boolean {
  const cleanInput = inputText.toLowerCase()
  const cleanKw = keyword.toLowerCase()

  if (!cleanInput.includes(cleanKw)) return false

  // For non-ASCII words (such as Bengali), substring/stem match is ideal to handle inflection suffixes (যেমন "কোর্সের")
  const hasNonAscii = Array.from(cleanKw).some((char) => (char.codePointAt(0) ?? 0) > 127)
  if (hasNonAscii) {
    return true
  }

  // For English / ASCII, ensure whole word boundary so "hi" doesn't match "this" or "fee" match "coffee"
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
