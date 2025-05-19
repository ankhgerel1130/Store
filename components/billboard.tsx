"use client";

import { Billboard as BillboardType } from "@types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Billboard component-ийн пропс
interface BillboardProps {
    data: BillboardType;
    categories?: { id: string; name: string }[]; // Кategoriудын мэдээлэл
}

// Billboard component
const Billboard: React.FC<BillboardProps> = ({ data, categories = [] }) => {
    const [particles, setParticles] = useState<any[] | null>(null); // particle хадгалах state

    // Хэрэглэгчийн анхны рендерээс хойш үүсгэх
    useEffect(() => {
        const particleCount = 25; // particle тоо
        const generatedParticles = Array.from({ length: particleCount }, (_, index) => ({
            id: index,
            x: Math.random() * 100, // x байрлал
            y: Math.random() * 100, // y байрлал
            size: Math.random() * 6 + 3, // хэмжээ
            duration: Math.random() * 8 + 4, // duration (хугацаа)
            delay: Math.random() * 3, // delay (тогтворгүйжилт)
        }));
        setParticles(generatedParticles); // particle state-д хадгалах
    }, []); 

    return (
        <div
            style={{
                width: '100vw', // Үзэгдэх талбарын өргөн
                // Дээд талын таг
                marginLeft: 'calc((100vw - 100%) / -2)', // Зүүн талыг төвлөрүүлэх
                marginRight: 'calc((100vw - 100%) / -2)', // Баруун талыг төвлөрүүлэх
               // Доод таг
            }}
        >
            <motion.div 
                style={{ 
                    position: 'relative', 
                    backgroundImage: `url(${data?.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    width: '100%', 
                    height: '100vh',
                    overflow: 'hidden' // Зураг нь талбарыг дүүргэх
                }}
                initial={{ opacity: 1 }} // Эхлэх opacity
                animate={{ opacity: 1 }} // Анимэйшн эхлэх үед
                transition={{ duration: 1.5 }} // Анимэйшн-ийн хугацаа
            >
                {/* Партриклеудыг харуулах */}
                {particles && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none', // Хэрэглэгчийн үйлдэлд нөлөөлөхгүй
                        }}
                    >
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                style={{
                                    position: 'absolute',
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Партриклийн өнгө
                                    borderRadius: '50%', // Тойргийн хэлбэртэй
                                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)', // Сүүдэр
                                }}
                                animate={{
                                    x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300],
                                    y: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    repeat: Infinity, // Үнэгүй давтагдах
                                    repeatType: 'loop', // Loop хийх
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    ease: 'easeInOut', // Анимэйшн-ийн хөдөлгөөн
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Контентын текст */}
                <motion.div 
                    style={{ 
                        height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center', 
                        gap: '1rem', // Текст болон товчлуурын хоорондох зай
                        padding: '1rem',
                        position: 'relative',
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1.2 }}
                >
                    <motion.div 
                        style={{ 
                            fontFamily: "'Montserrat', sans-serif", 
                            fontWeight: '250',
                            fontSize: 'clamp(4rem, 10vw, 8rem)', 
                            letterSpacing: '0.1em',
                            color: 'rgba(255, 255, 255, 0.9)', 
                            mixBlendMode: 'overlay',
                            textTransform: 'uppercase'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <span style={{ 
                            backgroundClip: 'text', 
                            color: 'transparent', 
                            backgroundImage: 'linear-gradient(to right, white, rgba(200, 200, 200, 1))' 
                        }}>
                            {data?.label}
                        </span>
                    </motion.div>

                    {/* Тайлбар текст */}
                    {data?.description && (
                        <motion.p 
                            style={{ 
                                fontFamily: "'Montserrat', sans-serif", 
                                fontWeight: '300',
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                                letterSpacing: '0.15em', 
                                color: 'rgba(255, 255, 255, 0.9)', 
                                textTransform: 'uppercase', 
                                borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
                                paddingTop: '1rem',
                                maxWidth: '600px'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            {data.description}
                        </motion.p>
                    )}

                    {/* category-тай холбоосууд */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}> {/* Зайг багасгасан */}
                        {Array.isArray(categories) && categories.length > 0 && categories[0] && (
                            <Link href={`/category/${categories[0].id}`}>
                                <motion.button
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: '300',
                                        fontSize: '1rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        border: '1px solid white',
                                        padding: '0.5rem 1.5rem',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    {categories[0].name}
                                </motion.button>
                            </Link>
                        )}

                        {Array.isArray(categories) && categories.length > 1 && categories[1] && (
                            <Link href={`/category/${categories[1].id}`}>
                                <motion.button
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: '300',
                                        fontSize: '1rem',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        border: '1px solid white',
                                        padding: '0.5rem 1.5rem',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    {categories[1].name}
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </motion.div>

               {/* scroll hiih*/}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        
                        zIndex: 10
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ 
                        opacity: [0, 1, 1, 0],
                        y: [0, 10, 0, -10]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    onClick={() => {
                     
                        window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' });
                    }}
                >
                    <svg 
                        width="50" 
                        height="50" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))'
                        }}
                    >
                        <path 
                            d="M7 10L12 15L17 10" 
                            stroke="rgba(255,255,255,0.9)" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
    
                </motion.div>

                {/* COLLECTION текст */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '1rem', 
                    right: '1rem', 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: '300',
                    fontSize: '0.75rem', 
                    color: 'rgba(255, 255, 255, 0.3)', 
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase'
                }}>
                    COLLECTION
                </div>
            </motion.div>
        </div>
    );
};

export default Billboard;