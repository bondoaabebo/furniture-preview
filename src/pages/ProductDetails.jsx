import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CameraPreview from "../components/CameraPreview";

const products = [
  { id: 1, name: "كرسي خشب", price: 800, img: "/assets/furniture/chair1.jpg" },
  { id: 2, name: "كنبة مودرن", price: 3500, img: "/assets/furniture/sofa1.jpg" },
  { id: 3, name: "ترابيزة صغيرة", price: 1200, img: "/assets/furniture/table1.jpg" },
];

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2>❌ المنتج غير موجود</h2>;

  return (
    <section style={{ textAlign: "center" }}>
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} width="300" />
      <p>السعر: {product.price} ج.م</p>

      <button onClick={() => addToCart(product)}>🛒 أضف للسلة</button>

      <h3 style={{ marginTop: "20px" }}>📷 جرب المنتج بالكاميرا</h3>
      <CameraPreview productImage={product.img} />
    </section>
  );
}

export default ProductDetails;


export default ProductDetails;
