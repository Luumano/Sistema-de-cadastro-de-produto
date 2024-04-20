document.addEventListener("DOMContentLoaded", function(){
    const productList = document.getElementById("lista-produto");
    const productForm = document.getElementById("form-produtos");

    let products = [];
    let editIndex = null;

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            
            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");

            const namePara = document.createElement("p");
            namePara.textContent = `Nome: ${product.name}`;
            productInfo.appendChild(namePara);

            const descricaoPara = document.createElement("p");
            descricaoPara.textContent = `Descrição: ${product.descricao}`;
            productInfo.appendChild(descricaoPara);

            const marcaPara = document.createElement("p");
            marcaPara.textContent = `Marca do Produto: ${product.marca}`;
            productInfo.appendChild(marcaPara);

            const idiomaPara = document.createElement("p");
            idiomaPara.textContent = `Nome do Fabricante: ${product.idioma}`;
            productInfo.appendChild(idiomaPara);

            const pesoPara = document.createElement("p");
            pesoPara.textContent = `Peso Bruto: ${product.peso} kg`;
            productInfo.appendChild(pesoPara);

            const pricePara = document.createElement("p");
            pricePara.textContent = `Preço: R$ ${product.price}`;
            productInfo.appendChild(pricePara);
        
            const productInfoContainer = document.createElement("div");
            productInfoContainer.classList.add("product-info-container");
            productInfoContainer.appendChild(productInfo);
            productItem.appendChild(productInfoContainer);
            
            const editBtn = document.createElement("button");
            editBtn.classList.add("edite-btn");
            editBtn.textContent = "Editar";
            editBtn.setAttribute("data-index", index);
            productItem.appendChild(editBtn);
            
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Excluir";
            deleteBtn.setAttribute("data-index", index);
            productItem.appendChild(deleteBtn);

            productList.appendChild(productItem);
        
            editBtn.addEventListener("click", function(){
                editProduct(index);
            });
        
        });
    }

    function addProduct(name, descricao, marca , idioma, peso, price){
        const newProduct = {
            name: name,
            descricao: descricao,
            marca: marca,
            idioma: idioma,
            peso: parseFloat(peso),
            price: parseFloat(price)
        };

        if(editIndex !== null){
            products[editIndex] = newProduct;
            editIndex = null;
        } else {
            products.push(newProduct);
        }

        renderProducts();
        productForm.reset();
    }

    function editProduct(index){
        const product = products[index];
        document.getElementById("name").value = product.name;
        document.getElementById("descricao").value = product.descricao;
        document.getElementById("marca").value = product.marca;
        document.getElementById("idioma").value = product.idioma;
        document.getElementById("peso").value = product.peso;
        document.getElementById("price").value = product.price;

        editIndex = index;
    }
    
    function deleteProduct(index){
        products.splice(index, 1);
        renderProducts();
    }

    productForm.addEventListener("submit", function(event){
        event.preventDefault();
        const name = document.getElementById("name").value;
        const descricao = document.getElementById("descricao").value;
        const marca = document.getElementById("marca").value;
        const idioma = document.getElementById("idioma").value;
        const peso = document.getElementById("peso").value;
        const price =  document.getElementById("price").value;
        addProduct(name, descricao, marca, idioma, peso, price);
    });

    productList.addEventListener("click", function(event){
        if (event.target.classList.contains("delete-btn")){
            const index = event.target.getAttribute("data-index");
            deleteProduct(index);
        }
    });
});