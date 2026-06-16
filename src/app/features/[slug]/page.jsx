import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Sparkles, Code, PlayCircle, Users } from "lucide-react";
import { fetchAPI } from "../../../lib/api";

async function getFeatureData(slug) {
  try {
    const response = await fetchAPI('/api/pages', {
      filters: { slug: { $eq: slug } },
    }, { next: { revalidate: 60 } });
    
    if (response?.data?.length > 0) {
      const page = response.data[0];
      return page.attributes || page;
    }
  } catch (e) {
    console.error("Failed to fetch feature page from Strapi", e);
  }
  return null;
}

const mockFeatures = {
  "ai-mock-interviews": {
    title: "AI Voice Mock Interviews",
    icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
    gradient: "from-cyan-900/40 to-blue-900/40",
    border: "border-cyan-500/30",
    description: "Our advanced AI recruiter listens to your verbal responses and evaluates your technical accuracy, communication skills, and problem-solving approach in real-time.",
    highlights: ["Real-time Voice Processing", "Technical Accuracy Scoring", "Behavioral Analysis", "Instant Feedback Report"]
  },
  "3d-webgl-labs": {
    title: "Interactive 3D WebGL Labs",
    icon: <Code className="w-12 h-12 text-indigo-400" />,
    gradient: "from-indigo-900/40 to-purple-900/40",
    border: "border-indigo-500/30",
    description: "Step into the future of learning. Manipulate molecular structures, simulate physics experiments, and explore computer architecture in fully interactive 3D space.",
    highlights: ["60fps Hardware Acceleration", "VR Ready", "Complex Physics Simulations", "Zoom & Pan Controls"]
  },
  "multiplayer-sync": {
    title: "Live Multiplayer Syncing",
    icon: <Users className="w-12 h-12 text-green-400" />,
    gradient: "from-green-900/40 to-emerald-900/40",
    border: "border-green-500/30",
    description: "Pair programming reimagined. Share your sandbox with friends, mentors, or students. See their cursors, chat, and debug together in real-time.",
    highlights: ["Google-Docs Style Sync", "Real-time Cursor Tracking", "Integrated Voice Chat", "Role-based Permissions"]
  }
};

export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const pageData = await getFeatureData(slug);

  // If Strapi has the data, render the Strapi page
  if (pageData && pageData.content) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">{pageData.title}</h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-cyan-400">
          <ReactMarkdown>{pageData.content}</ReactMarkdown>
        </div>
      </main>
    );
  }

  // Fallback to beautiful mock data if no Strapi data exists
  const mockData = mockFeatures[slug];

  if (!mockData) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fade-in">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <div className={`w-full rounded-3xl border ${mockData.border} bg-gradient-to-br ${mockData.gradient} p-8 md:p-16 relative overflow-hidden backdrop-blur-sm shadow-2xl`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="mb-6 inline-flex p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-xl">
              {mockData.icon}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {mockData.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {mockData.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {mockData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
            
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Unlock with Pro
            </button>
          </div>
          
          <div className="flex-1 w-full aspect-square md:aspect-[4/3] rounded-2xl bg-black/60 border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <PlayCircle className="w-20 h-20 text-white/50 group-hover:text-white/90 group-hover:scale-110 transition-all duration-500 cursor-pointer" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
