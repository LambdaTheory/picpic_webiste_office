import { SmoothCursor } from '@/components/ui/smooth-cursor';

import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="dark min-h-screen w-full overflow-x-hidden bg-dark-900 text-gray-300 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    {/* Divider between Hero and VerticalFeatures */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50"></div>
    <VerticalFeatures />
    <Banner />
    <Footer />
    <SmoothCursor />
  </div>
);

export { Base };
