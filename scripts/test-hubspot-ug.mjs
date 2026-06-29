const portalId = '243716584';
const formGuid = '7ee14221-6107-4775-ae55-aa2d06f6c700'; // UG form
const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

const payload = {
  fields: [
    { name: 'firstname', value: 'Test' },
    { name: 'lastname', value: 'User' },
    { name: 'email', value: 'test@example.com' },
    { name: 'phone', value: '9999999999' },
    { name: 'hs_linkedin_url', value: 'https://linkedin.com/in/test' }
  ]
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.text().then(text => ({ status: res.status, text })))
.then(console.log)
.catch(console.error);
