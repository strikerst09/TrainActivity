// Initialize Firebase
var config = {
    apiKey: "AIzaSyCdzqiMBrfhyiDrz-hKze-ghifk1thS2Fk",
    authDomain: "rps-multiplayer-53045.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-53045.firebaseio.com",
    projectId: "rps-multiplayer-53045",
    storageBucket: "rps-multiplayer-53045.appspot.com",
    messagingSenderId: "841864782104"
};
firebase.initializeApp(config);
var logTrain = firebase.database();

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#tDest").val().trim();
    time = $("#tTime").val().trim();
    frequency = $("#frequency").val().trim();

    firstTime = moment(time, "hh:mm").subtract(1, 
        "years");
    currTime = moment();
    diffTime = moment().diff(moment(firstTime), "minutes");
    tRemain = diffTime % frequency;
    minTillTrain = (frequency - tRemain);
    nextTrain = moment().add(minTillTrain, "minutes").format("hh:mm A");
    console.log(nextTrain);
    nextTrainChange = moment(nextTrain).format("hh:mm");

    logTrain.ref().push({
        name: name,
        destination: destination,
        firstTime: time,
        frequency: frequency,
        minTillTrain: minTillTrain,
        nextArrival: nextTrain,
    })

    $("#trainName").val("");
    $("#tDest").val("");
    $("#tTime").val("");
    $("#frequency").val("");
});

logTrain.ref().on("child_added", function (snapshot) {
    var tRow = $("<tr>");
    var tName = $("<td>").text(snapshot.val().name);
    var tDest = $("<td>").text(snapshot.val().destination);
    var tTime = $("<td>").text(snapshot.val().nextArrival);
    var tFreq = $("<td>").text(snapshot.val().frequency);
    var mTime = $("<td>").text(snapshot.val().minTillTrain);

    //combine elements fool
    tRow.append(tName, tDest, tTime, tFreq, mTime);

    $("#tSched").append(tRow);
});

// Need to figure out how to calculate time; need to take input which is FIRST TRAIN TIME, and calculate the frequency of the train. the NEXT ARRIVAL column shouldnt be a replica of the FTT but the calculation using FREQUENCY; MINUTES AWAY should display time left; MA is currently displaying the current time;