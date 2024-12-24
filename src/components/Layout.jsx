// src/components/layout/Layout.jsx
import { motion } from 'framer-motion';
import BottomBar from './BottomBar'; // Update the import path as needed

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-50/40 flex items-center justify-center">
      <motion.div 
        className="mx-auto w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden border-x border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main className="relative h-full w-full pb-[100px]"> {/* Increased padding for floating bar */}
          {children}
        </main>
        <BottomBar />
      </motion.div>
    </div>
  );
};

export default Layout;