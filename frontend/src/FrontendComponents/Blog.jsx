import React from 'react'

export default function Blog() {
  return (
    <div className='p-3 mt-8 ml-8 w-150 h-auto rounded overflow-hidden shadow-lg bg-slate-900 text-white'>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">Exploring the Beauty of Nature</h1>
        <p className="text-sm text-gray-500 mt-2">By <span className="font-medium text-blue-600">Maryam Zahid</span> • July 12, 2025</p>
      </div>

      <div className="mt-6  leading-relaxed text-white p-4">
        <p>
          Nature has always been an inspiration for artists, poets, and thinkers. The serenity and tranquility that it offers can heal even the most troubled minds.
        </p>
        <p className="mt-4">
          Whether it's the sound of rustling leaves, the colors of the sunset, or the fragrance of fresh rain—nature reminds us of life’s simplicity and beauty. In this blog, I’ll share how spending time outdoors has reshaped my perspective.
        </p>
        <p className="mt-4">
          Take a moment today to step outside, breathe deeply, and appreciate the natural world around you 🌿.
        </p>
      </div>
    </div>
  )
}
