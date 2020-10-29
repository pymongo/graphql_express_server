import fetch from "node-fetch"; // nodejs isn't impl in browser's fetch in standard lib
fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        // use alias syntax to roll 2 and 3 dices in same query(use different arg on same query function in onetime)
        query: `query($dices_count: Int!) {
            # __typename
            rollTwoDices: rollDices(numDice: 2)
            rollThreeDices: rollDices(numDice: $dices_count)
            twitter {
                queryOnlineUsers
            }
            youtube {
                queryOnlineUsers
            }
        }`,
        variables: {
            dices_count: 3
        }
    })
})
    .then(response => response.json())
    .then(data => console.info(JSON.stringify(data, null, 4)));