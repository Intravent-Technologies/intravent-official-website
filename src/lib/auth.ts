const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "intravent2024";

export function validateCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createToken() {
  const payload = { username: ADMIN_USERNAME, exp: Date.now() + 86400000 };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyToken(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
