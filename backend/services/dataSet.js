// const https = require('https');
// const fs = require('fs');
// const path = require('path');
// async function DataSet(req, res) {
//     const symbol = req.query.scripcode || 'IBM';  // default to IBM if no symbol provided

//     // Check if symbol is invalid (e.g., if it is just ".BSE" or an empty string)
//     if (!symbol || symbol.startsWith('.') || symbol === '.BSE') {
//         return res.status(400).send('Invalid stock symbol. Please provide a valid stock name.');
//     }
//     const apiKey = 'UXVY6D0XGBS6NY6C';  // Replace with your Alpha Vantage API key

//     const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}&datatype=csv`;

//     // Define the file path where CSV will be saved
//     const filePath = path.join(__dirname, `data.csv`);

//     // Make the HTTP GET request to Alpha Vantage API
//     https.get(url, (response) => {
//         const file = fs.createWriteStream(filePath);

//         response.pipe(file);

//         file.on('finish', () => {
//             file.close();
//             console.log(`CSV file saved as ${filePath}`);
//             res.send(`CSV file for ${symbol} has been saved successfully.`);
//         });
//     }).on('error', (err) => {
//         console.error('Error fetching the CSV file: ', err.message);
//         res.status(500).send('Error fetching the CSV file.');
//     });
// }

// module.exports = DataSet;

const https = require('https');
const fs = require('fs');
const path = require('path');
const axios = require('axios');  
const FormData = require('form-data');  

async function DataSet(req, res) {
    const symbol = req.query.scripcode || 'IBM';  

    if (!symbol || symbol.startsWith('.') || symbol === '.BSE') {
        return res.status(400).send('Invalid stock symbol. Please provide a valid stock name.');
    }

    const apiKey = 'UXVY6D0XGBS6NY6C';  
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}&datatype=csv`;

    const filePath = path.join(__dirname, `data.csv`);

    https.get(url, (response) => {
        const file = fs.createWriteStream(filePath);

        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`CSV file saved as ${filePath}`);

            const form = new FormData();
            form.append('csv_file', fs.createReadStream(filePath));  

            axios.get('http://127.0.0.1:5000/run_model', form, {
                headers: {
                    ...form.getHeaders(),
                },
            })
            .then((response) => {
                const { test_rmse, train_rmse } = response.data;

                console.log(`Model run successfully. Test RMSE: ${test_rmse}, Train RMSE: ${train_rmse}`);
                // Send the response back to the client
                res.json({
                    message: `Model run successfully for ${symbol}`,
                    test_rmse,
                    train_rmse
                });
            })
            .catch((error) => {
                console.error('Error calling the model API: ', error.message);
                res.status(500).send('Error running the model.');
            });
        });
    }).on('error', (err) => {
        console.error('Error fetching the CSV file: ', err.message);
        res.status(500).send('Error fetching the CSV file.');
    });
}

module.exports = DataSet;
