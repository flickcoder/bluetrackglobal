const cart_btn = document.querySelectorAll(".cart-btn");
const cart_items_counter__header = document.querySelector(".cart-items-counter__header");
const cart_items_counter__sticky = document.querySelector(".cart-items-counter__sticky");
const cart_list = JSON.parse(window.localStorage.getItem("cart_list")) || [];
let cart_counter = window.localStorage.getItem("cart_counter") || 0;

cart_btn.forEach((btn, i) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();

		// update cart counter value

		cart_counter++;
		cart_items_counter__header.innerHTML = `(${cart_counter})`;
		cart_items_counter__sticky.innerHTML = `(${cart_counter})`;

		window.localStorage.setItem("cart_counter", cart_counter);

		alert("Product added to cart.");

		// update cart items list

		const product_img_url = e.target.closest(".image-box").firstElementChild.src;
		const product_name = e.target.closest(".inner-box").lastElementChild.children[1].firstElementChild.innerHTML;
		const product_price = e.target.closest(".inner-box").lastElementChild.children[2].innerHTML;
		const product_id = e.target.closest(".shop-block").getAttribute("data-id");
		const product_quantity = 1;

		add_product_to_cart({ product_img_url, product_name, product_price, product_id, product_quantity });

		console.log("cart_list", cart_list);
	});
});

const add_product_to_cart = (product) => {
	if(cart_list.some((_product, i) => _product.product_id == product.product_id)) {
		cart_list.forEach((_product, i) => {
			if(_product.product_id == product.product_id) {
				_product.product_quantity++;
			}
		});
	} else {
		cart_list.push(product);
	}
	window.localStorage.setItem("cart_list", JSON.stringify(cart_list));
}