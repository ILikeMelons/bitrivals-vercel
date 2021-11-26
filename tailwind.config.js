module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './sections/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans' : ['Avenir Next Demi'],
      'vtf' : ['VTF Redzone Classic'],
      'morgan' : ['MorganPoster']
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1130px',
      'default': '1260px'
    },
    extend: {
      colors: {
        black: {
          50: '#121825',
          100: '#1E2534',
          150: '#9DA3B0'
        },
        'pink' : '#FB385B',
        'blue': '#1EBAFA',
        'yellow': '#F9BA3F'
      },
      
      fontSize: {
        '12px' : ['12px', '32px'],
        '14px' : ['14px', '24px'],
        '16px' : ['16px', '24px'],
        '18px' : ['18px', '24px'],
        '22px' : ['22px', '37px'],
        '24px' : ['24px', '43px'],
        '25px' : ['25px', '26px'],
        '26px' : ['26px', '22px'],
        '30px' : ['30px', '32px'],
        '38px' : ['38px', '38px'],
        '42px' : ['42px', '41px'],
        '56px' : ['56px', '45px'],
        '80px' : ['80px', '70px'],
        '120px' : ['120px', '100px']
      },
       
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-text-fill-stroke')(), // no options to configure
  ],
}
