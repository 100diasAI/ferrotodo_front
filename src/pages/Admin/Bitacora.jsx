import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import { getBitacora } from "../../redux/actions/bitacora";
import DetallesBitacora from '../../components/DetallesBitacora';

const Bitacora = () => {
  const dispatch = useDispatch();
  const { registros, loading, error } = useSelector((state) => state.bitacora);

  useEffect(() => {
    dispatch(getBitacora());
  }, [dispatch]);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '60px',
    },
    {
      name: 'Usuario ID',
      selector: row => row.usuarioId,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Acción',
      selector: row => row.accion,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Detalles',
      cell: row => <DetallesBitacora detalles={row.detalles} />,
      sortable: false,
      width: '300px',
    },
    {
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Inicio',
      selector: row => new Date(row.fechaHoraInicio).toLocaleString(),
      sortable: true,
      width: '180px',
    },
    {
      name: 'Fin',
      selector: row => row.fechaHoraFin ? new Date(row.fechaHoraFin).toLocaleString() : 'N/A',
      sortable: true,
      width: '180px',
    },
    {
      name: 'Duración (s)',
      selector: row => row.tiempoSesion || 'N/A',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Clics',
      selector: row => row.cantidadClics,
      sortable: true,
      width: '80px',
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Bitácora</h1>
      {registros && registros.length > 0 ? (
        <DataTable
          columns={columns}
          data={registros}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          dense
          highlightOnHover
          pointerOnHover
          responsive
          /* expandableRows
          expandableRowsComponent={ExpandedComponent} */
        />
      ) : (
        <div>No hay registros para mostrar</div>
      )}
    </div>
  );
};

export default Bitacora;
