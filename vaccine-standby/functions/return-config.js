exports.handler = function(context, event, callback) {
  let google_sheet_id = context.GOOGLE_SHEET_ID;
  let phone_number = context.TWILIO_PHONE_NUMBER;
  let response = new Twilio.Response();
  response.setStatusCode(200);
  response.appendHeader('Content-Type', 'application/json');
  response.setBody({'google_sheet_id': google_sheet_id, 'phone_number': phone_number});
  callback(null, response);
};
