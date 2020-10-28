fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: "{add(a:1,b:1)}"})
  })
    .then(res => res.json())
    .then(data => console.log('data returned:', data));