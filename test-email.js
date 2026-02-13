
const email = 'other.user@example.com'; // Testing with a likely unverified email

fetch('http://localhost:3000/api/test-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
})
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
