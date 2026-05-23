import { motion } from 'motion/react';
import { PlayCircle, Star, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-6">
              Learn from the experts
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Unlock Your Potential <br />
              <span className="text-brand">Anywhere, Anytime.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Join 50 million+ learners around the world and master new skills from design to development. Simple, affordable, and effective.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-brand/25 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
              >
                Start Learning Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle size={20} className="text-brand" />
                View Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Students studying"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent pointer-events-none" />
            </div>
          
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">4.9/5</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Course Rating</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute top-1/4 -right-10 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="bg-brand/10 p-3 rounded-xl text-brand">
                <Users size={24} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">50k+</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Learners</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-brand/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-orange-50 blur-3xl rounded-full" />
    </section>
  );
}
export default Hero;