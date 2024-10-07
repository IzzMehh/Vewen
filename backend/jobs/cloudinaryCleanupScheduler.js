import cron from "node-cron";
import { DeletedAssests } from "../models/post/CloudinaryDeletedAsset.model.js";
import { deletePostAttachments } from "../utils/cloudinary.js";


function deletedAssestCleanupFn() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running Cloudinary Cleanup Fn')

    const twoDayAgo = Date.now() - 2 * 24 * 60 * 60 * 1000

    const assestDocuments = await DeletedAssests.find({
      createdAt: { $lt: twoDayAgo }
    }).limit(100)

    let imageAssestPublic_id = []
    let videoAssestPublic_id = []
    let assestDocumentsId = []

    assestDocuments.map(document => {
      assestDocumentsId.push(document._id)

      document.deletedAssests.map(asset => {
        if (asset.fileType === "video") {
          videoAssestPublic_id.push(asset.public_id)
        } else {
          imageAssestPublic_id.push(asset.public_id)
        }
      })
    })

    // console.log(assestDocuments)
    // console.log('......')
    // console.log(imageAssestPublic_id)
    // console.log('......')
    // console.log(videoAssestPublic_id)
    // console.log('.......')
    // console.log(assestDocumentsId)
    // console.log('.......')

    if (assestDocuments.length > 0) {
      console.log(`deleting ${imageAssestPublic_id.length} Images & ${videoAssestPublic_id.length} Videos`)
      console.log(imageAssestPublic_id)
      console.log(videoAssestPublic_id)
      await deletePostAttachments('image', imageAssestPublic_id)
      await deletePostAttachments('video', videoAssestPublic_id)
    } else {
      console.log('Got no deleted assest')
    }

    await DeletedAssests.deleteMany({
      _id: {
        $in: assestDocumentsId
      }
    })

  });
}

export {
  deletedAssestCleanupFn
};
