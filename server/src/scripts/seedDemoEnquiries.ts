import "dotenv/config"
import mongoose from "mongoose"
import connectDB from "../config/db"
import { Enquiry, type EnquiryStatus, type UserType } from "../models/Enquiry"

const SAMPLE_NAMES = [
  "Vikram Sharma", "Ananya Patel", "Rajesh Verma", "Priya Nair", "Rohan Gupta",
  "Sneha Reddy", "Amit Joshi", "Kavita Sundaram", "Tariq Khan", "Deepa Menon",
  "Arjun Kapoor", "Meera Rao", "Karthik Swamy", "Sunita Deshmukh", "Alok Mishra",
  "Pooja Choudhury", "Nikhil Bhat", "Divya Iyer", "Sanjay Hegde", "Vandana Rao",
  "Rohit Nambiar", "Neha Kulkarni", "Suresh Pillai", "Swati Sen", "Harish Varma",
  "Tanvi Agarwal", "Gaurav Saxena", "Pallavi Das", "Nitin Kaul", "Shilpa Chawla",
  "Manish Tiwari", "Shreya Bose", "Rahul Trivedi", "Payal Mukherjee", "Abhinav Pandey",
  "Aarti Seth", "Vivek Menon", "Bhavna Jain", "Sameer Chauhan", "Ritu Singhania",
  "Kunal Chopra", "Jyoti Bhattacharya", "Siddharth Malhotra", "Geeta Goswami", "Varun Aggarwal",
  "Anita Roy", "Deepak Bansal", "Roshni Roy", "Akash Ganguly", "Kiran Mazumdar",
  "Naveen Jindal", "Aparna Sen", "Mohit Suri", "Devika Rani", "Pranav Mohan"
]

const USER_TYPES: UserType[] = ["Customer", "Student", "Other"]
const STATUSES: EnquiryStatus[] = ["New", "Contacted", "In Progress", "Closed"]

const INTERESTS = [
  "Drone Expo 2025 Media Coverage",
  "DGCA RPTO Pilot Training Partner",
  "Drone Doctor Technical Consultation",
  "Precision Agriculture Thermal Survey",
  "Infrastructure Inspection GIS Mapping",
  "Disaster Management Surveillance",
  "Drone Repair & Battery Diagnostic",
  "Ecosystem Partnership Program"
]

async function seedDemoEnquiries(): Promise<void> {
  await connectDB()

  const shouldClean = process.argv.includes("--clean")

  if (shouldClean) {
    console.log("[seedDemoEnquiries] Removing all existing test and junk records...")
    await Enquiry.deleteMany({})
    console.log("[seedDemoEnquiries] All prior test records removed successfully.")
  }

  console.log("[seedDemoEnquiries] Seeding 55 clearly labeled demo fixtures...")

  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  for (let i = 0; i < SAMPLE_NAMES.length; i++) {
    const name = SAMPLE_NAMES[i]
    const email = `demo.${name.toLowerCase().replace(/\s+/g, ".")}@example.com`
    const phone = `+91 ${9800000000 + i * 3731}`.slice(0, 15)
    const userType = USER_TYPES[i % USER_TYPES.length]
    const status = STATUSES[i % STATUSES.length]
    const interest = INTERESTS[i % INTERESTS.length]
    const message = `[DEMO TEST FIXTURE ${i + 1}] Inquiry regarding ${interest}. Seeking technical consultation and scheduling details.`

    // Stagger dates over the past 45 days
    const createdAt = new Date(now - (SAMPLE_NAMES.length - i) * (dayMs * 0.8))

    await Enquiry.findOneAndUpdate(
      { email },
      {
        name: `[DEMO] ${name}`,
        email,
        phone,
        userType,
        interest: `[DEMO] ${interest}`,
        message,
        status,
        createdAt,
        updatedAt: createdAt,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
  }

  const count = await Enquiry.countDocuments()
  console.log(`[seedDemoEnquiries] Total enquiries in database: ${count}`)
  console.log("[seedDemoEnquiries] Demo fixtures seeded successfully.")
}

seedDemoEnquiries()
  .catch((err) => {
    console.error("[seedDemoEnquiries] Error:", err)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
