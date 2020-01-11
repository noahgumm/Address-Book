// JavaScript source code
// Author: Noah Gumm
// Date: 10/02/2019

//Address object with constructor
function Address(imageSrc, firstName, lastName, phone, email) {
    this.ImageSource = imageSrc;
    this.Phone = phone;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Display = DisplayInfo;
}

//Function for Address to display its data into the desired div
function DisplayInfo() {
    var infoDiv = document.getElementById("displayDiv");
    infoDiv.innerHTML = "";
    infoDiv.innerHTML += ("<img src='" + this.ImageSource + "'></img></br>");
    infoDiv.innerHTML += ("<p>First Name: " + this.FirstName + "</p></br>");
    infoDiv.innerHTML += ("<p>Last Name: " + this.LastName + "</p></br>");
    infoDiv.innerHTML += ("<p>Phone: " + this.Phone + "</p></br>");
    infoDiv.innerHTML += ("<p>Email: " + this.Email + "</p></br>");
}

//Create some Address objects
var georgeHamilton = new Address("Images/gHam.png", "George","Hamilton", "1-417-123-1234", "gh123456@otc.edu");
var samanthaGray = new Address("Images/sGra.png", "Samantha","Gray", "1-417-123-1234", "sg123456@otc.edu");
var sarahChatsen = new Address("Images/sCha.png", "Sara","Chaten", "1-417-123-1234", "sc123456@otc.edu");
var jadonWasham = new Address("Images/jWas.png", "Jadon", "Washam", "1-417-123-1234", "jw123456@otc.edu");
var timWells = new Address("Images/tWal.png", "Timothy", "Wells", "1-417-123-1234", "tw123456@otc.edu");

//Populate an array with the created Address objects
//Main array for holding Address objects
var addressArray = [georgeHamilton, samanthaGray, sarahChatsen, jadonWasham, timWells];

//Everytime address array changes call this
function UpdateAddressList() {
    //Get the ul address list and clear it
    var addressList = document.getElementById("addressList");
    addressList.innerHTML = "";

    //Loop through current address array and add address's to the ul
    for (var i = 0; i < addressArray.length; i++) {
        addressList.innerHTML += ("<li class='listItem'>" + addressArray[i].FirstName + " " + addressArray[i].LastName + "</li>");
    }

    //Get all elements with the class name listItem (all li's in this case)
    var listElements = document.getElementsByClassName("listItem");
    var tempArray = []; //Init a temporary array

    //Push all the listElments into the temporary array
    //Must convert listElements to an array to use forEach
    for (var i = 0; i < listElements.length; i++) {
        tempArray.push(listElements[i]);
    }

    //Add event listeners to display info onclick of address object
    //Add to every member of the temporary array
    tempArray.forEach(function (element, index) {
        element.addEventListener("click", function () {
            addressArray[index].Display();
            console.debug('displaying' + addressArray[index].FirstName);
        });
    });
}

//When the page first loads populate the ul and info div with data
window.onload = function () {

    var form = document.getElementById("addressForm");
    form.reset();

    addressArray[0].Display();
    UpdateAddressList();
};

//Submit button creates new Address and pushes it to addressArray
document.getElementById("submitButton").addEventListener("click", function () {

    //Store the form input field values as variables
    var firstNameInput = document.getElementById("firstNameInput").value;
    var lastNameInput = document.getElementById("lastNameInput").value;
    var phoneInput = document.getElementById("phoneInput").value;
    var emailInput = document.getElementById("emailInput").value;

    //Check to see if they are empty and if they are tell they user they must be filled
    if (firstNameInput != "" && lastNameInput != "" && emailInput != "") {
        //Create new address, push to array, and update address list
        var newAddress = new Address("Images/default.png", firstNameInput ,lastNameInput, phoneInput, emailInput);
        addressArray.push(newAddress);
        UpdateAddressList();
        form.reset();
    }
    else {
        alert("You must fill out all the fields!");
    }
});
