<<<<<<< HEAD
import db from "../database/models/index.js";
import checkForIllegalItems from "../services/accountService.js"
import checkForHarassment from "../services/accountService.js"
import checkForLawEnforcementRequest from "../services/accountService.js"
import checkForCommunityGuidelineViolation from "../services/accountService.js"

 const disableUser = async (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    if (!req.params.id) {
      return res.status(400).json({ status: 'fail', message: req.t('missing_user_id') });
    }
    const existingUser = await db.User.findOne({ where: { id: req.params.id } });
    if (!existingUser) {
      return res.status(404).json({ status: 'fail', message: req.t('user_not_found') });
    }

    const hasIllegalItems = checkForIllegalItems(id);
    const hasHarassment = checkForHarassment(id);
    const hasLawEnforcementRequest = checkForLawEnforcementRequest(id);
    const hasCommunityGuidelineViolation = checkForCommunityGuidelineViolation(id);
  
    if (hasIllegalItems || hasHarassment || hasLawEnforcementRequest || hasCommunityGuidelineViolation) {
      const sendemailOpt = {
        email: existingUser.email,
        subject: 'Your account disabled',
        html: `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#FFF">
          <tbody><tr>
          <td style="padding-top:54px;padding-bottom:42px" align="center">
          <h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Predators project</h2>
          </td>
          </tr>
          </tbody></table>
          <p> Dear <h2> ${existingUser.firstname} </h2> We regret to inform you that your account on our website has been disabled due to some protocal violation.
           Our team has conducted a thorough investigation and found evidence of wrongdoing, which is against our policies.</p>
          
          <p>As a result, we had to disable your account to protect the security and integrity of our platform. 
          We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or harmful behavior.</p>
  
          <p>Please note that you will no longer be able to access your account or any associated services. 
          If you have any questions or concerns about this decision, please feel free to contact us at <a href="mailto:predators@gmail.com">CONTACT US</a>.</p>
  
          <p><i>Thank you for your understanding and cooperation.</i></p>
  
          <h3>Best regards,</h3>
          <h5><i>E-commerce ATLP-Predators project team</i></h5>
          `,
      };
      await sendEmail(sendemailOpt);
  
      existingUser.status = 'inactive';
      await existingUser.save();
  
      return res.status(200).json({ status: 'success', message: req.t('disabled_successfully') });
    }

}



export default disableUser 

=======
import sendEmail from "../utils/sendEmail";
import db from "../database/models/index.js";

export const disableUser = async (req, res) => {
  const { status, reason, email } = req.body;

  try {
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        message: `user with email : ${email} does not exit `,
      });
    } else {
      user.status = status;

      await user.save();

      if (user) {
        const to = user.email;
        const text = `
        Subject: Notification of account deactivation

        Dear User,
        
        We regret to inform you that your account on our website has been ${status} due to a ${reason}. Our team has conducted a thorough investigation and found evidence of unauthorized activity on your account.
        
        As a result, we have taken the necessary steps to protect the security and integrity of our platform by deactivating your account. We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or harmful behavior.
        
        Please note that you will no longer be able to access your account or any associated services. If you have any questions or concerns about this decision, please do not hesitate to contact us at predators@gmail.com.
        
        Thank you for your understanding and cooperation.
        
        Best regards,
        
        The E-commerce ATLP-Predators project team`;

        sendEmail.sendEmail(to, "account status", text);

        return res
          .status(200)
          .json({ message: `User account ${status} successfully  ` });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default disableUser;
>>>>>>> 0667552e2152458c394c990fd9043f382991c121
