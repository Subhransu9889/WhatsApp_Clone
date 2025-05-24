import React from 'react'

function Interface() {

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="p-8 bg-white shadow-lg rounded-2xl w-80 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Logo"
          className="w-20 h-20 mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to WhatsApp
        </h1>
        <p className="text-gray-600 mb-6">
          Please log in to continue chatting with your friends.
        </p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
        >
          Login with Google
        </button>
      </div>
    </div>
    </>
  )
}

export default Interface