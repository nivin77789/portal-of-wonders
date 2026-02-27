import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MdArrowBack, MdLocationOn } from "react-icons/md";
import { FaBrain, FaRegCommentDots, FaShieldAlt, FaHeartbeat, FaInstagram, FaWhatsapp, FaFacebookF, FaUndo, FaHistory, FaBriefcase, FaMoneyBillWave, FaSnapchatGhost, FaEnvelope, FaGraduationCap, FaSimCard, FaPhoneAlt, FaLinkedin, FaMobileAlt, FaNetworkWired, FaLandmark, FaLock, FaCheckCircle, FaUserSecret, FaExclamationTriangle } from "react-icons/fa";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const COLORS = ["#ff6fa2", "#6c63ff", "#42a5f5"];
const STI_COLORS = { Low: "#b2f5d4", Medium: "#fef3c7", High: "#ffd6d6" };

export default function SpaDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  const [isFetching, setIsFetching] = useState(false);
  const [fetchingCompleted, setFetchingCompleted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [financialCountdown, setFinancialCountdown] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinancialLoading, setIsFinancialLoading] = useState(false);
  const [financialError, setFinancialError] = useState<string | null>(null);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [adInterval, setAdInterval] = useState(2);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [showOtherOptions, setShowOtherOptions] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isPrivateDataModalOpen, setIsPrivateDataModalOpen] = useState(false);
  const [isPrivateDataLoading, setIsPrivateDataLoading] = useState(false);

  const galleryImages = [
    "Screenshot2026-02-23at6.03.19P.jpeg",
    "Screenshot2026-02-23at6.03.31P.jpeg",
    "Screenshot2026-02-23at6.03.43P.jpeg",
    "Screenshot2026-02-23at6.03.56P.jpeg",
    "Screenshot2026-02-23at6.04.05P.jpeg",
    "Screenshot2026-02-23at6.04.13P.jpeg",
    "Screenshot2026-02-23at6.04.21P.jpeg",
    "Screenshot2026-02-23at6.04.26P.jpeg",
    "Screenshot2026-02-23at6.05.04P.jpeg"
  ];

  const handleFetchFiles = () => {
    setIsFetching(true);
    setFetchingCompleted(false);

    // Cycle images rapidly for 6.5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsFetching(false);
      setFetchingCompleted(true);
    }, 6500);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (financialCountdown > 0) {
      interval = setInterval(() => {
        setFinancialCountdown(prev => {
          if (prev <= 1) {
            setIsRevealed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [financialCountdown]);

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleUnhashDetails = () => {
    setIsFinancialLoading(true);
    setFinancialError(null);
    setTimeout(() => {
      setIsFinancialLoading(false);
      setFinancialError("RBI details are in indian server , shift the network to indian or use a PC to fetch details");
    }, 3500);
  };

  const maskValue = (val: string) => {
    if (!val) return "";
    return val.split('').map(char => char === ' ' ? ' ' : '*').join('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1629] text-gray-200 p-5 flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl mb-4 text-white">User not found</h2>
        <button className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-2 px-6 rounded-xl border border-gray-700 hover:scale-105 transition-transform" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const isRojee = user.name === "Rojee Tamang";
  const isNema = user.name === "Nema Tamang";

  const firstName = user.name.split(' ')[0];
  const lowerFirstName = firstName.toLowerCase();
  const lowerName = user.name.toLowerCase().replace(/\s+/g, '');
  const randomStr = user.id ? user.id.toString() : "98";

  const socialData = isRojee ? { insta: "ro_se.__22", snap: "rojee_t20", whatsapp: "+91 84312 38167", contactNo: "+91 84312 38167", altNo: "9593948594", sim: "Jio/Airtel", email: "rojee777@gmail.com", fb: "rog.tamang.71", linkedin: "rojee.tamang071", location: "Near JK Tyres, Immadihalli", dob: "22/02/1998", school: "Government Senior Secondary School, Jorethang", passYear: "2020", subject: "ARTS", syllabus: "CBSC", schoolPlace: "Sikkim" } : {
    insta: `${lowerName}_official_${randomStr}`,
    snap: `${lowerFirstName}_snap_${randomStr}`,
    whatsapp: `+91 98${randomStr.padStart(8, '4')}`,
    contactNo: `+91 98${randomStr.padStart(8, '4')}`,
    altNo: `+91 97${randomStr.padStart(8, '5')}`,
    sim: parseInt(randomStr) % 2 === 0 ? "Jio" : "Airtel",
    email: `${lowerName}${randomStr}@gmail.com`,
    fb: `${lowerFirstName}.${randomStr}`,
    linkedin: `${lowerName}_pro`,
    location: "Bangalore Area, India",
    dob: `1${parseInt(randomStr) % 8 + 1}/0${parseInt(randomStr) % 9 + 1}/199${parseInt(randomStr) % 9}`,
    school: "City Higher Secondary School",
    passYear: "2019",
    subject: "SCIENCE",
    syllabus: "ICSE",
    schoolPlace: "Bangalore"
  };

  const defaultCenter = useMemo(() => {
    return (isRojee ? [12.967292, 77.760656] : [12.971598 + (parseInt(randomStr) % 100) * 0.005, 77.594562 + (parseInt(randomStr) % 100) * 0.005]) as [number, number];
  }, [isRojee, randomStr]);

  const [liveBrowserLocation, setLiveBrowserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    setLocationFetched(false);
    setLiveBrowserLocation(null);
  }, [user.id]);

  const handleFetchLiveLocation = () => {
    setIsTrackingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveBrowserLocation([latitude, longitude]);
          setIsTrackingLocation(false);
          setLocationFetched(true);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setIsTrackingLocation(false);
          if (error.code === 1) {
            alert("Location permission denied. Please enable location access in your browser settings.");
          } else {
            alert("Unable to fetch location. Please try again.");
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setIsTrackingLocation(false);
      alert("Geolocation is not supported by your browser.");
    }
  };
  const mapColor = isRojee ? '#E1306C' : (parseInt(randomStr) % 2 === 0 ? '#6c63ff' : '#42a5f5');
  const workHistory = isRojee ? [
    { role: "Beauty Therapist", company: "VRS spa", duration: "Present", desc: "Specializing in premium client treatments." },
    { role: "Senior Therapist", company: "Mocca Spa", duration: "Previous", desc: "Specializing in premium client treatments." },
    { role: "Senior Therapist", company: "O3 Spa", duration: "2021 - 2023", desc: "Advanced therapies and client management." }
  ] : [
    { role: "Therapist", company: `${user.spa} Spa`, duration: "Present", desc: "General client therapies and consulting." },
    { role: "Junior Staff", company: "Urban Wellness", duration: "Previous", desc: "Basic treatments and support." }
  ];

  const deviceSpecs = isRojee ? [
    {
      type: "Primary",
      model: "iPhone 14 Plus",
      imei: "354892103487219",
      mac: "00:1A:2B:3C:4D:5E",
      ip: "192.168.1.14",
      image: "/iphone_14_plus.webp"
    },
    { type: "Secondary", model: "POCO M2", imei: "865492041234567", mac: "A1:B2:C3:D4:E5:F6", ip: "192.168.1.22" }
  ] : [
    { type: "Primary", model: "Generic Smartphone", imei: `35${randomStr.padStart(13, '0')}`, mac: `00:1A:2B:${parseInt(randomStr) % 99}:${parseInt(randomStr) % 99}:FF`, ip: `192.168.1.${parseInt(randomStr) % 255}` }
  ];

  const bankDetails = isRojee ? {
    bankName: "HDFC Bank",
    accountHolder: "Rojee Tamang",
    accountNo: "XXXXXXXXXXXX4859",
    ifsc: "HDFC0001234",
    branch: "Whitefield, Bangalore"
  } : {
    bankName: "State Bank of India",
    accountHolder: user.name,
    accountNo: `XXXXXXXXXXXX${randomStr.padStart(4, '0')}`,
    ifsc: `SBIN000${randomStr.padStart(4, '0')}`,
    branch: "Main Branch"
  };

  const transactions = isRojee ? [
    // Specified Transactions (Sorted Newest First)
    { id: "TXN-9025", amount: "₹1,000", date: "12 Nov 2025", status: "Completed", desc: "Portal Session" },
    { id: "TXN-9018", amount: "₹500", date: "18 Jul 2025", status: "Completed", desc: "Quick Therapy" },
    { id: "TXN-9016", amount: "₹500", date: "16 Jul 2025", status: "Completed", desc: "Short Session" },
    { id: "TXN-9026", amount: "₹2,500", date: "26 May 2025", status: "Completed", desc: "Standard Service" },
    { id: "TXN-8044", amount: "₹2,500", date: "14 Apr 2025", status: "Completed", desc: "Standard Service" },

    // More 2.5k transactions between 2024 and 2025 (Hitting 82.3k total in portal)
    { id: "TXN-7910", amount: "₹2,500", date: "05 Mar 2025", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7905", amount: "₹2,500", date: "15 Feb 2025", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7901", amount: "₹2,500", date: "28 Jan 2025", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7880", amount: "₹2,500", date: "10 Jan 2025", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7850", amount: "₹2,500", date: "20 Dec 2024", status: "Completed", desc: "Holiday Session" },
    { id: "TXN-7840", amount: "₹2,500", date: "05 Dec 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7820", amount: "₹2,500", date: "20 Nov 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7810", amount: "₹2,500", date: "05 Nov 2024", status: "Completed", desc: "Routine Visit" },

    { id: "TXN-7121", amount: "₹2,000", date: "21 Oct 2024", status: "Completed", desc: "Specified Session" },
    { id: "TXN-7900", amount: "₹2,500", date: "05 Oct 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7139", amount: "₹2,300", date: "13 Sep 2024", status: "Completed", desc: "Premium Therapy" },
    { id: "TXN-7885", amount: "₹2,500", date: "25 Aug 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7870", amount: "₹2,500", date: "10 Aug 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7860", amount: "₹2,500", date: "22 Jul 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7855", amount: "₹2,500", date: "05 Jul 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7845", amount: "₹2,500", date: "18 Jun 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7835", amount: "₹2,500", date: "05 Jun 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7125", amount: "₹2,000", date: "25 May 2024", status: "Completed", desc: "Specified Session" },
    { id: "TXN-7830", amount: "₹2,500", date: "12 May 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7825", amount: "₹2,500", date: "28 Apr 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7815", amount: "₹2,400", date: "15 Apr 2024", status: "Completed", desc: "Balance Adjust" },
    { id: "TXN-7129", amount: "₹2,300", date: "29 Mar 2024", status: "Completed", desc: "Specified Session" },
    { id: "TXN-7811", amount: "₹2,500", date: "15 Mar 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7805", amount: "₹2,500", date: "28 Feb 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7801", amount: "₹2,500", date: "15 Feb 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-7106", amount: "₹2,000", date: "06 Feb 2024", status: "Completed", desc: "Specified Session" },
    { id: "TXN-7118", amount: "₹1,300", date: "18 Jan 2024", status: "Completed", desc: "Specified Session" },
    { id: "TXN-7100", amount: "₹2,500", date: "05 Jan 2024", status: "Completed", desc: "Routine Visit" },
    { id: "TXN-6127", amount: "₹1,000", date: "27 Oct 2023", status: "Completed", desc: "First Portal Session" },

    // Additional 2.5k to hit the 82.3k total (11 more)
    { id: "TXN-6120", amount: "₹2,500", date: "15 Oct 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6110", amount: "₹2,500", date: "01 Oct 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6100", amount: "₹2,500", date: "15 Sep 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6090", amount: "₹2,500", date: "01 Sep 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6080", amount: "₹2,500", date: "15 Aug 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6070", amount: "₹2,500", date: "01 Aug 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6060", amount: "₹2,500", date: "15 Jul 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6050", amount: "₹2,500", date: "01 Jul 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6040", amount: "₹2,500", date: "15 Jun 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6030", amount: "₹2,500", date: "01 Jun 2023", status: "Completed", desc: "Backlog Session" },
    { id: "TXN-6020", amount: "₹2,500", date: "15 May 2023", status: "Completed", desc: "Backlog Session" },
  ] : [];

  const totalSpend = isRojee ? "₹128,100" : "₹0";
  const rojeeSpendBreakdown = isRojee ? {
    portal: "₹82,300",
    outside: "₹45,800",
    outsideDetails: "33 Visit Mix (1k, 1.2k, 1.5k, 1.8k)"
  } : null;

  const honestyData = [
    { name: "Truth", value: user.honesty.truth },
    { name: "Lie", value: user.honesty.lie },
    { name: "Doubt", value: user.honesty.doubt },
  ];

  const satisfactionData = [
    { name: "Emotional", value: user.satisfactionMetrics.emotional },
    { name: "Professional", value: user.satisfactionMetrics.professional },
    { name: "Loyalty", value: user.satisfactionMetrics.loyalty },
  ];

  const healthData = [
    { name: "STI Risk", value: user.healthRisk.sti === "Low" ? 10 : user.healthRisk.sti === "Medium" ? 50 : 90, label: user.healthRisk.sti },
    { name: "Mental", value: user.healthRisk.mental.includes("Resilient") ? 90 : 60, label: user.healthRisk.mental },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1629] text-gray-200 p-5 md:p-8 relative overflow-y-auto font-sans animate-[fadeInDown_0.8s_ease_backwards]">

      {/* Background Orbs */}
      <div className="fixed top-[-300px] right-[-300px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(102,126,234,0.1)_0%,transparent_70%)] rounded-full animate-[float-slow_20s_infinite_ease-in-out] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-250px] left-[-250px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,87,108,0.08)_0%,transparent_70%)] rounded-full animate-[float-slow_25s_infinite_ease-in-out_reverse] pointer-events-none -z-10"></div>

      <button className="bg-transparent border border-gray-700 text-[#9f6f6f] font-semibold py-2 px-4 rounded-xl flex items-center gap-2 mb-6 relative z-20 transition-all hover:text-white hover:drop-shadow-[0_0_10px_#ff6fa2]" onClick={() => navigate(-1)}>
        <MdArrowBack /> Back to Dashboard
      </button>

      {/* Hero Banner Section */}
      <div className="rounded-[20px] overflow-hidden mb-8 bg-[#121212]/40 backdrop-blur-xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-[slideInBottom_0.8s_ease_backwards]">
        <div className="h-[140px] bg-gradient-to-br from-[#2b1055] to-[#7597de] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_30%,rgba(0,0,0,0.6)_100%)]"></div>
          <div className="absolute inset-0 opacity-50 bg-[size:20px_20px]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)' }}></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end px-6 sm:px-10 pb-8 -mt-[60px] relative z-10 gap-6 sm:gap-8 text-center sm:text-left">

          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] shrink-0 mt-8 sm:mt-0">
            <img
              src={isRojee ? "/rojee.png" : (isNema ? "/nivin.png" : (user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`))}
              alt={user.name}
              className="w-full h-full object-cover rounded-full border-4 border-[#1a1a24] bg-[#111] relative z-10 shadow-[0_0_20px_rgba(255,111,162,0.5)] animate-[floatLight_4s_infinite_ease-in-out]"
            />
            <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-pink-400/80 animate-[spinRing_10s_linear_infinite] z-0"></div>
            <div className="absolute inset-[-8px] rounded-full border-2 border-dashed border-indigo-400/80 animate-[spinRing_15s_linear_infinite_reverse] z-0"></div>
          </div>

          <div className="flex-grow pb-2">
            <h1 className="m-0 mb-3 text-3xl sm:text-[2.2rem] font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              {user.name}
            </h1>
            <div className="flex gap-2.5 flex-wrap justify-center sm:justify-start">
              <span className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-semibold uppercase tracking-wide bg-indigo-500/20 border border-indigo-500 text-indigo-300">{user.spa}</span>
              <span className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-semibold uppercase tracking-wide bg-blue-500/20 border border-blue-500 text-blue-300">{user.age} Years Old</span>
              <span className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-semibold uppercase tracking-wide bg-pink-500/20 border border-pink-500 text-pink-300">{user.status}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Data & Work */}
        <div className="flex flex-col gap-8">

          {/* Social Media Card */}
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaInstagram className="text-pink-400" /> Social Links & Direct Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`https://instagram.com/${socialData.insta}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#E1306C]/40 hover:bg-black/40 group">
                <FaInstagram className="text-[1.4rem] text-[#E1306C] group-hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.insta}</span>
              </a>
              <a href={`https://snapchat.com/add/${socialData.snap}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#FFFC00]/40 hover:bg-black/40 group">
                <FaSnapchatGhost className="text-[1.4rem] text-[#FFFC00] group-hover:drop-shadow-[0_0_8px_rgba(255,252,0,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.snap}</span>
              </a>
              <a href={`https://wa.me/${socialData.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#25D366]/40 hover:bg-black/40 group">
                <FaWhatsapp className="text-[1.4rem] text-[#25D366] group-hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.whatsapp}</span>
              </a>
              <a href={`https://facebook.com/${socialData.fb}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-black/40 group">
                <FaFacebookF className="text-[1.4rem] text-[#1877F2] group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.fb}</span>
              </a>
              <a href={`https://linkedin.com/in/${socialData.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#0077b5]/40 hover:bg-black/40 group">
                <FaLinkedin className="text-[1.4rem] text-[#0077b5] group-hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.linkedin}</span>
              </a>
              <a href={`mailto:${socialData.email}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-black/20 rounded-xl border border-transparent gap-3 no-underline transition-all duration-300 hover:border-[#EA4335]/40 hover:bg-black/40 group">
                <FaEnvelope className="text-[1.4rem] text-[#EA4335] group-hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.5)]" />
                <span className="text-gray-200 text-sm font-semibold truncate">{socialData.email}</span>
              </a>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.1s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaRegCommentDots className="text-pink-400" /> Key Details
            </h3>
            <ul className="list-none p-0 m-0 grid gap-4">
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5">DOB</span> <span className="font-semibold text-white">{isRojee ? socialData.dob : "-"}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><MdLocationOn /> Location</span> <span className="font-semibold text-white text-right max-w-[200px] leading-tight">{socialData.location}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><FaPhoneAlt /> Contact No</span> <span className="font-semibold text-white">{isRojee ? socialData.contactNo : "-"}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><FaPhoneAlt /> Alternate No</span> <span className="font-semibold text-white">{isRojee ? socialData.altNo : "-"}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><FaSimCard /> SIM Provider</span> <span className="font-semibold text-white">{isRojee ? socialData.sim : "-"}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl overflow-hidden"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0"><FaEnvelope /> Email</span> <span className="font-semibold text-white truncate ml-2">{isRojee ? socialData.email : "-"}</span></li>
              {!isRojee && <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Partner</span> <span className="font-semibold text-white">{user.partner}</span></li>}
              {!isRojee && <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Occupation</span> <span className="font-semibold text-white truncate max-w-[200px]" title={user.partnerOccupation}>{user.partnerOccupation}</span></li>}
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Family Size</span> <span className="font-semibold text-white">{user.family}</span></li>
              <li className="flex justify-between items-center p-3 bg-black/20 rounded-xl"><span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Siblings</span> <span className="font-semibold text-white">{user.siblings}</span></li>
            </ul>

            {isRojee && (
              <button
                onClick={() => {
                  setIsPrivateDataModalOpen(true);
                  setIsPrivateDataLoading(true);
                  setTimeout(() => {
                    setIsPrivateDataLoading(false);
                  }, 5000);
                }}
                className="w-full mt-4 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-95"
              >
                <FaUserSecret className="text-indigo-400" /> <span>Private Data</span>
              </button>
            )}
          </div>

          {/* Actual Location Map Card - Moved here */}
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.15s] overflow-hidden">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <MdLocationOn style={{ color: mapColor }} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" /> Actual Location
            </h3>
            <div className="w-full h-[250px] rounded-xl overflow-hidden border border-white/10 relative z-10 z-[1] isolate">
              <MapContainer key={`actual-${user.id}`} center={defaultCenter} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Circle
                  center={defaultCenter}
                  radius={100}
                  pathOptions={{ color: mapColor, fillColor: mapColor, fillOpacity: 0.25, weight: 2 }}
                />
              </MapContainer>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.12s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaNetworkWired className="text-pink-400" /> System & Network Specs
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {deviceSpecs.map((device, idx) => (
                <div key={idx} className="bg-black/20 rounded-xl p-4 border border-white/5 transition-all hover:bg-black/40 hover:border-indigo-500/40 group/device">
                  {device.image && (
                    <div className="mb-4 flex justify-center">
                      <img src={device.image} alt={device.model} className="h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-[floatLight_3s_infinite_alternate]" />
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-indigo-400 font-bold text-sm tracking-wide flex items-center gap-2"><FaMobileAlt /> {device.type} Device</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-white rounded-md">{device.model}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="flex flex-col"><span className="text-gray-500 uppercase tracking-wider mb-0.5 mt-1">IMEI</span> <span className="text-gray-200 font-mono">{device.imei}</span></div>
                    <div className="flex flex-col"><span className="text-gray-500 uppercase tracking-wider mb-0.5 mt-1">MAC Address</span> <span className="text-gray-200 font-mono">{device.mac}</span></div>
                    <div className="flex flex-col col-span-2"><span className="text-gray-500 uppercase tracking-wider mb-0.5 mt-1">Internal IP Network</span> <span className="text-emerald-400 font-mono">{device.ip}</span></div>
                  </div>

                  {device.type === "Primary" && (
                    <div className="space-y-3">
                      <button
                        onClick={handleFetchLiveLocation}
                        disabled={isTrackingLocation}
                        className={`w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${isTrackingLocation
                          ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 cursor-wait"
                          : "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white"
                          }`}
                      >
                        <MdLocationOn className={isTrackingLocation ? "animate-ping" : ""} />
                        {isTrackingLocation ? "Pinging Satellite..." : "Fetch Live Location"}
                      </button>

                      {locationFetched && liveBrowserLocation && (
                        <div className="rounded-xl overflow-hidden border border-indigo-500/30 h-[200px] relative animate-[scaleIn_0.4s_ease_out] bg-[#0a0e27]">
                          <div className="absolute top-2 left-2 z-20 bg-emerald-500/80 text-[8px] font-black px-1.5 py-0.5 rounded text-white animate-pulse">
                            LIVE TRACKING
                          </div>
                          <MapContainer key={`${liveBrowserLocation[0]}-${liveBrowserLocation[1]}`} center={liveBrowserLocation} zoom={18} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              className="map-dark-filter"
                            />
                            <Circle
                              center={liveBrowserLocation}
                              radius={20}
                              pathOptions={{ color: '#6366f1', fillColor: '#6366f1', fillOpacity: 0.6 }}
                            />
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-10"></div>
                          </MapContainer>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isRojee && (
              <div className="mt-6 flex flex-col gap-4">
                <button
                  onClick={handleFetchFiles}
                  disabled={isFetching}
                  className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${isFetching
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 cursor-wait"
                    : "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:scale-[1.02] hover:shadow-indigo-500/20 active:scale-95 border border-indigo-500/50"
                    }`}
                >
                  <FaNetworkWired className={isFetching ? "animate-spin" : ""} />
                  {isFetching ? "Fetching device storage..." : "Fetch files from the device"}
                </button>

                {isFetching && (
                  <div className="p-4 rounded-xl bg-black/60 border border-indigo-500/50 overflow-hidden relative min-h-[300px] flex flex-col items-center justify-center animate-[scaleIn_0.3s_ease_out]">
                    <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
                    <div className="relative z-10 w-full flex flex-col items-center gap-4">
                      <div className="relative w-full max-w-sm mx-auto">
                        <img
                          src={`/gallary/${galleryImages[currentImageIndex]}`}
                          alt="Fetching..."
                          className="w-full h-auto max-h-[400px] object-contain rounded-lg border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.6)] animate-[flash_0.2s_infinite]"
                        />
                        <div className="absolute -top-3 -right-3 bg-red-600 text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)] border border-white/20">
                          LIVE SYNC: {currentImageIndex + 1}/{galleryImages.length}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-[0.4em] font-black animate-pulse mb-1">Mirroring Device Memory</span>
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 animate-[progress_6.5s_linear]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {fetchingCompleted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 animate-[slideInBottom_0.5s_ease_out]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest">Success</span>
                    </div>
                    <p className="text-gray-200 text-sm font-semibold">Data is saved in my local device</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.13s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaLandmark className="text-pink-400" /> Financial Intelligence
            </h3>
            <div className="bg-black/20 rounded-xl p-4 border border-white/5 transition-all hover:bg-black/40 hover:border-indigo-500/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">
                  {isRevealed ? bankDetails.bankName : maskValue(bankDetails.bankName)}
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[0.65rem] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm relative z-10 mb-5">
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Account Holder</span>
                  <span className="text-white font-semibold">
                    {bankDetails.accountHolder}
                  </span>
                </div>
                <div className="flex flex-col text-left sm:text-right">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Account No</span>
                  <span className="text-pink-300 font-mono tracking-widest">
                    {isRevealed ? bankDetails.accountNo : bankDetails.accountNo.replace(/[a-zA-Z0-9]/g, '*')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">IFSC Code</span>
                  <span className="text-gray-300 font-medium font-mono">
                    {isRevealed ? bankDetails.ifsc : maskValue(bankDetails.ifsc)}
                  </span>
                </div>
                <div className="flex flex-col text-left sm:text-right">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Branch</span>
                  <span className="text-gray-300 font-medium">
                    {isRevealed ? bankDetails.branch : maskValue(bankDetails.branch)}
                  </span>
                </div>
              </div>

              {financialError ? (
                <div className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-[shake_0.5s_ease-in-out]">
                  <div className="flex items-center gap-2 mb-2 text-red-400">
                    <FaShieldAlt className="text-xs" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Restriction</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-200 leading-relaxed italic">
                    "{financialError}"
                  </p>
                </div>
              ) : isFinancialLoading ? (
                <div className="w-full py-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 text-center flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Decrypting Financial Node...</span>
                  </div>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-[progress_3.5s_linear]" />
                  </div>
                </div>
              ) : !isRevealed ? (
                <button
                  onClick={handleUnhashDetails}
                  className="w-full py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <FaShieldAlt className="text-xs" /> Unhash Details
                </button>
              ) : (
                <div className="w-full py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-center flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-xs" /> Access Granted
                </div>
              )}
            </div>
          </div>


          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.05s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaGraduationCap className="text-pink-400" /> Education
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col p-3 bg-black/20 rounded-xl border-l-[3px] border-indigo-400">
                <h4 className="m-0 text-white font-bold">{socialData.school}</h4>
                <p className="text-[0.85rem] text-gray-400 m-0 mt-1">{socialData.schoolPlace} | Class of {socialData.passYear} ({socialData.syllabus})</p>
                <div className="mt-2 inline-flex"><span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md">Subject: {socialData.subject}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.1s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaBriefcase className="text-pink-400" /> Work History
            </h3>
            <div className="flex flex-col gap-5 relative mt-3 pl-2 before:content-[''] before:absolute before:left-[15px] before:top-[10px] before:bottom-0 before:w-[2px] before:bg-white/10">
              {workHistory.map((job, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 border-3 border-[#1a1a24] relative z-10 shrink-0 mt-1"></div>
                  <div className="flex-grow">
                    <h4 className="m-0 mb-1 text-white text-base">{job.role}</h4>
                    <div className="text-[0.8rem] text-pink-300 mb-2 font-medium">{job.company} | {job.duration}</div>
                    <p className="text-[0.85rem] text-gray-400 m-0 leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.2s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaBrain className="text-pink-400" /> Psychology & Traits
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.traits.map((trait: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-black rounded-full uppercase tracking-widest">{trait}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-transparent transition-all hover:border-indigo-500/40 hover:bg-black/40">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Strength</span>
                <p className="m-0 mt-2 text-base font-medium text-emerald-400">{user.strength}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-transparent transition-all hover:border-indigo-500/40 hover:bg-black/40">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Weakness</span>
                <p className="m-0 mt-2 text-base font-medium text-rose-400">{user.weakness}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-transparent transition-all hover:border-indigo-500/40 hover:bg-black/40 sm:col-span-2">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Mindset</span>
                <p className="m-0 mt-2 text-base font-medium text-white">{user.mindset}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-transparent transition-all hover:border-indigo-500/40 hover:bg-black/40 sm:col-span-2">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">My Opinion</span>
                <p className="m-0 mt-2 text-base font-medium text-pink-300 drop-shadow-[0_0_8px_rgba(255,111,162,0.5)]">{user.opinion}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Transactions & Finance */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-b from-indigo-500/5 to-black/40 animate-[slideInBottom_0.8s_ease_backwards]">
            <div className="absolute top-[-50%] right-[-50%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full animate-[floatLight_15s_infinite_alternate]"></div>

            <div className="flex items-center gap-2.5 text-[1.1rem] text-gray-400 uppercase tracking-[2px] z-10">
              <FaMoneyBillWave className="text-indigo-400" />
              <span>Total Spend Overview</span>
            </div>
            <div className="flex flex-col items-center z-10">
              <div className="text-[3.5rem] font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_30px_rgba(108,99,255,0.5)] leading-tight">
                {totalSpend}
              </div>
              {rojeeSpendBreakdown && (
                <div className="mt-4 flex flex-col gap-2 w-full max-w-xs animate-[fadeIn_0.5s_ease_out]">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portal Paid</span>
                    <span className="text-sm font-black text-indigo-400">{rojeeSpendBreakdown.portal}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-pink-500/5 border border-pink-500/20">
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Outside Paid</span>
                      <span className="text-[8px] text-pink-400/60 font-mono mt-1">{rojeeSpendBreakdown.outsideDetails}</span>
                    </div>
                    <span className="text-sm font-black text-pink-500">{rojeeSpendBreakdown.outside}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2 z-10">
              <button
                onClick={() => setIsRecoveryModalOpen(true)}
                className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white border-none text-[1.1rem] px-8 py-3 rounded-full font-bold cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(255,65,108,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_25px_rgba(255,65,108,0.6)]"
              >
                <FaUndo /> <span>Recover Spend Back</span>
              </button>
            </div>
          </div>

          {/* Recovery Modal */}
          {isRecoveryModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-[fadeIn_0.3s_ease_out]">
              <div className="bg-[#1a1a24] border border-white/10 rounded-[30px] w-full max-w-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-[scaleIn_0.4s_ease_out] relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => {
                      setIsRecoveryModalOpen(false);
                      setShowOtherOptions(true);
                      setIsDecrypting(false);
                      setIsDecrypted(false);
                    }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                    <FaUndo className="text-pink-500" /> Recover Spend
                  </h2>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400 text-sm">
                      {showOtherOptions ? "Electronic Funds Transfer Protocol" : "Follow the protocol to initiate the spend recovery sequence."}
                    </p>
                    <button
                      onClick={() => {
                        setShowOtherOptions(!showOtherOptions);
                        if (!showOtherOptions) {
                          // Reset decryption states when moving back to bank view
                          setIsDecrypting(false);
                          setIsDecrypted(false);
                        }
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 shrink-0 ml-4"
                    >
                      {showOtherOptions ? "Recovery Protocol" : "Other Options"}
                    </button>
                  </div>

                  {showOtherOptions ? (
                    <div className="mb-6 space-y-6">
                      {!isDecrypted && !isDecrypting ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-black/40 border border-white/5 rounded-2xl border-dashed">
                          <FaLock className="text-4xl text-indigo-500/20 mb-6" />
                          <button
                            onClick={() => {
                              setIsDecrypting(true);
                              setTimeout(() => {
                                setIsDecrypting(false);
                                setIsDecrypted(true);
                              }, 4000);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-95 pulse-slow"
                          >
                            Show Bank Details
                          </button>
                        </div>
                      ) : isDecrypting ? (
                        <div className="p-12 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                          <span className="text-white font-black uppercase tracking-[0.2em] text-xs animate-pulse">
                            Decrypting Rojee's Data...
                          </span>
                        </div>
                      ) : (
                        <div className="animate-[scaleIn_0.4s_ease_out]">
                          <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                              <FaCheckCircle className="text-sm" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                              Decryption Successful. Details Saved to Local Device.
                            </span>
                          </div>
                          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[100px] pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                              <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">**** ****</span>
                              <span className="bg-emerald-500/10 text-emerald-400 text-[0.65rem] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">Verified Node</span>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs mb-8 relative z-10">
                              <div className="flex flex-col">
                                <span className="text-gray-500 uppercase tracking-widest text-[9px] mb-1.5">Account Holder</span>
                                <span className="text-white font-semibold text-sm">Rojee Tamang</span>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-gray-500 uppercase tracking-widest text-[9px] mb-1.5">Account No</span>
                                <span className="text-pink-300 font-mono text-sm tracking-wider">****************</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-500 uppercase tracking-widest text-[9px] mb-1.5">IFSC Code</span>
                                <span className="text-gray-400 font-mono text-sm tracking-wider">***********</span>
                              </div>
                              <div className="flex flex-col text-right">
                                <span className="text-gray-500 uppercase tracking-widest text-[9px] mb-1.5">Branch</span>
                                <span className="text-gray-400 text-sm leading-tight">*********** *********</span>
                              </div>
                            </div>
                            <div className="flex gap-4 relative z-10">
                              <button
                                onClick={() => alert("Initializing Secure Transfer protocol...")}
                                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                              >
                                Transfer
                              </button>
                              <button
                                onClick={() => alert("Initiating Crypto Swap sequence...")}
                                className="flex-1 py-3 bg-indigo-600 border border-indigo-500 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-[0_5px_15px_rgba(79,70,229,0.3)] active:scale-95"
                              >
                                Swap to Crypto
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6 animate-[fadeIn_0.3s_ease_out]">
                      <div className="bg-black/40 rounded-2xl overflow-hidden border border-white/5 relative group">
                        <img
                          src="/nds.jpeg"
                          alt="Security Node"
                          className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1a1a24/indigo?text=nds.jpeg+Node";
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            Network Node Ready
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                        <p className="text-[11px] font-bold text-indigo-300 leading-relaxed uppercase tracking-wide text-center">
                          Upload it to <span className="text-white underline decoration-indigo-500 underline-offset-4">jspoon server</span> and publish to the selected websites.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-500 block mb-2">Select Target Websites</span>
                        <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                          {[
                            { name: "xVideos", color: "#FF0000" },
                            { name: "PornHub", color: "#FFA500" },
                            { name: "xHamster", color: "#FFD700" },
                            { name: "XNXX", color: "#00BFFF" },
                            { name: "YouPorn", color: "#FF1493" },
                            { name: "RedTube", color: "#DC143C" },
                            { name: "Porn", color: "#8B0000" },
                            { name: "Tube8", color: "#0000FF" },
                            { name: "IXXX", color: "#4B0082" }
                          ].map((site) => (
                            <button
                              key={site.name}
                              onClick={() => {
                                setSelectedWebsites(prev =>
                                  prev.includes(site.name)
                                    ? prev.filter(s => s !== site.name)
                                    : [...prev, site.name]
                                );
                              }}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedWebsites.includes(site.name)
                                ? "bg-indigo-500/20 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                                : "bg-black/20 border-white/5 hover:border-white/10"
                                }`}
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center mb-2 font-black text-[10px] text-white"
                                style={{ backgroundColor: site.color }}
                              >
                                {site.name[0]}
                              </div>
                              <span className="text-[9px] font-bold text-gray-400 truncate w-full text-center">
                                {site.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-500">AD after every</span>
                          <div className="flex gap-2">
                            {[2, 3, 5].map((mins) => (
                              <button
                                key={mins}
                                onClick={() => setAdInterval(mins)}
                                className={`px-4 h-10 rounded-xl font-bold transition-all border text-xs ${adInterval === mins
                                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-indigo-500/40"
                                  }`}
                              >
                                {mins} Min
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (selectedWebsites.length === 0) {
                              alert("Please select at least one target website.");
                              return;
                            }
                            alert(`Initiating upload to jspoon server with a ${adInterval}-minute interval across ${selectedWebsites.length} website(s)...`);
                            setIsRecoveryModalOpen(false);
                          }}
                          className="w-full py-4 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                          Publish & Run Ads
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Private Data Modal */}
          {isPrivateDataModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-[fadeIn_0.3s_ease_out]">
              <div className={`bg-[#0f0f15] border border-white/10 rounded-[40px] w-full ${isPrivateDataLoading ? "max-w-xl" : "max-w-md"} overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.2)] animate-[scaleIn_0.4s_ease_out] relative transition-all duration-500`}>
                <div className="absolute top-6 right-6 z-10">
                  {!isPrivateDataLoading && (
                    <button
                      onClick={() => setIsPrivateDataModalOpen(false)}
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className={isPrivateDataLoading ? "p-0" : "p-10 text-center"}>
                  {isPrivateDataLoading ? (
                    <div className="relative w-full aspect-video flex flex-col items-center justify-center overflow-hidden bg-black">
                      <img
                        src="/nds.jpeg"
                        alt="Encrypted Node"
                        className="w-full h-full object-contain opacity-100 animate-[flash_0.5s_infinite]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1a1a24/indigo?text=nds.jpeg+Terminal";
                        }}
                      />
                      <div className="absolute inset-0 bg-indigo-900/10 mix-blend-color"></div>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f15] to-transparent"></div>
                      <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-4 px-8">
                        <div className="w-12 h-12 border-t-2 border-indigo-500 border-r-2 border-r-transparent rounded-full animate-spin"></div>
                        <div className="space-y-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-white font-black uppercase tracking-[0.4em] text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              Accessing Terminal
                            </span>
                          </div>
                          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-indigo-500 animate-[progress_5s_linear]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 animate-[fadeIn_0.5s_ease_out]">
                      <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-500/20 scale-125">
                        <FaExclamationTriangle className="text-4xl text-rose-500 animate-[flash_1s_infinite]" />
                      </div>
                      <h3 className="text-white text-xl font-black uppercase tracking-widest mb-6">Security Alert</h3>
                      <div className="p-6 bg-black/40 border border-white/5 rounded-3xl mb-8">
                        <p className="text-gray-300 text-sm leading-relaxed font-medium">
                          Can't open in this device as it is <span className="text-rose-400 font-bold underline decoration-rose-500/30 underline-offset-4">highly encrypted</span>.
                        </p>
                        <div className="h-px bg-white/5 my-4"></div>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Open in a <span className="text-indigo-400 font-black uppercase tracking-widest">Local PC</span> to access this data.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsPrivateDataModalOpen(false)}
                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all hover:letter-spacing-[0.2em]"
                      >
                        Acknowledge
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div
            className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInBottom_0.8s_ease_backwards] [animation-delay:0.2s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaHistory className="text-pink-400" /> Recent Transactions
            </h3>
            {transactions.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                {transactions.map(txn => (
                  <div key={txn.id} className="flex justify-between items-center bg-black/30 p-3 lg:p-4 rounded-xl border-l-[3px] border-pink-400 transition-colors hover:bg-black/50">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-9 h-9 bg-pink-400/10 text-pink-400 rounded-full flex items-center justify-center shrink-0">
                        <FaMoneyBillWave />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-[0.95rem] mb-1">{txn.desc}</div>
                        <div className="text-[0.75rem] text-gray-400">{txn.date} • {txn.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-base mb-1 text-rose-400">-{txn.amount}</div>
                      <div className="text-[0.75rem] font-semibold tracking-wide uppercase text-emerald-400">{txn.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No transactions found.</p>
            )}
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInBottom_0.8s_ease_backwards] [animation-delay:0.25s]">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <FaBrain className="text-emerald-400" /> Lifestyle & Identity
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Smoking</span>
                <span className="font-semibold text-white">{user.lifestyle.smoking}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest">Alcohol</span>
                <span className="font-semibold text-white">{user.lifestyle.alcohol}</span>
              </div>
              <div className="mt-2">
                <span className="text-[0.85rem] text-gray-400 uppercase tracking-widest block mb-2">Languages Known</span>
                <div className="flex flex-wrap gap-2">
                  {user.languages.map((lang: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-black rounded uppercase tracking-tighter">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Charts */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] min-h-[280px]">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="text-white m-0 flex items-center gap-2">
                <FaRegCommentDots className="text-indigo-400" /> Honesty Analysis
              </h3>
              <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${user.honesty.truth > 70 ? "bg-emerald-500/20 text-emerald-400" : user.honesty.truth > 40 ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"}`}>
                {user.honesty.truth > 70 ? "Reliable" : user.honesty.truth > 40 ? "Mixed" : "Caution"}
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={honestyData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#ccc" tick={{ fill: "#ccc", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: 'top', fill: '#fff', fontSize: 10, formatter: (val: number) => `${val}%` }}>
                    {honestyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#51cb95" : index === 1 ? "#ff736e" : "#ffcc00"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-black/20 rounded-lg">
                <div className="text-[8px] text-gray-500 uppercase font-black">Truth</div>
                <div className="text-[10px] font-bold text-white">{user.honesty.truth}%</div>
              </div>
              <div className="text-center p-2 bg-black/20 rounded-lg">
                <div className="text-[8px] text-gray-500 uppercase font-black">Doubt</div>
                <div className="text-[10px] font-bold text-amber-400">{user.honesty.doubt}%</div>
              </div>
              <div className="text-center p-2 bg-black/20 rounded-lg">
                <div className="text-[8px] text-gray-500 uppercase font-black">Lie</div>
                <div className="text-[10px] font-bold text-rose-400">{user.honesty.lie}%</div>
              </div>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] [animation-delay:0.2s] min-h-[280px]">
            <h3 className="flex items-center gap-2 text-white mt-0 mb-4 border-b border-white/10 pb-3">
              <FaHeartbeat className="text-pink-400" /> Satisfaction Metrics
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#ccc" width={80} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] [animation-delay:0.4s] min-h-[200px]">
            <h3 className="flex items-center gap-2 text-white mt-0 mb-4 border-b border-white/10 pb-3">
              <FaShieldAlt className="text-pink-400" /> Health Risk
            </h3>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData} layout="vertical">
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#ccc" width={80} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 80 ? "#51cb95" : entry.value > 40 ? "#ffcc00" : "#ff736e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideInLeft { 0% { transform: translateX(-30px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideInRight { 0% { transform: translateX(30px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideInBottom { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes float-slow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(80px, 80px); } }
        @keyframes pulseGlow { 0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4); } 50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6); } }
        @keyframes floatLight { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes spinRing { 100% { transform: rotate(360deg); } }
        @keyframes flash { 0%, 100% { opacity: 1; filter: brightness(1.2) contrast(1.1); } 50% { opacity: 0.6; filter: brightness(0.8) contrast(1.3); } }
        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes scaleIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        .pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

        /* Leaflet Dark Mode Strategy */
        .leaflet-tile-pane, .map-dark-filter {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        .leaflet-control-container .leaflet-control-zoom {
          border: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .leaflet-control-container .leaflet-control-zoom a {
          background-color: #19191e;
          color: #fff;
          border-color: rgba(255,255,255,0.1);
        }
        .leaflet-control-container .leaflet-control-zoom a:hover {
          background-color: #2b1055;
          color: #ff6fa2;
        }
        .leaflet-control-attribution {
          background: rgba(0, 0, 0, 0.6) !important;
          color: #aaa !important;
        }
        .leaflet-control-attribution a {
          color: #6c63ff !important;
        }
      `}} />
    </div>
  );
}
