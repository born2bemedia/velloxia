import axios from "axios";

const apiKey = process.env.REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export async function POST(request) {
  const requestBody = await request.text();
  const bodyJSON = JSON.parse(requestBody);
  const { email, currentPassword, newPassword } = bodyJSON;

  try {
    // Login the user to verify the current password
    const loginUrl = `${apiUrl}/auth/local`;

    const loginResponse = await axios.post(loginUrl, {
      identifier: email,
      password: currentPassword,
    });

    if (!loginResponse.data.jwt) {
      return new Response(
        JSON.stringify({ message: "The current password is incorrect" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Retrieve the JWT token for authorization
    const authToken = loginResponse.data.jwt;

    // Construct the user update URL and payload for password change
    const updateUrl = `${apiUrl}/users/${loginResponse.data.user.id}`;
    const userData = {
      password: newPassword,
    };

    // Update the user password using the JWT token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const updateResponse = await axios.put(updateUrl, userData, { headers });

    return new Response(
      JSON.stringify({
        message: "Password changed successfully",
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
    console.error("An error occurred:", error.response ? error.response : error.message);

    return new Response(
      JSON.stringify({
        message: "Failed to change password",
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
