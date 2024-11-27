import bcryptjs  from 'bcryptjs';
import User from "@/models/userModel";
import nodemailer from "nodemailer";


export const sendEmail = async ({email,emailType,userId}:any) => {
    
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(hashedToken);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry : Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set : {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                }
            })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c9bde22075fe02",
            pass: "c2c3830cc132b8"
        }
        });

        const mailOptions = {
        from: 'venkateshsmsv199@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? "Verify your email" :"Reset your password", // Subject line
        html: `<p> click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType  === "VERIFY" ? "VERIFY YOUR EMAIL" :" RESET YOUR PASSWORD"} or copy and paste the link in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
        }
        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse);

        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}