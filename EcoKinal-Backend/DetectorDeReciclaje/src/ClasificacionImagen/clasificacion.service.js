'use strict'

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import fs from "fs";
import jpeg from "jpeg-js";//para aceptar imagenes jpeg y convertirlas a tensor
import { PNG } from "pngjs";// para aceptar imagenes png y convertirlas a tensor
import path from "path";

let model;

export const loadModel = async () => {
    if (!model) {
        model = await mobilenet.load();
        console.log("Modelo MobileNet cargado correctamente");
    }
};

const imageToTensor = async (imagePath) => {
    // Se detecta el tipo de imagen
    const ext = path.extname(imagePath).toLowerCase();

    // Imagen leída en formato binario
    const buffer = fs.readFileSync(imagePath);

    let width, height, data;

    if (ext === ".jpg" || ext === ".jpeg") {
        const raw = jpeg.decode(buffer, { useTArray: true });
        width = raw.width;
        height = raw.height;
        data = raw.data;
    } 
    else if (ext === ".png") {
        const raw = PNG.sync.read(buffer);
        width = raw.width;
        height = raw.height;
        data = raw.data;
    } 
    else if (ext === ".webp") {
        // Convierte WEBP a JPEG usando Sharp
        const sharp = await import("sharp");

        const converted = await sharp.default(buffer)
            .jpeg()
            .toBuffer();

        const raw = jpeg.decode(converted, { useTArray: true });

        width = raw.width;
        height = raw.height;
        data = raw.data;
    } 
    else {
        throw new Error("Formato de imagen no soportado");
    }

    // Solo se necesitan los canales RGB
    const buffer3 = new Uint8Array(width * height * 3);

    for (let i = 0; i < width * height; i++) {
        buffer3[i * 3] = data[i * 4];       // Rojo
        buffer3[i * 3 + 1] = data[i * 4 + 1]; // Verde
        buffer3[i * 3 + 2] = data[i * 4 + 2]; // Azul
    }

    return tf.tensor3d(buffer3, [height, width, 3]);
};

export const detectarLabels = async (imagePath) => {
    try {

        if (!fs.existsSync(imagePath)) {
            throw new Error(`No se encontró la imagen en la ruta: ${imagePath}`);
        }

        await loadModel();

        //se convierte la imagen a tensor
        const imageTensor = await imageToTensor(imagePath);
        //se envia al modelo de MobileNet
        const predictions = await model.classify(imageTensor);
        //extrae los classname y los convierte a minusculas
        const labels = predictions.map(p => p.className.toLowerCase());

        return labels;

    } catch (error) {
        console.error(error);
        throw new Error("Error al detectar labels con TensorFlow JS");
    }
};