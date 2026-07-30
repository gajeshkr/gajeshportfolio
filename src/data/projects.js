// Add your real projects here. Duplicate an object to add more.
// To add images:
// 1. Put your image files in src/assets/ folder (e.g., project1.png)
// 2. Import them at the top here
// 3. Use the imported name in the image field

// Import your images like this:
// import project1Img from '../assets/project1.png'
// import project2Img from '../assets/project2.jpg'
// import project3Img from '../assets/project3.png'

const projects = [
  {
    title: 'Ground Water',
    description:
      'A short, punchy description of what this project does and the problem it solves. Two sentences is plenty.',
    tags: ['Wordpress', 'Acf Field', 'Html', 'Css', 'javascript', 'Php', 'MySQl','Elementor'],
    image: '',  // ← yahan imported image daalo, e.g., project1Img
    liveUrl: 'https://groundwaterindia.com/',  // ← Yahan apni website ka URL daalo
    codeUrl: '',  // ← Optional: GitHub repo URL
  },
  {
    title: 'Namo Solar Energy',
    description:
      'Another project summary. Mention the tech stack and one interesting detail about how you built it.',
    tags: ['Wordpress', 'Acf Field', 'Html', 'Css', 'javascript', 'Php', 'MySQl','Elementor'],
    image: '',
    liveUrl: 'https://namosolarenergy.com/',
    codeUrl: '',
  },
  {
    title: 'Khola Constructions Pvt. Ltd',
    description:
      'A third project. Replace this whole file with your real projects whenever you are ready.',
    tags: ['Wordpress', 'Acf Field', 'Html', 'Css', 'javascript', 'Php', 'MySQl'],
    image: '',
    liveUrl: 'https://kholaconstructions.in/',
    codeUrl: '',
  },
   {
    title: 'MedivizPharma',
    description:
      'A third project. Replace this whole file with your real projects whenever you are ready.',
    tags: ['React', 'Tailwind Css', 'Html', 'javascript', ],
    image: '',
    liveUrl: 'https://medivizpharma.com/',
    codeUrl: '',
  },
   {
    title: 'Spatial Thoughts',
    description:
      'A third project. Replace this whole file with your real projects whenever you are ready.',
    tags: ['Wordpress', 'Acf Field', 'Html', 'Css', 'javascript', 'Php', 'MySQl'],
    image: '',
    liveUrl: 'https://spatialthoughts.co.uk/',
    codeUrl: '',
  },
  {
    title: 'Rotary Club of Stratford',
    description:
      'A third project. Replace this whole file with your real projects whenever you are ready.',
    tags: [ 'Html', 'Css', 'javascript', 'Php', 'MySQl'],
    image: '',
    liveUrl: 'https://www.rotarystratford.london/',
    codeUrl: '',
  },
]

export default projects
