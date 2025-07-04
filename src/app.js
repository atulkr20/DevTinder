const express = require('express')

const app = express();

app.get(
    "/user",
    (req, res, next) => {
        console.log("This is running successfully on 1")
        next();
        res.send("1st response!!")
    }
)

app.get (
    "/user", 
    (req, res, next) => {
        console.log("Server is successfully running on 2 ")
        next();
       // res.send("2nd response!!")
    }
)

app.get (
    "/user", 
    (req, res, next) => {
        console.log("Server is successfully running on 3 ")
        next();
       // res.send("3rd response!!")
    }
)

app.get(
    "/user",
    (req, res, next) => {
        console.log("Server is successfully running on 4")
            next();
           // res.send("4th response!!")
        }
    
)

app.get(
    "/user",
    (req, res, next) => {
        console.log("Server is successfully running on 5")
        res.send("5th response")
    }
)



app.listen(3000, () => {
console.log('Sever is successfully running on server 30000')
}); 