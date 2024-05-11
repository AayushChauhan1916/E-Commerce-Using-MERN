export function addorder(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/order/addorder",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.success == true) {
      resolve(data);
    } else {
      reject(data.message);
    }
  });
}
export function creatingPayment(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/order/prepaidorder",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.success == true) {
      resolve(data);
    } else {
      reject(data.message);
    }
  });
}

export function fetchOrder(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/order/fetch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
        credentials: "include",
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
