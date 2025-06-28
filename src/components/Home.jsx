import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiMapPin,
  FiSearch,
  FiDollarSign,
  FiHome,
  FiTrendingUp,
  FiShoppingBag,
} from "react-icons/fi";
import Home_Right_image from "../assets/Home_Page_Image_Side_1.png";
import Home_Main_image from "../assets/Home_Page_Main_Image.png";

import GlitchText from "./ui/Glitch";
import { useNavigate } from "react-router-dom";
import FeaturedProperties from "./FeaturedProperties";

const HomePage = () => {
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true });

  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true });

  const navigate=useNavigate()
  const services = [
    {
     
      title: "Rent A Home",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      icon: <FiHome size={36} />,
     
      color: "text-gray-700",
      action:()=>navigate('/sell')
    },
    {
      title: "Sell A Home",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      icon: <FiTrendingUp size={36} />,
      color: "text-blue-600",
      action:()=>navigate('/sell')
    },
    {
      title: "Buy A Home",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      icon: <FiShoppingBag size={36} />,
      color: "text-gray-700",
      action:()=>navigate('/allProperties')
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative h-[90vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Home_Main_image})` }}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl tracking-wide drop-shadow-lg"
          >
            FIND YOUR NEXT <br />
            PERFECT <span className="text-blue-400">PLACE</span>
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 w-fit"
          >
            <GlitchText text="Explore More"/>
          </motion.button>

          {/* Search Filters */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/30 mt-10 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4 max-w-5xl"
          >
            {[
              { icon: <FiMapPin />, placeholder: "Location" },
              { icon: <FiSearch />, placeholder: "Type" },
              { icon: <FiDollarSign />, placeholder: "Price Range" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white/20 backdrop-blur-md px-4 py-3 rounded-md w-full text-white"
              >
                {item.icon}
                <input
                  type="text"
                  placeholder={item.placeholder}
                  className="bg-transparent outline-none w-full placeholder:text-white/70 ml-2"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <FeaturedProperties/>

      {/* Info Section */}
      <div className="py-20 px-6 md:px-24 bg-white grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content with Scroll Animation */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, y: 40 }}
          animate={leftInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h5 className="text-blue-600 uppercase font-semibold tracking-wider">
            Who we are?
          </h5>
          <h2 className="text-4xl font-bold leading-snug">
            The Experts In Property
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are a leading company in the real estate sector, specializing in
            providing a wide range of services and solutions to meet the needs
            of buying, renting, and managing real estate assets. With experience
            and dedication, we are committed to excellence.
          </p>

          <div className="grid grid-cols-2 gap-6 text-center">
            {[
              { number: "8+", label: "Years Experience" },
              { number: "350+", label: "Expert Researchers" },
              { number: "10K+", label: "Real Estate Agents" },
              { number: "2.5K+", label: "Listing for Sale" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="text-2xl font-bold text-blue-600">
                  {item.number}
                </p>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300">
            Explore More
          </button>
        </motion.div>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: 100 }}
          animate={imageInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <img
            src={Home_Right_image}
            alt="Modern building"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
      <section className="bg-white py-16 px-6 md:px-24 text-center">
        <p className="uppercase text-sm text-gray-500 mb-2 tracking-wider">
          Discover Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block">
          What We Are Providing
          <span className="block h-1 w-8 bg-pink-500 mx-auto mt-2 rounded"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
            >
              <div  className= {`${service.color} mb-4`}>{service.icon}</div>
              <h3
                className={` cursor-pointer text-xl font-semibold mb-2  ${
                  index === 1 ? "text-blue-600" : "text-gray-800"
                }`}
                onClick={service.action}
                
              >
                
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
