import gsap, { SplitText } from "gsap/all"
import { openingHours, socials } from "../../constant"
import { useGSAP } from "@gsap/react"

const Contact = () => {

  const splitTitle = new SplitText('#contact h2', {
    type: 'words'
  })

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom bottom",
        scrub: true
      },
      ease: 'power1.inOut'
    })


    timeline
      .from(splitTitle.word, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.02
      })

      .from('#contact h3, #contact p', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.02
      })

      .to('#f-left-leaf', {
        yPercent: -50,
        duration: 1,
        ease: "power1.inOut"
      })
      .to('#f-right-leaf', {
        yPercent: 50,
        duration: 1,
        ease: "power1.inOut"
      }, '<')


  })

  return (
    <footer
      id='contact'
    >
      <img src="/images/footer-right-leaf.png" alt="footer-right-leaf" id='f-right-leaf' />
      <img src="/images/footer-left-leaf.png" alt="footer-left-leaf" id='f-left-leaf' />


      <div className='content'>
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>N-3H Block, TaJ Hotel Park , Mumbai - 458880</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>6260743672</p>
          <p>barP@zohomail.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {
            openingHours.map((time) => (
              <p key={time.day}>
                {time.day} : {time.time}
              </p>
            ))
          }
        </div>

        <div className="flex-center gap-5">
          <h3>Socials</h3>
          {socials.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel={'noopener noreferrer'}
              aria-label={social.name}
            >
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Contact
