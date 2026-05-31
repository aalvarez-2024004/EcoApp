import Comment from './comments.model.js';
import axios from 'axios';

const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3005';

const fetchAuthorProfile = async (uid) => {
    try {
        const { data } = await axios.get(`${AUTH_URL}/api/users/profile/${uid}`)
        return { name: data.name || 'Usuario', image: data.image || null }
    } catch {
        return { name: null, image: null }
    }
}

export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const comments = await Comment.find({ publicationId }).sort({ createdAt: 1 });

        const uniqueAuthorIds = [...new Set(
            comments
                .filter(c => !c._authorName || c._authorName === 'Usuario de EcoKinal' || !c._authorPhoto)
                .map(c => c.autorId)
        )];

        const profileMap = {};
        await Promise.all(uniqueAuthorIds.map(async (uid) => {
            const profile = await fetchAuthorProfile(uid);
            if (profile.name) profileMap[uid] = profile;
        }));

        const enriched = comments.map(comment => {
            const plain = comment.toObject();
            const override = profileMap[comment.autorId];
            if (override) {
                if (!plain._authorName || plain._authorName === 'Usuario de EcoKinal') {
                    plain._authorName = override.name;
                }
                if (!plain._authorPhoto) {
                    plain._authorPhoto = override.image;
                }
            }
            return plain;
        });

        return res.status(200).json(enriched);

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { content, publicationId } = req.body;

        if (!content || !publicationId) {
            return res.status(400).json({ success: false, message: 'Contenido y ID de publicación son obligatorios' });
        }

        const profile = await fetchAuthorProfile(req.user.uid);

        const comment = new Comment({
            content,
            publicationId,
            autorId:      req.user.uid,
            _authorName:  profile.name  || req.user.name  || req.user.username || 'Usuario',
            _authorPhoto: profile.image || req.user.photo || req.user.image    || null
        });

        await comment.save();
        res.status(201).json({ success: true, comment });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Editar comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
        if (comment.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({ success: false, message: 'No puedes editar un comentario que no es tuyo' });
        }
        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true, runValidators: true });
        res.status(200).json({ success: true, message: 'Comentario actualizado', updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Eliminar comentario
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
        if (comment.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({ success: false, message: 'No puedes eliminar este comentario' });
        }
        await comment.deleteOne();
        res.status(200).json({ success: true, message: 'Comentario eliminado satisfactoriamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};