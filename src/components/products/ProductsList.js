import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ProductsList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Coca-Cola', price: 1.99 },
    { id: 2, name: 'Pepsi', price: 1.99 },
    { id: 3, name: 'Chips', price: 2.49 },
    { id: 4, name: 'Barre de chocolat', price: 1.79 },
    { id: 5, name: 'Bonbons', price: 1.29 },
    { id: 6, name: 'Eau minérale', price: 1.49 },
    { id: 7, name: 'Café', price: 0.99 },
    { id: 8, name: 'Thé', price: 0.89 },
    { id: 9, name: 'Bouteille d\'eau gazeuse', price: 1.69 },
    { id: 10, name: 'Sandwich', price: 3.99 },
    { id: 11, name: 'Baguette de pain', price: 1.49 },
    { id: 12, name: 'Biscuits', price: 2.79 },
    { id: 13, name: 'Muffins', price: 2.99 },
    { id: 14, name: 'Fruits', price: 0.79 },
    { id: 15, name: 'Red Bull', price: 2.29 },
  ]);
  const [cart, setCart] = useState({});
  const [insertedAmount, setInsertedAmount] = useState(0);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');  // Remplacez l'URL par l'adresse de votre serveur Flask-SocketIO

    socket.on('update_montant_inseré', (data) => {
      setInsertedAmount(data.montant);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addToCart = (product) => {
    const updatedCart = { ...cart };

    if (updatedCart[product.id]) {
      updatedCart[product.id].quantity += 1;
    } else {
      updatedCart[product.id] = { ...product, quantity: 1 };
    }

    setCart(updatedCart);
  };

  const calculateTotal = () => {
    let total = 0;

    for (const productId in cart) {
      const product = cart[productId];
      total += product.price * product.quantity;
    }

    return total.toFixed(2);
  };

  const handleBuyClick = () => {
    const total = calculateTotal();

    if (insertedAmount < total) {
      alert("Le montant inséré est insuffisant pour acheter les produits.");
    } else {
      // Logique d'achat ici (soustraction du montant inséré, vidage du panier, etc.)
      
      alert("Achat réussi !");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Liste des produits</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Prix : {product.price} €</p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Ajouter au panier</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Panier</h2>
      <ul className="list-group">
        {Object.values(cart).map((item, index) => (
          <li style={{ color: 'green' }} className="list-group-item" key={item.id}>
            {item.name} - {item.price} € x {item.quantity}
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <h4 style={{ color: 'red' }}>Total : {calculateTotal()} €</h4>
        <h4>Montant inséré : {insertedAmount.toFixed(2)} €</h4>
        <button className="btn btn-success mt-2" onClick={handleBuyClick}>Acheter</button>
      </div>
    </div>
  );
};

export default ProductsList;
