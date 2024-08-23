const nodemailer = require("nodemailer");
const fs=require('fs');
const path = require('path');
const ejs=require('ejs')


const transporter =  nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

 module.exports.sendmail=async (to, subject,templetdata)=>{
    const templatePath=path.join(__dirname,'../views/index.ejs')
    const template = fs.readFileSync(templatePath,'utf8');
    const html= await ejs.renderFile(templatePath,templetdata);



    const maillOptions={
        from:process.env.SMTP_MAIL,
        to,
        subject,
        html
    };


    return transporter.sendMail(maillOptions);
}


// let info= await transporter.sendMail({
//   from: 'manishsonak9@gmail.com',
//   to: 'manishs20cse019@gmail.com',
//   subject: 'Hello from Node.js',
//   text: 'Hello world',
//   html: '<b>Hello world</b>'
// })
