'use client';

import Image from "next/image";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: "ponchos",
    name: "Ponchos",
    image: "/images/poncho-category.jpg",
    productCount: 5
  },
  {
    id: "tshirts",
    name: "T-Shirts",
    image: "/images/tshirt-category.jpg",
    productCount: 8
  },
  {
    id: "baggy-pants",
    name: "Baggy Pants",
    image: "/images/baggy-pants-category.jpg",
    productCount: 6
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image: "/images/hoodie-category.jpg",
    productCount: 7
  }
];

export default function CategoriesPage() {

  const router = useRouter();

  return (
    <div>

      {/* HERO SECTION */}

      <section style={{ position: "relative", height: "380px", width: "100%" }}>

        <Image
          src="/images/category-banner.jpg"
          alt="Shop Categories"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            padding: "1rem"
          }}
        >
          <div>
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              Discover Our Collection
            </h1>

            <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
              Explore trending styles and new arrivals
            </p>

            <Button label="Shop Now" size="large" />
          </div>
        </div>

      </section>


      {/* CATEGORY GRID */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "4rem auto",
          padding: "1rem"
        }}
      >

        <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          Shop by Category
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: "2rem"
          }}
        >

          {categories.map((cat) => (

            <Card
              key={cat.id}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.15)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >

              <div style={{ position: "relative", width: "100%", height: "200px" }}>

                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: "cover" }}
                />

              </div>

              <div style={{ padding: "1rem", textAlign: "center" }}>

                <h3 style={{ marginBottom: "0.5rem" }}>{cat.name}</h3>

                <p style={{ marginBottom: "1rem", color: "#666" }}>
                  {cat.productCount} Products
                </p>

                <Button
                  label="Browse"
                  icon="pi pi-arrow-right"
                  onClick={() =>
                    router.push(`/products?category=${cat.id}`)
                  }
                />

              </div>

            </Card>

          ))}

        </div>

      </section>


      {/* PROMO SECTION */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "4rem auto",
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "2rem"
        }}
      >

        <div
          style={{
            position: "relative",
            height: "250px",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >

          <Image
            src="/images/promo1.jpg"
            alt="New Arrivals"
            fill
            style={{ objectFit: "cover" }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}
          >
            New Arrivals
          </div>

        </div>


        <div
          style={{
            position: "relative",
            height: "250px",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >

          <Image
            src="/images/promo2.jpg"
            alt="Limited Drops"
            fill
            style={{ objectFit: "cover" }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}
          >
            Limited Drops
          </div>

        </div>

      </section>


      {/* CTA SECTION */}

      <section
        style={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          padding: "4rem 1rem"
        }}
      >

        <h2 style={{ marginBottom: "1rem" }}>
          Join Our Community
        </h2>

        <p style={{ marginBottom: "1.5rem", color: "#bbb" }}>
          Get updates about new collections and exclusive offers
        </p>

        <Button label="Subscribe" severity="warning" />

      </section>


    </div>
  );
}