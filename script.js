function bodyLoad() {
    categoryLoad();
    loadProducts("https://fakestoreapi.com/products");
}

function categoryLoad() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function (res) {
            return res.json();
        })
        .then(function (categories) {
            categories.unshift("all");
            categories.map(function (category) {
                var option = document.createElement("option");
                option.innerHTML = category.toUpperCase();
                option.value = category;
                document.querySelector("#dropdown").appendChild(option);
            })
        })
}

function productChange() {
    var categoryName = document.getElementById("dropdown").value;
    if (categoryName == "all") {
        loadProducts("https://fakestoreapi.com/products");
    }
    else {
        loadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
        console.log(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}

function loadProducts(url) {
    document.querySelector("main").innerHTML="";
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (products) {
            products.map(function (product) {
                var div = document.createElement("div");
                div.className = "card m-3 p-3";
                div.style.width = "220px";
                div.innerHTML =
                    `
            <img height=180 class="card-img-top" src="${product.image}" alt="error" >
<div class="card-body overflow-auto">
    <div  style="height:70px;" class="card-title   overflow-hidden ">
        <h5> ${product.id}. ${product.title}</h5> 
     </div>
     <br>
    <h5 class="card-subtitle">
        Price : ${product.price.toLocaleString("en-in", { style: "currency", currency: "INR" })}
    </h5>
    <div>
         <span class="bi-star-fill badge bg-success"> ${product.rating.rate} </span> [${product.rating.count}]
    </div>
</div>
<button class="btn btn-dark w-100">Buy Now</button>
            `
                document.querySelector("main").appendChild(div);
            })
        })
}