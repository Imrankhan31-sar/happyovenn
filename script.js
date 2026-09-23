/* Edit bakery contact details, menu copy, imagery and FAQ answers here. */
const BAKERY = {
  whatsapp: "", // Digits only, including country code, e.g. 91XXXXXXXXXX
  phone: "", // International format, e.g. +91XXXXXXXXXX
  instagramUrl: "https://www.instagram.com/the_happy_ovenn?stkn=MWx0ZHMzbXpyY3Fx",
  instagramHandle: "@the_happy_ovenn",
  pickupInfo: "Pickup and delivery details are confirmed when you enquire.",
};

const PRODUCTS = [
  { name: "Kesar Mawa Cake", category: "dry-cakes", label: "Dry cake", description: "A much-loved homemade cake for sharing and celebrating.", size: "Ask for available size", image: "assets/custom-cake.png", alt: "Pink celebration cake decorated with piped flowers" },
  { name: "Aata Jaggery Cake", category: "dry-cakes", label: "Dry cake", description: "A comforting homemade favourite, baked fresh to order.", size: "Ask for available size", image: "assets/aata-jaggery-cake-source.png", crop: "round-cake-crop", alt: "Round Aata Jaggery cake topped with seeds" },
  { name: "Chocolate Banana", category: "dry-cakes", label: "Dry cake", description: "A rich, tender bake for everyday cravings and little celebrations.", size: "Ask for available size", image: "assets/chocolate-banana-cake.png", alt: "Chocolate birthday cake with chocolate decorations" },
  { name: "Fudgy Nutella Brownie Slab / Cake", category: "brownies", label: "Brownie", description: "A generously fudgy chocolate bake, made for sharing.", size: "Slab or cake — enquire", image: "assets/fudgy-nutella-brownie.png", alt: "Chocolate brownie slab with chocolate drizzle and gold decorations" },
  { name: "Nutella Bento Brownie", category: "brownies", label: "Brownie", description: "A little box of brownie goodness for gifting or keeping.", size: "Ask for available size", image: "assets/nutella-bento-brownie.jpeg", alt: "Small chocolate cake treat in a bowl" },
  { name: "Salted Caramel & Chocolate Cake Bowl", category: "other-treats", label: "Cake bowl", description: "A layered little treat for a moment of indulgence.", size: "Ask for available size", image: "assets/img-6748.HEIC", fallback: "assets/nutella-bento-brownie.jpeg", alt: "Chocolate cake bowl" },
  { name: "Scoopable Cookie Tin", category: "other-treats", label: "Cookie tin", description: "A scoopable treat, perfect for sharing or gifting.", size: "Ask for available size", image: "photo-1558961363-fa8fdf82db35", alt: "Freshly baked cookies ready to share" },
];

const FAQS = [
  ["How far in advance should I place an order?", "Please share your preferred date when you enquire. We’ll confirm availability and the time needed for your chosen bake."],
  ["Do you take customised cake orders?", "Share your occasion, design ideas, colours and preferred date in the order enquiry, and we can discuss what’s possible."],
  ["Do you offer eggless options?", "Please mention any dietary needs in your enquiry so we can confirm what is available for your order."],
  ["What are the available cake sizes?", "Sizes can vary by bake. Ask us about the available size for the product you have in mind."],
  ["Do you offer delivery?", "Pickup or delivery can be discussed when you enquire. We’ll confirm the available arrangements for your order."],
  ["Where can I collect my order?", BAKERY.pickupInfo],
  ["How should I store the cakes and brownies?", "Storage can depend on the bake. We’ll share care and serving guidance when we confirm your order."],
  ["Can I customise the packaging?", "Let us know what you have in mind. We can discuss packaging options when confirming your order."],
  ["How do I place an order?", "Choose a favourite, fill in the enquiry form and we’ll get back to confirm availability, details and pricing."],
];

const imageUrl = (source, width = 720) => source.startsWith("assets/") ? source : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=82`;
const imageAttrs = (item, width = 720) => `src="${imageUrl(item.image, width)}" ${item.fallback ? `data-fallback="${item.fallback}"` : ""}`;
const productCard = (item) => `
  <article class="product-card reveal">
    <div class="product-image-wrap"><img class="${item.crop || ""}" ${imageAttrs(item, 760)} alt="${item.alt}" loading="lazy" /><span class="product-badge">${item.label}</span></div>
    <div class="product-info"><h3 class="product-name">${item.name}</h3><p class="product-description">${item.description}</p><div class="product-meta"><span>${item.size}</span><a class="product-order" href="#order" data-product="${item.name}">Ask price in ₹ <span aria-hidden="true">↗</span></a></div></div>
  </article>`;

document.querySelector("#featured-products").innerHTML = PRODUCTS.map(productCard).join("");
document.querySelector("#menu-list").innerHTML = PRODUCTS.map((item) => `
  <article class="menu-item" data-category="${item.category}">
    <img class="${item.crop || ""}" ${imageAttrs(item, 420)} alt="${item.alt}" loading="lazy" />
    <div class="menu-item-copy"><h3>${item.name}</h3><p>${item.description}</p><div class="product-meta"><span>${item.size}</span><a class="product-order" href="#order" data-product="${item.name}">Enquire for ₹ price ↗</a></div></div>
  </article>`).join("");

const galleryItems = [
  { image: "assets/custom-cake.png", alt: "Pink celebration cake with piped flower details", caption: "A little celebration cake" },
  { image: "assets/aata-jaggery-cake-source.png", crop: "round-cake-crop", alt: "Round Aata Jaggery cake topped with seeds", caption: "A homemade favourite" },
  { image: "assets/chocolate-banana-cake.png", alt: "Chocolate birthday cake decorated with chocolate treats", caption: "Made for your moment" },
  { image: "assets/fudgy-nutella-brownie.png", alt: "Fudgy chocolate brownie slab", caption: "Brownie moments" },
  { image: "assets/nutella-bento-brownie.jpeg", alt: "Small chocolate cake treat in a bowl", caption: "A little chocolate treat" },
];
document.querySelector("#gallery-grid").innerHTML = galleryItems.map((item) => `<figure class="gallery-photo reveal"><img class="${item.crop || ""}" ${imageAttrs(item, 760)} alt="${item.alt}" loading="lazy" /><figcaption>${item.caption}</figcaption></figure>`).join("");
document.querySelector("#insta-grid").innerHTML = [PRODUCTS[3], PRODUCTS[0], PRODUCTS[5]].map((item) => `<img ${imageAttrs(item, 550)} alt="${item.alt}" loading="lazy" />`).join("");

// Some browsers do not decode HEIC. Use the provided cake-bowl picture as its fallback.
document.querySelectorAll("img[data-fallback]").forEach((img) => img.addEventListener("error", () => {
  const fallback = img.dataset.fallback;
  if (fallback) { img.src = fallback; img.removeAttribute("data-fallback"); }
}, { once: true }));

document.querySelector("#faq-list").innerHTML = FAQS.map(([question, answer], index) => `<article class="faq-item"><button class="faq-question" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}" id="faq-question-${index}">${question}<span aria-hidden="true">+</span></button><div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" ${index === 0 ? "" : "hidden"}>${answer}</div></article>`).join("");
const productSelect = document.querySelector("#product-select");
productSelect.insertAdjacentHTML("beforeend", PRODUCTS.map((item) => `<option value="${item.name}">${item.name}</option>`).join("") + '<option value="Custom celebration cake">Custom celebration cake</option>');

const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Open navigation");
}));

document.querySelectorAll(".category-tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".category-tab").forEach((other) => { other.classList.remove("active"); other.setAttribute("aria-selected", "false"); });
  tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
  document.querySelectorAll(".menu-item").forEach((item) => { item.hidden = tab.dataset.category !== "all" && item.dataset.category !== tab.dataset.category; });
}));
document.querySelector("#faq-list").addEventListener("click", (event) => {
  const button = event.target.closest(".faq-question");
  if (!button) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
});
document.addEventListener("click", (event) => {
  const productLink = event.target.closest("[data-product]");
  if (productLink) productSelect.value = productLink.dataset.product;
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelector("#gallery-grid").addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img) return;
  lightboxImage.src = img.src; lightboxImage.alt = img.alt; lightbox.showModal();
});
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });

const orderMessage = (data) => [
  "Hi The Happy Oven! I'd like to place an order.", `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`,
  `Email: ${data.get("email") || "Not provided"}`, `Product: ${data.get("product")}`, `Quantity: ${data.get("quantity") || "1"}`,
  `Preferred date: ${data.get("date") || "Flexible"}`, `Pickup / delivery: ${data.get("fulfilment")}`,
  `Customisation: ${data.get("customisation") || "None provided"}`, `Message: ${data.get("message") || "None"}`,
].join("\n");
document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget);
  const destination = BAKERY.whatsapp ? `https://wa.me/${BAKERY.whatsapp}` : "https://wa.me/";
  window.open(`${destination}?text=${encodeURIComponent(orderMessage(data))}`, "_blank", "noopener,noreferrer");
  document.querySelector("#form-status").textContent = "Your order details are ready in WhatsApp. Please send the message to complete your enquiry.";
});
document.querySelectorAll('[data-contact="whatsapp"]').forEach((link) => {
  link.href = `https://wa.me/${BAKERY.whatsapp}?text=${encodeURIComponent("Hi The Happy Oven! I'd like to place an order.")}`;
  link.target = "_blank"; link.rel = "noopener noreferrer";
});
document.querySelectorAll('[data-contact="phone"]').forEach((link) => { link.href = BAKERY.phone ? `tel:${BAKERY.phone}` : "#order"; });
document.querySelectorAll('[data-contact="instagram"]').forEach((link) => {
  link.href = BAKERY.instagramUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-instagram-handle]").forEach((node) => { node.textContent = BAKERY.instagramHandle; });
document.querySelectorAll(".gallery-more").forEach((button) => button.addEventListener("click", () => window.open(BAKERY.instagramUrl, "_blank", "noopener,noreferrer")));

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); instance.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal, .why-card, .steps article, .quote-card").forEach((element) => { element.classList.add("reveal"); observer.observe(element); });
}
