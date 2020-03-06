

// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
//   -keyout localhost-privkey.pem -out localhost-cert.pem

// mongo "mongodb+srv://bananaboom-ommcz.mongodb.net/blogs"  --username samyao
// const axios = require("axios");

// async function api() {
//   let errors;

//   try {
//     const urls = [
//       "https://nextbananaboom.herokuapp.com/api/homepage",
//       "https://nextbananaboom.herokuapp.com/api/homepage/logs",
//       "https://nextbananaboom.herokuapp.com/api/homepage/projects"
//     ];
//     const getData = urls.map(async url => {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data;
//     });
//     const [homepage, logs, projects] = await Promise.all(getData);

//     return {
//       homepage,
//       logs,
//       projects
//     };
//   } catch (error) {
//     errors = `Sorry, 404. It shows incomplete pages，for the up to date contents，please refresh the page.`;

//     return {
//       errors
//     };
//   }
// }
// const result = api();
// console.log(result);

// module.exports = axios;
