import nodemailer from 'nodemailer'
import { EventEmitter } from 'events'


export const sendEmailEvent = new EventEmitter()

sendEmailEvent.on('sendEmail', async(email, otp) => {
    await sendEmail({
        to: email,
        subject: "Verifying Account",
        html: `<p> Your OTP is <b>${otp}</b> </p>`
    })
})


export const sendEmail = async ({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const info = await transporter.sendMail({
        from: `"circlely-app"<${process.env.EMAIL}>`,
        to,
        subject,
        html
    })

    if(info.rejected.length > 0) return false;
    return true
}