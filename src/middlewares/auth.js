const adminAuth = (req, res, next)=> {
    console.log("Admin Auth is gettign checked")
    const token = "abc"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized)
        res.status(401).send("Unauthorized User")
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User Auth is getting checked")
    const token = "xyz"
    const isUserAuthorized = token === "xyz"
    if(!isUserAuthorized)
        res.status(401).send("Unauthorized User") 
    else {
        next();
    }
};
module.exports ={
    adminAuth,
    userAuth
};