var practiceCart = (function(){ // We have an object but it is available anywhere in javaScript. That means any piece of code can access this name and any property of the object. 
// Only want my  main methods (functions) to be exposed publically. The practiceCart obj, practiceCart.cart and Item class should be private because we don't want them to access out properties in our shopping cart. 
// praciceCart is our module. 

    // Private Methods
    cart = []; 
    // cart is a variable of practiceCart module. We don't need practiceCart in front of cart anymore since practiceCart is now a module. 

    function Item(name, price, count) { // Is a feature (class) of practiceCart. All the features of Item are properties of Item so it retains the keyword this. 
        this.name = name;
        this.price = price;
        this.count = count; 
    }; 


    function saveCart() { // Not attached to an object since they are private. Same with loadCart. 
        localStorage.setItem("shoppingCart", JSON.stringify(cart)); // parameters represent name and value; JSON is used to convert arrays and objects into a string. LocalStorage needs JSON since it can only store values as strings or numbers. 
    };


    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart")); // We want to covert that sting we get back from the JSON object, into an array or object. At the moment variable cart = is global since we have not said where cart belongs to since it is not attatched to practiceCart yet. We need to fix this. *** Important *** So we fix this by putting keyword "this"
    }; 

    
    loadCart(); // without this our cart will have zero items in it

    
    
    // Public Methods. Our public API below(Application programming Interface) below is all our names, methods, properties, that we can use in our code to access the features of practiceCart. 
    var obj = {}; // obj replaces practiceCart in front of methods. This can be names anything does not have to be named "obj."
    
    
    obj.addItemToCart = function(name, price, count) { // Anytime you are in a method(function) that belongs to an object, you can refer to that method as "this"
        for (var i in cart) { // cart does not belong to practiceCart anymore so we remove this. cart also does not belong to obj since it is a regular variable above as a private variable since we are using a closure ****** Important *******
            // We remove "this" in front of all the functions below. **** Important ****
            if (cart[i].name === name) { // .name if from Item in cart and === name if from addItemToCart(name)
                cart[i].count += count; // Add count to whatever the value of count prop is. 
                saveCart(); //Need to add this here otherwise return statmenet will skip saved info. 
                return; // This will end the function 
            }
        }
        var item = new Item(name, price, count); //Executed only if we do not already find the item name in the cart
        cart.push(item);
        saveCart();  // practiceCart owns addItemToCart and saveCart. // this.saveCart inside the method addItemToCart means it belongs to the owner of this method. The owner is practiceCart. 
    };


    obj.setCountForItem = function(name, count) { // **** Review this Checkpoint 27 countInput ****
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count; // Count is string. 
                break; 
            }
        }
        saveCart(); 
    };


    obj.removeItemFromCart = function(name) { // Removes one item by looking up the name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count--; // cart[i].count = cart[i].count - 1; or cart[i].count -= 1; (same thing)
                if (cart[i].count === 0) {
                    cart.splice(i, 1); // If count is 0 it removes item from cart completely. or you can put removeItemFromCartAll(); instead of using splice in this case. 
                }
                break; 
            }
        }
        saveCart(); // Use "this" since it is a method inside the practiceCart object. the object is our self. 
    };


    obj.removeItemFromCartAll = function(name) { // Removes all of a particular item using name.
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1); 
                break; 
            }
        }
        saveCart(); 
    };


    obj.clearCart = function() {  // Removes everything
        cart = [];
        saveCart(); 
    };


    obj.countCart = function() {  // Count number of items in the cart (returns total count)
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count
        }
        return totalCount; 
    }; 


    obj.totalCart = function() {  // Total price of all the items (returns total cost)
        var totalCost = 0; 
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count; // Fixed mistake. // totalCost is a variable but it contains a number so we can add methods to it. 
        }
        return totalCost.toFixed(2); // toFixed method converts our number to a string and rounds it to a fixed number of decimal spaces. 
    }; 


    obj.listCart = function() {  // Returns an array of all items (displays it). This helps with debugging
        var cartCopy = []; // this does not get keyword "this" since they have keyword "var" in front of it. 
        for (var i in cart) { // Looping through each item in the cart
            var item = cart[i]; 
            var itemCopy = {}; //This is what we pass back to other functions. 
            for (var p in item) { // Looping through each property of the item and make that a property in copy and give it the same value. This gets our 3 properties name, price, and count of the original array. 
                itemCopy[p] = item[p]; 
            }
            itemCopy.total = (item.price * item.count).toFixed(2); // We add this 4th property in this checkpoint. 
            cartCopy.push(itemCopy); // Adding the itemcopy to the cartcopy
        }
         
        return cartCopy; 
    };


    return obj; 
})(); 