import { create } from 'zustand'
import { GamificationApi } from '../../../shared/Api/Gamificacion'

const useGamificacionStore = create((set, get) => ({
    profile:             null,
    ranking:             [],
    challenges:          [],
    loadingProfile:      false,
    loadingRanking:      false,
    loadingChallenges:   false,
    completingChallenge: null,
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
                set({ error: 'Error al cargar perfil', loadingProfile: false })
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

    // ── FASE 1: Registrar que el usuario hizo la acción ──────────────────────
    // Llamado desde ForoPage, MapaPage, ImpactoPage, CommentSection y Detector.
    // Retorna el resultado del backend para que la página pueda mostrar el toast.
    // Después hace fetchChallenges() para que GamificacionPage vea "Reclamar".
    completarRetoPorAccion: async (key) => {
        try {
            const res = await GamificationApi.post(`/daily-challenges/auto/${key}`)

            // Retos del detector: se auto-completan con puntos
            if (res.data?.autoComplete) {
                await Promise.all([get().fetchChallenges(), get().fetchProfile()])
                return res.data
            }

            // Retos de 2 fases: sincronizar con backend
            if (!res.data?.alreadyDone) {
                // Update optimístico local
                set((state) => ({
                    challenges: state.challenges.map(ch =>
                        ch.verificationKey === key
                            ? { ...ch, completed: true, claimed: false }
                            : ch
                    )
                }))
                // Sincronizar con backend en background
                get().fetchChallenges().catch(() => {})
            }

            return res.data
        } catch (err) {
            console.error(`[Gamificación] Error registrando acción '${key}':`, err?.response?.data || err.message)
            return null
        }
    },

    // ── FASE 2: Reclamar puntos ───────────────────────────────────────────────
    // Llamado desde GamificacionPage cuando el usuario presiona "Reclamar".
    claimChallenge: async (challengeId) => {
        set({ completingChallenge: challengeId, error: null })
        try {
            const res = await GamificationApi.post(`/daily-challenges/${challengeId}/claim`)

            // Marcar como claimed localmente
            set((state) => ({
                challenges: state.challenges.map(ch =>
                    ch._id === challengeId ? { ...ch, claimed: true } : ch
                ),
                completingChallenge: null
            }))

            // Refrescar puntos, barra de progreso y ranking
            await Promise.all([
                get().fetchProfile(),
                get().fetchRanking(),
                get().fetchChallenges(),
            ])

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