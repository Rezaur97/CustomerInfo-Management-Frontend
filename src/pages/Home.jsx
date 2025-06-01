import { useEffect, useState } from 'react';
import { getCustomers } from '../api/customerapi';
import CustomerSearch from '../components/CustomerSearch';
import CustomerList from '../components/CustomerList';
import { Link } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";

export default function Home() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getCustomers(filters);
            setCustomers(res.data);
        } catch (err) {
            setError('Failed to load customers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers(); // Load all customers on page load
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">

            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold text-center">Customer Management</h1>
                <Link to={"/create"} className="bg-red-400 text-white px-4 py-2 rounded flex items-center gap-2">
                    <FaUserPlus />Create New Customer
                </Link>
            </div>

            <CustomerSearch onSearch={fetchCustomers} />

            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}

            {!loading && !error && (
                <CustomerList customers={customers} onRefresh={() => fetchCustomers()} />
            )}
        </div>
    );
}
