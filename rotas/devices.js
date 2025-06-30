// rotas/devices.js

const router = require('express').Router();
const Device = require('../model/esp3_0_database'); // Importa seu modelo Mongoose
const createSlug = require('slug').default || require('slug'); // Para o caso de você habilitar a atualização do nome

// Rota GET para listar todos os dispositivos do banco de dados (já configurada)
router.get('/', async (req, res) => {
    try {
        const devices = await Device.find({});
        res.json({
            success: true,
            devices: devices
        });
    } catch (error) {
        console.error("Erro ao buscar dispositivos:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar dispositivos",
            error: error.message
        });
    }
});

// Rota POST para salvar dados no banco de dados (já configurada)
router.post('/', async (req, res) => {
    try {
        console.log("Dados recebidos na requisição POST:", req.body);

        const newDevice = new Device({
            nome: req.body.nome,
            kwh: req.body.kwh,
            corrente: req.body.corrente,
            voltagem: req.body.voltagem,
            fp: req.body.fp
        });

        const savedDevice = await newDevice.save();

        res.status(201).json({
            success: true,
            message: "Dispositivo salvo com sucesso!",
            device: savedDevice
        });

    } catch (error) {
        console.error("Erro ao salvar dispositivo:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao salvar dispositivo",
            error: error.message
        });
    }
});

// ROTA PUT para atualizar um dispositivo pelo _ID (já configurada)
router.put('/:id', async (req, res) => {
    try {
        const deviceId = req.params.id;

        const updatedDevice = await Device.findOneAndUpdate(
            { _id: deviceId },
            {
                $set: {
                    kwh: req.body.kwh,
                    corrente: req.body.corrente,
                    voltagem: req.body.voltagem,
                    fp: req.body.fp,
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedDevice) {
            return res.status(404).json({
                success: false,
                message: "Dispositivo não encontrado."
            });
        }

        res.json({
            success: true,
            message: "Dispositivo atualizado com sucesso!",
            device: updatedDevice
        });

    } catch (error) {
        console.error("Erro ao atualizar dispositivo:", error);
        res.status(500).json({
            success: false,
            message: "Não foi possível atualizar o device.",
            error: error.message
        });
    }
});

// ******************************************************************
// **** NOVA ROTA DELETE PARA APAGAR UM DISPOSITIVO PELO _ID ****
// ******************************************************************
router.delete('/:id', async (req, res) => { // :id é um parâmetro da URL
    try {
        const deviceId = req.params.id;

        // findByIdAndDelete encontra um documento pelo seu _id e o remove.
        // Ele retorna o documento DELETADO (ou null se não encontrar).
        const deletedDevice = await Device.findByIdAndDelete(deviceId);

        // Se nenhum documento for encontrado com o _id fornecido
        if (!deletedDevice) {
            return res.status(404).json({
                success: false,
                message: "Dispositivo não encontrado para exclusão."
            });
        }

        // Se a exclusão for bem-sucedida
        res.json({
            success: true,
            message: "Dispositivo excluído com sucesso!",
            device: deletedDevice // Opcional: retornar o documento que foi excluído
        });

    } catch (error) {
        console.error("Erro ao excluir dispositivo:", error);
        res.status(500).json({
            success: false,
            message: "Não foi possível excluir o device.",
            error: error.message
        });
    }
});
// ******************************************************************
// **** FIM DA NOVA ROTA DELETE ****
// ******************************************************************

module.exports = router;