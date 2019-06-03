// src/Auth/Auth.js

import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-rke985-8.auth0.com",
    clientID: "FW4SuKTOYAsvWAvgFf9gXBIGLRhHbT7q",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
  }
}
