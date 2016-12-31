//success msg yapılamadı o yapılacak.
var message ;
var header;
var body ;
$(document).ready(function(){
  message = $('#message');
  header = $('#msgHeader');
  body = $('#msgBody');
  message.hide();
});
function closeMessageBox(){
  message.hide();
}
function showErrorMessage(headerText,bodyText){
  message.addClass('error');
  message.show();
  header.text(headerText);
  body.text(bodyText);
}
function showSuccessMessage(headerText,bodyText){
  message.removeClass('error');
  message.addClass('success');
  message.show();
  header.text(headerText);
  body.text(bodyText);
}
