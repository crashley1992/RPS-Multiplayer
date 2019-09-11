# Train Scheduler
This is a tracking tool for trains. The clock it runs on is military time and was converted using Moment.js. All information input is stored in Firebase.

**How it Works**
- Fill out form with informaition it asks for. First train time is documented using military time so all input should reflect this. 
- Frequency is equivlet to how often the train should run. For example, if the train runs every 15 minutes than the frequency is equal to 15.
- The delete checked button will removed table values from html document, however the data will still be in Firebase (known bug, deleted table rows will return upon refreshing of the browser page).
- To submit the filled out form, select submit.
