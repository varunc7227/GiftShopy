import React from "react";
import "./SitemapItem.css";
import { Link } from "react-router-dom";

const SitemapItem = ({ title, items }) => {
  return (
    <div className="sitemap-item">
      <h2 className="sitemap-title">{title}</h2>
      <ul className="sitemap-list">
        {items.map((item, index) => (
          <Link
            to={`/search?category=${item}&filter=All&searchInput=none`}
            style={{ textDecoration: "none" }}
          >
            <li key={index} className="sitemap-list-item">
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SitemapItem;
