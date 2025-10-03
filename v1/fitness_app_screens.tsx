import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const FitnessAppScreens = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const screens = {
    welcome: (
      <div className="h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Robo<span style={{ color: '#00D4FF' }}>Qoach</span>
        </h1>
        <p className="text-xl text-center mb-12 opacity-90" style={{ color: '#00D4FF' }}>
          The AI Coaching Layer for Human Performance
        </p>
        <button 
          onClick={() => setCurrentScreen('goal')}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition"
        >
          Get Started
        </button>
      </div>
    ),

    goal: (
      <div className="h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">What's your goal?</h2>
          <p className="text-gray-600 mb-8">We'll personalize your experience</p>
          <div className="space-y-4">
            {['Build Muscle', 'Lose Weight', 'Stay Active', 'Get Stronger'].map((goal) => (
              <button
                key={goal}
                onClick={() => setCurrentScreen('coach')}
                className="w-full bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left flex items-center justify-between"
              >
                <span className="font-semibold text-lg">{goal}</span>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </button>
            ))}
          </div>
          <button className="w-full mt-6 text-gray-500 underline">Skip for now</button>
        </div>
      </div>
    ),

    coach: (
      <div className="h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Choose your coach style</h2>
          <p className="text-gray-600 mb-8">How do you like to be motivated?</p>
          
          <div className="space-y-4">
            <div 
              onClick={() => setCurrentScreen('camera')}
              className="bg-green-50 border-2 border-green-500 p-6 rounded-2xl cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">😊 Supportive</h3>
              <p className="text-gray-700 italic">"Great form! You've got this!"</p>
            </div>
            
            <div 
              onClick={() => setCurrentScreen('camera')}
              className="bg-white border-2 border-gray-200 p-6 rounded-2xl cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">😐 Neutral</h3>
              <p className="text-gray-700 italic">"12 reps completed. Continue."</p>
            </div>
            
            <div 
              onClick={() => setCurrentScreen('camera')}
              className="bg-red-50 border-2 border-red-500 p-6 rounded-2xl cursor-pointer hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">💪 Drill Sergeant</h3>
              <p className="text-gray-700 italic">"Is that all you got? 5 MORE!"</p>
            </div>
          </div>
        </div>
      </div>
    ),

    camera: (
      <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
        <Ionicons name="camera" size={80} color="#00D4FF" style={{ marginBottom: 24 }} />
        <h2 className="text-2xl font-bold mb-4 text-center">Camera Setup</h2>
        <p className="text-center mb-8 text-gray-300 max-w-md">
          We need camera access to analyze your form and count reps in real-time
        </p>
        <div className="bg-gray-800 p-6 rounded-2xl mb-8 max-w-md">
          <h3 className="font-semibold mb-3">Quick Tips:</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Place phone 6-8 feet away</li>
            <li>• Make sure full body is visible</li>
            <li>• Good lighting helps accuracy</li>
          </ul>
        </div>
        <button 
          onClick={() => setCurrentScreen('calibration')}
          className="bg-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition"
        >
          Enable Camera
        </button>
      </div>
    ),

    calibration: (
      <div className="h-screen bg-gray-900 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-96 border-4 border-green-500 border-dashed rounded-3xl"></div>
        </div>
        
        <div className="absolute top-8 left-0 right-0 text-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full inline-block font-semibold">
            ✓ Body Detected - Perfect!
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-blue-600 py-4 rounded-full font-semibold text-white text-lg"
          >
            Continue to Workout
          </button>
        </div>
      </div>
    ),

    dashboard: (
      <div className="h-screen bg-black flex flex-col">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 text-black">
          <h2 className="text-xl mb-2">Welcome back! 👋</h2>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold" style={{ color: '#00D4FF' }}>3 Day Streak 🔥</div>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <button 
            onClick={() => setCurrentScreen('workout')}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black p-6 rounded-2xl shadow-lg mb-6 hover:shadow-xl transition"
          >
            <Ionicons name="play" size={32} color="#00D4FF" style={{ marginBottom: 8 }} />
            <div className="text-2xl font-bold">Start Workout</div>
          </button>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black p-4 rounded-xl shadow-sm border border-cyan-400">
              <div className="text-gray-400 text-sm">This Week</div>
              <div className="text-2xl font-bold" style={{ color: '#00D4FF' }}>247 reps</div>
            </div>
            <div className="bg-black p-4 rounded-xl shadow-sm border border-cyan-400">
              <div className="text-gray-400 text-sm">Minutes</div>
              <div className="text-2xl font-bold" style={{ color: '#00D4FF' }}>45 min</div>
            </div>
          </div>
          <div className="bg-black p-4 rounded-xl shadow-sm border border-cyan-400">
            <h3 className="font-semibold mb-3 flex items-center" style={{ color: '#FFD700' }}>
              <MaterialCommunityIcons name="trophy" size={20} color="#FFD700" style={{ marginRight: 8 }} />
              Weekly Leaderboard
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>1. Sarah M.</span>
                <span className="font-semibold">1,247 reps</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2. Mike K.</span>
                <span className="font-semibold">1,103 reps</span>
              </div>
              <div className="flex justify-between items-center bg-cyan-900 p-2 rounded">
                <span className="font-semibold">47. You</span>
                <span className="font-semibold">247 reps</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t bg-black p-4 flex justify-around">
          <button className="flex flex-col items-center text-cyan-400">
            <Ionicons name="home" size={24} color="#00D4FF" style={{ marginBottom: 4 }} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Ionicons name="time" size={24} color="#888" style={{ marginBottom: 4 }} />
            <span className="text-xs">History</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <MaterialCommunityIcons name="trophy" size={24} color="#FFD700" style={{ marginBottom: 4 }} />
            <span className="text-xs">Leaderboard</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <FontAwesome name="user" size={24} color="#888" style={{ marginBottom: 4 }} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    ),

    workout: (
      <div className="h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-bold mb-6">Choose Exercise</h2>
        
        <div className="space-y-4">
          {[
            { name: 'Squats', muscles: 'Legs, Glutes', duration: '5-10 min', difficulty: 'Beginner' },
            { name: 'Push-ups', muscles: 'Chest, Arms', duration: '5-8 min', difficulty: 'Beginner' },
            { name: 'Planks', muscles: 'Core', duration: '3-5 min', difficulty: 'Beginner' },
            { name: 'Lunges', muscles: 'Legs, Glutes', duration: '8-12 min', difficulty: 'Intermediate' },
            { name: 'Burpees', muscles: 'Full Body', duration: '10-15 min', difficulty: 'Advanced' }
          ].map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => setCurrentScreen('live')}
              className="w-full bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition text-left"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{exercise.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {exercise.difficulty}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{exercise.muscles}</div>
              <div className="text-xs text-gray-500">⏱ {exercise.duration}</div>
            </button>
          ))}
        </div>
      </div>
    ),

    live: (
      <div className="h-screen bg-black relative">
        {/* Camera feed simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-black to-cyan-900"></div>
        {/* Skeleton overlay simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto mb-20"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto mb-32"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto"></div>
          </div>
        </div>
        {/* Top overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex justify-between items-center text-cyan-400">
            <div className="text-6xl font-bold">12</div>
            <div className="text-right">
              <div className="text-sm text-cyan-200">TIME</div>
              <div className="text-2xl font-bold">2:34</div>
            </div>
          </div>
        </div>
        {/* Feedback bubble */}
        <div className="absolute top-32 left-0 right-0 flex justify-center px-6">
          <div className="bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg">
            ✓ Perfect form! Keep going!
          </div>
        </div>
        {/* Form accuracy indicator */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-cyan-400">
            <div className="text-xs mb-2">FORM</div>
            <div className="text-3xl font-bold">95%</div>
          </div>
        </div>
        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-center">
            <button className="text-cyan-400">
              <Ionicons name="pause" size={48} color="#00D4FF" style={{ borderWidth: 2, borderColor: '#00D4FF', borderRadius: 24, padding: 8 }} />
            </button>
            <button 
              onClick={() => setCurrentScreen('summary')}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold"
            >
              End Workout
            </button>
          </div>
        </div>
      </div>
    ),

    summary: (
      <div className="h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Workout Complete!</h2>
        <p className="text-gray-600 mb-8">Great job on your squats</p>
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600">Total Reps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5:23</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600">Form Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">47</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="text-sm text-gray-600 mb-2">Progress</div>
            <div className="font-semibold text-green-600">+3 reps from last time! 🚀</div>
          </div>
        </div>
        
        <div className="w-full max-w-md space-y-3">
          <button 
            onClick={() => setCurrentScreen('workout')}
            className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold"
          >
            Log Another Exercise
          </button>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-gray-200 text-gray-700 py-4 rounded-full font-semibold"
          >
            Finish Workout
          </button>
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl">
      {/* Screen navigation for demo */}
      <div className="bg-gray-800 p-2 flex gap-1 overflow-x-auto text-xs">
        {Object.keys(screens).map(screen => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-3 py-1 rounded whitespace-nowrap ${
              currentScreen === screen 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {screen}
          </button>
        ))}
      </div>
      
      {/* Current screen */}
      {screens[currentScreen]}
    </div>
  );
};

export default FitnessAppScreens;