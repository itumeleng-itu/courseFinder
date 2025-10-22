"use client";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export default function CollegesPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 rounded-xl shadow-lg text-white">
      <GoogleAnalytics />
      <h1 className="text-4xl font-extrabold mb-4 text-purple-200 drop-shadow">
        🏫 Private Colleges & Universities
      </h1>
      <p className="mb-6 text-lg text-purple-100">
        Explore some of the top private colleges and universities in South Africa.
      </p>
      <div className="bg-purple-800/60 rounded-lg p-6 mb-6 shadow-inner">
        <h2 className="text-2xl font-bold mb-2 text-purple-100">Private Colleges</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.rosebankcollege.co.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Rosebank College
            </a>
          </li>
          <li>
            <a href="https://www.varsitycollege.co.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Varsity College
            </a>
          </li>
          <li>
            <a href="https://www.richfield.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Richfield Graduate Institute
            </a>
          </li>
          <li>
            <a href="https://www.milpark.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Milpark Education
            </a>
          </li>
          <li>
            <a href="https://stadio.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Stadio
            </a>
          </li>
          <li>
            <a href="https://www.boston.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Boston City Campus
            </a>
          </li>
          <li>
            <a href="https://rostec.edu.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Rostec College
            </a>
          </li>
          
        </ul>
      </div>
      <div className="bg-purple-800/60 rounded-lg p-6 mb-6 shadow-inner">
        <h2 className="text-2xl font-bold mb-2 text-purple-100">Private Universities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://www.iiemsa.co.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Monash South Africa (IIE MSA)
            </a>
          </li>
          <li>
            <a href="https://hche.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Helderberg College
            </a>
          </li>
          <li>
            <a href="https://afda.co.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              AFDA (The School for the Creative Economy)
            </a>
          </li>
          <li>
            <a href="https://cornerstone.ac.za/" target="_blank" rel="noopener noreferrer" className="underline text-purple-300">
              Cornerstone Institute
            </a>
          </li>
         
        </ul>
      </div>
      <div className="mt-8 text-sm text-purple-300 italic">
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
