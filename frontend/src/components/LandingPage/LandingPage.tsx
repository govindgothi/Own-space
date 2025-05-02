// // import { Button } from "@/components/ui/button";
// import {
//   FaCheckCircle,
//   FaLinkedin,
//   FaTwitter,
//   FaWhatsapp,
//   FaYoutube,
//   FaInstagram,
//   FaCloudUploadAlt,
//   FaLock,
//   FaRocket,
//   FaUsers,
//   FaRegSmileBeam,
//   FaServer,
//   FaShieldAlt,
//   FaCogs
// } from "react-icons/fa";

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col">
//       {/* Page 1: Hero Section (Light) */}
//       <section className="bg-orange-50 text-gray-900 py-24 px-6 md:px-16">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 animate-fade-in">
//           <div>
//             <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome to OwnSpace</h1>
//             <p className="text-lg mb-6 text-gray-700">Your reliable and secure cloud storage solution. Backup, manage, and access your files anytime, anywhere.</p>
//             {/* <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-full">
//               Get Started Free
//             </Button> */}
//           </div>
//           <div>
//             <img src="/assets/cloud-data.svg" alt="Cloud Illustration" className="w-full h-auto" />
//           </div>
//         </div>
//       </section>

//       {/* Page 2: Why Choose Us */}
//       <section className="bg-white py-20 px-6 md:px-16">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-10">Why Choose OwnSpace?</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
//               <FaShieldAlt className="text-orange-500 text-3xl mb-4" />
//               <h3 className="font-semibold text-xl">Secure Infrastructure</h3>
//               <p className="text-gray-600">We use advanced encryption and protection for all your files.</p>
//             </div>
//             <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
//               <FaCogs className="text-orange-500 text-3xl mb-4" />
//               <h3 className="font-semibold text-xl">Easy Integration</h3>
//               <p className="text-gray-600">Works seamlessly across platforms and devices.</p>
//             </div>
//             <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
//               <FaUsers className="text-orange-500 text-3xl mb-4" />
//               <h3 className="font-semibold text-xl">Collaborative Tools</h3>
//               <p className="text-gray-600">Invite your team to manage and share storage effortlessly.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Page 3: Services */}
//       <section className="bg-gray-900 text-white py-20 px-6 md:px-16">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-12">Our Cloud Services</h2>
//           <div className="grid md:grid-cols-3 gap-8 text-left">
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h3 className="text-xl font-semibold mb-2">Cloud Backup</h3>
//               <p className="text-gray-300">Real-time file syncing & scheduled cloud backups.</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h3 className="text-xl font-semibold mb-2">Enterprise Storage</h3>
//               <p className="text-gray-300">High availability storage for businesses.</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h3 className="text-xl font-semibold mb-2">Media Storage</h3>
//               <p className="text-gray-300">Optimized for storing and streaming media files.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Page 4: Our Customers */}
//       <section className="bg-white py-20 px-6 md:px-16">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-10">Trusted by Teams Worldwide</h2>
//           <div className="grid md:grid-cols-4 gap-6 items-center">
//             <img src="/logos/google.svg" className="h-10" alt="Google" />
//             <img src="/logos/amazon.svg" className="h-10" alt="Amazon" />
//             <img src="/logos/netflix.svg" className="h-10" alt="Netflix" />
//             <img src="/logos/microsoft.svg" className="h-10" alt="Microsoft" />
//           </div>
//         </div>
//       </section>

//       {/* Page 5: About Us */}
//       <section className="bg-orange-100 py-20 px-6 md:px-16">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-6">About OwnSpace</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             At OwnSpace, our mission is to simplify storage and give people total control of their data. We are a team of developers, engineers, and cloud architects working to deliver secure and blazing fast storage.
//           </p>
//         </div>
//       </section>

//             {/* Pricing Section */}
//       <section className="py-20 px-6 bg-gray-100">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-semibold mb-8">Pricing Plans</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Basic",
//                 price: "Free",
//                 features: ["5GB Storage", "Basic Support", "Community Access"]
//               },
//               {
//                 title: "Pro",
//                 price: "$9/mo",
//                 features: ["100GB Storage", "Priority Support", "Advanced Controls"]
//               },
//               {
//                 title: "Enterprise",
//                 price: "Custom",
//                 features: ["Unlimited Storage", "Dedicated Support", "Custom Solutions"]
//               }
//             ].map((plan, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white border p-6 rounded-xl shadow-md hover:shadow-lg"
//               >
//                 <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
//                 <p className="text-2xl text-orange-600 font-bold mb-4">{plan.price}</p>
//                 <ul className="text-left space-y-2 text-gray-600">
//                   {plan.features.map((f, i) => <li key={i}>✅ {f}</li>)}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Page 6: User Testimonials */}
//       <section className="bg-white py-20 px-6 md:px-16">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="bg-gray-100 p-6 rounded-lg shadow">
//               <p className="mb-4 text-gray-700">“Switching to OwnSpace improved my productivity and peace of mind.”</p>
//               <h4 className="font-semibold">– Kiran R., Developer</h4>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg shadow">
//               <p className="mb-4 text-gray-700">“Reliable, secure and just works — exactly what I needed.”</p>
//               <h4 className="font-semibold">– Meera T., Business Owner</h4>
//             </div>
//           </div>
//         </div>
//       </section>
      


//       {/* Page 7: Call to Action */}
//       <section className="bg-gray-900 text-white py-24 px-6 md:px-16">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-6">Start Your Free Journey Today</h2>
//           <p className="text-lg mb-6 text-gray-300">Get access to powerful storage tools and manage your files like a pro.</p>
//           {/* <Button className="bg-orange-500 hover:bg-orange-600 text-lg px-6 py-3 rounded-full">
//             Create Your Account
//           </Button> */}
//         </div>
//       </section>

//       {/* Page 8: Contact & Footer */}
//          {/* Footer */}
//       <footer className="bg-gray-900 text-white py-10 px-6">
//         <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div>
//             <h4 className="text-xl font-bold mb-2">Our Cloud</h4>
//             <p className="text-gray-400">
//               Secure cloud storage made simple. Start managing your files with confidence.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-xl font-bold mb-2">Quick Links</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">Features</a></li>
//               <li><a href="#" className="hover:text-white">Pricing</a></li>
//               <li><a href="#" className="hover:text-white">Support</a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xl font-bold mb-2">Follow Us</h4>
//             <div className="flex gap-4 text-xl text-white">
//               <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
//               <a href="#" aria-label="Twitter X"><FaTwitter /></a>
//               <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
//               <a href="#" aria-label="YouTube"><FaYoutube /></a>
//               <a href="#" aria-label="Instagram"><FaInstagram /></a>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 text-center text-gray-500 text-sm">
//           &copy; {new Date().getFullYear()} Our Cloud. All rights reserved.
//         </div>
//       </footer>

//     </div>
//   );
// }




//   );
// };

// export default LandingPage;
// import { Button } from "@/components/ui/button";
import {
  FaCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaCloudUploadAlt,
  FaLock,
  FaRocket,
  FaUsers,
  FaRegSmileBeam,
  FaServer,
  FaShieldAlt,
  FaCogs
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-orange-50 text-gray-900 py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome to O-SPACE</h1>
            <p className="text-lg mb-6 text-gray-700">
              Cloud storage built for security, speed, and simplicity. Manage and share your data with confidence.
            </p>
            {/* <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-full">
              Get Started Free
            </Button> */}
          </div>
          <div>
            <img src="/assets/cloud-data.svg" alt="Cloud Illustration" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose O-SPACE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
              <FaShieldAlt className="text-orange-500 text-3xl mb-4" />
              <h3 className="font-semibold text-xl">Secure Infrastructure</h3>
              <p className="text-gray-600">Enterprise-grade encryption and zero-trust authentication.</p>
            </div>
            <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
              <FaRocket className="text-orange-500 text-3xl mb-4" />
              <h3 className="font-semibold text-xl">Lightning Speed</h3>
              <p className="text-gray-600">Upload and download your data in seconds.</p>
            </div>
            <div className="p-6 shadow-md rounded-lg hover:shadow-xl transition bg-gray-50">
              <FaCogs className="text-orange-500 text-3xl mb-4" />
              <h3 className="font-semibold text-xl">Easy Integration</h3>
              <p className="text-gray-600">Connect with your tools and automate storage workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-900 text-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Cloud Services</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Cloud Backup</h3>
              <p className="text-gray-300">Real-time file syncing & automated cloud backups.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Enterprise Storage</h3>
              <p className="text-gray-300">High availability storage for your team or business.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Media Storage</h3>
              <p className="text-gray-300">Streamlined media hosting with fast CDN delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Trusted by Companies Worldwide</h2>
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <img src="/logos/google.svg" className="h-10" alt="Google" />
            <img src="/logos/amazon.svg" className="h-10" alt="Amazon" />
            <img src="/logos/netflix.svg" className="h-10" alt="Netflix" />
            <img src="/logos/microsoft.svg" className="h-10" alt="Microsoft" />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-orange-100 py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About O-SPACE</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At O-SPACE, we're building the future of cloud storage for everyone — from freelancers to enterprises. We focus on performance, scalability, and privacy.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="mb-4 text-gray-700">“O-SPACE gave us peace of mind for our team collaboration.”</p>
              <h4 className="font-semibold">– Ravi M., CTO</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="mb-4 text-gray-700">“No more file chaos. Super secure and fast uploads.”</p>
              <h4 className="font-semibold">– Neha T., Freelancer</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Extra: File Features */}
      <section className="bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Smart File Management</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <FaCloudUploadAlt className="text-3xl text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Upload</h3>
              <p className="text-gray-600">Upload multiple files easily with seamless experience.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <FaLock className="text-3xl text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
              <p className="text-gray-600">Private links, password protection & expiry controls.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <FaRegSmileBeam className="text-3xl text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Simple UI</h3>
              <p className="text-gray-600">A friendly experience across desktop and mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-6 text-gray-300">Create your free account and enjoy the future of cloud storage.</p>
          {/* <Button className="bg-orange-500 hover:bg-orange-600 text-lg px-6 py-3 rounded-full">
            Join O-SPACE Now
          </Button> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-400">Email: support@ospace.com</p>
            <p className="text-sm text-gray-400">Phone: +91 9876543210</p>
          </div>
          <div className="flex gap-4 justify-center md:justify-end text-xl">
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-6">© 2025 O-SPACE. All rights reserved.</div>
      </footer>
    </div>
  );
}
