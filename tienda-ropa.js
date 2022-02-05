const Clickbutton = document.querySelectorAll('.button');
// console.log(Clickbutton);
const tbody = document.querySelector('.tbody')
let cesta = [];


Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCestaItem)
})


function addToCestaItem(e){
    const button = e.target
    // console.log(button);
    const item = button.closest('.card')
    //console.log(item);
    const itemTitle = item.querySelector('.card-title').textContent;
    // console.log(itemTitle);
    const itemPrice = item.querySelector('.precio').textContent;
    //console.log(itemPrice);
    const itemImg = item.querySelector('.card-img-top').src;
    // console.log(itemImg);

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCesta(newItem)
}


function addItemCesta(newItem) {
   const alert = document.querySelector('.alert')

   setTimeout(function(){
       alert.classList.add('hide')
   }, 2000)
   alert.classList.remove('hide')
   
   
    const InputElemento = tbody.getElementsByClassName('input__elemento')
   
    for(let i = 0; i < cesta.length; i++){
      if(cesta[i].title.trim() === newItem.title.trim()) {
          cesta[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CestaTotal()
        //   console.log(cesta);

          return null;
      }
   }
    cesta.push(newItem)
    renderCesta();
}

function renderCesta(){
    tbody.innerHTML = ''
    // console.log(cesta);
    cesta.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCesta')
        const Content = `
        <th scope="row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__precio"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">X</button>
        </td>
        
        `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCesta)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

    })
    CestaTotal();
}



function CestaTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')

    cesta.forEach((item) => {
        // console.log(item.precio);
        // console.log(item.precio.replace("€",""));
         const precio = Number(item.precio.replace("€", ''))
        //  console.log(precio);
         Total = Total + precio*item.cantidad 
    });
    itemCartTotal.innerHTML = `Total: ${Total}€`
    addLocalStorage()
}




function removeItemCesta(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCesta")
    const title = tr.querySelector('.title').textContent;

    for(let i=0; i<cesta.length; i++){

        if(cesta[i].title.trim() === title.trim()){
            cesta.splice(i, 1)
            // console.log("prueba quitar item");
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function(){
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')


    tr.remove()
    CestaTotal();
}



function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCesta")
    const title = tr.querySelector('.title').textContent;

    cesta.forEach(item => {

        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CestaTotal();
        }
    })
    console.log(cesta);
}


function addLocalStorage(){
    localStorage.setItem('cesta', JSON.stringify(cesta))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('cesta'));
    if(storage){
        cesta = storage;
        renderCesta()
    }
}
