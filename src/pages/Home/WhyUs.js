import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const FEATURES = [
  { title: 'Learn from industry experts', desc: 'Our instructors are leading professionals with years of experience.' },
  { title: 'Project-based learning', desc: 'Build real-world projects that you can add to your portfolio.' },
  { title: 'Flexible scheduling', desc: 'Learn at your own pace with lifetime access to all course materials.' },
  { title: 'Verified certificates', desc: 'Earn recognized certificates upon completion of every course.' }
];

const WhyUs = () => {
  return (
    <section className="bg-gray-900 text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
              Everything you need to <span className="text-brand-light">succeed</span> is here.
            </h2>
            <div className="space-y-6">
              {FEATURES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-light font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-brand/10 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 z-10"
              >
                <ArrowRight size={32} className="rotate-[-45deg]" />
              </motion.div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                alt="Success"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/30 blur-[100px] rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
export default WhyUs;