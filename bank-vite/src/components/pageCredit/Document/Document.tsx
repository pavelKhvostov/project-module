import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const Document = () => {
  const { applicationId } = useParams();
  const storageKey = `ApplicationData_${applicationId}`;
  const rawData = localStorage.getItem(storageKey);

  if (!rawData) {
    return <Navigate to='*' replace />;
  }

  const data = JSON.parse(rawData);

  return (
    <section className='message'>
      <div className='container'>
        <h2>Application #{applicationId}</h2>

        <div>
          <h3>Client Info:</h3>
          <p>
            {data.client?.firstName} {data.client?.lastName}
          </p>
          <p>Email: {data.client?.email}</p>
          <p>Birthdate: {data.client?.birthdate}</p>
          <p>Gender: {data.client?.gender}</p>
        </div>

        <div>
          <h3>Credit Info:</h3>
          <p>Amount: {data.credit?.amount}</p>
          <p>Term: {data.credit?.term} months</p>
          <p>Rate: {data.credit?.rate}%</p>
          <p>PSK: {data.credit?.psk}</p>
        </div>

        <div>
          <h3>Status:</h3>
          <p>{data.status}</p>
        </div>
      </div>
    </section>
  );
};

export default Document;
