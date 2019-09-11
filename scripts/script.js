//link firbase database
var firebaseConfig = {
  apiKey: "AIzaSyAZWNT2tAx_jL2WnPfW0ivdinxsp9HqQUw",
  authDomain: "train-scheduler-329a4.firebaseapp.com",
  databaseURL: "https://train-scheduler-329a4.firebaseio.com",
  projectId: "train-scheduler-329a4",
  storageBucket: "",
  messagingSenderId: "987658774660",
  appId: "1:987658774660:web:1345f708a9cb16ab1dfad1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var database = firebase.database();
//test to make sure firebase is linked up
console.log(firebaseConfig.apiKey);

$("#submit-button").click(function (event) {
  //prevents data from being lost when page is reset
  event.preventDefault();

  // create object values for on form submissions
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#train-time").val().trim();
  var frequency = $("#frequency").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

//puts train time input into military time that can be compared to current time
  var firstTimeTrainOfDay = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeTrainOfDay);

  // Current Time calculation
  var currentTime = moment();
  console.log(moment(currentTime).format("HH:mm"));

  // Difference between the current time and when the first train leaves. 
  var timeDifference = currentTime.diff(moment(firstTimeTrainOfDay), "minutes");
  console.log(moment(timeDifference).format("mm"));

  // Time apart is the remainder so it can provide a whole number of when train time runs to what time it is now. 
  var timeApart = moment(timeDifference % frequency, "minutes").format("mm");
  console.log(timeApart);

  // Takes the train frequency and gives a rounded time of how many minutes away the next expected tain will be
  var minutesAway = frequency - timeApart;
  console.log("minutes till train arrives " + minutesAway);
  console.log(typeof (minutesAway));
  // Minutes away is converted to time on the clock
  var arrival = moment().add(minutesAway, "minutes").format("HH:mm");
  console.log(typeof (arrival));


  //push data to firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    minutesAway: minutesAway,
    arrival: arrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});


//firebase childappend
database.ref().on("child_added", function (childSnapshot) {
  //    console.log(childSnapshot.val());
  $(".table").append(" <tr class='train-row'><td><input type='checkbox' />" +
    childSnapshot.val().trainName + "</td> <td>" +
    childSnapshot.val().destination + "</td> <td>" +
    childSnapshot.val().frequency + "</td> <td>" +
    childSnapshot.val().firstTrainTime + "</td> <td>" +
    childSnapshot.val().minutesAway + "</td> <td>" +
    childSnapshot.val().arrival + "</td> <td> </tr>"
  );
});

//Removes row from page, but not from database and appears again on refresh of page. 
$("#remove-button").click(function () {
  $("input[type=checkbox]:checked").closest("tr").remove();
});