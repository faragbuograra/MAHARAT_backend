import { Request, Response } from "express";
import { User } from "../Users/user.model";

export const me = async (req: Request, res: Response) => {
   if(!req.user) return res.status(401).json({message: 'Unauthorized'})
   if(req.user.status=='false') return res.status(401).json({message: 'Unauthorized'})

    let user;
    if (req.user.role === 'seeker') {
        user = await User.query().findById(req.user.id).withGraphFetched('saved_list.provider');
    } else {
        user = await User.query().findById(req.user.id).withGraphFetched('services');
    }

    res
        .status(200)
        .json({data: user})

}
