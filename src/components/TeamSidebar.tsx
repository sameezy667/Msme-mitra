export default function TeamSidebar() {
  const teamMembers = [
    { name: "Sameer Dhir", role: "Project Lead", avatar: "avatar-1" },
    { name: "Sanidhya Vijay", role: "Frontend Dev", avatar: "avatar-2" }, 
    { name: "Dhruv Gehlot", role: "Backend Dev", avatar: "avatar-3" },
    { name: "Ishan Gautam", role: "AI Specialist", avatar: "avatar-4" },
    { name: "Shresth Senwal", role: "UI/UX Designer", avatar: "avatar-5" }
  ];

  return (
    <div className="w-80 xl:w-96 pro-card-dark border-l border-gray-800">
      <div className="p-6 xl:p-8">
        {/* Header */}
        <div className="mb-6 xl:mb-8">
          <h2 className="text-xl xl:text-2xl font-bold text-white mb-2">Team Information</h2>
          <div className="h-1 w-16 bg-orange-500 rounded-full"></div>
        </div>
        
        {/* Team Members */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            Development Team
          </h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="sidebar-item rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${member.avatar} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-200">{member.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{member.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            About MSME-Mitra
          </h3>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-sm text-gray-300 space-y-3 font-medium">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                GST compliance guidance
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Export documentation help
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Tax filing assistance
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Bilingual support (Hindi/English)
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Instant answers for MSMEs
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
            </svg>
            Quick Help
          </h3>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-xs text-gray-400 mb-3 font-semibold">Try asking:</p>
            <ul className="text-xs text-gray-300 space-y-2 font-medium">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">•</span>
                &quot;GST rate for exports?&quot;
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">•</span>
                &quot;GSTR-1 filing date?&quot;
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">•</span>
                &quot;Export documents needed?&quot;
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-0.5">•</span>
                &quot;Late fee calculation?&quot;
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Plan CTA */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">Need More Help?</h4>
            <p className="text-sm text-gray-300 mb-4 font-medium">
              Get monthly compliance support with our premium plan and expert consultations.
            </p>
            <button className="w-full btn-primary py-3 rounded-xl font-bold">
              Learn More →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xl font-bold text-orange-500">15+</div>
            <div className="text-xs text-gray-400 font-medium">Topics Covered</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
            <div className="text-xl font-bold text-orange-500">24/7</div>
            <div className="text-xs text-gray-400 font-medium">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
