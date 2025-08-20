import { useState } from 'react';

import { ShineBorder } from '../components/magicui/shine-border';
import { Section } from '../layout/Section';

const Banner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
            {isSubmitted ? 'Thank you for subscribing!' : 'Join Our Wishlist'}
          </h2>
          <p className="text-lg text-primary-400">
            {isSubmitted
              ? 'We will notify you as soon as the product launches'
              : 'Be among the first to experience our product and get exclusive updates'}
          </p>
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
                className={`rounded-md bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {isLoading ? 'Submitting...' : 'Join WishList'}
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
