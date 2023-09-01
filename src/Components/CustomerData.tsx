// src/components/CustomerData.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerData.css';
const API_URL =
  'https://6466e9a7ba7110b663ab51f2.mockapi.io/api/v1/pack1';

interface Customer {
  customer_id: number;
  pack_data: PackData[];
}

interface PackData {
  ingredient: string;
  inventory_code: string;
  quantity: number;
  unit: string;
}

const CustomerData: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError('Failed to fetch data from the API');
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Customer Data</h1>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Pack Data</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Inventory Code</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.pack_data.map((pack) => (
                      <tr key={pack.inventory_code}>
                        <td className="ingredient-cell">{pack.ingredient}</td>
                        <td>{pack.inventory_code}</td>
                        <td>{pack.quantity}</td>
                        <td>{pack.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerData;
