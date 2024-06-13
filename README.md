# express-cloudinary
simple repo with a express app that can be used to upload and delete filed on cloudinary

## Example upload
```js
const data = new FormData()
data.append('file', file)

fetch('http://localhost:5001/upload', {
  method: "POST",
  headers: {
    'content-type': 'multipart/form-data',
  },
  body: data,
})

// { success: true, url: <image_url>, public_id: <public_id> }
```

## Example delete
```js
fetch('http://localhost:5001/delete', {
  method: "DELETE",
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ public_id: 'file_public_id' })
})
```