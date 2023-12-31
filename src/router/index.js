const { Fragment } = require("react");
const { default: Layout, default: MyLayout } = require("../component/MyLayout");
const { default: Login } = require("../page/login");
const { default: Person } = require("../page/person");
const { default: Department } = require("../page/department");
const { default: DepartmentDetail } = require("../page/department/DepartmentDetail");
const { default: Sojourn } = require("../page/sojourn");
const { default: Absence } = require("../page/absence");
const { default: Payment } = require("../page/payment");
const { default: Donation } = require("../page/donation");
const {default: PaymentEventDetail} = require("../page/payment/PaymentEventDetail");
const { default: DonationDetail } = require("../page/donation/DonationDetail");
const { default: Statistic } = require("../page/statistic");

const PublicRoute = [
    {path : "/login", component: Login, layout: Fragment}
]

const PrivateRoute = [
    {path: "/person", component: Person, layout: MyLayout},
    {path : "/department", component: Department, layout: MyLayout},
    {path: "/department/:id", component: DepartmentDetail, layout: MyLayout},
    {path: "/sojourn", component: Sojourn, layout: MyLayout},
    {path: "/absence", component: Absence, layout: MyLayout},
    {path: "/payment", component: Payment, layout: MyLayout},
    {path: "/donation", component: Donation, layout: MyLayout},
    {path: "payment-event-detail/:id", component: PaymentEventDetail, layout: MyLayout},
    {path: "donation-detail/:id", component: DonationDetail, layout: MyLayout},
    {path: "/", component: Statistic, layout: MyLayout},
]


module.exports = {PrivateRoute, PublicRoute};