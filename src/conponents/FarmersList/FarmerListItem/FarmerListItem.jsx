import React from 'react';

const FarmerListItem = ({ farmer, imageBaseUrl }) => {
  const {
    surname,
    first_name,
    middle_name,
    address,
    city,
    occupation,
    passport_photo
  } = farmer;
  return (
    <div className="ui card link">
      <div className="image" style={{ width: '100%', height: '300px' }}>
        <img
          src={`${imageBaseUrl}${passport_photo}`}
          alt={`${first_name} ${surname}`}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="content">
        <div className="header">{`${first_name} ${middle_name ||
          ''} ${surname}`}</div>
        <div className="meta">{occupation}</div>
        <div className="description">
          <i aria-hidden="true" className="home icon"></i> {address}
        </div>
      </div>
      <div className="extra content">
        <span>
          <i aria-hidden="true" className="map marker alternate icon"></i>
          {city}
        </span>
      </div>
    </div>
  );
};

export default FarmerListItem;
