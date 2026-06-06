'use strict'
import vision from '@google-cloud/vision';
import fs from 'fs';

const client = new vision.ImageAnnotatorClient();

export const detectarLabels = async (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const [result] = await client.annotateImage({
            image: { content: base64Image },
            features: [
                { type: 'LABEL_DETECTION',       maxResults: 15 },  
                { type: 'OBJECT_LOCALIZATION',   maxResults: 10 },  
                { type: 'IMAGE_PROPERTIES',      maxResults: 5  },  
                { type: 'SAFE_SEARCH_DETECTION'                 },  
            ]
        });

        // Filtrar imágenes no válidas (fotos de personas, etc.)
        const safeSearch = result.safeSearchAnnotation;
        if (safeSearch) {
            const nivelesPeligrosos = ['LIKELY', 'VERY_LIKELY'];
            if (
                nivelesPeligrosos.includes(safeSearch.adult) ||
                nivelesPeligrosos.includes(safeSearch.violence)
            ) {
                throw new Error('Imagen no válida para clasificación de residuos');
            }
        }

        const labels = new Map(); 

        if (result.labelAnnotations) {
            result.labelAnnotations
                .filter(l => l.score >= 0.65)
                .forEach(l => {
                    const key = l.description.toLowerCase();
                    if (!labels.has(key) || labels.get(key) < l.score) {
                        labels.set(key, l.score);
                    }
                });
        }

        //filtra por score mínimo de 0.50 
        if (result.localizedObjectAnnotations) {
            result.localizedObjectAnnotations
                .filter(o => o.score >= 0.50)
                .forEach(o => {
                    const key = o.name.toLowerCase();
                    if (!labels.has(key) || labels.get(key) < o.score) {
                        labels.set(key, o.score);
                    }
                });
        }

        //Ordenar por score descendente
        const finalLabels = [...labels.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([description]) => description);

        console.log('Labels detectados:', finalLabels);

        if (finalLabels.length === 0) {
            return { labels: ['unknown'], labelsConScore: new Map() };
        }

        return { labels: finalLabels, labelsConScore: labels };

    } catch (error) {
        console.error('Error de Vision:', error.message);
        throw new Error(`Error al detectar labels con Google Vision: ${error.message}`);
    }
};