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

$("#submit-button").click(function(event){
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

//calculates next esstimated time depending on the frequency
var firstTimeTrainOfDay = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeTrainOfDay);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // Difference between the times
    var timeDifference = currentTime.diff(moment(firstTimeTrainOfDay), "minutes");
    console.log(moment(timeDifference).format("mm"));

    // Time apart (remainder)
    var timeApart = moment(timeDifference % frequency, "minutes").format("mm");
    console.log(timeApart);

    // Minute Until Train
    var minutesAway = frequency - timeApart;
    console.log("minutes till train arrives "  + minutesAway);

    // Next Train
    var arrival = moment().add(minutesAway, "minutes");
    console.log("arrival " + moment(arrival).format("HH:mm"));



//push data to firebase
database.ref().push({
trainName: trainName,
destination: destination,
firstTrainTime: firstTrainTime,
frequency: frequency,
// minutesAway: minutesAway,
// arrival: arrival,
dateAdded: firebase.database.ServerValue.TIMESTAMP
}); 





});


 //firebase childappend
 database.ref().on("child_added", function(childSnapshot){
     //    console.log(childSnapshot.val());
     $(".table").append("<tr> <td>"
     + childSnapshot.val().trainName + "</td> <td>"
     + childSnapshot.val().destination + "</td> <td>"
     + childSnapshot.val().firstTrainTime + "</td> <td>" 
    //  + childSnapshot.val().minutesAway + "</td> <td>" 
    //  + childSnapshot.val().arrival + "</td> <td> </tr>" 

     );
   });
    

