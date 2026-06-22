export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdated?: string;
  intro?: string;
  sections: LegalSection[];
};

export const termsOfUse: LegalDocument = {
  title: "Terms and Conditions",
  lastUpdated: "April 12th, 2025",
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By enrolling in a course, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the course or use any HiveSchool services.",
      ],
    },
    {
      title: "Modifications to Terms",
      paragraphs: [
        "HiveSchool reserves the right to modify these Terms and Conditions at any time. Your enrollment in a course after such modifications will constitute acknowledgment and agreement of the modified terms.",
      ],
    },
    {
      title: "User Obligations",
      paragraphs: [
        "You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of HiveSchool. Prohibited behaviour includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within HiveSchool.",
      ],
    },
    {
      title: "Intellectual Property Rights",
      paragraphs: [
        "All content and materials provided by HiveSchool, including course materials, courses, and digital content, are the intellectual property of HiveSchool or its content suppliers and are protected by intellectual property laws.",
      ],
    },
    {
      title: "User Content",
      paragraphs: [
        "Users may post content to certain areas of the HiveSchool platform. By posting content, users grant HiveSchool a non-exclusive, royalty-free licence to use, reproduce, modify, and display such content in connection with the services provided by HiveSchool.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "In no event shall HiveSchool, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
      ],
    },
    {
      title: "Changes to the Terms",
      paragraphs: [
        "HiveSchool reserves the right, at its sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        "Contact us if you have any questions about these Terms.",
        "HiveSchool · Building 9A, DLF Cyber City, Gurugram, Haryana — 122022",
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "April 12th, 2025",
  intro:
    "Before you proceed with your application process, please take a moment to carefully read through the following terms and conditions.",
  sections: [
    {
      title: "Enrollment",
      paragraphs: [
        "Enrollment in HiveSchool requires prior registration. Seats are limited and will be available on a first-come, first-served basis. Ensure that the information you provide during enrollment is accurate and complete.",
      ],
    },
    {
      title: "Privacy Policy",
      paragraphs: [
        "Your privacy is important to us. The personal information collected during the registration process will be used solely for the purpose of managing your participation in the course.",
      ],
    },
    {
      title: "Conduct",
      paragraphs: [
        "All participants are expected to conduct themselves professionally during the entire duration of the course. Harassment, abusive language, or disruptive behaviour will not be tolerated and may result in removal from the course.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "The content presented during the course, including presentations, documents, and any audio or video recordings, is the property of HiveSchool and is protected by copyright laws. The unauthorised use, distribution, or reproduction of any course materials without explicit permission is strictly prohibited.",
      ],
    },
    {
      title: "Technical Requirements",
      paragraphs: [
        "Participants are responsible for ensuring that they have the appropriate technical setup (e.g., internet connection, compatible device) to attend the course. HiveSchool is not responsible for any technical difficulties participants may encounter before or during the event.",
      ],
    },
    {
      title: "Cancellation and Changes",
      paragraphs: [
        "HiveSchool reserves the right to cancel or reschedule the course due to unforeseen circumstances. Participants will be notified of any changes as soon as possible.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "HiveSchool will not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your participation in the course.",
      ],
    },
    {
      title: "Amendments",
      paragraphs: [
        "HiveSchool reserves the right to amend these terms and conditions at any time. Participants will be bound by any changes to these terms and conditions from the date they are published on the registration page. By registering for the course, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.",
      ],
    },
  ],
};
