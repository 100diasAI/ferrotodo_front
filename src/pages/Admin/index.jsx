import React from "react";
import BarChart from "../../components/DashboardAdmin/graficoBarras";
import LineChart from "../../components/DashboardAdmin/graficoLineas";
import Totales from "../../components/DashboardAdmin/Totales";
import './index.css'

export default function Admin() {
    document.title = "FerreTodo - Admin";
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    return (
        <div style={{maxWidth: '100%', overflowX: 'hidden', padding: '20px'}}>
            <Totales />
            <div className="graficos" style={{display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '20px'}}>
                <LineChart />
                <BarChart />
            </div>
        </div>
    );
}
