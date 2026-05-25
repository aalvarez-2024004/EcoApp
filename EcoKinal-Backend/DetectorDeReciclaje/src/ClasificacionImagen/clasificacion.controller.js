'use strict'
import { detectarLabels } from "./clasificacion.service.js";
import Clasificacion from "./clasificacion.model.js";
import fs from "fs";
import axios from 'axios';

export const clasificarImagen = async (req, res) => {

    let imagePath = null;

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Debes enviar una imagen"
            });
        }

        imagePath = req.file.path;

        const labels = await detectarLabels(imagePath, req.file.mimetype);

        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        const resultado = clasificarResiduo(labels);

        const registro = await Clasificacion.create({
            imagen: req.file.filename,
            labels,
            tipo: resultado.tipo,
            contenedor: resultado.contenedor
        });
        
        try {
            await axios.post('http://localhost:3008/GamificationEcoKinal/v1/gamification/add-points', {}, {
                headers: { Authorization: req.headers.authorization }
            });
        } catch (error) {
            console.error('Error al sumar puntos en gamificación:', error.message);
        }
        try {
            await axios.post('http://localhost:3002/api/impacto/registrar',
                { tipo: resultado.tipo },
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (error) {
            console.error('Error al registrar impacto ambiental:', error.response?.data || error.message);
        }

        return res.status(200).json({
            success: true,
            message: "Imagen clasificada correctamente",
            data: registro
        });

    } catch (error) {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        return res.status(500).json({
            success: false,
            message: "Error al clasificar la imagen",
            error: error.message
        });
    }
};

const clasificarResiduo = (labels) => {
    const texto = labels.join(" ").toLowerCase().replace(/,/g, " ");

    if (
        texto.includes("battery") || texto.includes("batteries") ||
        texto.includes("lithium") || texto.includes("power cell") ||
        texto.includes("cell") || texto.includes("charger") ||
        texto.includes("adapter") || texto.includes("circuit") ||
        texto.includes("electronic") || texto.includes("electronics") ||
        texto.includes("chemical") || texto.includes("chemicals") ||
        texto.includes("medicine") || texto.includes("medication") ||
        texto.includes("drug") || texto.includes("syringe") ||
        texto.includes("needle") || texto.includes("paint") ||
        texto.includes("oil") || texto.includes("motor oil") ||
        texto.includes("fuel") || texto.includes("gasoline") ||
        texto.includes("diesel") || texto.includes("toxic") ||
        texto.includes("hazardous") || texto.includes("acid") ||
        texto.includes("bleach") || texto.includes("cleaner") ||
        texto.includes("detergent") || texto.includes("pesticide") ||
        texto.includes("insecticide") || texto.includes("fertilizer") ||
        texto.includes("spray") || texto.includes("aerosol")
    ) {
        return {
            tipo: "Residuo Peligroso",
            descripcion: "Requiere manejo especial por ser contaminante.",
            contenedor: "Llévalo a un punto de recolección especial ROJO"
        };
    }

    if (
        texto.includes("food") || texto.includes("fruit") ||
        texto.includes("banana") || texto.includes("apple") ||
        texto.includes("orange") || texto.includes("lemon") ||
        texto.includes("mango") || texto.includes("pineapple") ||
        texto.includes("grape") || texto.includes("strawberry") ||
        texto.includes("vegetable") || texto.includes("carrot") ||
        texto.includes("potato") || texto.includes("tomato") ||
        texto.includes("broccoli") || texto.includes("cabbage") ||
        texto.includes("onion") || texto.includes("garlic") ||
        texto.includes("pepper") || texto.includes("meat") ||
        texto.includes("chicken") || texto.includes("fish") ||
        texto.includes("egg") || texto.includes("bread") ||
        texto.includes("rice") || texto.includes("pasta") ||
        texto.includes("coffee") || texto.includes("tea") ||
        texto.includes("leaf") || texto.includes("leaves") ||
        texto.includes("plant") || texto.includes("grass") ||
        texto.includes("flower") || texto.includes("tree") ||
        texto.includes("branch") || texto.includes("wood") ||
        texto.includes("peel")
    ) {
        return {
            tipo: "Orgánico",
            descripcion: "Este residuo se descompone naturalmente.",
            contenedor: "Esto va en el contenedor VERDE"
        };
    }

    if (
        texto.includes("plastic") || texto.includes("plastic bottle") ||
        texto.includes("water bottle") || texto.includes("drink bottle") ||
        texto.includes("plastic container") || texto.includes("container") ||
        texto.includes("packaging") || texto.includes("package") ||
        texto.includes("packet") || texto.includes("wrapper") ||
        texto.includes("bag") || texto.includes("plastic bag") ||
        texto.includes("cup") || texto.includes("lid") ||
        texto.includes("cap") || texto.includes("metal") ||
        texto.includes("aluminum") || texto.includes("steel") ||
        texto.includes("can") || texto.includes("tin can") ||
        texto.includes("soda can") || texto.includes("beer can") ||
        texto.includes("foil") || texto.includes("glass") ||
        texto.includes("glass bottle") || texto.includes("wine bottle") ||
        texto.includes("beer bottle") || texto.includes("jar") ||
        texto.includes("carton") || texto.includes("cardboard") ||
        texto.includes("cardboard box") || texto.includes("paper") ||
        texto.includes("paperboard") || texto.includes("crate") ||
        texto.includes("box") || texto.includes("rubber") ||
        texto.includes("tire")
    ) {
        return {
            tipo: "Inorgánico",
            descripcion: "No se descompone fácilmente y debe reciclarse.",
            contenedor: "Esto va en el contenedor de reciclaje"
        };
    }

    if (
        texto.includes("tool") || texto.includes("hammer") ||
        texto.includes("screwdriver") || texto.includes("wrench") ||
        texto.includes("furniture") || texto.includes("chair") ||
        texto.includes("table") || texto.includes("desk") ||
        texto.includes("clothing") || texto.includes("cloth") ||
        texto.includes("shirt") || texto.includes("pants") ||
        texto.includes("jacket") || texto.includes("shoe") ||
        texto.includes("sneaker") || texto.includes("toy") ||
        texto.includes("doll") || texto.includes("book") ||
        texto.includes("notebook") || texto.includes("backpack")
    ) {
        return {
            tipo: "Reutilizable",
            descripcion: "Puede reutilizarse antes de desecharse.",
            contenedor: "Esto lo puedes guardar para usarlo de nuevo o hacer alguna manualidad"
        };
    }

    return {
        tipo: "No reciclable",
        descripcion: "No se puede reciclar ni reutilizar fácilmente.",
        contenedor: "Esto va en el contenedor GRIS"
    };
};