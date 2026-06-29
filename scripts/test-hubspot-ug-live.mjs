const API_URL = "http://localhost:3000/api/forms/submit";

async function runUgTest() {
  console.log("🚀 Starting dedicated UG Form Test...");

  const payload = {
    course: "ug",
    fields: [
      { name: "firstname", value: "TestUG" },
      { name: "lastname", value: "Lead" },
      { name: "email", value: "test.ug.lead@example.com" },
      { name: "phone", value: "9999999999" },
      { name: "hs_linkedin_url", value: "https://linkedin.com/in/test-ug" },
      { name: "programme_of_interest", value: "Undergraduate Programme" }
    ],
    pageUri: "http://localhost:3000/ug",
    pageName: "Undergraduate Programme"
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ UG Form Test Succeeded (200 OK)!`);
      console.log(`   Event ID: ${data.eventId}`);
      console.log(`   Thank You URL: ${data.thankYouUrl}`);
      console.log(`\nThe lead should now be visible in HubSpot under 'test.ug.lead@example.com' with the programme_of_interest set to 'Undergraduate Programme'.`);
    } else {
      console.error(`❌ UG Form Test Failed (${response.status}):`, data);
    }
  } catch (error) {
    console.error(`❌ Execution Error (Is the Next.js server running?):`, error);
  }
}

runUgTest();
