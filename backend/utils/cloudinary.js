import { v2 as cloudinary } from 'cloudinary'


function configCloudinary() {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
}

const uploadPostAttachments = async (resource_type,path) => {
  const options = {
    folder: "Post attachments",
    resource_type,
  };

  try {
    const result = await cloudinary.uploader.upload(path, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

const uploadProfileImage = async (imagePath) => {
  const options = {
    folder: "Profile Images",
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};


export {
  uploadPostAttachments,
  uploadProfileImage,
  configCloudinary,
}