const express = require("express");
const Account = require("./account-model");

const router = express.Router();

//CRUD OPERATIONS
//CRUD OPERATIONS
//CRUD OPERATIONS
router.get("/", async (req, res) => {
  try {
    const data = await Account.get();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, async (req, res) => {
    res.status(200).json(req.account);
});

router.post("/", checkPayload, async (req, res, next) => {
    try{
        const account = await Account.create(req.body)
        res.status(201).json(account)
    }
    catch (err) {
        next(err)
    }
})

router.put("/:id", checkId, checkUpdate, async (req, res, next) => {
    try{
        const account = await Account.updateAccount(req.params.id, req.body)
        res.status(200).json(account)
    }
    catch (err) {
        next(err)
    }
})




// MIDDLEWARE
// MIDDLEWARE
// MIDDLEWARE
router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

async function checkId(req, res, next) {
    console.log('checking user id')
    try {
      const account = await Account.getById(req.params.id)
      if (account) {
        req.account = account
        console.log(`account id ${req.params.id} found`)
        next()
      } else {
        console.log(`account with id ${req.params.id} not found`)
        res.status(404).json(`account with id ${req.params.id} not found`)
      }
    } catch (error) {
      next(error)
    }
  }

function checkPayload(req, res, next) {
    console.log("checking form")
    req.body.name && req.body.budget ? next() : res.status(400).json({ error: "please provide name and budget" })
}
function checkUpdate(req, res, next) {
    console.log("checking form")
    req.body.name || req.body.budget ? next() : res.status(400).json({ error: "please provide name or budget" })
}

module.exports = router;
