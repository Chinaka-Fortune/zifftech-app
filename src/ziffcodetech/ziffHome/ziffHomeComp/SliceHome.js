import React from "react";
import inctructor from "../homeImages/inctructor.jpg"
import cohortImage from "../homeImages/cohortImage.jpg"
import classroom from "../homeImages/classroom.jpg"

const SlideHome = () => {
    return (

        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" data-bs-pause='false'>
  <div class="carousel-inner ">
    <figure class="carousel-item LandingPageCarousel active carouselImage">
      <img src={inctructor} class="d-block w-100 h-100" style={{objectFit:'cover', objectPosition:'center'}} alt="..."/>
    </figure>
    <figure class="carousel-item carouselImage">
      <img src={cohortImage} class="d-block w-100 h-100" style={{objectFit:'cover', objectPosition:'center'}} alt="..."/>
    </figure>
    <figure class="carousel-item carouselImage">
      <img src={classroom} class="d-block w-100 h-100" style={{objectFit:'cover', objectPosition:'center'}} alt="..."/>
    </figure>
  </div>
</div>
    )
}

export default SlideHome;