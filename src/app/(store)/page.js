'use client';

import Link from "next/link";
import Image from "next/image";

import hero1 from "@/assets/hero.png";
import hero2 from "@/assets/hero2.png";
import hero3 from "@/assets/hero3.jpg";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";

export default function Store() {

const heroImages = [
{ image: hero1 },
{ image: hero2 },
{ image: hero3 }
];

const products = [
{ name: "Classic White Tee", image: "/images/white-tee.jpg", price: "$25" },
{ name: "Denim Jacket", image: "/images/denim-jacket.jpg", price: "$80" },
{ name: "Casual Hoodie", image: "/images/hoodie.jpg", price: "$45" },
{ name: "Street Hoodie", image: "/images/hoodie2.jpg", price: "$55" }
];

const categories = [
{ name: "T-Shirts", image: "/images/cat-tshirt.jpg", link: "/categories/tshirts" },
{ name: "Hoodies", image: "/images/cat-hoodie.jpg", link: "/categories/hoodies" },
{ name: "Pants", image: "/images/cat-pants.jpg", link: "/categories/pants" },
{ name: "Jackets", image: "/images/cat-jacket.jpg", link: "/categories/jackets" }
];

/* HERO TEMPLATE */

const heroTemplate = (item) => {
return (
<div className="relative h-[520px] w-full">

<Image
src={item.image}
alt="Hero banner"
fill
priority
className="object-cover"
/>

<div className="absolute inset-0 bg-black/40"></div>

<div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">

<h1 className="text-5xl font-semibold mb-6">
Premium Streetwear
</h1>

<p className="text-lg text-gray-200 max-w-xl mb-8">
Discover modern clothing designed for comfort, movement, and everyday style.
</p>

<Button
label="Shop Collection"
icon="pi pi-arrow-right"
iconPos="right"
className="p-button-primary p-button-lg"
/>

</div>
</div>
);
};

/* PRODUCT CARD */

const productTemplate = (product) => {
return (
<div className="px-3">
<Card className="border border-gray-200 shadow-sm hover:shadow-lg transition">

<img
src={product.image}
alt={product.name}
className="w-full h-64 object-cover rounded-md mb-4"
/>

<h3 className="text-base font-medium text-gray-900 mb-1">
{product.name}
</h3>

<p className="text-gray-600 mb-4">
{product.price}
</p>

<Button
icon="pi pi-shopping-cart"
label="Add to Cart"
className="p-button-primary w-full"
/>

</Card>
</div>
);
};

return (
<div className="bg-white">

{/* HERO CAROUSEL */}

<Carousel
value={heroImages}
itemTemplate={heroTemplate}
numVisible={1}
numScroll={1}
circular
autoplayInterval={6000}
showIndicators
showNavigators
/>

{/* CATEGORIES */}

<section className="max-w-7xl mx-auto px-8 py-20">

<h2 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
Shop by Category
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-8">

{categories.map((cat, index) => (
<Link
key={index}
href={cat.link}
className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition block"
>

<img
src={cat.image}
alt={cat.name}
className="h-48 w-full object-cover"
/>

<div className="p-4 text-center font-medium text-gray-800">
{cat.name}
</div>

</Link>
))}

</div>
</section>

{/* FEATURED PRODUCTS */}

<section className="bg-gray-50 border-y border-gray-200">

<div className="max-w-7xl mx-auto px-8 py-20">

<div className="flex justify-between items-center mb-10">

<h2 className="text-2xl font-semibold text-gray-900">
Featured Products
</h2>

<Link href="/products">
<Button
label="View All"
icon="pi pi-arrow-right"
iconPos="right"
className="p-button-text"
/>
</Link>

</div>

<Carousel
value={products}
numVisible={3}
numScroll={1}
itemTemplate={productTemplate}
responsiveOptions={[
{ breakpoint: "1024px", numVisible: 2 },
{ breakpoint: "640px", numVisible: 1 }
]}
/>

</div>
</section>

{/* PROMOTION */}

<section className="bg-black text-white">

<div className="max-w-7xl mx-auto px-8 py-20 text-center">

<h2 className="text-3xl font-semibold mb-4">
Limited Edition Drop
</h2>

<p className="text-gray-300 mb-8">
Exclusive streetwear collection available for a limited time.
</p>

<Button
label="Explore Collection"
icon="pi pi-external-link"
iconPos="right"
className="p-button-warning p-button-lg"
/>

</div>
</section>

{/* BRAND BENEFITS */}

<section className="max-w-7xl mx-auto px-8 py-20">

<div className="grid md:grid-cols-3 gap-12 text-center">

<div>
<i className="pi pi-star text-3xl mb-4 text-indigo-600"></i>
<h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
<p className="text-gray-600">
Carefully crafted clothing made with high-quality fabrics.
</p>
</div>

<div>
<i className="pi pi-truck text-3xl mb-4 text-indigo-600"></i>
<h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
<p className="text-gray-600">
Reliable and quick delivery to your doorstep.
</p>
</div>

<div>
<i className="pi pi-refresh text-3xl mb-4 text-indigo-600"></i>
<h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
<p className="text-gray-600">
Hassle-free returns if the product does not fit your style.
</p>
</div>

</div>
</section>

{/* NEWSLETTER */}

<section className="bg-gray-50 border-t border-gray-200">

<div className="max-w-4xl mx-auto px-8 py-20 text-center">

<h2 className="text-2xl font-semibold text-gray-900 mb-4">
Join Our Newsletter
</h2>

<p className="text-gray-600 mb-8">
Get updates about new drops and exclusive offers.
</p>

<Button
icon="pi pi-envelope"
label="Subscribe"
className="p-button-success p-button-lg"
/>

</div>
</section>

</div>
);
}