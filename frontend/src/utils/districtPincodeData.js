// Expanded dataset covering all 38 Tamil Nadu districts with common
// pincodes and areas/taluks. This is a curated sample list for demo
// purposes, not an exhaustive or live-verified postal directory. Extend
// this list, or swap it for a live pincode API, as the app grows.

const DISTRICT_PINCODE_DATA = {
  Ariyalur: [
    { pincode: "621704", area: "Ariyalur Town" },
    { pincode: "621707", area: "Sendurai" },
    { pincode: "621801", area: "Udayarpalayam" },
    { pincode: "621712", area: "Andimadam" },
    { pincode: "621713", area: "T. Palur" }
  ],
  Chengalpattu: [
    { pincode: "603001", area: "Chengalpattu Town" },
    { pincode: "600044", area: "Tambaram" },
    { pincode: "603103", area: "Guduvancheri" },
    { pincode: "603209", area: "Maraimalai Nagar" },
    { pincode: "603002", area: "Chithamur" },
    { pincode: "603109", area: "Thirukazhukundram" },
    { pincode: "600048", area: "Vandalur" }
  ],
  Chennai: [
    { pincode: "600001", area: "Parrys / George Town" },
    { pincode: "600017", area: "T. Nagar" },
    { pincode: "600020", area: "Adyar" },
    { pincode: "600040", area: "Anna Nagar" },
    { pincode: "600096", area: "Sholinganallur / OMR" },
    { pincode: "600004", area: "Mylapore" },
    { pincode: "600008", area: "Egmore" },
    { pincode: "600042", area: "Velachery" },
    { pincode: "600011", area: "Perambur" },
    { pincode: "600053", area: "Ambattur" }
  ],
  Coimbatore: [
    { pincode: "641001", area: "Coimbatore Town Hall" },
    { pincode: "641004", area: "R.S. Puram" },
    { pincode: "641006", area: "Ganapathy" },
    { pincode: "641012", area: "Peelamedu" },
    { pincode: "641045", area: "Saravanampatti" },
    { pincode: "641402", area: "Sulur" },
    { pincode: "641301", area: "Mettupalayam" },
    { pincode: "642001", area: "Pollachi" },
    { pincode: "642109", area: "Kinathukadavu" },
    { pincode: "641653", area: "Annur" }
  ],
  Cuddalore: [
    { pincode: "607001", area: "Cuddalore Town" },
    { pincode: "607002", area: "Cuddalore Port" },
    { pincode: "607801", area: "Panruti" },
    { pincode: "608001", area: "Chidambaram" },
    { pincode: "606001", area: "Vriddhachalam" },
    { pincode: "607307", area: "Kurinjipadi" },
    { pincode: "607807", area: "Neyveli" }
  ],
  Dharmapuri: [
    { pincode: "636701", area: "Dharmapuri Town" },
    { pincode: "636809", area: "Palacode" },
    { pincode: "636902", area: "Harur" },
    { pincode: "636810", area: "Pennagaram" },
    { pincode: "636905", area: "Pappireddipatti" }
  ],
  Dindigul: [
    { pincode: "624001", area: "Dindigul Town" },
    { pincode: "624003", area: "Dindigul East" },
    { pincode: "624702", area: "Palani" },
    { pincode: "624619", area: "Oddanchatram" },
    { pincode: "624101", area: "Kodaikanal" },
    { pincode: "624710", area: "Vedasandur" },
    { pincode: "624208", area: "Nilakkottai" },
    { pincode: "624401", area: "Natham" }
  ],
  Erode: [
    { pincode: "638001", area: "Erode Town" },
    { pincode: "638002", area: "Erode Fort" },
    { pincode: "638011", area: "Perundurai Road" },
    { pincode: "638057", area: "Perundurai" },
    { pincode: "638301", area: "Bhavani" },
    { pincode: "638452", area: "Gobichettipalayam" },
    { pincode: "638401", area: "Sathyamangalam" },
    { pincode: "638151", area: "Kodumudi" },
    { pincode: "638501", area: "Anthiyur" }
  ],
  Kallakurichi: [
    { pincode: "606202", area: "Kallakurichi Town" },
    { pincode: "606107", area: "Ulundurpet" },
    { pincode: "606304", area: "Sankarapuram" },
    { pincode: "606201", area: "Chinnasalem" }
  ],
  Kanchipuram: [
    { pincode: "631501", area: "Kanchipuram Town" },
    { pincode: "631502", area: "Kanchipuram East" },
    { pincode: "602105", area: "Sriperumbudur" },
    { pincode: "603406", area: "Uthiramerur" },
    { pincode: "631605", area: "Walajabad" }
  ],
  Kanyakumari: [
    { pincode: "629702", area: "Nagercoil" },
    { pincode: "629001", area: "Kanyakumari Town" },
    { pincode: "629601", area: "Marthandam" },
    { pincode: "629401", area: "Colachel" },
    { pincode: "629153", area: "Padmanabhapuram" },
    { pincode: "629175", area: "Thuckalay" }
  ],
  Karur: [
    { pincode: "639001", area: "Karur Town" },
    { pincode: "639002", area: "Karur North" },
    { pincode: "639104", area: "Kulithalai" },
    { pincode: "639201", area: "Aravakurichi" },
    { pincode: "639111", area: "Krishnarayapuram" },
    { pincode: "639006", area: "Manmangalam" }
  ],
  Krishnagiri: [
    { pincode: "635001", area: "Krishnagiri Town" },
    { pincode: "635109", area: "Hosur" },
    { pincode: "635107", area: "Denkanikottai" },
    { pincode: "635104", area: "Bargur" },
    { pincode: "635126", area: "Pochampalli" }
  ],
  Madurai: [
    { pincode: "625001", area: "Madurai Town Hall" },
    { pincode: "625002", area: "Simmakkal" },
    { pincode: "625016", area: "K.K. Nagar" },
    { pincode: "625020", area: "Anna Nagar (Madurai)" },
    { pincode: "625106", area: "Melur" },
    { pincode: "625532", area: "Usilampatti" },
    { pincode: "625705", area: "Thirumangalam" },
    { pincode: "625218", area: "Vadipatti" }
  ],
  Mayiladuthurai: [
    { pincode: "609001", area: "Mayiladuthurai Town" },
    { pincode: "609102", area: "Sirkazhi" },
    { pincode: "609405", area: "Kuthalam" },
    { pincode: "609313", area: "Tharangambadi" }
  ],
  Nagapattinam: [
    { pincode: "611001", area: "Nagapattinam Town" },
    { pincode: "611002", area: "Nagapattinam Port" },
    { pincode: "614810", area: "Vedaranyam" },
    { pincode: "611105", area: "Thirukkuvalai" },
    { pincode: "611301", area: "Kilvelur" }
  ],
  Namakkal: [
    { pincode: "637001", area: "Namakkal Town" },
    { pincode: "637002", area: "Namakkal East" },
    { pincode: "637207", area: "Rasipuram" },
    { pincode: "637211", area: "Tiruchengode" },
    { pincode: "637410", area: "Paramathi Velur" },
    { pincode: "637303", area: "Mohanur" }
  ],
  Nilgiris: [
    { pincode: "643001", area: "Ooty Town" },
    { pincode: "643004", area: "Coonoor" },
    { pincode: "643220", area: "Gudalur" },
    { pincode: "643217", area: "Kotagiri" },
    { pincode: "643213", area: "Kundah" }
  ],
  Perambalur: [
    { pincode: "621212", area: "Perambalur Town" },
    { pincode: "621220", area: "Kunnam" },
    { pincode: "621116", area: "Veppanthattai" },
    { pincode: "621313", area: "Alathur" }
  ],
  Pudukkottai: [
    { pincode: "622001", area: "Pudukkottai Town" },
    { pincode: "622003", area: "Kalanivasal" },
    { pincode: "622101", area: "Karambakkudi" },
    { pincode: "622203", area: "Gandarvakottai" },
    { pincode: "622301", area: "Alangudi" },
    { pincode: "622401", area: "Manamelkudi" },
    { pincode: "622507", area: "Thirumayam" },
    { pincode: "614616", area: "Aranthangi" },
    { pincode: "614625", area: "Avudaiyarkoil" },
    { pincode: "622102", area: "Illuppur" },
    { pincode: "622004", area: "Keeranur" },
    { pincode: "622407", area: "Ponnamaravathi" },
    { pincode: "622202", area: "Viralimalai" }
  ],
  Ramanathapuram: [
    { pincode: "623501", area: "Ramanathapuram Town" },
    { pincode: "623502", area: "Ramanathapuram East" },
    { pincode: "623707", area: "Paramakudi" },
    { pincode: "623526", area: "Rameswaram" },
    { pincode: "623604", area: "Kamuthi" },
    { pincode: "623703", area: "Mudukulathur" }
  ],
  Ranipet: [
    { pincode: "632401", area: "Ranipet Town" },
    { pincode: "632403", area: "Walajapet" },
    { pincode: "631001", area: "Arakkonam" },
    { pincode: "632503", area: "Arcot" },
    { pincode: "631102", area: "Sholingur" }
  ],
  Salem: [
    { pincode: "636001", area: "Salem Town" },
    { pincode: "636004", area: "Hasthampatti" },
    { pincode: "636007", area: "Fairlands" },
    { pincode: "636014", area: "Suramangalam" },
    { pincode: "636102", area: "Attur" },
    { pincode: "636401", area: "Mettur" },
    { pincode: "636455", area: "Omalur" },
    { pincode: "637301", area: "Sankari" }
  ],
  Sivaganga: [
    { pincode: "630561", area: "Sivaganga Town" },
    { pincode: "630211", area: "Karaikudi" },
    { pincode: "630606", area: "Manamadurai" },
    { pincode: "630302", area: "Devakottai" },
    { pincode: "630702", area: "Ilayangudi" }
  ],
  Tenkasi: [
    { pincode: "627811", area: "Tenkasi Town" },
    { pincode: "627809", area: "Shencottai" },
    { pincode: "627756", area: "Sankarankovil" },
    { pincode: "627715", area: "Kadayanallur" },
    { pincode: "627758", area: "Vasudevanallur" }
  ],
  Thanjavur: [
    { pincode: "613001", area: "Thanjavur Town" },
    { pincode: "613004", area: "Thanjavur East" },
    { pincode: "613007", area: "Vallam" },
    { pincode: "612001", area: "Kumbakonam" },
    { pincode: "614601", area: "Pattukkottai" },
    { pincode: "614904", area: "Papanasam" },
    { pincode: "614625", area: "Orathanadu" }
  ],
  Theni: [
    { pincode: "625531", area: "Theni Town" },
    { pincode: "625601", area: "Bodinayakanur" },
    { pincode: "625601", area: "Periyakulam" },
    { pincode: "625512", area: "Andipatti" },
    { pincode: "625533", area: "Uthamapalayam" },
    { pincode: "625516", area: "Cumbum" }
  ],
  Thoothukudi: [
    { pincode: "628001", area: "Thoothukudi Town" },
    { pincode: "628002", area: "Thoothukudi Port" },
    { pincode: "628501", area: "Kovilpatti" },
    { pincode: "628751", area: "Ottapidaram" },
    { pincode: "628619", area: "Srivaikuntam" },
    { pincode: "628215", area: "Tiruchendur" }
  ],
  Tiruchirappalli: [
    { pincode: "620001", area: "Tiruchirappalli Town" },
    { pincode: "620002", area: "Cantonment" },
    { pincode: "620017", area: "Thillai Nagar" },
    { pincode: "620021", area: "Srirangam" },
    { pincode: "621601", area: "Lalgudi" },
    { pincode: "621306", area: "Manapparai" },
    { pincode: "621211", area: "Musiri" },
    { pincode: "621010", area: "Thuraiyur" }
  ],
  Tirunelveli: [
    { pincode: "627001", area: "Tirunelveli Town" },
    { pincode: "627002", area: "Palayamkottai" },
    { pincode: "627011", area: "Melapalayam" },
    { pincode: "627401", area: "Ambasamudram" },
    { pincode: "627353", area: "Nanguneri" },
    { pincode: "627111", area: "Radhapuram" }
  ],
  Tirupathur: [
    { pincode: "635601", area: "Tirupathur Town" },
    { pincode: "635751", area: "Vaniyambadi" },
    { pincode: "635851", area: "Jolarpettai" },
    { pincode: "635802", area: "Ambur" },
    { pincode: "635811", area: "Natrampalli" }
  ],
  Tiruppur: [
    { pincode: "641601", area: "Tiruppur Town" },
    { pincode: "641602", area: "Tiruppur North" },
    { pincode: "641604", area: "Kumar Nagar" },
    { pincode: "641605", area: "Palladam Road" },
    { pincode: "641654", area: "Avinashi" },
    { pincode: "638657", area: "Dharapuram" },
    { pincode: "642126", area: "Udumalpet" },
    { pincode: "638701", area: "Kangeyam" }
  ],
  Tiruvallur: [
    { pincode: "602001", area: "Tiruvallur Town" },
    { pincode: "602021", area: "Avadi" },
    { pincode: "602024", area: "Poonamallee" },
    { pincode: "601201", area: "Gummidipoondi" },
    { pincode: "601204", area: "Ponneri" },
    { pincode: "601102", area: "Uthukottai" }
  ],
  Tiruvannamalai: [
    { pincode: "606601", area: "Tiruvannamalai Town" },
    { pincode: "606603", area: "Tiruvannamalai East" },
    { pincode: "606701", area: "Arani" },
    { pincode: "606803", area: "Polur" },
    { pincode: "604407", area: "Cheyyar" },
    { pincode: "604408", area: "Vandavasi" }
  ],
  Tiruvarur: [
    { pincode: "610001", area: "Tiruvarur Town" },
    { pincode: "610101", area: "Mannargudi" },
    { pincode: "610203", area: "Nannilam" },
    { pincode: "614704", area: "Thiruthuraipoondi" },
    { pincode: "614404", area: "Needamangalam" }
  ],
  Vellore: [
    { pincode: "632001", area: "Vellore Town" },
    { pincode: "632004", area: "Vellore Fort" },
    { pincode: "632006", area: "Katpadi" },
    { pincode: "632602", area: "Gudiyatham" },
    { pincode: "632301", area: "Anaicut" }
  ],
  Viluppuram: [
    { pincode: "605602", area: "Viluppuram Town" },
    { pincode: "605601", area: "Viluppuram East" },
    { pincode: "604001", area: "Tindivanam" },
    { pincode: "604202", area: "Gingee" },
    { pincode: "605107", area: "Vanur" },
    { pincode: "605652", area: "Vikravandi" }
  ],
  Virudhunagar: [
    { pincode: "626001", area: "Virudhunagar Town" },
    { pincode: "626117", area: "Sivakasi" },
    { pincode: "626203", area: "Sattur" },
    { pincode: "626108", area: "Rajapalayam" },
    { pincode: "626101", area: "Aruppukkottai" },
    { pincode: "626125", area: "Srivilliputhur" }
  ]
};

export const DISTRICTS = Object.keys(DISTRICT_PINCODE_DATA).sort();

export const getPincodesForDistrict = (district) => DISTRICT_PINCODE_DATA[district] || [];

export default DISTRICT_PINCODE_DATA;