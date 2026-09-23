import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import DoctorsView from './components/DoctorsView';
import DepartmentsView from './components/DepartmentsView';
import RoomsBedsView from './components/RoomsBedsView';
import BillingView from './components/BillingView';
import LaboratoryView from './components/LaboratoryView';
import PatientsView from './components/PatientsView';
import InvoicesView from './components/InvoicesView';
import InsuranceView from './components/InsuranceView';
import PharmacyView from './components/PharmacyView';
import PatientHistoryView from './components/PatientHistoryView';
import DashboardOverview from './components/DashboardOverview';


function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        // Redirect unauthenticated user to login screen
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Set default view to dashboard overview
    const [activeTab, setActiveTab] = useState(
        user?.role === 'BILLING' ? 'rooms' : 'dashboard'
    );

    if (!user) return null;

    return (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
            {activeTab === 'doctors' && <DoctorsView />}
            {activeTab === 'departments' && <DepartmentsView />}
            {activeTab === 'rooms' && <RoomsBedsView />}
            {activeTab === 'billing' && <BillingView />}
            {activeTab === 'laboratory' && <LaboratoryView />}
            {activeTab === 'patients' && <PatientsView />}
            {activeTab === 'pharmacy' && <PharmacyView />}
            {activeTab === 'medical-history' && <PatientHistoryView />}
            {activeTab === 'insurance' && <InsuranceView />}
            {activeTab === 'invoices' && <InvoicesView />}
        </Layout>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}