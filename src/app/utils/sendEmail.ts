import nodemailer from 'nodemailer'
import config from '../config'

const sendEmail = async (email: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'mdparvez222khan@gmail.com',
      pass: 'lqnc sdxx nreu oovm',
    },
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mdparvez222khan@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Password Reset Link ✔ reset within 10minutes!', // Subject line
    text: 'The reset link will be invalid after 10 minutes', // plain text body
    html: `<div><h1>Reset Password link</h1><p>${resetLink}</p></div>`, // html body
  })
}

export default sendEmail
