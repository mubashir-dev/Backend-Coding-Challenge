const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModulePermissionSchema = mongoose.Schema({
  Read: { type: Boolean, required: true, default: false },
  Write: { type: string, required: true, default: false },
  Update: { type: string, required: true, default: false },
  Delete: { type: string, required: true, default: false },
});

const PermissionSchema = new Schema(
  {
    module: ModulePermissionSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", PermissionSchema);
