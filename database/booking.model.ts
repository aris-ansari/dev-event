import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Event from "./event.model";

/**
 * Booking document interface
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Ensure referenced event exists
 * before creating the booking
 */
BookingSchema.pre("save", async function () {
  const booking = this;

  // Ensure referenced event exists
  const existingEvent = await Event.findById(booking.eventId);

  if (!existingEvent) {
    throw new Error("Referenced event does not exist.");
  }
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
