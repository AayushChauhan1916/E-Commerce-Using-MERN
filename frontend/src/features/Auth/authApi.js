export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.success == true) {
      // console.log("suucess")
      resolve(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      // console.log(data.message);
      reject(data.message);
    }
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://e-commerce-mern-backend-six.vercel.app/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.success == true) {
        resolve(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        reject(data.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function addaddress(userId, userAddress) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/user/addaddress",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userId, userAddress),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.success == true) {
      resolve(data.user);
    } else {
      reject(data.message);
    }
  });
}
