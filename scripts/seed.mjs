/**
 * MentorLagbe demo data seeder.
 *
 *   npm run seed
 *
 * Creates (through Better Auth, so passwords really work):
 *   admin@mentorlagbe.com / Admin@1234
 *   6 tutors  tutor1..6@mentorlagbe.dev  / Tutor@1234
 *   6 students student1..6@mentorlagbe.dev / Student@1234
 *
 * Plus 15 tuitions (12 approved + 2 pending + 1 rejected), applications,
 * reviews and Stripe payment records — all connected by email/ObjectId.
 */
import fs from "node:fs";
import path from "node:path";
import { ObjectId } from "mongodb";
import { createAuth } from "../lib/auth-config.mjs";

/* ------------------------------------------------------------------ */
/* Tiny .env loader (no dotenv dependency in the client)               */
/* ------------------------------------------------------------------ */
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const full = path.resolve(process.cwd(), file);
    if (!fs.existsSync(full)) continue;
    for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, raw] = match;
      if (process.env[key]) continue;
      process.env[key] = raw.replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const { auth, db } = createAuth();
const users = db.collection("users");
const accounts = db.collection("account");
const sessions = db.collection("session");
const tuitions = db.collection("tuitions");
const applications = db.collection("applications");
const payments = db.collection("payments");

const PASSWORD = {
  admin: "Admin@1234",
  tutor: "Tutor@1234",
  student: "Student@1234",
};

const adminSeed = {
  name: "MentorLagbe Admin",
  email: "admin@mentorlagbe.com",
  password: PASSWORD.admin,
  role: "admin",
  plan: "pro",
  phone: "+8801700000000",
  bio: "Platform moderator at MentorLagbe. Reviews tuition posts and keeps the marketplace safe.",
};

const tutorSeed = [
  {
    name: "Nafisa Rahman",
    email: "tutor1@mentorlagbe.dev",
    plan: "pro",
    phone: "+8801711000001",
    bio: "BUET graduate. 7 years of teaching Higher Math to Class 9–12 and admission candidates.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
  },
  {
    name: "Tanvir Hasan",
    email: "tutor2@mentorlagbe.dev",
    plan: "free",
    phone: "+8801711000002",
    bio: "Physics lecturer. I make HSC physics intuitive with real-life demonstrations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sadia Islam",
    email: "tutor3@mentorlagbe.dev",
    plan: "pro",
    phone: "+8801711000003",
    bio: "Medical student at DMC. Chemistry and Biology mentor for admission aspirants.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Rafiul Karim",
    email: "tutor4@mentorlagbe.dev",
    plan: "pro",
    phone: "+8801711000004",
    bio: "Full-stack developer and mentor. I teach Python, JavaScript and HSC ICT from scratch.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Farhana Akter",
    email: "tutor5@mentorlagbe.dev",
    plan: "pro",
    phone: "+8801711000005",
    bio: "IELTS 8.5 trainer. Focused on speaking fluency and band-7+ writing structures.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    name: "Mahmudul Hasan",
    email: "tutor6@mentorlagbe.dev",
    plan: "free",
    phone: "+8801711000006",
    bio: "Chartered Accountant (part-qualified). Accounting and Business Studies for HSC.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

const studentSeed = [
  { name: "Ayesha Siddiqua", email: "student1@mentorlagbe.dev", plan: "free" },
  { name: "Rifat Chowdhury", email: "student2@mentorlagbe.dev", plan: "pro" },
  { name: "Nusrat Jahan", email: "student3@mentorlagbe.dev", plan: "free" },
  { name: "Samiul Alam", email: "student4@mentorlagbe.dev", plan: "free" },
  { name: "Tahsin Ahmed", email: "student5@mentorlagbe.dev", plan: "pro" },
  { name: "Mim Akter", email: "student6@mentorlagbe.dev", plan: "free" },
];

const tuitionSeed = [
  {
    tutor: 0,
    title: "Higher Math Mastery for Class 9–10",
    subject: "Mathematics",
    classLevel: "Class 9-10",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 3500,
    daysPerWeek: 3,
    bannerImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80",
    description:
      "A structured Higher Math batch covering algebra, geometry and trigonometry with weekly problem-solving exams. Every class ends with a 20-minute doubt session, and parents get a monthly progress report.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 1,
    title: "HSC Physics Crash Course with Live Demos",
    subject: "Physics",
    classLevel: "HSC",
    mode: "Offline",
    location: "Agrabad, Chattogram",
    monthlyFee: 4500,
    daysPerWeek: 3,
    bannerImage:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&q=80",
    description:
      "Finish the HSC Physics syllabus with concept-first teaching, past-paper drills and experiment demonstrations. Small batch of 12 students so everyone gets individual attention.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 2,
    title: "Organic Chemistry Foundation for Admission",
    subject: "Chemistry",
    classLevel: "Admission",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 4000,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    description:
      "Reaction mechanisms made visual. This batch covers the organic chemistry portion of medical and engineering admission tests with weekly MCQ exams and a personal mistake log.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 4,
    title: "IELTS 7+ Speaking & Writing Intensive",
    subject: "IELTS",
    classLevel: "IELTS",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 6000,
    daysPerWeek: 4,
    bannerImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    description:
      "Band-7+ focused IELTS preparation: daily speaking drills, examiner-style feedback, Task 2 essay frameworks and two full mock tests per month. Includes a writing correction bank.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 3,
    title: "Python & Web Development for Absolute Beginners",
    subject: "Programming",
    classLevel: "University",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 5000,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    description:
      "Learn Python fundamentals then build real projects: a CLI tool, a REST API and a small React app. Weekly code review on GitHub and a certificate after the final project.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 2,
    title: "Biology for Medical Admission (1-on-1)",
    subject: "Biology",
    classLevel: "Admission",
    mode: "Offline",
    location: "Khulshi, Chattogram",
    monthlyFee: 5500,
    daysPerWeek: 4,
    bannerImage:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    description:
      "One-on-one mentorship for medical admission biology. Chapter-wise MCQ sets, diagram practice and a personalised revision calendar built around your weak topics.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 4,
    title: "English Grammar Booster for Class 6–8",
    subject: "English",
    classLevel: "Class 6-8",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 2500,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80",
    description:
      "Grammar without boredom: games, story writing and weekly speaking circles. Covers the full school syllabus plus creative writing that actually gets marked well.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 5,
    title: "Accounting Fundamentals for HSC",
    subject: "Accounting",
    classLevel: "HSC",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 3000,
    daysPerWeek: 3,
    bannerImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    description:
      "Ledger to final accounts, step by step. Includes exam-style problem sets, a formula sheet and monthly model tests aligned with the HSC board pattern.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 0,
    title: "Primary Math & Science (Class 1–5)",
    subject: "Mathematics",
    classLevel: "Class 1-5",
    mode: "Offline",
    location: "Nasirabad, Chattogram",
    monthlyFee: 2000,
    daysPerWeek: 5,
    bannerImage:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=80",
    description:
      "A gentle, confidence-first batch for young learners. Short focused sessions, hands-on science activities and homework that parents can follow easily.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 3,
    title: "HSC ICT & Programming in C",
    subject: "ICT",
    classLevel: "HSC",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 2800,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    description:
      "Board-focused ICT with practical C programming. Number systems, logic gates and HTML made simple, plus a full model-test series before the exam.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 4,
    title: "Spoken English for Professionals",
    subject: "English",
    classLevel: "Adult",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 4500,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    description:
      "For job holders who freeze in meetings. Fluency routines, interview simulations and pronunciation coaching in a supportive small group, twice a week after office hours.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 0,
    title: "Admission Math Problem Solving Lab",
    subject: "Mathematics",
    classLevel: "Admission",
    mode: "Offline",
    location: "Chawkbazar, Chattogram",
    monthlyFee: 5000,
    daysPerWeek: 3,
    bannerImage:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
    description:
      "Engineering admission math, solved fast. Timed problem sets, shortcut techniques and weekly ranking exams. Ideal if your concepts are fine but your speed is not.",
    approvalStatus: "approved",
    isActive: true,
  },
  {
    tutor: 1,
    title: "Class 8 Science Foundation Batch",
    subject: "Science",
    classLevel: "Class 6-8",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 2600,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
    description:
      "A concept-first science batch that prepares Class 8 students for the SSC syllabus. Includes experiment videos, monthly quizzes and parent check-ins.",
    approvalStatus: "pending",
    isActive: true,
  },
  {
    tutor: 5,
    title: "Business Studies Revision Batch",
    subject: "Business Studies",
    classLevel: "HSC",
    mode: "Offline",
    location: "Pahartali, Chattogram",
    monthlyFee: 3200,
    daysPerWeek: 2,
    bannerImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    description:
      "Rapid revision of the HSC Business Studies syllabus with answer-writing practice and board question analysis. New batch starting next month.",
    approvalStatus: "pending",
    isActive: true,
  },
  {
    tutor: 2,
    title: "Chemistry Olympiad Preparation",
    subject: "Chemistry",
    classLevel: "Olympiad",
    mode: "Online",
    location: "Chattogram",
    monthlyFee: 7000,
    daysPerWeek: 1,
    bannerImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    description:
      "Advanced problem solving for chemistry Olympiad aspirants — stoichiometry, organic mechanisms and timed mock rounds.",
    approvalStatus: "rejected",
    isActive: true,
  },
];

const applicationSeed = [
  {
    student: 0,
    tuition: 0,
    phone: "+8801811000001",
    schedule: "Sat–Mon, 6:00–8:00 PM",
    note: "I struggle with trigonometry word problems. Can we focus there first?",
    status: "accepted",
    review: {
      rating: 5,
      feedback:
        "Nafisa apu explains every step and never rushes. My math grade went from B to A in two months.",
    },
  },
  {
    student: 1,
    tuition: 1,
    phone: "+8801811000002",
    schedule: "Fri–Sat, 10:00 AM–12:00 PM",
    note: "I want to finish the HSC syllabus before the model tests.",
    status: "accepted",
    review: {
      rating: 5,
      feedback:
        "The live demos made physics click for me. Highly recommended for HSC students.",
    },
  },
  {
    student: 2,
    tuition: 3,
    phone: "+8801811000003",
    schedule: "Daily, 8:00–9:30 PM",
    note: "Targeting band 7.5 for a scholarship application. Speaking is my weakest part.",
    status: "accepted",
    review: {
      rating: 4,
      feedback:
        "Very organised speaking drills. I improved from 6.0 to 7.0 in writing.",
    },
  },
  {
    student: 3,
    tuition: 4,
    phone: "+8801811000004",
    schedule: "Sun–Tue, 7:00–9:00 PM",
    note: "Complete beginner. I know a little HTML from YouTube.",
    status: "pending",
  },
  {
    student: 4,
    tuition: 5,
    phone: "+8801811000005",
    schedule: "Mon–Thu, 4:00–6:00 PM",
    note: "Preparing for medical admission in 2027. Biology is my weakest subject.",
    status: "pending",
  },
  {
    student: 0,
    tuition: 7,
    phone: "+8801811000001",
    schedule: "Sat–Mon, 5:00–6:30 PM",
    note: "Need help with final accounts before the half-yearly exam.",
    status: "rejected",
  },
  {
    student: 5,
    tuition: 9,
    phone: "+8801811000006",
    schedule: "Wed–Fri, 6:00–7:30 PM",
    note: "I want to learn C programming properly, not just for the board exam.",
    status: "pending",
  },
  {
    student: 1,
    tuition: 11,
    phone: "+8801811000002",
    schedule: "Thu–Sat, 9:00–11:00 AM",
    note: "My speed is the main problem. I can solve but never finish in time.",
    status: "pending",
  },
];

const paymentSeed = [
  {
    userEmail: "tutor1@mentorlagbe.dev",
    userName: "Nafisa Rahman",
    userRole: "tutor",
    planName: "Pro Tutor",
    amount: 15,
    currency: "USD",
    transactionId: "pi_seed_nafisa_001",
    stripeSessionId: "cs_test_seed_nafisa_001",
    paidAt: new Date(Date.now() - 12 * 86400000),
  },
  {
    userEmail: "tutor3@mentorlagbe.dev",
    userName: "Sadia Islam",
    userRole: "tutor",
    planName: "Pro Tutor",
    amount: 15,
    currency: "USD",
    transactionId: "pi_seed_sadia_002",
    stripeSessionId: "cs_test_seed_sadia_002",
    paidAt: new Date(Date.now() - 8 * 86400000),
  },
  {
    userEmail: "tutor5@mentorlagbe.dev",
    userName: "Farhana Akter",
    userRole: "tutor",
    planName: "Pro Tutor",
    amount: 15,
    currency: "USD",
    transactionId: "pi_seed_farhana_005",
    stripeSessionId: "cs_test_seed_farhana_005",
    paidAt: new Date(Date.now() - 6 * 86400000),
  },
  {
    userEmail: "student2@mentorlagbe.dev",
    userName: "Rifat Chowdhury",
    userRole: "student",
    planName: "Pro Student",
    amount: 10,
    currency: "USD",
    transactionId: "pi_seed_rifat_003",
    stripeSessionId: "cs_test_seed_rifat_003",
    paidAt: new Date(Date.now() - 5 * 86400000),
  },
  {
    userEmail: "student5@mentorlagbe.dev",
    userName: "Tahsin Ahmed",
    userRole: "student",
    planName: "Pro Student",
    amount: 10,
    currency: "USD",
    transactionId: "pi_seed_tahsin_004",
    stripeSessionId: "cs_test_seed_tahsin_004",
    paidAt: new Date(Date.now() - 2 * 86400000),
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
async function removeSeedUser(email) {
  const user = await users.findOne({ email });
  if (!user) return;

  const ids = [user._id, String(user._id)];
  await Promise.all([
    accounts.deleteMany({ userId: { $in: ids } }),
    sessions.deleteMany({ userId: { $in: ids } }),
    users.deleteOne({ _id: user._id }),
  ]);
}

async function createUser({ name, email, password, role, plan, phone, bio, image }) {
  await removeSeedUser(email);

  const result = await auth.api.signUpEmail({
    body: { name, email, password, role },
  });

  const user = await users.findOne({ email });
  if (!user) {
    throw new Error(
      `Sign up failed for ${email}: ${JSON.stringify(result?.user || result)}`
    );
  }

  const update = { plan, updatedAt: new Date() };
  if (phone) update.phone = phone;
  if (bio) update.bio = bio;
  if (image) update.image = image;
  if (role === "admin") update.role = "admin";

  await users.updateOne({ _id: user._id }, { $set: update });
  return users.findOne({ _id: user._id });
}

/* ------------------------------------------------------------------ */
/* Seed                                                                */
/* ------------------------------------------------------------------ */
async function seed() {
  console.log("Seeding MentorLagbe demo data...\n");

  // Clean previous demo content (seed accounts only)
  await Promise.all([
    tuitions.deleteMany({ tutorEmail: /@mentorlagbe\.dev$/ }),
    applications.deleteMany({ studentEmail: /@mentorlagbe\.dev$/ }),
    payments.deleteMany({ userEmail: /@mentorlagbe\.dev$/ }),
  ]);

  const admin = await createUser({ ...adminSeed });
  console.log(`admin   ${admin.email} / ${PASSWORD.admin}`);

  const tutorDocs = [];
  for (const tutor of tutorSeed) {
    const doc = await createUser({ ...tutor, password: PASSWORD.tutor, role: "tutor" });
    tutorDocs.push(doc);
    console.log(`tutor   ${doc.email} / ${PASSWORD.tutor}`);
  }

  const studentDocs = [];
  for (const student of studentSeed) {
    const doc = await createUser({
      ...student,
      password: PASSWORD.student,
      role: "student",
      bio: "Learning something new every day on MentorLagbe.",
    });
    studentDocs.push(doc);
    console.log(`student ${doc.email} / ${PASSWORD.student}`);
  }

  // Tuitions
  const now = Date.now();
  const tuitionDocs = tuitionSeed.map((item, index) => {
    const tutor = tutorDocs[item.tutor];
    return {
      title: item.title,
      subject: item.subject,
      classLevel: item.classLevel,
      mode: item.mode,
      location: item.location,
      monthlyFee: item.monthlyFee,
      daysPerWeek: item.daysPerWeek,
      bannerImage: item.bannerImage,
      description: item.description,
      tutorName: tutor.name,
      tutorEmail: tutor.email,
      approvalStatus: item.approvalStatus,
      isActive: item.isActive,
      createdAt: new Date(now - (index + 1) * 9 * 3600000),
      reviewedAt: item.approvalStatus === "pending" ? null : new Date(),
      reviewedBy: item.approvalStatus === "pending" ? null : admin.email,
    };
  });

  const insertedTuitions = await tuitions.insertMany(tuitionDocs);

  // Applications (+ reviews on accepted ones)
  const applicationDocs = applicationSeed.map((item, index) => {
    const student = studentDocs[item.student];
    const tuition = tuitionDocs[item.tuition];
    const tuitionId = insertedTuitions.insertedIds[item.tuition];

    const doc = {
      tuitionId,
      tuitionTitle: tuition.title,
      subject: tuition.subject,
      monthlyFee: tuition.monthlyFee,
      bannerImage: tuition.bannerImage,
      tutorEmail: tuition.tutorEmail,
      tutorName: tuition.tutorName,
      studentName: student.name,
      studentEmail: student.email,
      studentPhone: item.phone,
      preferredSchedule: item.schedule,
      studentNote: item.note,
      status: item.status,
      appliedAt: new Date(now - (index + 1) * 30 * 3600000),
    };

    if (item.review) {
      doc.review = {
        ...item.review,
        studentName: student.name,
        reviewedAt: new Date(now - (index + 1) * 12 * 3600000),
      };
    }

    return doc;
  });

  await applications.insertMany(applicationDocs);

  // Payments
  await payments.insertMany(
    paymentSeed.map((item) => ({ ...item, paymentStatus: "paid" }))
  );

  // Bookmark a few tuitions for the demo students
  await users.updateOne(
    { email: studentSeed[0].email },
    { $set: { bookmarks: [insertedTuitions.insertedIds[3], insertedTuitions.insertedIds[4]] } }
  );
  await users.updateOne(
    { email: studentSeed[1].email },
    { $set: { bookmarks: [insertedTuitions.insertedIds[0], insertedTuitions.insertedIds[5]] } }
  );

  console.log("\n----------------------------------------");
  console.log(`Tuitions:     ${tuitionDocs.length} (12 approved)`);
  console.log(`Applications: ${applicationDocs.length}`);
  console.log(`Payments:     ${paymentSeed.length}`);
  console.log("----------------------------------------");
  console.log("Admin login   admin@mentorlagbe.com / Admin@1234");
  console.log("Tutor login   tutor1@mentorlagbe.dev / Tutor@1234");
  console.log("Student login student1@mentorlagbe.dev / Student@1234");
  console.log("----------------------------------------\n");
  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nSeed failed:", error);
    process.exit(1);
  });
