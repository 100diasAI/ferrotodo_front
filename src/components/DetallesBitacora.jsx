import React from 'react';
import { Tooltip } from 'react-tooltip';

const DetallesBitacora = ({ detalles }) => {
  if (!detalles || Object.keys(detalles).length === 0) {
    return <span>No hay detalles</span>;
  }

  const formatDetalles = (detalles) => {
    return Object.entries(detalles).map(([key, value]) => {
      let formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      let formattedValue = typeof value === 'object' ? JSON.stringify(value) : value;
      return `${formattedKey}: ${formattedValue}`;
    }).join('\n');
  };

  const detallesString = formatDetalles(detalles);

  return (
    <>
      <span data-tooltip-id={`tooltip-${detalles.id}`} data-tooltip-content={detallesString}>
        Ver detalles
      </span>
      <Tooltip id={`tooltip-${detalles.id}`} place="right" effect="solid" multiline={true} />
    </>
  );
};

export default DetallesBitacora;
