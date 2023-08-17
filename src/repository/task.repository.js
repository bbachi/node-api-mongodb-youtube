const { Task } = require('../model/task.model');

class TaskRepository { 

    constructor() {}

    getTasks() {
        return Task.find({})
    }

    createTask(task) {
        return Task.create(task)
    }

    deleteTask(id) {
        return Task.findByIdAndDelete({_id: id});
    }

    updateTask(id, task) {
        return Task.findByIdAndUpdate({_id: id}, {status: task.status, updatedBy: task.updatedBy})
    }
}

module.exports = new TaskRepository()