import React from 'react';
import ContactForm from './contact/ContactForm';

export default function Contact() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400">Get in touch with us instantly</p>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <p className="text-white mb-4">Talk with customer support to find answers faster!</p>
        </div>
      </div>
    </section>
  );
}