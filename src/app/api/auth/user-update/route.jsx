import axios from "axios";

const apiKey = process.env.REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export async function POST(request) {
  const requestBody = await request.text();
  const bodyJSON = JSON.parse(requestBody);
  const {
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    zip,
    country,
    userId,
  } = bodyJSON;

  try {
    // Construct the user update payload
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      zip,
      country: country, // Ensure the correct format for Strapi
    };

    // Construct headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Use apiKey for authentication
    };

    // URL for updating user details in Strapi
    const updateUrl = `${apiUrl}users/${userId}`;

    // Make the request to update user details in Strapi
    const updateResponse = await axios.put(updateUrl, userData, { headers });

    return new Response(
      JSON.stringify({
        message: "Success: User details updated",
        user: updateResponse.data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "An error occurred:",
      error.response ? error.response : error.message
    );

    return new Response(
      JSON.stringify({
        message: "Failed to update user details",
        error: error.response ? error.response.data : error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
