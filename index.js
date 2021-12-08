function createEmployeeRecord(array){
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(timeDate){
    let splitTimeDate = timeDate.split(' ')
    let dateSplit = splitTimeDate[0]
    let timeSplit = splitTimeDate[1]
    let timeInObj = {
        type: "TimeIn",
        date: dateSplit,
        hour: parseInt(timeSplit)
    }
    this.timeInEvents.push(timeInObj)
    return this
}

const createTimeOutEvent = function(timeDate){
    let splitTimeDate = timeDate.split(' ')
    let dateSplit = splitTimeDate[0]
    let timeSplit = splitTimeDate[1]
    let timeOutObj = {
        type: "TimeOut",
        date: dateSplit,
        hour: parseInt(timeSplit)
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

const hoursWorkedOnDate = function(date){
    let timeOut = this.timeOutEvents.find(e => {
        return e.date === date
    })
    let timeIn = this.timeInEvents.find(e => {
        return e.date === date})
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(date){
    let hours = hoursWorkedOnDate.call(this, date)
    let pay = hours * this.payPerHour
    return parseFloat(pay.toString())
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(e => {
        return e.firstName === firstName
    })
}

const calculatePayroll = function(array){
    return array.reduce((total, e) => {
        return total + allWagesFor.call(e)
    }, 0) 
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

