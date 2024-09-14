import React, { useEffect, useRef, useState } from 'react'
import { clapMp3, closedHhMp3, heater1Mp3, heater2Mp3, heater3Mp3, heater4Mp3, kickMp3, kicknhatMp3, openHhMp3 } from '../Utils'


const Drum_machine = () => {

    const [state, setState] = useState({
        power: true,
        dragging: false,
        volume:1,
        currentAudio: null
    })

    const volumePadRef = useRef()

    const {power,dragging,volume,currentAudio} = state;
    
    const playsound = (audioId,buttonId)=>{
       
        const audio = document.getElementById(audioId)
        const display = document.getElementById('display')
        display.innerText = null
        console.log("audioId:",audioId)

        if(audio && power){
            audio.play()
            audio.volume = volume
            setState((prevState)=>({
                ...prevState,
                currentAudio : audio
            }))
            display.innerText = buttonId
        }
    }

    const handleKeyPress = (e)=>{
        const audioId = e.key.toUpperCase();
        const buttonId = document.getElementById(audioId).parentElement.id
        

        if(buttonId){
            playsound(audioId,buttonId)
        }
        
    }

    const handlePower = () => {
        setState((prevState)=>({
            ...prevState,
            power:!prevState.power
        })) 
    }

    const handleMouseDown = (e) => {
        setState((prevState)=>({
            ...prevState,
            dragging: true
        }))

        handleMouseMove(e)
    }

    const handleMouseMove = (e)=>{
        if(dragging && volumePadRef.current){
            
            const x = e.clientX - volumePadRef.current.getBoundingClientRect().left;
            const rectWidth = volumePadRef.current.getBoundingClientRect().width;
            const newVolume = Math.min(Math.max(x / rectWidth, 0), 1);
            setState((prevState)=>({
                ...prevState,
                volume: newVolume,
            }))

            if(currentAudio){
                currentAudio.volume = newVolume;
            }
        }
    }

    const handleMouseUp = () => {
        setState((prevState)=>({
            ...prevState,
            dragging: false
        }))
    }

    //useeffect to run event event listerner during mounting
    useEffect(()=>{
        document.addEventListener('keydown',handleKeyPress)

        return() => {
            document.removeEventListener('keydown',handleKeyPress)
        }
    },[])


  return (
    <div className='screen-max-width h-screen flex-center'>
      <div id="drum-machine" className='w-[50vw] h-[50vh] bg-gray-100 border-[5px] border-yellow flex-center gap-20' >
          <div id="drum-pad" className='grid grid-cols-3 grid-rows-3 gap-4 justify-center items-center'>
             <button id ="heater1" className='drum-pad btn' onMouseDown={(e)=>playsound('Q',e.target.id)}>Q
                   <audio id='Q' className='clip' src={heater1Mp3}>
                        <source src={heater1Mp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="heater2" className='drum-pad btn' onClick={(e)=>playsound('W',e.target.id)}>W
                  <audio id='W' className='clip' src={heater2Mp3}>
                        <source src={heater2Mp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="heater3" className='drum-pad btn' onClick={(e)=>playsound('E',e.target.id)}>E
                  <audio id='E' className='clip'src={heater3Mp3}>
                        <source src={heater3Mp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="heater4" className='drum-pad btn' onClick={(e)=>playsound('A',e.target.id)}>A
                  <audio id='A' className='clip'src={heater4Mp3}>
                        <source src={heater4Mp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="clap" className='drum-pad btn' onClick={(e)=>playsound('S',e.target.id)}>S
                   <audio id='S' className='clip' src={clapMp3}>
                        <source src={clapMp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="openHH" className='drum-pad btn' onClick={(e)=>playsound('D',e.target.id)}>D
                   <audio id='D' className='clip' src={openHhMp3}>
                        <source src={openHhMp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="kickNhat" className='drum-pad btn' onClick={(e)=>playsound('Z',e.target.id)}>Z
                   <audio id='Z' className='clip' src={kicknhatMp3}>
                        <source src={kicknhatMp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id="kick" className='drum-pad btn' onClick={(e)=>playsound('X',e.target.id)}>X
                  <audio id='X' className='clip' src={kickMp3}>
                        <source src={kickMp3} type="audio/mp3"/>
                   </audio>
             </button>
             <button id ="closedHH" className='drum-pad btn' onClick={(e)=>playsound('C',e.target.id)}>C
                   <audio id='C' className='clip' src={closedHhMp3}>
                        <source src={closedHhMp3} type="audio/mp3"/>
                   </audio>
             </button>
          </div>
          <div id="display-pad" className='grid grid-rows-3 justify-center items-center w-[40%]'>
              <div id="power-switch" className='flex flex-col-center'>
                  <p className='font-semibold'>Power</p>
                  <div className='power-btn relative'>
                      <div id="toggle-switch" 
                      className={`toggle-switch absolute top-0 left-0 ${power ? 'toggle-switch-on' : 'toggle-switch-off'}`}
                      onClick={handlePower}></div>
                  </div>
              </div>

              <div id="display-container" className='display-board flex-center'>
                <div id='display'></div>
              </div>

              <div id="volume-controller" className='flex flex-col-center'>
                   <p className='font-semibold pb-3'>Volume</p>
                   <div className='volume-pad relative'
                   ref={volumePadRef}
                   onMouseMove={handleMouseMove}
                   onMouseUp={handleMouseUp}
                   onMouseDown={handleMouseDown}
                   >
                      <div className='volume-button absolute top-[-13px] left-0'
                      style={{ left: `${volume * 100}%` }}></div>
                   </div> 
              </div>
         </div>  
      </div>
    </div>
  )
}

export default Drum_machine