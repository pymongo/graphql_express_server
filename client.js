import fetch from "node-fetch"; // nodejs isn't impl in browser_js's fetch in stdlib
fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        // use alias syntax to roll 2 and 3 dices in same query(use differnt arg on same query function in onetime)
        query: `query($dices_count: Int!) {
            rollTwoDices: rollDices(numDice: 2)
            rollThreeDices: rollDices(numDice: $dices_count)
        }`,
        variables: {
            dices_count: 3
        }
    })
})
    .then(response => response.json())
    .then(data => console.info(JSON.stringify(data, null, 4)));