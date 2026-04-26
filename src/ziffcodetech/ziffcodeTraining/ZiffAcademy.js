import React from 'react'
import HandsOnComp from "./ziffcodeComp/HandsOnComp";
import OurTrainingProdComp from "./ziffcodeComp/OurTrainingProdComp"
import SEO from '../../components/SEO';

const ZiffAcademy = () => {
  return (
    <div>
      <SEO 
        title="Ziffcode Training Academy | Elite Coding Bootcamps & Tech Training" 
        description="Launch your tech career with Ziffcode Training Academy. Professional bootcamps in Full-stack Development, Python, React, and Data Science. Start learning today!" 
        keywords="Ziffcode Academy, coding bootcamp Nigeria, learn programming Lagos, python training, react course, tech career launch"
      />
      <HandsOnComp />
      <OurTrainingProdComp />
    </div>
  )
}

export default ZiffAcademy;
