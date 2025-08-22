import { useState } from "react";
import CameraPreview from "../components/CameraPreview";

import chair from "../assets/furniture/chair.PNG";
import tabel from "../assets/furniture/tabel.PNG";
import sofa from "../assets/furniture/sofa.PNG";

import "./Products.css"; // ستايل الكروت

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "كرسي ", price: "1200 EGP", image: chair },
    { id: 2, name: "تربيزه مودرن", price: "2500 EGP", image: tabel },
    { id: 3, name: "كنبه مريحه", price: "5000 EGP", image: sofa },
  ];

  return (
    <div className="products-container">
      <h2>المنتجات</h2>
      <p>هنا هنعرض قطع الأثاث وصورهم</p>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.price}</p>
            <button onClick={() => setSelectedProduct(p.image)}>
              جرب بالكاميرا
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <CameraPreview
          productImage={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default Products;

