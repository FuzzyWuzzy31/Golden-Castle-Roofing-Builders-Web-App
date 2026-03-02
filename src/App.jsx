import React, { useState } from 'react';
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
    }
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
      <main>
        {/* --- Hero Section --- */}
        <section className="hero-section">
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
        <section className="section">
          <h2 className="section-heading heading-underline">Our Services</h2>

          <div className="service-card">
            <h3>Roof Installation</h3>
            <p>We provide expert installation of top-quality roofing systems, ensuring durability and weather resistance.</p>
            <button 
              onClick={() => toggleService('installation')} 
              className="read-more"
            >
              {expandedService === 'installation' ? 'Show Less ↑' : 'Read More →'}
            </button>
            
            <div className={`service-details ${expandedService === 'installation' ? 'expanded' : ''}`}>
              <div className="service-details-content">
                <h4>What We Offer:</h4>
                <ul className="service-list">
                  <li><strong>Premium Materials:</strong> We use only high-grade roofing materials from trusted manufacturers, ensuring longevity and performance.</li>
                  <li><strong>Expert Installation:</strong> Our certified roofing specialists follow industry best practices and safety standards for every project.</li>
                  <li><strong>Custom Solutions:</strong> From traditional shingles to modern metal roofing, we tailor our approach to your specific needs and budget.</li>
                  <li><strong>Comprehensive Warranty:</strong> All installations come with manufacturer warranties and our workmanship guarantee.</li>
                  <li><strong>Energy Efficiency:</strong> Options for reflective and insulated roofing systems to reduce cooling costs and improve comfort.</li>
                </ul>
                <h4>Our Process:</h4>
                <ol className="service-process">
                  <li>Free on-site inspection and consultation</li>
                  <li>Detailed quote with material options and timeline</li>
                  <li>Professional removal of old roofing (if applicable)</li>
                  <li>Quality installation with attention to detail</li>
                  <li>Thorough cleanup and final walkthrough</li>
                </ol>
                <p className="service-note">Average project completion: 7-15 days depending on size and complexity.</p>
              </div>
            </div>
          </div>

          <div className="service-card">
            <h3>Roof Repair</h3>
            <p>Fix leaks, damaged shingles, and wear and tear immediately to prevent further damage.</p>
            <button 
              onClick={() => toggleService('repair')} 
              className="read-more"
            >
              {expandedService === 'repair' ? 'Show Less ↑' : 'Read More →'}
            </button>
            
            <div className={`service-details ${expandedService === 'repair' ? 'expanded' : ''}`}>
              <div className="service-details-content">
                <h4>Common Repairs We Handle:</h4>
                <ul className="service-list">
                  <li><strong>Leak Detection & Repair:</strong> Advanced diagnostic techniques to identify and fix all sources of water intrusion.</li>
                  <li><strong>Shingle Replacement:</strong> Replace damaged, missing, or wind-blown shingles with color-matched materials.</li>
                  <li><strong>Flashing Repair:</strong> Fix or replace damaged flashing around chimneys, vents, and skylights to prevent leaks.</li>
                  <li><strong>Structural Repairs:</strong> Address underlying deck damage, rot, or structural issues before they worsen.</li>
                  <li><strong>Gutter & Drainage:</strong> Repair or realign gutters and downspouts for proper water management.</li>
                </ul>
                <h4>Why Choose Us for Repairs:</h4>
                <ul className="service-list">
                  <li>Fast response time - usually within 24-48 hours</li>
                  <li>Transparent pricing with no hidden fees</li>
                  <li>Quality repairs that match your existing roof</li>
                  <li>Preventive maintenance recommendations</li>
                  <li>Documentation with before/after photos</li>
                </ul>
                <p className="service-note">Most repairs completed in 2-3 days. Emergency services available.</p>
              </div>
            </div>
          </div>

          {/* The Featured "Emergency" Card */}
          <div className="service-card emergency">
            <h3>Emergency Leak Repair</h3>
            <p>Need immediate assistance? Our team is ready to handle urgent repairs to protect your home safely.</p>
            <button className="btn-red">Call Now</button>
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
                <img src="/images/team/foreman.jpg" alt="Architect" className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Ar. Jessie Optina</h3>
                <p className="team-position">Company Architect</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image-wrapper">
                <img src="/images/team/estimator.jpg" alt="Secretary" className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Joan Optina</h3>
                <p className="team-position">Secretary</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-image-wrapper">
                <img src="/images/team/specialist.jpg" alt="Estimator" className="team-image" />
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
                <div className="project-overlay">View Project</div>
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
      </main>
    </div>
  );
}

export default App;