import { Request, Response, NextFunction } from "express";
import { createDirectoryService, deleteDirectoryService, getDirectoryTreeService } from "../services/directories.service.js";


//------create directories------------------------------------------------------------------------

export const createDir = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await createDirectoryService(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Unexpected error in createDir controller", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//------show directories------------------------------------------------------------------------

export const showDir = async (req: Request, res: Response) => {
  try {
    const tree = await getDirectoryTreeService();
    return res.status(201).json(tree);
  } catch (err) {
    console.error("Error in showDir controller:", err);
    return res.status(500).json({ message: "Failed to fetch directory structure", success: false });
  }
};

//----------------delte Direcotirs =--------------------------------------------------------------------

export const deleteDir = async (req: Request, res: Response) => {
  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ message: "folderId is required", success: false });
  }

  try {
    await deleteDirectoryService(folderId.toString());
    return res.json({ message: "directory deleted successfully", success: true });
  } catch (err) {
    console.error("Directory deletion failed ❌", err);
    return res.status(500).json({ message: "Something went wrong", success: false });
  }
};

