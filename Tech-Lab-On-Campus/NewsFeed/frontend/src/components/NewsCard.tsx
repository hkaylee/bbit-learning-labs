import Link from "next/link";
import { Article } from "@/utils/types";

interface NewsCardProps {
    article: Article;
}

function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

function NewsCard({ article }: NewsCardProps) {
    // PART 2: Create a reusable news card to use with general stories

    // Similar to Part 1, create a component that displays:
    // 1. The article's image
    // 2. The article's title,
    // 3. A truncated version of the article's body

    // This component should be reusable to populate all stories on the news page.

    // Once completing this part, you should be able to see a few test articles on
    // the right side of the screen.

    // Hint: Some classes in `globals.css` could help with styling

    return (
        <div className="news-card bg-white shadow-md rounded-lg overflow-hidden mb-4 transition-transform transform hover:scale-105">
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <div>
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
                    <p className="text-gray-600 text-sm mb-3">
                        {truncateText(article.body, 100)}
                    </p>
                    <span className="text-blue-500 text-sm">Read more</span>
                </div>
            </Link>
        </div>
    );
}

export default NewsCard;





