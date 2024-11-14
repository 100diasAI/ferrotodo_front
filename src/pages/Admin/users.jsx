import DataTable from 'react-data-table-component';
import { getUsuarios, updateUser, filterUsers } from '../../redux/actions/checkout';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import './products.css'
import { toast } from 'react-toastify';
import { Button, Text } from './styles';

export default function Users() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [localUserStates, setLocalUserStates] = useState(() => {
    const savedStates = localStorage.getItem('userStates');
    return savedStates ? JSON.parse(savedStates) : {};
  });

  const usuariosFiltrados = useSelector((state) => state.checkout.usuariosFiltrados);

  useEffect(() => {
    localStorage.setItem('userStates', JSON.stringify(localUserStates));
  }, [localUserStates]);

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  useEffect(() => {
    if (usuariosFiltrados.length > 0) {
      const newStates = {};
      usuariosFiltrados.forEach(user => {
        newStates[user.id] = {
          isAdmin: user.isAdmin,
          bloqueado: user.bloqueado
        };
      });
      setLocalUserStates(prevStates => ({
        ...newStates,
        ...prevStates
      }));
    }
  }, [usuariosFiltrados]);

  const getUserState = (userId, field, defaultValue) => {
    return localUserStates[userId]?.[field] ?? defaultValue;
  };

  const changeAdmin = ({nombre, apellido, id, isAdmin}) => {
    const adminSet = async () => {
      try {
        const newAdminState = !getUserState(id, 'isAdmin', isAdmin);
        setLocalUserStates(prev => ({
          ...prev,
          [id]: { ...prev[id], isAdmin: newAdminState }
        }));

        await dispatch(updateUser({id, isAdmin: newAdminState}));
        toast.success(`${newAdminState ? 'Otorgados' : 'Revocados'} permisos de administrador`);
        toast.dismiss(`${id}admin${isAdmin}`);
      } catch (error) {
        setLocalUserStates(prev => ({
          ...prev,
          [id]: { ...prev[id], isAdmin: isAdmin }
        }));
        toast.error('Error al actualizar permisos');
      }
    }

    const currentIsAdmin = getUserState(id, 'isAdmin', isAdmin);
    return (
      <div>
        <Text>
          {currentIsAdmin 
            ? `¿Revocar permisos de administrador a ${nombre} ${apellido}?`
            : `¿Otorgar permisos de administrador a ${nombre} ${apellido}?`}
        </Text>
        <Button onClick={adminSet}>Confirmar</Button>
      </div>
    )
  }

  const blockUser = ({id, bloqueado, nombre, apellido}) => {
    const setBlock = async () => {
      try {
        const newBlockState = !getUserState(id, 'bloqueado', bloqueado);
        setLocalUserStates(prev => ({
          ...prev,
          [id]: { ...prev[id], bloqueado: newBlockState }
        }));

        await dispatch(updateUser({id, bloqueado: newBlockState}));
        toast.success(`Usuario ${newBlockState ? 'bloqueado' : 'desbloqueado'} exitosamente`);
        toast.dismiss(`${id}block${bloqueado}`);
      } catch (error) {
        setLocalUserStates(prev => ({
          ...prev,
          [id]: { ...prev[id], bloqueado: bloqueado }
        }));
        toast.error('Error al actualizar estado de bloqueo');
      }
    }

    const currentBloqueado = getUserState(id, 'bloqueado', bloqueado);
    return (
      <div>
        <Text>
          {currentBloqueado 
            ? `¿Desbloquear al usuario ${nombre} ${apellido}?`
            : `¿Bloquear al usuario ${nombre} ${apellido}?`}
        </Text>
        <Button onClick={setBlock}>Confirmar</Button>
      </div>
    )
  }

  function alerta2(row) {
    toast.info(changeAdmin(row), {
      toastId: `${row.id}admin${row.isAdmin}`
    });
  }

  function alerta1(row) {
    toast.info(blockUser(row), {
      toastId: `${row.id}block${row.bloqueado}`
    });
  }

  function handleInputChange(e) {
    setSearch(
      e.target.value
    )
  }

  function handleSubmit(e) {
    dispatch(filterUsers(search))
  }

  function RecargarSubmit(e) {
    dispatch(getUsuarios("Reset"))
    setSearch("")
  }

  const columnas = [
    {
      name: 'Nombre',
      selector: row => `${row.nombre}`,
      sortable: true
    },
    {
      name: 'Apellido',
      selector: row => `${row.apellido}`,
      sortable: true
    },
    {
      name: 'Mail',
      selector: row => `${row.mail}`,
      sortable: true
    },
    {
      name: 'Telefono',
      selector: row => `${row.telefono}`,
      sortable: true
    },
    {
      name: 'Admin',
      selector: row => getUserState(row.id, 'isAdmin', row.isAdmin) ? 'SI' : 'NO',
      sortable: true,
      cell: row => (
        <span style={{ 
          color: getUserState(row.id, 'isAdmin', row.isAdmin) ? 'green' : 'red' 
        }}>
          {getUserState(row.id, 'isAdmin', row.isAdmin) ? 'SI' : 'NO'}
        </span>
      )
    },
    {
      name: 'Bloqueado',
      selector: row => getUserState(row.id, 'bloqueado', row.bloqueado) ? 'SI' : 'NO',
      sortable: true,
      cell: row => (
        <span style={{ 
          color: getUserState(row.id, 'bloqueado', row.bloqueado) ? 'red' : 'green' 
        }}>
          {getUserState(row.id, 'bloqueado', row.bloqueado) ? 'SI' : 'NO'}
        </span>
      )
    },
    {
      name: 'Admin',
      selector: row => (
        <button 
          className='user' 
          onClick={() => alerta2(row)}
          style={{ 
            backgroundColor: getUserState(row.id, 'isAdmin', row.isAdmin) ? '#ff4444' : '#44aa44' 
          }}
        >
          {getUserState(row.id, 'isAdmin', row.isAdmin) ? 'Revocar Admin' : 'Hacer Admin'}
        </button>
      )
    },
    {
      name: 'Bloqueado',
      selector: row => (
        <button 
          className='user' 
          onClick={() => alerta1(row)}
          style={{ 
            backgroundColor: getUserState(row.id, 'bloqueado', row.bloqueado) ? '#44aa44' : '#ff4444' 
          }}
        >
          {getUserState(row.id, 'bloqueado', row.bloqueado) ? 'Desbloquear' : 'Bloquear'}
        </button>
      )
    }
  ]

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }

  return (
    <div>
      <div className='barraBusqueda'>
        <input
          type='text'
          name='nombre'
          value={search}
          className='textField'
          placeholder="Buscar"
          onChange={(c) => handleInputChange(c)}
        />
        <button type='submit' className="btnBuscar" onClick={(e) => handleSubmit(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg></button>
        <button type='submit' className="btnBuscar" onClick={(e) => RecargarSubmit(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
        </svg></button>
      </div>
      <DataTable
        columns={columnas}
        data={usuariosFiltrados}
        title="Usuarios"
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        /* responsive
        expandableRows
        expandableRowsComponent={ExpandedComponent} */
      />
    </div>
  )
}