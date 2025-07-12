import React from 'react';

export default function MainPage() {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center min-h-screen  text-white">
      <div className="max-w-xl text-2xl leading-relaxed text-blue-400 font-medium mr-30">
        <p>
          Welcome to <span className="text-white font-bold text-2xl">BlogSpace</span>,<br />
          <span className="text-blue-200">
            your digital space to share ideas, explore creativity, and dive deep into thoughts that matter.
          </span><br /><br />
          Whether you're here to <span className="text-white italic">read</span>, <span className="text-white italic">write</span>, or <span className="text-white italic">reflect</span> — you're in the right place.<br />
          Let’s build something meaningful together 💡.
        </p>
      </div>

      <div>
        <img
          src="/blog.jpg"
          alt="Blog Banner"
          className="w-100 h-100 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
