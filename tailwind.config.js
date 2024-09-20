// giá trị nào thư viện k có sẵn thì set trong file này
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./public/index.html"
],
  theme: {
    extend: {
      '1100': '1100px',     
    },
    backgroundColor : {
      primary : '#F5F5F5',
      secondary1: '#808080',
      secondary2: '#FF0000',
      'overlay-30': 'rgba(0,0,0,0.3)',
      'overlay-60': 'rgba(0,0,0,0.6)',
      'overlay-50': 'rgba(0,0,0,0.5)',
    },
    zIndex: {
      '1000': '1000',
      '200': '200',
    },
    maxWidth:{
      '600': '600px',
      '1100': '1100px'
    },
    minWidth:{
      '400': '400px',
      '200': '200px'
    },
    flex:{
      '3' : '3 3 0%'
    }
    
  },
  plugins: [],

  
}

