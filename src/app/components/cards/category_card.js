'use client';

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category }) {
  const router = useRouter();

  return (
    <Card style={{ width: "220px", textAlign: "center" }}>
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
          marginBottom: "0.5rem",
        }}
      />

      <h4>{category.name}</h4>
      <p>{category.productCount} Products</p>

      <Button
        label="View Products"
        className="p-button-sm p-button-info"
        onClick={() => router.push(`/products?category=${category.id}`)}
      />
    </Card>
  );
}