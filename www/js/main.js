// JavaScript Document
var pages = [],
    links = [];
var numLinks = 0;
var numPages = 0;
var pageTime = 800; //same as CSS transition

//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);

document.addEventListener("DOMContentLoaded", function () {
    //device ready listener
    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    links = document.querySelectorAll('[data-role="pagelink"]');
    numLinks = links.length;
    for (var i = 0; i < numLinks; i++) {
        links[i].addEventListener("click", handleNav, false);
    }
    //add the listener for pageshow to each page
    for (var p = 0; p < numPages; p++) {
        pages[p].addEventListener("pageShow", handlePageShow, false);
    }
    loadPage(null);
});

function handleNav(ev) {
    ev.preventDefault();
    var href = ev.target.href;
    var parts = href.split("#");
    loadPage(parts[1]);
    return false;
}

function handlePageShow(ev) {
    ev.target.className = "active";
    
if (ev.currentTarget.id == "map"){
    startmap();
        
}else if(ev.currentTarget.id == "contacts"){
    navigator.contcts.find()
}
        
    
    // find all contacts with 'Bob' in any name field
var options      = new ContactFindOptions();
options.filter   = "";
options.multiple = true;
var fields       = ["displayName", "name"];
navigator.contacts.find(fields, sucessFunc, errFunc, options);



}


///////FASTCLICK//////

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//////////////////////

function loadPage(url) {
    if (url == null) {
        //home page first call
        pages[0].className = 'active';
        history.replaceState(null, null, "#home");
    } else {
        for (var i = 0; i < numPages; i++) {
            pages[i].className = "hidden";
            //get rid of all the hidden classes
            //but make them display block to enable anim.
            if (pages[i].id == url) {
                pages[i].className = "show";
                //add active to the proper page
                history.pushState(null, null, "#" + url);
                setTimeout(addDispatch, 50, i);
            }
        }
        //set the activetab class on the nav menu
        for (var t = 0; t < numLinks; t++) {
            links[t].className = "";
            if (links[t].href == location.href) {
                links[t].className = "activetab";
            }
        }
    }
}

function addDispatch(num) {
    pages[num].dispatchEvent(pageshow);
    //num is the value i from the setTimeout call
    //using the value here is creating a closure
}




///////////////////////////////////////GEOLOCATION//////////////////////////////////////////////////


    function startmap(){
    //document.addEventListener("DOMContentLoaded", function () {

    if (navigator.geolocation) {
        //code goes here to find position
        var params = {
            enableHighAccuracy: false,
            timeout: 3600,
            maximumAge: 60000
        };
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);

        //to continually check the position (in case it changes) use
        // navigator.geolocation.watchPosition( reportPosition, gpsError, params)
    } else {
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
    }
};




function reportPosition(position) {
    //        html += '<p>' + 'Currently at Algonquin College, we are experiencing some' + '</p>';

    var output = document.querySelector("#output");
    output.innerHTML = "";
    output.innerHTML += "<strong>Latitude:</strong> " + position.coords.latitude + "&deg;<br/>" + "<strong>Longitude:</strong> " + position.coords.longitude + "&deg;<br/>" + "<strong>Accuracy:</strong> " + position.coords.accuracy + "m<br/>"

    var canvs = document.createElement("canvas");
    document.getElementById("output").appendChild(canvs);
    canvs.id = 'myCanvas';
    var canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    var context = canvas.getContext('2d');
    var img = document.createElement("img");

    //Canvas sizing
    canvas.width = 400;
    canvas.height = 400;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=15&size=400x400&maptype=roadmap&markers=color:red|label:A|" + position.coords.latitude + ',' + position.coords.longitude;


}

function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}


///////////////////////////////////////CONTACTS//////////////////////////////////////////////////




function sucessFunc(contacts) {
//    alert('Found ' + contacts.length + ' contacts.');
    
    var check = Math.floor(Math.random() * contacts.length);
    console.log(check);
    var randomContact = document.getElementById("thecontact")
    
    randomContact.innerHTML = "Name: " + contacts[check].name.formatted + "<br>" + "Phone: " + contacts[check].phoneNumbers[0].value;
};

function errFunc(contactError) {
    alert('onError!');
};























//window.onload = function () {
//    document.addEventListener("deviceready", onDeviceReady, false);
//}
//
//function onDeviceReady()
//
//{
//    document.getElementById('btnSave').addEventListener('click', saveContact, false);
//}
//
//function saveContact() {
//    var fullName = document.getElementById("first").value + " " + document.getElementById("last").value;
//    var note = document.getElementById("note").value;
//
//    var theContact = navigator.contacts.create({
//        "displayName": fullName
//    });
//    theContact.note = note;
//
//    theContact.save();
//
//}



                
                
                
                
                
                
                
                
                
