import "dotenv/config"
import mongoose from "mongoose"
import connectDB from "../config/db"
import { Enquiry } from "../models/Enquiry"

const DEMO_FIXTURES = [
  {
    name: "[DEMO] Vikram Sharma",
    email: "demo.vikram@example.com",
    phone: "+91 9876543210",
    userType: "Customer" as const,
    interest: "[DEMO] Drone Expo 2025 Media Coverage",
    message:
      "[DEMO TEST FIXTURE - NOT A REAL INQUIRY] Inquiring about exhibition stall video coverage and leadership interview packages for Drone Expo Mumbai.",
    status: "New" as const,
  },
  {
    name: "[DEMO] Ananya Patel",
    email: "demo.ananya@example.com",
    phone: "+91 9876543211",
    userType: "Student" as const,
    interest: "[DEMO] DGCA RPTO Pilot Training Partner",
    message:
      "[DEMO TEST FIXTURE - NOT A REAL INQUIRY] Seeking verified syllabus and batch schedule details for affiliated DGCA Remote Pilot certification.",
    status: "Contacted" as const,
  },
  {
    name: "[DEMO] Rajesh Verma",
    email: "demo.rajesh@example.com",
    phone: "+91 9876543212",
    userType: "Other" as const,
    interest: "[DEMO] Drone Doctor Technical Consultation",
    message:
      "[DEMO TEST FIXTURE - NOT A REAL INQUIRY] Requesting diagnostic guidance regarding agricultural spraying drone firmware calibration.",
    status: "In Progress" as const,
  },
]

async function seedDemoEnquiries(): Promise<void> {
  await connectDB()

  const shouldClean = process.argv.includes("--clean")

  if (shouldClean) {
    console.log("[seedDemoEnquiries] Removing all existing test and junk records...")
    await Enquiry.deleteMany({})
    console.log("[seedDemoEnquiries] All prior test records removed successfully.")
  }

  // Insert verified demo fixtures clearly marked with [DEMO] tag
  console.log("[seedDemoEnquiries] Seeding clearly labeled demo fixtures...")
  for (const fixture of DEMO_FIXTURES) {
    const existing = await Enquiry.findOne({ email: fixture.email })
    if (existing) {
      await Enquiry.updateOne({ email: fixture.email }, { $set: fixture })
      console.log(`[seedDemoEnquiries] Updated demo fixture for ${fixture.email}`)
    } else {
      await Enquiry.create(fixture)
      console.log(`[seedDemoEnquiries] Created demo fixture for ${fixture.email}`)
    }
  }

  const count = await Enquiry.countDocuments()
  console.log(`[seedDemoEnquiries] Total enquiries in database: ${count}`)
  console.log("[seedDemoEnquiries] Demo fixtures are strictly tagged with [DEMO] and isolated from real enquiries.")
}

seedDemoEnquiries()
  .catch((err) => {
    console.error("[seedDemoEnquiries] Error:", err)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
