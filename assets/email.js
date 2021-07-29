function sendMail(contactForm) {
  emailjs.send('service_2p76xzg', 'bp-form', {
    'from_name': contactForm.fullname.value,
    'from_email': contactForm.emailaddress.value,
    'subject': contactForm.subject.value,
    'message': contactForm.message.value
  })
  .then(
    function(response) {
      alert('Your feedback has been sent');
      clearForm();
      return response;
    },
    function(error) {
      alert("I'm sorry, something went wrong! Please try again");
      return error;
    });
  return false;
}

function clearForm() {
  document.getElementsByTagName('input').value = '';
  document.getElementsByTagName('textarea').value = '';
  document.getElementsByTagName('select').value = '';
  contactModal.style.display = 'none';
}
