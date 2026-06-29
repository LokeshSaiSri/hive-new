// scripts/test-hubspot-connection.mjs

const PLACEMENT_API_URL = "http://localhost:3000/api/placement-report/submit";
const FORMS_API_URL = "http://localhost:3000/api/forms/submit";

// Generate standard fields that cover all form requirements
function generateFields(testName) {
  return [
    { name: "firstname", value: `TestName-${testName}` },
    { name: "lastname", value: "Audit" },
    { name: "email", value: `test.${testName}@example.com` },
    { name: "phone", value: "9876543210" },
    { name: "programme_of_interest", value: "Test Programme" },
    { name: "hs_linkedin_url", value: "https://linkedin.com/in/test" },
    { name: "message", value: `Automated Test: ${testName}` }
  ];
}

async function submitTest(testName, url, body) {
  console.log(`\n--- Running Test: ${testName} ---`);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        fields: generateFields(testName),
        pageUri: "http://localhost:3000/test",
        pageName: "Automated API Test"
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Success (200 OK)!`);
      if (data.downloadUrl) console.log(`   Download URL: ${data.downloadUrl}`);
      if (data.thankYouUrl) console.log(`   Thank You URL: ${data.thankYouUrl}`);
    } else {
      console.error(`❌ Failed (${response.status}):`, data);
    }
  } catch (error) {
    console.error(`❌ Network or Execution Error:`, error);
  }
}

async function runAllTests() {
  console.log("Starting HubSpot Connection Tests for ALL 5 Forms...\n");

  // 1. General Enquiry / Brochure Download Form (via Document)
  await submitTest("Form1-GeneralEnquiry", PLACEMENT_API_URL, {
    document: "pgp-handbook"
  });

  // 2. Placement Report Form
  await submitTest("Form2-PlacementReport", PLACEMENT_API_URL, {
    edition: "year-1"
  });

  // 3. PGP Application Form
  await submitTest("Form3-PGP", FORMS_API_URL, {
    course: "pgp"
  });

  // 4. AI Marketing Application Form
  await submitTest("Form4-AIMarketing", FORMS_API_URL, {
    course: "ai-marketing"
  });

  // 5. UG Application Form
  await submitTest("Form5-UG", FORMS_API_URL, {
    course: "ug"
  });

  console.log("\nAll tests completed.");
}

runAllTests();
