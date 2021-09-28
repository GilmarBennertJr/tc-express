const express = require("express")
const consign = require("consign")
const mongooseInicializer = require("./config/mongoose")
const bodyParser = require('body-parser');
const cors = require('cors');
const package = require("./package.json")

const app = express()
let config = {
    port: 3000,
    mongo: {
        config: {
            host: "",
            password: "",
            database: ""
        },
        autoloadModels: true,
        path: "/mongo"
    },
    routes: {
        path: "/routes",
        autoload: true
    },
    bodyParserSize: "50mb"
}

module.exports = {

    // Inicializa Express
    
    config: (c) => {
        config = c
    },

    initialize () {
        console.log("  _______    _____   ______  __   __  _____    _____    ______    _____    _____ ")
        console.log(" |__   __|  / ____| |  ____| \\ \\ / / |  __ \\  |  __ \\  |  ____|  / ____|  / ____|")
        console.log("    | |    | |      | |__     \\ V /  | |__) | | |__) | | |__    | (___   | (___  ")
        console.log("    | |    | |      |  __|     > <   |  ___/  |  _  /  |  __|    \\___ \\   \\___ \\ ")
        console.log("    | |    | |____  | |____   / . \\  | |      | | \\ \\  | |____   ____) |  ____) |")
        console.log("    |_|     \\_____| |______| /_/ \\_\\ |_|      |_|  \\_\\ |______| |_____/  |_____/ ")
        
        console.log(`\n>> INICIALIZANDO TC EXPRESS V.${package.version}`);
        console.log("_____________________________________________________________________________________")

        //Inicializa Consign
        let c = consign();
        
        // Inicializa e importa Mongo no APP
        if (config.mongo && config.mongo.config) {
            app.mongo = mongooseInicializer(config.mongo.config);
        } else {
            console.log(">> Mongo desabilitado")
        }

        // Configura o autoload do Utils
        if (config.utils && config.utils.autoload) {
            c.include(config.utils.path ? config.utils.path : "/utils")
            console.log(">> Autoload de pacoteis uteis habilitado")
        } else {
            console.log(">> Autoload de pacoteis uteis desabilitado")
        }

        // Configura o autoload do Routes
        if (config.routes && config.routes.autoload) {
            c.include(config.routes.path ? config.routes.path : "/routes")
            console.log(">> Autoload de routes habilitado")
        } else {
            console.log(">> Autoload de routes desabilitado")
        }

        if (config.mongo && config.mongo.autoloadModels) {
            c.include(config.mongo.path ? `${config.routes.path}/models/` : "/mongo/models")
            console.log(">> Autoload de models Mongo habilitado")
        } else {
            console.log(">> Autoload de models Mongo desabilitado")
        }

        // Inclui dependencias no consign                
        c.into(app);

        // Configuração body-parser
        app.use(bodyParser.json({limit: config.bodyParserSize ? config.bodyParserSize : "50mb"}));
        app.use(bodyParser.urlencoded({limit: config.bodyParserSize ? config.bodyParserSize : "50mb", extended: true}));
        app.use(cors());
        console.log('>> Body parser configurado')
        
        app.listen(config.port)
        console.log(`>> Express rodando na porta: ${config.port}`)
        console.log("_____________________________________________________________________________________")
    }



}

