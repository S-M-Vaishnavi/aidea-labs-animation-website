import { iaq1, semAlert, semBumpTest, semDemo, semPlug } from "../utils";
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function IAQ() {
  const container = useRef();
  const panel = useRef([]);

  panel.current = [];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: container.current
        // scroller: window.current
      });

      gsap.utils.toArray(panel.current).forEach((panel, index) => {
        gsap.to(panel, {
          x: -100,
          duration: 3,
          scrollTrigger: {
            trigger: panel,
            toggleActions: "play reverse play reverse"
          }
        });

        gsap.to(`.bullet-${index + 1}`, {
          scale: 1.8,
          scrollTrigger: {
            trigger: panel,
            toggleActions: "play reverse play reverse",
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const slides = [
    {
      title: "Smart Environment Monitors",
      content: "Air Pollution is known to affect lungs, worsen allergies and reduce life expectancy (susceptibility to heart disease and cancer), threatening ones health and quality of life. The Smart Environment Monitor with environment monitoring is designed to address the monitoring needs across industries, factories and offices.",
      color: "text-red-600",
      img: iaq1
    },
    {
      title: "Configurable Plug and Play Sensors",
      content: "Instantly assess hazardous areas for the presence of particulate matter, toxic or flammable gases",
      color: "text-red-600",
      img: semPlug
    },
    {
      title: "Preventive Maintenance",
      content: "Ensure sensor performance with periodic bump tests",
      color: "text-[#e9ab32]",
      img: semBumpTest
    },
  ];

  const addToRef = (el) => {
    if (el && !panel.current.includes(el)) {
      panel.current.push(el);
    }
  };

  return (
    <div className='w-full h-screen overflow-x-hidden bg-black'>
      <h1 className="text-gray lg:text-xxl md:text-5xl text-xl lg:mb-0 text-center">INDOOR AIR QUALITY MONITOR</h1>
      <p className="text-justify w-[800px] mx-auto">
      Research over the past decade has proven that poor indoor air quality leads to decreased performance and increase in illnesses
      Inadequate ventilation causes pollutants emitted from cleaning products, building materials and appliances to build up to hazardous concentrations. Gain insight on these pollutants with our IAQ
      </p>
      <div ref={container} className='relative snap-y snap-mandatory overflow-y-scroll h-screen mb-24 scrollbar-hide'>
        <div className='fixed flex flex-col gap-8 items-center justify-center h-screen w-[10%] -mt-[60px]'>
          {slides.map((bullet, index) => {
            return (
              <img key={bullet.title} src={bullet.img} className={`bullet-${index + 1} w-12 h-12 rounded-full object-cover`} />
            );
          })}
        </div>
        {slides.map((slide, index) => {
          return (
            <section className='h-screen flex item-center justify-center snap-start' key={slide.title}>
              <div className='w-full max-w-6xl mx-auto px-8 flex items-center'>
                <div className='w-[70%] pl-36'>
                  <h2 className={`${slide.color} text-[1.5rem] font-bold`}>{slide.title}</h2>
                  <h1 className='text-white'>{slide.content}</h1>
                </div>
              </div>
              <div className='w-[45%] mr-40'>
                <div
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat:"no-repeat",
                    height:"400px",
                    width:"400px"
                  }}
                  className='rounded-lg shadow-2xl mt-52'
                  ref={addToRef}
                ></div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
    
  );
}

export default IAQ;