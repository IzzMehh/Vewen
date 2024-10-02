import mongoose from "mongoose";

const cloudinaryDeletedAssestSchema = new mongoose.Schema({
    deletedAssests: [
        {
            public_id: String,
            fileType: String,
        }
    ]
}, {
    timestamps: true
})

export const DeletedAssests = mongoose.model('DeletedAssests', cloudinaryDeletedAssestSchema)