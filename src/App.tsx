
import { Header } from './components/Header/Header.tsx'
import './media.css'
import './App.css'
import { FetchCityDisplay } from './components/CityWeather/WeatherContainer.tsx';
import { CityInput } from './components/CityInput/CityInput.tsx';

function App() {

  return (
    <>
      <Header />
      <main className='container flex main'>
        <h1 className='title main__title'>
          How's the sky looking today?
        </h1>
        <CityInput />
        <FetchCityDisplay />
      </main>
    </>
  );
}

export default App
