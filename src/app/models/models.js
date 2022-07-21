export const capacityTypes = {
  stm1: 'STM1',
  stm4: 'STM4',
  stm16: 'STM16',
  stm64: 'STM64',
  GE_1: '1GE',
  GE_10: '10GE',
  GE_100: '100GE',
};

export const circuits = [
  {
    _id: 'cir1',
    name: 'MON-TEL_1S/0001',
    customerId: 'cus2',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir2',
    customerId: 'cus1',
    name: 'MON-TEL_1S/0002',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir3',
    customerId: 'cus3',
    name: 'MON-TEL_4S/0001',
    capacity: 'STM4',
    cost: 4500,
  },
  {
    
    _id: 'cir5',
    customerId: 'cus5',
    name: 'MON-TEL_16S/0002',
    capacity: 'STM1',
    cost: 4500,
  },
  {
    _id: 'cir6',
    customerId: 'cus6',
    name: 'MON-TEL_16S/0002',
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

export const customers = [
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

export const users = [
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

export const payments = [
  {
    _id: 'pym1',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'PowerNet',
    customerId: 'cus2',
    circuitId: 'cir1',
    cheQueImgUrl: '',
    billed: {
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
  },
  {
    _id: 'pym2',
    amount: 4500,
    receiveBy: 'Josehpus Brown',
    customerName: 'Electro Shock',
    customerId: 'cus1',
    circuitId: 'cir2',
    cheQueImgUrl: '',
    billed: {
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
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
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
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
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
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
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
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
      from: '1640995200',
      to: '1648684800000',
    },
    balance: 5000,
    dateDeposited: '1641168000000',
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
      from: '1640995200',
      to: '1648684800000',
    },
    balance: {
      amount: 5000,
      clear: false,
    },
    dateDeposited: '1641168000000',
  },
];

export const logs = [
  {
    userId: 'usr1',
    action: 'edit:payment',
    date: '1648684800000',
    dataType: 'payment',
    old: {},
    new: {},
  },
];
