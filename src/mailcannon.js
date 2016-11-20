const Mailgun = require('mailgun').Mailgun;

const mgKey = process.env.API_KEY;
const mailgun = new Mailgun(mgKey);
const sender = 'postmaster@hybridia.fi';

function mailCannon(data){
  return Promise.resolve(sendMail(getMailBody(data), data.email, data.name)); 
};

const getMailBody = (data) =>
  `Tämä on automaattisesti luotu ilmoittautumissähköposti.

  Ongelmatapauksissa ota yhteyttä hybridiaan. Älä kuitenkaan vastaa tähän viestiin.
  
  - Hybridian tiimi 
  
  Ilmoittautumistietosi:
  ---
  Nimi: ${data.name} 
  Email: ${data.email}  
  Osoite: ${data.address}  
  Postitoimipaikka: ${data.location}  
  Valittu kurssi: ${data.course}  
  Muuta: ${data.other !== false && data.other}`;

function sendMail(body, target, name){
  let response = true;
  mailgun.sendText(
    sender, // Sender
    [target, 'support@hybridia.fi'], // Recipients
    `Hybridian kurssi-ilmoittautuminen - ${name}`, //Subject
    body, // Body
    'postmaster@hybridia.fi',
    {}, (err) => {
      if(err){
        console.log('Sending mail failed', err);
        response = false;
      } 
      else console.log('Mail sending success');
      return !err;
    });
  return response;
}

module.exports = mailCannon;