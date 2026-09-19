// Central content store for Umang Foundation.
// In production this will be replaced by data fetched from the Django CMS API.

export const org = {
  name: "Umang Foundation",
  tagline: "Threads of change, stitched by community.",
  shortDesc:
    "Umang Foundation works across education, healthcare and livelihood to build lasting opportunity for underprivileged children and communities across India.",
  phone: "+91 9898989898",
  email: "emailname@gmail.com",
  address: "Address of the organization",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};

export const stats = [
  { label: "Children in school", value: "12,400+" },
  { label: "Villages reached", value: "186" },
  { label: "Health camps held", value: "340" },
  { label: "Women trained for livelihoods", value: "3,050" },
];

export const missionVision = {
  mission:
    "To create a lasting impact in the lives of underprivileged children and communities by providing education, women's empowerment, and livelihood opportunities.",
  vision:
    "A world where every child has access to quality education, healthcare, and the opportunity to achieve their full potential.",
  history: [
    { year: "2011", text: "Founded in Kolhapur with a single after-school reading room for 30 children." },
    { year: "2014", text: "Launched the first mobile health unit, reaching remote villages across the district." },
    { year: "2017", text: "Opened the Livelihood & Stitching Centre, training the first cohort of 45 women." },
    { year: "2019", text: "Crossed 100 partner villages across Maharashtra and Karnataka." },
    { year: "2022", text: "Introduced digital classrooms and scholarship pipelines for higher education." },
    { year: "2025", text: "Reached over 12,000 children and 3,000 women through combined programs." },
  ],
};

export const programs = [
  {
    id: "education",
    title: "Education Programs",
    summary:
      "Bridge schools, digital classrooms, and scholarships that keep underprivileged children learning from their first alphabet to their first job.",
    impact: "12,400+ children enrolled across 186 villages",
    color: "indigo",
  },
  {
    id: "healthcare",
    title: "Healthcare Initiatives",
    summary:
      "Mobile health units, free health camps and maternal-care outreach bringing basic healthcare to communities with no nearby clinic.",
    impact: "340 health camps, 61,000+ patients screened",
    color: "sage",
  },
  {
    id: "livelihood",
    title: "Livelihood Programs",
    summary:
      "Vocational training in stitching, food processing and digital skills, helping women and youth build steady, independent incomes.",
    impact: "3,050 women trained, 78% now earning independently",
    color: "marigold",
  },
];

export const projects = [
  {
    id: "bridge-school-kolhapur",
    title: "Bridge School — Kolhapur Rural Belt",
    sector: "Education",
    location: "Kolhapur District, Maharashtra",
    timeline: "2022 – ongoing",
    beneficiaries: "1,800 children",
    status: "Ongoing",
    summary:
      "After-school bridge classes helping first-generation learners catch up to grade level in reading and math before rejoining government schools.",
  },
  {
    id: "mobile-health-unit",
    title: "Mobile Health Unit — Sahyadri Villages",
    sector: "Healthcare",
    location: "Sangli & Satara Districts",
    timeline: "2014 – ongoing",
    beneficiaries: "9,600 patients / year",
    status: "Ongoing",
    summary:
      "A van-based clinic visiting 22 villages on rotation, offering check-ups, maternal care, and referrals to district hospitals.",
  },
  {
    id: "stitching-livelihood-centre",
    title: "Stitching & Livelihood Centre",
    sector: "Livelihood",
    location: "Kolhapur City",
    timeline: "2017 – ongoing",
    beneficiaries: "3,050 women trained",
    status: "Ongoing",
    summary:
      "A six-month vocational program in tailoring and textile work, ending in placement support or seed capital for a home business.",
  },
  {
    id: "digital-classroom-pilot",
    title: "Digital Classroom Pilot",
    sector: "Education",
    location: "12 partner schools, Karnataka border belt",
    timeline: "2022 – 2023",
    beneficiaries: "2,300 children",
    status: "Completed",
    summary:
      "Solar-powered tablets and offline learning content deployed in schools without reliable electricity or internet.",
  },
  {
    id: "maternal-nutrition-drive",
    title: "Maternal Nutrition Drive",
    sector: "Healthcare",
    location: "40 villages, Kolhapur & Sangli",
    timeline: "2023 – 2024",
    beneficiaries: "1,400 mothers",
    status: "Completed",
    summary:
      "Supplementary nutrition kits and counselling for pregnant and nursing women in food-insecure households.",
  },
  {
    id: "youth-digital-skills",
    title: "Youth Digital Skills Bootcamp",
    sector: "Livelihood",
    location: "Kolhapur & Ichalkaranji",
    timeline: "2024 – ongoing",
    beneficiaries: "620 youth",
    status: "Ongoing",
    summary:
      "Basic computer literacy, spoken English, and job-readiness training for young people aged 18–25.",
  },
];

export const blogPosts = [
  {
    id: "sunita-story",
    title: "From student to stitching instructor: Sunita's journey",
    date: "2026-06-02",
    category: "Success Story",
    excerpt:
      "Five years ago Sunita sat in the back row of our bridge school. Today she teaches the tailoring batch that changed her own life.",
  },
  {
    id: "monsoon-health-camps",
    title: "Why we schedule health camps before the monsoon",
    date: "2026-05-14",
    category: "Project Update",
    excerpt:
      "Waterborne illness spikes every July in the villages we serve. Here is how our mobile health unit plans around the rains.",
  },
  {
    id: "digital-classroom-year-one",
    title: "One year of the digital classroom pilot: what we learned",
    date: "2026-04-20",
    category: "Project Update",
    excerpt:
      "Solar tablets solved our electricity problem, but the real challenge turned out to be teacher training. A look back at year one.",
  },
  {
    id: "womens-day-cohort",
    title: "Meet the newest cohort of the Livelihood Centre",
    date: "2026-03-08",
    category: "Interview",
    excerpt:
      "Eighteen women started this year's stitching program on Women's Day. We asked three of them why they signed up.",
  },
];

export const pressMentions = [
  { outlet: "Sakal Times", title: "Kolhapur NGO's mobile clinics reach 20,000 villagers", year: "2025", url: "#" },
  { outlet: "Maharashtra Herald", title: "Umang Foundation's stitching centre marks 3,000 graduates", year: "2025", url: "#" },
  { outlet: "The Local Bulletin", title: "Solar classrooms bring digital learning to off-grid schools", year: "2024", url: "#" },
];

export const events = [
  { id: "e1", title: "Annual Health Camp — Panhala", date: "2026-09-12", location: "Panhala, Kolhapur" },
  { id: "e2", title: "Volunteer Orientation Day", date: "2026-09-20", location: "Umang Foundation Office, Kolhapur" },
  { id: "e3", title: "Livelihood Centre Graduation", date: "2026-10-05", location: "Kolhapur City Hall" },
  { id: "e4", title: "Fundraising Gala Evening", date: "2026-10-18", location: "Hotel Sayaji, Kolhapur" },
];

export const donationAmounts = [500, 1000, 2500, 5000];

export const donationOptions = [
  { id: "education", label: "Education Programs" },
  { id: "healthcare", label: "Healthcare Initiatives" },
  { id: "livelihood", label: "Livelihood Programs" },
  { id: "wherever", label: "Wherever needed most" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Projects", to: "/projects" },
  { label: "Media", to: "/media" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
