import { useState } from 'react'
import './App.css'
import FormComponent from './components/app/form'
import ResultModalComponent from './components/app/result-modal'
import { BackgroundGradient } from './components/ui/background-gradient'

function App() {
  const [formData, setFormData] = useState({
    "Car Model": 'Pruis',
    "Car Makes": 'Toyota',
    "Year": '2002',
    "Condition": 'Used',
    "Tax Type": 'Tax Paper',
    "Transmission": 'Auto',
    "Body Type": 'SUV',
    "Fuel": 'Petrol',
    "Color": 'White',
  });

  // Callback function to receive data from the child
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
        <div className="w-screen max-w-[1600px] m-auto h-screen flex flex-col items-center p-8 rounded-md overflow-hidden">
          <h1 className="md:text-4xl text-2xl lg:text-6xl font-bold text-center relative mb-3
            bg-no-repeat bg-gradient-to-r from-blue-200 via-violet-500 to-pink-500 text-transparent bg-clip-text
            motion-preset-shrink">
            Car Price Prediction
          </h1>
          <div className="w-[40rem] h-40 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
    
            {/* <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.1}
              particleDensity={1}
              className="w-full"
              particleColor="#FFFFFF"
            /> */}
            <img className='absolute opacity-20 right-1/2 motion-translate-x-in-[400%] scale-75 motion-opacity-in-0 ease-in-out motion-duration-1000 motion-delay-500' 
            src='https://dealerimages.dealereprocess.com/image/upload/c_limit,f_auto,fl_lossy,w_600/v1/svp/dep/22toyotagrsupra20cp5t/toyota_22grsupra20cp5t_angularfront_absolutezero'/>
            
            <img className='absolute opacity-20 left-1/2 motion-translate-x-in-[-400%] motion-opacity-in-0 ease-in-out motion-duration-1000 motion-delay-700' 
            src='https://phnompenh.bentleymotors.com/picserver1/userdata/25/11599/3FAdVwEMPE/631_mulliner_front_hero%20600x300.png'/>
    
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>

          {/* this is where we write the form input and the button to predict the model */}
          <BackgroundGradient className='motion-delay-100 motion-preset-fade-lg motion-duration-1000'>
            <FormComponent formData={formData} onChange={handleFormDataChange}/>
          </BackgroundGradient>

          <ResultModalComponent data={formData} />

        </div>
    </>
  )
}

export default App
