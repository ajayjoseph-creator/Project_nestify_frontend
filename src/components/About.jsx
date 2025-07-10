import { motion } from "framer-motion";
import { FiHome, FiTrendingUp, FiShoppingBag } from "react-icons/fi";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

// Testimonials section component
export function LocalTestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="mt-32">
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}

// Main About Page Component
const AboutPage = () => {
  return (
    <section className="min-h-screen bg-white from-blue-50 to-white py-16 px-6 md:px-24 text-gray-800 mt-24">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-blue-700 mb-4">About Nestify</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nestify is your trusted companion in buying, selling, or renting homes. We blend technology and simplicity to make your real estate journey smoother.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24"
      >
        {[
          {
            title: "Buy a Home",
            icon: <FiHome size={36} />,
            desc: "Discover a wide range of properties that match your dream lifestyle.",
          },
          {
            title: "Sell a Home",
            icon: <FiTrendingUp size={36} />,
            desc: "Get the best value for your property with expert support and visibility.",
          },
          {
            title: "Rent a Home",
            icon: <FiShoppingBag size={36} />,
            desc: "Flexible rental options that suit every need and budget.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md border hover:shadow-xl transition duration-300 text-center"
          >
            <div className="text-blue-600 mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 bg-white p-10 rounded-2xl shadow-xl border max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          We are on a mission to make real estate transparent, reliable, and stress-free. At Nestify, we believe everyone deserves a safe place to call home. Whether you’re buying your first house, selling your old one, or searching for the perfect rental, we’re here with you every step of the way.
        </p>
      </motion.div>

      {/* Testimonials Section */}
      <LocalTestimonialsSection />
    </section>
  );
};

export default AboutPage;
