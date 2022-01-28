

const checkUserFree = (req, res, next) => {

}

const CheckPayload = (req, res, next) => {
    
}

const errHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message})
}


module.exports = {
    errHandler
}