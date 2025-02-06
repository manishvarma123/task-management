import { backend_domain } from "../../../frontend/src/constant.js";
import { ApiError } from "../../utils/ApiError.js";


const uploadImage = (req,res) => {
    try {
        console.log(req.file)
        const imageUrl = `${backend_domain}/media/${req.file.filename}`;
        if(!imageUrl){
            throw new ApiError(400, 'Imageurl not found')
        }

        return res.status(200).json({
            message : 'Image uploaded successfully',
            data : imageUrl,
            success : true,
            error : false
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'Error uploading image',
            error : true,
            success : false
        })
    }
}

export default uploadImage