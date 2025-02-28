export const APIURL = "http://127.0.0.1:3030/api"



export const navlinks = [
    {
        lable: "Add a toilet",
        route: "/addToilet"
    },
    {
        lable: "About",
        route: "/about"
    },
    {
        lable: "Feedback",
        route: ""
    },
    {
        lable: "Contact",
        route: "/contact"
    },
]

export const sidebarItems = [
    {
        lable: "Filter",
        icon: "",
        click: "Filter"
    },
    {
        lable: "Add a toilet",
        icon: "",
        click: "Add"
    },
    {
        lable: "Panic",
        icon: "",
        click: "Find"
    },
    {
        lable: "Show List View",
        lable2: "Hide List View",
        icon: "",
        click: "List"
    },
]


// export const dummyToilets: Toilet[] = [
//     {
//         location: {
//             type: "Point",
//             coordinates: [102, 0.5]
//         },
//         features: {
//             women: "yes",
//             men: "no",
//             accessible: "dontknow",
//             children: "no",
//             free: "yes",
//             fee: 0,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c33ea87814171f29706",
//         name: "Toilet 1",
//         description: "Description for Toilet 1",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: true,
//         isRemoved: false,
//         votesCount: 5,
//         isFromUser: true,
//         keyword: "clean",
//         users: ["user1"],
//         removeMsg: "Not removed",
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [103, 1.5]
//         },
//         features: {
//             women: "no",
//             men: "yes",
//             accessible: "dontknow",
//             children: "yes",
//             free: "no",
//             fee: 2,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c34ea87814171f29707",
//         name: "Toilet 2",
//         description: "Description for Toilet 2",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: false,
//         isRemoved: false,
//         votesCount: 10,
//         isFromUser: true,
//         keyword: "busy",
//         users: ["user2"],
//         removeMsg: "Not removed",
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [120.153576, 30.287459]
//         },
//         features: {
//             women: "yes",
//             men: "yes",
//             accessible: "yes",
//             children: "yes",
//             free: "yes",
//             genderNeutral: "dontknow"
//         },
//         _id: "664b122591ac3fac2a595bbd",
//         name: "Updated Public Toilet",
//         description: "Updated description",
//         lastUpdateTime: "2024-05-20T09:23:53.173Z",
//         openingHours: new Date("2024-05-20T09:23:53.173Z"), // 转换为 Date 对象
//         isOpening: true,
//         isRemoved: false,
//         votesCount: 1,
//         isFromUser: true,
//         users: [
//             "664b0c3e4bbc29fd613b8342",
//             "664b0c3e4bbc29fd613b8342",
//             "664b0c3e4bbc29fd613b8342"
//         ],
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [102, 0.5]
//         },
//         features: {
//             women: "yes",
//             men: "no",
//             accessible: "dontknow",
//             children: "no",
//             free: "yes",
//             fee: 0,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c33ea87814171f29706",
//         name: "Toilet 1",
//         description: "Description for Toilet 1",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: true,
//         isRemoved: false,
//         votesCount: 5,
//         isFromUser: true,
//         keyword: "clean",
//         users: ["user1"],
//         removeMsg: "Not removed",
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [103, 1.5]
//         },
//         features: {
//             women: "no",
//             men: "yes",
//             accessible: "dontknow",
//             children: "yes",
//             free: "no",
//             fee: 2,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c34ea87814171f29707",
//         name: "Toilet 2",
//         description: "Description for Toilet 2",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: false,
//         isRemoved: false,
//         votesCount: 10,
//         isFromUser: true,
//         keyword: "busy",
//         users: ["user2"],
//         removeMsg: "Not removed",
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [120.153576, 30.287459]
//         },
//         features: {
//             women: "yes",
//             men: "yes",
//             accessible: "yes",
//             children: "yes",
//             free: "yes",
//             genderNeutral: "dontknow"
//         },
//         _id: "664b122591ac3fac2a595bbd",
//         name: "Updated Public Toilet",
//         description: "Updated description",
//         lastUpdateTime: "2024-05-20T09:23:53.173Z",
//         openingHours: new Date("2024-05-20T09:23:53.173Z"), // 转换为 Date 对象
//         isOpening: true,
//         isRemoved: false,
//         votesCount: 1,
//         isFromUser: true,
//         users: [
//             "664b0c3e4bbc29fd613b8342",
//             "664b0c3e4bbc29fd613b8342",
//             "664b0c3e4bbc29fd613b8342"
//         ],
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [-122.4191, 37.7751] // 经度, 纬度
//         },
//         features: {
//             women: "yes",
//             men: "no",
//             accessible: "dontknow",
//             children: "no",
//             free: "yes",
//             fee: 0,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c33ea87814171f29706",
//         name: "Toilet 1",
//         description: "Description for Toilet 1",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: true,
//         isRemoved: false,
//         votesCount: 5,
//         isFromUser: true,
//         keyword: "clean",
//         users: ["user1"],
//         removeMsg: "Not removed",
//     },
//     {
//         location: {
//             type: "Point",
//             coordinates: [-122.4196, 37.7748]
//         },
//         features: {
//             women: "no",
//             men: "yes",
//             accessible: "dontknow",
//             children: "yes",
//             free: "no",
//             fee: 2,
//             genderNeutral: "dontknow"
//         },
//         _id: "664b0c34ea87814171f29707",
//         name: "Toilet 2",
//         description: "Description for Toilet 2",
//         lastUpdateTime: "2024-05-20T08:39:15.996Z",
//         openingHours: new Date("2024-05-20T08:39:15.996Z"), // 转换为 Date 对象
//         isOpening: false,
//         isRemoved: false,
//         votesCount: 10,
//         isFromUser: true,
//         keyword: "busy",
//         users: ["user2"],
//         removeMsg: "Not removed",
//     }

// ];

export const checkboxItems = [
    {
        label: "Women",
        key: "women"
    },
    {
        label: "Men",
        key: "men"
    },
    {
        label: "Accessible",
        key: "accessible"
    },
    {
        label: "Children",
        key: "children"
    },
    {
        label: "Free",
        key: "free"
    },
    {
        label: "Gender Neutral",
        key: "genderNeutral"
    }
];

export const aboutPageText = `This is an open source project aim to help you find the neareast toilet.

Imagine someday you are about to shit in your pants, but you have no idea where to go! And you start to search on your map "where is the nearest public toilet?" "oh no😫😫😫 There is no public toilet AT ALL!!" "where is the closest McDonald's??" "Ah! Found it". And you walk 10 minutes to get there. But what you don't know is there is a nearer place you can go to release your stomach JUST BESIDES YOU!!! And this project is to help you avoid this situation.

`



export const addToiletText1 = `Want to Contribute Toilet Data?`
export const addToiletText2 = `A publicly-accessible toilet means any toilet that the public are allowed to access without needing to be a customer.

To add or edit a public toilet you will first need to Log in or Sign Up:
`
export const addToiletText3 = `Important! You must ensure that you are now standing on or nearby a toilet so you can add a toilet`