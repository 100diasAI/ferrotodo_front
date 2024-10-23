import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ActivityTracker = (WrappedComponent) => {
  return function WithActivityTracker(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [clickCount, setClickCount] = useState(0);
    const [sessionStart, setSessionStart] = useState(null);
    const [activityId, setActivityId] = useState(null);

    const handleClick = useCallback(() => {
      setClickCount(prevCount => prevCount + 1);
    }, []);

    const logActivity = useCallback(async (accion, detalles = {}) => {
      if (currentUser) {
        try {
          const response = await axios.post('http://localhost:3001/bitacora', {
            usuarioId: currentUser.id,
            accion,
            detalles: {
              ...detalles,
              userAgent: navigator.userAgent,
              screenSize: `${window.screen.width}x${window.screen.height}`,
              language: navigator.language,
              platform: navigator.platform,
              referrer: document.referrer,
              currentPath: window.location.pathname,
            },
          });
          console.log('Actividad registrada:', response.data);
          return response.data.registro.id;
        } catch (error) {
          console.error('Error al registrar actividad:', error);
        }
      }
    }, [currentUser]);

    const updateActivity = useCallback(async (id, updates) => {
      if (currentUser && id) {
        try {
          const response = await axios.put(`http://localhost:3001/bitacora/${id}`, updates);
          console.log('Actividad actualizada:', response.data);
        } catch (error) {
          console.error('Error al actualizar actividad:', error);
        }
      }
    }, [currentUser]);

    useEffect(() => {
      let timeoutId;
      if (currentUser && !activityId) {
        setSessionStart(new Date());
        document.addEventListener('click', handleClick);
        timeoutId = setTimeout(() => {
          logActivity('Inicio de sesión').then(setActivityId);
        }, 1000); // Espera 1 segundo antes de registrar el inicio de sesión
      }

      return () => {
        document.removeEventListener('click', handleClick);
        if (timeoutId) clearTimeout(timeoutId);
        if (activityId) endSession();
      };
    }, [currentUser, handleClick, logActivity, activityId]);

    const endSession = useCallback(async () => {
      if (currentUser && sessionStart && activityId) {
        const sessionEnd = new Date();
        const sessionDuration = Math.round((sessionEnd - sessionStart) / 1000); // duración en segundos
        await updateActivity(activityId, {
          accion: 'Fin de sesión',
          fechaHoraFin: sessionEnd,
          tiempoSesion: sessionDuration,
          cantidadClics: clickCount,
        });
        setActivityId(null);
        setSessionStart(null);
        setClickCount(0);
      }
    }, [currentUser, sessionStart, activityId, clickCount, updateActivity]);

    useEffect(() => {
      window.addEventListener('beforeunload', endSession);
      return () => {
        window.removeEventListener('beforeunload', endSession);
      };
    }, [endSession]);

    return <WrappedComponent {...props} />;
  };
};

export default ActivityTracker;
