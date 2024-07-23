import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { semAir, semAlert, semBumpTest, semDemo, semPlug } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useOnScreen = (ref, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isVisible;
};

const SEM = () => {
  const quoteRef1 = useRef(null);
  const quoteRef2 = useRef(null);
  const panelRefs = useRef([]);
  const containerRef = useRef(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (isVisible) {
      const ctx = gsap.context(() => {
        panelRefs.current.forEach((panel, index) => {
          gsap.fromTo(panel, 
            { x: index % 2 === 0 ? "100%" : "-100%" },
            {
              x: "0%",
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play none none reverse",
                scrub: 1,
              }
            }
          );
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const animateText = (ref) => {
        if (ref.current) {
          const text = ref.current.innerText;
          ref.current.innerHTML = text
            .split(" ")
            .map((word) => `<span style="display: inline-block;">${word}</span>`)
            .join(" ");
        }
      };

      animateText(quoteRef1);
      animateText(quoteRef2);

      const timeline = anime.timeline({ loop: false });
      
      timeline
        .add({
          targets: quoteRef1.current.querySelectorAll("span"),
          translateY: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 * i,
        })
        .add({
          targets: quoteRef2.current.querySelectorAll("span"),
          translateY: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 * i,
          offset: "+=500",
        });

      return () => {
        timeline.pause();
      };
    }
  }, [isVisible]);

  useGSAP(() => {
    if (isVisible) {
      gsap.to("#featureTitle", { opacity: 1, y: 0 });
    }
  }, [isVisible]);

  return (
    <div ref={containerRef}>
      <div className="w-screen h-full">
        <div className="ml-20 mt-28">
          <h2 className="text-gray lg:text-xxl md:text-5xl text-xl lg:mb-0" id="quote1" ref={quoteRef1}> Breathe Freely Discover Your Air Quality</h2>
          <h3 className="text-gray lg:text-xxl md:text-5xl text-xl lg:mb-0 mt-10" id="quote2" ref={quoteRef2}> Monitor Your Air Consistently</h3>
        </div>

        <section className="container mx-auto px-6 p-10">
          <img src={semDemo} alt="Monitoring" className="rounded-2xl w-[500px] mx-auto"/>
        </section>

        <section className="container mx-auto px-6 p-10 mt-36">
          <h2 className="text-4xl font-bold text-center text-gray lg:text-xxl md:text-5xl mb-32" id="featureTitle">Features</h2>
          
          <div className="flex items-center flex-wrap mb-20 ml-20">
            <div className="w-full md:w-1/2">
              <h4 className="text-3xl font-bold mb-3 text-blue">Smart Environment Monitors</h4>
              <p className="mb-8">
                Air Pollution is known to affect lungs, worsen allergies and
                reduce life expectancy (susceptibility to heart disease and
                cancer), threatening one's health and quality of life. The Smart
                Environment Monitor with environment monitoring is designed to
                address the monitoring needs across industries, factories and
                offices.
              </p>
            </div>
            <div className="w-full md:w-1/2 overflow-hidden">
              <img src={semAir} alt="Monitoring" className="rounded-2xl w-[500px] ml-10"ref={(el) => (panelRefs.current[0] = el)}/>
            </div>
          </div>

          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 overflow-hidden">
              <img src={semPlug} alt="Reporting" className="w-[500px] ml-10"ref={(el) => (panelRefs.current[1] = el)}/>
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-blue font-bold mb-3">Configurable Plug and Play Sensors</h4>
              <p>Instantly assess hazardous areas for the presence of particulate matter, toxic or flammable gases</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap mb-20 ml-20">
            <div className="w-full md:w-1/2">
              <h4 className="text-3xl text-blue font-bold mb-3">Preventive Maintenance</h4>
              <p className="mb-8">Ensure sensor performance with periodic bump tests</p>
            </div>
            <div className="w-full md:w-1/2 overflow-hidden">
              <img src={semBumpTest} alt="Syncing" className="w-[500px] rounded-2xl ml-10"ref={(el) => (panelRefs.current[2] = el)}/>
            </div>
          </div>

          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 overflow-hidden">
              <img src={semAlert} alt="Reporting" className="w-[500px] ml-10"ref={(el) => (panelRefs.current[3] = el)}/>
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-blue font-bold mb-3">Alert Generation</h4>
              <p>Audio and Visual Indications for Critical, Warning, STEL, and TWA, including SOS for emergencies</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SEM;



{/* import React, { useEffect, useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import { semAir, semAlert, semBumpTest, semDemo, semPlug } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SEM = () => {
  const quoteRef1 = useRef(null);
  const quoteRef2 = useRef(null);
  const container = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const animateText = (ref) => {
      if (ref.current) {
        const text = ref.current.innerText;
        ref.current.innerHTML = text
          .split(" ")
          .map((word) => `<span style="display: inline-block;">${word}</span>`)
          .join(" ");
      }
    };

    animateText(quoteRef1);
    animateText(quoteRef2);

    anime
      .timeline({ loop: false })
      .add({
        targets: quoteRef1.current.querySelectorAll("span"),
        translateY: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 * i,
      })
      .add({
        targets: quoteRef2.current.querySelectorAll("span"),
        translateY: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 * i,
        offset: "+=500",
      });
  }, []);

  useGSAP(() => {
    gsap.to("#featureTitle", { opacity: 1, y: 0 });
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: container.current
      });

      panelRefs.current.forEach((panel, index) => {
        gsap.to(panel, {
          backgroundPosition: "-50px",
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
    }, container);
    return () => ctx.revert();
  }, []);

  const slides = [
    {
      title: "Smart Environment Monitors",
      content: "Air Pollution is known to affect lungs, worsen allergies and reduce life expectancy (susceptibility to heart disease and cancer), threatening ones health and quality of life. The Smart Environment Monitor with environment monitoring is designed to address the monitoring needs across industries, factories and offices.",
      color: "text-red-600",
      img: semAir
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
    {
      title: "Alert Generation",
      content: "Audio and Visual Indications for Critical, Warning, STEL, and TWA, including SOS for emergencies",
      color: "text-[#598fe1]",
      img: semAlert
    }
  ];

  return (
    <div>
      <div className="w-screen h-full">
        <div className="ml-20 mt-28">
          <h2 className="text-gray lg:text-xxl md:text-5xl text-xl lg:mb-0" id="quote1" ref={quoteRef1}>Breathe Freely Discover Your Air Quality</h2>
          <h3 className="text-gray lg:text-xxl md:text-5xl text-xl lg:mb-0 mt-10" id="quote2" ref={quoteRef2}>Monitor Your Air Consistently</h3>
        </div>

        <section className="container mx-auto px-6 p-10">
          <img src={semDemo} alt="Monitoring" className="rounded-2xl w-[1000px] mx-auto"/>
        </section>
  
        
        <div ref={container} className='relative snap-y snap-mandatory overflow-y-scroll h-screen'>
          <div className='fixed flex flex-col gap-12 items-center justify-center h-screen w-[10%]'>
            {slides.map((bullet, index) => (
              <img key={bullet.title} src={bullet.img} alt={bullet.title} className={`bullet-${index + 1} w-12 h-12 rounded-full object-cover`} />
            ))}
          </div>
          {slides.map((slide, index) => (
            <section className='h-screen flex items-center justify-center snap-start' key={slide.title}>
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
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                  className='h-96 rounded-lg shadow-2xl mt-40'
                  ref={(el) => (panelRefs.current[index] = el)}
                ></div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEM; */}
