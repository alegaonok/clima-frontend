import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La URL de tu API de Django. Asegúrate de que coincida con la dirección donde corre tu servidor.
    const API_URL = 'http://localhost:8000/api/weather/';
    
    // El nombre de la ciudad que quieres buscar.
    const CITY_NAME = 'Buenos Aires';

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?city=${CITY_NAME}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (e) {
        console.error("Could not fetch weather data: ", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Cargando datos del clima...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-2">Error al cargar el clima</h1>
          <p>{error}</p>
          <p className="mt-4 text-sm">Asegúrate de que tu servidor de Django está corriendo en http://localhost:8000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{weatherData.city}</h2>
          <p className="text-gray-500">{weatherData.country}</p>
        </div>

        <div className="flex justify-center items-center my-6">
          <div className="text-6xl font-extrabold text-blue-600">
            {weatherData.temperature}°C
          </div>
        </div>

        <div className="flex justify-around text-center border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Humedad</span>
            <span className="font-medium text-gray-700">{weatherData.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Viento</span>
            <span className="font-medium text-gray-700">{weatherData.wind_speed} m/s</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 capitalize">{weatherData.description}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
