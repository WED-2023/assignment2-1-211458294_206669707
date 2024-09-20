// src/services/auth.js
import axios from 'axios';

export default function mockLogin(credentials, success = true) {
  // Check if already logged in
  if (!success) {
    throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
  }

  // If all checks pass, return a success message
  return { status: 200, response: { data: { message: "login succeeded", success: true}} };
}


export function mockRegister(userDetails, success = true) {

  if (!success) {
    throw { status: 409, response: { data: { message: "Username taken", success: false } } };
  }

  return { status: 200, response: { data: { message: "user created", success: true}} };
}



// export function mockLogout() {
//   return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

// }


export async function Login(username, password) {
try {
  const response = await axios.post("http://localhost:3000/Login", {
  username: username,
  password: password,
});
return response.data; 
}
catch (error) {
  throw error.response ? error.response.data : error;
}
}

export async function Register(username,firstName, lastName,country, password, email) {
try {
  const response = await axios.post("http://localhost:3000/Register", {
    username: username,
    firstName: firstName,
    lastName: lastName,
    country: country,
    password: password,
    email: email,
  });
  console.log("user details:" + response);
  return response.message; 
} catch (error) {
  throw error.response ? error.response.data : error;
}
}

export async function Logout() {
try {
    const response = await axios.post("http://localhost:3000/Logout");
  return response.message;
} catch (error) {
  throw error.response ? error.response.data : error;
}
}