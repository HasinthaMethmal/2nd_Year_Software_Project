const router = require('express').Router();
const{createCategory,
      updateCommission,
      getCommission,
      createCommission,
      removeCategory
                     } = require("../controllers/admin.controller");
 
router.post("/Addcategory",createCategory);
router.post("/Addcommission",createCommission);
router.patch("/Updatecommission",updateCommission);
router.patch("/Deletecategory",removeCategory);
router.get("/Getcommission",getCommission);


module.exports = router;