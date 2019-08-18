## Reuse Directory

A customizable directory of locations that reuse, recycle, or repair consumer goods.

This app uses Google Sheet as data storage and can be served as a static website through services like Github Pages.

### Set Up

Before starting development or serving your own directory, you need to set up a few things on Google API Console and Google Sheet.

#### Google API Console:
You can find help for using Google API Console here: https://support.google.com/googleapi/

- Open [Google API Console](https://console.developers.google.com/)
- Create a new project
- Enable Google Sheets API
- Go to `Credentials -> Create credentials -> API key` and generate a new key
- Select your new API key to see its details and adjust the followings:
    - Restrict the application to HTTP referrers (optional)
    - Restrict the website to your development and production domains
    - Restrict API to Google Sheet (optional)

#### Google Sheet

Create a new sheet from this template: https://docs.google.com/spreadsheets/d/16pxx94InDamgnUC4SxUcWR1Am2RNbSXjgsLWek8wN9w.
The provided template has some sample entries in it. You can delete them or keep them for test purposes during development.

The sheet you create must be owned by the application you created in Google API Console. See their documentation on how you can do so.

#### Configure your local environment

Create a `config.js` file in `src` based on `src/config-example.json`.
Fill in the following fields with the relevant data from previous steps:

- `google_api_key <string>`
- `google_sheet_id <string>`

If you would like to customize the template and add or modify more columns, you need to update `google_sheet_schema` and modify the code wherever it is relevant.

### Local development

Install the dependencies from `package.json` (`npm install`) and run the dev server (`npm start`).

If you have restricted your application to specific domains on Google API Console, then you need to access the dev server on one of the whitelisted URLs.

For example, you can add `reuse-direcoty.org` to your `hosts` file on Linux and include it in your domains list on Google API Console.
If you do so, you also need to specify this domain in `ALLOWED_HOSTS` environment variable like this:

`ALLOWED_HOSTS=["reuse-directory.org"] npm start`
 
 or
 
 ```
 export ALLOWED_HOSTS=["reuse-directory.org"]
 npm start 
 ```

### Deploy

Make sure your `config.json` is up-to-date and then run `npm run build`, which creates a bundle in the `build` folder.

You can serve that folder on any file server, e.g. Github Pages and AWS S3.

If you would like to use Github Pages, run `npm run deploy`, which uses `gh-pages` library to push the `build` folder to Github.

Read more on Github Pages and other relevant issues like using a custom domain here: https://pages.github.com/ 


### Admin Page

ReUse Directory has a separate admin page companion. This is a user-friendly interface for updating the entries in Google Sheet.

This code must be served separately. You can find its code and read about its setup instruction here: https://github.com/waste-prevention-action-team/reuse-directory-admin 


### Contributors:

- [Kaveh Karimi (ka7eh)](https://github.com/ka7eh)

### Acknowledgements:

This project was conducted by [Corvallis Sustainability Coalition](https://sustainablecorvallis.org/) and funded by [Oregon Department of Environmental Quality](https://www.oregon.gov/DEQ)
