// import { Button } from '../button/Button';
import RotatingText from '../components/RotatingText';
import { Cover } from '../components/ui/cover';
import { WavyBackground } from '../components/ui/wavy-background';
import { HeroOneButton } from '../hero/HeroOneButton';
import { useSubscriberCount } from '../hooks/useSubscriberCount';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => {
  const { count } = useSubscriberCount();

  return (
    <WavyBackground
      className="size-full"
      containerClassName="relative"
      colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
      waveWidth={50}
      backgroundFill="#0f172a"
      blur={10}
      speed="fast"
      waveOpacity={0.5}
    >
      <div className="absolute left-0 top-0 z-20 w-full">
        <div className="p-6">
          <NavbarTwoColumns logo={<Logo xl />}></NavbarTwoColumns>
        </div>
      </div>

      <Section yPadding="pt-32 pb-32 h-full">
        <HeroOneButton
          title={
            <>
              {'Smart Visual Content\n'}
              <span className="text-primary-400 ">Analysis Tool</span>
            </>
          }
          description={
            <div className="flex flex-wrap items-center font-sans text-3xl font-light text-gray-300">
              <span>Intelligent Visual Content</span>
              <RotatingText
                texts={[
                  'Extraction',
                  'Analysis',
                  'Processing',
                  'Recognition',
                  'Detection',
                ]}
                mainClassName="px-4 bg-primary-400 text-black overflow-hidden py-2 text-center rounded-lg inline-flex items-center justify-center min-w-[120px] h-[40px] mx-3 text-2xl pt-4"
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={4000}
              />
              <span>Tool</span>
            </div>
          }
          button={
            <div className="mt-8 flex flex-col items-center space-y-8">
              {/* Beta Features Preview */}
              <div className="text-md flex flex-wrap items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">🧪</span>
                  <span>Beta Testing Phase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>100% Free Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">⭐</span>
                  <span>Early Access Benefits</span>
                </div>
              </div>

              <div className="max-w-2xl text-center">
                <p className="mb-4 text-2xl font-medium text-gray-200 md:text-3xl">
                  🌟 Want to experience these powerful AI features?
                </p>
                <p className="text-lg text-gray-300 md:text-xl">
                  Join our beta waitlist to be among the first to try PicPic
                </p>

                {/* Beta Invitation Element */}
                <div className="mt-4 inline-flex items-center rounded-full border border-primary-400/20 bg-primary-400/10 px-4 py-2">
                  <span className="mr-2 text-primary-400">⏰</span>
                  <span className="text-sm font-medium text-primary-300">
                    Limited beta spots - {count.toLocaleString()}+ users already
                    applied
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const bannerElement =
                    document.querySelector('#banner-section');
                  if (bannerElement) {
                    bannerElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="cursor-pointer"
              >
                <Cover className="text-3xl font-semibold md:text-4xl">
                  Join Beta Waitlist
                </Cover>
              </button>

              {/* Beta Benefits */}
              <div className="text-md flex flex-wrap items-center justify-center gap-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>🎁</span>
                  <span>Exclusive beta perks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>Direct feedback channel</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🏆</span>
                  <span>Early access to features</span>
                </div>
              </div>
            </div>
          }
        />
      </Section>
    </WavyBackground>
  );
};

export { Hero };
