let title =document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let count=document.getElementById('count')
let total=document.getElementById('total')
let submit=document.getElementById('submit')
let category=document.getElementById('category')

// get total
function getTotal()
{
    if (price.value !=""){
        let result =(+price.value + +taxes.value + +ads.value)-discount.value
        total.innerHTML = result
        total.style.background ='#040'
    }else{
        total.innerHTML=""
        total.style.background ="#a00d02"
    }
}
// create priduct
let dataPro;
if (localStorage.product != null){
    dataPro =JSON.parse(localStorage.product)
}else{
    dataPro =[]
}

submit.onclick = function(){
    let newPro = {
        title :title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value,
    }
    if (newPro.count > 1 ){
        for(let i =0 ; i < newPro.count ; i++){
            dataPro.push(newPro)

        }
    }else{
        dataPro.push(newPro)
    }
// save locolStorage
    localStorage.setItem('product'    ,    JSON.stringify(dataPro))
    clearData()
    showData()
}
// clear inputs
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    count.value ='';
    category.value ='';
    total.innerHTML ='';
}
// read 
function showData(){
    let table =''
    for(let i =0; i<dataPro.length ; i++){
        table +=`<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}/td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick = "deletData(${i})" id="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete =document.getElementById('deleteAll')
    if(dataPro.length > 0){
        btnDelete.innerHTML =`<button onclick="delete1All()">deleteAll(${dataPro.length})</button>
`    }
    else{
        btnDelete.innerHTML =''
    }
}
showData()

// delet

function deletData(i){
    dataPro.splice(i,1)
    localStorage.product =JSON.stringify(dataPro)
    showData()

}
function delete1All(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// count

// eupdate
function updateData(i){
    title.value =dataPro[i].title
    price.value =dataPro[i].price
    taxes.value =dataPro[i].taxes
    ads.value =dataPro[i].ads
    discount.value =dataPro[i].discount
    getTotal()
    count.style.display='none'
    category.value =dataPro[i].category
}

// search
// clean data 