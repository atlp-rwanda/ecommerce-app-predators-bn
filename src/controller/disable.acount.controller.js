import sendEmail from '../utils/sendEmail.js';
import db from '../database/models/index.js';

export const disableEnableUsers= async (req, res)=> {
    const {status,reason,email}=req.body;

    try{
      const user = await db.User.findOne({ where: { email: email} });

    if(!user){
        return res.status(404).json({
          message:`user with email : ${email} does not exit `
      })
    }

      else{
      user.status = status;

      await user.save();

      if (user) {
        
        const to = user.email;
        const text=`Dear Vendor, Your account has been ${status}  due to the following reason(s) of ${reason}.Please contact us if
         you have any questions.Best regards,The Admin Team`;
        
        sendEmail.sendEmail(to,'account status',text)

         return res.status(200).json({ message:`User Status account changed successfully ${status} `,
        });

         
    }
       
      }

    } catch (error) {
     return res.status(500).json({
      message: error.message,
    });

    }
}

export default disableEnableUsers;