import { useState } from 'react'
import { useForoStore } from '../../store/useForoStore'
import Avatar from '../Avatar'
import CommentSection from './CommentSection'
import ImageLightbox from './ImageLightbox'
import { REACTIONS, myReaction, totalReactions, TAG_STYLES, FALLBACK_TAG } from '../../../../Styles/constants/PostCard.js'
import { PostHeader, PostContent, PostImageGrid, PostFooter } from '../../../../icons/PostCardIcons.jsx'

export default function PostCard({ post, currentUserId, currentUser, onToast }) {
    const { reactToPost, deletePost, updatePost } = useForoStore()

    const [isExpanded, setIsExpanded]   = useState(false)
    const [isEditing, setIsEditing]     = useState(false)
    const [editTitle, setEditTitle]     = useState(post.title || '')
    const [editContent, setEditContent] = useState(post.content || '')

    const [lightboxOpen, setLightboxOpen]           = useState(false)
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

    const [commentCount, setCommentCount]           = useState(post.commentsCount ?? null)
    const [showReactionPicker, setShowReactionPicker] = useState(false)
    const [pickerTimeout, setPickerTimeout]         = useState(null)

    const postImages = post.photos?.length > 0 ? post.photos : post.photo ? [post.photo] : []
    const userId     = String(currentUserId || currentUser?.uid || '')

    const [optimisticReactions, setOptimisticReactions] = useState(() => {
        const r = {}
        REACTIONS.forEach(({ key }) => {
            r[key] = Array.isArray(post.reactions?.[key]) ? [...post.reactions[key]] : []
        })
        return r
    })

    const currentMyReaction  = myReaction(optimisticReactions, userId)
    const reactionsTotal     = totalReactions(optimisticReactions)
    const activeReactionMeta = REACTIONS.find(r => r.key === currentMyReaction)

    const isOwner      = String(post.autorId) === String(currentUserId || currentUser?.uid)
    const displayName  = isOwner ? (currentUser?.name || post._authorName || 'Usuario') : (post._authorName || 'Usuario')
    const displayPhoto = isOwner ? (currentUser?.photo || currentUser?.profilePicture || currentUser?.image || post._authorPhoto || null) : (post._authorPhoto || null)
    const displayInitials = isOwner ? (currentUser?.initials || displayName?.[0]?.toUpperCase() || 'U') : (post._authorName?.[0]?.toUpperCase() || 'U')
    const currentTag   = TAG_STYLES[post.tag] || FALLBACK_TAG

    const handleReact = async (reactionKey) => {
        setShowReactionPicker(false)
        const isSame = currentMyReaction === reactionKey
        const newKey = isSame ? 'none' : reactionKey

        setOptimisticReactions(prev => {
            const next = {}
            REACTIONS.forEach(({ key }) => { next[key] = (prev[key] || []).filter(id => id !== userId) })
            if (newKey !== 'none') next[newKey] = [...next[newKey], userId]
            return next
        })

        try {
            await reactToPost(post._id, newKey)
        } catch {
            setOptimisticReactions(prev => {
                const next = {}
                REACTIONS.forEach(({ key }) => { next[key] = (prev[key] || []).filter(id => id !== userId) })
                if (currentMyReaction) next[currentMyReaction] = [...next[currentMyReaction], userId]
                return next
            })
            onToast?.('Error al registrar la reacción', 'error')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('¿Seguro que deseas eliminar esta publicación?')) return
        const res = await deletePost(post._id)
        if (res?.success) onToast?.('Publicación eliminada correctamente', 'success')
        else onToast?.(res?.message || 'Error al eliminar', 'error')
    }

    const handleUpdate = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            onToast?.('El título y contenido no pueden estar vacíos', 'error')
            return
        }
        const formData = new FormData()
        formData.append('title', editTitle)
        formData.append('content', editContent)
        const res = await updatePost(post._id, formData)
        if (res?.success) { setIsEditing(false); onToast?.('Publicación actualizada', 'success') }
        else onToast?.(res?.message || 'Error al actualizar', 'error')
    }

    return (
        <>
            {lightboxOpen && postImages.length > 0 && (
                <ImageLightbox src={postImages[lightboxImageIndex]} alt={post.title} onClose={() => setLightboxOpen(false)} />
            )}

            <div className="animate-fade-up" style={{ background: '#fff', borderRadius: 24, border: '0.5px solid rgba(35,55,109,0.15)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 4px 20px rgba(35,55,109,0.02)', minWidth: 0, boxSizing: 'border-box' }}>

                <PostHeader
                    displayName={displayName} displayPhoto={displayPhoto} displayInitials={displayInitials}
                    createdAt={post.createdAt} currentTag={currentTag} tag={post.tag}
                />

                <PostContent
                    post={post} isEditing={isEditing}
                    editTitle={editTitle} editContent={editContent}
                    setEditTitle={setEditTitle} setEditContent={setEditContent}
                    onSave={handleUpdate} onCancel={() => setIsEditing(false)}
                />

                {!isEditing && (
                    <PostImageGrid images={postImages} onImageClick={i => { setLightboxImageIndex(i); setLightboxOpen(true) }} />
                )}

                {reactionsTotal > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 4 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {REACTIONS.filter(r => optimisticReactions[r.key]?.length > 0).map(r => (
                                <span key={r.key} style={{ fontSize: 14 }}>{r.emoji}</span>
                            ))}
                        </div>
                        <span style={{ fontSize: 12, color: '#80A153' }}>{reactionsTotal}</span>
                    </div>
                )}

                <PostFooter
                    optimisticReactions={optimisticReactions} reactionsTotal={reactionsTotal}
                    currentMyReaction={currentMyReaction} activeReactionMeta={activeReactionMeta}
                    isExpanded={isExpanded} commentCount={commentCount}
                    isOwner={isOwner} isEditing={isEditing}
                    pickerTimeout={pickerTimeout} showReactionPicker={showReactionPicker}
                    setShowReactionPicker={setShowReactionPicker} setPickerTimeout={setPickerTimeout}
                    onReact={handleReact} onToggleComments={() => setIsExpanded(!isExpanded)}
                    onEdit={() => setIsEditing(true)} onDelete={handleDelete}
                />

                {isExpanded && (
                    <div style={{ borderTop: '0.5px solid #F1F7E8', paddingTop: 16, marginTop: 4 }}>
                        <CommentSection
                            postId={post._id}
                            currentUserId={currentUserId || currentUser?.uid}
                            currentUser={currentUser}
                            onToast={onToast}
                            onCommentCountChange={setCommentCount}
                        />
                    </div>
                )}
            </div>
        </>
    )
}