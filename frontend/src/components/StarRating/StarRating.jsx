import React, { useState } from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  return (
    <Rating
      name="star-rating"
      value={rating}
      onChange={handleRatingChange}
      emptyIcon={<StarIcon />}
      icon={<StarIcon sx={{ color: "gold" }} />}
    />
  );
};

export default StarRating;