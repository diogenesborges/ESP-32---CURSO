// server.js

const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config(); // Isso DEVE ser o mais cedo possível para garantir que carregue as variáveis de ambiente primeiro
const app = express()

app.use(bodyParser.json())

// Esta linha é crucial para depurar o problema do .env
console.log("Diretório de Trabalho Atual (CWD):", process.cwd());

const api = require('./rotas') // Note que você está importando './rotas' aqui.
app.use('/api', api) // Isso significa que as rotas dentro de 'rotas' (incluindo '/devices') serão acessíveis via '/api/devices'.

// ******************************************************************
// **** MUDANÇA AQUI: Puxando a porta do .env ou usando 3000 como padrão ****
// ******************************************************************
const PORT = process.env.PORT || 3080; // Puxa do .env ou usa 3000 se não estiver definido cls
// ******************************************************************
// **** FIM DA MUDANÇA ****
// ******************************************************************

console.log("Variável MONGO_CONNECT do .env:", process.env.MONGO_CONNECT);


app.get('/', (req,res)=>{  
    res.json({
        success: true
    })
})

app.listen(PORT, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);
    } else {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    }
});