import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Pizza, IceCream, Coffee, Wine, ChevronRight, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const cravingCategories = [
    {
        title: "Signature Meals",
        icon: <UtensilsCrossed className="w-5 h-5" />,
        color: "from-orange-500/20 to-red-500/20",
        items: [
            {
                name: "Alfam Mandi",
                location: "Nehadi, Koramangala",
                description: "Perfectly grilled chicken with aromatic mandi rice and authentic spices.",
                rating: 4.8
            },
            {
                name: "Shawai Combo",
                location: "Malabar Shawai, Madiwala",
                description: "Traditional Malabar style grilled chicken combo with kubbus and garlic sauce.",
                rating: 4.7
            },
            {
                name: "Signature Biriyani",
                location: "Paragon, MG Road",
                description: "The legendary Malabar biriyani known for its unique flavor and tenderness.",
                rating: 4.9
            }
        ]
    },
    {
        title: "Exotic Desserts",
        icon: <IceCream className="w-5 h-5" />,
        color: "from-pink-500/20 to-purple-500/20",
        items: [
            {
                name: "Biscoff Nutella Tresleches Kunafa",
                location: "Laban Story",
                description: "A heavenly fusion of crunchy kunafa, lotus biscoff, and nutella soaked in three milks.",
                rating: 4.9
            },
            {
                name: "Opera Cake",
                location: "Bakingo",
                description: "Classic French pastry layers with coffee syrup, ganache, and coffee buttercream.",
                rating: 4.6
            }
        ]
    },
    {
        title: "Signature Shakes",
        icon: <Coffee className="w-5 h-5" />,
        color: "from-emerald-500/20 to-cyan-500/20",
        items: [
            {
                name: "Pistachio Caramel Smoothie",
                location: "Sign Laban, Madiwala",
                description: "Rich, nutty pistachio blended with smooth caramel for the ultimate refreshment.",
                rating: 4.7
            }
        ]
    },
    {
        title: "Premium Liquors",
        icon: <Wine className="w-5 h-5" />,
        color: "from-amber-500/20 to-yellow-500/20",
        items: [
            {
                name: "Onson Handcrafted Whisky",
                location: "Premium Collection",
                description: "Smooth, artisanal whisky with complex notes, handcrafted for excellence.",
                rating: 4.8
            },
            {
                name: "Oaksmith Whisky",
                location: "International Blend",
                description: "Crafted by Japanese master blenders, combining the best of Scotch and Bourbon styles.",
                rating: 4.5
            },
            {
                name: "Jägermeister",
                location: "German Classic",
                description: "The classic herbal liqueur made with 56 different herbs, blossoms, roots, and fruits.",
                rating: 4.7
            }
        ]
    }
];

const Cravings = () => {
    return (
        <div className="pb-20 relative">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Page Header */}
                <div className="mb-12 animate-fade-in text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
                        <div className="flex items-center justify-center w-16 h-16 rounded-3xl gradient-accent shadow-2xl shadow-orange-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <UtensilsCrossed className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-display font-black tracking-tight text-white uppercase mb-2">My Cravings</h1>
                            <p className="text-orange-400 font-bold tracking-[0.3em] text-xs uppercase opacity-80">The Ultimate Bangalore Food Map</p>
                        </div>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mx-auto lg:mx-0 font-medium">
                        A curated list of the most legendary flavors across the city. From spiced meats to artisanal spirits.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="space-y-16">
                    {cravingCategories.map((category, catIndex) => (
                        <div key={category.title} className="space-y-8 animate-fade-in" style={{ animationDelay: `${catIndex * 200}ms` }}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} border border-white/10 shadow-lg`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white tracking-wide">{category.title}</h2>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIndex) => (
                                    <Card
                                        key={item.name}
                                        className="glass-card border-white/5 group hover:scale-[1.03] transition-all duration-500 overflow-hidden"
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />

                                        <CardHeader className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span className="text-xs font-bold">{item.rating}</span>
                                                </div>
                                                <Badge variant="outline" className="text-[0.6rem] uppercase tracking-widest border-white/10 text-slate-400">
                                                    Verified
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl font-display font-bold text-white group-hover:text-orange-400 transition-colors leading-tight">
                                                {item.name}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-indigo-400/80 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-[0.7rem] font-bold uppercase tracking-wider">{item.location}</span>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="relative z-10">
                                            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
                                                {item.description}
                                            </p>

                                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[0.7rem] font-black uppercase tracking-widest text-slate-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2">
                                                Check Directions
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-20 p-12 glass-card border-orange-500/10 text-center relative overflow-hidden group">
                    <div className="absolute top-[-50%] left-[-20%] w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-1000" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-display font-bold text-white mb-4 italic">"One cannot think well, love well, sleep well, if one has not dined well."</h3>
                        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cravings;
