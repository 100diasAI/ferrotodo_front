import { getUsuarios } from '../../redux/actions/checkout';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import './graficoLineas.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GraficosBarras } from './styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function BarChart() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsuarios());
        // console.log("me rompo")
    }, [])

    const usuarios = useSelector((state) => state.checkout.usuarios);
    // console.log(usuarios.length)

    const scores = [usuarios.length, usuarios.reduce((acc, el) => acc += el.isAdmin === true, 0), usuarios.reduce((acc, el) => acc += el.bloqueado === true, 0)];
    const labels = ["Usuarios", "Admins", "Bloqueados"];
    const numeros = usuarios.reduce((acc, el) => acc += el.isAdmin === true, 0)
    // console.log(numeros)

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Usuarios',
                font: {
                    size: 20
                }
            },
        },
    };

    const data = {
            datasets: [
                {
                    label: "Usuarios",
                    tension: 0.3,
                    data: scores,
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.45)",
                },
            ],
            labels,
        };

    return (
        <div style={{height: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
            <Bar data={data} options={options} />
        </div>
    );
}
