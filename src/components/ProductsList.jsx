import { useState } from "react";

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function ProductList() {
  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const alreadyAdded = addedProducts.find(p => p.name === product.name);

    if (alreadyAdded) {
      updateProductQuantity(product.name);
    } else {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  const updateProductQuantity = (productName) => {
    const updatedCart = addedProducts.map(p =>
      p.name === productName ? { ...p, quantity: p.quantity + 1 } : p
    );
    setAddedProducts(updatedCart);
  };

  const removeFromCart = (productName) => {
    const updatedCart = addedProducts.filter(p => p.name !== productName);
    setAddedProducts(updatedCart);
  };

  const getTotal = () => {
    return addedProducts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <h2>Lista Prodotti</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - {product.price.toFixed(2)} €
            <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h3>Carrello</h3>
          <ul>
            {addedProducts.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - € {item.price.toFixed(2)} × {item.quantity}
                <button
                  onClick={() => removeFromCart(item.name)}
                >
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <h4>Totale:  {getTotal()}€</h4>
        </>
      )}
    </div>
  );
}

export default ProductList;
