import React from 'react'
import { navLinks } from '../../constant'
import logo from "../../../public/images/logo.png"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav',
        start: "bottom top"
      }
    });

    navTween.fromTo('nav',
      {
        backgroundColor: "transparent"
      },
      {
        backgroundColor: "#00000050",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: 'power1.inOut'
      })
  })

  return (
    <nav>
      <div>
        {/* logo */}
        <a href="#home" className='flex items-center gap-2'>
          <img src={logo} alt="logo" />
          <p>Velvet Pour</p>
        </a>

        <ul>
          {navLinks.map((navigation, indx) => (
            <li key={indx}>
              <a href={`#${navigation.id}`}>{navigation.title}</a>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
