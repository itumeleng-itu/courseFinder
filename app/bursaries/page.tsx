"use client"
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export default function BursariesPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl shadow-lg text-white">
      <GoogleAnalytics />
      <h1 className="text-4xl font-extrabold mb-4 text-blue-200 drop-shadow">🎓 Bursaries</h1>
      <p className="mb-6 text-lg text-blue-100">
        Discover bursary opportunities for South African students. These financial aids can help you achieve your academic dreams!
      </p>
      <div className="bg-blue-800/60 rounded-lg p-6 mb-6 shadow-inner">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold text-blue-100">NSFAS Bursary:</span>
            <a
              href="https://www.nsfas.org.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 ml-1"
            >
              www.nsfas.org.za
            </a>
            <span className="text-blue-200"> For financially needy students at public universities and TVET colleges.</span>
          </li>
          <li>
            <span className="font-semibold text-blue-100">Funza Lushaka Bursary:</span>
            <a
              href="https://www.funzalushaka.doe.gov.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 ml-1"
            >
              www.funzalushaka.doe.gov.za
            </a>
            <span className="text-blue-200"> For students studying to become teachers in priority subject areas.</span>
          </li>
          <li>
            <span className="font-semibold text-blue-100">Department of Health Bursaries:</span>
            <a
              href="https://www.health.gov.za/bursary/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 ml-1"
            >
              www.health.gov.za/bursary/
            </a>
            <span className="text-blue-200"> For students pursuing health sciences and related fields.</span>
          </li>
          <li>
            <span className="font-semibold text-blue-100">Private Sector Bursaries:</span>
            <a
              href="https://nstf.org.za/available-bursaries-undergraduates/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 ml-1"
            >
              nstf.org.za/available-bursaries-undergraduates/
            </a>
            <span className="text-blue-200"> Offered by banks, companies, and NGOs for various study fields.</span>
          </li>
          
        </ul>
      </div>
      <div className="mt-8 text-sm text-blue-300 italic">
      </div>
      {/* Google Analytics Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3C11RRX3FV');

            // Track link clicks globally
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                  gtag('event', 'click', {
                    'event_category': 'Outbound Link',
                    'event_label': this.href,
                    'transport_type': 'beacon'
                  });
                });
              });
            });
          `,
        }}
      />
    </div>
  );
}