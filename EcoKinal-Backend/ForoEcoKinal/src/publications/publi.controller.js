import Publication from './publi.model.js';
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

// Crear una nueva publicación
export const createPublication = async (req, res) => {
    try {
        const { title, content, tag } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const profile = await fetchAuthorProfile(req.user.uid);

        const publicationData = {
            title,
            content,
            autorId: req.user.uid,
            _authorName: profile.name || req.user.name || req.user.username || 'Usuario',
            _authorPhoto: profile.image || req.user.photo || req.user.image || null,
            tag: tag || 'Todos'
        };

        if (req.file) publicationData.photo = req.file.path;

        const publication = new Publication(publicationData);
        await publication.save();

        res.status(201).json({ success: true, message: 'Publicación creada exitosamente', data: publication });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// Listar todas las publicaciones
export const getPublications = async (req, res) => {
    try {
        const { page = 1, limit = 15 } = req.query;
        const options = { page: parseInt(page), limit: parseInt(limit), sort: { createdAt: -1 } };

        const publications = await Publication.find()
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort);

        const uniqueAuthorIds = [...new Set(
            publications
                .filter(p => !p._authorName || p._authorName === 'Usuario de EcoKinal' || !p._authorPhoto)
                .map(p => p.autorId)
        )];

        const profileMap = {};
        await Promise.all(uniqueAuthorIds.map(async (uid) => {
            const profile = await fetchAuthorProfile(uid);
            if (profile.name) profileMap[uid] = profile;
        }));

        const enriched = publications.map(pub => {
            const plain = pub.toObject();
            const override = profileMap[pub.autorId];
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

        const total = await Publication.countDocuments();

        res.status(200).json({
            success: true,
            data: enriched,
            pagination: {
                currentPage: options.page,
                totalPages: Math.ceil(total / options.limit),
                totalRecords: total,
                limit: options.limit
            }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: 'Error al listar las publicaciones', error: error.message });
    }
};

// Actualizar publicación
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication) return res.status(404).json({ success: false, message: 'Publicación no encontrada' });
        if (publication.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({ success: false, message: 'No puedes modificar esta publicación porque no es tuya' });
        }

        const updateData = { ...req.body };
        if (req.file) updateData.photo = req.file.path;

        const updatedPublication = await Publication.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        res.status(200).json({ success: true, message: 'Publicación actualizada correctamente', data: updatedPublication });

    } catch (error) {
        return res.status(400).json({ success: false, message: 'Error al actualizar la publicación', error: error.message });
    }
};

// Eliminar publicación
export const deletePublication = async (req, res) => {
    try {
        const post = await Publication.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Esta publicación no se encontró' });
        if (post.autorId.toString() !== req.user.uid.toString()) {
            return res.status(403).json({ success: false, message: 'No es tu post para que lo elimines' });
        }
        await post.deleteOne();
        return res.json({ success: true, message: 'Se ha eliminado satisfactoriamente tu publicación' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const toggleLikePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid.toString();
        const publication = await Publication.findById(id);
        if (!publication) return res.status(404).json({ success: false, message: 'La publicación no existe' });

        const index = publication.likes.map(id => id.toString()).indexOf(userId);
        if (index === -1) publication.likes.push(userId);
        else publication.likes.splice(index, 1);

        publication.markModified('likes');
        await publication.save();

        return res.status(200).json({ success: true, message: 'Interacción de Me gusta actualizada', data: publication });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al procesar el Me gusta', error: error.message });
    }
};