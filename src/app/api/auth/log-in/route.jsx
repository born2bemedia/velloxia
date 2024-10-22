import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export async function POST(request) {
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);
    const { email, password } = bodyJSON;

    console.log('Parsed Body:', bodyJSON);

    try {
        const response = await axios.post(`${apiUrl}auth/local`, {
            identifier: email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            }
        });

        // If the request is successful, return the success response
        return new Response(JSON.stringify({ message: "Login successful", user: response.data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        //console.error(error);
        let errorMessage = "Login failed";
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
            // Optionally, log more details
        }
        return new Response(JSON.stringify({ message: errorMessage }), {
            status: error.response ? error.response.status : 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    
}
