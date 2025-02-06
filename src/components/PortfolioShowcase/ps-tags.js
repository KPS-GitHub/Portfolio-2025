import React, { useState } from "react";
import PortfolioShowcaseTag from "./ps-tag";

const PortfolioShowcaseTags = ({ tags }) => {
    const [showAllTags, setShowAllTags] = useState(false);
    const initialTagCount = 6;
    
    if (!tags.length) {
        return <div>no tags for this project yet</div>;
    }

    const visibleTags = showAllTags ? tags : tags.slice(0, initialTagCount);
    const hasMoreTags = tags.length > initialTagCount;

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag, i) => (
                    <PortfolioShowcaseTag key={i} index={i-1} tag={tag} />
                ))}
            </div>
            
            {hasMoreTags && (
                <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className={`button-clean accent-shadow`}
                    style={{margin: 'auto'}}
                >
                    {showAllTags ? 'Show Less Tags' : `Show All Tags`}
                </button>
            )}
        </div>
    );
};

export default PortfolioShowcaseTags;