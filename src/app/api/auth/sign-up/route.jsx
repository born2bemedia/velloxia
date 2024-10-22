import axios from 'axios';

const apiKey = process.env.REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export async function POST(request) {
    try {
        const { email, password, firstName, lastName, username, phone } = await request.json(); // Properly parse request body

        const registerUrl = `${apiUrl}auth/local/register`;

        const name = `${firstName} ${lastName}`

        const response = await axios.post(registerUrl, {
            username, // Strapi expects username
            email,
            password,
            firstName,
            lastName,
            phone
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
        });

        return new Response(JSON.stringify({
            message: "Success: User was created",
            user: response.data.user,
            jwt: response.data.jwt,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.data : error.message);

        return new Response(JSON.stringify({
            message: "COULD NOT CREATE USER",
            error: error.response?.data?.message || error.message,
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
