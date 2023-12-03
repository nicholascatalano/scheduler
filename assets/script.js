// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var currentHour = dayjs().format("H");
  console.log(currentHour);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function applyColors() {
    // targeting each time-block object
    $(".time-block").each(function () {
      // referenced mdn article on parseInt in order to parse just the hour number
      var hourCard = parseInt(this.id);
      console.log(hourCard);
      // toggles the classes past, present, or future depending on the current hour vs the hour card id
      $(this).toggleClass("past", hourCard < currentHour);
      $(this).toggleClass("present", hourCard === currentHour);
      $(this).toggleClass("future", hourCard > currentHour);
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function () {
    // in order to get the local storage, we target the same key as we did when we set the local storage
    var key = $(this).attr("id");
    // var to get the local storage, using the key (id of the current time-block)
    var value = localStorage.getItem(key);
    // to keep the text on the page, we target the children of the current object with a class of "description", and pull just the value that is entered
    $(this).children(".description").val(value);
  });

  // TODO: Add code to display the current date in the header of the page.

  // displays current date with day of the week in header
  function headerDate() {
    var dateEl = $("#currentDay");
    var currentDate = dayjs().format("dddd, MMMM D");
    dateEl.text(currentDate);
  }

  headerDate();
  applyColors();
});
