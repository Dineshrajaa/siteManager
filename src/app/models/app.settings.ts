interface SMServerConfig {
    BASE_URL: string
}

interface CloudinaryConfig {
    API_URL: string,
    PRESET: string
}

export interface SMAppConfig {
    SM: SMServerConfig,
    Cloudinary: CloudinaryConfig
}