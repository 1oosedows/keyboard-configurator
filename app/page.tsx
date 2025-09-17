import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BuildCard, SimpleDifficultyBadge } from "@/components";
import { create60PercentLayout, MECHANICAL_SWITCHES } from "@/lib";

export default function Home() {
  // Mock data for featured builds
  const featuredBuilds = [
    {
      id: 'build-1',
      title: 'Minimalist 60% Daily Driver',
      description: 'Clean and simple build perfect for office work. Cherry MX Browns with PBT keycaps.',
      author: {
        id: 'user-1',
        username: 'keeb_master',
        displayName: 'Keyboard Master',
        avatar: '',
        joinDate: new Date(),
        reputation: 2847,
        badges: [],
        stats: {
          buildsShared: 12,
          helpfulVotes: 156,
          forumPosts: 89,
          marketplaceRating: 4.9,
          marketplaceSales: 23,
          buildDifficultiesCompleted: [1, 2, 3],
        },
      },
      configuration: {
        id: 'config-1',
        name: 'Daily Driver',
        layoutId: '60-percent',
        keyMappings: [],
        layers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
      },
      images: [{ id: 'img-1', url: '/placeholder-keyboard.jpg', order: 0, type: 'glamour' as const }],
      tags: ['60%', 'office', 'tactile', 'pbt'],
      difficulty: {
        level: 2 as const,
        name: 'Easy' as const,
        description: 'Simple modifications - stabilizer tuning, basic lubing',
        requirements: ['Hot-swap PCB', 'Stabilizer modification'],
        estimatedTime: 4,
        toolsNeeded: [],
        skillsRequired: [],
      },
      estimatedCost: 180,
      buildTime: 4,
      likes: 47,
      views: 892,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: true,
      verified: true,
    },
  ];

  const popularSwitches = MECHANICAL_SWITCHES.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Perfect
              <span className="block text-yellow-300">Mechanical Keyboard</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Design, configure, and build custom keyboards with our comprehensive tools, 
              community guides, and marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/configurator">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Start Building
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Explore Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From beginner-friendly guides to expert-level customization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⌨️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Configurator</h3>
              <p className="text-gray-600">
                Design layouts with real-time preview and key mapping
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Difficulty</h3>
              <p className="text-gray-600">
                Smart difficulty rating from beginner to expert builds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Share builds, get help, and learn from experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-gray-600">
                Buy and sell components with trusted community members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Builds Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Builds</h2>
              <p className="text-gray-600">Inspiring keyboards from our community</p>
            </div>
            <Link href="/community">
              <Button variant="outline">View All Builds</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBuilds.map((build) => (
              <BuildCard key={build.id} build={build} />
            ))}
            
            {/* Placeholder cards */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium text-gray-700 mb-2">Your Build Here</h3>
              <p className="text-sm text-gray-500 mb-4">Share your creation with the community</p>
              <Link href="/community/share">
                <Button size="sm" variant="outline">Share Build</Button>
              </Link>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium text-gray-700 mb-2">More Coming Soon</h3>
              <p className="text-sm text-gray-500 mb-4">New featured builds every week</p>
              <Link href="/community">
                <Button size="sm" variant="outline">Browse All</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Components Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Components</h2>
            <p className="text-gray-600">Trending switches and keycaps in the community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSwitches.map((sw) => (
              <div key={sw.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: sw.colorCode }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{sw.name}</h3>
                    <p className="text-sm text-gray-600">{sw.brand}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {sw.type} • {sw.specs.actuationForce}g • {sw.specs.totalTravel}mm
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    sw.priceRange === 'Budget' ? 'bg-green-100 text-green-800' :
                    sw.priceRange === 'Mid' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {sw.priceRange}
                  </span>
                  <Link href="/reference/switches">
                    <Button size="sm" variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/reference">
              <Button variant="outline">View All Components</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Dream Keyboard?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of keyboard enthusiasts creating amazing builds
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Configurator
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
