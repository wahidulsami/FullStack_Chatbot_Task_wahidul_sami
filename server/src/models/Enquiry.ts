import { Schema, model, Document } from "mongoose";

export const USER_TYPES = ["Student", "Customer", "Other"] as const;
export const STATUSES = ["New", "Contacted", "In Progress", "Closed"] as const;

export type UserType = (typeof USER_TYPES)[number];
export type EnquiryStatus = (typeof STATUSES)[number];

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"],
    },
    userType: {
      type: String,
      enum: { values: USER_TYPES, message: "Invalid user type" },
      required: [true, "User type is required"],
    },
    interest: {
      type: String,
      required: [true, "Service or course of interest is required"],
      trim: true,
      maxlength: [150, "Interest is too long"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [5, "Message is too short"],
      maxlength: [2000, "Message is too long (max 2000 characters)"],
    },
    status: {
      type: String,
      enum: { values: STATUSES, message: "Invalid status" },
      default: "New",
    },
  },
  { timestamps: true } 
);

// Search ও filter দ্রুত করার জন্য
enquirySchema.index({ status: 1, userType: 1 });
enquirySchema.index({ createdAt: -1 });

export const Enquiry = model<IEnquiry>("Enquiry", enquirySchema);