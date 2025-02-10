import { User } from "../../models/user.model.js"
import { ApiError } from "../../utils/ApiError.js"


const setSignatureService = async (authorId,signature) => {
    if(!authorId || !signature){
        throw new ApiError(400, 'signature is missing')
    }

    const user = await User.findById(authorId);
    if(!user){
        throw new ApiError(404, 'User not found');
    }

    user.signature = signature;

    await user.save();

    return {
        message : 'Signature saved successfully',
        data : user.signature
    }
}

export {setSignatureService}