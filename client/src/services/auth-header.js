export default function authHeader() {
  let pengguna = JSON.parse(localStorage.getItem("pengguna"));

  if (pengguna && pengguna.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": pengguna.accessToken };
  } else {
    return {};
  }
}
