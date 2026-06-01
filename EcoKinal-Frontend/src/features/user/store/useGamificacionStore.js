import { create } from 'zustand'
import { GamificationApi } from '../../../shared/Api'

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

    completeChallenge: async (challengeId) => {
        set({ completingChallenge: challengeId, error: null })
        try {
            const res = await GamificationApi.post(
                `/daily-challenges/${challengeId}/complete`,
                { confirmed: true }   
            )

            set((state) => ({
                challenges: state.challenges.map(ch =>
                    ch._id === challengeId ? { ...ch, completed: true } : ch
                ),
                profile: res.data.data?.gamification
                    ? {
                        ...state.profile,
                        points:         res.data.data.gamification.points,
                        recyclingCount: res.data.data.gamification.recyclingCount,
                        badges:         res.data.data.gamification.badges
                    }
                    : state.profile,
                completingChallenge: null
            }))

            get().fetchRanking()
            get().fetchProfile()

            return { ok: true, message: res.data.message }
        } catch (err) {
            const msg = err.response?.data?.message || 'Error al completar el reto'
            set({ completingChallenge: null, error: msg })
            return { ok: false, message: msg }
        }
    },

    clearError: () => set({ error: null })
}))

export default useGamificacionStore
