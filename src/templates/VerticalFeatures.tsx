import { Compare } from '../components/ui/compare';
import { LinkPreview } from '../components/ui/link-preview';
import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Why Choose PicPic?"
    description="Discover powerful AI features that make PicPic the best choice for image information extraction and analysis."
  >
    <VerticalFeatureRow
      title="AI Image Information Extraction"
      description={
        <>
          Extract comprehensive metadata from AI-generated images including
          model names, LoRA parameters, sampling steps, CFG scale, seed values,
          and generation prompts. Currently supports{' '}
          <LinkPreview
            url="https://stablediffusionweb.com/WebUI"
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent underline transition-all duration-300 hover:from-blue-300 hover:via-purple-400 hover:to-pink-400"
          >
            Stable Diffusion
          </LinkPreview>{' '}
          and{' '}
          <LinkPreview
            url="https://www.comfy.org/"
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent underline transition-all duration-300 hover:from-green-300 hover:via-blue-400 hover:to-purple-400"
          >
            ComfyUI
          </LinkPreview>{' '}
          generated PNG format images. Support for DALL-E and Midjourney coming
          soon.
          <br />
          <br />
          <span className="text-lg font-medium text-blue-300">
            🚀 Browser Extension Available:
          </span>{' '}
          Install our convenient browser extension to add images with just one
          click from any website, making the extraction process even more
          seamless and efficient.
        </>
      }
      image="/assets/images/feature.svg"
      imageAlt="AI image information extraction feature"
    />
    <VerticalFeatureRow
      title="AI Auto-Tagging System"
      description="Automatically generate intelligent tags for AI-generated images using advanced computer vision algorithms. Once tagged, users can easily search and organize their image collections by simply typing relevant keywords, making image management effortless and efficient."
      image="/assets/images/feature2.svg"
      imageAlt="AI auto-tagging feature"
      reverse
    />
    <VerticalFeatureRow
      title="AI Prompt Translation"
      description={
        <>
          Leverage advanced LLM technology to translate AI image generation
          prompts from any language into optimized English prompts. This feature
          ensures better compatibility with AI image generation models and helps
          users create more accurate and effective prompts regardless of their
          native language.
          <br />
          <br />
          <div className="mt-6 flex justify-center">
            <Compare
              firstText="一个美丽的女孩，长发飘逸，穿着白色连衣裙，站在樱花树下，阳光透过花瓣洒在她的脸上，温柔的微笑，电影级别的光影效果，高清画质，细节丰富"
              secondText="A beautiful girl with flowing long hair, wearing a white dress, standing under a cherry blossom tree, sunlight filtering through the petals onto her face, gentle smile, cinematic lighting effects, high definition, rich in detail"
              className="h-[300px] w-[700px]"
              firstTextClassName="bg-red-50 text-red-900 text-sm leading-relaxed"
              secondTextClassName="bg-blue-50 text-blue-900 text-sm leading-relaxed"
              slideMode="hover"
              showHandlebar={true}
              mode="text"
            />
          </div>
        </>
      }
      image="/assets/images/feature3.svg"
      imageAlt="AI prompt translation feature"
    />
    <VerticalFeatureRow
      title="AI Prompt Reverse Engineering"
      description={
        <>
          Utilize advanced LLM technology to analyze and reverse-engineer
          AI-generated images to extract their original generation prompts. This
          powerful feature can intelligently identify visual elements, styles,
          and characteristics to reconstruct the prompts that were likely used
          to create the image.
          <br />
          <br />
          <span className="text-lg font-medium text-green-300">
            📤 Multiple Export Formats:
          </span>{' '}
          Export the reconstructed prompts in formats optimized for{' '}
          <LinkPreview
            url="https://stablediffusionweb.com/WebUI"
            className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent underline transition-all duration-300 hover:from-orange-300 hover:via-red-400 hover:to-pink-400"
          >
            Stable Diffusion
          </LinkPreview>{' '}
          and{' '}
          <LinkPreview
            url="https://www.comfy.org/"
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-xl font-bold text-transparent underline transition-all duration-300 hover:from-cyan-300 hover:via-blue-400 hover:to-indigo-400"
          >
            ComfyUI
          </LinkPreview>
          , making it easy to recreate similar images or use as inspiration for
          new creations.
        </>
      }
      image="/assets/images/feature4.svg"
      imageAlt="AI prompt reverse engineering feature"
      reverse
    />
    <VerticalFeatureRow
      title="One-Click Export & Share"
      description={
        <>
          Effortlessly export and share your AI image collection data with
          one-click functionality. Support multiple formats for easy sharing and
          analysis.
          <br />
          <br />
          <span className="text-lg font-medium text-purple-300">
            📊 Export Formats:
          </span>{' '}
          <span className="font-semibold text-orange-400">📄 HTML</span> for
          interactive web format and{' '}
          <span className="font-semibold text-green-400">📈 CSV</span> for
          spreadsheet analysis. Perfect for reports, collaboration, and data
          backup.
        </>
      }
      image="/assets/images/feature5.svg"
      imageAlt="One-click export and share feature"
    />
  </Section>
);

export { VerticalFeatures };
