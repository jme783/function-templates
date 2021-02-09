exports.handler = async function(context, event, callback) {
    /*var Airtable = require('airtable');
    var base = new Airtable({apiKey: context.AIRTABLE_API_KEY}).base(context.AIRTABLE_BASE_ID);
    
    base('Registered Residents').create([
        {
            "fields": {
                "Name": event.name,
                "Phone Number": event.phone,
                "Email": event.email,
                "Age": event.age,
                "Essential Worker": event.essential_worker,
                "Zip Code": event.zip_code,
                "Work From Home": event.work_from_home,
                "Live in Long Term Care Facility": event.long_term_care,
                "Live in Congregate Setting": event.congregate_setting,
                "Underlying Health Condition": event.underlying_health_condition,
                "Notification Preference": event.notification_preference,
                "Language Preference": event.language_preference,
            }
        }
    ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }

        callback(null, 'success');
    });*/

    // Google Sheets version
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const sheet = new GoogleSpreadsheet(context.GOOGLE_SHEET_ID);

    await sheet.useServiceAccountAuth({
        client_email: context.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: context.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    try {
        await sheet.addRow({
            "Name": event.name,
            "Phone Number": event.phone,
            "Email": event.email,
            "Age": event.age,
            "Essential Worker": event.essential_worker,
            "Zip Code": event.zip_code,
            "Work From Home": event.work_from_home,
            "Live in Long Term Care Facility": event.long_term_care,
            "Live in Congregate Setting": event.congregate_setting,
            "Underlying Health Condition": event.underlying_health_condition,
            "Notification Preference": event.notification_preference,
            "Language Preference": event.language_preference,
        });
        callback(null, 'success');    
    } catch(err) {
        callback('Error writing to Google Sheets', null);
    }

};
