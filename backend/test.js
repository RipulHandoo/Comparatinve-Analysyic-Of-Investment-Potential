// const axios = require('axios');

// const headers = {
//   'Accept': 'application/json, text/plain, */*',
//   'Accept-Encoding': 'gzip, deflate, br, zstd',
//   'Accept-Language': 'en-US,en;q=0.9',
//   'Origin': 'https://www.bseindia.com',
//   'Referer': 'https://www.bseindia.com/',
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
// };

// axios.get('https://api.bseindia.com/BseIndiaAPI/api/MktRDropdownData/w', { headers })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


const axios = require('axios');
const express = require('express')
const app= express();



const url = 'https://api.bseindia.com/BseIndiaAPI/api/MktRGainerLoserDataeqto/w';
const params = {
  GLtype: 'loser',
  IndxGrp: 'AllMkt',
  IndxGrpval: 'AllMkt',
  orderby: 'all',
};

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Accept-Language': 'en-US,en;q=0.9',
  'Origin': 'https://www.bseindia.com',
  'Referer': 'https://www.bseindia.com/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
};




  app.get('/gainer', async(req, res) => {
    axios.get(url, { headers, params })
  .then(response => {
    console.log(response.data);
    res.send(response.data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  })



  app.listen(3000, () => {
    console.log("Server is running on: port 3000")
  })