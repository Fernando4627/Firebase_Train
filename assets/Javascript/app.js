$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB7HFXBCpyxThjmv-qlPDrG2rIeJDKS65M",
        authDomain: "train-schedule-b4880.firebaseapp.com",
        databaseURL: "https://train-schedule-b4880.firebaseio.com",
        projectId: "train-schedule-b4880",
        storageBucket: "train-schedule-b4880.appspot.com",
        messagingSenderId: "578515340396"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var train = "";
    var destination = "";
    var frequency = 0;
    var firstTime = "";
    var minutesAway = "";

    var tfrequency = 0;
    var tfirstTime = 0


    $("#add-train").on("click", function (event) {
        event.preventDefault();
        train = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        firstTime = $("#time-input").val().trim();
        database.ref().push({
            train: train,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
        });
    });
    database.ref().on("child_added", function (childSnapschot) {
        console.log(childSnapschot.val().train);
        console.log(childSnapschot.val().destination);
        console.log(childSnapschot.val().frequency);
        console.log(childSnapschot.val().firstTime);
         tfrequency = childSnapschot.val().frequency;
         tfirstTime = childSnapschot.val().firstTime;

    });
    var firstTimeConverted = moment(tfirstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % tfrequency;
    console.log(tRemainder);
    var minutesAway = tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

});