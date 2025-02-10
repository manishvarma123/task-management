import { setSignatureService } from "../../services/users/setSignatureService.js";


const setSignature = async (req,res) => {
    try {
        const authorId = req._id
        const {signature} = req.body;
        

        const {message,data} = await setSignatureService(authorId,signature)

        return res.status(200).json({
            message : message,
            data : data,
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message : error.message || 'Internal server error',
            success : false,
            error : true
        })
    }
}

export default setSignature