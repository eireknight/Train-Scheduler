var config = {
  apiKey: "AIzaSyC5GgoFvF70qLAkQL7v94QRQWySFsAlk7E",
  authDomain: "class-activity-8030b.firebaseapp.com",
  databaseURL: "https://class-activity-8030b.firebaseio.com",
  storageBucket: "class-activity-8030b.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim(),
      destination = $("#destination-input").val().trim(),
      startTrain = moment($("#start-train-input").val().trim(), "HH:mm").format("HH:mm");
      frequency = $("#frequency-rate-input").val().trim(),
      
      newTrain = {
        name: trainName,
        destination: destination, 
        firstTrain: startTrain,
        frequency: frequency
      };
 
  database.ref().push(newTrain);
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-train-input").val("");
  $("#frequency-rate-input").val("");
}); 

database.ref().on("child_added", function(childSnapShot) {

  var trainName = childSnapShot.val().name,
      destination = childSnapShot.val().destination,
      startTrain = childSnapShot.val().firstTrain,
      frequency = childSnapShot.val().frequency;

  var convertedTime = moment(startTrain, "HH:mm").subtract(1, "years"),
      diffTime = moment().diff(moment(convertedTime), "minutes"),
      timeRemain = diffTime % frequency,
      minAway = frequency - timeRemain,
      nextTrain = moment().add(minAway, "minutes").format("HH:mm");             
     
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
  );

  $("#train-table > tbody").append(newRow);
}); 
