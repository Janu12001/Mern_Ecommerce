const passport = require("passport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ak7616308@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //   token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGM5OTVkMmZjMTM3MWQ1NGIwODBhNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyMTc4NzgxfQ.ofqdsGzlBRFmTwrNdMB-dZoCkvhckBFrm4inoL4ekFY";
  //   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGJhOWQyM2E2YmZiZTY2YzA4NDI3MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyMTIxMTcwfQ.pIsLwTgYeSm8GxCyCv8ilmXCHAzmG7-QI8JLS63t7Nc";
  //   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGJhZWE3YWFlMDgzMDllNmUyNTUxNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyMTE4Njk1fQ.AA78vfXHrjx83rPeBnAgU1eEc2-QZ1aCEiCCkqUiAWw";
  return token;
};

exports.sendMail = async function ({ to, subject, text, html }) {
  // send mail with defined transport object

  let info = await transporter.sendMail({
    from: '"E-commerce" <ak7616308@gmail.com>', // sender address
    to: to,
    subject,
    text,
    html,
  });

  return info;
};
