import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

class FixedSidebar {
  public scrollTrigger: ScrollTrigger;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    this.scrollTrigger = ScrollTrigger.create({
      trigger: "#sidebar_contents",
      start: `top 76px`,
      end: "bottom 100%",
      endTrigger: "#main",
      // markers: true,
      pin: true,
    });
    this.scrollTrigger.disable();
  }
}

export default FixedSidebar;
