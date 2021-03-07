console.log(process.env.NODE_ENV);
export const BASE_API_URL = 
  process.env.NODE_ENV === "production"
    ? "https://vamp-desktop.herokuapp.com"
    : "http://localhost:8080";