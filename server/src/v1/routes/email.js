const express = require('express');
const router = express.Router();
const boom = require('boom');
const isEmail = require('isemail');
const nodemailer = require('nodemailer');

router.post('/send', (req, res, next) => {
  const {email, message, name} = req.body

  if (email.length === 0 || name.length === 0) return next(boom.badRequest('Empty Fields'))

  const validEmail = isEmail.validate(email)
  if (!validEmail) return next(boom.badRequest('Invalid Email'))
  
  const transporter = nodemailer.createTransport({
    host: 'mail.name.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW
    }
  })

  const mailOption = {
    from: email,
    to: process.env.EMAIL_USER,
    text: message,
    subject: `Message from ${name}`
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error(error)
      return next(boom.badImplementation(error))
    }
    else {
      res.send('Successfully sent')
    }
  })
});

module.exports = router;