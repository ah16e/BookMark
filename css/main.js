

//

var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var productImageInput = document.getElementById('productImage');
var rowData = document.getElementById('rowData');
var searchTerm = document.getElementById("searchTerm");
var Addbtn = document.getElementById("Addbtn");
var Updatebtn = document.getElementById("Updatebtn");
var alertForm = document.getElementById("alertForm");


var productList ;

if (localStorage.getItem('productList') != null) {

    productList = JSON.parse(localStorage.getItem('productList'));

    diplayProduct(productList);
}

else {
    productList  = [];
}

function AddProduct(){

  
    var product={
        name: productNameInput.value,
        price: productPriceInput.value, 
        category: productCategoryInput.value,
        desc: productDescInput.value,
        images : `images/products/${productImageInput.files[0]?.name}`
    }

    if (productNameInput.classList.contains('is-valid')&&
        productPriceInput.classList.contains('is-valid')&&
        productCategoryInput.classList.contains('is-valid')&&
        productDescInput.classList.contains('is-valid')

        )

         {

                        
         productList.push(product);
         console.log(productList);
         localStorage.setItem('productList' , JSON.stringify(productList));
         diplayProduct(productList);
    } 
    else {
        alertForm.classList.remove('d-none')
    }

}

function diplayProduct (List){
    var cartoona = ``;
    for(var i =0 ; i<List.length ; i++){
        cartoona+=`   <div class="col-lg-3 col-sm-6">
        <div class="card">
        <img src="${List[i].images}" class="card-img-top" alt="">
        <div class="card-body">
        <h2 class="h3">${List[i].name}</h2>
        <p class="text-secondary">${List[i].desc}</p>
        <h3 class="h6">Price : <span>${List[i].price}</span></h3>   
        <h3 class="h6">Category : <span>${List[i].category}</span></h3>
        <button onclick="deleteproduct(${i})" class="btn btn-danger w-100">Delete</button>
        <button onclick="setFormForUpdate(${i})" class="btn btn-info mt-2 w-100">Update</button>
        </div>    
        </div>
    </div>`
    }

    rowData.innerHTML = cartoona;

}

function deleteproduct(index){
    
    productList.splice(index , 1);
    localStorage.setItem('productList' , JSON.stringify(productList));
    diplayProduct(productList);
    
}

function search(){

    var searchResults = [];
    for (var i = 0; i < productList.length; i++){
        if(productList[i].name.toLowerCase().includes(searchTerm.value.toLowerCase()) == true){
            searchResults.push(productList[i]);
        }
    }

    diplayProduct(searchResults);

}

function setFormForUpdate(updateIndex){

    Addbtn.classList.add('d-none')
    Updatebtn.classList.remove('d-none')

    productNameInput.value = productList[updateIndex].name;
    productPriceInput.value = productList[updateIndex].price;
    productCategoryInput.value = productList[updateIndex].Category;
    productDescInput.value = productList[updateIndex].desc;
}


function validateInputs(element){

    var  regex = {
        productName : /^[A-Z]\w{3,10}\s?\w{0,5}$/,
        productPrice : /^[1-9][0-9][0-9][0-9][0-9]?$/,
        productCategory : /^(Mobile|Tv|Tap|Laptob)$/,
        productDesc :/^.{4,300}$/,
    };

    
    if (regex[element.id].test(element.value)) {
       
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.add('d-none');

    }
    else{

        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.remove('d-none');
    }

}
