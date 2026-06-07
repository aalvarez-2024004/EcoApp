import { DetectorApi } from './Api/Api'

export const clasificarImagen = async (imagenFile) => {
  const formData = new FormData()
  formData.append('imagen', imagenFile)
  const response = await DetectorApi.post('/clasificar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}