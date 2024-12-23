import React from 'react';

export default function LocationMap() {
  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      <iframe
        title="Kamalo City Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.2868125289154!2d18.5549!3d-33.9076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d096658b9d9%3A0x9f3f0e0d0f0f0f0f!2s90%20Voortrekker%20Rd%2C%20Goodwood%2C%20Cape%20Town%2C%207460!5e0!3m2!1sen!2sza!4v1629789456789!5m2!1sen!2sza"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}