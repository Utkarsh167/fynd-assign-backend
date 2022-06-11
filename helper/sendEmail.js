var events = require('events');
var eventEmitter = new events.EventEmitter();

const ses = require('node-ses'),
  client = ses.createClient({ key: process.env.SESKEY, secret: process.env.SESSECRET, amazon: process.env.REGION })

var sendEmail = function (mailOptions) {
  let emailBody = '<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></head><body style="margin: 0;background: #fff;"><table style="border: 1px solid #ddd; margin: 15px auto;font-family: \'Open Sans\', \'Arial\', \'sans-serif\'; font-size: 13px; color: #2c2c2c; background: #000000;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="background: #000000;border-bottom: 1px solid #ccc;padding: 0 60px;"><table style="width:100%"><tr><td style="padding: 21px 0; text-align:center"><img src="https://doradoexchange.com/assets/img/doranto-img/logo.png" alt="Dorado-Exchange"></td></tr></table></td></tr><tr><td><table style="background: #fff;padding: 20px 60px;" width="600" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 14px;padding-bottom: 26px;"> ' + mailOptions.text + ' </td></tr><tr><td style="line-height: 27px; padding: 17px 0 0;text-align: center;"> <span style="font-size: 13px;">You\'re receiving this email from dorado-exchange as you had made request for service.</span></td></tr></tbody></table></td></tr><tr><td style="font-size: 14px;padding: 17px;border-top: 1px solid #ccc;text-align: center;background: #f6f7f7;color: #999;font-weight: 600;"><span style="margin: 0;display: block;">© Dorado-Exchange 2021</span></td></tr></tbody></table></body></html>';
  let options = ''
  if (mailOptions.bcc) {
    options = {
      bcc: mailOptions.bcc,
      from: 'kgdoradoexchange@gmail.com',
      subject: mailOptions.subject,
      message: emailBody,
    }
  }
  else {
    options = {
      to: mailOptions.to,
      from: 'kgdoradoexchange@gmail.com',
      subject: mailOptions.subject,
      message: emailBody,
    }
  }

  client.sendEmail(options, function (error, data, response) {
    if (error) {
      console.log("************ Email Error! ************ ")
      console.log(error);


    } else {
      console.log("************ Email Sent! ************ ")
    }
  })
}



eventEmitter.on('sendEmail', sendEmail);

module.exports = eventEmitter;