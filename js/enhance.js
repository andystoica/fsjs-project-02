/**
 * General variables
 */
var contacts = $(".student-item.cf"); // Keeps all the contact elements
var allContacts = []; // Keeps the indexes of all contact elements
for (var i = 0; i < contacts.length; i++) {
  allContacts.push(i);
}
var filteredContacts = allContacts; // Keeps the indexes of elements on display
var itemsPerPage = 10;
var numberOfPages = Math.ceil(filteredContacts.length / itemsPerPage);




/**
 * HTML Elements
 */
// Search box element to be inserted at the top of the page
var HTMLSearchBox   = '<div class="student-search">';
    HTMLSearchBox  += '  <input placeholder="Search for students...">';
    HTMLSearchBox  += '  <button>Search</button>';
    HTMLSearchBox  += '</div>';

// Empty navigation element to be inserted at the bottom of the page
var HTMLPagination  = '<div class="pagination">';
    HTMLPagination += '   <ul></ul>';
    HTMLPagination += '</div>';




/**
 * Display range of contact in list
 */
function displayContactRange(rangeFrom, rangeTo) {
  // Hide all contacts on the page
  contacts.hide();
  // Iterate through the range of contacts specified
  // and show those contacts
  if (filteredContacts.length > 0) {
    for (var i = rangeFrom - 1; i < rangeTo; i++) {
      $(contacts[filteredContacts[i]]).finish().fadeIn();
    }
  }
}




/**
 * Display contacts on a specific page
 */
function displayContactPage(pageNumber) {
  // If the page number is valid (1 or more), calculate range of items for that
  // page and display them on screen.
  if (pageNumber > 0 && pageNumber <= numberOfPages) {
    var rangeFrom = (pageNumber - 1) * itemsPerPage + 1;
    var rangeTo = rangeFrom + itemsPerPage - 1;
    displayContactRange(rangeFrom, rangeTo);
    // Change the current page active state
    $('.pagination a').removeClass('active');
    $('.pagination a:contains(' + pageNumber + ')').addClass('active');
  // If page number is zero, there are no items to show
  // Hide everything and display a message to user.
  } else {
   contacts.hide();
   $('<h2 class="error">No matching records found.</h2>').insertAfter('.page-header');
  }
}




/**
 * Paginate content
 */
function paginateContacts() {
  // Execute only of the user is not typing in the SeachBox
  // if (!inProgress) {
  //   inProgress = true;
    // Calculate the number of pages required
    numberOfPages = Math.ceil(filteredContacts.length / itemsPerPage);
    var navList = $(".pagination ul");
    navList.empty();

    // If more than one page, then render the pagination controls
    if (numberOfPages > 1) {
      for (var i = 1; i <= numberOfPages; i++) {
        navList.append('<li><a href="#">' + i + '</a></li> ');
      }
      $('.pagination').finish().fadeIn();
      // Bind click events to the anchor element of every new button
      navList.find('a').click(function(e){
        e.preventDefault();
        displayContactPage($(this).text());
      });
    } else {
      $('.pagination').hide();
    }
    displayContactPage(1);
  //   inProgress = false;
  // }
}




/**
 * Filter contacts by keyword
 */
function filterContacts(keyword) {
  // Remove any errors
    $('.error').remove();
    // If the keyword provided is not empty
    if (keyword) {
      // Start with an empty list
      filteredContacts = [];
      var filter = keyword.toLowerCase();
      // Iterate through all contacts and add the indexes of those
      // that match the criteria to the filteredContacts list
      for (var i = 0; i < contacts.length; i++) {
        var name = $(contacts[i]).find('h3').text().toLowerCase();
        var email = $(contacts[i]).find('.email').text().toLowerCase();
        if ((name.indexOf(filter) !== -1) || (email.indexOf(filter) !== -1)) {
          filteredContacts.push(i);
        }
      }
    } else {
      // If the keyword provided was empty, select all contacts
      filteredContacts = allContacts;
    }
}




/**
 * Main application
 */

// Append searchbox and pagination elements
$(".page-header.cf").append(HTMLSearchBox);
$(".page").append(HTMLPagination);

// Paginate content
paginateContacts();




/**
 * Event Handlers
 */
// When Search button is clicked
// filter the contacts and paginate them
$('.student-search button').click(function(){
 filterContacts($('.student-search input').val());
 paginateContacts();
});

// When user types inside the search box
// filter the content as the user types
$('.student-search input').keyup(function(){
  filterContacts($(this).val());
  paginateContacts();
});

// When the search box is gaining focus clear the search string
$('.student-search input').focusin(function(){
  $(this).val('');
});
