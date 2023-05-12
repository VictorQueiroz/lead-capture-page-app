import { useCallback, useEffect, useState } from 'react';
import './Header.scss';
import useActiveBreakpoints from './useActiveBreakpoints';
import {
  animated,
  useSpring,
  useSpringRef,
  useTrail,
  useTransition
} from '@react-spring/web';

export default function Header() {
  const phoneNumber = '+1 815 825 4718';
  const whatsAppLink = `https://wa.me/${phoneNumber.replace(/[^0-9]+/g, '')}`;
  const activeBreakpoints = useActiveBreakpoints();
  const text = [
    "Your lead capture it's like your digital business card.",
    "It'll help your target audience to know you better and find",
    "you on search engines. It's also a place you can put a lot",
    'of information about your business, so it stands as a go-to',
    'place to understand what you can offer in more detail, while',
    'also giving a good first impression.'
  ].join(' ');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const isLargeScreenDevice = activeBreakpoints.has('lg');
  useSpring({
    from: {},
    to: {}
  });
  const headerButtons = [
    <div key="about" className="header-button">
      About
    </div>,
    <div key="services" className="header-button">
      Services
    </div>,
    <div key="pricing" className="header-button">
      Pricing
    </div>,
    <div key="contact-us" className="header-button">
      Contact us
    </div>,
    isLargeScreenDevice
      ? {
          ignore: true,
          value: <div key="flex-fill-element" className="flex-fill"></div>
        }
      : null,
    <a key="whatsapp-link" href={whatsAppLink} className="header-button">
      <i className="fa-brands fa-whatsapp me-1" /> {phoneNumber}
    </a>
  ];
  const toggleCollapseHeader = useCallback(() => {
    setIsHeaderCollapsed((a) => !a);
  }, [setIsHeaderCollapsed]);
  const to = isLargeScreenDevice
    ? {
        transform: 'translate3d(0,0%,0)',
        opacity: 1
      }
    : {
        opacity: isHeaderCollapsed ? 1 : 0,
        transform: isHeaderCollapsed
          ? 'translate3d(0%,0,0)'
          : 'translate3d(-5%,0,0)'
      };
  const from = isLargeScreenDevice
    ? {
        transform: 'translate3d(0,-50%,0)',
        opacity: 0
      }
    : {
        transform: 'translate3d(-5%,0,0)',
        opacity: 0
      };
  const trail = useTrail(headerButtons.length, {
    reset: true,
    to,
    from
  });
  const animatedElements = trail.map((style, i) => {
    const el = headerButtons[i];
    if (!el) {
      return null;
    }
    return 'ignore' in el ? (
      el.value
    ) : (
      <animated.div key={i} style={style}>
        {el}
      </animated.div>
    );
  });
  const collapseHeaderTransitionRef = useSpringRef();
  const collapseHeaderButtonTransition = useTransition(isHeaderCollapsed, {
    from: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)'
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%,0,0)'
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-50%,0,0)'
    }
  });
  useEffect(() => {
    collapseHeaderTransitionRef.start();
  }, [isHeaderCollapsed, collapseHeaderTransitionRef]);
  return (
    <div className="header">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-lg-12">
            <div className="h-100 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="header-title">JavaScript Lab</div>
                {isLargeScreenDevice ? (
                  <>
                    <div className="header-separator" />
                    {animatedElements}
                  </>
                ) : (
                  <>
                    <div className="flex-fill"></div>
                    <div
                      className="header-button"
                      onClick={toggleCollapseHeader}
                    >
                      {collapseHeaderButtonTransition((style, isCollapsed) =>
                        isCollapsed ? (
                          <animated.i
                            style={style}
                            className="header-button-icon fa-solid fa-xmark"
                          />
                        ) : (
                          <animated.i
                            style={style}
                            className="header-button-icon fa-solid fa-bars"
                          />
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
              {isLargeScreenDevice ? null : isHeaderCollapsed ? (
                <>
                  <div className="d-flex flex-column">{animatedElements}</div>
                  <div className="header-horizontal-separator"></div>
                </>
              ) : null}
              <div className="header-content d-flex justify-content-center align-items-center flex-column text-center flex-fill">
                <div className="w-75">
                  <h1>Get your business one step closer to the web now!</h1>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
