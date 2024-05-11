export function fetchUser() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/api/user/fetch", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (data.success == true) {
      resolve(data);
    } else {
      reject(data.message);
    }
  });
}
