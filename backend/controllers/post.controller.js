import { Post } from "../models/post.model.js"
import { uploadPostAttachments } from "../utils/cloudinary.js";
import fs, { unlink } from "fs/promises"

async function createPost(req,res){
    try {
        const { userId ,content } = req.body
        const files = req.files || []

        if(!userId){
            return res.status(400).send("User Id is required")
        }

        if(!content){
            return res.status(400).send('Post content is required!')
        }

        const attachments = await Promise.all(
            files.map(async (file)=>{
                let resource_type = file.mimetype.startsWith('video') ? 'video' : 'image' 
                const uploadedFileUrl = await uploadPostAttachments(resource_type,file.path)
                
                const fileData = {
                    url:uploadedFileUrl,
                    fileType:file.mimetype,
                }

                try {
                    await fs.unlink(file.path);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
                

                return fileData
            })
        )
        console.log(attachments)

        const post = await Post.create({content,userId,attachments})

        return res.status(201).send(post)
        
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export{
    createPost
}