const mongoose = require('mongoose')


;(async () => { // IIFE assíncrona
    try {
        const connectionString = process.env.MONGO_CONNECT;

        if (!connectionString) {
            console.error('Erro: Variável de ambiente MONGO_CONNECT não definida no .env!');
            console.error('Por favor, defina MONGO_CONNECT=sua_uri_completa_aqui_no_seu_.env');
            process.exit(1);
        }

        await mongoose.connect(connectionString);
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (err) {
        console.error("Erro de conexão com o MongoDB:", err);
        process.exit(1);
    }
})();
