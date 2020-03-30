export default {
  host: process.env.APP_MAIL_HOST,
  port: process.env.APP_MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.APP_MAIL_USER,
    pass: process.env.APP_MAIL_PASS,
  },
  default: {
    from: 'Equipe FastFeet <noreply@fastfeet.com>',
  },
};
