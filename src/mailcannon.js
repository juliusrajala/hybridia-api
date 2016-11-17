const Mailgun = require('mailgun').Mailgun;

const mgKey = process.env.API_KEY;
const mailgun = new Mailgun(mgKey);
const sender = 'postmaster@hybridia.fi';

function mailCannon(data){
  try {
    console.log('Cannon received data', data);
    sendMail(getMailBody(data), data.email, data.name);
  } catch(e) {
    console.log('Error:', e);
  }
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
  mailgun.sendText(
    sender, // Sender
    [target, 'juliusrajala@gmail.com'], // Recipients
    `Hybridian kurssi-ilmoittautuminen - ${name}`, //Subject
    body, // Body
    'postmaster@hybridia.fi',
    {},
    function(err) {
      if(err) console.log(err);
      else console.log('Mail sending success');
      return err ? err : true;
    });
}

module.exports = mailCannon;