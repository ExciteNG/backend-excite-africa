var refferals = []
let profit = 1
let max_referral_count = 10

const add_user = (person) => {
    const new_user = 'jony'
    refferals.push(person)
    if (refferals.length >= max_referral_count){
        profit++
        max_referral_count = max_referral_count + 10
        console.log(max_referral_count);
        console.log(profit);
    }
    console.log(refferals);
    return profit
}

add_user('james')
