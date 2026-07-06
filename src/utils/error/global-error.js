import fs from 'fs'
import path from 'path';
export const globalError = (error, req, res, next) => {
    // error.cause = 500

    if (req.file){
      const fullPath = path.resolve(req.file.path)
      fs.unlinkSync(fullPath)
    }
    return res.status(error.cause || 500).json({
      success: false,
      message: error.message,
    });
  }