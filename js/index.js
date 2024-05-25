var siteName = document.getElementById('bookmarkName');
var siteURL = document.getElementById('bookmarkURL');
var SubmiteBtn = document.getElementById('SubmiteBtn');
var tablehaed = document.getElementById('tablehaed');
var deleteBtns;
var visitBtns;
var boxMini = document.querySelector('.box-verfiy');
var closeBtn = document.getElementById('closeBtn');
var bookmarks = [];





///>>===================///////

if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarkslist"));

    for (var  i = 0; i  < bookmarks.length; i++) {

        displayBookmark(i);
    }
 
}

///>>===================///////


function displayBookmark(indexOfwebsite){
    var userURL = bookmarks[indexOfwebsite].siteURL;
    var httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)){
        validURL  =  userURL;
        fixedURL = validURL.split("").splice(validURL.match(httpsRegex)[0].length).join("");

    }
    else {
        var fixedURL =  userURL ;
        validURL = `https://${userURL}`;
    }

    var newbookmark = `
    <tr>
    <td>${indexOfwebsite + 1}</td>
    <td>${bookmarks[indexOfwebsite].siteName}</td>
    <td>
    <button class="btn btn-visit" id="visit" data-index="${indexOfwebsite}"> <i class="fa-solid fa-eye pe-2"></i>Visit</button>
    </td>
    <td>
    <button class="btn btn-delete g-5 pe-2" data-index="${indexOfwebsite}"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
    </td>
</tr>
`;

    tablehaed.innerHTML += newbookmark;

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
      for (var j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function (e) {
          deleteBookmark(e);
        });
      }
    }

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
      for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
          visitWebsite(e);
        });
      }
    }
  }







///>>===================///////

function clearInput(){
    siteName.value = "";
    siteURL.value = "";
}


///>>===================///////

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }
  
///>>===================///////

SubmiteBtn.addEventListener("click", function (){

    if (
        siteName.classList.contains("is-valid")&&
        siteURL.classList.contains("is-valid")
    ) {
        var bookmark = {
            siteName: capitalize(siteName.value),
            siteURL:siteURL.value,
    
        };
    
        bookmarks.push(bookmark);
        localStorage.setItem("bookmark", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length -1);
        clearInput();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
   
    } else{
    boxModal.classList.remove("d-none");
    }
});

///>>===================///////

function deleteBookmark(e){

    tablehaed.innerHTML = "";
    var deleteIndex = e.target.dataset.index;
    bookmarks.splice(deleteIndex, 1);
    for (var y = 0; y < bookmarks.length; y++){
        displayBookmark(y);
    }
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
}


///>>===================///////


function visitWebsite(e){
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)){
        open(bookmarks[websiteIndex].siteURL)
    }else {
        open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}


///>>===================///////


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}



///>>===================///////

function closeModal() {
    boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);


///>>===================///////

document.addEventListener("click", function (e){
    if (e.key == "Escape") {
        closeModal ();
    }
});



///>>===================///////

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-verfiy")) {
        closeModal ();
    }
}

    )