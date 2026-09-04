import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Cocktails from './components/cocktails/Cocktails';
import Menu from './components/menu/Menu';
import Contact from './components/contact/Contact';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <Menu />
      <Contact/>
    </main>
  )
}

export default App
