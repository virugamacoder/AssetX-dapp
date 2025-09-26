import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Simple Tailwind Test */}
      <div className="bg-red-500 text-white p-4 text-center">
        🔥 TAILWIND TEST: This should be RED background with WHITE text
      </div>
      <div className="bg-blue-500 text-yellow-300 p-8 m-4 rounded-lg shadow-lg">
        🟦 BLUE background, YELLOW text, padding, margin, rounded corners, shadow
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/favicon.ico" className="logo react" alt="React logo" />
        </a>
        {/* Comprehensive Tailwind CSS Test */}
        <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">🎨 Tailwind CSS Test Suite</h2>
          
          {/* Color & Typography Test */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Colors & Typography</h3>
              <p className="text-gray-600 mb-2">Regular text</p>
              <p className="text-lg font-medium text-green-600 mb-2">Medium green text</p>
              <p className="text-sm italic text-red-500">Small italic red text</p>
            </div>
            
            {/* Spacing & Layout Test */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">Spacing & Layout</h3>
              <div className="flex space-x-2 mb-3">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-8 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Interactive Elements Test */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">Interactive Elements</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200">
                Secondary Button
              </button>
              <button className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-all duration-200">
                Outline Button
              </button>
            </div>
          </div>
          
          {/* Responsive & Flexbox Test */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Responsive Design</h3>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm">
                Mobile First
              </div>
              <div className="hidden sm:block bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm">
                Tablet+
              </div>
              <div className="hidden md:block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm">
                Desktop+
              </div>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Tailwind CSS is working! ✅
            </div>
          </div>
        </div>  
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
