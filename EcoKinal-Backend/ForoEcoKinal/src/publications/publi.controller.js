import Publication from './publi.model.js';

// Crear una nueva publicación con soporte de Tags y Firma de autor
export const createPublication = async (req, res) => {
    try {
        const { title, content, tag } = req.body;

        // Validación para que ningún campo base esté vacío
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            });
        }

        // Obtener el nombre o username desde el token decodificado para la firma persistente
        const authorName = req.user.name || req.user.username || 'Usuario de EcoKinal';

        const publicationData = {
            title,
            content,
            autorId: req.user.uid,
            _authorName: authorName,
            tag: tag || 'Todos' // Guarda la etiqueta enviada por el cliente
        };

        if (req.file) {
            publicationData.photo = req.file.path;
        }

        const publication = new Publication(publicationData);
        await publication.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: publication
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener y listar todas las publicaciones
export const getPublications = async (req, res) => {
    try {
        const { page = 1, limit = 15 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const publications = await Publication.find()
            .limit(options.limit * 1)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort);

        const total = await Publication.countDocuments();

        res.status(200).json({
            success: true,
            data: publications,
            pagination: {
                currentPage: options.page,
                totalPages: Math.ceil(total / options.limit),
                totalRecords: total,
                limit: options.limit
            }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al listar las publicaciones',
            error: error.message
        });
    }
};

// Actualizar publicación validando autoría y etiquetas
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        // Validación de autoría usando req.user.uid
        if (publication.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No puedes modificar esta publicación porque no es tuya'
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            updateData.photo = req.file.path;
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Publicación actualizada correctamente',
            data: updatedPublication,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar la publicación',
            error: error.message
        });
    }
};

// Eliminar Publicación validando autoría
export const deletePublication = async (req, res) => {
    try {
        const post = await Publication.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Esta publicación no se encontró'
            });
        }

        // Validación de autoría usando req.user.uid
        if (post.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No es tu post para que lo elimines'
            });
        }

        await post.deleteOne();

        return res.json({
            success: true,
            message: 'Se ha eliminado satisfactoriamente tu publicación'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Alternar Likes (Me gusta) de forma persistente para múltiples usuarios
export const toggleLikePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'La publicación no existe'
            });
        }

        // Verificamos si el usuario actual ya le dio Like al post
        const index = publication.likes.indexOf(userId);

        if (index === -1) {
            publication.likes.push(userId); // Si no existe, agregamos el Like
        } else {
            publication.likes.splice(index, 1); // Si existe, removemos el Like (Dislike)
        }

        await publication.save();

        return res.status(200).json({
            success: true,
            message: 'Interacción de Me gusta actualizada',
            data: publication
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al procesar el Me gusta',
            error: error.message
        });
    }
};