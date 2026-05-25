import RegistroImpacto, { FACTORES } from './impacto.model.js';

export const registrarImpacto = async (req, res) => {
    try {
        const uid = req.user.uid;
        const { tipo } = req.body;

        if (!tipo) {
            return res.status(400).json({
                success: false,
                message: 'El campo "tipo" es requerido'
            });
        }

        const factor = FACTORES[tipo];

        if (!factor) {
            return res.status(400).json({
                success: false,
                message: `Tipo de residuo no reconocido: "${tipo}"`,
                tiposValidos: Object.keys(FACTORES)
            });
        }

        const registro = await RegistroImpacto.create({
            uid,
            tipo,
            kgEvitados:           factor.kg,
            energiaAhorradaKWh:   factor.kwh,
            co2NoEmitidoKg:       factor.co2,
            arbolesEquivalentes:  factor.arboles
        });

        return res.status(201).json({
            success: true,
            message: 'Impacto registrado correctamente',
            data: registro
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al registrar el impacto',
            error: error.message
        });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const uid = req.user.uid;

        const registros = await RegistroImpacto.find({ uid }).sort({ fecha: -1 });

        if (registros.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Aún no tienes registros de impacto. ¡Empieza clasificando residuos!',
                data: {
                    totalClasificaciones: 0,
                    totales: {
                        kgEvitados: 0,
                        energiaAhorradaKWh: 0,
                        co2NoEmitidoKg: 0,
                        arbolesEquivalentes: 0
                    },
                    porTipo: {},
                    historial: []
                }
            });
        }

        const totales = registros.reduce((acc, r) => {
            acc.kgEvitados          += r.kgEvitados;
            acc.energiaAhorradaKWh  += r.energiaAhorradaKWh;
            acc.co2NoEmitidoKg      += r.co2NoEmitidoKg;
            acc.arbolesEquivalentes += r.arbolesEquivalentes;
            return acc;
        }, { kgEvitados: 0, energiaAhorradaKWh: 0, co2NoEmitidoKg: 0, arbolesEquivalentes: 0 });

        Object.keys(totales).forEach(k => {
            totales[k] = parseFloat(totales[k].toFixed(4));
        });

        const porTipo = registros.reduce((acc, r) => {
            if (!acc[r.tipo]) {
                acc[r.tipo] = {
                    cantidad: 0,
                    kgEvitados: 0,
                    energiaAhorradaKWh: 0,
                    co2NoEmitidoKg: 0,
                    arbolesEquivalentes: 0
                };
            }
            acc[r.tipo].cantidad++;
            acc[r.tipo].kgEvitados          += r.kgEvitados;
            acc[r.tipo].energiaAhorradaKWh  += r.energiaAhorradaKWh;
            acc[r.tipo].co2NoEmitidoKg      += r.co2NoEmitidoKg;
            acc[r.tipo].arbolesEquivalentes += r.arbolesEquivalentes;
            return acc;
        }, {});

        Object.keys(porTipo).forEach(tipo => {
            const t = porTipo[tipo];
            t.kgEvitados          = parseFloat(t.kgEvitados.toFixed(4));
            t.energiaAhorradaKWh  = parseFloat(t.energiaAhorradaKWh.toFixed(4));
            t.co2NoEmitidoKg      = parseFloat(t.co2NoEmitidoKg.toFixed(4));
            t.arbolesEquivalentes = parseFloat(t.arbolesEquivalentes.toFixed(4));
        });

        const historial = registros.slice(0, 10).map(r => ({
            id: r._id,
            tipo: r.tipo,
            kgEvitados: r.kgEvitados,
            energiaAhorradaKWh: r.energiaAhorradaKWh,
            co2NoEmitidoKg: r.co2NoEmitidoKg,
            arbolesEquivalentes: r.arbolesEquivalentes,
            fecha: r.fecha
        }));

        return res.status(200).json({
            success: true,
            data: {
                totalClasificaciones: registros.length,
                totales,
                porTipo,
                historial
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el dashboard',
            error: error.message
        });
    }
};

export const getDashboardGlobal = async (req, res) => {
    try {
        const registros = await RegistroImpacto.find();

        const totalUsuarios = new Set(registros.map(r => r.uid)).size;

        const totales = registros.reduce((acc, r) => {
            acc.kgEvitados          += r.kgEvitados;
            acc.energiaAhorradaKWh  += r.energiaAhorradaKWh;
            acc.co2NoEmitidoKg      += r.co2NoEmitidoKg;
            acc.arbolesEquivalentes += r.arbolesEquivalentes;
            return acc;
        }, { kgEvitados: 0, energiaAhorradaKWh: 0, co2NoEmitidoKg: 0, arbolesEquivalentes: 0 });

        Object.keys(totales).forEach(k => {
            totales[k] = parseFloat(totales[k].toFixed(4));
        });

        const porTipo = registros.reduce((acc, r) => {
            acc[r.tipo] = (acc[r.tipo] || 0) + 1;
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            data: {
                totalUsuarios,
                totalClasificaciones: registros.length,
                totales,
                porTipo,
                mensaje: `Entre todos los usuarios de EcoKinal Guatemala hemos evitado ${totales.kgEvitados} kg de residuos y ahorrado ${totales.energiaAhorradaKWh} kWh de energía 🌱`
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas globales',
            error: error.message
        });
    }
};
