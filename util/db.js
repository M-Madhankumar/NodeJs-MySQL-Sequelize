const Sequelize = require("sequelize");
const db = {};

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,     
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
  };

const sequelize = new Sequelize("movieRating","root","welcome-123", {
    host: 'localhost',
    dialect: 'mysql',   //database you are connecting to
    operatorsAliases: false,    //String based operator alias. Pass object to limit set of aliased operators
    freezeTableName : true, //prevent sequelize from pluralizing table names
    pool: {
        max: 5, //Maximum number of connection in pool
        min: 0, //Minimum number of connection in pool
        acquire: 30000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //The maximum time, in milliseconds, that a connection can be idle before being released.
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;