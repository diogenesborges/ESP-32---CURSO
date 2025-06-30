// C:\Users\dioge_39pxizk\OneDrive\Documentos\Arduino\CURSOS\ESP3.0\model\esp3_0_database.js

const mongoose = require('mongoose')
// Importação do slug: essencial para a criação do campo 'slug'
const createSlug = require('slug').default || require('slug') // Garante que createSlug é uma função
const { Schema } = mongoose

const esp3_0_databaseSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    // O slug é gerado automaticamente a partir do nome
    slug: { type: String, required: true, unique: true, default: function() {return createSlug(this.nome)} },
    kwh: { type: Number, required: true },
    corrente: { type: Number, required: true },
    voltagem: { type: Number, required: true },
    fp: { type: Number, required: true }
})

// Exporta o modelo Mongoose para ser usado em outras partes da aplicação (como em rotas/devices.js)
module.exports = mongoose.model('esp3_0_database', esp3_0_databaseSchema)