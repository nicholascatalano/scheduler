$(function () {
  var currentHour = dayjs().format("H");
  console.log(currentHour);

  // when user enters text and clicks save button, value is stored in local storage
  $(".saveBtn").on("click", function () {
    // variable to store the id of the parent of (this/button) using its id of the specific hour
    var parentId = $(this).parent().attr("id");
    console.log(parentId);
    // variable to store the value of what is entered, by targeting the current object (this), then moving to its sibling with a class of "description"
    var childId = $(this).siblings(".description").val();
    console.log(childId);
    localStorage.setItem(parentId, childId);
  });

  function applyColors() {
    // targeting each time-block object
    $(".time-block").each(function () {
      // variable to parse just the number in the id of the current object, but then removing the hyphen before doing so, then targeting the 1 index in the produced array
      var hourCard = parseInt(this.id.split("-")[1]);
      console.log(hourCard);
      // toggles the classes past, present, or future depending on the current hour vs the hour card id
      $(this).toggleClass("past", hourCard < currentHour);
      $(this).toggleClass("present", hourCard == currentHour);
      $(this).toggleClass("future", hourCard > currentHour);
    });
  }

  $(".time-block").each(function () {
    // in order to get the local storage, we target the same key as we did when we set the local storage
    var key = $(this).attr("id");
    // var to get the local storage, using the key (id of the current time-block)
    var value = localStorage.getItem(key);
    // to keep the text on the page, we target the children of the current object with a class of "description", and pull just the value that is entered
    $(this).children(".description").val(value);
  });

  // displays current date with day of the week in header
  function headerDate() {
    var dateEl = $("#currentDay");
    var currentDate = dayjs().format("dddd, MMMM D");
    dateEl.text(currentDate);
  }

  headerDate();
  applyColors();
});
