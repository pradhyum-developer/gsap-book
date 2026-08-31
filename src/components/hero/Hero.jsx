import React, { useRef } from 'react'
import leftLeaf from "../../../public/images/cocktail-left-leaf.png"
import rightLeaf from "../../../public/images/cocktail-right-leaf.png"
import glassVideo from "../../../public/videos/input.mp4"
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'
const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars , words' });

    const paraSplit = new SplitText('.subtitle', { type: 'lines' })

    console.log('paraSplit :', paraSplit)

    heroSplit.chars.forEach(char => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06
    })

    gsap.from(paraSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1
    })

    // leafs animations
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
      .to('.left-leaf', { y: 200 }, 0)
      .to('.right-leaf', { y: -200 }, 0)


    // video animations
    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    const vtl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true
      }
    })

    videoRef.current.onloadedmetadata = () => {
      vtl.to(videoRef.current, {
        currentTime: videoRef.current.duration
      })
    }


  }, [])





  return (
    <React.Fragment>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJIO</h1>

        <img
          src={leftLeaf}
          alt="left-leaf"
          className='left-leaf'
        />

        <img
          src={rightLeaf}
          alt="right-leaf"
          className='right-leaf'
        />

        <div className='body'>
          <div className='content'>
            <div className='space-y-5 hidden sm:block'>
              <p>cool. Crisp. Classic</p>
              <p className='subtitle'>
                Sip the Sprint
                <br /> of Summur
              </p>
            </div>

            <div className='view-cocktails'>

              <p className='subtitle'>
                Every cocktail on our menu is a
                blend of premium ingredients,
                creative flair, and timeless recipes
                - designed to delight your senses.
              </p>

              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>

      </section>

      {/* videp animations */}
      <div className='video absolute inset-0'>
        <video
          ref={videoRef}
          src={glassVideo}
          muted
          playsInline
          preload='auto'
          loop
        />
      </div>
    </React.Fragment >
  )
}

export default Hero
