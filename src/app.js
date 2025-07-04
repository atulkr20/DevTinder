const express = require('express')

const app = express();

const {adminAuth, userAuth} = require ("./middlewares/auth")

app.use("/admin",  adminAuth);

app.get("/admin", (req, res) => {
    res.send("This is admin page ")

})

app.post("/user/login", (req, res,) =>{
    res.send("User is logged in Successfully")
})


app.get("/user", (req, res) => {
    res.send("This is user data")

})
app.get("/user/data", userAuth, (req, res) =>{
    res.send("User data sent")

})

app.get("/admin/getAllData", (req, res)=> {
    res.send("All data sent")
})

app.get("/admin/deleteUser", (req, res) => {
    res.send("Uesr deleted Successfully")
})


app.listen(3000, () => {
console.log('Sever is successfully running on server 3000')
}); 