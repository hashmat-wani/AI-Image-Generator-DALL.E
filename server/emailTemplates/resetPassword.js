import { DEV_API, MODE, PROD_API } from "../config/index.js";

export default function resetPassword(email, name, token) {
  return `<div>
    
      <div style="background:#0a66c2;padding:20px;color:white;text-align:center;">
        <h3>Thankyou for choosing DALL.E</h3>
        <p>Reset your DALL.E password</p>
      </div>
     
      <div style="padding:20px;">
        <p>Hey ${name},</p>
        <p style="margin-bottom:35px;">You asked and we delivered. Let's get you a new password. To continue, please click below:</p>
        <a style="background:#0a66c2;border:none;color:white;
        padding:13px 22px;
        text-align:center;
        cursor:pointer;
        border-radius:4px;
        font-size:16px;
        text-decoration:none;" href="${
          MODE === "dev" ? DEV_API : PROD_API
        }/api/v1/mail/verifyresetpasswordlink/${token}" target="_blank">Reset password</a>
        <p style="margin-top:50px;">If you didn't make this request please disregard this email.</p>
        <p>This link will expire in 1 hour. If your link has expired, you can always request another</p>
        <p>Thanks</p>
      </div>
  
      <div style="background:gray;padding:20px;text-align:center;">
        <h4 style="color:white;">Get in touch</h4>
        <p>
          <a style="color:white;" href="tel:7006600835">7006600835</a>
        </p>
        <p>
          <a style="color:white;" href="mailto:hashmatwani@icloud.com">hashmatwani@icloud.com</a>
        </p>
      </div>
  
    </div>
      `;
}
