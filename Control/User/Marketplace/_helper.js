const {UserCurrentSubscription} = require('../Profile/subscriptions')

const getUserSubscription = async (userID)=>{
    const theSubscription = await UserCurrentSubscription(userID)

    console.log(theSubscription)
} 

module.exports = {
    getUserSubscription
}