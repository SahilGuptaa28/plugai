import mongoose, { Schema } from "mongoose"

interface IChatbot {
  userId: mongoose.Types.ObjectId
  name: string
  supportEmail?: string
  knowledge?: string
}

const chatbotSchema = new Schema<IChatbot>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  supportEmail: {
    type: String,
  },
  knowledge: {
    type: String,
  },
}, { timestamps: true })

const Chatbot =
  mongoose.models.Chatbot ||
  mongoose.model<IChatbot>("Chatbot", chatbotSchema)

export default Chatbot