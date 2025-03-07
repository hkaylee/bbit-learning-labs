import React from 'react';
import { Article } from '../utils/types';
import NewsCard from './NewsCard';

interface NewsFeedProps {
    articles: Article[];
}

// The NewsFeed component receives an array of Article objects and renders them in a grid.
function NewsFeed({ articles }: NewsFeedProps) {
    return (
        <div className="stories-container">
            <div className="stories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </div>
    );
}

export default NewsFeed;
