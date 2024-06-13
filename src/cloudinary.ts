import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
	secure: true,
	api_key: process.env.CN_API_KEY,
	api_secret: process.env.CN_API_SECRET,
	cloud_name: "shahriyar-dev",
})

export interface MulterFile {
	buffer: Buffer
	encoding: string
	fieldname: string
	mimetype: string
	originalname: string
	size: number
}

export const uploadImage = async (image: MulterFile) => {
	const buffer = Buffer.from(image.buffer).toString("base64")
	const dataUri = `data:${image.mimetype};base64,${buffer}`

	try {
		const response = await cloudinary.uploader.upload(dataUri, {
			folder: "hello",
		})
		return { success: true, data: response }
	} catch (error) {
		return { success: false, error: error }
	}
}

export const deleteImage = async (public_id: string) => {
	const response = await cloudinary.api.delete_resources([public_id])
	const deleted = response.deleted

	if (deleted[public_id] !== "deleted")
		return { success: false, status: deleted[public_id] }

	return { success: true, status: deleted[public_id] }
}
