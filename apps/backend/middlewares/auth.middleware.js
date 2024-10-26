const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const SECRET_KEY = process.env.SECRET_KEY

const adminAuthMiddleware = async (req, res, next) => {
  if (req.url === '/login' || req.url === '/register') return next();

  const registered = await Admin.count()
  // if (!registered) return next('Empty user')

  try {
    req.user = {username:null, verified:false}
    console.log(req.headers)
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(typeof bearerHeader!=='undefined') {
      const bearerToken = bearerHeader.split(' ')[1]
      jwt.verify(bearerToken, SECRET_KEY, async function (err,data){
        console.log(data)
        if(! (err && typeof data=== 'undefined')) {
          const admin = await Admin.findOne({email: data.email})
          if (!admin) {
            return next('User does not exist')
          }
          req.user = admin
          next()
        }
      })
    }
  } catch (e) {
    console.error(e)
    return next('Invalid credentials')
  }
}

module.exports = adminAuthMiddleware
