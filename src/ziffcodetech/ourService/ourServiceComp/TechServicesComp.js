import React from "react";
import { Link } from "react-router-dom";
import serviceImg from "../../homeImages/services_abstract.png";

const servicesList = [
  { title: "App Development", slug: "app-development", desc: "We design and develop mobile applications that offer exceptional user experiences. Whether you need an app for iOS, Android, or both, our team can bring your vision to life with seamless functionality and captivating design.", colorClass: "text-primary" },
  { title: "Product Design (UI/UX)", slug: "product-design-ui-ux", desc: "Our UI/UX design experts craft intuitive and visually stunning interfaces that enhance user satisfaction. We focus on creating designs that are not only beautiful but also easy to navigate, ensuring a delightful user experience.", colorClass: "text-danger" },
  { title: "Data Science and Analytics", slug: "data-science-and-analytics", desc: "Harness the power of data with our comprehensive data science and analytics services. We help you make informed decisions by analyzing data patterns and trends, providing actionable insights that drive business growth and efficiency.", colorClass: "text-success" },
  { title: "Digital Marketing", slug: "digital-marketing", desc: "In today’s digital age, having a strong online presence is crucial. Our digital marketing team employs cutting-edge strategies to boost your brand’s visibility, drive traffic, and increase conversions. From SEO to PPC campaigns, we’ve got you covered.", colorClass: "text-primary" },
  { title: "IT Services", slug: "it-services", desc: "We design and develop mobile applications that offer exceptional user experiences. Whether you need an app for iOS, Android, or both, our team can bring your vision to life with seamless functionality and captivating design.", colorClass: "text-info" },
  { title: "Kids Coding", slug: "kids-coding", desc: "Coding offers numerous benefits for children, promoting a range of cognitive, social, and emotional skills. The benefits can be particularly impactful when tailored to specific age groups.", colorClass: "text-secondary" }
];

const ITServices = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-stretch justify-content-center gap-4">
        {servicesList.map((service, idx) => (
          <div key={idx} className="col-lg-5 col-md-11 p-0 rounded-4 bg-white d-flex flex-column overflow-hidden transition-all" 
               style={{ 
                 transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
                 cursor: "pointer",
                 boxShadow: "0 10px 40px -15px rgba(0,0,0,0.12)",
                 borderTop: `5px solid ${idx % 2 === 0 ? "var(--secondary-color)" : "var(--primary-color)"}`,
                 borderBottom: "3px solid var(--primary-color) !important",
                 borderLeft: "1px solid rgba(0,0,0,0.05)",
                 borderRight: "1px solid rgba(0,0,0,0.05)"
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = "translateY(-15px)";
                 e.currentTarget.style.boxShadow = "0 35px 70px -15px rgba(64,105,179,0.25)";
                 e.currentTarget.style.zIndex = "10";
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = "translateY(0)";
                 e.currentTarget.style.boxShadow = "0 10px 40px -15px rgba(0,0,0,0.12)";
                 e.currentTarget.style.zIndex = "1";
               }}
               onClick={() => window.location.href = `/services/${service.slug}`}>
            
            <div className="w-100 d-flex justify-content-center align-items-center position-relative overflow-hidden" 
                 style={{ 
                   height: "280px", 
                   background: "linear-gradient(135deg, #f8fafc 0%, var(--bg-light-blue) 100%)",
                 }}>
                {/* Branded Accent Circle */}
                <div className="position-absolute rounded-circle opacity-10" 
                     style={{ width: "300px", height: "300px", border: `20px solid var(--primary-color)`, top: "-50px", right: "-50px" }}></div>
                
                <img src={serviceImg} alt={service.title} className="p-5 transition-all" 
                     style={{ 
                       objectFit: "contain", 
                       width: "100%", 
                       height: "100%", 
                       zIndex: 2,
                       filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.08))"
                     }} />
            </div>

            <div className="p-5 d-flex flex-column h-100 bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="me-2" style={{ width: "4px", height: "24px", backgroundColor: "var(--secondary-color)", borderRadius: "2px" }}></div>
                <h4 className="fw-black m-0" style={{ color: "var(--primary-dark)", letterSpacing: "-0.5px" }}>{service.title}</h4>
              </div>
              <p className="fw-medium mb-0 flex-grow-1" style={{ color: "#2d3748", lineHeight: "1.8", fontSize: "1.05rem" }}>{service.desc}</p>
              
              <div className="mt-4 pt-4 border-top">
                    <Link to={`/services/${service.slug}`} className="fw-bold fs-6 text-decoration-none" style={{ color: "var(--primary-color)" }}>Explore Service →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ITServices;