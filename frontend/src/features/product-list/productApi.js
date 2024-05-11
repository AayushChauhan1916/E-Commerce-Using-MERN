export function fetchproduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/fetchproduct");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchSelectedProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
