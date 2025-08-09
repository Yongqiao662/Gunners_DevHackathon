import React, { useState, useEffect } from 'react';
import {
    Package, Shield, ArrowUpRight, TrendingUp, Link, ShoppingCart
} from 'lucide-react';

const StatsCards = ({ onShowSearch }) => {
    const [animatedStats, setAnimatedStats] = useState({
        products: 0,
        verified: 0
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Animation logic for stats count-up
        const timer = setTimeout(() => {
            const productInterval = setInterval(() => {
                setAnimatedStats(prev => {
                    if (prev.products < 147) {
                        return { ...prev, products: prev.products + 3 };
                    }
                    clearInterval(productInterval);
                    return prev;
                });
            }, 20);

            const verifiedInterval = setInterval(() => {
                setAnimatedStats(prev => {
                    if (prev.verified < 98) {
                        return { ...prev, verified: prev.verified + 2 };
                    }
                    clearInterval(verifiedInterval);
                    return prev;
                });
            }, 25);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const StatCard = ({
        icon: Icon,
        value,
        label,
        gradientFrom,
        gradientTo,
        trend = "+12%",
        isPercentage = false,
    }) => (
        <div
            className={`
                relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo}
                rounded-2xl p-3 text-white group
                transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                border border-white/10
            `}
        >
            {/* Background decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
            <div className="absolute top-6 right-8 w-1 h-1 bg-white/30 rounded-full animate-pulse"
                style={{ animationDelay: '0.5s' }} />

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>{trend}</span>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="text-3xl font-bold tracking-tight">
                        {value.toLocaleString()}{isPercentage ? '%' : ''}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm opacity-90 font-medium">{label}</p>
                    {/* The "View" button has been removed from here */}
                </div>

                {isPercentage && (
                    <div className="mt-3 w-full bg-white/20 rounded-full h-1.5">
                        <div
                            className="bg-white rounded-full h-1.5 transition-all duration-1000 ease-out"
                            style={{ width: `${value}%` }}
                        />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-20 group-active:animate-ping bg-white transition-opacity" />
            </div>
        </div>
    );

    return (
        <div className="px-6 py-6 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-700">FreshChain Connected</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Link className="w-3 h-3" />
                        <span>#847,293</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    icon={Package}
                    value={animatedStats.products}
                    label="Products Tracked"
                    gradientFrom="from-blue-500"
                    gradientTo="to-blue-700"
                    trend="+12%"
                />
                <StatCard
                    icon={Shield}
                    value={animatedStats.verified}
                    label="Blockchain Verified"
                    gradientFrom="from-emerald-500"
                    gradientTo="to-emerald-700"
                    trend="+5%"
                    isPercentage={true}
                />
            </div>
            <button
                onClick={onShowSearch}
                className="w-full flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-4 rounded-xl shadow-lg transition-colors"
            >
                <ShoppingCart className="w-5 h-5" />
                <span>Buy a Product on the Blockchain</span>
            </button>
        </div>
    );
};

export default StatsCards;