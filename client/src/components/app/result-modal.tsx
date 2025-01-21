
import { Predict } from "@/api/serivce"
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react"

const ResultModalComponent = (data) => {
  const containerStyle: React.CSSProperties = {
      scrollbarWidth: 'none', // For Firefox
      msOverflowStyle: 'none', // For Edge and IE
  };
    
  const [isOpen, setIsOpen] = useState(false) 
  const [isLoading, setIsLoading] = useState(false)
  const [res, setRes] = useState({
    'Decision Tree': [""],
    // 'Gradient Boosting':  [""],
    'Elastic Net':  [""],
    // 'Lasso':  [""],
    'LightGBM':  [""],
    'Neural Network':  [""],
    'Random Forrest': [""],
    // 'Ridge':  [""],
    'XGBoost':  [""],
  })

  
  function open() {
    setIsOpen(true)
    fetch();
  }

  function close() {
    setIsOpen(false)
  }

  const fetch = async () =>{
    setIsLoading(true)
    const res = await Predict(data)
    setRes(res.predicted_prices)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  const [cardModel] = useState([
    {
      title: 'Decision Tree',
      src: '',
      emoji: '🌲',
    },
    {
      title: 'Elastic Net',
      src: '',
      emoji: '🥅',
    },
    // {
    //   title: 'Gradient Boosting',
    //   src: '',
    //   emoji: '🌠',
    // },
    // {
    //   title: 'Lasso',
    //   src: '',
    //   emoji: '🪢',
    // },
    {
      title: 'LightGBM',
      src: '',
      emoji: '💡',
    },
    {
      title: 'Neural Network',
      src: '',
      emoji: '🧠',
    },
    {
      title: 'Random Forrest',
      src: '',
      emoji: '🌳',
    },
    // {
    //   title: 'Ridge',
    //   src: '',
    //   emoji: '🛣️',
    // },
    {
      title: 'XGBoost',
      src: '',
      emoji: '⚡',
    },
  ])


  return (
    <>
      <Button
        onClick={open}
        className="rounded-md mt-4 bg-white/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-white/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Predict
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="items-center justify-center  border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
              w-full max-w-[1200px] max-h-[94vh] overflow-y-auto rounded-xl bg-black/50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl/7 mb-4 font-medium text-white motion-preset-slide-right-md motion-duration-500">
                Prediction Result
              </DialogTitle>

              {
                isLoading && (
                  <div className="mt-4 w-full flex flex-col items-center justify-center py-12">
                    <img className="motion-preset-fade-md max-h-32 aspect-square rounded-xl" 
                    src="https://media.tenor.com/YRQgk2toLv4AAAAi/huggy-cute.gif"/>
                    <p className="motion-preset-pulse-md text-md/6 font-medium text-white">Loading...</p>
                  </div>
                )
              }



              {/* diaog content */}
              {
                !isLoading && res && 
                <div className="grid grid-cols-3 gap-4" style={containerStyle}>

                  {cardModel.sort((a, b) => parseFloat(res[a?.title][0].replace(/[$,]/g, "")) - parseFloat((res[b?.title][0]).replace(/[$,]/g, ""))).map((mod,key) =>(
                    <div className="motion-opacity-in-0 motion-delay-200 motion-preset-slide-down-lg motion-duration-300 motion-ease-spring-bouncy" 
                    key={key}>
                      <div className=" w-full relative max-w-xs">
                        {/* gradient bg */}
                        <div className="absolute inset-0 h-full opacity-75 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 transform scale-[0.60] rounded-sm blur-3xl" />
                        
                        <div className="relative shadow-xl bg-gray-900/50 backdrop-blur-sm backdrop-opacity-10 border border-gray-700  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                          <div className="h-5 w-5 rounded-full border flex relative border-gray-500">
                            <span className="absolute right-1/2 top-[42%] translate-x-1/2 -translate-y-1/2 rounded-full text-gray-300">
                              {mod.emoji}
                            </span>
                          </div>
                
                          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                            {mod.title}
                          </h1>
                
                          <p className="font-normal text-base text-slate-200 mb-4 relative z-50">
                            Prediction Price: { res[mod?.title][0] ||  null }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                    }
                </div>
                  
                
              }

              <div className="mt-4 motion-preset-fade-lg">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ResultModalComponent