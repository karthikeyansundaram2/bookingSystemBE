import index from "./routes/index";
import userRoute from "./routes/userRoute"
import driverRoute from "./routes/driverRoute"
import tripRoute from "./routes/tripRoute"
import tripDetailsRoute from "./routes/tripDetailsRoute"
import paymentRoute from "./routes/paymentRoute"
module.exports = [
    {
        path: "/",
        handler: index
    },
    {
        path: '/user',
        handler: userRoute
    },
    {
        path: '/driver',
        handler: driverRoute
    },
    {
        path: '/trip',
        handler: tripRoute
    },
    {
        path: '/trip-details',
        handler: tripDetailsRoute
    },
    {
        path: '/payment',
        handler: paymentRoute
    }
]