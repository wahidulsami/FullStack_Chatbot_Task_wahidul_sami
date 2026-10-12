import { QUICK_QUESTIONS, getBotReply, FALLBACK_REPLY } from "../../client/src/data/chatbotData"
import { app } from "../src/app"
import mongoose from "mongoose"
import connectDB from "../src/config/db"
import { Enquiry } from "../src/models/Enquiry"
import User from "../src/models/admin"
import { signAccessToken } from "../src/utils/jwt"
import type { Server } from "http"

async function runTests() {
  console.log("==========================================")
  console.log("1. TESTING CHATBOT KNOWLEDGE BASE & PREDEFINED QUESTIONS")
  console.log("==========================================")

  let passedRules = 0
  let totalRules = 0

  function assertRule(name: string, condition: boolean, detail?: string) {
    totalRules++
    if (condition) {
      passedRules++
      console.log(`  ✓ [PASS] ${name}`)
    } else {
      console.error(`  ✗ [FAIL] ${name}: ${detail}`)
      process.exitCode = 1
    }
  }

  // 1. Verify exactly 7 QUICK_QUESTIONS match Part 2 specification
  const EXPECTED_QUESTIONS = [
    "What services does DroneTV provide?",
    "What courses / training are available?",
    "How can I contact DroneTV?",
    "How can I register?",
    "I am interested in a service.",
    "I am a student.",
    "I want to speak with someone.",
  ]

  assertRule(
    "QUICK_QUESTIONS count is exactly 7",
    QUICK_QUESTIONS.length === 7,
    `Count: ${QUICK_QUESTIONS.length}`
  )

  for (const q of EXPECTED_QUESTIONS) {
    assertRule(
      `Predefined question supported: "${q}"`,
      QUICK_QUESTIONS.includes(q),
      `Missing from QUICK_QUESTIONS: ${q}`
    )
    const reply = getBotReply(q)
    assertRule(
      `Predefined question produces non-fallback reply: "${q}"`,
      reply.text !== FALLBACK_REPLY.text && reply.text.length > 20,
      `Reply: ${reply.text}`
    )
  }

  // Specific response triggers
  const speakReply = getBotReply("I want to speak with someone.")
  assertRule(
    "Speak with someone triggers lead collection form",
    speakReply.showForm === true && speakReply.defaultUserType === "Other",
    `Speak reply: ${JSON.stringify(speakReply)}`
  )

  const studentReply = getBotReply("I am a student.")
  assertRule(
    "Student question sets defaultUserType=Student and shows form",
    studentReply.showForm === true && studentReply.defaultUserType === "Student",
    `Student reply: ${JSON.stringify(studentReply)}`
  )

  const serviceReply = getBotReply("I am interested in a service.")
  assertRule(
    "Interested in service sets defaultUserType=Customer and shows form",
    serviceReply.showForm === true && serviceReply.defaultUserType === "Customer",
    `Service reply: ${JSON.stringify(serviceReply)}`
  )

  const registerReply = getBotReply("How can I register?")
  assertRule(
    "Register question shows form",
    registerReply.showForm === true,
    `Register reply: ${JSON.stringify(registerReply)}`
  )

  const contactReply = getBotReply("How can I contact DroneTV?")
  assertRule(
    "Contact question provides verified address & email",
    contactReply.text.includes("bd@dronetv.in") && contactReply.text.includes("Hyderabad"),
    `Contact reply: ${contactReply.text}`
  )

  // Unverified fee query disclaimer
  const feeReply = getBotReply("What are the course fees and pricing?")
  assertRule(
    "Unverified course fees state partner confirmation & triggers form",
    feeReply.showForm === true &&
      feeReply.text.toLowerCase().includes("partner") &&
      feeReply.text.toLowerCase().includes("enquiry"),
    `Fee reply: ${feeReply.text}`
  )

  // Fallback reply test
  const fallbackReply = getBotReply("Tell me a random story about a mystical dragon")
  assertRule(
    "Unmatched question returns graceful fallback with enquiry form",
    fallbackReply.showForm === true &&
      fallbackReply.text.toLowerCase().includes("unverified"),
    `Fallback reply: ${fallbackReply.text}`
  )

  console.log(`Chatbot tests: ${passedRules}/${totalRules} passed.`)

  console.log("\n==========================================")
  console.log("2. TESTING BACKEND REST ENDPOINTS")
  console.log("==========================================")

  await connectDB()

  const port = 5098
  const server: Server = await new Promise((resolve) => {
    const s = app.listen(port, () => resolve(s))
  })
  const baseUrl = `http://localhost:${port}/api`

  let passedApi = 0
  let totalApi = 0

  function assertApi(name: string, condition: boolean, detail?: string) {
    totalApi++
    if (condition) {
      passedApi++
      console.log(`  ✓ [PASS] ${name}`)
    } else {
      console.error(`  ✗ [FAIL] ${name}: ${detail}`)
      process.exitCode = 1
    }
  }

  try {
    // 1. Submit public enquiry
    const newEnquiryPayload = {
      name: "[TEST RUN] Lead Verifier",
      email: "lead.verifier@example.com",
      phone: "+91 9988776655",
      userType: "Customer",
      interest: "[TEST] Drone Expo Media Partnership",
      message: "Verifying public enquiry lead collection into MongoDB.",
    }

    const createRes = await fetch(`${baseUrl}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEnquiryPayload),
    })
    const createData = (await createRes.json()) as { enquiry?: { _id: string } }

    assertApi(
      "POST /api/enquiries - 201 Created",
      createRes.status === 201 && !!createData.enquiry?._id,
      `Status ${createRes.status}: ${JSON.stringify(createData)}`
    )

    const createdId = createData.enquiry?._id

    // 2. Reject invalid enquiry
    const invalidRes = await fetch(`${baseUrl}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A", email: "not-an-email", phone: "123" }),
    })
    const invalidData = (await invalidRes.json()) as { errors?: unknown }

    assertApi(
      "POST /api/enquiries - 400 Bad Request on invalid input",
      invalidRes.status === 400 && Array.isArray(invalidData.errors),
      `Status ${invalidRes.status}`
    )

    // 3. Admin token generation & verification
    const adminEmail = process.env.ADMIN_EMAIL || "ipagegroup@gmail.com"
    const adminUser = await User.findOne({ email: adminEmail })
    const adminToken = signAccessToken({
      id: adminUser?._id.toString() || "dummy-id",
      role: "admin",
    })

    assertApi("Admin JWT generated for API inspection", !!adminToken)

    // 4. GET /api/enquiries
    const getRes = await fetch(`${baseUrl}/enquiries`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const getData = (await getRes.json()) as { enquiries?: unknown[] }

    assertApi(
      "GET /api/enquiries - 200 OK with list",
      getRes.status === 200 && Array.isArray(getData.enquiries),
      `Status ${getRes.status}`
    )

    // 5. PATCH /api/enquiries/:id/status
    if (createdId) {
      const patchRes = await fetch(`${baseUrl}/enquiries/${createdId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: "In Progress" }),
      })
      const patchData = (await patchRes.json()) as { enquiry?: { status: string } }

      assertApi(
        "PATCH /api/enquiries/:id/status - 200 Updated",
        patchRes.status === 200 && patchData.enquiry?.status === "In Progress",
        `Status ${patchRes.status}: ${JSON.stringify(patchData)}`
      )

      // 6. DELETE /api/enquiries/:id
      const delRes = await fetch(`${baseUrl}/enquiries/${createdId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      })

      assertApi(
        "DELETE /api/enquiries/:id - 200 Deleted",
        delRes.status === 200,
        `Status ${delRes.status}`
      )
    }

    console.log(`Backend API tests: ${passedApi}/${totalApi} passed.`)
  } finally {
    server.close()
    await mongoose.disconnect()
  }

  console.log("\n==========================================")
  console.log("ALL TESTS FINISHED SUCCESSFULLY!")
  console.log("==========================================")
}

runTests().catch((err) => {
  console.error("Test execution failed:", err)
  process.exit(1)
})
