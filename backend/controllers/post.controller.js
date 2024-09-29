import { Post } from "../models/post.model.js"
import { uploadPostAttachments } from "../utils/cloudinary.js";
import fs from "fs"

async function createPost(req,res){
    try {
        const { userId ,content } = req.body

        if(!userId){
            return res.status(400).send("User Id is required")
        }

        if(!content){
            return res.status(400).send('Post content is required!')
        }

        const files = req.files || []

        let attachments = []

        await Promise.all(
            files.map(async (file)=>{
                let resource_type = file.mimetype.startsWith('video') ? 'video' : 'image' 
                const uploadedFileUrl = await uploadPostAttachments(resource_type,file.path)
                
                const fileData = {
                    url:uploadedFileUrl,
                    fileType:file.mimetype,
                }

                attachments.push(fileData)

                fs.unlink(file.path,(e)=>{
                    if(e){
                        throw new Error(e)
                    }
                    console.log(`deleted ${file.originalname}`)
                })
            })
        )

        const post = await Post.create({content,userId,attachments})

        return res.status(201).send(post)
        
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export{
    createPost
}