import { useState } from 'react';

import { ShineBorder } from '../components/magicui/shine-border';
import { useSubscriberCount } from '../hooks/useSubscriberCount';
import { Section } from '../layout/Section';

const Banner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { count, incrementCount } = useSubscriberCount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        // 立即更新本地计数
        incrementCount();
      } else {
        setError(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
  };

  return (
    <Section>
      <div
        id="banner-section"
        className="relative flex flex-col overflow-hidden rounded-md border border-dark-600 bg-dark-700 p-4 text-center sm:p-12"
        data-banner-form
      >
        <ShineBorder
          borderWidth={2}
          duration={8}
          shineColor={['#F4A903', '#F7C34F', '#DC9803']}
          className="rounded-md"
        />

        <div className="relative z-10 mb-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-100">
            {isSubmitted
              ? 'Thank you for joining our beta!'
              : '🚀 Join PicPic Beta Program'}
          </h2>
          <p className="text-lg text-primary-400">
            {isSubmitted
              ? 'We will notify you when beta access becomes available'
              : 'Be among the first to test the most advanced AI image analysis tool'}
          </p>

          {!isSubmitted && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🧪</span>
                <span>Beta testing access</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">🎯</span>
                <span>Shape the final product</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🔥</span>
                <span>Free beta access</span>
              </div>
            </div>
          )}

          {!isSubmitted && (
            <div className="mt-4 inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
              <span className="mr-2 text-orange-400">⏰</span>
              <span className="text-sm font-medium text-orange-300">
                Limited beta spots - {count.toLocaleString()} users applied this
                month
              </span>
            </div>
          )}
        </div>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 mx-auto w-full max-w-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-lg border border-dark-500 bg-dark-600 px-4 py-3 text-gray-100 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className={`rounded-md bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
              >
                {isLoading ? 'Getting Access...' : 'Get Early Access'}
              </button>
            </div>
            {error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-900/20 p-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </form>
        ) : (
          <div className="relative z-10 flex justify-center">
            <button
              onClick={resetForm}
              className="rounded-md bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              Subscribe Again
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export { Banner };
