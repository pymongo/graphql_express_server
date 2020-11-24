import fetch from "node-fetch"; // nodejs isn't impl in browser's fetch in standard lib
import assert from "assert/strict";
import fs from 'fs';

let $api_url = "https://example.com";

const sign_up_query = String.raw`
mutation($email: String!) {
    signUp(
        recaptcha: ""
        email: $email
        password: "12!@qwQW"
    ) {
        jwt
    }
}
`;

const login_query = String.raw`
mutation($email: String!) {
    login(
        email: $email
        password: "12!@qwQW"
    ) {
        jwt
    }
}
`;

function random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function graphql_req_with_var(query, variables=null, jwt="") {
    const response = await fetch($api_url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-JWT': jwt
        },
        body: JSON.stringify({query, variables})
    });
    const json = await response.json();
    console.info(JSON.stringify(json, null, 4));
    return json;
}

async function main() {
    let config = JSON.parse(fs.readFileSync('config.json'));
    console.info(config);
    $api_url = config["api_url"];

    const email = `z${random_int(0, 1000000)}@z.z`;
    console.info(`email = ${email}`);
    
    const sign_up_response = await graphql_req_with_var(sign_up_query, {email: email});
    assert(sign_up_response.data);
    const jwt = sign_up_response.data.signUp.jwt;
    console.info(`jwt = ${jwt}`);
    
    const login_response = await graphql_req_with_var(login_query, {email: email});
    assert(login_response.data);
}

main()
