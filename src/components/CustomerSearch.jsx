import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";

export default function CustomerSearch({ onSearch }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {};
    if (firstName.trim()) filters.firstName = firstName;
    if (lastName.trim()) filters.lastName = lastName;
    if (mobileNumber.trim()) filters.mobileNumber = mobileNumber;

    onSearch(filters);
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setMobileNumber('');
    onSearch({}); // Clear filters
  };

  return (
    <form onSubmit={handleSearch} className="p-4 bg-white rounded shadow border-b-2 space-y-4 mt-4">
      <div>
        <h2 className="text-lg font-semibold text-center">Search Customers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border p-2 rounded"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-2">
          <FaSearch /> Search
        </button>
        <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-2 py-1 rounded flex items-center gap-2">
          <RiResetLeftFill /> Reset
        </button>
      </div>
    </form>
  );
}
