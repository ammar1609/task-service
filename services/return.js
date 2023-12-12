const admin = require("firebase-admin");
//return method

const returnFn = (req, res) => {
  const itemId = req.body.itemId;

  const itemRef = admin.database().ref("items/" + itemId);

  itemRef
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const item = snapshot.val();

        // Check if the item is currently marked as borrowed
        if (item.Status === "Borrowed") {
          itemRef
            .update({ Status: "Available" })
            .then(() => {
              res.json({
                success: true,
                message: "Item return processed successfully.",
                item: item,
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                message: "Could not update item status.",
                error: error.message,
              });
            });
        } else {
          res.status(400).json({
            success: false,
            message: "Item is not in 'Borrowed' status.",
            currentStatus: item.Status,
          });
        }
      } else {
        res.status(404).json({ success: false, message: "Item not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching item data.",
        error: error.message,
      });
    });
};

module.exports = returnFn;
