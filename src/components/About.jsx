import { motion } from "framer-motion";
import ImageTrail from '../ImageTrail/ImageTrail';

const About = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <motion.div
        className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 text-center border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-4">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-blue-600">Jesus Army</span> ✝️<br /><br />
          We are a passionate community of believers who began our journey on{" "}
          <span className="text-blue-500 font-medium">January 4, 2022</span>. Through the
          endless grace of God, we’ve grown into a united family committed to
          sharing love, faith, and hope to the world.
        </p>
      </motion.div>

      <div className="relative h-[500px] w-full max-w-6xl overflow-hidden rounded-xl shadow-lg border border-blue-200">
        <ImageTrail
          items={[
            'https://picsum.photos/id/287/300/300',
            'https://picsum.photos/id/1001/300/300',
            'https://picsum.photos/id/1025/300/300',
            'https://picsum.photos/id/1026/300/300',
            'https://picsum.photos/id/1027/300/300',
            'https://picsum.photos/id/1028/300/300',
            'https://picsum.photos/id/1029/300/300',
            'https://picsum.photos/id/1030/300/300',
          ]}
          variant={1}
        />
      </div>
    </section>
  );
};

export default About;
