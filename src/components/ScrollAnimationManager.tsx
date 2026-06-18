import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationManager = () => {
  useEffect(() => {
    // Smooth defaults for all GSAP animations
    gsap.defaults({ ease: 'power3.out', duration: 1 });

    // --- Section heading character-stagger reveals ---
    const headings = document.querySelectorAll<HTMLElement>('[data-animate="heading"]');
    headings.forEach((heading) => {
      // Split text into spans
      const text = heading.textContent || '';
      // Only do char split on plain text headings
      if (!heading.querySelector('span')) {
        heading.innerHTML = text
          .split('')
          .map((char) =>
            char === ' '
              ? '<span class="inline-block">&nbsp;</span>'
              : `<span class="inline-block char-reveal">${char}</span>`
          )
          .join('');

        gsap.from(heading.querySelectorAll('.char-reveal'), {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.8,
          immediateRender: false,
          ease: 'back.out(1.7)',
        });
      } else {
        // For headings with inner spans, animate the whole heading
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          immediateRender: false,
          ease: 'power3.out',
        });
      }
    });

    // --- Fade-up elements ---
    const fadeUps = document.querySelectorAll<HTMLElement>('[data-animate="fade-up"]');
    fadeUps.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        immediateRender: false,
        delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : 0),
      });
    });

    // --- Slide-in from left ---
    const slideLefts = document.querySelectorAll<HTMLElement>('[data-animate="slide-left"]');
    slideLefts.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: -80,
        opacity: 0,
        duration: 0.9,
        immediateRender: false,
        delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : 0),
      });
    });

    // --- Slide-in from right ---
    const slideRights = document.querySelectorAll<HTMLElement>('[data-animate="slide-right"]');
    slideRights.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: 80,
        opacity: 0,
        duration: 0.9,
        immediateRender: false,
        delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : 0),
      });
    });

    // --- Scale-in elements ---
    const scaleIns = document.querySelectorAll<HTMLElement>('[data-animate="scale-in"]');
    scaleIns.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        scale: 0.85,
        opacity: 0,
        duration: 1,
        immediateRender: false,
        delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : 0),
      });
    });

    // --- Stagger children ---
    const staggerGroups = document.querySelectorAll<HTMLElement>('[data-animate="stagger-children"]');
    staggerGroups.forEach((group) => {
      const children = group.children;
      gsap.from(children, {
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        immediateRender: false,
      });
    });

    // --- Section transition lines ---
    const transitionLines = document.querySelectorAll<HTMLElement>('.section-transition-line');
    transitionLines.forEach((line) => {
      gsap.from(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        scaleX: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    });

    // --- Parallax elements ---
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.2');
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: () => -100 * speed,
        ease: 'none',
      });
    });

    // --- ROBOT COMPANION ANIMATION ---
    const robot = document.querySelector('.robot-companion-svg');
    if (robot) {
      // Fade in after hero
      ScrollTrigger.create({
        trigger: '#scroll-sections',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(robot, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' });
        },
        onLeaveBack: () => {
          gsap.to(robot, { opacity: 0, scale: 0.6, x: 40, duration: 0.6, ease: 'power2.in' });
        },
      });

      // Rotate based on scroll progress
      gsap.to(robot, {
        scrollTrigger: {
          trigger: '#scroll-sections',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
        rotation: 15,
        ease: 'none',
      });

      // Pulse color based on active section
      const sections = ['about', 'experience', 'skills', 'projects', 'education', 'services'];
      sections.forEach((sectionId) => {
        ScrollTrigger.create({
          trigger: `#${sectionId}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              const color =
                sectionId === 'experience' || sectionId === 'education'
                  ? '#7000ff' // secondary purple
                  : sectionId === 'projects' || sectionId === 'services'
                    ? '#ff003c' // accent red
                    : '#00f0ff'; // primary cyan
              gsap.to(robot, { color, duration: 0.8 });
            }
          },
        });
      });

      // Hide at contact
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 60%',
        onEnter: () => {
          gsap.to(robot, { opacity: 0, scale: 0.4, y: 50, duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(robot, { opacity: 1, scale: 1, y: 0, duration: 0.8 });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimationManager;
