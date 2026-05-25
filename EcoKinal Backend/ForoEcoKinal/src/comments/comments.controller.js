import Comment from './comments.model.js';

// Listar comentarios de una publicación
export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;

        // Buscamos los comentarios y solo seleccionamos el campo 'content'
        const comments = await Comment.find({ publicationId })
            .select('content -_id');

        // Si no hay comentarios, devolvemos un mensaje claro o el arreglo vacío
        if (comments.length === 0) {
            return res.status(200).json({ message: "Aún no hay comentarios para esta publicación" });
        }

        // Si solo quieres que devuelva el primer comentario encontrado como un objeto:
        // return res.status(200).json(comments[0]);

        // O si quieres la lista de todos los contenidos:
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Agregar Comentario
export const addComment = async (req, res) => {
    try {
        const { content, publicationId } = req.body;

        if (!content || !publicationId) {
            return res.status(400).json({
                success: false,
                message: 'Contenido y ID de publicación son obligatorios'
            });
        }

        const comment = new Comment({
            content,
            publicationId,
            autorId: req.user.uid
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

// Editar Comentario (Solo contenido)
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        // Validación de autoría
        if (comment.autorId !== req.user.uid) {
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

// Eliminar Comentario
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        if (comment.autorId !== req.user.uid) {
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