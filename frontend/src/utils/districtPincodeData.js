// Starter dataset of common Tamil Nadu districts, pincodes, and areas.
// This is a small sample list for demo purposes, not an exhaustive or
// live-verified directory. Extend this list, or swap it for a live
// pincode API, as the app grows.

const DISTRICT_PINCODE_DATA = {
  Coimbatore: [
    { pincode: "641001", area: "Coimbatore Town Hall" },
    { pincode: "641004", area: "R.S. Puram" },
    { pincode: "641006", area: "Ganapathy" },
    { pincode: "641012", area: "Peelamedu" },
    { pincode: "641045", area: "Saravanampatti" }
  ],
  Tiruppur: [
    { pincode: "641601", area: "Tiruppur Town" },
    { pincode: "641602", area: "Tiruppur North" },
    { pincode: "641604", area: "Kumar Nagar" },
    { pincode: "641605", area: "Palladam Road" }
  ],
  Chennai: [
    { pincode: "600001", area: "Parrys / George Town" },
    { pincode: "600017", area: "T. Nagar" },
    { pincode: "600020", area: "Adyar" },
    { pincode: "600040", area: "Anna Nagar" },
    { pincode: "600096", area: "Sholinganallur / OMR" }
  ],
  Madurai: [
    { pincode: "625001", area: "Madurai Town Hall" },
    { pincode: "625002", area: "Simmakkal" },
    { pincode: "625016", area: "K.K. Nagar" },
    { pincode: "625020", area: "Anna Nagar (Madurai)" }
  ],
  Tiruchirappalli: [
    { pincode: "620001", area: "Tiruchirappalli Town" },
    { pincode: "620002", area: "Cantonment" },
    { pincode: "620017", area: "Thillai Nagar" },
    { pincode: "620021", area: "Srirangam" }
  ],
  Salem: [
    { pincode: "636001", area: "Salem Town" },
    { pincode: "636004", area: "Hasthampatti" },
    { pincode: "636007", area: "Fairlands" },
    { pincode: "636014", area: "Suramangalam" }
  ],
  Erode: [
    { pincode: "638001", area: "Erode Town" },
    { pincode: "638002", area: "Erode Fort" },
    { pincode: "638011", area: "Perundurai Road" }
  ],
  Vellore: [
    { pincode: "632001", area: "Vellore Town" },
    { pincode: "632004", area: "Vellore Fort" },
    { pincode: "632006", area: "Katpadi" }
  ],
  Thanjavur: [
    { pincode: "613001", area: "Thanjavur Town" },
    { pincode: "613004", area: "Thanjavur East" },
    { pincode: "613007", area: "Vallam" }
  ],
  Tirunelveli: [
    { pincode: "627001", area: "Tirunelveli Town" },
    { pincode: "627002", area: "Palayamkottai" },
    { pincode: "627011", area: "Melapalayam" }
  ],
  Dindigul: [
    { pincode: "624001", area: "Dindigul Town" },
    { pincode: "624003", area: "Dindigul East" }
  ],
  Karur: [
    { pincode: "639001", area: "Karur Town" },
    { pincode: "639002", area: "Karur North" }
  ],
  Namakkal: [
    { pincode: "637001", area: "Namakkal Town" },
    { pincode: "637002", area: "Namakkal East" }
  ],
  Nilgiris: [
    { pincode: "643001", area: "Ooty Town" },
    { pincode: "643004", area: "Coonoor" }
  ],
  Cuddalore: [
    { pincode: "607001", area: "Cuddalore Town" },
    { pincode: "607002", area: "Cuddalore Port" }
  ]
};

export const DISTRICTS = Object.keys(DISTRICT_PINCODE_DATA).sort();

export const getPincodesForDistrict = (district) => DISTRICT_PINCODE_DATA[district] || [];

export default DISTRICT_PINCODE_DATA;
