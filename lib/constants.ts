interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const events: Props[] = [
  {
    image: "/images/event1.png",
    title: "React Summit 2026",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 18, 2026",
    time: "10:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "Google I/O Extended",
    slug: "google-io-extended",
    location: "Bangalore, India",
    date: "July 5, 2026",
    time: "9:30 AM",
  },
  {
    image: "/images/event3.png",
    title: "Hack Delhi 2026",
    slug: "hack-delhi-2026",
    location: "New Delhi, India",
    date: "August 12, 2026",
    time: "11:00 AM",
  },
  {
    image: "/images/event4.png",
    title: "AI Builders Meetup",
    slug: "ai-builders-meetup",
    location: "San Francisco, USA",
    date: "September 2, 2026",
    time: "6:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "JS World Conference",
    slug: "js-world-conference",
    location: "Online Event",
    date: "October 14, 2026",
    time: "7:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "Startup Weekend Hackathon",
    slug: "startup-weekend-hackathon",
    location: "Mumbai, India",
    date: "November 8, 2026",
    time: "1:00 PM",
  },
];

export default events;
