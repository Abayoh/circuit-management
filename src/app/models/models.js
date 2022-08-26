const capacityTypes = {
  stm1: 'STM1',
  stm4: 'STM4',
  stm16: 'STM16',
  stm64: 'STM64',
  GE_1: '1GE',
  GE_10: '10GE',
  GE_100: '100GE',
};

const circuits = [
  // customer 1 starts
  {
    _id: 'cir3',
    name: 'MON-TEL_1S/0001',
    customerId: 'cus1',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir4',
    name: 'LIS-MON_16S/0001',
    customerId: 'cus1',
    capacity: 'STM16',
    cost: 7500,
  },
  {
    _id: 'cir5',
    name: 'MON-TEL_1S/0002',
    customerId: 'cus1',
    capacity: 'STM1',
    cost: 5500,
  },
  {
    _id: 'cir6',
    name: 'ACC-MON_4S/0002',
    customerId: 'cus1',
    capacity: 'STM4',
    cost: 2500,
  },
  {
    _id: 'cir7',
    name: 'MON-TEL_16S/0001',
    customerId: 'cus1',
    capacity: 'STM16',
    cost: 3500,
  },
  // customer 1 ends

  // Customer 2 starts
  {
    _id: 'cir8',
    name: 'MON-TEL_1S/0001',
    customerId: 'cus2',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir9',
    name: 'ACC-MON_4S/0001',
    customerId: 'cus2',
    capacity: 'STM4',
    cost: 5000,
  },
  {
    _id: 'cir10',
    name: 'MON-TEL_16S/0001',
    customerId: 'cus2',
    capacity: 'STM16',
    cost: 6500,
  },
  {
    _id: 'cir11',
    name: 'MON-TEL_4S/0001',
    customerId: 'cus2',
    capacity: 'STM4',
    cost: 3000,
  },
  {
    _id: 'cir12',
    name: 'LIS-MON_16S/0001',
    customerId: 'cus2',
    capacity: 'STM16',
    cost: 2500,
  },
  // customer 2 ends

  // customer 3 starts
  {
    _id: 'cir13',
    name: 'MON-TEL_4S/0002',
    customerId: 'cus3',
    capacity: 'STM2',
    cost: 4200,
  },
  {
    _id: 'cir14',
    name: 'MON-TEL_1S/0003',
    customerId: 'cus3',
    capacity: 'STM1',
    cost: 1500,
  },
  {
    _id: 'cir15',
    name: 'MON-TEL_16S/0003',
    customerId: 'cus3',
    capacity: 'STM1',
    cost: 7500,
  },
  {
    _id: 'cir16',
    name: 'LIS-MON_16S/0001',
    customerId: 'cus3',
    capacity: 'STM16',
    cost: 8500,
  },
  {
    _id: 'cir17',
    name: 'ACC-MON_4S/0003',
    customerId: 'cus3',
    capacity: 'STM4',
    cost: 3500,
  },
  // customer 3 ends

  // customer 4 starts
  {
    _id: 'cir18',
    name: 'ACC-MON_10GE/0002',
    customerId: 'cus4',
    capacity: '10GE',
    cost: 1500,
  },
  {
    _id: 'cir19',
    name: 'MON-TEL_16S/0004',
    customerId: 'cus4',
    capacity: 'STM16',
    cost: 6100,
  },
  {
    _id: 'cir20',
    name: 'MON-TEL_10GE/0005',
    customerId: 'cus4',
    capacity: '10GE',
    cost: 1500,
  },
  {
    _id: 'cir21',
    name: 'MON-TEL_16S/0002',
    customerId: 'cus4',
    capacity: 'STM16',
    cost: 9500,
  },
  {
    _id: 'cir22',
    name: 'LIS-MON_1GE/0003',
    customerId: 'cus4',
    capacity: '1GE',
    cost: 1500,
  },

  // customer 4 ends

  // customer 5 starts
  {
    _id: 'cir23',
    name: 'LIS-MON_10GE/0003',
    customerId: 'cus5',
    capacity: '10GE',
    cost: 1500,
  },
  {
    _id: 'cir24',
    name: 'LIS-MON_1GE/0001',
    customerId: 'cus5',
    capacity: '1GE',
    cost: 5100,
  },
  {
    _id: 'cir25',
    name: 'LIS-MON_16S/0005',
    customerId: 'cus5',
    capacity: 'STM16',
    cost: 1100,
  },
  {
    _id: 'cir26',
    name: 'LIS-MON_10GE/0002',
    customerId: 'cus5',
    capacity: '10GE',
    cost: 1500,
  },
  {
    _id: 'cir27',
    name: 'LIS-MON_1GE/0002',
    customerId: 'cus5',
    capacity: '1GE',
    cost: 1500,
  },

  // customer 5 ends

  // customer 6 starts
  {
    _id: 'cir28',
    name: 'ACC-MON_1S/0001',
    customerId: 'cus6',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir29',
    name: 'ACC-MON_1S/0002',
    customerId: 'cus6',
    capacity: 'STM1',
    cost: 9500,
  },
  {
    _id: 'cir30',
    name: 'LIS-MON_1S/0001',
    customerId: 'cus6',
    capacity: 'STM1',
    cost: 1500,
  },
  {
    _id: 'cir31',
    name: 'ACC-MON_4S/0001',
    customerId: 'cus6',
    capacity: 'STM4',
    cost: 2500,
  },
  {
    _id: 'cir32',
    name: 'MON-TEL_1S/0001',
    customerId: 'cus6',
    capacity: 'STM1',
    cost: 3500,
  },

  // customer 6 ends

  // customer 7 starts
  {
    _id: 'cir33',
    name: 'ACC-MON_1S/0001',
    customerId: 'cus7',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir34',
    name: 'ACC-MON_1S/0002',
    customerId: 'cus7',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir35',
    name: 'ACC-MON_16S/0001',
    customerId: 'cus7',
    capacity: 'STM16',
    cost: 9500,
  },
  {
    _id: 'cir36',
    name: 'LIS-MON_1S/0001',
    customerId: 'cus7',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir37',
    name: 'ACC-MON_4S/0001',
    customerId: 'cus7',
    capacity: 'STM4',
    cost: 2500,
  },

  // customer 7 ends

  // End
  {
    _id: 'cir1',
    name: 'MON-TEL_1S/0002',
    customerId: 'cus2',
    capacity: 'STM1',
    cost: 4000,
  },
  {
    _id: 'cir2',
    customerId: 'cus1',
    name: 'MON-TEL_4S/0003',
    capacity: 'STM4',
    cost: 4500,
  },
  {
    _id: 'cir3',
    customerId: 'cus3',
    name: 'MON-TEL_10GE/0002',
    capacity: 'STM4',
    cost: 4500,
  },
  {
    _id: 'cir5',
    customerId: 'cus5',
    name: 'MON-TEL_1GE/0002',
    capacity: '1GE',
    cost: 4500,
  },
  {
    _id: 'cir6',
    customerId: 'cus6',
    name: 'MON-TEL_10GE/0002',
    capacity: 'STM16',
    cost: 4500,
  },
  {
    _id: 'cir7',
    customerId: 'cus7',
    name: 'MON-TEL_16S/0004',
    capacity: 'STM16',
    cost: 4500,
  },
];

const customers = [
  {
    _id: 'cus1',
    name: 'Electro Shock',
    type: 'regular',
    address: {
      address1: 'Jamica Road',
      street: 'UN Drive',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
  {
    _id: 'cus2',
    name: 'PowerNet',
    type: 'regular',
    address: {
      address1: 'Default Billing',
      street: '12 Street',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
  {
    _id: 'cus3',
    name: 'ConnectLiberia',
    type: 'regular',
    address: {
      address1: '2nd Floor, CenterPoint Building',
      street: '18 Street',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
  {
    _id: 'cus4',
    name: 'TeliCell',
    type: 'regular',
    address: {
      address1: 'Tubman Boulevard, Opposite EPA',
      street: '3rd street',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
  {
    _id: 'cus5',
    name: 'Orange Liberia',
    type: 'shareholder',
    address: {
      address1: 'Orange Libaria',
      street: 'Bye Pass',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },

  {
    _id: 'cus6',
    name: 'MTN LoneStar',
    type: 'shareholder',
    address: {
      address1: 'MTN LoneStar, Congo Town',
      street: 'Tubman Boulevard',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
  {
    _id: 'cus7',
    name: 'LTC Mobile',
    type: 'shareholder',
    address: {
      address1: 'Libtelco Compound',
      street: 'lynch Street',
      city: 'Monrovia',
      county: 'Montserrado',
    },
    contacts: '+231886255993',
  },
];

const users = [
  {
    _id: 'usr1',
    name: 'abayoh',
    email: 'abayoh@ccl.com.lr',
    role: ['admin'],
  },
  {
    _id: 'usr1',
    name: 'jbrown',
    email: 'jbrown@ccl.com.lr',
    role: ['user'],
  },
  {
    _id: 'usr1',
    name: 'abayoh',
    email: 'nkevin@ccl.com.lr',
    role: ['user'],
  },
];

const payments = [
  {
    _id: 'pym1',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  // curcuit 1 starts
  {
    _id: 'pym8',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1648684800000,
    },
    balance: 0,
    dateDeposited: '1643702400000',
  },
  {
    _id: 'pym9',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },

  {
    _id: 'pym10',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },

  {
    _id: 'pym11',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym11',
    amount: 4000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // circuit 1 ends

  // circuit 8 starts
  {
    _id: 'pym12',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym13',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },

  {
    _id: 'pym14',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym15',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym16',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym17',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir8',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },

  // circuit 8 ends

  // circuit 9  starts
  {
    _id: 'pym18',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },

  {
    _id: 'pym19',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },

  {
    _id: 'pym20',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym21',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym22',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },

  {
    _id: 'pym23',
    amount: 5000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir9',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // circuti 9 ends

  // circuit 10 starts
  {
    _id: 'pym24',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym25',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym26',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym27',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym28',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym29',
    amount: 6500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir10',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },

  // circuit 10 ends
  // circuit 11 starts
  {
    _id: 'pym30',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym31',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym32',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym33',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym34',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym35',
    amount: 3000,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir11',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },

  // circuit 12 starts
  {
    _id: 'pym36',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym37',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym38',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym39',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym40',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym41',
    amount: 2500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir12',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // circuit 12 ends

  // customer 3
  // circuit 13 starts
  {
    _id: 'pym41',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym42',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym43',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym44',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym45',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym46',
    amount: 4200,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir13',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // payment 13 ends

  // payment 14 starts
  {
    _id: 'pym47',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym48',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym49',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },

  {
    _id: 'pym50',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym51',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym52',
    amount: 1500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir14',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // payment 14 ends

  // payment 15 starts
  {
    _id: 'pym53',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym54',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym55',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym56',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym57',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },

  {
    _id: 'pym58',
    amount: 7500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir15',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // payment 15 ends

  // payment 16 starts
  {
    _id: 'pym59',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym60',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym61',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym62',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym63',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym64',
    amount: 8500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir16',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1656572400000,
    },
    balance: 0,
    dateDeposited: 1654066800000,
  },
  // payment 16 ends

  // payment 17 starts
  {
    _id: 'pym65',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1641024000000,
      to: 1643616000000,
    },
    balance: 0,
    dateDeposited: 1641024000000,
  },
  {
    _id: 'pym66',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1643702400000,
      to: 1646035200000,
    },
    balance: 0,
    dateDeposited: 1643702400000,
  },
  {
    _id: 'pym67',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1646121600000,
      to: 1648710000000,
    },
    balance: 0,
    dateDeposited: 1646121600000,
  },
  {
    _id: 'pym68',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1648796400000,
      to: 1651302000000,
    },
    balance: 0,
    dateDeposited: 1648796400000,
  },
  {
    _id: 'pym69',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: false,
    billed: {
      from: 1651388400000,
      to: 1653980400000,
    },
    balance: 0,
    dateDeposited: 1651388400000,
  },
  {
    _id: 'pym70',
    amount: 3500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus3',
    circuitId: 'cir17',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1654066800000,
      to: 1654066800000,
    },
    balance: 0,
    dateDeposited: 1656572400000,
  },
  // payment 17 ends
  {
    _id: 'pym2',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'Electro Shock',
    customerId: 'cus1',
    circuitId: 'cir2',
    cheQueImgUrl: '',
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: 5000,
    dateDeposited: 1641168000000,
  },
  {
    _id: 'pym3',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'TeliCell',
    customerId: 'cus4',
    circuitId: 'cir4',
    cheQueImgUrl: '',
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: 5000,
    dateDeposited: 1641168000000,
  },
  {
    _id: 'pym4',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'Connect Liberia',
    customerId: 'cus3',
    circuitId: 'cir3',
    cheQueImgUrl: '',
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: 5000,
    dateDeposited: 1641168000000,
  },
  {
    _id: 'pym5',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'Orange Liberia',
    customerId: 'cus5',
    circuitId: 'cir5',
    cheQueImgUrl: '',
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: 5000,
    dateDeposited: 1641168000000,
  },
  {
    _id: 'pym6',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'MTN Lonestar Cell',
    customerId: 'cus6',
    circuitId: 'cir6',
    cheQueImgUrl: '',
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: 5000,
    dateDeposited: 1641168000000,
  },
  {
    _id: 'pym7',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'LTC Mobile',
    customerId: 'cus7',
    circuitId: 'cir7',
    cheQueImgUrl: '',
    current: true,
    billed: {
      from: 1640995200,
      to: 1648684800000,
    },
    balance: {
      amount: 5000,
      clear: false,
    },
    dateDeposited: 1641168000000,
  },
];

const logs = [
  {
    userId: 'usr1',
    action: 'edit:payment',
    date: '1648684800000',
    dataType: 'payment',
    old: {},
    new: {},
  },
];

const getPaymentCircuidId = (id) => {
};
getPaymentCircuidId('cir17');
