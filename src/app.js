const express = require('express')

const app = express();

app.use("/", (err, req, res, next)=> {
    res.send("Something went wrong")
})

app.get("/user/data", (req, res) => {
try {
    throw new error("abcsde")
    res.send("User Data Sent")
}
catch (err) {
    res.status(500).send("Something went wrong")
}
});
app.get("/user", (req, res) => {
    res.send("This is user data")

})

app.use("/", (err, req, res, next)=>{
    res.status(500).send("Something went wrong")
})


app.listen(3000, () => {
console.log('Sever is successfully running on server 3000')
}); 