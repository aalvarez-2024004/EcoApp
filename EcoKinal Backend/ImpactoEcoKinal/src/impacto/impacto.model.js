import mongoose from 'mongoose';

/*
 * FACTORES DE CONVERSIÓN (valores promedio por clasificación registrada)
 * Fuentes: EPA, PNUMA, estudios de impacto ambiental para Guatemala
 *
 * Inorgánico (plástico/vidrio/metal/papel):
 *   - 0.15 kg de material evitado del vertedero
 *   - 0.5 kWh de energía ahorrada (reciclaje vs producción nueva)
 *   - 0.3 kg CO₂ no emitido
 *   - 0.002 árboles equivalentes salvados
 *
 * Orgánico (compostaje / no quemado):
 *   - 0.10 kg
 *   - 0.1 kWh
 *   - 0.5 kg CO₂ (evita metano en vertedero)
 *   - 0.003 árboles
 *
 * Reutilizable:
 *   - 0.20 kg
 *   - 0.8 kWh
 *   - 0.4 kg CO₂
 *   - 0.004 árboles
 *
 * Peligroso (manejo correcto evita contaminación):
 *   - 0.05 kg
 *   - 0.2 kWh
 *   - 0.8 kg CO₂
 *   - 0.001 árboles
 *
 * No reciclable:
 *   - 0.05 kg
 *   - 0.05 kWh
 *   - 0.1 kg CO₂
 *   - 0.0005 árboles
 */

const registroImpactoSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        index: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Inorgánico', 'Orgánico', 'Reutilizable', 'Residuo Peligroso', 'No reciclable']
    },
    kgEvitados: {
        type: Number,
        required: true
    },
    energiaAhorradaKWh: {
        type: Number,
        required: true
    },
    co2NoEmitidoKg: {
        type: Number,
        required: true
    },
    arbolesEquivalentes: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const FACTORES = {
    'Inorgánico':        { kg: 0.15, kwh: 0.50, co2: 0.30, arboles: 0.0020 },
    'Orgánico':          { kg: 0.10, kwh: 0.10, co2: 0.50, arboles: 0.0030 },
    'Reutilizable':      { kg: 0.20, kwh: 0.80, co2: 0.40, arboles: 0.0040 },
    'Residuo Peligroso': { kg: 0.05, kwh: 0.20, co2: 0.80, arboles: 0.0010 },
    'No reciclable':     { kg: 0.05, kwh: 0.05, co2: 0.10, arboles: 0.0005 }
};

export default mongoose.model('RegistroImpacto', registroImpactoSchema);
