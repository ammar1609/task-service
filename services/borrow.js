const admin = require("firebase-admin");
const borrow = (req, res) => {
  const itemId = req.body.itemId;
  const itemRef = admin.database().ref(`items/${itemId}`);
  itemRef.once(
    "value",
    (snapshot) => {
      if (snapshot.exists()) {
        const item = snapshot.val();
        console.log(item);
        // Check if the item is available
        if (item.Status === "Available") {
          // Update the item's status in the database to indicate it has been borrowed
          itemRef.update({ Status: "Requested" });

          // Send a JSON response indicating availability
          res.json({
            success: true,
            message: "Item is available for borrowing.",
            item: item,
          });
        } else {
          // Item is not available for borrowing
          res.json({
            success: false,
            message: "Item is not available for borrowing.",
          });
        }
      } else {
        // Item does not exist in the database
        res.status(404).json({ success: false, message: "Item not found." });
      }
    },
    (error) => {
      // Handle any errors
      res.status(500).json({
        success: false,
        message: "Error checking item availability.",
        error: error.message,
      });
    }
  );
};

module.exports = borrow;
