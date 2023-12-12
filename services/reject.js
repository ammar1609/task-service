const admin = require("firebase-admin");
//reject function
const reject = (req, res) => {
  const itemId = req.params.itemId;
  const itemRef = admin.database().ref("items/" + itemId);

  itemRef
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const item = snapshot.val();

        if (item.Status === "Requested") {
          itemRef
            .update({ Status: "Available" })
            .then(() => {
              res.json({
                success: true,
                message: "Borrowing request rejected.",
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
            message: "Item is not in 'Requested' status.",
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

module.exports = reject;
