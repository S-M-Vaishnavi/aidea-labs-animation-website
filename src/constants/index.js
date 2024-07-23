import {blackImg,blueImg,sem,iaq,fumeHoodVideo,highlightFourthVideo,highlightSecondVideo,highlightThirdVideo,whiteImg,yellowImg} from "../utils";
  
  export const navLists = ['Home','Our Offerings','Gallery/Events','About Us','Careers'];
  export const hightlightsSlides = [
    {
      id: 1,
      textLists: ["SEM","Smart environment Monitors.",],
      video: sem,
      videoDuration: 6,
      linkTo:'/sem',
    },
    {
      id: 2,
      textLists: ["IAQ", "Continous Indoor Air Quality"],
      video: iaq,
      videoDuration: 6,
      linkTo:'/iaq',
    },
    {
      id: 3,
      textLists: ["Echo Logger","Multi-channel Data Logger",],
      video: highlightThirdVideo,
      videoDuration: 2,
      linkTo:'/echoLogger',
    },
    {
      id: 4,
      textLists: ["EMS", "Comprehensive Environment Monitoring"],
      video: highlightFourthVideo,
      videoDuration: 3.63,
      linkTo:'/ems',
    },
    {
      id: 5,
      textLists: ["Fume Hood Controllers", "Revolutionize the User Expereince"],
      video: fumeHoodVideo,
      videoDuration: 6,
      linkTo:'/fumeHood',
    },
  ];
  
  export const models = [
    {
      id: 1,
      title: "iPhone 15 Pro in Natural Titanium",
      color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
      img: yellowImg,
    },
    {
      id: 2,
      title: "iPhone 15 Pro in Blue Titanium",
      color: ["#53596E", "#6395ff", "#21242e"],
      img: blueImg,
    },
    {
      id: 3,
      title: "iPhone 15 Pro in White Titanium",
      color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
      img: whiteImg,
    },
    {
      id: 4,
      title: "iPhone 15 Pro in Black Titanium",
      color: ["#454749", "#3b3b3b", "#181819"],
      img: blackImg,
    },
  ];
  
  export const sizes = [
    { label: '6.1"', value: "small" },
    { label: '6.7"', value: "large" },
  ];
  
  export const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
  ];