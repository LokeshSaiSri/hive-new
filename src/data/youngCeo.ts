// Content for /ug/young-ceo-challenge. Edit copy here, not in the components.

export const youngCeoMeta = {
  title: "Young CEO Challenge India 2027 | HiveSchool",
  description:
    "A free, open business challenge for Class 12 and drop-year students across India, with ₹1 crore in scholarships to HiveSchool's undergraduate programme. Enter online with a 90-second elevator pitch. Finale at the HiveSchool campus, Gurugram, on 3 January 2027.",
};

export const tickerItems = [
  "Registrations open 5 November",
  "₹1 crore in scholarships to HiveSchool's UG programme",
  "Pitch to Shark Tank founders and investors",
  "₹1 lakh equity-free grant for the winner",
  "All 150 finalists featured in the Young CEO magazine and national press",
  "Finale at the HiveSchool campus, Gurugram · 3 January 2027",
  "Free to enter · One 90-second pitch · Class 12 and 2026 pass-outs",
];

export const pitchBeats = [
  { n: "01", title: "The problem", body: "What is broken, for whom, and how you know. One sentence, not a speech." },
  { n: "02", title: "The solution", body: "What you would build or sell, and why it works better than what people do today." },
  { n: "03", title: "The market", body: "Who pays, how many of them there are, and what they pay. Name the first customer who pays you." },
  { n: "04", title: "The pitch", body: "Say it like you mean it. Judges watch for a clear head and a clear ask, not a script." },
];

export const rubric = [
  {
    n: "01",
    title: "A clearly defined problem",
    look: "A specific person with a specific problem, ideally one you have seen yourself.",
    strong: "“Class 12 students in Meerut have nowhere to practise speaking English before college interviews.”",
    weak: "“Education in India is broken.”",
  },
  {
    n: "02",
    title: "A solution that fits it",
    look: "Something you could start next month that solves exactly that problem, and why it beats what people do today.",
    strong: "“Thirty-minute mock interviews on video call with college seniors, ₹199 each.”",
    weak: "“An AI-powered platform that does everything.”",
  },
  {
    n: "03",
    title: "A market that pays",
    look: "Who pays, how many of them there are, what they pay, and the first customer by name.",
    strong: "“Two coaching centres near my school, about 400 students between them. My cousin Ayush is customer one.”",
    weak: "“Everyone needs this.”",
  },
  {
    n: "04",
    title: "The money math",
    look: "Numbers that add up: price times customers, and what it costs you to deliver.",
    strong: "“₹199 times 50 students a month is ₹9,950. Seniors take ₹100 a session, so I keep about half.”",
    weak: "“We will figure out pricing later.”",
  },
  {
    n: "05",
    title: "Clarity and conviction",
    look: "One take, said plainly, by someone who believes it. Judges should be able to repeat the idea in one line.",
    strong: "Looks at the camera, says the problem in the first ten seconds, ends with the ask.",
    weak: "Reads a script off the screen and runs out of time before the market.",
  },
];

export const steps = [
  {
    n: "01",
    when: "5 Nov to 20 Dec",
    title: "Register and pitch online",
    body: "Free. Record a 60 to 90 second elevator pitch of your business idea on a phone, or write 200 words. The problem, the solution, the market. No slides.",
    hot: true,
  },
  {
    n: "02",
    when: "After entries close",
    title: "Pitches are judged",
    body: "Five things: a clearly defined problem, a solution that fits it, a market that pays, the money math, and clarity and conviction. Every entrant gets the judging feedback.",
  },
  {
    n: "03",
    when: "22 December",
    title: "The Young CEO 100 is published",
    body: "By name and school. The top 150 are invited to the HiveSchool campus with a parent.",
  },
  {
    n: "04",
    when: "Sunday 3 January 2027",
    title: "Finale day in Gurugram",
    body: "Teams of five, a 90-minute case, and every student pitches to a founder before lunch. Twelve teams go through to Teen Tank at 5 PM, judged by the full panel and streamed live.",
  },
  {
    n: "05",
    when: "By 17 January",
    title: "Scholarships are claimed",
    body: "Every finalist leaves with a scholarship to HiveSchool's UG programme in hand. Claims close on 17 January.",
  },
];

export const prizeTiles = [
  { big: "₹1 crore", small: "in scholarships", body: "To the UG in Business, AI and Entrepreneurship, starting August 2027. ₹10 lakh for the winner, ₹2.5 lakh for ranks 2 to 10, ₹1 lakh for ranks 11 to 100.", foot: "Ranks 1 to 100 · Fee waived for 101 to 150" },
  { big: "₹1 lakh", small: "equity-free grant", body: "₹50,000 in cash and ₹50,000 in space access credits across the HiveSchool ecosystem. HiveSchool takes no equity.", foot: "Young CEO of India 2027" },
  { big: "150", small: "profiles in the magazine", body: "Every one of the 150 finalists is profiled in a magazine printed by HiveSchool, with press coverage on sites like Hindustan Times, The Print and The Hindu.", foot: "All 150 finalists" },
  { big: "₹1 Cr*", small: "startup incubation fund", body: "An opportunity to pitch for funding from HiveSchool's in-house startup incubation fund of up to ₹1 crore. *For students who enrol at HiveSchool.", foot: "Finalists who enrol*" },
];

export const ranks = [
  {
    rank: "Rank 1", who: "Young CEO of India 2027", amt: "₹10 lakh", sub: "scholarship", top: true,
    chips: ["₹1 lakh equity-free grant", "₹50,000 cash + ₹50,000 space credits", "A day as CEO at a funded startup", "The title", "Young CEO 100"],
  },
  {
    rank: "Ranks 2 to 10", who: "Nine students", amt: "₹2.5 lakh", sub: "scholarship each",
    chips: ["Paid internship with a mentor's company", "Young CEO 100, by name and school"],
  },
  {
    rank: "Ranks 11 to 100", who: "Ninety students", amt: "₹1 lakh", sub: "scholarship each",
    chips: ["Young CEO 100, by name and school"],
  },
  {
    rank: "Ranks 101 to 150", who: "Fifty students", amt: "Fee waived", sub: "UG admission fee",
    chips: ["A finalist place on campus, 3 January"],
  },
  {
    rank: "All 150 finalists", who: "Everyone on campus", amt: "Magazine", sub: "+ founder pitch", all: true,
    chips: ["Profile in the Young CEO magazine", "National press coverage", "Pitch to a founder on campus", "Teen Tank for 12 teams", "Incubation fund access*"],
  },
  {
    rank: "Every entrant", who: "All who pitch", amt: "Certificate", sub: "of participation",
    chips: ["Written feedback on all five criteria"],
  },
  {
    rank: "Schools", who: "Most finalists", amt: "Trophy", sub: "Young CEO School Trophy",
    chips: ["For the school with the most finalists on campus", "Young CEO 100 published by school"],
  },
];

export const schedule = [
  { t: "Morning", title: "Teams of five", body: "Finalists are grouped into teams of five on arrival." },
  { t: "The case", title: "A 90-minute case", body: "One live business problem, solved as a team against the clock." },
  { t: "Before lunch", title: "Every student pitches to a founder", body: "Each finalist pitches one-to-one and gets feedback on the spot." },
  { t: "5 PM", title: "Teen Tank", body: "Twelve teams pitch live in front of Shark Tank founders and investors, judged by the full panel and streamed live. The Young CEO of India 2027 is named." },
];

export const eligibility = [
  { n: "01", title: "Students finishing Class 12 in 2027", body: "Science, commerce, arts or vocational. Any board." },
  { n: "02", title: "2026 pass-outs", body: "Students who finished school in 2026 and are taking a drop year." },
  { n: "03", title: "Free to enter, from anywhere in India", body: "Everything before the finale happens online. The finale is in Gurugram; travel is the family's own." },
];

export const dates = [
  { small: "Registrations open", big: "5 Nov", body: "Registrations and pitch submissions open online. Free.", key: true },
  { small: "Entries", big: "5 Nov to 20 Dec", body: "Submit your 90-second pitch or 200 words any time in this window." },
  { small: "Young CEO 100", big: "22 Dec", body: "Published by name and school. Top 150 invited to campus.", key: true },
  { small: "Finale", big: "3 Jan", body: "Sunday, at the HiveSchool campus, Gurugram.", key: true },
  { small: "Claim deadline", big: "17 Jan", body: "Deadline to claim a scholarship won at the finale." },
  { small: "Round 1 closes", big: "31 Jan", body: "Round 1 of UG admissions closes." },
  { small: "Second sitting", big: "7 Mar", body: "A second sitting for students writing board exams." },
];

export const faqs = [
  { q: "Is it free to enter?", a: "Yes. Registration and the pitch are free. There is no fee at any stage of the challenge." },
  { q: "Who can enter?", a: "Students finishing Class 12 in 2027, and 2026 pass-outs. Any stream, any board, anywhere in India." },
  { q: "What do I have to submit?", a: "A 60 to 90 second elevator pitch of your business idea, recorded on your phone as if you were in front of an investor. Cover the problem, your solution, the market (who pays, how many, how much, and your first customer) and make the case for why it will work. No slides. If you would rather not record, submit the same four things in 200 words." },
  { q: "How are pitches judged?", a: "On five things: a clearly defined problem, a solution that fits it, a market that pays (who, how many, how much), the money math, and clarity and conviction. Judges check the specifics, so a named first customer and a number beat a big claim. Every entrant receives a certificate and the judging feedback." },
  { q: "What happens at the finale?", a: "On Sunday 3 January 2027, the top 150 come to the HiveSchool campus in Gurugram with a parent. Teams of five work a 90-minute case, every student pitches to a founder before lunch, and twelve teams go through to Teen Tank at 5 PM, pitching in front of Shark Tank founders and investors, judged by the full panel and streamed live. The finale is in Gurugram; travel is the family's own." },
  { q: "What are the scholarships for?", a: "HiveSchool's UG in Business, AI and Entrepreneurship, starting August 2027 at the Gurugram campus. Ranks 1 to 100 win scholarships of ₹10 lakh, ₹2.5 lakh and ₹1 lakh. Ranks 101 to 150 have the admission fee waived. Scholarships are claimed by 17 January 2027." },
  { q: "What does the winner get?", a: "A ₹10 lakh scholarship, a ₹1 lakh equity-free grant (₹50,000 in cash and ₹50,000 in space access credits across the HiveSchool ecosystem), a day as CEO at a funded startup, and the title Young CEO of India 2027." },
  { q: "What is the incubation fund?", a: "HiveSchool runs an in-house startup incubation fund of up to ₹1 crore. Access to it is for students enrolled at HiveSchool, so finalists who join the UG programme get the opportunity to pitch for funding." },
  { q: "Who is in the Young CEO magazine?", a: "All 150 students selected for the finale. Each finalist is profiled in the magazine, printed by HiveSchool after the finale, with press coverage on sites like Hindustan Times, The Print and The Hindu. It is not limited to the winners or the ranked 100." },
  { q: "What does my school get?", a: "The Young CEO 100 is published by name and school. The school with the most finalists on campus receives the Young CEO School Trophy." },
];
