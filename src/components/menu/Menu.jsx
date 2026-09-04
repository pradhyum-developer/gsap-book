import { useRef, useState } from "react"
import { allCocktails } from "../../constant"
import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";

const Menu = () => {
  const [currentIndx, setCurrentIndex] = useState(0);
  const totalNumOfCocktails = allCocktails.length;
  const [buttonDir, setButtonDir] = useState('left')
  const contentRef = useRef();

  useGSAP(() => {
    // gsap.from('.cocktail', {
    //   x: buttonDir === "left" ? 300 : -300,
    //   duration: 0.7
    // })

    // const infoSplit = new SplitText('.info', { type: 'lines' })
    // const descSplit = new SplitText('.details', { type: 'lines' })

    // gsap.from(infoSplit.lines, {
    //   y: 100,
    //   duration: 0.7,
    //   stagger: {
    //     amount: 0.4,
    //     ease: "expo.inOut",
    //   }
    // })

    // gsap.from(descSplit.lines, {
    //   y: 100,
    //   duration: 0.7,
    //   stagger: {
    //     amount: 0.4,
    //     ease: "expo.inOut",
    //   }
    // })

    // actual animations
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 })
    gsap.fromTo('.cocktail img', { opacity: 0, xPercent: buttonDir === "left" ? 100 : -100, }, { opacity: 1, xPercent: 0, ease: 'power1.inOut', duration: 1 })

    gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })

    gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })


  }, [currentIndx, buttonDir])

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#menu',
        start: "top 60%",
        end: "bottom top",
        scrub: true
      }
    })
      .to('#m-left-leaf', {
        yPercent: -100,
      })
      .to('#m-right-leaf', {
        yPercent: 100,
      }, '<')
  })

  const goToSlide = (indx) => {
    const newIndx = (indx + totalNumOfCocktails) % totalNumOfCocktails;

    setCurrentIndex(newIndx);
  }

  const getCocktailAt = (indexOffSet) => {
    return allCocktails[(currentIndx + indexOffSet + totalNumOfCocktails) % totalNumOfCocktails]
  }

  const curCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu"
      aria-labelledby="menu-heading">
      <img
        src={'/images/slider-left-leaf.png'}
        alt="left-leaf"
        id="m-left-leaf" />

      <img
        src={'/images/slider-right-leaf.png'}
        alt="right-leaf"
        id="m-right-leaf" />

      <h2 id="menu-heading" className="sr-only">Cocktails Menu</h2>

      <nav className="cocktail-tabs" aria-label="Cocktails navigations">
        {allCocktails.map((cocktail, indx) => {
          const isActive = indx === currentIndx;
          const dir = currentIndx > indx ? 'left' : 'right'

          return (<button
            key={cocktail.id}
            className={isActive ? "text-white border-white" : "text-white/50 border-white/50"}
            onClick={() => {
              goToSlide(indx)
              setButtonDir(dir)
            }}>
            {cocktail.name ?? "Pradhyum"}
          </button>)
        })}
      </nav>


      <div className="content">
        <div className="arrows">
          <button className="text-left"
            onClick={() => {
              goToSlide(currentIndx - 1)
              setButtonDir('right')
            }}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden={true} />
          </button>

          <button className="text-left"
            onClick={() => {
              goToSlide(currentIndx + 1)
              setButtonDir('left')
            }}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden={true} />
          </button>
        </div>

        <div className="cocktail">
          <img src={curCocktail.image} alt="cocktail-image" className="object-contain" />

        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{curCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{curCocktail.title}</h2>
            <p>{curCocktail.description}</p>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Menu
