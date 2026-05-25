import Publication from './publi.model.js';
 
export const createPublication = async(req,res)=>{
    try {
        const{title,content}= req.body;
 
        //validación para que ningún campo este vacío
        if(!title || !content){
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            })
        }
 
        const publicationData = {
            title,
            content,
            autorId: req.user.uid
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
        })
 
 
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
 
export const getPublications = async(req,res)=>{
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
        })
    }
}
 
//Actualizar publicación
export const updatePublication = async(req,res)=>{
    try {
        const{id} = req.params;
 
        const publication = await Publication.findById(id);
 
        if (!publication){
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }
 
        //No modificar una publicación que no sea de esa persona
        if (publication.autorId !== req.user.uid){
            return res.status(403).json({
                success: false,
                message: 'No puedes modificar esta publicación porque no es tuya'
            });
        }
 
        const updateData = { ...req.body };
 
        if (req.file) {
 
            // Eliminar imagen anterior de Cloudinary
            if (publication.photo_public_id) {
                await cloudinary.uploader.destroy(publication.photo_public_id);
            }
 
            updateData.photo = req.file.path;
            updateData.photo_public_id = req.file.filename;
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
            success:true,
            message: 'Publicación actualizada correctamente',
            data: updatedPublication,
        })
 
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al actualizar la publicación',
            error: error.message
        })
    }
}
 
//Eliminar Publicación
export const deletePublication = async (req, res) => {
    try {
        const post = await Publication.findById(req.params.id);
 
        if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Esta publicación no se encontro'
        });
        }
 
        if (post.autorId !== req.user.uid
        ) {
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