import Comment from './comments.model.js';

// Listar comentarios de una publicación de manera consistente
export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;

        // Traemos todos los campos necesarios para que el Frontend los maneje
        const comments = await Comment.find({ publicationId }).sort({ createdAt: 1 });

        // Retornamos la lista siempre como un arreglo (aunque esté vacío) para evitar romper el .map() en React
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Agregar Comentario guardando la firma del creador
export const addComment = async (req, res) => {
    try {
        const { content, publicationId } = req.body;

        if (!content || !publicationId) {
            return res.status(400).json({
                success: false,
                message: 'Contenido y ID de publicación son obligatorios'
            });
        }

        // Obtener nombre del token para que se mantenga desde cualquier sesión de usuario
        const authorName = req.user.name || req.user.username || 'Usuario de EcoKinal';

        const comment = new Comment({
            content,
            publicationId,
            autorId: req.user.uid,
            _authorName: authorName
        });

        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario agregado exitosamente',
            comment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Editar Comentario (Solo contenido) validando la autoría
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        // Validación de autoría comparando strings de forma segura
        if (comment.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No puedes editar un comentario que no es tuyo'
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id, 
            { content }, 
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            updatedComment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Eliminar Comentario validando la autoría
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        // Validación de autoría comparando strings de forma segura
        if (comment.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar este comentario'
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado satisfactoriamente'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};