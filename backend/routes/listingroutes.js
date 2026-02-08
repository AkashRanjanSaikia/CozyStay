const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("./middlewares");
const upload = require("../cloudinary");

const {
  getAllListings,
  getListingById,
  createListing,
  myHotels,
  favouriteListing,
  favouriteHotels,
  unfavouriteListing,
  updateListing,
  addReview,
  deleteListing,
} = require("./controller");


router.get("/my-hotels", myHotels);

router.get("/favourites", favouriteHotels);

router.get("/:id", getListingById);

router.get("/", getAllListings);

const uploadMiddleware = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 4 },
]);

const handleUpload = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            error: "File size too large. Max limit is 10MB per file.",
          });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            error: "Unexpected file field or too many files.",
          });
        }
        return res.status(400).json({ error: `Upload Error: ${err.message}` });
      }
      return res.status(500).json({ error: `Unknown Error: ${err.message}` });
    }
    next();
  });
};

router.post("/create", handleUpload, createListing);

router.post("/:id/favourite", favouriteListing);
router.delete("/:id/favourite", unfavouriteListing);

router.put("/:id", updateListing);
router.post("/:id/reviews", authMiddleware, addReview);

router.delete("/:id",deleteListing);



module.exports = router;
