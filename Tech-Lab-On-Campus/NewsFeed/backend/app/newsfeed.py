"""Module for retrieving newsfeed information."""

from dataclasses import dataclass
from datetime import datetime
from app.utils.redis import REDIS_CLIENT


@dataclass
class Article:
    """Dataclass for an article."""

    author: str
    title: str
    body: str
    publish_date: datetime
    image_url: str
    url: str


def get_all_news() -> list[Article]:
    """Get all news articles from the datastore."""
    # 1. Use Redis client to fetch all articles
    # 2. Format the data into articles
    # 3. Return the as a list of articles sorted by most recent
    raw_articles = REDIS_CLIENT.get_entry("all_articles") or []
    articles = [_format_article(item) for item in raw_articles]
    articles.sort(key=lambda a: a.publish_date, reverse=True)
    return articles
    

def get_featured_news() -> Article | None:
    """Get the featured news article from the datastore."""
    # 1. Get all the articles
    # 2. Select and return the featured article
    articles = get_all_news()
    return articles[0] if articles else None
    

def _format_article(data: dict) -> Article:
    try:
        # Try to parse the top-level "published" field as an ISO-formatted date.
        publish_date = datetime.fromisoformat(data.get("published", ""))
    except Exception:
        publish_date = datetime.now()
    
    return Article(
        author=data.get("author", ""),
        title=data.get("title", ""),
        body=data.get("text", ""),
        publish_date=publish_date,
        image_url=data.get("thread", {}).get("main_image", ""),
        url=data.get("url", "")
    )


