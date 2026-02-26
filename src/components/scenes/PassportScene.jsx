import React from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Globe } from 'lucide-react';
import photo1 from '../../assets/photo1.png';

const PassportScene = ({ onNext }) => {
    const details = [
        { label: 'Surname', value: 'BULBULE' },
        { label: 'Name', value: 'VEDIKA' },
        { label: 'Nationality', value: 'INDIAN' },
        { label: 'Date of Birth', value: '28 FEB 2010' },
        { label: 'Sex', value: 'F' },
        { label: 'Place of Birth', value: 'INDIA' },
    ];

    return (
        <div className="w-full h-full bg-[#f8f9fa] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Minimalist Background elements */}
            <div className="absolute inset-0 z-0 opacity-5">
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full border-[1px] border-black rounded-full"
                />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-neutral-100 overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left Side: Photo & Identity */}
                <div className="p-10 bg-white md:w-1/3 flex flex-col items-center border-r border-neutral-100">
                    <div className="w-36 h-48 bg-white rounded-md overflow-hidden border border-neutral-300 mb-8 shadow-sm relative group">
                        <img
                            src={photo1}
                            alt="Vedika"
                            className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                        />
                        {/* Stamp effect */}
                        <div className="absolute -bottom-2 -right-4 w-12 h-12 border-2 border-black/40 rounded-full opacity-40 flex items-center justify-center rotate-12">
                            <span className="text-[8px] font-black text-black uppercase">Verified</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-black font-black text-xl tracking-tighter mb-1">REPUBLIC OF INDIA</h2>
                        <div className="flex items-center justify-center gap-1.5 text-black/40 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Globe size={12} />
                            <span>Passport</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 flex flex-col items-center gap-2 opacity-10">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png"
                            alt="Emblem"
                            className="w-14 h-auto"
                        />
                    </div>
                </div>

                {/* Right Side: Information Data */}
                <div className="p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">Identity Document</span>
                            <h1 className="text-black text-4xl font-black mt-1 tracking-tighter">PASSPORT</h1>
                        </div>
                        <div className="text-right">
                            <span className="text-black/20 text-[10px] uppercase font-black tracking-widest block">No.</span>
                            <span className="text-black font-mono text-xl font-bold tracking-tighter">BDAY-VVB-2026</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-10 mb-12">
                        {details.map((item, i) => (
                            <div key={i} className="border-b border-neutral-50 pb-1">
                                <span className="text-black/30 text-[9px] uppercase font-black tracking-widest block mb-0.5">{item.label}</span>
                                <span className="text-black text-sm font-black tracking-wide">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* MRZ - Machine Readable Zone */}
                    <div className="mt-auto p-4 bg-neutral-50 rounded-lg border border-neutral-100 font-mono text-[11px] text-black/50 leading-snug tracking-widest break-all">
                        P&lt;INDVB&lt;&lt;VEDIKA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                        <br />
                        BDAY2026&lt;1IND1002280F2102281&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01, backgroundColor: '#000000' }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onNext}
                        className="mt-10 w-full py-4 bg-black text-white rounded-lg font-black uppercase tracking-[0.2em] text-xs transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center gap-3"
                    >
                        <span>Confirm Journey</span>
                        <Plane size={16} />
                    </motion.button>
                </div>

                {/* Subtle Watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                    <MapPin size={120} className="text-black" />
                </div>
            </motion.div>

            {/* Simple Footer Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 text-black/20 text-[10px] uppercase font-black tracking-[0.4em]"
            >
                Virtual Boarding Pass • Destination: Uttar Pradesh
            </motion.p>
        </div>
    );
};

export default PassportScene;
