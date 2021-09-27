const mongoose = require("mongoose");

module.exports = async (mongoConfig) => {
    let mongo = await mongoose.connect(`mongodb+srv://${mongoConfig.host}:${mongoConfig.password}@cluster0.3bbdp.mongodb.net/${mongoConfig.database}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); 

    return mongo
}