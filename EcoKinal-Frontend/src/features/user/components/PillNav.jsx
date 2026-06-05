import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronRight, Leaf, LogOut, Menu, X } from 'lucide-react';

const PillNav = ({
  logo,
  logoAlt = 'EcoKinal',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#f8fbf4',
  pillColor = '#6ea84b',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#f8fafc',
  onMobileMenuClick,
  initialLoadAnimation = true,
  onLogoutAction,
  onProfileClick 
}) => {
  const location = useLocation();
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  const currentPath = activeHref ?? location.pathname;

  const normalizedItems = useMemo(() => {
    return (items || []).filter(Boolean).map(item => ({
      ...item,
      href: item.href || '#'
    }));
  }, [items]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.18, xPercent: -50, duration: 0.85, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.8, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 56), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.8, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, y: -10 });
    }

    if (initialLoadAnimation) {
      const logoNode = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoNode) {
        gsap.set(logoNode, { scale: 0.94, opacity: 0 });
        gsap.to(logoNode, { scale: 1, opacity: 1, duration: 0.75, ease });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, { width: 'auto', duration: 0.75, ease });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.35, ease, overwrite: 'auto' });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.28, ease, overwrite: 'auto' });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.45, ease, overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 5, duration: 0.35, ease });
        gsap.to(lines[1], { rotation: -45, y: -5, duration: 0.35, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.28, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.28, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.35, ease, transformOrigin: 'top center' });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = href => href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#');

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '54px',
    ['--logo']: '40px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '10px'
  };

  return (
    <div className="fixed top-[1.5em] left-0 right-0 z-[1000] flex justify-center px-2 sm:px-4">
      <nav
        className={`flex w-full max-w-[1180px] items-center justify-between gap-3 rounded-full border border-[rgba(35,55,109,0.10)] bg-[linear-gradient(135deg,rgba(245,247,252,0.98)_0%,rgba(238,241,249,0.97)_100%)] px-3 py-3 shadow-[0_18px_40px_rgba(35,55,109,0.14)] backdrop-blur-2xl ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <div ref={logoRef} className="flex shrink-0 items-center gap-3 pr-1 sm:pr-2" onMouseEnter={handleLogoEnter}>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(135deg,#fdb500_0%,#eb7207_100%)] text-[#fff] shadow-[0_10px_24px_rgba(235,114,7,0.16)]">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgba(35,55,109,0.5)]">EcoKinal</p>
            <p className="text-sm font-semibold tracking-[-0.02em] text-[rgba(35,55,109,0.9)]">{logoAlt}</p>
          </div>
          {logo ? <img ref={logoImgRef} src={logo} alt={logoAlt} className="hidden h-10 w-10 rounded-2xl object-cover sm:block" /> : <span ref={logoImgRef} className="hidden sm:block" />}
        </div>

        <div ref={navItemsRef} className="hidden min-w-0 flex-1 items-center justify-center gap-[var(--pill-gap)] overflow-x-auto rounded-full px-1 py-1 lg:flex">
          {normalizedItems.map((item, index) => {
            const href = item.href;
            const isActive = currentPath === href || currentPath?.startsWith(`${href}/`);
            const pillStyles = {
              color: isActive ? hoveredPillTextColor : resolvedPillTextColor,
              background: isActive ? 'rgba(35,55,109,0.12)' : 'transparent',
              borderColor: isActive ? 'rgba(35,55,109,0.18)' : 'transparent'
            };

            const pillBody = (
              <>
                <span className="pill-circle pointer-events-none absolute left-1/2 bottom-0 -z-[1] rounded-full bg-[radial-gradient(circle_at_top,#fdb500_0%,#eb7207_58%,#c45c00_100%)] opacity-95 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_16px_28px_rgba(235,114,7,0.18)]" aria-hidden="true" ref={setCircleRef(index)} />
                <span className="pill-label relative z-[1] inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.01em] text-[rgba(35,55,109,0.9)]">
                  {item.icon ? <i className={item.icon} aria-hidden="true" /> : null}
                  {item.label}
                </span>
                <span className="pill-label-hover absolute inset-0 z-[1] inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[-0.01em] text-[rgba(35,55,109,1)] opacity-0">
                  {item.hoverLabel || item.label}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </>
            );

            return isExternalLink(href) ? (
              <a
                key={`${href}-${index}`}
                href={href}
                className="pill-link relative inline-flex h-[var(--nav-h)] min-w-[136px] items-center justify-center overflow-hidden rounded-full border px-[var(--pill-pad-x)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px]"
                style={pillStyles}
                onMouseEnter={() => handleEnter(index)}
                onMouseLeave={() => handleLeave(index)}
              >
                {pillBody}
              </a>
            ) : (
              <Link
                key={`${href}-${index}`}
                to={href}
                className="pill-link relative inline-flex h-[var(--nav-h)] min-w-[136px] items-center justify-center overflow-hidden rounded-full border px-[var(--pill-pad-x)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px]"
                style={pillStyles}
                onMouseEnter={() => handleEnter(index)}
                onMouseLeave={() => handleLeave(index)}
              >
                {pillBody}
              </Link>
            );
          })}
          {onProfileClick ? (
            <button
              type="button"
              onClick={onProfileClick}
              className="pill-link relative inline-flex h-[var(--nav-h)] w-[var(--nav-h)] items-center justify-center overflow-hidden rounded-full border border-[rgba(35,55,109,0.10)] bg-white/80 text-[rgba(35,55,109,0.8)] shadow-[0_10px_24px_rgba(35,55,109,0.10)] transition-all duration-500 hover:border-[rgba(35,55,109,0.2)] hover:bg-white hover:shadow-[0_14px_28px_rgba(35,55,109,0.16)]"
              aria-label="Mi perfil"
            >
              <i className="ti ti-user h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
          
          {onLogoutAction ? (
            <button
              type="button"
              onClick={onLogoutAction}
              className="pill-link relative inline-flex h-[var(--nav-h)] min-w-[136px] items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent bg-transparent px-[var(--pill-pad-x)] text-sm font-semibold text-[rgba(35,55,109,0.9)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:border-[rgba(235,114,7,0.3)] hover:bg-[rgba(235,114,7,0.05)] hover:text-[#eb7207] hover:shadow-[0_18px_30px_rgba(235,114,7,0.14)] ml-3 lg:ml-5 xl:ml-8"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Cerrar sesión
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(35,55,109,0.10)] bg-white/90 text-[rgba(35,55,109,0.8)] shadow-[0_10px_24px_rgba(35,55,109,0.12)] transition-all duration-500 hover:bg-white"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <div ref={mobileMenuRef} className="absolute left-0 right-0 top-full mt-3 rounded-[28px] border border-[rgba(35,55,109,0.10)] bg-[linear-gradient(180deg,rgba(245,247,252,0.98)_0%,rgba(238,241,249,0.98)_100%)] p-3 shadow-[0_20px_60px_rgba(35,55,109,0.16)] lg:hidden">
          <div className="grid gap-2">
            {normalizedItems.map((item, index) => {
              const href = item.href;
              const isActive = currentPath === href || currentPath?.startsWith(`${href}/`);

              return isExternalLink(href) ? (
                <a
                  key={`${href}-mobile-${index}`}
                  href={href}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-500 ${isActive ? 'border-[rgba(35,55,109,0.15)] bg-[rgba(35,55,109,0.10)] text-[#23376d]' : 'border-[rgba(35,55,109,0.08)] bg-white text-[rgba(35,55,109,0.8)]'}`}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.icon ? <i className={item.icon} aria-hidden="true" /> : null}
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={`${href}-mobile-${index}`}
                  to={href}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-500 ${isActive ? 'border-[rgba(35,55,109,0.15)] bg-[rgba(35,55,109,0.10)] text-[#23376d]' : 'border-[rgba(35,55,109,0.08)] bg-white text-[rgba(35,55,109,0.8)]'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.icon ? <i className={item.icon} aria-hidden="true" /> : null}
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                </Link>
              );
            })}

            {onProfileClick ? (
              <button
                type="button"
                onClick={() => { onProfileClick(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-between rounded-2xl border border-[rgba(35,55,109,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[rgba(35,55,109,0.8)] transition-all duration-500 hover:border-[rgba(35,55,109,0.2)] hover:bg-[rgba(35,55,109,0.04)]"
              >
                <span className="inline-flex items-center gap-2">
                  <i className="ti ti-user" aria-hidden="true" />
                  Mi perfil
                </span>
                <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
              </button>
            ) : null}

            {onLogoutAction ? (
              <button
                type="button"
                onClick={onLogoutAction}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgba(35,55,109,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[rgba(35,55,109,0.8)] shadow-[0_10px_20px_rgba(35,55,109,0.08)] transition-all duration-500 hover:border-[rgba(235,114,7,0.3)] hover:bg-[rgba(235,114,7,0.05)] hover:text-[#eb7207] hover:shadow-[0_18px_30px_rgba(235,114,7,0.14)]"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Cerrar sesión
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );

  function setCircleRef(index) {
    return element => {
      if (element) circleRefs.current[index] = element;
    };
  }
};

export default PillNav;