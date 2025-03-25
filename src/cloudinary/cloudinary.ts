import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY } from './constants'
import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const cloudinaryProvider: Provider = {
    inject:[ConfigService],
    provide: CLOUDINARY,
    useFactory: (configService: ConfigService) => {
        return cloudinary.config({
            cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get('CLOUDINARY_API_KEY'),
            api_secret: configService.get('CLOUDINARY_API_SECRET')
        })
    }
}