// ===============================
// file-uploader.js
// ===============================

import multer from 'multer'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

dotenv.config()

// ========================================
// DEBUG ENV VARIABLES
// ========================================

console.log('\n========== CLOUDINARY ENV ==========')
console.log('CLOUD NAME:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('API KEY:', process.env.CLOUDINARY_API_KEY)
console.log(
  'API SECRET:',
  process.env.CLOUDINARY_API_SECRET ? 'EXISTS ✅' : 'UNDEFINED ❌'
)

// ========================================
// TLS DEBUG (SOLO DESARROLLO)
// ========================================

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// ========================================
// CLOUDINARY CONFIG
// ========================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// ========================================
// VALIDACIONES
// ========================================

const MIMETYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// ========================================
// CLOUDINARY STORAGE
// ========================================

export const createCloudinaryUploader = (folder) => {

  console.log('\n========== CREATING CLOUDINARY STORAGE ==========')

  const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: async (req, file) => {

      console.log('\n========== FILE RECEIVED ==========')
      console.log(file)

      const fileExt = extname(file.originalname)

      const baseName = file.originalname.replace(fileExt, '')

      const safeBase = baseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-+|-+$/g, '')

      const shortUuid = uuidv4().substring(0, 8)

      const publicId = `${safeBase}-${shortUuid}`

      console.log('\n========== GENERATED PUBLIC ID ==========')
      console.log(publicId)

      return {
        folder: folder,
        public_id: publicId,
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        transformation: [
          {
            width: 1000,
            height: 1000,
            crop: 'limit'
          }
        ],
        resource_type: 'image'
      }
    }
  })

  return multer({

    storage: storage,

    fileFilter: (req, file, cb) => {

      console.log('\n========== FILE FILTER ==========')
      console.log('Mimetype:', file.mimetype)

      if (MIMETYPES.includes(file.mimetype)) {

        console.log('FILE ACCEPTED ✅')

        return cb(null, true)

      } else {

        console.log('FILE REJECTED ❌')

        return cb(
          new Error(
            `Solo se permiten imágenes: ${MIMETYPES.join(', ')}`
          )
        )
      }
    },

    limits: {
      fileSize: MAX_FILE_SIZE
    }

  })
}

// ========================================
// EXPORT USER IMAGE UPLOADER
// ========================================

export const uploadUserImage = createCloudinaryUploader(
  process.env.CLOUDINARY_FOLDER || 'gestor_users_ecoKinal/users'
)

// ========================================
// EXPORT CLOUDINARY
// ========================================

export { cloudinary }