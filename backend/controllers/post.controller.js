import { DeletedAssests } from "../models/post/CloudinaryDeletedAsset.model.js";
import { Post } from "../models/post/post.model.js"
import { Likepost } from "../models/post/postLike.model.js";
import { uploadPostAttachments } from "../utils/cloudinary.js";
import fs from "fs/promises"

async function createPost(req, res) {
    try {
        const { postedBy, content, parentPost } = req.body
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

        const post = await Post.create({ content, postedBy, attachments, parentPost: parentPost || null })

        return res.status(201).send(post)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePost(req, res) {
    try {
        const { postId } = req.body

        if (!postId) {
            return res.status(400).send('Post Id is required')
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).send("Post doesn't exist!")
        }

        if (post.postedBy != req.user._id) {
            return res.status(401).send("You're not the owner of the post")
        }

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

        await DeletedAssests.create({ deletedAssests })

        return res.status(200).send(`Deleted: ${post._id}`)


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updatePost(req, res) {
    try {
        const { content, postId, existingImageUrls } = req.body
        const files = req.files || []
        const existingImageUrlsArray = JSON.parse(existingImageUrls) || []

        if (existingImageUrlsArray.length + files.length > 4) {
            try {
                await Promise.all(files.map(async (file) => {
                    await fs.unlink(file.path);
                    console.log(`deleted: ${file.originalname}`);
                }));
            } catch (error) {
                console.log(error.message);
            }

            return res.status(409).send('You can only upload up to 4 images');
        }


        if (!content) {
            return res.status(400).send('No content provided')
        }

        if (!postId) {
            return res.status(400).send('PostId is required')
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).send("Post doesn't exist!")
        }

        if (req.user._id != post.postedBy) {
            return res.status(401).send("You're not the owner of the post")
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

        let deletedAssests = []

        let attachmentLeft = post.attachments.filter(attachment => {
            if (existingImageUrlsArray.includes(attachment.url)) {
                return attachment
            } else {
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
            }
        })

        await DeletedAssests.create({ deletedAssests })

        post.attachments = [...attachmentLeft, ...attachments]

        post.content = content
        post.isEditied = true

        await post.save()

        return res.status(200).send(post)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function likePost(req, res) {
    try {
        const { postId } = req.body
        const userId = req.user._id

        if (!postId) {
            return res.status(400).send("Post Id is required")
        }

        await Likepost.create({ userId, postId })

        return res.status(200).send('Liked post')
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("Already liked")
        }
        return res.status(500).send(error.message)
    }
}

async function unLikePost(req, res) {
    try {
        const { postId } = req.body
        const userId = req.user._id

        if (!postId) {
            return res.status(400).send("Post Id is required")
        }

        const post = await Likepost.findOneAndDelete({ userId, postId })
        if (!post) {
            return res.status(400).send("Post is not liked")
        }
        return res.status(200).send("Unliked Post")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getPost(req, res) {
    try {
        const { skip } = req.query
        const post = await Post.aggregate(
            [
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $skip: skip || 0,
                },
                {
                    $limit: 10,
                },
                {
                    $lookup: {
                        from: "likeposts",
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes",
                    },
                },

                {
                    $addFields: {
                        likes: {
                            $size: '$likes'
                        }
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "parentPost",
                        as: "replies"
                    }
                },
                {
                    $addFields: {
                        replies: {
                            $size: "$replies"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "parentPost",
                        foreignField: "_id",
                        as: "parentPost"
                    }
                },
                {
                    $addFields: {
                        parentPost: {
                            $cond: {
                                if: {
                                    $gt: [
                                        {
                                            $size: "$parentPost"
                                        }, 0
                                    ]
                                },
                                then: {
                                    $arrayElemAt: ["$parentPost", 0]
                                },
                                else: null
                            }
                        }
                    }
                }
            ]
        )
        return res.status(200).send(post)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getReplies(req, res) {
    try {
        const { postId, skip } = req.params

        const replies = await Post.find({
            parentPost: postId
        }).skip(Number(skip) || 0).limit(10)

        return res.status(200).send(replies)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export {
    createPost,
    deletePost,
    updatePost,
    likePost,
    unLikePost,
    getPost,
    getReplies,
}