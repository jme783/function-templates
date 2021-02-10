# COVID-19 Vaccine Standby List

This Quick Deploy app is designed for public health agencies to create a COVID-19 vaccine eligibility standby list for their city or state. Residents send an SMS to a pre-configured phone number, and are asked a series of demographic questions informed by the CDC's vaccine rollout guidelines powered by a Twilio Studio Flow. Resident responses to the SMS chatbot are captured in a Google Sheet. 

This data is meant to help ensure vaccinations are administered as quickly as possible as supply becomes available. With this template, your agency can create a standardized list of eligible vaccine recipients. In exchange for sharing this information, residents are notified when it is their turn to receive the vaccine.

## Pre-requisites

### Google Sheets Configuration
This app stores the data sent by the resident in response to the SMS chatbot in Google Sheets to demonstrate a working persistance layer. Follow the steps below to grab all the Google Sheets identifiers needed to be set as environment variables for this app:

1. Make a copy of <a href="https://docs.google.com/spreadsheets/d/1gTTPEe2eWuDr5aOzEP1DEK2tlrC4XUyoM5AEDrgYhoA/edit#gid=0" target="_blank">this Google Sheet</a> by clicking **File > Make a Copy** as shown below:

![Google Sheets Copy](https://twilio-cms-prod.s3.amazonaws.com/images/gsheets-make-a-copy.original.png)

2. Create a **Google Service Account**
-  <a href="https://console.developers.google.com/projectcreate" target="_blank">Create new Google APIs Project</a> if you don't already have one
- Back on the <a href="" target="_blank">Google Developers Console dashboard</a>, make sure your project is selected in the navigation as shown below:
![Google APIs Project Selector](https://twilio-cms-prod.s3.amazonaws.com/images/google-apis-project-selector.original.png)
- Enable the Sheets API for your Project
  - Click on the **Enable APIs and Services** link
  - Search for Google Sheets API and click on it from the results
  - Click on the **Enable** button as shown below:

![](https://twilio-cms-prod.s3.amazonaws.com/images/google-sheets-api-enable.original.png)

- One enabled, click on the **Create Credentials** button from the <a href="https://console.developers.google.com/apis/api/sheets.googleapis.com/overview" target="_blank">Google Sheets API overview</a> page (you should be redirected here automatically)

- Fill out Step 1 as shown below:
  - Select the **Google Sheets API**
  - Select **Web Server**
  - Select **Application Data**
  - Select **No** when asked about using App Engine or Compute Engine
  
![](https://twilio-cms-prod.s3.amazonaws.com/images/google-sheets-api-credentials-1.original.png)

- Fill out Step 2 as shown below:
  - Choose a **service account name**
  - Set the Role to **Project > Editor**
  - Set key type to **JSON**

![](https://twilio-cms-prod.s3.amazonaws.com/images/google-sheets-credentials-2.original.png)

- Click **Continue** to download the JSON file that contains the credentials for the service account

3. You are now ready to grab all the Google Sheets identifiers required as environment variables:

- From the credentials JSON file you just downloaded, copy the value of `client_email` and set it as the value of `GOOGLE_SERVICE_ACCOUNT_EMAIL` in the `.env` file.
- From the same object in the JSON crednetials file, copy the value of `private_key` and set it as the value of `GOOGLE_PRIVATE_KEY` in the `.env` file
- Go to your copy of the COVID-19 Vaccine Standby List Google Sheet, and grab the <a href="https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id" target="_blank">sheet ID</a> from the URL. Set this ID as the value of `GOOGLE_SHEET_ID` in the `.env` file

### Environment variables

This project requires some environment variables to be set. To keep your tokens and secrets secure, make sure to not commit the `.env` file in git. When setting up the project with `twilio serverless:init ...` the Twilio CLI will create a `.gitignore` file that excludes `.env` from the version history.

In your `.env` file, set the following values:

| Variable                       | Description | Required |
| :--------------------          | :----------------------------------------------------- | :-- |
| `MY_PHONE_NUMBER`              | Your Twilio phone number for sending and receiving SMS | Yes |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google Service Account email                           | Yes |
| `GOOGLE_PRIVATE_KEY`           |  Private key of Google Service Account                 | Yes |
| `GOOGLE_SHEET_ID`              | ID of the Google Sheet from its URL                    | Yes |

## Create a new project with the template

1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)
2. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)

```shell
twilio plugins:install @twilio-labs/plugin-serverless
```

3. Initiate a new project

```
twilio serverless:init example --template=vaccine-standby-list && cd example
```

4. Start the server with the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:start
```

5. Open the web page at https://localhost:3000/index.html and follow the steps to finish the configuration of your app. You will be prompted to deploy the Studio Flow that contains the contents of the SMS bot to your Twilio account. This studio flow will automatically be associated with the phone number set as the `MY_PHONE_NUMBER` environment variable

6. Once the Studio Flow is deployed, you can text your Twilio phone number to begin testing the app. Your responses will be automatically stored in Airtable and displayed on this web page with each successful completion of the chat bot interaction

ℹ️ Check the developer console and terminal for any errors, make sure you've set your environment variables.

### Studio Flow
This app includes a [Twilio Studio](https://www.twilio.com/studio) Flow that orchestrates the SMS chatbot. You will be prompted to deploy the Studio flow as part of the steps included in `index.html`. Once deployed, you can view your flow [here](https://www.twilio.com/console/studio/dashboard) — it will be named "Vaccine Standby Intake".

The default Flow contains the following sequence of interactions:
1. Welcome Message & Opt-In
2. Full Name
3. Age
4. Zip Code
5. Are you an essential worker?
6. Do you work from home?
7. Do you live in a long term care facility?
8. Do you live in a congregate setting?
9. Do you have an underlying health condition increasing risk of severe COVID infection?
10. Notification preference (SMS or Email)
  --> If user chooses email, they will be asked for their email address
11. Language Preference
12. Confirmation

You are encouraged to edit the Studio Flow in accordance with your organization's unique needs.

## Deploying

Deploy your functions and assets with either of the following commands. Note: you must run these commands from inside your project folder. [More details in the docs.](https://www.twilio.com/docs/labs/serverless-toolkit)

With the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:deploy
```
