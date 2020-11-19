import fetch from "node-fetch"; // nodejs isn't impl in browser's fetch in standard lib
import assert from "assert/strict";

function random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function graphql_req_with_var(query, variables) {
    const response = await fetch('https://business-stg.igrow.ai/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query, variables})
    });
    const json = await response.json();
    console.info(JSON.stringify(json, null, 4));
    return json;
}

const sign_up_query = String.raw`
mutation($email: String!) {
    signUp(
        isDisableRecaptcha: true
        recaptcha: ""
        email: $email
        password: "12!@qwQW"
    ) {
        jwt
    }
}
`;

const email = `z${random_int(0, 1000000)}@z.z`;
console.info(`email=${email}`);
const response = await graphql_req_with_var(sign_up_query, {email: email});
assert(response.data);
