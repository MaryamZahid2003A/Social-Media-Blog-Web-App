import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      {/* Edit Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-md px-3 py-2 text-md font-semibold text-blue-700 transition cursor-pointer"
      >
        <FiEdit size={20} />
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-gray-300/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white">Edit Profile</h2>
            <form className="mt-4 bg-slate-900">
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-200">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-200">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Profession
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                    Location
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-[#18173a] text-white px-4 py-3 text-base focus:outline-2 focus:outline-blue-600"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
