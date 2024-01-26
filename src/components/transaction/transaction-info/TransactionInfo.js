import React, { useEffect, useState } from 'react';

function TransactionInfo() {
  const [transactionInfo, setTransactionInfo] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/transaction/info/')
      .then((response) => response.json())
      .then((data) => {
        setTransactionInfo(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des informations de transaction :', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">La transaction</h1>
      {transactionInfo ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Montant payé : {transactionInfo.paid}</p>
            <p className="card-text">Montant total : {transactionInfo.total}</p>
            <p className="card-text">A suffisamment de pièces : {transactionInfo.haveEnoughCoins ? 'Oui' : 'Non'}</p>
            {transactionInfo.gaveBack && (
              <p className="card-text">Montant rendu : {transactionInfo.gaveBack}</p>
            )}
          </div>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default TransactionInfo;
