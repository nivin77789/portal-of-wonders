import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MdArrowBack, MdLocationOn } from "react-icons/md";
import { FaBrain, FaRegCommentDots, FaShieldAlt, FaHeartbeat, FaInstagram, FaWhatsapp, FaFacebookF, FaUndo, FaHistory, FaBriefcase, FaMoneyBillWave, FaSnapchatGhost, FaEnvelope, FaGraduationCap, FaSimCard, FaPhoneAlt, FaLinkedin, FaMobileAlt, FaNetworkWired, FaLandmark } from "react-icons/fa";
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

  const mapCenter = (isRojee ? [12.967292, 77.760656] : [12.971598 + (parseInt(randomStr) % 100) * 0.005, 77.594562 + (parseInt(randomStr) % 100) * 0.005]) as [number, number];
  const mapColor = isRojee ? '#E1306C' : (parseInt(randomStr) % 2 === 0 ? '#6c63ff' : '#42a5f5');
  const workHistory = isRojee ? [
    { role: "Beauty Therapist", company: "Mocca Spa", duration: "Present", desc: "Specializing in premium client treatments." },
    { role: "Senior Therapist", company: "O3 Spa", duration: "Previous", desc: "Advanced therapies and client management." },
    { role: "Junior Massuse", company: "Ozone Wellness", duration: "2019 - 2021", desc: "Aromatherapy, deep tissue treatments." }
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
    { id: "TXN-8091", amount: "₹4,500", date: "20 Feb 2026", status: "Completed", desc: "Premium Session" },
    { id: "TXN-7123", amount: "₹3,200", date: "15 Feb 2026", status: "Completed", desc: "Standard Therapy" },
    { id: "TXN-6642", amount: "₹5,000", date: "10 Feb 2026", status: "Completed", desc: "Overtime/Extra" },
    { id: "TXN-5011", amount: "₹12,400", date: "02 Feb 2026", status: "Completed", desc: "Long-weekend Package" },
  ] : [];

  const totalSpend = isRojee ? "₹25,100" : "₹0";

  const honestyData = [
    { name: "Truth", value: user.honesty.truth },
    { name: "Lie", value: user.honesty.lie },
  ];

  const satisfactionData = [
    { name: "Satisfaction", value: parseInt(user.satisfaction) },
    { name: "Remaining", value: 10 - parseInt(user.satisfaction) },
  ];

  const stiValue = user.stiRisk === "Low" ? 1 : user.stiRisk === "Medium" ? 2 : 3;
  const stiData = [{ name: user.name, value: stiValue, risk: user.stiRisk }];

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

                  {device.model === "iPhone 14 Plus" && isRojee && (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setIsTrackingLocation(true);
                          setTimeout(() => {
                            setIsTrackingLocation(false);
                            setLocationFetched(true);
                          }, 3000);
                        }}
                        disabled={isTrackingLocation}
                        className={`w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${isTrackingLocation
                          ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 cursor-wait"
                          : "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white"
                          }`}
                      >
                        <MdLocationOn className={isTrackingLocation ? "animate-ping" : ""} />
                        {isTrackingLocation ? "Pinging Satellite..." : "Fetch Live Location"}
                      </button>

                      {locationFetched && (
                        <div className="rounded-xl overflow-hidden border border-indigo-500/30 h-[200px] relative animate-[scaleIn_0.4s_ease_out] bg-[#0a0e27]">
                          <div className="absolute top-2 left-2 z-20 bg-emerald-500/80 text-[8px] font-black px-1.5 py-0.5 rounded text-white animate-pulse">
                            LIVE TRACKING
                          </div>
                          <MapContainer center={mapCenter} zoom={18} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              className="map-dark-filter"
                            />
                            <Circle
                              center={mapCenter}
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
                <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">{bankDetails.bankName}</span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[0.65rem] font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm relative z-10">
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Account Holder</span>
                  <span className="text-white font-semibold">{bankDetails.accountHolder}</span>
                </div>
                <div className="flex flex-col text-left sm:text-right">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Account No</span>
                  <span className="text-pink-300 font-mono tracking-widest">{bankDetails.accountNo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">IFSC Code</span>
                  <span className="text-gray-300 font-medium">{bankDetails.ifsc}</span>
                </div>
                <div className="flex flex-col text-left sm:text-right">
                  <span className="text-gray-500 uppercase tracking-widest text-xs mb-1">Branch</span>
                  <span className="text-gray-300 font-medium">{bankDetails.branch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInLeft_0.8s_ease_backwards] [animation-delay:0.15s] overflow-hidden">
            <h3 className="flex items-center gap-2 mt-0 mb-5 text-[1.25rem] text-white border-b border-white/10 pb-3">
              <MdLocationOn style={{ color: mapColor }} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" /> Actual Location
            </h3>
            <div className="w-full h-[250px] rounded-xl overflow-hidden border border-white/10 relative z-10 z-[1] isolate">
              <MapContainer key={user.id} center={mapCenter} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Circle
                  center={mapCenter}
                  radius={100}
                  pathOptions={{ color: mapColor, fillColor: mapColor, fillOpacity: 0.25, weight: 2 }}
                />
              </MapContainer>
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
              <FaBrain className="text-pink-400" /> Psychology Profile
            </h3>
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
            <div className="text-[3.5rem] font-extrabold my-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_30px_rgba(108,99,255,0.5)] z-10">
              {totalSpend}
            </div>

            <button className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white border-none text-[1.1rem] px-8 py-3 rounded-full font-bold cursor-pointer flex items-center gap-2.5 shadow-[0_8px_20px_rgba(255,65,108,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_25px_rgba(255,65,108,0.6)] z-10 mt-2">
              <FaUndo /> <span>Recover Spend Back</span>
            </button>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 animate-[slideInBottom_0.8s_ease_backwards] [animation-delay:0.2s]">
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
        </div>

        {/* RIGHT COLUMN: Charts */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] min-h-[280px]">
            <h3 className="text-white mt-0 mb-4 border-b border-white/10 pb-3 flex items-center gap-2">Honesty Analysis</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={honestyData}>
                  <XAxis dataKey="name" stroke="#ccc" tick={{ fill: "#ccc" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {honestyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#51cb95" : "#ff736e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] [animation-delay:0.2s] min-h-[280px]">
            <h3 className="flex items-center gap-2 text-white mt-0 mb-4 border-b border-white/10 pb-3">
              <FaHeartbeat className="text-pink-400" /> Satisfaction Metrics
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={5}
                    stroke="none"
                  >
                    {satisfactionData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#19191e]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-[slideInRight_0.8s_ease_backwards] [animation-delay:0.4s] min-h-[200px]">
            <h3 className="flex items-center gap-2 text-white mt-0 mb-4 border-b border-white/10 pb-3">
              <FaShieldAlt className="text-pink-400" /> Health Risk
            </h3>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stiData} layout="vertical">
                  <XAxis type="number" stroke="#ccc" domain={[0, 3]} ticks={[0, 1, 2, 3]} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#ccc" width={80} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "white" }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} fill={STI_COLORS[user.stiRisk]} barSize={20} />
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
