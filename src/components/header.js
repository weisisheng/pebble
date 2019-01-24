import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { Transition, Trail } from 'react-spring';

import Container from './helperComponents/container';

import pebbleIcon from '../images/header_oval.svg';

import './header.sass';

const NavbarTransition = ({ children, show }) => (
  <Transition
    items={show}
    from={{ transform: 'translateY(-50px)' }}
    enter={{ transform: 'translateY(0px)' }}
    config={{ friction: 50, delay: 700 }}
  >
    {show => show && (props => <div style={props}>{children}</div>)}
  </Transition>
);

const menuTrail = ({ children, list }) => (
  <Trail
    items={list}
    from={{ transform: 'translate3d(0,40px,0)' }}
    to={{ transform: 'translate3d(0,0px,0)' }}
  >
    {(item, index) => props => (
      <Link
        to="problemSection"
        spy={true}
        smooth={'easeInOutCubic'}
        duration={750}
        offset={-80}
        delay={1300}
      >
        <p
          style={props}
          onClick={this.onMenuClick}
          className={`menu__link--${index}`}
        >
          {item}
        </p>
      </Link>
    )}
  </Trail>
);

class Header extends Component {
  state = {
    prevScrollpos: 0,
    canShowNavbar: true,
    scrollTimer: 'none',
    menuOpen: false,
    show: false,
    trailList: ['Why Pebble?', 'Features', 'Pricing', 'Praise'],
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.navbarDisplayHandler);
    this.setState({ prevScrollpos: window.pageYOffset, show: true });
  };

  navbarDisplayHandler = () => {
    const prevScrollpos = this.state.prevScrollpos;
    let currentScrollPos = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    /**
     * navbar receives shadow once user starts to scroll
     * (and it doesnt already have a shadow)
     */
    if (currentScrollPos > 0 && !navbar.classList.contains('navbar-shadow')) {
      navbar.classList.add('navbar-shadow');
    } else if (currentScrollPos === 0) {
      navbar.classList.remove('navbar-shadow');
    }
    /**
     * as long as window is not scrolled past navbar,
     * the navbar should not disappear
     */
    if (currentScrollPos <= 80) {
      navbar.style.top = '0';
    } else {
      /**
       * if user scrolls up and if it is allowed to show navbar,
       * show the navbar
       */
      if (prevScrollpos > currentScrollPos && this.state.canShowNavbar) {
        navbar.style.top = '0';
      }
      /**
       * if user scrolls down and past the navbar,
       * hide the navbar and also set a timer during which
       * navbar can not be shown even when window is being
       * scrolled up. This is implemented so the user does
       * not accidently reveal the navbar. E.g. on a mac after
       * you scroll down with 2 fingers, you will likely make a
       * mini move with your hand that would show the navbar
       * if this timer wasnt implemented
       */
      if (prevScrollpos < currentScrollPos && currentScrollPos > 80) {
        if (this.state.scrollTimer !== 'none') {
          clearTimeout(this.state.scrollTimer);
        }
        this.setState({ canShowNavbar: false });
        navbar.style.top = '-85px';
        this.setState({
          scrollTimer: setTimeout(() => {
            this.setState({ canShowNavbar: true });
          }, 500),
        });
      }
      this.setState({ prevScrollpos: currentScrollPos });
    }
  };

  onMenuClick = () => {
    const pebble = document.querySelector('.navbar-box__pebble');
    const body = document.querySelector('body');
    const menu = document.querySelector('.menu');
    if (!this.state.menuOpen) {
      pebble.style.transform =
        'scale3d(250, 250, 250) rotate(45deg) translateY(2.5px) translateX(4px)';
      pebble.style.opacity = 0.85;
      body.classList.add('stop-scrolling');
      setTimeout(() => {
        menu.style.display = 'flex';
      }, 750);

      this.setState({ menuOpen: true });
    } else {
      const pebble = document.querySelector('.navbar-box__pebble');
      pebble.style.transform =
        'scale3d(1, 1, 1) rotate(0deg) translateY(2.5px)';
      pebble.style.opacity = 1;
      body.classList.remove('stop-scrolling');
      menu.style.display = 'none';
      this.setState({ menuOpen: false });
    }
  };

  render() {
    return (
      <div id="navbar" className="navbar-box">
        <Container>
          <NavbarTransition show={this.state.show}>
            <img
              alt="pebble icon"
              className="navbar-box__pebble"
              src={pebbleIcon}
            />
            <Link
              to="heroSection"
              spy={true}
              smooth={'easeInOutCubic'}
              duration={750}
              offset={-80}
            >
              <p className="title">{this.props.siteTitle}</p>
            </Link>
            <div onClick={this.onMenuClick} className="hamburger-menu">
              <div className="hamburger-menu__line hamburger-menu__line--one" />
              <div className="hamburger-menu__line hamburger-menu__line--two" />
              <div className="hamburger-menu__line hamburger-menu__line--three" />
            </div>
          </NavbarTransition>
        </Container>
        <div className="menu">
          <div onClick={this.onMenuClick} className="menu__icon-close" />
          <Link
            to="problemSection"
            spy={true}
            smooth={'easeInOutCubic'}
            duration={750}
            offset={-80}
            delay={1300}
          >
            <p onClick={this.onMenuClick} className="menu__link--0">
              Why Pebble?
            </p>
          </Link>
          <Link
            to="featureSection"
            spy={true}
            smooth={'easeInOutCubic'}
            duration={750}
            offset={-80}
            delay={1300}
          >
            <p onClick={this.onMenuClick} className="menu__link--1">
              Features
            </p>
          </Link>
          <Link
            to="pricingSection"
            spy={true}
            smooth={'easeInOutCubic'}
            duration={750}
            offset={-80}
            delay={1300}
          >
            <p onClick={this.onMenuClick} className="menu__link--2">
              Pricing
            </p>
          </Link>
          <Link
            to="praiseSection"
            spy={true}
            smooth={'easeInOutCubic'}
            duration={750}
            offset={-80}
            delay={1300}
          >
            <p onClick={this.onMenuClick} className="menu__link--3">
              Praise
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
