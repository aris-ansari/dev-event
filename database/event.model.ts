import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Event document interface
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate a URL-friendly slug from title
 */
const generateSlug = (title: string): string => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Normalize date into ISO format
 */
const normalizeDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format.");
  }

  return parsedDate.toISOString();
};

/**
 * Normalize time into HH:mm format
 */
const normalizeTime = (time: string): string => {
  const parsed = new Date(`1970-01-01T${time}`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid time format.");
  }

  return parsed.toTimeString().slice(0, 5);
};

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    overview: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      required: true,
      trim: true,
    },

    audience: {
      type: String,
      required: true,
      trim: true,
    },

    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "Agenda must contain at least one item.",
      },
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "Tags must contain at least one item.",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Pre-save hook for:
 * - validating required fields
 * - generating slug
 * - normalizing date and time
 */
EventSchema.pre("save", async function () {
  const event = this;

  const requiredFields: Array<keyof IEvent> = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  for (const field of requiredFields) {
    const value = event[field];

    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error("Some error");
    }
  }

  // Regenerate slug only when title changes
  if (event.isModified("title")) {
    event.slug = generateSlug(event.title);
  }

  // Normalize date and time before saving
  event.date = normalizeDate(event.date);
  event.time = normalizeTime(event.time);
});

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
