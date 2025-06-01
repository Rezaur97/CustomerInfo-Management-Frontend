import { useState } from 'react';
import { addMobileNumber, deleteCustomerByMobile, deleteMobileNumber } from '../api/CustomerApi';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';


export default function CustomerList({ customers, onRefresh }) {
  const [newMobiles, setNewMobiles] = useState({});

  const handleAddMobile = async (customerId) => {
    const number = newMobiles[customerId];
    if (!number || number.length !== 10) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }

    try {
      await addMobileNumber(customerId, { mobileNumber: number });
      toast.success('Mobile number added successfully');
      setNewMobiles((prev) => ({ ...prev, [customerId]: '' }));
      onRefresh();
    } catch (err) {
      console.error('Error adding mobile:', err);
      const msg = err?.response?.data?.message || 'Failed to add mobile number';
      toast.error(msg);
    }
  };



  const handleDeleteCustomer = async (number) => {
    try {
      await deleteCustomerByMobile(number);
      toast.success('Customer deleted successfully');
      onRefresh();
    } catch (err) {
      console.error('Error Deleting customer:', err);
      const msg = err?.response?.data?.message || 'Failed to Delete customer';
      toast.error(msg);
    }
  };

  const handleDeleteMobile = async (number) => {
    try {
      await deleteMobileNumber(number);
      toast.success('Number deleted successfully');
      onRefresh();
    } catch (err) {
      console.error('Error Deleting number:', err);
      const msg = err?.response?.data?.message || 'Failed to Delete number';
      toast.error(msg);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {customers.length === 0 ? (
        <p className="text-gray-600">No customers found.</p>
      ) : (
        customers.map((cust) => (
          <div key={cust.id} className="border p-4 rounded shadow bg-white ">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold">
                  Name - {cust.firstName} {cust.lastName}
                </h2>
                <ul className="list-disc pl-6 items-center">
                  {cust.mobileNumbers.map((m) => (
                    <li key={m.id}>
                      {m.mobileNumber}{' '}
                      <button
                        onClick={() => handleDeleteMobile(m.mobileNumber)}
                        className="text-red-600 text-xs ml-2 font-semibold rounded-lg">
                        Delete Number
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleDeleteCustomer(cust.mobileNumbers[0]?.mobileNumber)}
                className="bg-red-600 text-white text-xs font-semibold flex justify-center gap-2 items-center px-2 py-1 rounded-lg" >
                <MdDelete />Delete Customer
              </button>
            </div>

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newMobiles[cust.id] || ''}
                onChange={(e) =>
                  setNewMobiles((prev) => ({ ...prev, [cust.id]: e.target.value }))
                }
                placeholder="New Mobile Number"
                className="border p-2 rounded w-60"
              />
              <button onClick={() => handleAddMobile(cust.id)}
                className="bg-blue-400 text-white text-xs font-semibold flex justify-center items-center gap-2 px-1 rounded-lg">
                <FaPlus /> Add Number
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
