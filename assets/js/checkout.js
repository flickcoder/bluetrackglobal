const checkout_subtotal = document.querySelector(".sub-total span");
const checkout_total = document.querySelector(".total span");
const cart_list = JSON.parse(window.localStorage.getItem("cart_list")) || [];
const checkbox = document.querySelectorAll(".payment-method input");
const payment_details = document.querySelector(".card-details");
let prev_checked = null;
let shipping_fee = 1000;

// select mode of payment

Array.from(checkbox)[1].addEventListener('click', (e) => {
    e.preventDefault();
    alert("Debit Card payment option is currently unavailable.");
});


window.addEventListener("load", () => {
	let cart_total_cost = null;

	for(product of cart_list) {
		cart_total_cost += get_product_total_price(product);
	}

	checkout_subtotal.innerHTML = `₦${parse_price_format(cart_total_cost)}.00`;
	checkout_total.innerHTML = `₦${parse_price_format(cart_total_cost + shipping_fee)}.00`;

});

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