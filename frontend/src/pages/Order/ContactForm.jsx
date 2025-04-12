import React from 'react'

function ContactForm({ shippingInfo, handleChange, loading }) {
  return (
    <div className='flex flex-col gap-4 w-full p-3 md:p-6 text-black md:w-1/2'>
      <h2 className="text-blue-900 text-2xl font-bold mb-2 text-center underline">Shipping Address</h2>

      <div className="flex flex-col gap-3">
        {["address", "city", "state", "pincode", "phoneNo"].map((field) => (
          <div key={field} className='flex flex-col'>
            <label className="font-medium capitalize mb-1">{field === 'phoneNo' ? "Phone Number" : field}</label>
            <input
              type={field === "pincode" || field === "phoneNo" ? "number" : "text"}
              name={field}
              value={shippingInfo[field]}
              required
              disabled={loading}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactForm;
