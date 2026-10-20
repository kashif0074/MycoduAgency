interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-high border border-outline-variant max-w-2xl w-full rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative text-on-surface">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-variant/40"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <h2 className="font-headline-md text-2xl font-bold text-on-surface">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <p>
                At <strong>Mycodu Agency</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard information when you use our website, consult with our AI assistant, or submit contact requests.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us through our project inquiry forms and chat assistant, including your name, email address, project requirements, and estimated budget.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">2. How We Use Your Information</h3>
              <p>
                We use collected information solely to assess project feasibility, formulate technical proposals, respond to inquiries, and provide software engineering services. We never sell or share your data with third-party advertisers.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">3. Data Security</h3>
              <p>
                We implement industry-standard security measures including SSL/TLS encryption, secure database clusters, and strict access controls to protect your data.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">4. Contact Us</h3>
              <p>
                For questions regarding this privacy policy or your personal data, please contact us at <span className="text-primary">contact@mycodu.com</span>.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">gavel</span>
              <h2 className="font-headline-md text-2xl font-bold text-on-surface">Terms of Service</h2>
            </div>
            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <p>
                Welcome to <strong>Mycodu Agency</strong>. By accessing our platform or engaging our services, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">1. Engagement &amp; Proposals</h3>
              <p>
                All software development, AI engineering, and technical consulting deliverables are governed by individual Statement of Work (SOW) agreements executed between Mycodu Agency and the client.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">2. Intellectual Property</h3>
              <p>
                Upon final settlement of project invoices, all custom software, bespoke source code, and design assets developed exclusively for the client transfer entirely to client ownership.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">3. Limitation of Liability</h3>
              <p>
                Mycodu Agency delivers systems built according to rigorous engineering standards. Any warranties regarding uptime, third-party API dependencies, or hosting SLAs are defined within specific service level agreements.
              </p>
              <h3 className="text-base font-bold text-on-surface pt-2">4. Inquiries</h3>
              <p>
                For legal notices or contract inquiries, contact our team at <span className="text-primary">legal@mycodu.com</span>.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold hover:scale-105 transition-all text-on-primary-fixed"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
