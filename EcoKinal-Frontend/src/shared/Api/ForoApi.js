import { ForoApi } from './Api'

export const listarPosts = async () => {
    const response = await ForoApi.get('/posts/listar')
    return response.data.data || []
}

export const buscarPosts = async (q) => {
    const response = await ForoApi.get('/posts/search', { params: { q } })
    return response.data.data || []
}

export const crearPost = async (formData) => {
    const response = await ForoApi.post('/posts/create', formData)
    return response.data
}

export const actualizarPost = async (id, formData) => {
    const response = await ForoApi.put(`/posts/update/${id}`, formData)
    return response.data
}

export const eliminarPost = async (id) => {
    const response = await ForoApi.delete(`/posts/delete/${id}`)
    return response.data
}

export const reaccionarPost = async (id, reaction) => {
    const response = await ForoApi.post(`/posts/react/${id}`, { reaction })
    return response.data
}

export const getComentarios = async (postId) => {
    const response = await ForoApi.get(`/comments/get/${postId}`)
    return response.data.comments || []
}

export const agregarComentario = async ({ content, publicationId, parentCommentId }) => {
    const response = await ForoApi.post('/comments/add', { content, publicationId, parentCommentId })
    return response.data
}

export const actualizarComentario = async (id, content) => {
    const response = await ForoApi.put(`/comments/update/${id}`, { content })
    return response.data
}

export const eliminarComentario = async (id) => {
    const response = await ForoApi.delete(`/comments/delete/${id}`)
    return response.data
}