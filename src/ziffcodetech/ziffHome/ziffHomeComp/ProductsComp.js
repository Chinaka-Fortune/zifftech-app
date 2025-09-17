import React from "react";

const Products = () => {
    return (
        <div className="container-fluid mt-3">
            <div className="w-100 p-5  text-center fs-4 rounded-3">
                <p>Develop your career</p>
                <p>Develop your coding skills</p>
                <p className="text-centet">Coding Today, Empowering Tommorow</p>
            </div>
            <div class="row mt-4 d-flex">
                <div className="d-flex flex-wrap row-gap-5 justify-content-evenly">
                    <div class="col-sm-5">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title text-center">Mentorship</h5>
                                <p class="card-text text-center p-3 pb-5">Build a strong foundation in tech programs structured with diverse and brilliant mentors that will take your skills to the next level with expert-led courses put all their efforts and skills into positively influencing, shaping and helping you bring your dream to reality.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5 ">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title text-center">Internship</h5>
                                <p class="card-text text-center p-3 pb-5">We provide comprehensive internship programs encompassing diverse courses, including but not limited to UI/UX, backend development (.NET, C#, Node.js), frontend development, full stack development, mobile software development (Flutter, Dart, React Native), and blockchain technology.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title text-center p-3">Portfolio</h5>
                                <p class="card-text text-center">During the duration of the internship program, our exquisited crafted courses offers you the opportunity to engage in independent projects while facilitating internships with esteemed organizations. This invaluable experience not only enhances your skills and capabilities but also contributes to the development of an impressive professional portfolio.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5 ">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title text-center mb-0 ">Certification</h5>
                                <p class="card-text mb-3 text-center p-3">Upon successful completion of the program, you will be awarded an industry-recognized certificate that serves as a testament to your exceptional skills and dedication to continual professional growth. This certificate stands as a valuable asset, solidifying your expertise and enhancing your credibility within the industry that you can share with your </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;