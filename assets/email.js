function sendMail(contactForm) {
  emailjs.send('service_2p76xzg', 'bp-form', {
    'from_name': contactForm.fullname.value,
    'from_email': contactForm.emailaddress.value,
    'subject': contactForm.subject.value,
    'message': contactForm.message.value
  })
  .then(
    function(response) {
      console.log('success', response);
    },
    function(error) {
      console.log('failed', error);
    });
  return false;
}
