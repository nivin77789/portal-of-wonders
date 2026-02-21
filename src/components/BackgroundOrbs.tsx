const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-10%] right-[-5%] w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
    <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] animate-float" />
    <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] bg-rose-500/5 rounded-full blur-[80px] animate-float-delayed" />
  </div>
);

export default BackgroundOrbs;
