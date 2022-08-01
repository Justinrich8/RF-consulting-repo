
import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "src/styles/Reviews.css";

interface ReviewsProps {

}

function currentDate() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

const Reviews = (props: ReviewsProps) => {

  return (
    <div className="Reviews">
      <div className="Reviews-container container">
        <div className="Reviews-titleAndRating">
            <div className="Reviews-title">
              Recent Reviews
            </div>
            {/* Ask Ben how to implement this */}
            <div className="Reviews-overallRating">
              ???
            </div>
        </div>
        <div className="Reviews-review">
          <div className="Reviews-reviewerNameAndDate">
            <div className="Reviews-reviewerName">
                Name
            </div>
            <div className="Reviews-reviewDate">
                {currentDate()}
            </div>
          </div>
          <div className="Reviews-ratingAndResponse">
            {/* Ask Ben how to implement this */}
            <div className="Reviews-rating">
              ???
            </div>
            <div className="Reviews-reviewText">
              Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut.
            </div>

            {/* Ask Ben how to make this not always appear */}
            <div className="Reviews-businessResponse">
              <div className="Reviews-businessName">
                  Business Name
              </div>
              <div className="Reviews-responseDate">
                {currentDate()}
              </div>
              <div className="Reviews-responseText">
                Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;