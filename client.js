import fetch from "node-fetch";
fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: "query($num: Int!) { rollDices(numDice: $num) }",
        variables: {
            num: 3
        }
    })
})
    .then(res => res.json())
    .then(data => console.log('data returned:', data));