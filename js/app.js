// show cart
(function(){ // immediately invoked function expression syntax = (function(){})();
    //cart button
    const cartInfo = document.getElementById('cart-info');
    //drop down cart
    const cart = document.getElementById('cart');

    //show cart dropdown once the cart button is clicked
    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    });
})();/*second parentheses invoke immediately invoked function expression*/

// add items to cart
(function(){
    //get access to store item icon
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function(btn){
        //add functionality when clicking 'add to cart' icon
        btn.addEventListener('click', function(event){
            // console.log(event.target);
            if(event.target.parentElement.classList.contains("store-item-icon")){
                // console.log(event.target.parentElement.previousElementSibling.src);
                let fullPath = event.target.parentElement.previousElementSibling.src;
                //define the position of the image // +3 to remove the first text "img/" allows access to just the file name instead of the file path+name
                let pos = fullPath.indexOf("img") + 3;
                let partPath = fullPath.slice(pos);
                // console.log(partPath);
                
                //mini-icon for dropdown cart
                const item = {};
                //add image to item object within dropdown cart
                item.img = `img-cart${partPath}`;//sets icon directory == "./img-cart/(item image)" - find the corresponding icon of the same name in a different folder
                
                // console.log(name);
                // console.log(item);

                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                //add name to item object within dropdown cart
                item.name = name;
                
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;              
                let finalPrice = price.slice(1).trim(); //slice the "$ " and trim all blank space, showing only the number
                //add price to item object within dropdown cart
                item.price = finalPrice;
                // console.log(finalPrice);
                // console.log(item);

                //create a space in the dropdown cart to show the item added to cart
                const cartItem = document.createElement('div');
                    cartItem.classList.add( //adds a class to the cart Item HTML
                        'cart-item',
                        'd-flex',
                        'justify-content-between',
                        'text-capitalize',
                        'my-3'
                    );
                    
                    //change HTML of item in the dropdown item
                    cartItem.innerHTML = `
                        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                        <div class="item-text">
                            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                            <span>$</span>
                            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                        </div>
                            <a href="#" id='cart-item-remove' class="cart-item-remove">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                        `;
                    //select cart
                    const cart = document.getElementById('cart');
                    const total = document.querySelector('.cart-total-container');

                    //insertBefore (1.insert this item,2.before this item)
                    cart.insertBefore(cartItem, total);
                    alert(`${item.name} added to the cart`);
                    showTotals(); //update total cost of all cart items
            }
        })
    })
    //show totals
    function showTotals(){
        // console.log("working");
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');//reference all the prices

        items.forEach(function(item){
            //Get the price as a string type, convert to number type with parseFloat
            total.push(parseFloat(item.textContent));
        });
        // console.log(total);
        
        //calculate total cost of all items
        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0)
        // console.log(totalMoney);
        
        const finalMoney = totalMoney.toFixed(2); //toFixed limits float to 2 decimal places
        // console.log(finalMoney);
        
        //insert the values in the dropdown area and button area for 'Total'
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }
})();