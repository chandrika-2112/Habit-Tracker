const Habit = require('../models/habit.js');

module.exports.load = async function (request, response) {
    try {
        const habits = await Habit.find();
        return response.render('home', { habit_list: habits });

    } catch (err) {
        console.log("Error in fetching habits from DB");
        return;
    }

}

// This function helps in adding a habit in list.
module.exports.add = async function (request, response) {
    request.body.record_tracker = {};
    request.body.user = "AnyUser";
    console.log(request.body);
    try {
        const newhabit = await Habit.create(request.body)
        console.log(newhabit)
        return response.redirect("back");

    } catch (err) {
        console.log("Error in creatin habits from DB", err);
        return;
    }

}

// This function helps in deleting a habit from list.
module.exports.delete = async function (request, response) {
    let id = request.query.id;
    try {
        const habits = await Habit.findByIdAndDelete(id);
        return response.redirect('back');

    } catch (err) {
        console.log("Error in fetching habits from DB", err);
        return;
    }

}

// Finds a habit by id given in query params and renders it
module.exports.viewhabit = async function (request, response) {
    let id = request.query.id;
    try {
        const habit = await Habit.findById(id);
        response.render("habit.ejs", { "habit": habit });

    } catch (err) {
        console.log("Error in fetching habits from DB", err);
        return;
    }

}

// Finds a habit by id given in query params and returns it's json object
module.exports.fetchhabit = async function (request, response) {
    let id = request.query.id;
    try {
        const habit = await Habit.findById(id);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(habit));

    } catch (err) {
        console.log("Error in fetching habits from DB", err);
        return;
    }
}

// first find an element in database using id
module.exports.updateDates = async function (request, response) {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    //  Then add/update the date in map then finally update map
    try {
        const habit = await Habit.findById(id);
        const r_t = habit.record_tracker;
        if (r_t) {
            if (date in r_t) {
                r_t[date] = value;
            }
            else {
                r_t.set(date, value);
            }
            const updatedHabit = await Habit.findByIdAndUpdate(id, { $set: { record_tracker: r_t } })
            updatedHabit.save()
            return response.end('{ "status":"success"}');

        }
        else {
            let data_to_update = {
                [date]: value
            }
            const updatedHabit = await Habit.findByIdAndUpdate(id, { $set: { record_tracker: data_to_update } })
            console.log(updatedHabit.record_tracker)
            return response.end('{ "status":"success"}');
        }

    } catch (err) {
        console.log("Error in fetching habits from DB", err);
        return response.end('{ "status":"failed"}');
    }

}