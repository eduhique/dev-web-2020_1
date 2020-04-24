/**
 * API
 * Connects to the API and checks token validity
 *
 * Additional librarys:
 *  - Axios
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// const requestHandler = (request) => {
//   const token = "Bearer " + localStorage.getItem("romaneioToken")
//   if (token) {
//     request.headers["Authorization"] = token
//   }
//   return request
// }

// api.interceptors.request.use(
//   request => requestHandler(request)
// )

api.interceptors.response.use((response) => {
  return response;
}, function (error) {
  console.log("The following error occurred: ", error.response.data.message)
  // if (error.response) {
  //   if (error.response.data.message.includes("") || error.response.data.message.includes("")) {
  //     //Token is invalid
  //     localStorage.clear()
  //     window.location.reload()
  //   }
  // }
  return Promise.reject(error.response);
});

export default api;