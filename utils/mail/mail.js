const nodemailer = require('nodemailer')
const randomstring  = require('randomstring');
const { ResetPassword , User } = require('../../connection/db');

async function main( payload ) {

    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      const token = randomstring.generate({
        length: 50,
      })
      const {email} = payload
      const data = await User.findOne({where:{email}})
       await ResetPassword.create({id : data.id, token, email})


      //send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"moon 👻" <example@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Link", // Subject line
        // text: "Test 2", // plain text body
        html: `<a href=http://localhost:3000/reset_password?token=${token}>Reset Link</a>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
   
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

       return {message: "password reset link send successfully", success: true, data:{email}}
}
// main().catch(console.error);
module.exports = main