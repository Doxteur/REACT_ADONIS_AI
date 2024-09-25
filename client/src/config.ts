export const REACT_APP_VERSION = "1.0.3";

let REACT_APP_API_URL: any;
let isMobileDev: boolean = true;
const REACT_APP_GOOGLE_CLIENT_ID: any = "1213123123";

if (process.env.NODE_ENV === "production") {
  REACT_APP_API_URL = `http://192.168.0.23:3333/api`;

} else {
  const devBaseUrl = isMobileDev
    ? "http://192.168.0.23:3333/api"
    : "http://127.0.0.1:3333/api";
  REACT_APP_API_URL = `${devBaseUrl}`;
}

export { REACT_APP_API_URL, REACT_APP_GOOGLE_CLIENT_ID };
