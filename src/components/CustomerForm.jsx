import { useState } from 'react';
import { createCustomer } from '../api/CustomerApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function CustomerForm({ onSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumbers, setMobileNumbers] = useState(['']);
  const navigate = useNavigate();

  const handleNumberChange = (index, value) => {
    const updated = [...mobileNumbers];
    updated[index] = value;
    setMobileNumbers(updated);
  };

  const addMobileField = () => {
    setMobileNumbers([...mobileNumbers, '']);
  };

  const removeMobileField = (index) => {
    const updated = mobileNumbers.filter((_, i) => i !== index);
    setMobileNumbers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      mobileNumbers: mobileNumbers.map(num => ({ mobileNumber: num })),
    };
    try {
      const response = await createCustomer(payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("Customer created successfully");
        setFirstName('');
        setLastName('');
        setMobileNumbers(['']);
        navigate('/');
      }
    } catch (err) {
      const backendMsg = err?.response?.data?.message || 'Failed to create customer';
      toast.error(backendMsg);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 mt-16 bg-white max-w-4xl mx-auto rounded shadow space-y-4">
      <h1 className="text-lg text-center font-semibold">Create Customer</h1>

      <input type="text" placeholder="First Name" className="w-full border p-2 rounded" value={firstName}
        onChange={(e) => setFirstName(e.target.value)} require />

      <input type="text" placeholder="Last Name" className="w-full border p-2 rounded" value={lastName}
        onChange={(e) => setLastName(e.target.value)} required />

      <div className="space-y-2">

        {mobileNumbers.map((mobileNumber, index) => (
          <div key={index} className="flex gap-2">
            <input type="text" placeholder="10-digit Mobile Number" className="flex-1 border p-2 rounded" value={mobileNumber} onChange={(e) => handleNumberChange(index, e.target.value)} pattern="\d{10}"
              required />
            {mobileNumbers.length > 1 && (
              <button type="button" onClick={() => removeMobileField(index)} className="text-red-500">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addMobileField} className="text-blue-500">
          + Add Mobile Number
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
