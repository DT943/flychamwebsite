'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import useIsArabic from '@/hooks/useIsArabic';

const Hero = ({ slides, isNavigationBtns ,title,subTitle}) => {
    const { t, i18n } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const isArabic = useIsArabic();
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                overflow: 'hidden',
            }}
        >
            {/* Slides Wrapper */}
            <div
                style={{
                    display: 'flex',
                    width: `${slides.length * 100}vw`,
                    transform: isArabic
                        ? `translateX(${currentSlide * 100}vw)`  // RTL: slide right
                        : `translateX(-${currentSlide * 100}vw)`, // LTR: slide left
                    transition: 'transform 0.8s ease-in-out',
                }}
            >
                {slides.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            width: '100vw',
                            height: '600px',
                            flexShrink: 0,
                            position: 'relative',
                        }}
                    >
                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Centered Text */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 10,
                    maxWidth: '90vw',
                    lineHeight: '1.2',
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        lineHeight: '1.1',
                    }}
                >
                    {title}
                </h2>
                <h1
                    style={{
                        fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                        fontWeight: 'black',
                        lineHeight: '1.2',
                    }}
                >
                    {subTitle}
                </h1>
            </div>

            {/* Navigation Dots */}
            {isNavigationBtns &&

                <div
                    style={{
                        position: 'absolute',
                        bottom: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '10px',
                        zIndex: 20,
                    }}
                >
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: index === currentSlide ? '40px' : '14px',
                                height: '14px',
                                borderRadius: '50px',
                                backgroundColor: index === currentSlide ? '#d2c5a3' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default Hero;
