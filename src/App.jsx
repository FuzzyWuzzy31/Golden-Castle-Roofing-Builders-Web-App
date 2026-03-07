import React, { useState, useEffect } from 'react';
import './App.css';
import logo from "./assets/logo.png";

// Using placeholders for icons. Replace these with your actual SVGs or PNGs later.
function App() {
  const [expandedService, setExpandedService] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for better positioning
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Using EmailJS to send emails
      const serviceID = 'service_sjew9na';
      const templateID = 'template_vf5z5rh';
      const publicKey = '4gb_ob6xsmTFlemar';

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: {
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            address: formData.address,
            message: formData.message,
            to_email: 'goldencastleroofingbuilders@gmail.com'
          }
        })
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your consultation request has been sent successfully. We\'ll contact you shortly.'
        });
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please call us directly at 09177052591 or email goldencastleroofingbuilders@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="App">
      {/* --- Top Navbar --- */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo and Brand */}
          <div className="navbar-brand" onClick={() => scrollToSection('hero')}>
            <img src={logo} alt="Golden Castle Logo" className="navbar-logo" />
            <div className="navbar-brand-text">
              <span className="navbar-brand-name">GOLDEN CASTLE</span>
              <span className="navbar-brand-tagline">ROOFING BUILDERS</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={() => scrollToSection('hero')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => scrollToSection('services')}>Services</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => scrollToSection('projects')}>Projects</button>
            </li>
            <li className="nav-item">
              <button className="nav-link nav-link-cta" onClick={() => scrollToSection('consultation')}>Get Quote</button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button className="mobile-nav-link" onClick={() => scrollToSection('hero')}>Home</button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('services')}>Services</button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('projects')}>Projects</button>
          <button className="mobile-nav-link mobile-nav-link-cta" onClick={() => scrollToSection('consultation')}>Get Quote</button>
        </div>
      </nav>

      <main>
        {/* --- Hero Section --- */}
        <section id="hero" className="hero-section">
          {/* Premium Logo & Brand */}
          <div className="hero-brand">
            <img src={logo} alt="Golden Castle Roofing Logo" className="hero-logo" />
            <h2 className="hero-company-name">GOLDEN CASTLE<br />ROOFING BUILDERS</h2>
          </div>
          
          <h1 className="hero-title">Strong Roofs.<br />Stronger Protection.</h1>
          <p className="hero-subtitle">High-quality roofing services offering durability, craftsmanship, and long-lasting peace of mind.</p>
          <button className="btn btn-gold" onClick={() => scrollToSection('consultation')}>GET A FREE QUOTE</button>
          <button className="btn btn-transparent" onClick={() => scrollToSection('projects')}>OUR WORK ↓</button>

          {/* --- THE FLOATING MESSENGER BUTTON --- */}
          {/* REPLACE 'YOUR_PAGE_ID' below with your actual numerical Facebook Page ID */}
          <a
  href="https://m.me/100054211884515"
  className="messenger-float"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src="/images/messenger-icon.png" alt="Messenger" />
  <span>Reach Us</span>
</a>
        </section>

        {/* --- Contact & Features Bar --- */}
        <section>
          <div className="contact-bar">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <div className="contact-label">Call Us Now</div>
                <div className="contact-value">09177052591 / 09995818673</div>
              </div>
            </div>
            <div className="contact-divider"></div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <div className="contact-label">Email Us</div>
                <div className="contact-value">goldencastleroofingbuilders@gmail.com</div>
              </div>
            </div>
          </div>
          
          <div className="features-section">
            <div className="features-header">
              <h2 className="features-title">Why Choose Golden Castle Roofing Builders?</h2>
              <p className="features-subtitle">Three pillars of excellence that set us apart</p>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img src={"/images/license.png"} alt="Licensed & Insured" className="feature-icon" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Licensed & Insured</h3>
                  <p className="feature-description">Fully licensed contractors with comprehensive insurance coverage for your peace of mind. Every project is protected, giving you security from start to finish.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img src="/images/experience.png" alt="Years of Experience" className="feature-icon" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">10+ Years Experience</h3>
                  <p className="feature-description">Over a decade of proven expertise in residential and commercial roofing. Our skilled team has successfully completed hundreds of projects across Bohol.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <img src="/images/free.png" alt="Free Quotation" className="feature-icon" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Free Quotation</h3>
                  <p className="feature-description">Get a detailed, transparent estimate at no cost. We provide comprehensive quotes with no hidden fees, helping you make informed decisions for your roofing needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Services Section --- */}
        <section id="services" className="section services-section">
          <h2 className="section-heading heading-underline">Our Services</h2>
          <p className="section-subtitle">Expert roofing and construction solutions tailored to your needs</p>
          
          <div className="services-grid">
            {/* Service 1: Spandrel Roofing */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-spandrel.png" alt="Spandrel Roofing" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Spandrel Roofing</h3>
                <p>Premium spandrel roofing systems designed for modern architectural aesthetics and superior weather protection for residential and commercial buildings.</p>
              </div>
            </div>

            {/* Service 2: Asphalt Roofing */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-asphalt.png" alt="Asphalt Roofing" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Asphalt Roofing</h3>
                <p>Durable and cost-effective asphalt shingle installations offering excellent protection against harsh weather conditions with a variety of style options.</p>
              </div>
            </div>

            {/* Service 3: Tile Roofing */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-tile.png" alt="Tile Roofing" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Tile Roofing</h3>
                <p>Classic and elegant tile roofing solutions providing exceptional longevity, energy efficiency, and timeless curb appeal for your property.</p>
              </div>
            </div>

            {/* Service 4: Trusses */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-trusses.png" alt="Trusses Installation" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Trusses</h3>
                <p>Custom-designed and precision-engineered roof trusses ensuring structural integrity and optimal load distribution for safe, long-lasting construction.</p>
              </div>
            </div>

            {/* Service 5: Ribtype Roofing */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-ribtype.png" alt="Ribtype Roofing" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Ribtype Roofing</h3>
                <p>Industrial-grade ribbed metal roofing perfect for warehouses, factories, and commercial spaces requiring durability and weather resistance.</p>
              </div>
            </div>

            {/* Service 6: PVC Panel */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-pvc.jpg" alt="PVC Wall Panel" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>PVC Wall Panels</h3>
                <p>Lightweight and versatile PVC wall panels offering excellent insulation, moisture resistance, and low maintenance for interior and exterior wall applications.</p>
              </div>
            </div>

            {/* Service 7: Metal Cladding */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-cladding.png" alt="Metal Cladding" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Metal Cladding</h3>
                <p>Professional metal cladding installation providing superior protection, modern aesthetics, and enhanced thermal performance for your building exterior.</p>
              </div>
            </div>

            {/* Service 8: Ceiling */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-ceiling.jfif" alt="Ceiling Installation" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Ceiling</h3>
                <p>Expert ceiling installation and finishing services transforming interior spaces with quality materials and precision craftsmanship for lasting beauty.</p>
              </div>
            </div>

            {/* Service 9: Painting */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-painting.jpeg" alt="Professional Painting" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Paint Jobs</h3>
                <p>Professional interior and exterior painting services using premium-quality paints to protect and beautify your residential or commercial property.</p>
              </div>
            </div>

            {/* Service 10: House Design */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-design.jpg" alt="Architectural Design" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Architectural Design</h3>
                <p>Comprehensive architectural design services bringing your vision to life with functional layouts, modern aesthetics, and sustainable building practices.</p>
              </div>
            </div>

            {/* Service 11: Sliding Windows & Doors */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-windows.png" alt="Sliding Windows & Doors" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Sliding Windows & Doors</h3>
                <p>Premium sliding window and door installations enhancing natural light, ventilation, and accessibility while maintaining energy efficiency and security.</p>
              </div>
            </div>

            {/* Service 12: Site Inspection */}
            <div className="service-grid-card">
              <div className="service-image-wrapper">
                <img src="/images/service-inspect.jpg" alt="Site Inspection" className="service-image" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <h3>Site Inspection</h3>
                <p>Comprehensive on-site evaluations and assessments to ensure structural integrity, identify potential issues, and provide accurate project estimates and recommendations.</p>
              </div>
            </div>
          </div>

          {/* Emergency Call-to-Action */}
          <div className="service-card emergency">
            <h3>Emergency Roofing Services</h3>
            <p>Need immediate assistance? Our team is ready 24/7 to handle urgent repairs and protect your property from further damage.</p>
            <button className="btn-red" onClick={() => window.location.href = 'tel:09177052591'}>Call Now: 09177052591</button>
          </div>
        </section>

        {/* --- About Section --- */}
        <section className="section section-dark">
          <h2 className="section-heading heading-underline">Reliability in Every Nail</h2>
          <p>Golden Castle Roofing Builders focuses on delivering top-tier roofing solutions. We guarantee quality materials, expert craftsmanship, and outstanding service. Your roof is our reputation.</p>
          <img src="/images/about-roof.jpg" alt="Red Roof" className="about-image" />
        </section>

        {/* --- Meet the Team Section --- */}
        <section className="section section-dark team-section">
          <div className="team-header">
            <h2 className="section-heading heading-underline">Meet Our Team</h2>
            <p className="team-subtitle">The dedicated professionals behind Golden Castle Roofing Builders</p>
          </div>

          {/* Leadership Team - Featured */}
          <div className="leadership-grid">
            <div className="team-card featured">
              <div className="team-image-wrapper">
                <img src="/images/owner.jpg" alt="Company Owner" className="team-image" />
                <div className="team-badge">Owner</div>
              </div>
              <div className="team-info">
                <h3 className="team-name">Pinky Gomez Optina</h3>
                <p className="team-position">Company Owner & Founder</p>
              </div>
            </div>

            <div className="team-card featured">
              <div className="team-image-wrapper">
                <img src="/images/manager.jpg" alt="Operations Manager" className="team-image" />
                <div className="team-badge">Manager</div>
              </div>
              <div className="team-info">
                <h3 className="team-name">Leonido Nisnisan Optina</h3>
                <p className="team-position">Company Manager</p>
              </div>
            </div>
          </div>

          {/* Regular Team Members */}
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image-wrapper">
                <img src="/images/male.jpg" alt="Architect" className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Ar. Jessie Optina</h3>
                <p className="team-position">Company Architect</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image-wrapper">
                <img src="/images/female.jpg" alt="Secretary" className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Joan Optina Omac</h3>
                <p className="team-position">Secretary</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image-wrapper">
                <img src="/images/male.jpg" alt="Estimator" className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Aldrin Amantiad</h3>
                <p className="team-position">Estimator</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Gallery Section --- */}
        <section id="projects" className="section section-dark">
          <h2 className="section-heading heading-underline">Our Featured Projects</h2>
          <p className="section-subtitle">Explore our portfolio of exceptional roofing work across the region</p>
          
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-1.jpg" alt="Modern Residential Roof" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Ceiling & Roofing Project Installation</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Poblacion Panglao, Bohol</span>
                  <span className="project-client">👤 Mr. & Mrs. Guivincan</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-2.jpg" alt="Commercial Building Roof" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Ceiling & PVC Panel Project </h3>
                <div className="project-meta">
                  <span className="project-location">📍 Canmanico Valencia , Bohol </span>
                  <span className="project-client">👤 Mr. & Mrs. Namoc</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-3.jpg" alt="Villa Roofing" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Re-Roofing of Cogon Grass Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Panglao, Bohol</span>
                  <span className="project-client">👤 Blue Water Resort Panglao</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-4.jpg" alt="Emergency Repair" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Ceiling & Spandrel Roofing Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 La Victoria Valencia , Bohol</span>
                  <span className="project-client">👤 Mr & Mrs. Cagadas</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-5.jpg" alt="Heritage Home" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">PVC Panel Ceiling Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Lataban Sierra Bullones, Bohol </span>
                  <span className="project-client">👤 Mr. & Mrs. Ampo </span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-6.jpg" alt="Beachfront Property" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Spandrel Project Installation</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Bonbon Loboc, Bohol</span>
                  <span className="project-client">👤 Mr. & Mrs. Hilot</span>
                </div>
              </div>
            </div>

            {/* Project 7 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-7.jpg" alt="Multi-Story Building" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Re-Roofing of Restaurant Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Danao, Panglao</span>
                  <span className="project-client">👤 Blue Water Resort</span>
                </div>
              </div>
            </div>

            {/* Project 8 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-8.jpg" alt="School Building" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Trusses Roofing and Spandrel Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Seaside Mansasa District, Tagbilaran City</span>
                  <span className="project-client">👤 Royal Coast Magat Bldg</span>
                </div>
              </div>
            </div>

            {/* Project 9 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-9.jpg" alt="Restaurant Roof" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Roofing Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Sikatuna, Bohol</span>
                  <span className="project-client">👤 Mr. & Mrs. Artubal</span>
                </div>
              </div>
            </div>

            {/* Project 10 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-10.jpg" alt="Church Roof" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Roofing Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Baclayon, Bohol</span>
                  <span className="project-client">👤 Anda Cove</span>
                </div>
              </div>
            </div>

            {/* Project 11 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-11.jfif" alt="Warehouse Roofing" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Stainless Gutter Installation & Roofing Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 Baclayon, Bohol</span>
                  <span className="project-client">👤 Mr. & Mrs. Macas</span>
                </div>
              </div>
            </div>

            {/* Project 12 */}
            <div className="project-card">
              <div className="project-image-wrapper">
                <img src="/images/project-12.jfif" alt="Eco-Friendly Roof" className="project-image" />
              </div>
              <div className="project-details">
                <h3 className="project-title">Trusses Roofing Project</h3>
                <div className="project-meta">
                  <span className="project-location">📍 La Victoria Valencia, Bohol</span>
                  <span className="project-client">👤 Mr. & Mrs. Ipanag</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Business Information Section --- */}
        <section className="section business-info-section">
          <h2 className="section-heading heading-underline">Visit Us</h2>
          <p className="section-subtitle-light">Stop by our office or connect with us online</p>
          
          <div className="business-info-grid">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>J.A Clarin Corner Marapao St.<br />Tagbilaran City, Bohol</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h3>Operating Hours</h3>
                <p>Monday - Saturday<br />8:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">👍</div>
              <div className="info-content">
                <h3>Follow Us</h3>
                <p>Facebook Page<br /><a href="https://www.facebook.com/profile.php?id=100054211884515" target="_blank" rel="noopener noreferrer" className="fb-link">Golden Castle Enterprises</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Form Section --- */}
        <section id="consultation" className="section consultation-section">
          <div className="consultation-container">
            <div className="consultation-header">
              <h2 className="section-heading heading-underline">Request a Consultation</h2>
              <p className="consultation-subtitle">Ready to protect your investment? Get a free, no-obligation quote from our roofing experts. We'll assess your needs and provide a detailed estimate tailored to your project.</p>
            </div>
            
            <form className="consultation-form" onSubmit={handleSubmit}>
              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.type === 'success' ? '✓' : '⚠'} {formStatus.message}
                </div>
              )}
              
              <div className="form-row">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  className="form-input" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className="form-input" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="form-input" 
                value={formData.email}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="address"
                placeholder="Property Address" 
                className="form-input" 
                value={formData.address}
                onChange={handleInputChange}
              />
              <textarea 
                name="message"
                placeholder="Tell us about your roofing needs..." 
                className="form-input" 
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              
              <div className="form-footer">
                <p className="privacy-note">🔒 Your information is secure and will never be shared with third parties.</p>
                <button 
                  type="submit" 
                  className="btn btn-gold btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'REQUEST A QUOTE NOW →'}
                </button>
              </div>
            </form>
            
            <div className="consultation-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Free Inspection</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Same-Day Response</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Detailed Written Estimate</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer Section --- */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              {/* Company Info */}
              <div className="footer-column">
                <div className="footer-logo-section">
                  <img src={logo} alt="Golden Castle Roofing Logo" className="footer-logo" />
                  <h3 className="footer-brand">GOLDEN CASTLE<br />ROOFING BUILDERS</h3>
                </div>
                <p className="footer-tagline">Building strong roofs since 2013. Quality craftsmanship, lasting protection.</p>
                <div className="footer-social">
                  <a href="https://www.facebook.com/profile.php?id=100054211884515" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="mailto:goldencastleroofingbuilders@gmail.com" className="social-link" aria-label="Email">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  <a href="tel:09177052591" className="social-link" aria-label="Phone">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-column">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
                  <li><a onClick={() => scrollToSection('services')}>Services</a></li>
                  <li><a onClick={() => scrollToSection('projects')}>Our Work</a></li>
                  <li><a onClick={() => scrollToSection('consultation')}>Get a Quote</a></li>
                  <li><a href="#terms">Terms & Conditions</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Services */}
              <div className="footer-column">
                <h4 className="footer-heading">Our Services</h4>
                <ul className="footer-links">
                  <li>Roof Installation</li>
                  <li>Roof Repair</li>
                  <li>Emergency Leak Repair</li>
                  <li>Ceiling Installation</li>
                  <li>PVC Panel Installation</li>
                  <li>Spandrel Roofing</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="footer-column">
                <h4 className="footer-heading">Contact Us</h4>
                <ul className="footer-contact">
                  <li className="contact-item-footer">
                    <span className="contact-icon-footer">📍</span>
                    <span>J.A Clarin Corner Marapao St.<br />Tagbilaran City, Bohol</span>
                  </li>
                  <li className="contact-item-footer">
                    <span className="contact-icon-footer">📞</span>
                    <span>09177052591<br />09995818673</span>
                  </li>
                  <li className="contact-item-footer">
                    <span className="contact-icon-footer">✉️</span>
                    <span>goldencastleroofingbuilders@gmail.com</span>
                  </li>
                  <li className="contact-item-footer">
                    <span className="contact-icon-footer">🕒</span>
                    <span>Mon - Sat: 8:00 AM - 5:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="footer-divider"></div>
              <div className="footer-bottom-content">
                <p className="footer-copyright">
                  © {new Date().getFullYear()} Golden Castle Roofing Builders. Established 2013. All rights reserved.
                </p>
                <div className="footer-legal">
                  <a href="#terms">Terms of Service</a>
                  <span className="footer-separator">|</span>
                  <a href="#privacy">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;