import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <motion.div
        className="w-4 h-4 bg-[#3498db] rounded-full"
        animate={{
          y: [0, 10, 0],  // Move the dot up and down
        }}
        transition={{
          repeat: Infinity,  // Repeat infinitely
          repeatType: "loop",
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-4 h-4 bg-[#3498db] rounded-full"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.2,  // Staggered animation with a slight delay
        }}
      />
      <motion.div
        className="w-4 h-4 bg-[#3498db] rounded-full"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.4,  // Staggered animation with a slight delay
        }}
      />
    </div>
  );
};

export default Loader;
