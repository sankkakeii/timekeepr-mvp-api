const connectDB = require('../config/mongo.config.js')
const clientSchema = require('../models/client.scheme.js')
const userSchema = require('../models/user.scheme.js')

const CompanyUserSchemas = new Map([['user', userSchema]])
const ClientSchemas = new Map([['tenant', clientSchema]])

/** Switch to db on same connection pool
 * @return new connection
 */
 const switchDB = async (dbName, dbSchema) => {
  const mongoose = await connectDB()
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, { useCache: true })
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema)
      })
    }
    return db
  }
  throw new Error('err')
}

/**
 * @return model from mongoose
 */
const getDBModel = async (db, modelName) => {
  return db.model(modelName)
}

const initTenants = async () => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas)
  const tenant = await getDBModel(tenantDB, 'tenant')
  // await tenant.deleteMany({})
  const tenantA = await tenant.create({
    name: 'Steve',
    email: 'Steve@example.com',
    password: 'secret',
    companyName: 'Apple',
  })
  const tenantB = await tenant.create({
    name: 'Bill',
    email: 'Bill@example.com',
    password: 'secret',
    companyName: 'Microsoft',
  })
  const tenantC = await tenant.create({
    name: 'Jeff',
    email: 'Jeff@example.com',
    password: 'secret',
    companyName: 'Amazon',
  })
}


// create employees
const initEmployees = async () => {
  const customers = await getAllTenants()
  const createEmployees = customers.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    // await employeeModel.deleteMany({})
    return employeeModel.create({
      employeeId: Math.floor(Math.random() * 10000).toString(),
      name: 'John sims',
      companyName: tenant.companyName,
    })
  })
  const results = await Promise.all(createEmployees)
}


// create employee
const initEmployee = async (name) => {
  const customers = await getAllTenants()
  const createEmployees = customers.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    // await employeeModel.deleteMany({})
    return employeeModel.create({
      employeeId: Math.floor(Math.random() * 10000).toString(),
      name: name,
      companyName: tenant.companyName,
    })
  })
  const results = await Promise.all(createEmployees)
}

// get all tenants from database
const getAllTenants = async () => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas)
  const tenantModel = await getDBModel(tenantDB, 'tenant')
  const tenants = await tenantModel.find({})
  return tenants
}

// get single tenant from database 
const getTenant = async (name) => {
  const tenantDB = await switchDB('AppTenants', TenantSchemas)
  const tenantModel = await getDBModel(tenantDB, 'tenant')
  const tenant = await tenantModel.find({companyName: name})
  return tenant
}

// list of employees for each company database
const listAllEmployees = async () => {
  const customers = await getAllTenants()
  const mapCustomers = customers.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    return employeeModel.find({})
  })
  const results = await Promise.all(mapCustomers)
  return results
}

// list single employee by company
const listEmployee = async (name, tenant) => {
  const customers = await getAllTenants()
  const customer = await getTenant(tenant)
  const mapCustomer = customer.map(async (tenant) => {
    const companyDB = await switchDB(tenant.companyName, CompanySchemas)
    const employeeModel = await getDBModel(companyDB, 'employee')
    return employeeModel.find({name: name})
  })
  const results = await Promise.all(mapCustomer)
  return results
}

 module.exports = newMultiTenantDB;
