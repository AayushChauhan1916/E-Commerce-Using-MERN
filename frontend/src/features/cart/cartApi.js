export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/api/cart/addtocart", {
      method: "POST",
      body: JSON.stringify(item),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.success == true) {
      resolve(data);
    } else {
      reject(data.message);
    }
  });
}
export function deleteFromCart(userId, productId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/api/cart/deletefromcart", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId, productId),
    });
    const data = await response.json();
    if (data.success == true) {
      resolve({ data });
    } else {
      reject(data.message);
    }
  });
}

export function fetchCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/fetchcart", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ userId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
