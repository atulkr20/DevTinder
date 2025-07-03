const express = require('express')

const app = express();

app.use((req, res) =>  // This is a Request Handler
    res.send('Hello i am your sever and i am working totally fine')
)

app.listen(3000, () => {
console.log('Sever is successfully running on server 30000')
}); 