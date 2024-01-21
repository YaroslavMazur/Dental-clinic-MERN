const nodemailer = require("nodemailer");

class mailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure: false,
            auth:{
                user:process.env.SMTP_MAIL,
                pass:process.env.SMTP_MAIL_PASSWORD,
            }
        });
    }


    async sendActivationLink(toEmail, activationLink){
        try{

            await this.transporter.sendMail({
                from:process.env.SMTP_MAIL,
                to:toEmail,
                text:"",
                html:
                `
                    <div>
                        <h1>Перейдіть за посиланням для активації акаунту:</h1>
                        <a href=${activationLink}>${activationLink}</a>
                    </div>
                `
            })
        }
        catch(err){
            console.log(err)
        }
    }
 

}

module.exports = new mailService();