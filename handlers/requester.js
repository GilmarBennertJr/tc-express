
let genericErrorResponse = require("./genericErrorResponse")

module.exports = (service) => {
    this.request = (method, url, func) => {
        method = method.lowerCase();
        switch (method) {
            case "get":
                service.get(url, genericRequest(url, method, func));         
                break;
            case "post":
                service.post(url, genericRequest(url, method, func)); 
                break;
            case "patch":
                service.patch(url, genericRequest(url, method, func)); 
                break
            case "delete":
                service.delete(url, genericRequest(url, method, func)); 
                break;
        }
    }

    function genericRequest(url, method, func) {
        return async (req, res) => {
            func(req, res).catch((err) => {
                res.status(500).send(
                    genericErrorResponse().message(err.message, method, `${url}`)
                );    
            });
        }
    }
    
    return this;
}