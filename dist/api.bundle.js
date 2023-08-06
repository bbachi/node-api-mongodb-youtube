/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\")\nconst envFilePath =   true \n        ? `./environments/.env.${\"development\"}` \n        : undefined\n__webpack_require__(/*! dotenv */ \"dotenv\").config({path: envFilePath})\n\nconst todos = __webpack_require__(/*! ./src/routes/todos */ \"./src/routes/todos.js\")\nconst taskDetail = __webpack_require__(/*! ./src/routes/task_detail */ \"./src/routes/task_detail.js\")\nconst taskHistory = __webpack_require__(/*! ./src/routes/task_history */ \"./src/routes/task_history.js\")\nconst logger = __webpack_require__(/*! ./src/logger/api.logger */ \"./src/logger/api.logger.js\");\n\nconst app = express();\n\napp.use(bodyParser.urlencoded({ extended: false }));\napp.use(bodyParser.json());\n\nconst port = \"4000\";\n\napp.use('/todos', todos);\napp.use('/todos/history', taskHistory);\napp.use('/todos/detail', taskDetail);\n\napp.get('/', (req, res) => res.sendFile(process.cwd() + '/dist/index.html'))\n\n// handling undefined  routes, always define at the end\napp.get(\"*\", (req, res) => {\n    logger.info(\"Handling undefined routes!!!\");\n    res.send(\"Please define this route !!!\");\n})\n\n\napp.listen(port, () => logger.info(`Express Server listening on port ${port} in Environment ${\"LOCAL\"}`))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/config/db.config.js":
/*!*********************************!*\
  !*** ./src/config/db.config.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst logger = __webpack_require__(/*! ../logger/api.logger */ \"./src/logger/api.logger.js\");\n\nconst connect = () => {\n\n    const url = \"mongodb://127.0.0.1:27017\" || false;\n\n    mongoose.connect(url, {\n        useNewUrlParser: true,\n        //useFindAndModify: true,\n        //useUnifiedTopology: true,\n        //useCreateIndex: true,\n    })\n\n    mongoose.connection.once(\"open\", async () => {\n        logger.info(\"Connected to database\");\n    });\n      \n    mongoose.connection.on(\"error\", (err) => {\n        logger.info(\"Error connecting to database  \", err);\n    });\n}\n\nconst disconnect = () => {\n\n    if (!mongoose.connection) {\n        return;\n      }\n      \n    mongoose.disconnect();\n  \n    mongoose.once(\"close\", async () => logger.info(\"Diconnected  to database\"));\n\n}\n\nmodule.exports = {\n    connect,\n    disconnect\n}\n\n//# sourceURL=webpack:///./src/config/db.config.js?");

/***/ }),

/***/ "./src/controller/task-detail.controller.js":
/*!**************************************************!*\
  !*** ./src/controller/task-detail.controller.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskDetailService = __webpack_require__(/*! ../service/task-detail.service */ \"./src/service/task-detail.service.js\");\n\nclass TaskDetailController {\n\n    getDetail(id) {\n        return taskDetailService.getDetail(id);\n    }\n\n    editTask(id, task) {\n        return taskDetailService.editTask(id, task);\n    }\n\n    removeTask(id) {\n        return taskDetailService.removeTask(id);\n    }\n}\n\nmodule.exports = new TaskDetailController()\n\n//# sourceURL=webpack:///./src/controller/task-detail.controller.js?");

/***/ }),

/***/ "./src/controller/task-history.controller.js":
/*!***************************************************!*\
  !*** ./src/controller/task-history.controller.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskHistoryService = __webpack_require__(/*! ../service/task-history.service */ \"./src/service/task-history.service.js\")\n\nclass TaskHistoryController {\n\n    listTasks(userName) {\n        return taskHistoryService.listTasks(userName)\n    }\n\n    archiveTask(id) {\n        return taskHistoryService.archiveTask(id)\n    }\n}\n\nmodule.exports = new TaskHistoryController()\n\n//# sourceURL=webpack:///./src/controller/task-history.controller.js?");

/***/ }),

/***/ "./src/controller/task.controller.js":
/*!*******************************************!*\
  !*** ./src/controller/task.controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskService = __webpack_require__(/*! ../service/task.service */ \"./src/service/task.service.js\");\n\nclass TaskController {\n\n    getTasks() {\n        return taskService.getTasks();\n    }\n\n    createTask(task) {\n        return taskService.createTask(task);\n    }\n\n    deleteTask(id) {\n        return taskService.deleteTask(id);\n    }\n\n    updateTask(id, task) {\n        return taskService.updateTask(id, task);\n    }\n}\n\nmodule.exports = new TaskController();\n\n//# sourceURL=webpack:///./src/controller/task.controller.js?");

/***/ }),

/***/ "./src/logger/api.logger.js":
/*!**********************************!*\
  !*** ./src/logger/api.logger.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const pino = __webpack_require__(/*! pino */ \"pino\");\nconst transport = pino.transport({\n    target: 'pino-pretty',\n    options: { destination: 1 } // use 2 for stderr\n})\nconst logger = pino(transport);\n\nclass APILogger {\n\n    info(message) {\n        logger.info(`API : ${message}`)\n    }\n\n    debug(message, data) {\n        logger.info(`API : ${message} Details ${JSON.stringify(data)}`)\n    }\n\n    error(message) {\n        logger.error(`API Error : ${message}`)\n    }\n}\n\nmodule.exports = new APILogger();\n\n//# sourceURL=webpack:///./src/logger/api.logger.js?");

/***/ }),

/***/ "./src/model/task.model.js":
/*!*********************************!*\
  !*** ./src/model/task.model.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst taskSchema = new mongoose.Schema(\n        {   task: 'string', \n            assignee: 'string', \n            status: 'string', \n            description: 'string',\n            createDate: 'date', \n            updatedDate: 'date', \n            createdBy: 'string', \n            updatedBy: 'string' },\n            { timestamps: \n                { \n                    createDate: 'created_at', \n                    updatedDate: 'updated_at'\n                }\n        });\n\nconst Task = mongoose.model('tasks', taskSchema);\n\nmodule.exports = {\n    Task\n}\n\n//# sourceURL=webpack:///./src/model/task.model.js?");

/***/ }),

/***/ "./src/repository/task-detail.repository.js":
/*!**************************************************!*\
  !*** ./src/repository/task-detail.repository.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { Task } = __webpack_require__(/*! ../model/task.model */ \"./src/model/task.model.js\");\n\nclass TaskDetailRepository {\n\n    getDetail(id) {\n        return Task.find({_id: id});\n    }\n\n    editTask(id, task) {\n        return Task.findByIdAndUpdate({_id: id}, {status: task.status, updatedBy: task.updatedBy})\n    }\n\n    removeTask(id) {\n        return Task.findByIdAndDelete({_id: id});\n    }\n}\n\nmodule.exports = new TaskDetailRepository()\n\n//# sourceURL=webpack:///./src/repository/task-detail.repository.js?");

/***/ }),

/***/ "./src/repository/task-history.repository.js":
/*!***************************************************!*\
  !*** ./src/repository/task-history.repository.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { Task } = __webpack_require__(/*! ../model/task.model */ \"./src/model/task.model.js\");\n\nclass TaskHistoryRepository {\n\n    listTasks(userName) {\n        return Task.find({createdBy: userName});\n    }\n\n    archiveTask(id) {\n        return Task.findByIdAndUpdate({_id: id}, {status: \"ARCHIVED\"})\n    }\n}\n\nmodule.exports = new TaskHistoryRepository()\n\n//# sourceURL=webpack:///./src/repository/task-history.repository.js?");

/***/ }),

/***/ "./src/repository/task.repository.js":
/*!*******************************************!*\
  !*** ./src/repository/task.repository.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { Task } = __webpack_require__(/*! ../model/task.model */ \"./src/model/task.model.js\");\nconst { connect } = __webpack_require__(/*! ../config/db.config */ \"./src/config/db.config.js\");\n\nclass TaskRepository { \n\n    constructor() {\n        connect();\n    }\n\n    getTasks() {\n        return Task.find({})\n    }\n\n    createTask(task) {\n        return Task.create(task)\n    }\n\n    deleteTask(id) {\n        return Task.findByIdAndDelete({_id: id});\n    }\n\n    updateTask(id, task) {\n        return Task.findByIdAndUpdate({_id: id}, {status: task.status, updatedBy: task.updatedBy})\n    }\n}\n\nmodule.exports = new TaskRepository()\n\n//# sourceURL=webpack:///./src/repository/task.repository.js?");

/***/ }),

/***/ "./src/routes/task_detail.js":
/*!***********************************!*\
  !*** ./src/routes/task_detail.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst taskDetailController = __webpack_require__(/*! ../controller/task-detail.controller */ \"./src/controller/task-detail.controller.js\")\nconst logger = __webpack_require__(/*! ../logger/api.logger */ \"./src/logger/api.logger.js\")\n\n\nrouter.route('/:id')\n    .get(async (req, res) => {\n        const result = await taskDetailController.getDetail(req.params.id);\n        res.json(result);\n    })\n    .delete(async (req, res) => {\n        const result = await taskDetailController.removeTask(req.params.id);\n        res.json(result);\n    })\n    .put(async (req, res) => {\n        const result = await taskDetailController.editTask(req.params.id, req.body);\n        res.json(result);\n    })\n\n// handling default  routes\nrouter.get(\"/\", (req, res) => {\n    logger.info(\"Handling default routes!!!\");\n    res.send(\"Tasks detail works\");\n})\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/task_detail.js?");

/***/ }),

/***/ "./src/routes/task_history.js":
/*!************************************!*\
  !*** ./src/routes/task_history.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst taskHistoryController = __webpack_require__(/*! ../controller/task-history.controller */ \"./src/controller/task-history.controller.js\")\nconst logger = __webpack_require__(/*! ../logger/api.logger */ \"./src/logger/api.logger.js\")\n\nrouter.route('/:id')\n    .get(async (req, res) => {\n        const result = await taskHistoryController.listTasks(req.params.id);\n        res.json(result);\n    })\n    .delete(async (req, res) => {\n        const result = await taskHistoryController.archiveTask(req.params.id);\n        res.json(result);\n    })\n\n// handling default  routes\nrouter.get(\"/\", (req, res) => {\n    logger.info(\"Handling default routes!!!\");\n    res.send(\"Tasks history works\");\n})\n\nmodule.exports = router;\n\n\n\n\n//# sourceURL=webpack:///./src/routes/task_history.js?");

/***/ }),

/***/ "./src/routes/todos.js":
/*!*****************************!*\
  !*** ./src/routes/todos.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst taskController = __webpack_require__(/*! ../controller/task.controller */ \"./src/controller/task.controller.js\")\nconst logger = __webpack_require__(/*! ../logger/api.logger */ \"./src/logger/api.logger.js\")\n\n\nrouter.get('/tasks', async (req, res) => {\n    const tasks = await taskController.getTasks();\n    res.json(tasks);\n})\n\nrouter.post('/task', async (req, res) => {\n    logger.debug('req.body' , req.body)\n    const data = await taskController.createTask(req.body);\n    res.json(data);\n})\n\nrouter.put('/task/:id', async (req, res) => {\n    logger.debug('id  ', req.params.id);\n    logger.debug('req.body ', req.body)\n    const result = await taskController.updateTask(req.params.id, req.body);\n    res.json(result);\n})\n\nrouter.delete('/task/', async (req, res) => {\n    const result = await taskController.deleteTask(req.query.id);\n    res.json(result);\n})\n\n// handling default  routes\nrouter.get(\"/\", (req, res) => {\n    logger.info(\"Handling undefined routes!!!\");\n    res.send(\"Tasks route works\");\n})\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/todos.js?");

/***/ }),

/***/ "./src/service/task-detail.service.js":
/*!********************************************!*\
  !*** ./src/service/task-detail.service.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskDetailRepository = __webpack_require__(/*! ../repository/task-detail.repository */ \"./src/repository/task-detail.repository.js\")\n\nclass TaskDetailService {\n\n    getDetail(id) {\n        return taskDetailRepository.getDetail(id);\n    }\n\n    editTask(id, task) {\n        return taskDetailRepository.editTask(id, task);\n    }\n\n    removeTask(id) {\n        return taskDetailRepository.removeTask(id);\n    }\n}\n\nmodule.exports = new TaskDetailService();\n\n//# sourceURL=webpack:///./src/service/task-detail.service.js?");

/***/ }),

/***/ "./src/service/task-history.service.js":
/*!*********************************************!*\
  !*** ./src/service/task-history.service.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskHistoryRepository = __webpack_require__(/*! ../repository/task-history.repository */ \"./src/repository/task-history.repository.js\");\n\nclass TaskHistoryService {\n\n    listTasks(userName) {\n        return taskHistoryRepository.listTasks(userName)\n    }\n\n    archiveTask(id) {\n        return taskHistoryRepository.archiveTask(id)\n    }\n\n}\n\nmodule.exports = new TaskHistoryService();\n\n//# sourceURL=webpack:///./src/service/task-history.service.js?");

/***/ }),

/***/ "./src/service/task.service.js":
/*!*************************************!*\
  !*** ./src/service/task.service.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const taskRepository = __webpack_require__(/*! ../repository/task.repository */ \"./src/repository/task.repository.js\");\n\nclass TaskService {\n\n    getTasks() {\n        return taskRepository.getTasks();\n    }\n\n    createTask(task) {\n        return taskRepository.createTask(task);\n    }\n\n    deleteTask(id) {\n        return taskRepository.deleteTask(id);\n    }\n\n    updateTask(id, task) {\n        return taskRepository.updateTask(id, task);\n    }\n}\n\nmodule.exports = new TaskService();\n\n//# sourceURL=webpack:///./src/service/task.service.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pino\");\n\n//# sourceURL=webpack:///external_%22pino%22?");

/***/ })

/******/ });