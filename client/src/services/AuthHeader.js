export default function authHeader() {
  let pengguna = JSON.parse(localStorage.getItem("pengguna"));

  if (pengguna && pengguna.accessToken) {
    return { "x-access-token": pengguna.accessToken };
  } else {
    return {};
  }
}
