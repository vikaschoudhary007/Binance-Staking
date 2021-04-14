import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCPRYb1oR5xMuSxYD-NHeyZ4PWO007BGEo',
  authDomain: 'stochasticfinance-03042021.firebaseapp.com',
  databaseURL: 'https://stochasticfinance-03042021-default-rtdb.firebaseio.com',
  projectId: 'stochasticfinance-03042021',
  storageBucket: 'stochasticfinance-03042021.appspot.com',
  messagingSenderId: '8547879828',
  appId: '1:8547879828:web:0e9f969db10deec772dd81',
  measurementId: 'G-NXRXPHJMSB',
};
// Initialize Firebase
const firebaseinit = firebase.initializeApp(firebaseConfig);

export { firebaseinit };
