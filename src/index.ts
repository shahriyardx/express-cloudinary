import body_parser from "body-parser"
import Express, { type Request, type Response } from "express"
import multer from "multer"

import { deleteImage, uploadImage } from "./cloudinary"

const app = Express()
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
	res.json({ hello: "World" })
})

app.post(
	"/upload",
	multer().single("file"),
	async (req: Request, res: Response) => {
		if (!req.file)
			return res
				.status(400)
				.json({ success: false, error: "please upload file" })

		const response = await uploadImage(req.file)
		const data = response.data
			? { image_url: response.data.url, public_id: response.data.public_id }
			: { error: response.error }

		res.json({
			success: response.success,
			...data,
		})
	},
)

app.delete("/delete", async (req: Request, res: Response) => {
	const { public_id } = req.body as { public_id: string }
	const response = await deleteImage(public_id)

	res.json(response)
})

app.listen(5001, () => {
	console.log("http://localhost:5001")
})
