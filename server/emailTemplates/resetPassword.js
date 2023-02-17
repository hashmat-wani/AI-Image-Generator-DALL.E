export default function resetPassword(email, name, otp) {
  return `<div>
    
      <div style="background:#0a66c2;padding:20px;color:white;text-align:center;">
        <h3>Thankyou for choosing DALL.E</h3>
        <p>Reset your DALL.E password</p>
      </div>
     
      <div style="padding:20px;">
        <p>Hey ${name},</p>
        <p>You asked and we delivered. Let's get you a new password by
        using this code:</p>
        <h1 style="text-align:center;">${otp}</h1>
        <p>This code will expire in 1 hour</p>
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
