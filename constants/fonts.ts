import localFont from 'next/font/local'

export const clash = localFont({
  src: [
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Extralight.otf', weight: '200' },
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Light.otf', weight: '300' },
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Regular.otf', weight: '400' },
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Medium.otf', weight: '500' },
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Semibold.otf', weight: '600' },
    { path: '../public/fonts/ClashDisplay/Fonts/OTF/ClashDisplay-Bold.otf', weight: '700' },
  ]
})