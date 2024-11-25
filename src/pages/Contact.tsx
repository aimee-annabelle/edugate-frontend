import { useState } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="mt-24 px-36 py-10">
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <EnvelopeIcon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p>support@edugate.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <PhoneIcon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p>+250 788 123 456</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p>Kigali, Rwanda</p>
                
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 h-32"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

