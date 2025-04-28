import { ObjectId } from "mongoose";
import { IDirectory } from "../models/directories.model.js";
import { IFiles } from "../models/files.model.js";

export interface Directorys {
    _id: ObjectId;
    dirName: string;
    parentDirId?: ObjectId |null ;
    userId: ObjectId;
    rootId?: ObjectId;
    __v?: number;
    children?: Directorys[];
  }
//   export interface Files {
//     _id: ObjectId ;
//     fileName: string;
//     extension: string;
//     parentDirId: ObjectId ;
//     orgFileSize: number;
//     uploaded: boolean;
//     uploadedByte: number;
//     percentage: number;
//   }
  


export const TreeData = (data: IDirectory[], fileData: IFiles[]) => {
  const idMap: { [key: string]: Directorys } = {};
  const tree: Directorys[] = [];

  // Map directories first
  data.forEach((item: any) => {
    idMap[item._id.toString()] = { 
      ...item, 
      isFolder: true,  // Always true for directories
      children: [] 
    };
  });

  // Build directory tree
  data.forEach((item: any) => {
    if (item.parentDirId) {
      const parent = idMap[item.parentDirId.toString()];
      if (parent) {
        parent.children!.push(idMap[item._id.toString()]);
      }
    } else {
      tree.push(idMap[item._id.toString()]);
    }
  });

  // Add files under their parent directories
  fileData.forEach((file: any) => {
    const parent = idMap[file.parentId.toString()];
    if (parent) {
      parent.children!.push({
        ...file,
        isFolder: false,  // Always false for files
      });
    }
  });

  console.log("last tree", tree);

  return tree;
};

export default TreeData;
