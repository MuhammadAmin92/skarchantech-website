const ContactPage = () => {
  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Contact Us</h1>
          <p style={styles.pageSub}>We're here to help you!</p>
        </div>
      </div>

      <div style={styles.container}>

        {/* Top Section */}
        <div style={styles.topGrid}>

          {/* Contact Info */}
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Get In Touch</h2>
            <p style={styles.infoDesc}>
              Have a question about a product? Want to visit our store?
              We'd love to hear from you. Reach out through any of the
              channels below.
            </p>

            <div style={styles.infoCards}>
              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📍</div>
                <div>
                  <h3 style={styles.infoTitle}>Store Address</h3>
                  <p style={styles.infoText}>Main Bazar, Skarchan</p>
                  <p style={styles.infoText}>Gilgit Baltistan, Pakistan</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📞</div>
                <div>
                  <h3 style={styles.infoTitle}>Phone Numbers</h3>
                  <p style={styles.infoText}>+92 300 0000000</p>
                  <p style={styles.infoText}>+92 345 0000000</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📧</div>
                <div>
                  <h3 style={styles.infoTitle}>Email Address</h3>
                  <p style={styles.infoText}>info@skarchan.com</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>🕐</div>
                <div>
                  <h3 style={styles.infoTitle}>Working Hours</h3>
                  <p style={styles.infoText}>Monday - Saturday: 9am - 9pm</p>
                  <p style={styles.infoText}>Sunday: 11am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Send Us a Message</h2>

            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type='text'
                  placeholder='Enter your full name'
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type='text'
                  placeholder='Enter your phone number'
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type='email'
                  placeholder='Enter your email'
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  placeholder='Write your message here...'
                  rows={5}
                  style={styles.textarea}
                />
              </div>

              <button style={styles.sendBtn}>
                Send Message →
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={styles.mapSection}>
          <h2 style={styles.sectionTitle}>Our Location</h2>
          <div style={styles.mapBox}>
            <div style={styles.mapLeft}>
              <div style={styles.mapIcon}>🗺️</div>
              <h3 style={styles.mapTitle}>Skarchan Mobile & Electronics</h3>
              <p style={styles.mapAddress}>Main Bazar, Skarchan</p>
              <p style={styles.mapAddress}>Gilgit Baltistan, Pakistan</p>
              
              <a
                href='https://www.google.com/maps/place/Skarchan+mobile+shop/@35.1635203,76.3440043,20.5z/data=!4m14!1m7!3m6!1s0x38e4a9005fa5a6e7:0x168978e5520e179f!2sSkarchan+mobile+shop!8m2!3d35.1633973!4d76.343858!16s%2Fg%2F11v_4r_9_d!3m5!1s0x38e4a9005fa5a6e7:0x168978e5520e179f!8m2!3d35.1633973!4d76.343858!16s%2Fg%2F11v_4r_9_d?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noreferrer'
                style={styles.mapBtn}
              >
                Open in Google Maps →
              </a>
            </div>
            <div style={styles.mapRight}>
              <div style={styles.mapPlaceholder}>
                <p style={styles.mapPlaceholderText}>📍 Skarchan, Mobile & Electronics</p>
                <p style={styles.mapPlaceholderSub}>Near HBL bank khaplu baranch</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#f5f5f5', minHeight: '100vh' },
  pageHeader: { backgroundColor: '#111111', padding: '35px 30px' },
  pageHeaderInner: { maxWidth: '1200px', margin: '0 auto' },
  pageTitle: { fontSize: '30px', fontWeight: '800', color: '#ffffff', marginBottom: '5px' },
  pageSub: { color: '#888', fontSize: '14px' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '30px' },
  topGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '25px',
  marginBottom: '25px'
},
  infoSection: {
    backgroundColor: '#111111',
    borderRadius: '12px',
    padding: '30px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '12px'
  },
  infoDesc: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.7',
    marginBottom: '25px'
  },
  infoCards: { display: 'flex', flexDirection: 'column', gap: '18px' },
  infoCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    backgroundColor: '#1a1a1a',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #222'
  },
  infoIconBox: {
    backgroundColor: '#0066ff22',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  infoTitle: { fontSize: '13px', fontWeight: '700', color: '#0066ff', marginBottom: '5px' },
  infoText: { color: '#888', fontSize: '13px', lineHeight: '1.7' },
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid #eeeeee'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#444' },
  input: {
    padding: '13px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#111'
  },
  textarea: {
    padding: '13px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#111',
    resize: 'vertical'
  },
  sendBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700'
  },
  mapSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid #eeeeee'
  },
  mapBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '25px',
    alignItems: 'center'
  },
  mapLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  mapIcon: { fontSize: '40px' },
  mapTitle: { fontSize: '16px', fontWeight: '700', color: '#111' },
  mapAddress: { color: '#888', fontSize: '13px' },
  mapBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    marginTop: '10px',
    display: 'inline-block'
  },
  mapRight: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    overflow: 'hidden',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eee'
  },
  mapPlaceholder: { textAlign: 'center' },
  mapPlaceholderText: { fontSize: '18px', color: '#111', fontWeight: '700', marginBottom: '8px' },
  mapPlaceholderSub: { color: '#888', fontSize: '13px' }
};

export default ContactPage;