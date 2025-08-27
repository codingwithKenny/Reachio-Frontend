import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageSquare, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-8 py-4 shadow-md bg-white/90 backdrop-blur">
        <img src="/reachio.png" alt="logo" className="h-10 w-auto ml-22" />
        {/* <h1 className="text-2xl font-bold text-purple-600">Reachio</h1> */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#features" className="hover:text-purple-600 transition">Features</a>
          <a href="#survey" className="hover:text-purple-600 transition">Pricing</a>
          <a href="#contact" className="hover:text-purple-600 transition">Contact</a>
        </nav>
        <div className="flex flex-col sm:flex-row gap-2">
  <Link
    to="/login"
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition text-center"
  >
    Log in
  </Link>
  <Link
    to="/register"
    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition text-center"
  >
    Register
  </Link>
</div>


      </header>

      {/* Hero */}
      <section className="px-6 lg:px-16 py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Bring Back Customers. <br /> Grow Your Business.
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Reachio helps you reconnect with past customers through smart
              reminders, personalized messages, and print-ready leaflets.
            </p>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition">
                Start Free
              </button>
              <a href="#features" className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 text-lg transition">
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-purple-100 bg-black">
              <video
                className="w-full h-full object-cover"
                src="/reachioIllustratio.mp4"
                poster="/images/hero-poster.jpg"
                autoPlay
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Survey Insight */}
      <section id="survey" className="px-6 lg:px-16 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Why Reaching Out Matters
        </h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Businesses that consistently follow up with customers see a{" "}
          <span className="font-semibold text-purple-600">big jump in repeat sales</span>.
          Customer retention can’t be overemphasized—it’s the lifeline of growth.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="bg-purple-50 rounded-2xl p-6 text-center shadow">
            <h4 className="text-4xl font-extrabold text-purple-700">+60%</h4>
            <p className="text-gray-600 mt-2">Higher repeat purchases with follow-ups</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 text-center shadow">
            <h4 className="text-4xl font-extrabold text-purple-700">3×</h4>
            <p className="text-gray-600 mt-2">More engagement from personalized messages</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 text-center shadow">
            <h4 className="text-4xl font-extrabold text-purple-700">90%</h4>
            <p className="text-gray-600 mt-2">Owners say follow-ups build loyalty</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 lg:px-16 py-16 bg-purple-50">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How Reachio Helps You
        </h3>
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <PhoneCall className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-2">Customer Details</h4>
            <p className="text-gray-600">Collect and manage customer info in one dashboard.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-2">Smart Messages</h4>
            <p className="text-gray-600">Draft and send personalized messages in one click.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
            <ChartBar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-2">Track Engagement</h4>
            <p className="text-gray-600">See message history and responses at a glance.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-16 py-16 bg-white">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
          What Our Users Say
        </h3>
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
          {["Jane D., Shop Owner", "Mark S., Cafe Owner", "Lisa P., Boutique Owner"].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-2xl p-6 shadow text-center"
            >
              <p className="text-gray-700 mb-4">
                "Reachio helped me reconnect with old customers and boost sales!"
              </p>
              <span className="font-bold text-purple-600">– {name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      {/* <section className="px-6 lg:px-16 py-16 bg-purple-50 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-12">Pricing Plans</h3>
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
          {[
            { title: "Free", price: "$0", desc: "Basic features to try Reachio.", btn: "Get Started", highlight: false },
            { title: "Pro", price: "$29/mo", desc: "All features for growing businesses.", btn: "Upgrade", highlight: true },
            { title: "Enterprise", price: "Custom", desc: "Tailored solutions for large businesses.", btn: "Contact Us", highlight: false },
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition ${plan.highlight ? "border-2 border-purple-600" : ""}`}
            >
              <h4 className="font-bold text-xl mb-4">{plan.title}</h4>
              <p className="text-purple-600 text-3xl font-extrabold mb-4">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.desc}</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition">
                {plan.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* CTA Banner */}
      <section className="px-6 lg:px-16 py-16 bg-purple-600 text-white text-center rounded-2xl mx-6 lg:mx-16 my-12">
        <h3 className="text-3xl font-bold mb-4">Ready to bring back your customers?</h3>
        <p className="mb-6">Start using Reachio today and grow your business effortlessly.</p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-xl transition">
          Start Free
        </button>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-16 py-16 bg-white">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h3>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { q: "Can I try Reachio for free?", a: "Yes! Our free plan lets you test all basic features." },
            { q: "Do I need technical skills?", a: "Not at all. Reachio is user-friendly and ready to use." },
            { q: "Can I upgrade later?", a: "Yes, you can switch plans anytime without losing data." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg">{faq.q}</h4>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
         <footer id="contact" className="bg-gray-900 text-white py-8 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h4 className="text-lg font-semibold">© 2025 Reachio. All rights reserved.</h4>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-400">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400">Terms</a>
            <a href="#" className="hover:text-purple-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
