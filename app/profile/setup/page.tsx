'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ProfileSetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
    interests: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = [
    '60% Keyboards',
    '65% Keyboards', 
    '75% Keyboards',
    'TKL Keyboards',
    'Full Size Keyboards',
    'Linear Switches',
    'Tactile Switches',
    'Clicky Switches',
    'Custom Keycaps',
    'Artisan Keycaps',
    'Gaming',
    'Programming',
    'Writing',
    'Budget Builds',
    'Premium Builds',
    'DIY Building',
    'Soldering',
    'Hot-swap',
    'RGB Lighting',
    'Wireless Keyboards',
  ];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    // Pre-fill username from session if available
    if (session?.user?.username) {
      setFormData(prev => ({
        ...prev,
        username: session.user.username || '',
      }));
    }
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${session?.user?.id}/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/profile');
      } else {
        const data = await response.json();
        setError(data.message || 'Error setting up profile');
      }
    } catch (error) {
      setError('Error setting up profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl">⌨️</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to KeyboardConfig!
          </h2>
          <p className="mt-2 text-gray-600">
            Let's set up your profile to get you started in the community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a unique username"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be your public identifier in the community
              </p>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about yourself
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your keyboard journey, favorite switches, or what you're looking to build..."
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, Country"
              />
              <p className="text-xs text-gray-500 mt-1">
                Help connect with local keyboard enthusiasts
              </p>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What interests you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This helps us recommend relevant content and connect you with like-minded builders
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Setting up...' : 'Complete Setup'}
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          You can always update your profile later in settings
        </div>
      </div>
    </div>
  );
}