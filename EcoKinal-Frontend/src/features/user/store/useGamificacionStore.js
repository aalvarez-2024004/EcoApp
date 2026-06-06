import { create } from 'zustand'
import { GamificationApi } from '../../../shared/Api'

const useGamificacionStore = create((set, get) => ({
    profile:             null,
    ranking:             [],
    challenges:          [],
    loadingProfile:      false,
    loadingRanking:      false,
    loadingChallenges:   false,
    completingChallenge: null,  // _id del reto siendo reclamado
    error:               null,

    fetchProfile: async () => {
        set({ loadingProfile: true, error: null })
        try {
            const res = await GamificationApi.get('/gamification/me')
            set({ profile: res.data.data, loadingProfile: false })
        } catch (err) {
            if (err.response?.status === 404) {
                set({ profile: { points: 0, recyclingCount: 0, badges: [], rankPosition: null, totalUsers: 0 }, loadingProfile: false })
            } else {
                set({ error: 'Error al cargar tu perfil de gamificación', loadingProfile: false })
            }
        }
    },

    fetchRanking: async () => {
        set({ loadingRanking: true, error: null })
        try {
            const res = await GamificationApi.get('/gamification/ranking')
            set({ ranking: res.data.ranking || [], loadingRanking: false })
        } catch (err) {
            set({ error: 'Error al cargar el ranking', loadingRanking: false })
        }
    },

    fetchChallenges: async () => {
        set({ loadingChallenges: true, error: null })
        try {
            const res = await GamificationApi.get('/daily-challenges')
            set({ challenges: res.data.challenges || [], loadingChallenges: false })
        } catch (err) {
            set({ error: 'Error al cargar los retos diarios', loadingChallenges: false })
        }
    },

    // ─── FASE 1: Marcar la acción como realizada (SIN puntos aún) ────────────
    // Llamado desde otras páginas (Foro, Impacto, Mapa, Detector).
    // El backend crea el registro UserChallenge con claimed:false.
    // Los puntos se otorgan en FASE 2 cuando el usuario presiona "Reclamar".
    completarRetoPorAccion: async (key) => {
        try {
            const res = await GamificationApi.post(`/daily-challenges/auto/${key}`)

            // Si la respuesta trae autoComplete (detector), refrescar todo
            if (res.data?.autoComplete) {
                await Promise.all([get().fetchChallenges(), get().fetchProfile()])
                return res.data
            }

            // Para otros retos: marcar como completed (pero no claimed) en el store
            // para que ChallengeCard muestre "Reclamar" de inmediato sin esperar fetch
            if (!res.data?.alreadyDone) {
                set((state) => ({
                    challenges: state.challenges.map(ch =>
                        ch.verificationKey === key
                            ? { ...ch, completed: true, claimed: false }
                            : ch
                    )
                }))
            }

            return res.data
        } catch (_) {
            return null
        }
    },

    // ─── FASE 2: Reclamar puntos de un reto ya marcado como completado ────────
    // Llamado desde el botón "Reclamar" en ChallengeCard.
    // El backend suma los puntos y marca claimed:true.
    claimChallenge: async (challengeId) => {
        set({ completingChallenge: challengeId, error: null })
        try {
            const res = await GamificationApi.post(`/daily-challenges/${challengeId}/claim`)

            // Marcar como claimed en el store
            set((state) => ({
                challenges: state.challenges.map(ch =>
                    ch._id === challengeId ? { ...ch, claimed: true } : ch
                ),
                completingChallenge: null
            }))

            // Refrescar perfil y ranking para actualizar puntos y barra
            await Promise.all([get().fetchProfile(), get().fetchRanking()])

            return { ok: true, message: res.data.message }
        } catch (err) {
            const msg = err.response?.data?.message || 'Error al reclamar los puntos'
            set({ completingChallenge: null, error: msg })
            return { ok: false, message: msg }
        }
    },

    clearError: () => set({ error: null })
}))

export default useGamificacionStore