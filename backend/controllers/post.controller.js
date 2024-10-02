import { DeletedAssests } from "../models/post/CloudinaryDeletedAsset.model.js";
import { Post } from "../models/post/post.model.js"
import { uploadPostAttachments } from "../utils/cloudinary.js";
import fs from "fs/promises"

async function createPost(req, res) {
    try {
        const { postedBy, content } = req.body
        const files = req.files || []

        if (!postedBy) {
            return res.status(400).send("PostedBy ID is required")
        }

        if (!content) {
            return res.status(400).send('Post content is required!')
        }

        const attachments = await Promise.all(
            files.map(async (file) => {
                let resource_type = file.mimetype.startsWith('video') ? 'video' : 'image'
                const uploadedFileData = await uploadPostAttachments(resource_type, file.path)
                const fileData = {
                    url: uploadedFileData.url,
                    fileType: file.mimetype,
                    public_id: uploadedFileData.public_id,
                }

                try {
                    await fs.unlink(file.path);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }


                return fileData
            })
        )

        const post = await Post.create({ content, postedBy, attachments })

        return res.status(201).send(post)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePost(req, res) {
    try {
        const { postId } = req.body

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).send("Post doesn't exist!")
        }

        if (post.postedBy != req.user._id) {
            return res.status(401).send("You're not the owner of the post")
        }

        console.time('filesdelete')

        let deletedAssests = []

        post.attachments.map(attachment => {
            if (attachment.fileType.startsWith('video')) {
                deletedAssests.push({
                    public_id: attachment.public_id,
                    fileType: 'video'
                })
            } else {
                deletedAssests.push({
                    public_id: attachment.public_id,
                    fileType: 'image'
                })
            }
        })

        await Post.findByIdAndDelete(postId)

        const p = await DeletedAssests.create({ deletedAssests })

        console.log(p)

        return res.status(200).send(`Deleted: ${post._id}`)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export {
    createPost,
    deletePost
}