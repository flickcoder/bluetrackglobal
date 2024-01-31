const cart_table = document.querySelector(".cart-table tbody");
const cart_total_count = document.querySelector(".cart-title .total-cart-items");
const cart_grand_total = document.querySelector(".cart-title .total-cart-items-cost");
const cart_items_counter__header = document.querySelector(".cart-items-counter__header");
const cart_items_counter__sticky = document.querySelector(".cart-items-counter__sticky");
const cart_checkout_btn = document.querySelector(".btn-box .checkout-btn");
const cart_list = JSON.parse(window.localStorage.getItem("cart_list")) || [];
let cart_counter = window.localStorage.getItem("cart_counter") || 0;
let cart_total_cost = null;

cart_checkout_btn.addEventListener("click", (e) => {
    if(cart_counter == 0) {
        alert("Cart is empty");
        e.preventDefault();
    }
})

const display_cart_items = () => {
    cart_table.innerHTML = "";

    for(const product of cart_list) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="prod-column">
                                        <div class="column-box">
                                            <figure class="prod-thumb"><a href="cart.html"><img src="${product.product_img_url}" alt=""></a></figure>
                                            <h5>${product.product_name}</h5>
                                        </div>
                                    </td>
                                    <td class="qty"><input type="number" value="${product.product_quantity}" name="quantity" class="quantity"></td>
                                    <td class="sub-total">${product.product_price}</td>
                                    <td class="total-price">₦${parse_price_format(get_product_total_price(product))}.00</td>
                                    <td><a href="#" class="remove-btn"><i class="fa-solid fa-xmark"></i></a></td>`;
        cart_table.prepend(tr);
        cart_total_cost += get_product_total_price(product);
    }

    const product_quantity = document.querySelectorAll(".quantity");
    const remove_btn = document.querySelectorAll(".remove-btn");

    product_quantity.forEach((elem, i) => elem.addEventListener("change", update_product_quantity));
    remove_btn.forEach((elem, i) => elem.addEventListener("click", remove_cart_item));
    
    cart_total_count.innerHTML = cart_list.length;
    cart_grand_total.innerHTML = `₦${parse_price_format(cart_total_cost || "0")}.00`;
    cart_items_counter__header.innerHTML = `(${cart_counter})`;
    cart_items_counter__sticky.innerHTML = `(${cart_counter})`;
}

const update_product_quantity = e => {
    let value = e.target.value;
    let price = undefined;
    cart_total_cost = 0;
    e.target.setAttribute("value", value);
    for(const product of cart_list) {
        if(product.product_name.toLowerCase() == e.target.closest("tr").firstElementChild.children[0].lastElementChild.textContent.toLowerCase()) {
            product.product_quantity = value;
            price = get_product_total_price(product);
        }
        cart_total_cost += get_product_total_price(product);
    }
    e.target.closest("tr").children[3].innerHTML = `₦${parse_price_format(price)}.00`;
    cart_grand_total.innerHTML = `₦${parse_price_format(cart_total_cost)}.00`;
    window.localStorage.setItem("cart_list", JSON.stringify(cart_list));
}

const remove_cart_item = (e) => {
    e.preventDefault();
    for(const product of cart_list) {
        if(product.product_name.toLowerCase() == e.target.closest("tr").firstElementChild.children[0].lastElementChild.textContent.toLowerCase()) {
            cart_list.splice(cart_list.indexOf(product), 1);
            cart_total_cost -= get_product_total_price(product);
            cart_counter--;
        }
    }

    cart_grand_total.innerHTML = `₦${parse_price_format(cart_total_cost || "0")}.00`;

    window.localStorage.setItem("cart_list", JSON.stringify(cart_list));
    window.localStorage.setItem("cart_counter", cart_counter);
    
    display_cart_items();
}

const get_product_total_price = product => {
    let price = "";
    let total_price = undefined;
    for(let i = 0; i < product.product_price.length; i++) {
        if(product.product_price[i] == "₦" || product.product_price[i] == "," || product.product_price[i] == ".") {
            if(product.product_price[i] == ".") {
                break;
            }
            continue;
        } else {
            price += product.product_price[i];
        }
    }
    total_price = parseInt(price) * product.product_quantity;
    return total_price;
}

const parse_price_format = price => {
    let price_str = price.toString();
    let parsed_price = "";
    let counter = 0;
    let str_len = price_str.length;
    for(let i = str_len - 1; i >= 0; i--) {
        if(i != str_len - 1 && counter % 3 == 0) {
            parsed_price += ",";
        }
        parsed_price += price_str[i];
        counter++;
    }
    parsed_price = reverse_str(parsed_price);
    return parsed_price;
}

const reverse_str = str => {
    let reversed_str = "";
    for(let i = str.length - 1; i >= 0; i--) {
        reversed_str += str[i];
    }
    return reversed_str;
}

window.addEventListener("load", display_cart_items);