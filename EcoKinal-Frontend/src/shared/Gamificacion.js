// shared/Gamificacion.js
//
// Exporta completarRetoPorAccion como función standalone para que
// CommentSection, ForoPage, ImpactoPage y MapaPage la puedan usar
// sin cambiar sus imports.
//
// Internamente usa el store de Zustand para que el estado se actualice
// y GamificacionPage refleje los cambios al instante.

export { GamificationApi } from './Api'

export const completarRetoPorAccion = (key) => {
  // Importación dinámica del store para evitar dependencia circular en el módulo.
  // getState() da acceso a las acciones sin necesidad de un hook de React.
  return import('../features/user/store/useGamificacionStore').then(({ default: useGamificacionStore }) => {
    return useGamificacionStore.getState().completarRetoPorAccion(key)
  }).catch(() => null)
}