import { IconStar } from '@tabler/icons-react';
import React from 'react';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  avatar: string;
  title: string;
}

const reviewData: ReviewItem[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    rating: 4.8,
    reviewBody:
      "As a beta tester, PicPic really solves my pain points! The AI image metadata extraction is very accurate and the interface is intuitive. However, I hope batch processing functionality can be added to make handling large volumes of images more efficient. Overall, it's a fantastic tool!",
    datePublished: '2025-07-25',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: 'Very Practical AI Analysis Tool',
  },
  {
    id: '2',
    author: 'Michael Chen',
    rating: 4.2,
    reviewBody:
      'The AI prompt reverse engineering feature is truly powerful! It helped me understand the creative process behind many excellent artworks. I suggest adding support for more AI models, like Midjourney image analysis. Also, it would be great if the export format could support JSON.',
    datePublished: '2025-07-28',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=michael&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: 'Powerful Features, Expecting More Support',
  },
  {
    id: '3',
    author: 'Alex Rodriguez',
    rating: 4.9,
    reviewBody:
      'Great experience during the beta period! ComfyUI workflow analysis is particularly useful, helping me learn many complex node combinations. I hope workflow visualization features can be added in the future for more intuitive understanding.',
    datePublished: '2025-08-02',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=alex&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: 'Excellent ComfyUI Analysis',
  },
  {
    id: '4',
    author: 'Sarah Kim',
    rating: 4.1,
    reviewBody:
      'As an AI researcher, this tool is very helpful for my research. The metadata extraction is comprehensive and multilingual support is good. However, it occasionally errors when processing some special format images, hoping for compatibility optimization.',
    datePublished: '2025-08-05',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=sarahkim&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: 'Research Tool, Expecting Optimization',
  },
  {
    id: '5',
    author: 'Emma Thompson',
    rating: 4.7,
    reviewBody:
      "The fact that it's completely free is amazing! As a designer, I often need to analyze reference image parameters. I suggest adding parameter comparison functionality to better understand how different parameters affect image results.",
    datePublished: '2025-08-08',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=emma&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: "Designer's Great Helper",
  },
  {
    id: '6',
    author: 'David Wilson',
    rating: 4.3,
    reviewBody:
      'Overall experience is good, the auto-tagging feature is very practical. However, I hope custom tagging functionality can be added to organize images according to personal needs. Also, cloud sync support would be perfect.',
    datePublished: '2025-08-12',
    avatar:
      'https://api.dicebear.com/7.x/personas/svg?seed=david&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
    title: 'Expecting More Personalized Features',
  },
];

const StarRating: React.FC<{ rating: number; showRating?: boolean }> = ({
  rating,
  showRating = false,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = rating >= starValue;
        const isPartial = rating > index && rating < starValue;

        return (
          <div key={index} className="relative">
            <IconStar
              className={`size-5 ${
                isFilled ? 'fill-current text-yellow-400' : 'text-gray-400'
              }`}
            />
            {isPartial && (
              <div
                className="absolute left-0 top-0 overflow-hidden"
                style={{ width: `${(rating - index) * 100}%` }}
              >
                <IconStar className="size-5 fill-current text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
      {showRating && (
        <span className="ml-2 text-sm font-medium text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70">
      <div className="flex items-start space-x-4">
        <img
          src={review.avatar}
          alt={`${review.author} avatar`}
          className="size-12 shrink-0 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-100">{review.author}</h4>
              <p className="text-sm text-gray-400">
                {new Date(review.datePublished).toLocaleDateString()}
              </p>
            </div>
            <StarRating rating={review.rating} showRating={true} />
          </div>
          <h5 className="mb-2 font-medium text-primary-400">{review.title}</h5>
          <p className="leading-relaxed text-gray-300">{review.reviewBody}</p>
        </div>
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  return (
    <div className="bg-gray-900/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-100">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Join thousands of satisfied users who trust PicPic for their AI
            image analysis needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviewData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
export { reviewData };
