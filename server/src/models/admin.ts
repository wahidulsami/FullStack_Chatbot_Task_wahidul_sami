import bcrypt from "bcryptjs"
import { Schema, model, type HydratedDocument, type Model } from "mongoose"

const SALT_ROUNDS = 10

export const ROLES = ["admin"] as const
export type Role = (typeof ROLES)[number]

export interface IUser {
  name: string
  email: string
  password: string 
  refreshTokenHash?: string
  prevRefreshTokenHash?: string
  rotatedAt?: Date
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, {}, IUserMethods>
export type UserDocument = HydratedDocument<IUser, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [60, "Name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    refreshTokenHash: {
  type: String,
  select: false, 
},
    // Previous refresh token hash: valid for a short grace window after
    // rotation so overlapping/duplicate refresh requests don't kill the session.
    prevRefreshTokenHash: {
      type: String,
      select: false,
    },
    rotatedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: { values: ROLES, message: "Invalid role" },
      default: "admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const obj = ret as Record<string, unknown>
        delete obj.password
        delete obj.refreshTokenHash
        delete obj.prevRefreshTokenHash
        delete obj.__v
        return obj
      },
    },
  }
)

userSchema.pre("save", async function (this: UserDocument) {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

userSchema.method(
  "comparePassword",
  async function (this: UserDocument, candidatePassword: string): Promise<boolean> {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
  }
)

const User = model<IUser, UserModel>("User", userSchema)

export default User
