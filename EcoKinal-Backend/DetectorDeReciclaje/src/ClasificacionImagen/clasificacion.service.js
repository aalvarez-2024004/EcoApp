'use strict'
import vision from '@google-cloud/vision';
import fs from 'fs';

const client = new vision.ImageAnnotatorClient(); // usa GOOGLE_APPLICATION_CREDENTIALS


export const detectarLabels = async (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const [result] = await client.annotateImage({
            image: { content: base64Image },
            features: [
                { type: 'LABEL_DETECTION', maxResults: 10 },
                { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
            ]
        });

        const labels = new Set();

        if (result.labelAnnotations) {
            result.labelAnnotations.forEach(l => labels.add(l.description.toLowerCase()));
        }

        if (result.localizedObjectAnnotations) {
            result.localizedObjectAnnotations.forEach(o => labels.add(o.name.toLowerCase()));
        }

        const finalLabels = [...labels];

        return finalLabels.length > 0 ? finalLabels : ['unknown'];

    } catch (error) {
        console.error('Error de Vision:', error.message);
        throw new Error('Error al detectar labels con Google Vision');
    }
};